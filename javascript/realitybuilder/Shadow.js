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

/*jslint browser: true, maxerr: 50, maxlen: 79, nomen: true, sloppy: true,
  unparam: true */

/*global realityBuilder, dojo, dojox, FlashCanvas */

dojo.provide('realityBuilder.Shadow');

dojo.require('realityBuilder.LayerShadow');
dojo.require('realityBuilder.ShadowObscuringBlocks');

dojo.declare('realityBuilder.Shadow', null, {
    // New block that the shadow is associated with.
    _newBlock: null,

    // Camera object, used for calculating the projection on the camera sensor.
    _camera: null,

    // Properties (shape, dimensions, etc.) of a block:
    _blockProperties: null,

    // Permament blocks in the construction, including real and pending blocks.
    // Needed for hidden lines removal and collision detection.
    _constructionBlocks: null,

    // Blocks that are used for graphically removing that parts of a shadow
    // that are not actually visible.
    _shadowObscuringBlocks: null,

    // Only one instance of LayerShadow is used, to avoid memory leaks. See the
    // documentation of LayerShadow for more information.
    _layerShadow: null,

    // Creates the shadow of the block "newBlock". When the shadow is rendered,
    // it is as seen by the sensor of the camera "camera". For finding which
    // parts of the shadow have to be obscured, the list of non-new blocks in
    // the construction is used: "constructionBlocks"
    constructor: function (newBlock, blockProperties, camera,
                           constructionBlocks) {
        this._newBlock = newBlock;
        this._blockProperties = blockProperties;
        this._camera = camera;
        this._constructionBlocks = constructionBlocks;

        this._shadowObscuringBlocks =
            new realityBuilder.ShadowObscuringBlocks(newBlock,
                                                     blockProperties,
                                                     camera,
                                                     constructionBlocks);

        this._layerShadow =
            new realityBuilder.LayerShadow(newBlock, blockProperties,
                                               camera, constructionBlocks);
    },

    _renderLayerShadow: function (context, newBlock, camera,
                                  constructionBlocks, layerZB, color, alpha) {
        this._layerShadow.render(layerZB, color);
        context.globalAlpha = alpha;
        context.drawImage(this._layerShadow.canvas(), 0, 0);
        context.globalAlpha = 1;
    },

    // Draws the shadow of the new block as seen by the sensor of the camera.
    //
    // Draws the shadow in the color "color" and with alpha transparency
    // "alpha".
    render: function (color, alpha) {
        var canvas = this._camera.sensor().shadowCanvas(), context,
            layerZB,
            newBlock = this._newBlock, camera = this._camera,
            constructionBlocks = this._constructionBlocks,
            maxLayerZB = constructionBlocks.highestRealBlocksZB();

        this._shadowObscuringBlocks.update();

        if (canvas.getContext) {
            context = canvas.getContext('2d');
            realityBuilder.util.clearCanvas(canvas);

            // draws shadow from bottom up, in each step removing parts that
            // are obscured by blocks in the layer above:
            for (layerZB = -1; layerZB <= maxLayerZB; layerZB += 1) {
                if (layerZB < newBlock.zB()) {
                    this._renderLayerShadow(context, newBlock, camera,
                                            constructionBlocks, layerZB,
                                            color, alpha);
                }
                this._shadowObscuringBlocks.subtract(context, layerZB + 1);
            }
            return;
        }
    },

    // Makes sure that the shadow is not shown on the sensor.
    clear: function () {
        var canvas = this._camera.sensor().shadowCanvas();
        realityBuilder.util.clearCanvas(canvas);
    }
});
