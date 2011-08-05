// The construction and the controls.

// Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
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

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global realitybuilder, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('realitybuilder.Main');

dojo.require('realitybuilder.BlockProperties');
dojo.require('realitybuilder.ConstructionBlockProperties');
dojo.require('realitybuilder.ConstructionBlocks');
dojo.require('realitybuilder.ConstructionBlock');
dojo.require('realitybuilder.NewBlock');
dojo.require('realitybuilder.Camera');
dojo.require('realitybuilder.AdminControls');
dojo.require('realitybuilder.ControlPanel');
dojo.require('realitybuilder.PrerenderMode');
dojo.require('realitybuilder.util');

dojo.require('dojo.io.script');

dojo.declare('realitybuilder.Main', null, {
    _settings: null,

    // True, iff admin controls should be shown:
    _showAdminControls: null,

    // All blocks, permanently in the construction, including real and pending
    // blocks:
    _constructionBlocks: null,

    // The interval in between checks whether the web page has finished loading
    // can can be shown.
    _CHECK_IF_HAS_LOADED_INTERVAL: 500, // ms

    // True, iff real/pending blocks should be shown. By default, always
    // enabled if the admin controls are shown. With only the user controls
    // shown, by default disabled.
    _showReal: null,
    _showPending: null,

    // Properties (shape, dimensions, etc.) of a block:
    _blockProperties: null,

    // Properties of a construction block:
    _constructionBlockProperties: null,

    // Prerender-mode:
    _prerenderMode: null,

    // The new block that the user is supposed to position. Could move once the
    // real blocks are loaded, if there are any intersections.
    _newBlock: null,

    // The camera, whose sensor is shown.
    _camera: null,

    // The control panel for moving around the block and requesting it to be
    // made real:
    _controlPanel: null,

    // Controls for changing and inspecting settings and the construction.
    _adminControls: null,

    // Handle for the timeout between requests to the server for new
    // construction data.
    _updateTimeout: null,

    // Creates a construction. For a documentation of the settings, see the
    // main Reality Builder include script.
    constructor: function (settings) {
        var rb = realitybuilder;

        if (!rb.util.isCanvasSupported()) {
            // canvas not supported => abort
            settings.onBrowserNotSupportedError();
            return;
        }

        this._settings = settings;

        this._insertLoadIndicator();

        this._showAdminControls = settings.showAdminControls;
        this._showReal = settings.showAdminControls;
        this._showPending = settings.showAdminControls;

        this._blockProperties = new rb.BlockProperties();
        this._constructionBlockProperties = 
            new rb.ConstructionBlockProperties();
        this._camera = new rb.Camera(this._blockProperties, 
                                     settings.width, settings.height);
        this._constructionBlocks = 
            new rb.ConstructionBlocks(this, 
                                      this._blockProperties,
                                      this._constructionBlockProperties);
        this._prerenderMode = new rb.PrerenderMode();
        this._newBlock = 
            new rb.NewBlock(this._blockProperties,
                                            this._camera,
                                            this._constructionBlocks,
                                            this._prerenderMode);
        this._controlPanel = 
            new rb.ControlPanel(this._newBlock);

        if (this._showAdminControls) {
            this._adminControls = new rb.AdminControls(this);

            // When an attempt to change construction block data on the server
            // failed, then the relavant admin controls may have to be brought
            // back up to date. Reason: They may have been changed before, by
            // user selection.
            dojo.subscribe(
                'realitybuilder/ConstructionBlocks/changeOnServerFailed', 
                this._adminControls, this._adminControls.updateBlocksTable);
        }

        dojo.subscribe('realitybuilder/ConstructionBlocks/changedOnServer', 
                       this, this._update); // Speeds up responsiveness.
        dojo.subscribe('realitybuilder/PrerenderMode/' + 
                       'loadedBlockConfigurationOnServer', 
                       this, this._update); // Speeds up responsiveness.
        dojo.subscribe('realitybuilder/NewBlock/createdPendingOnServer', 
                       this, this._update); // Speeds up responsiveness.
        dojo.subscribe('realitybuilder/NewBlock/' + 
                       'positionAngleInitialized', 
                       this, this._onNewBlockPositionAngleInitialized);
        dojo.subscribe('realitybuilder/NewBlock/buildOrMoveSpaceChanged', 
                       this, this._onMoveOrBuildSpaceChanged);
        dojo.subscribe('realitybuilder/NewBlock/stopped', 
                       this, this._onNewBlockStopped);
        dojo.subscribe('realitybuilder/NewBlock/madeMovable', 
                       this, this._onNewBlockMadeMovable);
        dojo.subscribe('realitybuilder/NewBlock/movedOrRotated',
                       this, this._onNewBlockMovedOrRotated);
        dojo.subscribe('realitybuilder/NewBlock/' + 
                       'onNewBlockMakeRealRequested',
                       this, this._onNewBlockMakeRealRequested);
        dojo.subscribe('realitybuilder/ConstructionBlocks/changed',
                       this, this._onConstructionBlocksChanged);
        dojo.subscribe('realitybuilder/Camera/changed',
                       this, this._onCameraChanged);
        dojo.subscribe('realitybuilder/BlockProperties/changed',
                       this, this._onBlockPropertiesChanged);
        dojo.subscribe('realitybuilder/ConstructionBlockProperties/changed',
                       this, this._onConstructionBlockPropertiesChanged);
        dojo.subscribe('realitybuilder/PrerenderMode/changed',
                       this, this._onPrerenderModeChanged);

        dojo.connect(null, "onkeypress", dojo.hitch(this, this._onKeyPress));

        this._update();
        this._checkIfHasLoaded();
    },

    newBlock: function () {
        return this._newBlock;
    },

    camera: function () {
        return this._camera;
    },

    prerenderMode: function () {
        return this._prerenderMode;
    },

    showPending: function () {
        return this._showPending;
    },

    showReal: function () {
        return this._showReal;
    },

    constructionBlocks: function () {
        return this._constructionBlocks;
    },

    // Called after the new block has been stopped.
    _onNewBlockStopped: function () {
        this._newBlock.render(); // color changes
        this._controlPanel.update();
        this._settings.onDegreesOfFreedomChanged();
    },

    // Called after the new block has been made movable.
    _onNewBlockMadeMovable: function () {
        this._newBlock.render(); // color changes
        this._controlPanel.update();
        this._settings.onDegreesOfFreedomChanged();
    },

    // Called after the block was requested to be made real.
    _onNewBlockMakeRealRequested: function () {
        this._controlPanel.update();
    },

    // Toggles display of real blocks.
    toggleReal: function () {
        this._showReal = !this._showReal;
        this._camera.sensor().showRealBlocks(this._showReal);
        this._adminControls.updateToggleRealButton();
    },

    // Toggles display of pending blocks.
    togglePending: function () {
        this._showPending = !this._showPending;
        this._camera.sensor().showPendingBlocks(this._showPending);
        this._adminControls.updateTogglePendingButton();
    },

    // Handles keys events.
    _onKeyPress: function (event) {
        var constructionBlocks, newBlock;

        newBlock = this._newBlock;

        if (event.keyCode === 109) { // m
            // For demoing the Reality Builder:
            //
            // Makes the block at the position of the new block real on the
            // server. This only works if there is a block at that position in
            // the list of construction blocks, and if the user is logged in as
            // administrator.
            constructionBlocks = this._constructionBlocks;
            constructionBlocks.setBlockStateOnServer(newBlock.positionB(), 
                                                     newBlock.a(), 2);
        }
    },

    // Called after the new block has been moved or rotated. Lets it redraw and
    // updates controls.
    _onNewBlockMovedOrRotated: function () {
        this._newBlock.render();
        this._controlPanel.update();
        this._settings.onDegreesOfFreedomChanged();
        if (this._showAdminControls) {
            this._adminControls.updateCoordinateDisplays();
        }
    },

    // (Re-)renders blocks, but only if all necessary components have been
    // initialized, which is relevant only in the beginning.
    _renderBlocksIfFullyInitialized: function () {
        if (this._constructionBlocks.isInitializedWithServerData() &&
            this._newBlock.isInitializedWithServerData() &&
            this._camera.isInitializedWithServerData() &&
            this._blockProperties.isInitializedWithServerData() &&
            this._constructionBlockProperties.isInitializedWithServerData()) {
            if (this._showAdminControls) {
                this._constructionBlocks.render();
            }
            this._newBlock.render();
        }
    },

    // Updates the state (including position) of the new block (and related
    // controls), but only if all necessary components have been initialized,
    // which is relevant only in the beginning.
    _updateNewBlockStateIfFullyInitialized: function () {
        if (this._constructionBlocks.isInitializedWithServerData() &&
            this._newBlock.isInitializedWithServerData() &&
            this._blockProperties.isInitializedWithServerData() &&
            this._prerenderMode.isInitializedWithServerData()) {

            this._newBlock.updatePositionAndMovability();
            this._controlPanel.update();
            this._settings.onDegreesOfFreedomChanged();

            if (this._showAdminControls) {
                // Necessary after updating the block position:
                this._adminControls.updateCoordinateDisplays();
            }
        }
    },

    // Called after the construction blocks have changed.
    _onConstructionBlocksChanged: function () {
        if (this._showAdminControls) {
            this._adminControls.updateBlocksTable();
        }

        this._updateNewBlockStateIfFullyInitialized();
        this._renderBlocksIfFullyInitialized();
    },

    // Called after the camera settings have changed.
    _onCameraChanged: function () {
        if (this._showAdminControls) {
            this._adminControls.updateCameraControls(this._camera);
        }

        this._renderBlocksIfFullyInitialized();
    },

    // Called after the new block's position, rotation angle have been
    // initialized.
    _onNewBlockPositionAngleInitialized: function () {
        this._updateNewBlockStateIfFullyInitialized();
        this._renderBlocksIfFullyInitialized();
    },

    // Called after the dimensions of the space where the new block may be
    // moved or built have been changed.
    _onMoveOrBuildSpaceChanged: function () {
        this._updateNewBlockStateIfFullyInitialized();
        this._renderBlocksIfFullyInitialized();
    },

    // Called after the block properties have changed.
    _onBlockPropertiesChanged: function () {
        // Updates the state (and related controls) of the new block, because
        // they depend on block properties such as collision settings:
        this._updateNewBlockStateIfFullyInitialized();

        this._renderBlocksIfFullyInitialized();
    },

    // Called after the block properties have changed.
    _onConstructionBlockPropertiesChanged: function () {
        this._renderBlocksIfFullyInitialized();
    },

    _onPrerenderModeChanged: function () {
        var i;

        if (this._showAdminControls) {
            this._adminControls.
                updatePrerenderModeControls();
        }

        i = this._prerenderMode.i();
        this._settings.onPrerenderedBlockConfigurationChanged(i);

        this._updateNewBlockStateIfFullyInitialized();
    },

    _insertLoadIndicator: function () {
        dojo.attr('loadIndicator', 'innerHTML', 'Loading...');
    },

    // Regularly checks if the construction has been loaded, so that the
    // content on the web page can be unhidden and that it can be signaled that
    // the widget is ready.
    _checkIfHasLoaded: function () {
        if (this._constructionBlocks.isInitializedWithServerData() &&
            this._camera.isInitializedWithServerData() &&
            this._blockProperties.isInitializedWithServerData() &&
            this._constructionBlockProperties.isInitializedWithServerData()) {
            // Shows the contents and removes the load indicator.
            dojo.destroy(dojo.byId('loadIndicator'));
            this._unhideContent();
            this._settings.onReady();
        } else {
            // Schedules the next check.
            setTimeout(dojo.hitch(this, this._checkIfHasLoaded), 
                this._CHECK_IF_HAS_LOADED_INTERVAL);
        }
    },

    // Second step of the construction update process.
    //
    // Updates client data with server data, but only where there have been
    // changes. Note that update of certain client data may trigger a redraw of
    // blocks and/or controls.
    //
    // Finally, sets timeout after which a new check for an update is
    // performed.
    _updateSucceeded: function (data) {
        var that = this;

        if (data.blocksData.changed) {
            this._constructionBlocks.updateWithServerData(data.blocksData);
        }

        if (data.prerenderModeData.changed) {
            this._prerenderMode.updateWithServerData(data.prerenderModeData);
        }

        if (data.cameraData.changed) {
            this._camera.updateWithServerData(data.cameraData);
        }

        if (data.blockPropertiesData.changed) {
            this._blockProperties.
                updateWithServerData(data.blockPropertiesData);
        }

        if (data.constructionBlockPropertiesData.changed) {
            this._constructionBlockProperties.
                updateWithServerData(data.constructionBlockPropertiesData);
        }

        if (data.newBlockData.changed) {
            this._newBlock.updateWithServerData(data.newBlockData);
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
        dojo.io.script.get({
            url: realitybuilder.util.rootUrl() + "rpc/construction",
            callbackParamName: "callback",
            content: {
                "blocksDataVersion": 
                this._constructionBlocks.versionOnServer(),
                "cameraDataVersion": this._camera.versionOnServer(),
                "blockPropertiesDataVersion": 
                this._blockProperties.versionOnServer(),
                "constructionBlockPropertiesDataVersion": 
                this._constructionBlockProperties.versionOnServer(),
                "newBlockDataVersion": this._newBlock.versionOnServer(),
                "prerenderModeDataVersion": 
                this._prerenderMode.versionOnServer()
            },
            load: dojo.hitch(this, this._updateSucceeded)
        });
    },

    // Unhides the content. Fades in the content, unless the browser is Internet
    // Explorer version 8 or earlier.
    _unhideContent: function () {
        var contentNode = dojo.byId('content'),
            doFadeIn = (!dojo.isIE || dojo.isIE > 8),
            fadeSettings;

        if (doFadeIn) {
            dojo.style(contentNode, 'opacity', '0');
        }

        dojo.style(contentNode, 'width', 'auto');
        dojo.style(contentNode, 'height', 'auto');
        if (dojo.isIE && dojo.isIE <= 6) {
            // Necessary since otherwise IE 6 doesn't redraw after updating the
            // dimensions.
            dojo.style(contentNode, 'zoom', '1');
        }

        if (doFadeIn) {
            fadeSettings = {node: contentNode, duration: 1000};
            dojo.fadeIn(fadeSettings).play();
        }
    },

    // Called if updating the settings on the server succeeded. Triggers
    // retrieval of the latest settings from the server, which would happen
    // anyhow sooner or later, since the version of the settings has changed.
    _storeSettingsOnServerSucceeded: function () {
        this._update(); // Will check for new settings.
    },

    // Updates certain settings on the server. Fails silently on error.
    storeSettingsOnServer: function () {
        var cameraData, content, util;

        util = realitybuilder.util;

        cameraData = util.addPrefix('camera.', 
                                    this._adminControls.readCameraControls());
        cameraData['camera.x'] = cameraData['camera.position'][0];
        cameraData['camera.y'] = cameraData['camera.position'][1];
        cameraData['camera.z'] = cameraData['camera.position'][2];
        content = {};

        dojo.mixin(content, cameraData);
        dojo.io.script.get({
            url: realitybuilder.util.rootUrl() + "admin/rpc/update_settings",
            callbackParamName: "callback",
            content: content,
            load: dojo.hitch(this, this._storeSettingsOnServerSucceeded)
        });
    }
});
