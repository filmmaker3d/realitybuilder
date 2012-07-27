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

/*global realityBuilder, realityBuilderValidator, realityBuilderDojo.
  FlashCanvas, _, define */

define(['./util',
        './block_properties',
        './camera',
        './construction_blocks',
        './new_block',
        './shadow_obscuring_blocks',
        './shadow'],
       function (util,
                 blockProperties,
                 camera,
                 constructionBlocks,
                 newBlock,
                 shadowObscuringBlocks,
                 shadow) {
    return {
        // Last construction validator version retrieved, or "-1" initially. Is a
        // string in order to be able to contain very large integers.
        _validatorVersion: '-1',

        // Handle for the timeout between requests to the server for new
        // construction data.
        _updateTimeout: null,

        _onReadyCalled: null,

        // Creates a construction. For a documentation of the settings, see the
        // main Reality Builder include script.
        init: function (settings) {
            var rb = realityBuilder;

            if (!rb.util.isCanvasSupported()) {
                // canvas not supported => abort
                settings.onBrowserNotSupportedError();
                return;
            }

            util.SETTINGS = settings;

            this._onReadyCalled = false;

            $('#' + settings.id).append(sensor.node());

            realityBuilderDojo.subscribe('realityBuilder/ConstructionBlocks/changedOnServer',
                                         this, this._update); // Speeds up responsiveness.
            realityBuilderDojo.subscribe('realityBuilder/NewBlock/createdPendingOnServer',
                                         this, this._update); // Speeds up responsiveness.
            realityBuilderDojo.subscribe('realityBuilder/NewBlock/' +
                                         'positionAngleInitialized',
                                         this, this._onNewBlockPositionAngleInitialized);
            realityBuilderDojo.subscribe('realityBuilder/NewBlock/frozen',
                                         this, this._onNewBlockFrozen);
            realityBuilderDojo.subscribe('realityBuilder/NewBlock/unfrozen',
                                         this, this._onNewBlockUnfrozen);
            realityBuilderDojo.subscribe('realityBuilder/NewBlock/movedOrRotated',
                                         this, this._onNewBlockMovedOrRotated);
            realityBuilderDojo.subscribe('realityBuilder/NewBlock/' +
                                         'onNewBlockMakePendingRequested',
                                         this, this._onNewBlockMakePendingRequested);
            realityBuilderDojo.subscribe('realityBuilder/NewBlock/' +
                                         'onNewBlockMakeRealRequested',
                                         this, this._onNewBlockMakeRealRequested);
            realityBuilderDojo.subscribe('realityBuilder/ConstructionBlocks/changed',
                                         this, this._onConstructionBlocksChanged);
            realityBuilderDojo.subscribe('realityBuilder/Camera/changed',
                                         this, this._onCameraChanged);
            realityBuilderDojo.subscribe('realityBuilder/BlockProperties/changed',
                                         this, this._onBlockPropertiesChanged);

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
                    camera.isInitializedWithServerData() &&
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

        // (Re-)renders new block, but only if all necessary components have been
        // initialized, which is relevant only in the beginning.
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

        // Updates the state (including position) of the new block, but only if all
        // necessary components have been initialized, which is relevant only in
        // the beginning.
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

        // Checks if the widget is ready to be used. If so, signals that by calling
        // the "onReady" function, but only the first time.
        _checkIfReady: function () {
            if (constructionBlocks.isInitializedWithServerData() &&
                camera.isInitializedWithServerData() &&
                blockProperties.isInitializedWithServerData() &&
                this._onReadyCalled === false) {
                util.SETTINGS.onReady();
                this._onReadyCalled = true;
            }
        },

        // Second step of the construction update process.
        //
        // Updates client data with server data, but only where there have been
        // changes. Note that update of certain client data may trigger a redraw of
        // blocks.
        //
        // Finally, sets timeout after which a new check for an update is
        // performed.
        _updateSucceeded: function (data) {
            var that = this;

            if (data.blocksData.changed) {
                constructionBlocks.updateWithServerData(data.blocksData);
            }

            if (data.cameraData.changed) {
                camera.updateWithServerData(data.cameraData);
            }

            if (data.blockPropertiesData.changed) {
                blockProperties.updateWithServerData(data.blockPropertiesData);
            }

            if (data.newBlockData.changed) {
                newBlock.updateWithServerData(data.newBlockData);
            }

            if (data.validatorData.versionChanged) {
                this._validatorVersion = data.validatorData.version;
                this._loadValidator(data.validatorData.src);
            }

            if (this._updateTimeout) {
                // Clears the last timeout. May be necessary if the call to the
                // function has not been triggered by that timeout. Without
                // clearing the timeout, it may happen that two "timeout chains"
                // run concurrently.
                clearTimeout(this._updateTimeout);
            }
            this._updateTimeout =
                setTimeout(function () {
                    that._update();
                }, data.updateIntervalClient);
        },

        // Triggers an update of the construction with the data stored on the
        // server. Only updates data where there is a new version. Fails silently
        // on error.
        _update: function () {
            var _ = realityBuilder._;

            util.jsonpGet({
                url: util.rootUrl() + "rpc/construction",
                content: {
                    "blocksDataVersion":
                    constructionBlocks.versionOnServer(),
                    "cameraDataVersion": camera.versionOnServer(),
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
        // anyhow sooner or later, since the version of the settings has changed.
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
            var content = {}, _ = realityBuilder._;

            if (settings.hasOwnProperty('cameraData')) {
                _.extend(content, this._preparedCameraData(settings.cameraData));
            }

            util.jsonpGet({
                url: util.rootUrl() + "rpc/update_settings",
                content: content,
                load: _.bind(this._storeSettingsOnServerSucceeded, this)
            });
        },

        // Unsets the construction validator, then reloads it from the server.
        _loadValidator: function (src) {
            var $ = realityBuilder.$;

            this._unsetValidator();
            $.getScript(src);
        },

        _unsetValidator: function () {
            delete window.realityBuilderValidator;
        },

        // Returns true, if the new block together with all real and pending blocks
        // forms a valid construction.
        newConstructionWouldBeValid: function () {
            return (typeof realityBuilderValidator !== 'undefined' &&
                    realityBuilderValidator(constructionBlocks, newBlock));
        },

        camera: function () {
            return camera;
        }
    }
});
