// The shadow under the new block. It is used to indicate where the block is
// hovering.

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

dojo.provide('com.realitybuilder.Shadow');

dojo.require('com.realitybuilder.LayerShadow');
dojo.require('com.realitybuilder.ShadowObscuringBlocks');

dojo.declare('com.realitybuilder.Shadow', null, {
    // New block that the shadow is associated with.
    _newBlock: null,

    // Camera object, used for calculating the projection on the camera sensor.
    _camera: null,

    // Permament blocks in the construction, including real and pending blocks.
    // Needed for hidden lines removal and collision detection.
    _constructionBlocks: null,

    // Blocks that are used for graphically removing that parts of a shadow
    // that are not actually visible.
    _shadowObscuringBlocks: null,

    // Creates the shadow of the block "newBlock". When the shadow is rendered,
    // it is as seen by the sensor of the camera "camera". For finding which
    // parts of the shadow have to be obscured, the list of non-new blocks in
    // the construction is used: "constructionBlocks"
    constructor: function (newBlock, camera, constructionBlocks) {
        this._newBlock = newBlock;
        this._camera = camera;
        this._constructionBlocks = constructionBlocks;

        this._shadowObscuringBlocks =
            new com.realitybuilder.ShadowObscuringBlocks(newBlock, camera,
                                                         constructionBlocks);
    },

    // Sort function, for ordering shadow parts by height/layer. From bottom to
    // top.
    _sortByHeight: function (shadowPart1, shadowPart2) {
        if (shadowPart1.zB() > shadowPart2.zB()) {
            return 1;
        } else if (shadowPart1.zB() < shadowPart2.zB()) {
            return -1;
        } else {
            return 0;
        }
    },

    // Updates the sensor space of the shadow parts.
    _updateSensorSpace: function () {
        dojo.forEach(this._shadowParts, function (shadowPart) {
            shadowPart.updateSensorSpace();
        });
    },

    // Orders the shadow parts, from bottom to top.
    _sortShadowParts: function () {
        this._shadowParts.sort(this._sortByHeight);
    },

    _renderLayerShadow: function (context, newBlock, camera, 
                                  constructionBlocks, layerZB) {
        var layerShadow;

        layerShadow = 
            new com.realitybuilder.LayerShadow(newBlock, camera, 
                                               constructionBlocks,
                                               layerZB);
        layerShadow.render();
        context.globalAlpha = 0.2;
        context.drawImage(layerShadow.canvas(), 0, 0);
        context.globalAlpha = 1;

        layerShadow = null; // FIXME
    },

    // Draws the shadow as seen by the sensor of the camera. Depends on the
    // vertexes in view coordinates. (FIXME: what?)
    render: function () {
        var 
        canvas = this._camera.sensor().shadowCanvas(), context, 
        layerZB,
        newBlock = this._newBlock, camera = this._camera,
        constructionBlocks = this._constructionBlocks;

        this._shadowObscuringBlocks.update();

        if (canvas.getContext) {
            context = canvas.getContext('2d');
            com.realitybuilder.util.clearCanvas(canvas);

            for (layerZB = -1; layerZB <= newBlock.maxZB() - 1; layerZB += 1) {
                if (layerZB < newBlock.zB()) {
                    this._renderLayerShadow(context, newBlock, camera, 
                                            constructionBlocks, layerZB);
                }
                this._shadowObscuringBlocks.subtract(context, layerZB + 1);
            }
        }

        /* FIXME - reactivate:
        var canvas = this._camera.sensor().shadowCanvas(), context;
        this._updateSensorSpace();
        this._sortShadowParts();
        if (canvas.getContext) {
            context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            dojo.forEach(this._shadowParts, function (shadowPart) {
                shadowPart.render(context);
            });
        }
        */
    },

    // Makes sure that the shadow is not shown on the sensor.
    clear: function () {
        var canvas = this._camera.sensor().shadowCanvas(), context;
        if (canvas.getContext) {
            context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
});
