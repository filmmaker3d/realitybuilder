// Admin interface.

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

dojo.provide('com.realitybuilder.AdminControls');

dojo.require('dojox.date.posix');

dojo.declare('com.realitybuilder.AdminControls', null, {
    // The construction that the admin controls are associated with.
    _construction: null,

    // Creates the admin interface associated with the construction
    // "construction".
    constructor: function (construction) {
        this._construction = construction;

        dojo.byId('bottomBar').style.width = 
            construction.camera().sensor().width() + 'px';

        this.updateToggleRealButton();
        this.updateTogglePendingButton();

        dojo.connect(dojo.byId('saveSettingsButton'), 'onclick', 
            this._construction, this._construction.storeSettingsOnServer);
        dojo.connect(dojo.byId('previewCameraButton'), 'onclick', 
            this, this.updateCamera);

        dojo.connect(dojo.byId('toggleRealButton'), 'onclick', 
            this._construction, this._construction.toggleReal);
        dojo.connect(dojo.byId('togglePendingButton'), 'onclick', 
            this._construction, this._construction.togglePending);

        dojo.connect(dojo.byId('logoutButton'), 'onclick', this, this.logOut);
    },

    // Logs the administrator out, sending him back to the login screen.
    logOut: function () {
        location.href = logoutUrl;
    },

    updateToggleRealButton: function () {
        dojo.byId('toggleRealButton').innerHTML = 
            (this._construction.showReal() ? "Hide" : "Show") + " Real Blocks";
    },

    updateTogglePendingButton: function () {
        dojo.byId('togglePendingButton').innerHTML = 
            (this._construction.showPending() ? "Hide" : "Show") + 
            " Pending Blocks";
    },

    // Updates controls defining the camera "camera".
    updateCameraControls: function (camera) {
        var position = camera.position();
        dojo.byId('cameraXTextField').value = position[0];
        dojo.byId('cameraYTextField').value = position[1];
        dojo.byId('cameraZTextField').value = position[2];
        dojo.byId('cameraAXTextField').value = camera.aX();
        dojo.byId('cameraAYTextField').value = camera.aY();
        dojo.byId('cameraAZTextField').value = camera.aZ();
        dojo.byId('cameraFlTextField').value = camera.fl();
        dojo.byId('cameraSensorResolutionTextField').value = 
            camera.sensorResolution();
    },

    updateImageControls: function (image) {
        dojo.byId('imageUrlTextField').value = image.url();
        dojo.byId('imageUpdateIntervalServerTextField').value = 
            image.updateIntervalServer();
    },

    // Returns data describing the image settings in a format that is a subset
    // of that used for exchanging image data with the server.
    readImageControls: function () {
        var data = {
            'url': dojo.byId('imageUrlTextField').value || '',
            'updateIntervalServer': 
                parseFloat(dojo.byId('imageUpdateIntervalServerTextField').
                           value) || 5};
        return data;
    },

    // Returns data describing the camera settings in a format that is a subset
    // of that used for exchanging camera data with the server.
    readCameraControls: function () {
        var data = {
            "position": [parseFloat(dojo.byId('cameraXTextField').value) || 0,
                         parseFloat(dojo.byId('cameraYTextField').value) || 0,
                         parseFloat(dojo.byId('cameraZTextField').value) || 0],
            "aX": parseFloat(dojo.byId('cameraAXTextField').value) || 0,
            "aY": parseFloat(dojo.byId('cameraAYTextField').value) || 0,
            "aZ": parseFloat(dojo.byId('cameraAZTextField').value) || 0,
            "fl": parseFloat(dojo.byId('cameraFlTextField').value) || 1,
            "sensorResolution": 
                parseFloat(dojo.byId('cameraSensorResolutionTextField').value)
                || 100};
        return data;
    },

    // Updates the camera, reading data from the camera controls.
    updateCamera: function () {
        this._construction.camera().update(this.readCameraControls());
    },

    updateCoordinateDisplays: function () {
        var positionB, a;

        positionB = this._construction.newBlock().positionB();
        a = this._construction.newBlock().a();

        dojo.byId('newBlockXB').innerHTML = positionB[0].toString();
        dojo.byId('newBlockYB').innerHTML = positionB[1].toString();
        dojo.byId('newBlockZB').innerHTML = positionB[2].toString();
        dojo.byId('newBlockA').innerHTML = a.toString();
    },

    // Sorting function for sorting blocks for display in the table.
    _sortForTable: function (x, y) {
        // Sorts first by state (pending < real < deleted), and then by
        // date-time.
        if (x.state() === y.state()) {
            // state the same => sort by date-time
            if (x.timeStamp() > y.timeStamp()) {
                return -1;
            } else if (x.timeStamp() < y.timeStamp()) {
                return 1;
            } else {
                return 0;
            }
        } else if (x.state() === 1) {
            return -1;
        } else if (x.state() === 2) {
            return y.state() === 1 ? 1 : -1;
        } else {
            return 1;
        }
    },

    // Returns the list of all blocks, except the new block, sorted for display
    // in the table.
    _blocksSortedForTable: function () {
        // The blocks array is copied since the original array should not be
        // changed.
        var tmp = dojo.map(this._construction.constructionBlocks().blocks(),
            function (block) {
                return block;
            });
        tmp.sort(this._sortForTable);
        return tmp;
    },

    // Reads the value of the state selector "select" associated with the block
    // "block" and triggers setting of the state.
    _applyStateFromStateSelector: function (select, block) {
        this._construction.constructionBlocks().
            setBlockStateOnServer(block.positionB(), block.a(),
                                  parseInt(select.value, 10));
    },

    // Returns a node representing a select button for the state of the block
    // "block", with the state of that block preselected.
    _stateSelector: function (block) {
        var select = document.createElement('select'),
            stateNames = ['Deleted', 'Pending', 'Real'],
            state, stateName, option;
        dojo.attr(select, 'size', 1);
        for (state = 0; state < 3; state += 1) {
            stateName = stateNames[state];
            option = document.createElement('option');
            dojo.attr(option, 'value', state);
            if (state === block.state()) {
                dojo.attr(option, 'selected', '');
            }
            option.innerHTML = stateName;
            select.appendChild(option);
        }

        dojo.connect(select, 'onchange', this, function (event) {
            this._applyStateFromStateSelector(select, block);
        });
        
        return select;
    },

    // Adds a row for the block "block" to the table body "tableBody"
    // displaying the list of blocks.
    _appendBlocksTableRow: function (block, tableBody) {
        var positionB, row, date, dateTimeFormatted, rowValues, cell;

        positionB = block.positionB();
        row = document.createElement('tr');
        date = new Date(block.timeStamp() * 1000);
        dateTimeFormatted = 
            dojox.date.posix.strftime(date, '%Y-%m-%d %H:%M:%S');
        rowValues = [
            positionB[0], positionB[1], positionB[2], block.a(), 
            dateTimeFormatted, this._stateSelector(block)];

        dojo.forEach(rowValues, function (rowValue, i) {
            cell = document.createElement('td');
            if (i < 5) {
                cell.innerHTML = rowValue;
            } else {
                cell.appendChild(rowValue);
            }
            if (i < 4) {
                dojo.addClass(cell, 'number');
            }
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    },

    // Refreshes the table displaying the list of blocks.
    updateBlocksTable: function () {
        var matches = dojo.query('#blocksTable tbody'),
            tableBody = matches[0],
            blocks = this._blocksSortedForTable(),
            that = this;
        dojo.empty(tableBody);
        dojo.forEach(blocks, function (block) {
            that._appendBlocksTableRow(block, tableBody);
        });
    }
});
