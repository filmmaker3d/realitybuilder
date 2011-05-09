// A button for changing the value of a coordinate of the new block.

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

dojo.provide('com.realitybuilder.CoordinateButton');

dojo.declare('com.realitybuilder.CoordinateButton', null, {
    // Color of button in highlighted state, and in standard state:
    _highlightColor: 'red',
    _standardColor: 'white',

    // Side length of the squared surface that the button is drawn on and that
    // is clickable.
    _sideLengthS: 37,

    _radiusS: 17.5, // Radius of the circle displayed, in sensor space.

    // Point where the button is centered in sensor space.
    centerS: null,

    // Node object representing the entire button.
    _canvas: null,

    // Group of the graphics objects rendered on the surface.
    _group: null,

    // True, iff the button is a button for increasing the coordinate.
    _plus: null,

    // The block whose coordinates may be changed with the button.
    _newBlock: null,

    // The coordinate (0, 1, or 3 for x, y, or z).
    _coordinate: null,

    // True, iff the button is disabled.
    _disabled: true,

    // Handle of the onclick event connection.
    _onclickHandle: null,

    // Vector in block space indicating the direction in that the block should
    // be moved.
    _deltaB: null,
    
    // Creates a button for changing the value of the coordinate "coordinate"
    // (0, 1, or 3 for x, y, or z) of the new block "newBlock". Centers the
    // button at the sensor space point "centerS". When the button is clicked,
    // then the block is moved. Iff "plus" is true, then the button is a
    // plus-button, meaning that clicking on it increases the coordinate.
    // Otherwise it is a minus-button. Initially the button is in disabled
    // state. It is rendered on the canvas "canvas".
    constructor: function (newBlock, centerS, coordinate, plus, canvas) {
        this.centerS = centerS;
        this._plus = plus;
        this._newBlock = newBlock;
        this._coordinate = coordinate;
        this._computeDeltaB();
        this._createNode();
    },

    highlight: function () {
        if (!this._disabled) {
            this._render(this._highlightColor);
        }
    },

    unhighlight: function () {
        this._render(this._standardColor);
    },

    radiusS: function () {
        return this._radiusS;
    },

    // Moves the center of the button to the sensor space point "centerS".
    move: function (centerS) {
        var l = this._sideLengthS;
        this._canvas.style.left = (centerS[0] - l / 2) + 'px';
        this._canvas.style.top = (centerS[1] - l / 2) + 'px';
        this.centerS = centerS;
    },

    // Disables the button, if "alwaysDisable" is true. Otherwise, enables the
    // button iff moving the block "newBlock" in the associated direction is
    // possible.
    update: function (alwaysDisable) {
        var deltaB, i;
        if (alwaysDisable) {
            this._disable();
        } else {
            deltaB = [];
            for (i = 0; i < 3; i += 1) {
                deltaB[i] = (i === this._coordinate) ? this._delta() : 0;
            }
            if (this._newBlock.wouldGoOutOfRange(deltaB)) {
                this._disable();
            } else {
                this._enable();
            }
        }
    },

    // Triggers moving of the new block, i.e. changing its coordinate.
    moveNewBlock: function () {
        this._newBlock.move(this._deltaB);
    },

    _computeDeltaB: function () {
        var i;
        this._deltaB = [];
        for (i = 0; i < 3; i += 1) {
            this._deltaB[i] = (i === this._coordinate) ? this._delta() : 0;
        }
    },

    // Direction for moving the block (-1 or +1).
    _direction: function () {
        return (this._plus ? 1 : -1);
    },

    // Delta by which to change the coordinate of the block.
    _delta: function () {
        return this._direction();
    },

    // Disables the button.
    _disable: function () {
        if (!this._disabled) {
            dojo.disconnect(this._onclickHandle);

            // necessary e.g. if mouse currently hovers
            this._render(this._standardColor);

            this._disabled = true;
        }
    },

    // Enables the button.
    _enable: function () {
        if (this._disabled) {
            this._onclickHandle = 
                dojo.connect(this._canvas, 'onclick', this, this.moveNewBlock);
            this._disabled = false;
        }
    },

    // Draws a transparent rectangle over the entire area of the button, i.e.
    // over the area of the surface "surface". This is a necessary for IE8
    // which seems to need something to be drawn in every place where the
    // button should receive mouse events.
    _drawRectangle: function (surface) {
        surface.createRect({x1: 0, y1: 0, 
            x2: surface.width, y2: surface.height}).setFill([0, 0, 0, 0]);
    },

    // Creates the DOM node with the button drawn on it.
    _createNode: function () {
        var l = this._sideLengthS;
        this._canvas = dojo.create('canvas', 
            {
                width: l, 
                height: l, 
                style: {
                    position: 'absolute', 
                    left: (this.centerS[0] - l / 2) + 'px',
                    top: (this.centerS[1] - l / 2) + 'px'}}, 
            'coordinateControls');
        if (dojo.isIE) {
            G_vmlCanvasManager.initElement(this._canvas);
        }
        dojo.connect(this._canvas, 'onmouseover', this, this.highlight);
        dojo.connect(this._canvas, 'onmouseout', this, this.unhighlight);

        this._render(this._standardColor);
    },

    // Renders the button in the color "color" (CSS format).
    _render: function (color) {
        var canvas = this._canvas,
            l = this._sideLengthS,
            context;
        if (canvas.getContext) {
            context = canvas.getContext("2d");
            com.realitybuilder.util.clearCanvas(canvas);

            context.strokeStyle = color;

            context.beginPath();
            context.arc(l / 2, l / 2, this._radiusS, 0, Math.PI * 2, true); 
            context.stroke();

            if (this._plus) {
                context.moveTo(l / 2, 4);
                context.lineTo(l / 2, l - 4);
                context.stroke();
            }

            context.moveTo(4, l / 2);
            context.lineTo(l - 4, l / 2);
            context.stroke();
        }
    }
});
