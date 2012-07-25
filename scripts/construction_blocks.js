// All blocks permanently in the construction, including deleted blocks and
// pending blocks. The new, user positionable block is not part of the
// construction.

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

/*global realityBuilder, realityBuilderDojo. FlashCanvas, define */

define(['./util'], function (util) {
    return {
        // Version of blocks data last retrieved from the server, or "-1"
        // initially. Is a string in order to be able to contain very large
        // integers.
        _versionOnServer: '-1',

        // The blocks.
        _blocks: [],

        // All real blocks, sorted by height, from top to bottom.
        _realBlocksSorted: [],

        // All blocks that are pending.
        _pendingBlocks: null,

        // All blocks except deleted blocks = real and pending blocks.
        _nonDeletedBlocks: null,

        blocks: function () {
            return this._blocks;
        },

        pendingBlocks: function () {
            return this._pendingBlocks;
        },

        realBlocksSorted: function () {
            return this._realBlocksSorted;
        },

        // Returns the simplified poses of all real and pending blocks, with
        // coordinates in block space, sorted by height.
        nonDeletedSimPosesB: function () {
            var $ = realityBuilder.$;

            return $.map(this._nonDeletedBlocks, function (block) {
                return [block.simPoseB()];
            });
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
            var rb = realityBuilder;
            return new rb.ConstructionBlock(serverData.posB, serverData.a,
                                            serverData.state,
                                            serverData.timeStamp);
        },

        // Sets the data of construction blocks to the version on the server, which
        // is described by "serverData".
        updateWithServerData: function (serverData) {
            var _ = realityBuilder._;

            if (this._versionOnServer !== serverData.version) {
                this._versionOnServer = serverData.version;

                this._blocks = _.map(serverData.blocks,
                                     _.bind(this._createBlockFromServerData,
                                            this));

                this._updateRealBlocksSorted();
                this._updatePendingBlocks();
                this._updateNonDeletedBlocks();
                realityBuilderDojo.publish('realityBuilder/ConstructionBlocks/changed');
            }
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
        _updateRealBlocksSorted: function () {
            var _ = realityBuilder._,
            tmp = _.filter(this._blocks, function (block) {
                return block.isReal();
            });
            tmp.sort(this._sortByHeight);
            this._realBlocksSorted = tmp;
        },

        // Finds all pending blocks and stores them.
        _updatePendingBlocks: function () {
            var _ = realityBuilder._;
            this._pendingBlocks = _.filter(this._blocks, function (block) {
                return block.isPending();
            });
        },

        _updateNonDeletedBlocks: function () {
            var $ = realityBuilder.$;
            this._nonDeletedBlocks = $.grep(this._blocks, function (block) {
                return !block.isDeleted();
            });
        },

        // Returns the construction block at the block space position "posB",
        // and rotated by the angle "a", or false if there is none.
        blockAt: function (posB, a) {
            var blocks = this.blocks(), block, i;
            for (i = 0; i < blocks.length; i += 1) {
                block = blocks[i];
                if (util.pointsIdenticalB(posB,
                                                         block.posB()) &&
                    a === block.a()) {
                    return block;
                }
            }
            return false;
        },

        // Returns true, iff there is any collision between real blocks and the
        // block "block".
        realBlocksCollideWith: function (block) {
            var realBlocks = this.realBlocksSorted(),
            realBlock,
            i;

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
            realityBuilderDojo.publish('realityBuilder/ConstructionBlocks/changedOnServer');
        },

        // Called if making the block pending on the server failed.
        _makePendingOnServerFailed: function () {
            realityBuilderDojo.publish('realityBuilder/ConstructionBlocks/' +
                                       'changeOnServerFailed');
        },

        // Triggers setting the state of the construction block at the position
        // "posB" and with rotation angle "a" to pending: on the client and on
        // the server. Once the server has completed the request, the list of
        // blocks is updated.
        makePendingOnServer: function (posB, a) {
            var _ = realityBuilder._;

            util.jsonpGet({
                url: util.rootUrl() + "rpc/make_pending",
                content: {
                    "xB": posB[0],
                    "yB": posB[1],
                    "zB": posB[2],
                    "a": a
                },
                load: _.bind(this._makePendingOnServerSucceeded, this)
            });
        },

        // Called if deleting the block on the server succeeded.
        _deleteOnServerSucceeded: function () {
            realityBuilderDojo.publish('realityBuilder/ConstructionBlocks/changedOnServer');
        },

        // Deletes the block positioned at the block space position "posB" and
        // rotated by the angle "a", on the client and on the server.
        deleteOnServer: function (posB, a) {
            var _ = realityBuilder._;

            util.jsonpGet({
                url: util.rootUrl() + "rpc/delete",
                content: {
                    "xB": posB[0],
                    "yB": posB[1],
                    "zB": posB[2],
                    "a": a
                },
                load: _.bind(this._deleteOnServerSucceeded, this)
            });
        },

        // Called if making the block real on the server succeeded.
        _makeRealOnServerSucceeded: function () {
            realityBuilderDojo.publish('realityBuilder/ConstructionBlocks/changedOnServer');
        },

        // Called if making the block real on the server failed.
        _makeRealOnServerFailed: function () {
            realityBuilderDojo.publish('realityBuilder/ConstructionBlocks/' +
                                       'changeOnServerFailed');
        },

        // Triggers setting the state of the block at the block space position
        // "posB" and rotated by the angle "a" to real: on the client and on
        // the server.
        makeRealOnServer: function (posB, a) {
            var _ = realityBuilder._;

            util.jsonpGet({
                url: util.rootUrl() + "rpc/make_real",
                content: {
                    "xB": posB[0],
                    "yB": posB[1],
                    "zB": posB[2],
                    "a": a
                },
                load: _.bind(this._makeRealOnServerSucceeded, this)
            });
        },

        // Triggers setting of the state of the block at the block space position
        // "posB" and rotated by the angle "a" to the state "state" on the
        // server.
        setBlockStateOnServer: function (posB, a, state) {
            switch (state) {
            case 0:
                this.deleteOnServer(posB, a);
                break;
            case 1:
                this.makePendingOnServer(posB, a);
                break;
            case 2:
                this.makeRealOnServer(posB, a);
                break;
            }
        },

        // Called if replacing the blocks on the server succeeded.
        _replaceBlocksOnServerSucceeded: function () {
            realityBuilderDojo.publish('realityBuilder/ConstructionBlocks/changedOnServer');
        },

        // Deletes all blocks on the server, and sets the real blocks to those
        // described by the specified poses.
        replaceBlocksOnServer: function (posesB) {
            var _ = realityBuilder._, content = {};

            _.each(posesB, function (poseB, i) {
                content[String(i)] = poseB;
            });

            util.jsonpGet({
                url: util.rootUrl() + "rpc/replace_blocks",
                content: content,
                load: _.bind(this._replaceBlocksOnServerSucceeded, this)
            });
        },

        // If available, find the real block whose upper side is below the block
        // space coordinates "xB", "yB", "zB". Returns the block space z coordinate
        // of the upper side of the block. If no such block is available, returns
        // 0.
        zBOfUpperSideOfRealBlockBelow: function (xB, yB, zB) {
            var realBlocks, zBMax, zBOfUpperSide, bXB, bYB, bZB,
            _ = realityBuilder._;

            realBlocks = this._realBlocksSorted;
            zBMax = zB - 1;
            zBOfUpperSide = 0;
            _.each(realBlocks, function (b) {
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
            var context, _ = realityBuilder._;

            if (canvas.getContext) {
                context = canvas.getContext('2d');
                util.clearCanvas(canvas);

                _.each(blocks, function (b) {
                    b.render(context);
                });
            }
        },

        renderIfVisible: function () {
            if (sensor.realBlocksAreVisible()) {
                this._renderBlocks(sensor.realBlocksCanvas(),
                                   this._realBlocksSorted);
            }

            if (sensor.pendingBlocksAreVisible()) {
                this._renderBlocks(sensor.pendingBlocksCanvas(),
                                   this._pendingBlocks);
            }
        }
    }
});
