// All blocks permanently in the construction, including deleted blocks and
// pending blocks. The new, user positionable block is not part of the
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

/*global realitybuilder, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('realitybuilder.ConstructionBlocks');

dojo.require('realitybuilder.ConstructionBlock');
dojo.require('realitybuilder.util');

dojo.declare('realitybuilder.ConstructionBlocks', null, {
    // Version of blocks data last retrieved from the server, or "-1"
    // initially. Is a string in order to be able to contain very large
    // integers.
    _versionOnServer: '-1',

    // Construction that the blocks are associated with.
    _construction: null,

    // Properties (shape, dimensions, etc.) of a block:
    _blockProperties: null,

    // Properties of a construction block:
    _constructionBlockProperties: null,

    // The blocks.
    _blocks: null,

    // All real blocks, sorted by height, from top to bottom.
    _realBlocksSorted: null,

    // All blocks that are pending.
    _pendingBlocks: null,

    // Canvases for drawing real and pending blocks.
    _realBlocksCanvas: null,
    _pendingBlocksCanvas: null,

    // Creates a container for the blocks associated with the construction
    // "construction".
    constructor: function (construction, blockProperties, 
                           constructionBlockProperties) {
        this._blockProperties = blockProperties;
        this._constructionBlockProperties = constructionBlockProperties;
        this._blocks = [];
        this._realBlocksSorted = [];
        this._construction = construction;
        var sensor = construction.camera().sensor();
        this._realBlocksCanvas = sensor.realBlocksCanvas();
        this._pendingBlocksCanvas = sensor.pendingBlocksCanvas();
    },

    blocks: function () {
        return this._blocks;
    },

    pendingBlocks: function () {
        return this._pendingBlocks;
    },

    realBlocksSorted: function () {
        return this._realBlocksSorted;
    },

    // Returns block space z coordinate of the highest real blocks, or -1 if
    // there are no real blocks.
    highestRealBlocksZB: function () {
        if (this._realBlocksSorted.length > 0) {
            return this._realBlocksSorted[0].zB();
        } else {
            return -1;
        }
    },

    // Returns all blocks positioned at z coordinate "zB", in block space.
    realBlocksInLayer: function (zB) {
        var blocks = [], i, realBlocksSorted = this._realBlocksSorted, block;

        for (i = 0; i < realBlocksSorted.length; i += 1) {
            block = realBlocksSorted[i];
            if (block.zB() === zB) {
                blocks.push(block);
            } else if (block.zB() < zB) {
                break; // no further possible blocks in sorted array
            }
        }

        return blocks;
    },

    versionOnServer: function () {
        return this._versionOnServer;
    },

    // Returns false when the object is new and has not yet been updated with
    // server data.
    isInitializedWithServerData: function () {
        return this._versionOnServer !== '-1';
    },

    _createBlockFromServerData: function (serverData) {
        var camera = this._construction.camera(), rb = realitybuilder;
        return new rb.ConstructionBlock(this._blockProperties,
                                        camera, 
                                        serverData.positionB, serverData.a,
                                        this._constructionBlockProperties,
                                        serverData.state,
                                        serverData.timeStamp);
    },

    // Sets the data of construction blocks to the version on the server, which
    // is described by "serverData".
    updateWithServerData: function (serverData) {
        this._versionOnServer = serverData.version;

        this._blocks = dojo.map(serverData.blocks, 
                                dojo.hitch(this,
                                           this._createBlockFromServerData));

        this._updateRealBlocksSorted();
        this._updatePendingBlocks();
        dojo.publish('realitybuilder/ConstructionBlocks/changed');
    },

    // Sort function, for ordering blocks by height/layer. From top to bottom.
    _sortByHeight: function (block1, block2) {
        if (block1.zB() > block2.zB()) {
            return -1;
        } else if (block1.zB() < block2.zB()) {
            return 1;
        } else {
            return 0;
        }
    },

    // Finds all real blocks and stores them.
    _updateRealBlocksSorted: function (serverData) {
        var tmp = dojo.filter(this._blocks, function (block) {
            return block.isReal();
        });
        tmp.sort(this._sortByHeight);
        this._realBlocksSorted = tmp;
    },

    // Finds all pending blocks and stores them.
    _updatePendingBlocks: function (serverData) {
        this._pendingBlocks = dojo.filter(this._blocks, function (block) {
            return block.isPending();
        });
    },

    // Returns the construction block at the block space position "positionB",
    // or false if there is none.
    blockAt: function (positionB) {
        var blocks = this.blocks(), block, i;
        for (i = 0; i < blocks.length; i += 1) {
            block = blocks[i];
            if (realitybuilder.util.pointsIdenticalB(
                positionB, block.positionB())) {
                return block;
            }
        }
        return false;
    },

    // Returns true, iff there is any collision between real blocks and the
    // block "block".
    realBlocksCollideWith: function (block) {
        var 
        realBlocks = this.realBlocksSorted(), 
        realBlock, i;

        for (i = 0; i < realBlocks.length; i += 1) {
            realBlock = realBlocks[i];
            if (realBlock.collidesWith(block)) {
                return true;
            }
        }
        return false;
    },

    // Returns true, iff there are real blocks that are attachable to the block
    // "block".
    realBlocksAreAttachableTo: function (block) {
        var realBlocks = this.realBlocksSorted(), realBlock, i;

        for (i = 0; i < realBlocks.length; i += 1) {
            realBlock = realBlocks[i];
            if (realBlock.attachableTo(block)) {
                return true;
            }
        }
        return false;
    },

    // Called if making the block pending on the server succeeded.
    _makePendingOnServerSucceeded: function () {
        dojo.publish('realitybuilder/ConstructionBlocks/changedOnServer');
    },

    // Called if making the block pending on the server failed.
    _makePendingOnServerFailed: function () {
        dojo.publish('realitybuilder/ConstructionBlocks/' + 
                     'changeOnServerFailed');
    },

    // Triggers setting the state of the construction block at the position
    // "positionB" and with rotation angle "a" to pending: on the client and on
    // the server. Once the server has completed the request, the list of
    // blocks is updated.
    makePendingOnServer: function (positionB, a) {
        dojo.xhrPost({
            url: "/admin/rpc/make_pending",
            content: {
                "xB": positionB[0],
                "yB": positionB[1],
                "zB": positionB[2],
                "a": a
            },
            load: dojo.hitch(this, this._makePendingOnServerSucceeded),
            error: dojo.hitch(this, this._makePendingOnServerFailed)
        });
    },

    // Called if deleting the block on the server succeeded.
    _deleteOnServerSucceeded: function () {
        dojo.publish('realitybuilder/ConstructionBlocks/changedOnServer');
    },

    // Called if deleting the block on the server failed.
    _deleteOnServerFailed: function () {
        dojo.publish('realitybuilder/ConstructionBlocks/' + 
                     'changeOnServerFailed');
    },

    // Deletes the block positioned at the block space position "positionB" and
    // rotated by the angle "a", on the client and on the server.
    deleteOnServer: function (positionB, a) {
        dojo.xhrPost({
            url: "/admin/rpc/delete",
            content: {
                "xB": positionB[0],
                "yB": positionB[1],
                "zB": positionB[2],
                "a": a
            },
            load: dojo.hitch(this, this._deleteOnServerSucceeded),
            error: dojo.hitch(this, this._deleteOnServerFailed)
        });
    },

    // Called if making the block real on the server succeeded.
    _makeRealOnServerSucceeded: function () {
        dojo.publish('realitybuilder/ConstructionBlocks/changedOnServer');
    },

    // Called if making the block real on the server failed.
    _makeRealOnServerFailed: function () {
        dojo.publish('realitybuilder/ConstructionBlocks/' +
                     'changeOnServerFailed');
    },

    // Triggers setting the state of the block at the block space position
    // "positionB" and rotated by the angle "a" to real: on the client and on
    // the server.
    makeRealOnServer: function (positionB, a) {
        dojo.xhrPost({
            url: "/admin/rpc/make_real",
            content: {
                "xB": positionB[0],
                "yB": positionB[1],
                "zB": positionB[2],
                "a": a
            },
            load: dojo.hitch(this, this._makeRealOnServerSucceeded),
            error: dojo.hitch(this, this._makeRealOnServerFailed)
        });
    },

    // Triggers setting of the state of the block at the block space position
    // "positionB" and rotated by the angle "a" to the state "state" on the
    // server.
    setBlockStateOnServer: function (positionB, a, state) {
        switch (state) {
        case 0:
            this.deleteOnServer(positionB, a);
            break;
        case 1:
            this.makePendingOnServer(positionB, a);
            break;
        case 2:
            this.makeRealOnServer(positionB, a);
            break;
        }
    },

    // If available, find the real block whose upper side is below the block
    // space coordinates "xB", "yB", "zB". Returns the block space z coordinate
    // of the upper side of the block. If no such block is available, returns
    // 0.
    zBOfUpperSideOfRealBlockBelow: function (xB, yB, zB) {
        var realBlocks, zBMax, zBOfUpperSide, bXB, bYB, bZB;
        realBlocks = this._realBlocksSorted;
        zBMax = zB - 1;
        zBOfUpperSide = 0;
        dojo.forEach(realBlocks, function (b) {
            bXB = b.xB();
            bYB = b.yB();
            bZB = b.zB();
            if (bZB + 1 <= zBMax && 
                xB >= bXB && xB <= bXB + 1 &&
                yB >= bYB && yB <= bYB + 1 &&
                bZB + 1 > zBOfUpperSide) {
                zBOfUpperSide = bZB + 1;
            }
        });
        return zBOfUpperSide;
    },

    // Renders the blocks "blocks" on the canvas "canvas".
    _renderBlocks: function (canvas, blocks) {
        if (canvas.getContext) {
            var context = canvas.getContext('2d');
            realitybuilder.util.clearCanvas(canvas);
            dojo.forEach(blocks, function (b) {
                b.render(context);
            });
        }
    },

    // Renders the construction blocks as seen by the camera's sensor.
    render: function () {
        this._renderBlocks(this._realBlocksCanvas, this._realBlocksSorted);
        this._renderBlocks(this._pendingBlocksCanvas, this._pendingBlocks);
    }
});
