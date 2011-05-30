// Control panel for moving and positioning the new block.

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

dojo.provide('com.realitybuilder.ControlPanel');

dojo.require('com.realitybuilder.ControlButton');

dojo.declare('com.realitybuilder.ControlPanel', null, {
    // New block that the control panel is associated with.
    _newBlock: null,

    // Buttons:
    _buttons: null,

    // Creates control panel for the block "newBlock".
    constructor: function (newBlock) { 
        var rb, nb, buttons;

        this._newBlock = newBlock;

        rb = com.realitybuilder;
        nb = newBlock;

        buttons = [];
        buttons.push(this._newCoordinateButton('incZButton', [0, 0, 1]));
        buttons.push(this._newCoordinateButton('decZButton', [0, 0, -1]));
        this._buttons = buttons;
    },

    _newCoordinateButton: function (id, deltaB) {
        var newBlock, onClicked, shouldBeEnabled;

        newBlock = this._newBlock;

        onClicked = function () {
            newBlock.move(deltaB);
        };

        shouldBeEnabled = function () {
            return (!newBlock.wouldGoOutOfRange(deltaB, 0) &&
                    newBlock.isMovable());
        };

        return new com.realitybuilder.ControlButton(id, 
                                                    onClicked, 
                                                    shouldBeEnabled);
    },

    // Updates the status of the buttons.
    update: function () {
        dojo.forEach(this._buttons, function (button) {
            button.update();
        });
    }
});
