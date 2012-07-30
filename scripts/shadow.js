// The shadow under the new block. It is used to indicate where the block is
// hovering.

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

/*global define */

define(['./construction_blocks',
        './shadow_obscuring_blocks',
        './layer_shadow',
        './sensor',
        './util',
        '../vendor/underscore-wrapped'
       ], function (constructionBlocks, shadowObscuringBlocks,
                    layerShadow, sensor, util, _) {
    return {
        _renderLayerShadow: function (context, newBlock, layerZB, color, alpha) {
            layerShadow.render(layerZB, color, newBlock);
            context.globalAlpha = alpha;
            context.drawImage(layerShadow.canvas(), 0, 0);
            context.globalAlpha = 1;
        },

        // Draws the shadow of the new block as seen by the sensor of the camera.
        //
        // Draws the shadow in the color "color" and with alpha transparency
        // "alpha".
        render: function (color, alpha, newBlock) {
            var canvas = sensor.shadowCanvas(), context,
            layerZB,
            maxLayerZB = constructionBlocks.highestRealBlocksZB();

            shadowObscuringBlocks.update(newBlock);

            if (canvas.getContext) {
                context = canvas.getContext('2d');
                util.clearCanvas(canvas);

                // draws shadow from bottom up, in each step removing parts that
                // are obscured by blocks in the layer above:
                for (layerZB = -1; layerZB <= maxLayerZB; layerZB += 1) {
                    if (layerZB < newBlock.zB()) {
                        this._renderLayerShadow(context, newBlock, layerZB,
                                                color, alpha);
                    }
                    shadowObscuringBlocks.subtract(context, layerZB + 1);
                }
                return;
            }
        },

        // Makes sure that the shadow is not shown on the sensor.
        clear: function () {
            var canvas = sensor.shadowCanvas();
            util.clearCanvas(canvas);
        }
    };
});
