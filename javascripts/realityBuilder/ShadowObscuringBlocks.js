// "Shadow obscuring blocks": Blocks that are used for graphically removing
// that parts of a shadow that are not actually visible.
//
// Example 1:
//
// * Real blocks with new block hovering above (NN), and shadow (_) how it
//   should look:
//
//          NN
//          __
//       [][][]
//     [][]  [][]
//     [][]  [][]
//
// * Corresponding shadow obscuring blocks:
//
//          NN
//          __
//       [][][]
//     [][][][][]
//     [][][][][]
//
//   Without the two additional blocks, a shadow would falsely be visible below
//   one of the real blocks:
//
//          NN
//          __
//       [][][]
//       []  []
//     [][] _[][]
//
//   Note that for obscuring the shadow with the two additional blocks, only
//   their bottom is drawn. Otherwise too much would be obscured. This is the
//   case for all additional blocks.
//
// Example 2:
//
// * Same as above, but with different position of new block. How it should
//   look:
//
//       [][][]
//     [][]NN[][]
//     [][]__[][]
//
// * Corresponding shadow obscuring blocks (only blocks whose bounding boxes
//   that overlap with bounding box of shadow are taken into account - depends
//   on camera location):
//
//       [][][]
//     [][]NN[][]
//     [][]__[][]
//
//   This time, no additional blocks are used because otherwise the shadow
//   would not appear at all.
//
// In a nutshell, the shadow obscuring blocks in each layer are comprised of:
//
// * Copies of all real blocks in that layer.
//
// * If the layer is below the new block: Copies of all shadow obscuring blocks
//   from the layer above.

// Sometimes the term "full shadow" is used, which refers to the shadow how it
// would look if the all blocks in the layer would form an infinite plane
// without holes.

// Copyright 2011-2012 Felix E. Klee <felix.klee@inka.de>
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

dojo.provide('realityBuilder.ShadowObscuringBlocks');

dojo.declare('realityBuilder.ShadowObscuringBlocks', null, {
    // The blocks, sorted by height, from top to bottom.
    _blocksSorted: null,

    // New block that the shadow is associated with.
    _newBlock: null,

    // Permament blocks in the construction, including real and pending blocks.
    // Needed for hidden lines removal and collision detection.
    _constructionBlocks: null,

    constructor: function (newBlock, constructionBlocks) {
        this._newBlock = newBlock;
        this._constructionBlocks = constructionBlocks;
    },

    _copyBlocksToLayer: function (srcBlocks, dstZB) {
        var blocks = [], that = this,
            _ = realityBuilder._;

        _.each(srcBlocks, function (srcBlock) {
            var dstBlock, dstPosB;

            dstPosB = [srcBlock.xB(), srcBlock.yB(), dstZB];
            dstBlock = new realityBuilder.Block(dstPosB, srcBlock.a());
            dstBlock.onlySubtractBottom();
            blocks.push(dstBlock);
        });

        return blocks;
    },

    // Updates the list of blocks (see definition of "shadow obscuring
    // blocks").
    update: function () {
        var zB,
            newBlock = this._newBlock,
            cbs = this._constructionBlocks,
            blocks = [],
            blocksInLayer,
            blocksInPrevLayer = [],
            copiedBlocks;

        for (zB = cbs.highestRealBlocksZB(); zB >= 0; zB -= 1) {
            // Collects shadow obscuring blocks for current layer:
            blocksInLayer = cbs.realBlocksInLayer(zB);

            if (zB < newBlock.zB()) {
                copiedBlocks = this._copyBlocksToLayer(blocksInPrevLayer, zB);
                blocksInLayer = blocksInLayer.concat(blocksInLayer,
                                                     copiedBlocks);
            }

            blocks = blocks.concat(blocksInLayer);

            blocksInPrevLayer = blocksInLayer;
        }

        this._blocksSorted = blocks;
    },

    // Returns the blocks with the z coordination "zB", in block space.
    _blocksInLayer: function (zB) {
        var blocksSorted, block, i, blocks = [];

        blocksSorted = this._blocksSorted;

        for (i = 0; i < blocksSorted.length; i += 1) {
            block = blocksSorted[i];
            if (block.zB() === zB) {
                blocks.push(block);
            } else if (block.zB() < zB) {
                break; // no further matching blocks in sorted array
            }
        }

        return blocks;
    },

    // Graphically subtract the shadow obscuring blocks with vertical position
    // "zB" from the canvas with the rendering context "context".
    subtract: function (context, zB) {
        var blocksInLayer = this._blocksInLayer(zB), _ = realityBuilder._;

        _.each(blocksInLayer, function (block) {
            block.subtract(context);
        });
    }
});
