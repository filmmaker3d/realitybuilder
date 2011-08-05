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

/*global realitybuilder, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('realitybuilder.ControlPanel');

dojo.require('realitybuilder.ControlButton');

dojo.declare('realitybuilder.ControlPanel', null, {
    // New block that the control panel is associated with.
    _newBlock: null,

    // Buttons:
    _buttons: null,

    // Node object representing the panel.
    _node: null,

    // Creates control panel for the block "newBlock".
    constructor: function (newBlock) { 
        var rb, nb, buttons;

        this._newBlock = newBlock;

        this._node = dojo.byId('controlPanel');

        rb = realitybuilder;
        nb = newBlock;

        buttons = [];
        buttons.push(this._createCoordinateButton('incX', [1, 0, 0]));
        buttons.push(this._createCoordinateButton('decX', [-1, 0, 0]));
        buttons.push(this._createCoordinateButton('incY', [0, 1, 0]));
        buttons.push(this._createCoordinateButton('decY', [0, -1, 0]));
        buttons.push(this._createCoordinateButton('incZ', [0, 0, 1]));
        buttons.push(this._createCoordinateButton('decZ', [0, 0, -1]));
        buttons.push(this._createRotate90Button());
        buttons.push(this._createRequestRealButton());
        this._buttons = buttons;
    },

    _createCoordinateButton: function (type, deltaB) {
        var newBlock, onClicked, shouldBeEnabled;

        newBlock = this._newBlock;

        onClicked = function () {
            newBlock.move(deltaB);
        };

        shouldBeEnabled = function () {
            return (!newBlock.wouldGoOutOfRange(deltaB, 0) &&
                    newBlock.isMovable());
        };

        return new realitybuilder.ControlButton(type + 'Button', 
                                                    onClicked, 
                                                    shouldBeEnabled);
    },

    _createRotate90Button: function () {
        var newBlock, onClicked, shouldBeEnabled;

        newBlock = this._newBlock;

        onClicked = function () {
            newBlock.rotate90();
        };

        shouldBeEnabled = function () {
            return (!newBlock.wouldGoOutOfRange([0, 0, 0], 1) &&
                    newBlock.isRotatable());
        };

        return new realitybuilder.ControlButton('rotate90Button', 
                                                    onClicked, 
                                                    shouldBeEnabled);
    },

    _createRequestRealButton: function () {
        var newBlock, onClicked, shouldBeEnabled;

        newBlock = this._newBlock;

        onClicked = function () {
            newBlock.requestMakeReal();
        };

        shouldBeEnabled = function () {
            return newBlock.canBeMadeReal() && !newBlock.isStopped();
        };

        return new realitybuilder.ControlButton('requestRealButton', 
                                                    onClicked, 
                                                    shouldBeEnabled);
    },

    // Updates the status of the buttons and that of the panel itself:
    update: function () {
        dojo.forEach(this._buttons, function (button) {
            button.update();
        });

        if (this._newBlock.isStopped()) {
            dojo.addClass(this._node, 'disabled');
        } else {
            dojo.removeClass(this._node, 'disabled');
        }
    }
});
