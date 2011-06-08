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

/*global com, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('com.realitybuilder.Construction');

dojo.require('com.realitybuilder.BlockProperties');
dojo.require('com.realitybuilder.ConstructionBlocks');
dojo.require('com.realitybuilder.ConstructionBlock');
dojo.require('com.realitybuilder.NewBlock');
dojo.require('com.realitybuilder.Image');
dojo.require('com.realitybuilder.Camera');
dojo.require('com.realitybuilder.AdminControls');
dojo.require('com.realitybuilder.ControlPanel');
dojo.require('com.realitybuilder.PrerenderMode');
dojo.require('com.realitybuilder.util');

dojo.declare('com.realitybuilder.Construction', null, {
    // True, iff admin controls should be shown:
    _showAdminControls: null,

    // All blocks, permanently in the construction, including real and pending
    // blocks:
    _constructionBlocks: null,

    // Interval in between requests to the server for the new construction
    // data.
    _UPDATE_INTERVAL: 2000, // ms

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

    // Prerender-mode:
    _prerenderMode: null,

    // The new block that the user is supposed to position. Could move once the
    // real blocks are loaded, if there are any intersections.
    _newBlock: null,

    // The camera, whose sensor is shown.
    _camera: null,

    // The live image.
    _image: null,

    // The control panel for moving around the block and requesting it to be
    // made real:
    _controlPanel: null,

    // Controls for changing and inspecting settings and the construction.
    _adminControls: null,

    // Handle for the timeout between requests to the server for new
    // construction data.
    _updateTimeout: null,

    // Creates a construction. Iff "showAdminControls" is true, then the admin
    // controls are shown, and - in the rendering - the real and pending
    // blocks.
    constructor: function (showAdminControls) {
        this._insertLoadIndicator();

        this._showAdminControls = showAdminControls;
        this._showReal = showAdminControls;
        this._showPending = showAdminControls;

        this._blockProperties = new com.realitybuilder.BlockProperties();
        this._camera = new com.realitybuilder.Camera(this._blockProperties, 
                                                     640, 480);
        this._image = new com.realitybuilder.Image(this._camera);
        this._constructionBlocks = 
            new com.realitybuilder.ConstructionBlocks(this, 
                                                      this._blockProperties);
        this._prerenderMode = new com.realitybuilder.PrerenderMode();
        this._newBlock = 
            new com.realitybuilder.NewBlock(this._blockProperties,
                                            this._camera,
                                            this._constructionBlocks,
                                            this._prerenderMode);
        this._controlPanel = 
            new com.realitybuilder.ControlPanel(this._newBlock);

        if (this._showAdminControls) {
            this._adminControls = new com.realitybuilder.AdminControls(this);

            // When an attempt to change construction block data on the server
            // failed, then the relavant admin controls may have to be brought
            // back up to date. Reason: They may have been changed before, by
            // user selection.
            dojo.subscribe(
                'com/realitybuilder/ConstructionBlocks/changeOnServerFailed', 
                this._adminControls, this._adminControls.updateBlocksTable);
        }

        dojo.subscribe('com/realitybuilder/ConstructionBlocks/changedOnServer', 
                       this, this._update); // Speeds up responsiveness.
        dojo.subscribe('com/realitybuilder/NewBlock/createdPendingOnServer', 
                       this, this._update); // Speeds up responsiveness.
        dojo.subscribe('com/realitybuilder/NewBlock/' + 
                       'positionAngleInitialized', 
                       this, this._onNewBlockPositionAngleInitialized);
        dojo.subscribe('com/realitybuilder/NewBlock/buildOrMoveSpaceChanged', 
                       this, this._onMoveOrBuildSpaceChanged);
        dojo.subscribe('com/realitybuilder/NewBlock/stopped', 
                       this, this._onNewBlockStopped);
        dojo.subscribe('com/realitybuilder/NewBlock/madeMovable', 
                       this, this._onNewBlockMadeMovable);
        dojo.subscribe('com/realitybuilder/NewBlock/movedOrRotated',
                       this, this._onNewBlockMovedOrRotated);
        dojo.subscribe('com/realitybuilder/NewBlock/' + 
                       'onNewBlockMakeRealRequested',
                       this, this._onNewBlockMakeRealRequested);
        dojo.subscribe('com/realitybuilder/ConstructionBlocks/changed',
                       this, this._onConstructionBlocksChanged);
        dojo.subscribe('com/realitybuilder/Camera/changed',
                       this, this._onCameraChanged);
        dojo.subscribe('com/realitybuilder/Image/changed',
                       this, this._onImageChanged);
        dojo.subscribe('com/realitybuilder/BlockProperties/changed',
                       this, this._onBlockPropertiesChanged);
        dojo.subscribe('com/realitybuilder/PrerenderMode/changed',
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
    },

    // Called after the new block has been made movable.
    _onNewBlockMadeMovable: function () {
        this._newBlock.render(); // color changes
        this._controlPanel.update();
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
            this._blockProperties.isInitializedWithServerData()) {
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
        this._renderBlocksIfFullyInitialized();

        // Updates the state (and related controls) of the new block, because
        // they depend on block properties such as collision settings:
        this._updateNewBlockStateIfFullyInitialized();

        this._renderBlocksIfFullyInitialized();
    },

    _onPrerenderModeChanged: function () {
        this._updateNewBlockStateIfFullyInitialized();
    },

    // Called after settings describing the live image have changed.
    _onImageChanged: function () {
        if (this._showAdminControls) {
            this._adminControls.updateImageControls(this._image);
        }
    },

    _insertLoadIndicator: function () {
        dojo.attr('loadIndicator', 'innerHTML', 'Loading...');
    },

    // Regularly checks if the construction has been loaded, so that the
    // content on the web page can be unhidden.
    _checkIfHasLoaded: function () {
        if (this._constructionBlocks.isInitializedWithServerData() &&
            this._camera.isInitializedWithServerData() &&
            this._blockProperties.isInitializedWithServerData() &&
            this._image.imageLoaded()) {
            // Shows the contents and removes the load indicator.
            dojo.destroy(dojo.byId('loadIndicator'));
            this._unhideContent();
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
    _updateSucceeded: function (data, ioargs) {
        var that = this;

        if (data.blocksData.changed) {
            this._constructionBlocks.updateWithServerData(data.blocksData, 
                                                          this._image);
        }

        if (data.prerenderModeData.changed) {
            this._prerenderMode.updateWithServerData(data.prerenderModeData);
        }

        if (data.cameraData.changed) {
            this._camera.updateWithServerData(data.cameraData);
        }

        if (data.imageData.changed) {
            this._image.updateWithServerData(data.imageData);
        }

        if (data.blockPropertiesData.changed) {
            this._blockProperties.
                updateWithServerData(data.blockPropertiesData);
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
            }, this._UPDATE_INTERVAL);
    },

    // Triggers an update of the construction with the data stored on the
    // server. Only updates the blocks if there is a new version. Fails
    // silently on error.
    _update: function () {
        dojo.xhrGet({
            url: "/rpc/construction",
            content: {
                "blocksDataVersion": 
                this._constructionBlocks.versionOnServer(),
                "cameraDataVersion": this._camera.versionOnServer(),
                "imageDataVersion": this._image.versionOnServer(),
                "blockPropertiesDataVersion": 
                this._blockProperties.versionOnServer(),
                "newBlockDataVersion": this._newBlock.versionOnServer(),
                "prerenderModeDataVersion": 
                this._prerenderMode.versionOnServer()
            },
            handleAs: "json",
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
        if (dojo.isIE && dojo.isIE <= 7) {
            // Necessary since otherwise IE 6 doesn't redraw after updating the
            // dimensions, and IE 7 may otherwise not show the background
            // image.
            dojo.style(contentNode, 'zoom', '1');
        }

        if (doFadeIn) {
            fadeSettings = {node: contentNode, duration: 1000};
            dojo.fadeIn(fadeSettings).play();
        }
    },

    // Called if updating the camera and live image settings on the server
    // succeeded. Triggers retrieval of the latest settings from the server,
    // which would happen anyhow sooner or later, since the version of the
    // settings has changed.
    _storeSettingsOnServerSucceeded: function () {
        this._update(); // Will check for new settings.
    },

    // Updates the camera and live image settings on the server. Fails silently
    // on error.
    storeSettingsOnServer: function () {
        var imageData, cameraData, content, util;

        util = com.realitybuilder.util;

        imageData = util.addPrefix('image.', 
                                   this._adminControls.readImageControls());
        cameraData = util.addPrefix('camera.', 
                                    this._adminControls.readCameraControls());
        cameraData['camera.x'] = cameraData['camera.position'][0];
        cameraData['camera.y'] = cameraData['camera.position'][1];
        cameraData['camera.z'] = cameraData['camera.position'][2];
        content = {};

        dojo.mixin(content, imageData, cameraData);
        dojo.xhrPost({
            url: "/admin/rpc/update_settings",
            content: content,
            load: dojo.hitch(this, this._storeSettingsOnServerSucceeded)
        });
    }
});
