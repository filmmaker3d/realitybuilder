// The sensor of the camera, displaying the live image plus objects on top of
// it.

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

dojo.provide('realitybuilder.Sensor');

dojo.declare('realitybuilder.Sensor', null, {
    // Canvases for drawing various parts.
    _realBlocksCanvas: null,
    _pendingBlocksCanvas: null,
    _shadowCanvas: null,
    _newBlockCanvas: null,

    // Dimensions in pixels.
    _width: null,
    _height: null,

    // Sets up the sensor of the camera, with width "width" and height
    // "height".
    constructor: function (width, height) {
        this._realBlocksCanvas = dojo.byId('sensorRealBlocksCanvas');
        this._pendingBlocksCanvas = dojo.byId('sensorPendingBlocksCanvas');
        this._shadowCanvas = dojo.byId('sensorShadowCanvas');
        this._newBlockCanvas = dojo.byId('sensorNewBlockCanvas');

        this._width = width;
        this._height = height;

        this._setCanvasesDimensions();

        // Sets the dimensions of the surrounding container so that it can
        // float as desired:
        var viewNode = dojo.byId('view');
        viewNode.style.width = width + 'px';
        viewNode.style.height = height + 'px';
    },

    // Sets the dimensions of the canvases.
    _setCanvasesDimensions: function () {
        var canvases = [
                this._realBlocksCanvas, 
                this._pendingBlocksCanvas, 
                this._shadowCanvas, 
                this._newBlockCanvas],
            width = this._width, height = this._height;
        dojo.forEach(canvases, function (canvas) {
            dojo.attr(canvas, 'width', width);
            dojo.attr(canvas, 'height', height);
            dojo.style(canvas, 'width', width + 'px');
            dojo.style(canvas, 'height', height + 'px');
        });        
    },

    realBlocksCanvas: function () {
        return this._realBlocksCanvas;
    },

    pendingBlocksCanvas: function () {
        return this._pendingBlocksCanvas;
    },

    shadowCanvas: function () {
        return this._shadowCanvas;
    },

    newBlockCanvas: function () {
        return this._newBlockCanvas;
    },

    _setCanvasVisibility: function (canvas, show) {
        dojo.style(canvas, 'visibility', show ? 'visible' : 'hidden');
    },

    // Iff show is true, then shows the real blocks.
    showRealBlocks: function (show) {
        this._setCanvasVisibility(this._realBlocksCanvas, show);
    },

    // Iff show is true, then shows the pending blocks.
    showPendingBlocks: function (show) {
        this._setCanvasVisibility(this._pendingBlocksCanvas, show);
    },

    width: function () {
        return this._width;
    },

    height: function () {
        return this._height;
    }
});
