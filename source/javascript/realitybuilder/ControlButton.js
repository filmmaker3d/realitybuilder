// Button in the control panel for moving and positioning the new block.

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

dojo.provide('realitybuilder.ControlButton');

dojo.declare('realitybuilder.ControlButton', null, {
    // Function that's called when button is clicked:
    _onClicked: null,

    // Function that's called to check whether button should be enabled:
    _shouldBeEnabled: null,

    // Status of the button:
    _isEnabled: false,

    // Node object representing the button.
    _node: null,

    // Creates a control button associated with the ID "id". When the button is
    // clicked, then calls the function "onClicked". To decide whether the
    // button should be enabled, executes the function "shouldBeEnabled".
    constructor: function (id, onClicked, shouldBeEnabled) { 
        this._onClicked = onClicked;
        this._shouldBeEnabled = shouldBeEnabled;

        this._node = dojo.byId(id);

        dojo.connect(this._node, 'onclick', this, this._onClicked2);
        dojo.connect(this._node, 'onmouseover', this, this._onMouseOver);
        dojo.connect(this._node, 'onmouseout', this, this._onMouseOut);
    },

    _onMouseOver: function () {
        if (this._isEnabled) {
            dojo.addClass(this._node, 'hover');
        }
    },

    _onMouseOut: function () {
        dojo.removeClass(this._node, 'hover');
    },

    _onClicked2: function () {
        if (this._isEnabled) {
            this._onClicked();
        }
    },

    // Updates the enabled status of the button.
    update: function () {
        this._isEnabled = this._shouldBeEnabled();

        if (!this._isEnabled) {
            this._onMouseOut(); // necessary if mouse cursor is still over
                                // button
            dojo.addClass(this._node, 'disabled');
        } else {
            dojo.removeClass(this._node, 'disabled');
        }
    }
});
