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

/*global realityBuilder, realityBuilderDojo. FlashCanvas */

define(['./util',
        '../vendor/jquery-wrapped',
        '../vendor/underscore-wrapped'], function (util, $, _) {
    var object = {
        // Canvases for drawing various parts.
        _canvasNodes: null,

        // Dimensions in pixels.
        _width: 640,
        _height: 480,

        _sensorNode: null,

        // fixme: implement
        setDimensions: function (width, height) {
            this._width = width;
            this._height = height;

            _.each(this._canvasNodes, function (canvasNode) {
                canvasNode.attr();
            });
        },

        init: function () {
            this._sensorNode = $('<div>').css(this._styleBasedOnDefaults({
                position: 'relative'
            }));

            this._canvasNodes = {};
            _.each(['realBlocks', 'pendingBlocks', 'shadow', 'newBlock'],
                   _.bind(function (key) {
                       this._canvasNodes[key] =
                           this._addCanvasNode(this._sensorNode,
                                               this._width, this._height);
                   }, this));

            this.setRealBlocksVisibility(false);
            this.setPendingBlocksVisibility(false);
        },

        // Merges "style" into some basic style settings, which reset the style of
        // a block element to reasonable default values.
        _styleBasedOnDefaults: function (style) {
            var tmp = {
	            margin: 0,
	            padding: 0,
	            border: 0,
                display: 'block'
            };

            _.extend(tmp, style);

            return tmp;
        },

        node: function () {
            return this._sensorNode;
        },

        // Returns the canvas node.
        _addCanvasNode: function (sensorNode, width, height) {
            var canvasNode;

            canvasNode = $('<canvas>').attr({
                width: width,
                height: height
            }).css(this._styleBasedOnDefaults({
                position: 'absolute',
                left: 0,
                top: 0,
                width: width,
                height: height
            })).appendTo(sensorNode).get(0);

            if (util.isFlashCanvasActive()) {
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
            $(canvas).css('visibility', shouldBeVisible ? 'visible' : 'hidden');
        },

        _canvasIsVisible: function (canvas) {
            return $(canvas).css('visibility') === 'visible';
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
    };

    object.init();

    return object;
});
