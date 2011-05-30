// User controls. These controls allow moving a block, making it real, etc.

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

dojo.provide('com.realitybuilder.UserControls');

dojo.require('com.realitybuilder.CoordinateControls');

dojo.declare('com.realitybuilder.UserControls', null, {
    // The construction that the user controls are associated with.
    _construction: null,

    // The div containing the coordinate controls.
    _node: null,

    // Creates user controls for the construction "construction".
    constructor: function (construction) { 
        this._construction = construction;
        this._coordinateControls = 
            new com.realitybuilder.CoordinateControls(
                construction.newBlock(), construction.camera());
        this._node = dojo.byId('userControls');
        dojo.connect(dojo.byId('requestReal'), 'onclick', 
            construction, construction.requestReal);
    },

    updateCoordinateControls: function (disableAll) {
        this._coordinateControls.update(disableAll);
    },

    renderCoordinateControls: function () {
        this._coordinateControls.render();
    },

    // Updates the button which allows making the current block real.
    updateRequestRealButton: function () {
        var buttonNode = dojo.byId('requestReal'),
            newBlock = this._construction.newBlock();
        if (newBlock.isMovable() && newBlock.canBeMadeReal()) {
            dojo.style(buttonNode, 'visibility', 'visible');
        } else {
            // real or pending, or too high => button is disabled
            dojo.style(buttonNode, 'visibility', 'hidden');
        }
    },

    // Updates the status message to reflect the response to the last request
    // "responseToLastRequest".
    updateStatusMessage: function (responseToLastRequest) {
        var html = "",
            newBlock = this._construction.newBlock();
        switch (responseToLastRequest) {
        case 0:
            if (newBlock.canBeMadeReal()) {
                html = "To request having the block built in its current " + 
                    "position, make it real.";
            } else {
                html = "Move the block to a position where you want it to be " +
                    "built.";
            }
            break;
        case 1:
            html = "Your request is being processed. Be patient...";
            break;
        case 2:
            html = "Your block has been built. Continue...";
            break;
        case 3:
            html = "Your request has been denied. Continue...";
            break;
        }
        dojo.byId('status').innerHTML = html;
    }
});
