// Describes the properties of a block, including shape and dimensions.

// Sometimes the term "full shadow" is used, which refers to the shadow how it
// would look if the all blocks in the layer would form an infinite plane
// without holes.

// Copyright 2011 Felix E. Klee <felix.klee@inka.de>
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

/*global com, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('com.realitybuilder.BlockProperties');

dojo.require('com.realitybuilder.Block');

dojo.declare('com.realitybuilder.BlockProperties', com.realitybuilder.Block, {
    // Version of data last retrieved from the server, or "-1" initially. Is a
    // string in order to be able to contain very large integers.
    _versionOnServer: '-1',

    // Block dimensions in world space. The side length of a block is
    // approximately two times the grid spacing in the respective direction.
    _blockPositionSpacingXY: null, // mm
    _blockPositionSpacingZ: null, // mm

    // Outline of the block in the xy plane, with coordinates in block space,
    // counterclockwise:
    _outlineB: null,

    // Array with the outline rotated by 0°, 90°, 180°, and 270° around the
    // cneter of rotation, in block space:
    _rotatedOutlinesB: [null, null, null, null],

    // Two blocks 1 and 2 are defined to collide, iff block 2 is offset against
    // block 1 in the block space x-y-plane by any of the following values. The
    // rotation angles below are those of block 2 relative to block 1. The
    // offsets are stored as JSON arrays.
    _collisionOffsetsListB: null, // 0°, 90°, 180°, 270°

    // Array with the list of collision offsets rotated by 0°, 90°, 180°, and
    // 270° CCW (when viewed from above) around the center of rotation of block
    // 1, in block space:
    _rotatedCollisionOffsetsListsB: [null, null, null, null],

    // Two blocks 1 and 2 are defined to be attachable, iff block 2 is offset
    // against block 1 in the block space by any of the following values. The
    // rotation angles below are those of block 2 relative to block 1. The
    // offsets are stored as JSON arrays.
    _attachmentOffsetsListB: null, // 0°, 90°, 180°, 270°

    // Array with the list of attachment offsets rotated by 0°, 90°, 180°, and
    // 270° CCW (when viewed from above) around the center of rotation of block
    // 1, in block space:
    _rotatedAttachmentOffsetsListsB: [null, null, null, null],

    // Center of rotation, in the block space x-y-plane, with coordinates
    // relative to the origin of the unrotated block.
    _rotCenterBXY: null,

    versionOnServer: function () {
        return this._versionOnServer;
    },

    // Returns false when the object is new and has not yet been updated with
    // server data.
    isInitializedWithServerData: function () {
        return this._versionOnServer !== '-1';
    },

    _rotateOutlineBXY: function (a) {
        var that = this;

        return dojo.map(this._outlineB, function (pBXY) {
            return com.realitybuilder.util.rotatePointBXY(pBXY, 
                                                          that._rotCenterBXY,
                                                          a);
        });
    },

    _updateRotatedOutlinesB: function () {
        var a;

        for (a = 0; a < 4; a += 1) { 
            this._rotatedOutlinesB[a] = this._rotateOutlineBXY(a);
        }
    },

    _rotateCollisionOffsetsBXY: function (collisionOffsetsB, a) {
        var util = com.realitybuilder.util;

        return dojo.map(collisionOffsetsB, function (collisionOffsetB) {
            return util.rotatePointBXY(collisionOffsetB, [0, 0], a);
        });
    },

    _rotateCollisionOffsetsListBXY: function (a1) {
        var a2, collisionOffsetsB, tmp = [null, null, null, null];

        for (a2 = 0; a2 < 4; a2 += 1) {
            collisionOffsetsB = this._collisionOffsetsListB[a2];
            tmp[a2] = this._rotateCollisionOffsetsBXY(collisionOffsetsB, a1);
        }

        return tmp;
    },

    _updateRotatedCollisionOffsetsListsBXY: function () {
        var a1;

        for (a1 = 0; a1 < 4; a1 += 1) { 
            this._rotatedCollisionOffsetsListsB[a1] = 
                this._rotateCollisionOffsetsListBXY(a1);
        }
    },

    _rotateAttachmentOffsetB: function (attachmentOffsetB, a) {
        var pBXY, rotatedPBXY, rotatedPB, util;

        util = com.realitybuilder.util;

        // Rotates in the x-y plane, keeping z constant:
        pBXY = [attachmentOffsetB[0], attachmentOffsetB[1]];
        rotatedPBXY = util.rotatePointBXY(pBXY, [0, 0], a);
        return [rotatedPBXY[0], rotatedPBXY[1], attachmentOffsetB[2]];
    },

    _rotateAttachmentOffsetsB: function (attachmentOffsetsB, a) {
        var that = this;

        return dojo.map(attachmentOffsetsB, function (attachmentOffsetB) {
            return that._rotateAttachmentOffsetB(attachmentOffsetB, a);
        });
    },

    _rotateAttachmentOffsetsListB: function (a1) {
        var a2, attachmentOffsetsB, tmp = [null, null, null, null];

        for (a2 = 0; a2 < 4; a2 += 1) {
            attachmentOffsetsB = this._attachmentOffsetsListB[a2];
            tmp[a2] = this._rotateAttachmentOffsetsB(attachmentOffsetsB, a1);
        }

        return tmp;
    },

    _updateRotatedAttachmentOffsetsListsB: function () {
        var a1;

        for (a1 = 0; a1 < 4; a1 += 1) { 
            this._rotatedAttachmentOffsetsListsB[a1] = 
                this._rotateAttachmentOffsetsListB(a1);
        }
    },

    // Updates the block properties to the version on the server, which is
    // described by "serverData".
    updateWithServerData: function (serverData) {
        this._versionOnServer = serverData.version;
        this._positionSpacingXY = serverData.positionSpacingXY;
        this._positionSpacingZ = serverData.positionSpacingZ;
        this._outlineB = serverData.outlineB;
        this._collisionOffsetsListB = serverData.collisionOffsetsListB;
        this._attachmentOffsetsListB = serverData.attachmentOffsetsListB;
        this._rotCenterBXY = [serverData.rotCenterXB, serverData.rotCenterYB];

        this._updateRotatedOutlinesB();
        this._updateRotatedCollisionOffsetsListsBXY();
        this._updateRotatedAttachmentOffsetsListsB();

        dojo.publish('com/realitybuilder/BlockProperties/changed');
    },

    positionSpacingXY: function () {
        return this._positionSpacingXY;
    },

    positionSpacingZ: function () {
        return this._positionSpacingZ;
    },

    outlineB: function () {
        return this._outlineB;
    },

    // Returns the outline, rotated by angle "a", in multiples of 90° CCW when
    // viewed from above.
    rotatedOutlineB: function (a) {
        return this._rotatedOutlinesB[a % 4];
    },

    // Returns the list of collision offsets, of block 2 relative to block 1.
    rotatedCollisionOffsetsB: function (block1, block2) {
        var collisionOffsetsListB, relative_a;

        collisionOffsetsListB = 
            this._rotatedCollisionOffsetsListsB[block1.a() % 4];

        relative_a = (4 + block2.a() - block1.a()) % 4;

        return collisionOffsetsListB[relative_a];
    },

    // Returns the list of attachment offsets, of block 2 relative to block 1.
    rotatedAttachmentOffsetsB: function (block1, block2) {
        var attachmentOffsetsListB, relative_a;

        attachmentOffsetsListB = 
            this._rotatedAttachmentOffsetsListsB[block1.a() % 4];

        relative_a = (4 + block2.a() - block1.a()) % 4;

        return attachmentOffsetsListB[relative_a];
    }
});
