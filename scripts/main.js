// The Reality Builder.

// Copyright 2010-2012 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint browser: true, maxerr: 50, maxlen: 79, nomen: true, sloppy: true,
  unparam: true */

/*global define */

define(['./util', './block_properties', './camera', './construction_blocks',
        './new_block', './sensor', './shadow_obscuring_blocks', './shadow',
        './topic_mixin', './jsonp', './socket',
        './vendor/jquery-modified', './vendor/underscore-wrapped'
       ], function (util, blockProperties, camera, constructionBlocks,
                    newBlock, sensor, shadowObscuringBlocks, shadow,
                    topicMixin, jsonp, socket, $, _) {
    return _.extend({
        // Last construction validator version retrieved, or "-1" initially. Is
        // a string in order to be able to contain very large integers.
        _validatorVersion: '-1',

        // Handle for the timeout between requests to the server for new
        // construction data.
        _updateTimeout: null,

        _onReadyCalled: null,

        // Sets up the Reality Builder.
        //
        // Mandatory settings:
        //
        // * "width", "height": dimensions (px)
        //
        // Optional settings:
        //
        // * "id": ID of HTML element into which to insert the Reality Builder.
        //
        // * "namespace": Namespace used when accessing the data store.
        //
        // * "baseUrl": Base URL of this script. Example: If this script has
        //   the URL "http://example.com/some/where/realitybuilder.js", then
        //   its base URL needs to be specified as
        //   "http://example.com/some/where".
        //
        // * "onReady": Function that is called when the Reality Builder is
        //   ready to use, i.e. after it has downloaded the required resources,
        //   rendered itself, etc.
        //
        // * "jsonpTimeout", "onJsonpError": 
        //
        //   Possible values of the timeout "jsonpTimeout":
        //   
        //   0: no effect
        // 
        //   >0 (ms): "onJsonpError" is called when the server doesn't respond
        //     to a JSONP request before the timeout has been reached.
        //
        //   This functionality is necessary since the method of making JSONP
        //   requests otherwise is incapable of reporting errors when the
        //   server is not responding:
        //
        //     <url:http://www.ibm.com/developerworks/library/wa-aj-jsonp1/?ca=
        //     dgr-jw64JSONP-jQuery&S%5FTACT=105AGY46&S%5FCMP=grsitejw64>
        //
        //   Be careful with specifying a timeout though: A user of the Reality
        //   Builder may be behind a very slow connection.
        //
        // * "onBrowserNotSupportedError": Function that is executed when the
        //   Reality Builder does not work with the current browser, e.g. when
        //   the current browser doesn't support a required HTML element such
        //   as the canvas element.
        //
        // * "onDegreesOfFreedomChanged": Function that is called when the
        //   degrees of freedom of the new block changed.
        //
        //   That may happen for example when after the block has been moved
        //   into a corner from where it can only be moved in certain
        //   directions. Or it may happen if the block can now be made real.
        //
        // * "onMovedOrRotated": Function that is called when the new block has
        //   been moved or rotated.
        //
        // * "onCameraChanged": Function that is called when camera data has
        //   changed.
        //
        // * "onConstructionBlocksChanged": Called when new blocks have been
        //   added, when a pending block has been made real, etc.
        //
        // * "onServerError": Called when the server could not process are
        //   request, for example because the server was down.
        //
        // * "lineWidthOfBlock": line width of block (px)
        //
        // * "colorOfPendingBlock", "colorOfRealBlock", "colorOfNewBlock",
        //   "colorOfFrozenNewBlock", "colorOfNewBlockShadow",
        //   "alphaOfNewBlockShadow":
        //
        //   Colors (CSS format) and alpha transparency of blocks, shadow.
        init: function (settings) {
            var nop = function () {},
                defaultSettings = {
                    id: 'realityBuilder',
                    namespace: 'default',
                    baseUrl: null,
                    jsonpTimeout: 0,
                    onServerCommunicationError: nop,
                    onBrowserNotSupportedError: nop,
                    onReady: nop,
                    onDegreesOfFreedomChanged: nop,
                    onRealBlocksVisibilityChanged: nop,
                    onPendingBlocksVisibilityChanged: nop,
                    onCameraChanged: nop,
                    onMovedOrRotated: nop,
                    onConstructionBlocksChanged: nop,
                    onServerError: nop,
                    lineWidthOfBlock: 1,
                    colorOfPendingBlock: 'white',
                    colorOfRealBlock: 'green',
                    colorOfNewBlock: 'red',
                    colorOfFrozenNewBlock: 'white',
                    colorOfNewBlockShadow: 'red',
                    alphaOfNewBlockShadow: 0.2,
                    backgroundAlpha: 0.2
                };

            util.SETTINGS = _.extend({}, defaultSettings, settings);

            socket.init();

            if (!util.isCanvasSupported()) {
                // canvas not supported => abort
                settings.onBrowserNotSupportedError();
                return;
            }

            this._onReadyCalled = false;

            $('#' + util.SETTINGS.id).append(sensor.node());

            this.subscribeToTopic(constructionBlocks, 'changedOnServer',
                                  this._update); // Speeds up responsiveness.
            this.subscribeToTopic(constructionBlocks, 'changed',
                                  this._onConstructionBlocksChanged);
            this.subscribeToTopic(newBlock, 'createdPendingOnServer',
                                  this._update); // Speeds up responsiveness.
            this.subscribeToTopic(newBlock, 'positionAngleInitialized',
                                  this._onNewBlockPositionAngleInitialized);
            this.subscribeToTopic(newBlock, 'movedOrRotated',
                                  this._onNewBlockMovedOrRotated);
            this.subscribeToTopic(newBlock, 'frozen', this._onNewBlockFrozen);
            this.subscribeToTopic(newBlock, 'unfrozen',
                                  this._onNewBlockUnfrozen);
            this.subscribeToTopic(newBlock, 'onNewBlockMakePendingRequested',
                                  this._onNewBlockMakePendingRequested);
            this.subscribeToTopic(newBlock, 'onNewBlockMakeRealRequested',
                                  this._onNewBlockMakeRealRequested);
            this.subscribeToTopic(camera, 'changed', this._onCameraChanged);
            this.subscribeToTopic(blockProperties, 'changed',
                                  this._onBlockPropertiesChanged);

            this._update();
        },

        newBlock: function () {
            return newBlock;
        },

        constructionBlocks: function () {
            return constructionBlocks;
        },

        // Called after the new block has been frozen.
        _onNewBlockFrozen: function () {
            this._renderNewBlockIfFullyInitialized(); // color changes
            util.SETTINGS.onDegreesOfFreedomChanged();
        },

        // Called after the new block has been unfrozen.
        _onNewBlockUnfrozen: function () {
            this._renderNewBlockIfFullyInitialized(); // color changes
            util.SETTINGS.onDegreesOfFreedomChanged();
        },

        // Called after the block was requested to be made pending.
        _onNewBlockMakePendingRequested: function () {
        },

        // Called after the block was requested to be made real.
        _onNewBlockMakeRealRequested: function () {
        },

        setRealBlocksVisibility: function (shouldBeVisible) {
            sensor.setRealBlocksVisibility(shouldBeVisible);
            constructionBlocks.renderIfVisible();
            util.SETTINGS.onRealBlocksVisibilityChanged();
        },

        setPendingBlocksVisibility: function (shouldBeVisible) {
            sensor.setPendingBlocksVisibility(shouldBeVisible);
            constructionBlocks.renderIfVisible();
            util.SETTINGS.onPendingBlocksVisibilityChanged();
        },

        realBlocksAreVisible: function () {
            return sensor.realBlocksAreVisible();
        },

        pendingBlocksAreVisible: function () {
            return sensor.pendingBlocksAreVisible();
        },

        // Called after the new block has been moved or rotated. Lets it redraw.
        _onNewBlockMovedOrRotated: function () {
            newBlock.render();
            util.SETTINGS.onDegreesOfFreedomChanged(); // may have
            // changed
            util.SETTINGS.onMovedOrRotated();
        },

        _blocksAreFullyInitialized: function () {
            return (constructionBlocks.isInitializedWithServerData() &&
                    newBlock.isInitializedWithServerData() &&
                    camera.isInitialized &&
                    blockProperties.isInitializedWithServerData());
        },

        // (Re-)renders blocks, but only if all necessary components have been
        // initialized, which is relevant only in the beginning.
        _renderConstructionBlocksIfFullyInitialized:
        function (renderConstructionBlocks) {
            if (this._blocksAreFullyInitialized()) {
                constructionBlocks.renderIfVisible();
            }
        },

        // (Re-)renders new block, but only if all necessary components have
        // been initialized, which is relevant only in the beginning.
        _renderNewBlockIfFullyInitialized: function () {
            // Note that construction blocks are needed also for rendering the new
            // block, e.g. to know which parts of it are obscured.
            if (this._blocksAreFullyInitialized()) {
                newBlock.render();
            }
        },

        _renderBlocksIfFullyInitialized: function () {
            this._renderConstructionBlocksIfFullyInitialized();
            this._renderNewBlockIfFullyInitialized();
        },

        // Updates the state (including position) of the new block, but only if
        // all necessary components have been initialized, which is relevant
        // only in the beginning.
        _updateNewBlockStateIfFullyInitialized: function (unfreeze) {
            if (constructionBlocks.isInitializedWithServerData() &&
                newBlock.isInitializedWithServerData() &&
                blockProperties.isInitializedWithServerData()) {
                newBlock.updateState();
                util.SETTINGS.onDegreesOfFreedomChanged();
                util.SETTINGS.onMovedOrRotated();
            }
        },

        // Called after the construction blocks have changed.
        _onConstructionBlocksChanged: function () {
            this._updateNewBlockStateIfFullyInitialized();
            this._renderBlocksIfFullyInitialized();
            this._checkIfReady();
            util.SETTINGS.onConstructionBlocksChanged();
        },

        // Called after the camera settings have changed.
        _onCameraChanged: function () {
            this._renderBlocksIfFullyInitialized();
            this._checkIfReady();
            util.SETTINGS.onCameraChanged();
        },

        // Called after the new block's position, rotation angle have been
        // initialized.
        _onNewBlockPositionAngleInitialized: function () {
            this._updateNewBlockStateIfFullyInitialized();
            this._renderBlocksIfFullyInitialized();
            this._checkIfReady();
        },

        // Called after the block properties have changed.
        _onBlockPropertiesChanged: function () {
            // Updates the state of the new block, because they depend on block
            // properties such as collision settings:
            this._updateNewBlockStateIfFullyInitialized();

            this._renderBlocksIfFullyInitialized();
            this._checkIfReady();
        },

        // Checks if the widget is ready to be used. If so, signals that by
        // calling the "onReady" function, but only the first time.
        _checkIfReady: function () {
            if (constructionBlocks.isInitializedWithServerData() &&
                camera.isInitialized &&
                blockProperties.isInitializedWithServerData() &&
                this._onReadyCalled === false) {
                util.SETTINGS.onReady();
                this._onReadyCalled = true;
            }
        },

        // Second step of the construction update process.
        //
        // Updates client data with server data, but only where there have been
        // changes. Note that update of certain client data may trigger a
        // redraw of blocks.
        //
        // Finally, sets timeout after which a new check for an update is
        // performed.
        _updateSucceeded: function (data) {
            var that = this;

            if (data.blocksData.changed) {
                constructionBlocks.updateWithServerData(data.blocksData);
            }

            if (data.blockPropertiesData.changed) {
                blockProperties.updateWithServerData(data.blockPropertiesData);
            }

            if (data.newBlockData.changed) {
                newBlock.updateWithServerData(data.newBlockData);
            }

            if (data.validatorData.versionChanged) {
                this._validatorVersion = data.validatorData.version;
                newBlock.setValidator(data.validatorData.src,
                                      data.validatorData.functionName);
            }

            if (this._updateTimeout) {
                // Clears the last timeout. May be necessary if the call to the
                // function has not been triggered by that timeout. Without
                // clearing the timeout, it may happen that two "timeout
                // chains" run concurrently.
                clearTimeout(this._updateTimeout);
            }
            this._updateTimeout =
                setTimeout(function () {
                    that._update();
                }, data.updateIntervalClient);
        },

        // Triggers an update of the construction with the data stored on the
        // server. Only updates data where there is a new version. Fails
        // silently on error.
        _update: function () {
            jsonp.get({
                url: util.baseUrl() + "rpc/construction",
                content: {
                    "blocksDataVersion":
                    constructionBlocks.versionOnServer(),
                    "blockPropertiesDataVersion":
                    blockProperties.versionOnServer(),
                    "newBlockDataVersion": newBlock.versionOnServer(),
                    "validatorVersion": this._validatorVersion
                },
                load: _.bind(this._updateSucceeded, this)
            });
        },

        // Called if updating the settings on the server succeeded. Triggers
        // retrieval of the latest settings from the server, which would happen
        // anyhow sooner or later, since the version of the settings has
        // changed.
        _storeSettingsOnServerSucceeded: function () {
            this._update(); // Will check for new settings.
        },

        // Returns camera data, prepared to sending it to the server.
        _preparedCameraData: function (cameraData) {
            var preparedCameraData;

            preparedCameraData =
                util.addPrefix('camera.', cameraData);
            preparedCameraData['camera.x'] = cameraData.pos[0];
            preparedCameraData['camera.y'] = cameraData.pos[1];
            preparedCameraData['camera.z'] = cameraData.pos[2];
            return preparedCameraData;
        },

        // Updates certain settings on the server. Fails silently on error.
        storeSettingsOnServer: function (settings) {
            var content = {};

            if (settings.hasOwnProperty('cameraData')) {
                _.extend(content, this._preparedCameraData(settings.cameraData));
            }

            jsonp.get({
                url: util.baseUrl() + "rpc/update_settings",
                content: content,
                load: _.bind(this._storeSettingsOnServerSucceeded, this)
            });
        },

        camera: function () {
            return camera;
        },

        util: function () {
            return util;
        },

        _: function () {
            return _;
        }
    }, topicMixin);
});
