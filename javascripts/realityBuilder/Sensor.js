// The sensor of the camera, displaying objects on top of the background image.

// Copyright 2010-2012 Felix E. Klee <felix.klee@inka.de>
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

/*jslint browser: true, maxerr: 50, maxlen: 79, nomen: true, sloppy: true,
  unparam: true */

/*global realityBuilder, dojo, FlashCanvas */

dojo.provide('realityBuilder.Sensor');

dojo.declare('realityBuilder.Sensor', null, {
    // Canvases for drawing various parts.
    _canvasNodes: null,

    // Dimensions in pixels.
    _width: null,
    _height: null,

    // Sets up the sensor of the camera, with width "width" and height
    // "height". The sensor is placed as a child of the DOM node "node".
    constructor: function (width, height, node) {
        var sensorNode;

        sensorNode = this._addSensorNode(node);

        this._canvasNodes = {};
        dojo.forEach(['realBlocks', 'pendingBlocks', 'shadow', 'newBlock'],
                     dojo.hitch(this, function (key) {
                this._canvasNodes[key] =
                    this._addCanvasNode(sensorNode, width, height);
            }));

        this.setRealBlocksVisibility(false);
        this.setPendingBlocksVisibility(false);

        this._width = width;
        this._height = height;
    },

    // Merges "style" into some basic style settings, which reset the style of
    // a block element to reasonable default values.
    _styleBasedOnDefaults: function (style) {
        var tmp;

        tmp = {
	        margin: 0,
	        padding: 0,
	        border: 0,
            display: 'block'
        };

        dojo.mixin(tmp, style);

        return tmp;
    },

    _addSensorNode: function (node) {
        var sensorNode;

        sensorNode = dojo.create('div', null, node);

        dojo.style(sensorNode, this._styleBasedOnDefaults({
            position: 'relative'
        }));

        return sensorNode;
    },

    // Returns the canvas node.
    _addCanvasNode: function (sensorNode, width, height) {
        var canvasNode;

        canvasNode = dojo.create('canvas', {
            width: width,
            height: height
        }, sensorNode);

        dojo.style(canvasNode, this._styleBasedOnDefaults({
            position: 'absolute',
            left: 0,
            top: 0,
            width: width,
            height: height
        }));

        if (realityBuilder.util.isFlashCanvasActive()) {
            FlashCanvas.initElement(canvasNode);
        }

        return canvasNode;
    },

    realBlocksCanvas: function () {
        return this._canvasNodes.realBlocks;
    },

    pendingBlocksCanvas: function () {
        return this._canvasNodes.pendingBlocks;
    },

    shadowCanvas: function () {
        return this._canvasNodes.shadow;
    },

    newBlockCanvas: function () {
        return this._canvasNodes.newBlock;
    },

    _setCanvasVisibility: function (canvas, shouldBeVisible) {
        dojo.style(canvas, 'visibility',
                   shouldBeVisible ? 'visible' : 'hidden');
    },

    _canvasIsVisible: function (canvas) {
        return dojo.style(canvas, 'visibility') === 'visible';
    },

    realBlocksAreVisible: function () {
        return this._canvasIsVisible(this._canvasNodes.realBlocks);
    },

    pendingBlocksAreVisible: function () {
        return this._canvasIsVisible(this._canvasNodes.pendingBlocks);
    },

    setRealBlocksVisibility: function (shouldBeVisible) {
        this._setCanvasVisibility(this._canvasNodes.realBlocks,
                                  shouldBeVisible);
    },

    setPendingBlocksVisibility: function (shouldBeVisible) {
        this._setCanvasVisibility(this._canvasNodes.pendingBlocks,
                                  shouldBeVisible);
    },

    width: function () {
        return this._width;
    },

    height: function () {
        return this._height;
    }
});
