// The coordinate controls that control the movement of the new block in the
// construction.

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

dojo.provide('com.realitybuilder.CoordinateControls');

dojo.require('com.realitybuilder.CoordinateButton');

dojo.declare('com.realitybuilder.CoordinateControls', null, {
    // List of all coordinate buttons, with index: 2 * coordinate + (plus ? 1 :
    // 0)
    _coordinateButtons: null,

    // Block that is controlled.
    _newBlock: null,

    // Canvas on which the line connecting the buttons is drawn.
    _canvas: null,

    // Camera that is used for calculating perspecive projection.
    _camera: null,

    // Creates the coordinate controls that control the movement of the new
    // block "newBlock" in the construction. For calculating perspective
    // projection, the camera "camera" is used.
    constructor: function (newBlock, camera) {
        this._newBlock = newBlock;
        this._camera = camera;
        this._coordinateButtons = [];
        this._canvas = dojo.byId('coordinateControlsCanvas');
        this._setCanvasDimensions();
        this.render();
    },

    _setCanvasDimensions: function () {
        var sensor = this._camera.sensor(),
            width = sensor.width(), height = sensor.height();
        dojo.attr(this._canvas, 'width', width);
        dojo.attr(this._canvas, 'height', height);
        dojo.style(this._canvas, 'width', width + 'px');
        dojo.style(this._canvas, 'height', height + 'px');
    },

    // Updates the coordinate buttons, setting their enabled/disabled state. If
    // "disableAll" is true, then the coordinate buttons are disabled in any
    // case.
    update: function (disableAll) {
        var cbs = this._coordinateButtons;
        dojo.forEach(cbs, function (cb) {
            cb.update(disableAll);
        });
    },

    // Draws the controls.
    render: function () {
        if (this._canvas.getContext) {
            var context = this._canvas.getContext('2d');
            context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }
        this._renderButtonPair(0, [3, -1.5, 0], [7, -1.5, 0]);
        this._renderButtonPair(1, [11.5, 3, 0], [11.5, 7, 0]);
        this._renderButtonPair(2, [0, -1.5, 1], [0, -1.5, 4]);
    },

    // Draws a line connecting the buttons "button1" and "button2".
    _renderLine: function (button1, button2) {
        var center1S, center2S, radiusS, connectionS, polarConnectionS,
            angle, distance, offset1S, offset2S, point1S, point2S, context;

        center1S = button1.centerS;
        center2S = button2.centerS;
        radiusS = button1.radiusS(); // same for both buttons

        // Connection between the two center points:
        connectionS = [
            center2S[0] - center1S[0], center2S[1] - center1S[1]];
        polarConnectionS = 
            com.realitybuilder.util.cartesianToPolar(connectionS);
        angle = polarConnectionS[0];
        distance = polarConnectionS[1];

        // Line end points:
        offset1S = com.realitybuilder.util.polarToCartesian(
            [angle, radiusS + 0.5]);
        offset2S = com.realitybuilder.util.polarToCartesian(
            [angle, distance - radiusS - 0.5]);
        point1S = com.realitybuilder.util.addS(center1S, offset1S);
        point2S = com.realitybuilder.util.addS(center1S, offset2S);

        if (this._canvas.getContext) {
            context = this._canvas.getContext('2d');
            context.strokeStyle = 'white';
            context.beginPath();
            context.moveTo(point1S[0], point1S[1]);
            context.lineTo(point2S[0], point2S[1]);
            context.stroke();
        }
    },

    // Makes sure that the button for controling the coordinate "coordinate"
    // exists and is centered at the block space point "pointB". If the button
    // has not been drawn before, it is created. Otherwise the position of the
    // existing button is updated. Whether the button is a plus button is
    // determined by the value of "plus". Returns the button.
    _renderButton: function (coordinate, plus, pointB) {
        var pointS = this._camera.blockToSensor(pointB),
            i = 2 * coordinate + (plus ? 1 : 0),
            button;
        if (this._coordinateButtons[i]) {
            button = this._coordinateButtons[i];
            button.move(pointS);
        } else {
            button = new com.realitybuilder.CoordinateButton(
                this._newBlock, pointS, coordinate, plus);
            this._coordinateButtons[i] = button;
        }
        return button;
    },

    // Renders a button pair, with the minus-button at the point in block space
    // "point1B" and the plus button at "point2B". The buttons are connected by
    // a line. The coordinate that these buttons control is "coordinate" (0, 1,
    // or 2 for x, y, or z). If the buttons already exist, then they are moved.
    _renderButtonPair: function (coordinate, point1B, point2B) {
        var button1 = this._renderButton(coordinate, false, point1B),
            button2 = this._renderButton(coordinate, true, point2B);
        this._renderLine(button1, button2);
    }
});
