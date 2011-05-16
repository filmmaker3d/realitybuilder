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

/*global com, dojo, dojox, G_vmlCanvasManager, logoutUrl */

dojo.provide('com.realitybuilder.Construction');

dojo.require('com.realitybuilder.BlockProperties');
dojo.require('com.realitybuilder.ConstructionBlocks');
dojo.require('com.realitybuilder.ConstructionBlock');
dojo.require('com.realitybuilder.NewBlock');
dojo.require('com.realitybuilder.Image');
dojo.require('com.realitybuilder.Camera');
dojo.require('com.realitybuilder.UserControls');
dojo.require('com.realitybuilder.AdminControls');
dojo.require('com.realitybuilder.util');

dojo.declare('com.realitybuilder.Construction', null, {
    // True, iff admin controls should be shown:
    _showAdminControls: null,

    // All blocks, permanently in the construction, including real and pending
    // blocks:
    _constructionBlocks: null,

    // Response to the last request to build a block. 0: no last request. 1:
    // not yet processed. 2: accepted. 3: denied.
    _responseToLastRequest: null,

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

    // The new block that the user is supposed to position. Could move once the
    // real blocks are loaded, if there are any intersections.
    _newBlock: null,

    // The camera, whose sensor is shown.
    _camera: null,

    // The live image.
    _image: null,

    // Controls for changing and inspecting settings and the construction.
    _userControls: null,
    _adminControls: null,

    // Handle for the timeout between requests to the server for new
    // construction data.
    _updateTimeout: null,

    // Creates a construction. Iff "showAdminControls" is true, then the admin
    // controls are shown, and - in the rendering - the real and pending
    // blocks.
    constructor: function (showAdminControls) {
        this._insertLoadIndicator();
        this._insertView();

        this._showAdminControls = showAdminControls;
        this._responseToLastRequest = 0;
        this._showReal = showAdminControls;
        this._showPending = showAdminControls;

        this._blockProperties = new com.realitybuilder.BlockProperties();
        this._camera = new com.realitybuilder.Camera(this._blockProperties, 
                                                     640, 480);
        this._image = new com.realitybuilder.Image(this._camera);
        this._constructionBlocks = 
            new com.realitybuilder.ConstructionBlocks(this, 
                                                      this._blockProperties);
        this._newBlock = new com.realitybuilder.NewBlock(
            this._blockProperties,
            this._camera, [9, 9, 1] /*FIXME: [8, 0, 5]*/, 
            this._constructionBlocks, 
            !this._showAdminControls);
        this._userControls = new com.realitybuilder.UserControls(this);

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
        dojo.subscribe('com/realitybuilder/NewBlock/stopped', 
            this, this._onNewBlockStopped);
        dojo.subscribe('com/realitybuilder/NewBlock/madeMovable', 
            this, this._onNewBlockMadeMovable);
        dojo.subscribe('com/realitybuilder/NewBlock/moved', 
            this, this._onNewBlockMoved);
        dojo.subscribe('com/realitybuilder/ConstructionBlocks/changed',
            this, this._onConstructionBlocksChanged);
        dojo.subscribe('com/realitybuilder/Camera/changed',
            this, this._onCameraChanged);
        dojo.subscribe('com/realitybuilder/BlockProperties/changed',
            this, this._onBlockPropertiesChanged);

        this._setupDemoFunctionality();

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

    // Called when the new block is stopped.
    _onNewBlockStopped: function () {
        this._newBlock.render(); // color changes
        this._userControls.updateCoordinateControls(true);
    },

    // Called when the new block is made movable.
    _onNewBlockMadeMovable: function () {
        this._newBlock.render(); // color changes
        this._userControls.updateCoordinateControls(false);
    },

    // Toggles the state of a block from virtual to pending. Also updates the
    // last-request-state.
    requestReal: function () {
        if (this._newBlock.isMovable()) {
            this._newBlock.stop();
            this._constructionBlocks.createPendingOnServer(
                this._newBlock.positionB());
            this._responseToLastRequest = 1;
        }
        this._userControls.updateRequestRealButton();
        this._userControls.updateStatusMessage(this._responseToLastRequest);
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

    // Handles keys events for demoing the application.
    _onDemoKeyPress: function (event) {
        if (event.shiftKey && event.keyCode === dojo.keys.F12) {
            // Makes the block at the position of the new block real on the
            // server. This only works if there is a block at that position in
            // the list of construction blocks, and if the user is logged in as
            // administrator.
            this._constructionBlocks.setBlockStateOnServer(
                this._newBlock.positionB(), 2);
        }
    },

    // Sets up (hidden) functionality for demoing the application.
    _setupDemoFunctionality: function () {
        dojo.connect(null, "onkeypress", 
            dojo.hitch(this, this._onDemoKeyPress));
    },

    // Called when the new block has been moved. Lets it redraw and updates
    // controls.
    _onNewBlockMoved: function () {
        this._newBlock.render();
        this._userControls.updateRequestRealButton();
        this._userControls.updateStatusMessage(this._responseToLastRequest);
        this._userControls.updateCoordinateControls();
        if (this._showAdminControls) {
            this._adminControls.updateCoordinateDisplays();
        }
    },

    // Updates the position and state of the block to reflect changes in the
    // construction. Also sets the status text. Depends on up to date lists of
    // blocks and real blocks.
    _updateNewBlockPositionAndState: function () {
        var positionB = this._newBlock.positionB(), tmp, state;

        // Discovers the correct status text and updates the new block state:
        if (this._newBlock.isStopped()) {
            tmp = this._constructionBlocks.blockAt(positionB);
        }

        // Updates the position of the new block so that it doesn't conflict
        // with any real block.
        this._newBlock.updatePositionB();

        if (this._showAdminControls) {
            // Necessary after updating the block position:
            this._adminControls.updateCoordinateDisplays();
        }

        // Finds the correct status message, and updates whether the block is
        // movable or fixed.
        if (this._newBlock.isStopped()) {
            if (tmp && !tmp.isDeleted()) {
                // Non-new block ground in the position of the new block.
                state = tmp.state(); // State of block in same pos. as new
                                     // block was.
                if (state === 2) {
                    // Real block in the same position as the new block.
                    this._responseToLastRequest = 2; // request accepted
                    this._newBlock.makeMovable(); // so that the user can
                                                  // continue
                } else {
                    // request not yet processed
                    this._responseToLastRequest = 1;
                }
            } else {
                // No non-new block found in the position of the new block.
                this._responseToLastRequest = 3; // request denied
                this._newBlock.makeMovable(); // so that the user can continue
            }
        }
    },

    // (Re-)renders blocks, but only if all necessary components have been
    // initialized, which is relevant only in the beginning.
    _renderBlocksIfFullyInitialized: function () {
        if (this._constructionBlocks.isInitializedWithServerData() &&
            this._camera.isInitializedWithServerData() &&
            this._blockProperties.isInitializedWithServerData()) {
            if (this._showAdminControls) {
                this._constructionBlocks.render();
            }
            this._newBlock.render();
        }
    },

    // (Re-)renders user controls, but only if all necessary components have
    // been initialized, which is relevant only in the beginning.
    _renderCoordinateControlsIfFullyInitialized: function () {
        if (this._camera.isInitializedWithServerData()) {
            this._userControls.renderCoordinateControls();
        }
    },

    // Updates the state of the new block (and related controls), but only if
    // all necessary components have been initialized, which is relevant only
    // in the beginning.
    _updateNewBlockStateIfFullyInitialized: function () {
        if (this._constructionBlocks.isInitializedWithServerData() &&
            this._blockProperties.isInitializedWithServerData()) {
            this._updateNewBlockPositionAndState();
            this._userControls.updateRequestRealButton();
            this._userControls.updateCoordinateControls(
                !this._newBlock.isMovable());
        }
    },

    // Updates the status message, but only if all necessary components have
    // been initialized, which is relevant only in the beginning.
    _updateStatusMessageIfFullyInitialized: function () {
        if (this._constructionBlocks.isInitializedWithServerData() &&
            this._blockProperties.isInitializedWithServerData()) {
            this._userControls.
                updateStatusMessage(this._responseToLastRequest);
        }
    },

    // Called after the construction blocks have changed.
    _onConstructionBlocksChanged: function () {
        if (this._showAdminControls) {
            this._adminControls.updateBlocksTable();
        }

        this._updateStatusMessageIfFullyInitialized();
        this._updateNewBlockStateIfFullyInitialized();
        this._renderBlocksIfFullyInitialized();
    },

    // Called after the camera settings have changed.
    _onCameraChanged: function () {
        if (this._showAdminControls) {
            this._adminControls.updateCameraControls(this._camera);
        }

        // Updates the rendering of the coordinate controls, which depend on
        // the camera position:
        this._renderCoordinateControlsIfFullyInitialized();

        this._renderBlocksIfFullyInitialized();
    },

    // Called after the block properties have changed.
    _onBlockPropertiesChanged: function () {
        // Updates the rendering of the coordinate controls, which depend on
        // some of the block properties:
        this._userControls.renderCoordinateControls();

        // Updates the rendering of the coordinate controls, which depend on
        // the block properties:
        this._renderCoordinateControlsIfFullyInitialized();

        // Updates the state (and related controls) of the new block, because
        // they depend on block properties such as collision settings:
        this._updateNewBlockStateIfFullyInitialized();

        // Updates the status message because it depends on the block
        // properties concerning attachment conditions (attachment of the new
        // to a real block):
        this._updateStatusMessageIfFullyInitialized();

        this._renderBlocksIfFullyInitialized();
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

    // Returns HTML code for the request real button. For IE6 the button is a
    // link instead of a div. Otherwise CSS for hovering doesn't get triggered.
    _requestRealButtonHtml: function () {
        var tmp1, tmp2;
        if (dojo.isIE && dojo.isIE === 6) {
            tmp1 = 'a href="javascript:void(0)"';
            tmp2 = 'a';
        } else {
            tmp1 = tmp2 = 'div';
        }
        return '<' + tmp1 + ' id="requestReal" >Make Real</' + tmp2 + '>';
    },

    // Inserts the base HTML code for the "view". It is initially hidden.
    _insertView: function () {
        // Instead of using a CSS background image, an image tag is used.
        // Reason: In Firefox 3.5/Win32, replacing the background image caused
        // flickering, even when making sure that the replacement image has
        // been preloaded.
        dojo.attr('view', 'innerHTML',
            '<img id="live" src="/images/placeholder.gif" alt="Live Image">' +
            '<div id="sensor">' +
            '<canvas id="sensorShadowCanvas" width="1" height="1">' +
            '</canvas>' +
            '<canvas id="sensorRealBlocksCanvas" width="1" height="1">' +
            '</canvas>' +
            '<canvas id="sensorPendingBlocksCanvas" width="1" height="1">' +
            '</canvas>' +
            '<canvas id="sensorNewBlockCanvas" width="1" height="1">' +
            '</canvas>' +
            '</div>' +
            '<div id="coordinateControls">' +
            '<canvas id="coordinateControlsCanvas" width="1" height="1">' +
            '</canvas>' +
            '</div>' +
            '<p id="status"></p>' +
            this._requestRealButtonHtml() + 
            '<a id="about" href="about">About</a>');

        // Initializes Explorer Canvas for elements that were added later to
        // the DOM.
        if (dojo.isIE) {
            G_vmlCanvasManager.initElement(dojo.byId('sensorShadowCanvas'));
            G_vmlCanvasManager.initElement(dojo.byId('sensorRealBlocksCanvas'));
            G_vmlCanvasManager.initElement(
                dojo.byId('sensorPendingBlocksCanvas'));
            G_vmlCanvasManager.initElement(dojo.byId('sensorNewBlockCanvas'));
            G_vmlCanvasManager.initElement(
                dojo.byId('coordinateControlsCanvas'));
        }
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

        if (this._updateTimeout) {
            // Clears the last timeout. May be necessary if the call to the
            // function has not been triggered by that timeout. Without
            // clearing the timeout, it may happen that two "timeout chains"
            // run concurrently.
            clearTimeout(this._updateTimeout);
        }
        this._updateTimeout = 
            setTimeout(function () {
                that._update(false);
            }, this._UPDATE_INTERVAL);
    },

    // Triggers an update of the construction with the data stored on the
    // server. Only updates the blocks if there is a new version. Fails
    // silently on error.
    //
    // If "firstUpdate" is true, then this is the first time the update is
    // performed.
    _update: function (firstUpdate) {
        var getDeletedBlocks, that = this;

        // Without the admin controls being shown, deleted blocks are of no use
        // (pending blocks are needed to determine whether a request has been
        // denied):
        getDeletedBlocks = this._showAdminControls ? 'true' : 'false';

        dojo.xhrGet({
            url: "/rpc/construction",
            content: {
                "blocksDataVersion": 
                this._constructionBlocks.versionOnServer(),
                "getDeletedBlocks": getDeletedBlocks,
                "cameraDataVersion": this._camera.versionOnServer(),
                "imageDataVersion": this._image.versionOnServer(),
                "blockPropertiesDataVersion": 
                this._blockProperties.versionOnServer()
            },
            handleAs: "json",
            load: function (data, ioargs) {
                that._updateSucceeded(data, ioargs, firstUpdate);
            }});
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
        var imageData = com.realitybuilder.addPrefix(
                'image.', this._adminControls.readImageControls()),
            cameraData = com.realitybuilder.addPrefix(
                'camera.', this._adminControls.readCameraControls()),
            content = {};
        dojo.mixin(content, imageData, cameraData);
        dojo.xhrPost({
            url: "/admin/rpc/update_settings",
            content: content,
            load: dojo.hitch(this, this._storeSettingsOnServerSucceeded)
        });
    }
});
