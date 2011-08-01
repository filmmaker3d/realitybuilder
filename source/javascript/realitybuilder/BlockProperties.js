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

/*global realitybuilder, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('realitybuilder.BlockProperties');

dojo.declare('realitybuilder.BlockProperties', null, {
    // Version of data last retrieved from the server, or "-1" initially. Is a
    // string in order to be able to contain very large integers.
    _versionOnServer: '-1',

    // If the block is rotated by that angle, then it is congruent with it not
    // being rotated.
    _congruencyA: null,

    // Block dimensions in world space. The side length of a block is
    // approximately two times the grid spacing in the respective direction.
    _blockPositionSpacingXY: null, // mm
    _blockPositionSpacingZ: null, // mm

    // Outline of the block in the xy plane, with coordinates in block space,
    // counterclockwise:
    _outlineBXY: null,

    // Array with the outline rotated by 0°, 90°, ... around the cneter of
    // rotation, in block space:
    //
    // The list has "congruencyA" number of entries, corresponding to rotation
    // about 0°, 90°, ...
    _rotatedOutlinesBXY: null,

    // Two blocks 1 and 2 are defined to collide, iff block 2 is offset against
    // block 1 in the block space x-y-plane by any of the following values. The
    // rotation angles below are those of block 2 relative to block 1. The
    // offsets are stored as JSON arrays.
    //
    // The list has "congruencyA" number of entries, corresponding to rotation
    // about 0°, 90°, ...
    _collisionOffsetsListBXY: null,

    // Array with the list of collision offsets rotated by 0°, 90°, ... CCW
    // (when viewed from above) around the center of rotation of block 1, in
    // block space:
    //
    // The list has "congruencyA" number of entries, corresponding to rotation
    // about 0°, 90°, ...
    _rotatedCollisionOffsetsListsBXY: null,

    // Two blocks 1 and 2 are defined to be attachable, iff block 2 is offset
    // against block 1 in the block space by any of the following values. The
    // rotation angles below are those of block 2 relative to block 1. The
    // offsets are stored as JSON arrays.
    //
    // The list has "congruencyA" number of entries, corresponding to rotation
    // about 0°, 90°, ...
    _attachmentOffsetsListB: null,

    // Array with the list of attachment offsets rotated by 0°, 90°, ... CCW
    // (when viewed from above) around the center of rotation of block 1, in
    // block space:
    //
    // The list has "congruencyA" number of entries, corresponding to rotation
    // about 0°, 90°, ...
    _rotatedAttachmentOffsetsListsB: null,

    // Center of rotation, in the block space x-y-plane, with coordinates
    // relative to the origin of the unrotated block.
    _rotCenterBXY: null,

    // Alpha transparency of the block's background:
    _backgroundAlpha: null,

    versionOnServer: function () {
        return this._versionOnServer;
    },

    // Returns false when the object is new and has not yet been updated with
    // server data.
    isInitializedWithServerData: function () {
        return this._versionOnServer !== '-1';
    },

    congruencyA: function () {
        return this._congruencyA;
    },

    _rotateOutlineBXY: function (a) {
        var that = this;

        return dojo.map(this._outlineBXY, function (pBXY) {
            return realitybuilder.util.rotatePointBXY(pBXY,
                                                          that._rotCenterBXY,
                                                          a);
        });
    },

    _updateRotatedOutlinesBXY: function () {
        var a;

        this._rotatedOutlinesBXY = [];
        for (a = 0; a < this._congruencyA; a += 1) { 
            this._rotatedOutlinesBXY.push(this._rotateOutlineBXY(a));
        }
    },

    _rotateCollisionOffsetsBXY: function (collisionOffsetsBXY, a) {
        var util = realitybuilder.util;

        return dojo.map(collisionOffsetsBXY, function (collisionOffsetBXY) {
            return util.rotatePointBXY(collisionOffsetBXY, [0, 0], a);
        });
    },

    _rotateCollisionOffsetsListBXY: function (a1) {
        var a2, collisionOffsetsBXY, tmp = [];

        for (a2 = 0; a2 < this._congruencyA; a2 += 1) {
            collisionOffsetsBXY = this._collisionOffsetsListBXY[a2];
            tmp.push(this._rotateCollisionOffsetsBXY(collisionOffsetsBXY, a1));
        }

        return tmp;
    },

    _updateRotatedCollisionOffsetsListsBXY: function () {
        var a1, tmp;

        this._rotatedCollisionOffsetsListsBXY = [];

        for (a1 = 0; a1 < this._congruencyA; a1 += 1) { 
            tmp = this._rotateCollisionOffsetsListBXY(a1);
            this._rotatedCollisionOffsetsListsBXY.push(tmp);
        }
    },

    _rotateAttachmentOffsetB: function (attachmentOffsetB, a) {
        var pBXY, rotatedPBXY, rotatedPB, util;

        util = realitybuilder.util;

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
        var a2, attachmentOffsetsB, tmp = [];

        for (a2 = 0; a2 < this._congruencyA; a2 += 1) {
            attachmentOffsetsB = this._attachmentOffsetsListB[a2];
            tmp.push(this._rotateAttachmentOffsetsB(attachmentOffsetsB, a1));
        }

        return tmp;
    },

    _updateRotatedAttachmentOffsetsListsB: function () {
        var a1, tmp;

        this._rotatedAttachmentOffsetsListsB = [];
        for (a1 = 0; a1 < this._congruencyA; a1 += 1) { 
            tmp = this._rotateAttachmentOffsetsListB(a1);
            this._rotatedAttachmentOffsetsListsB.push(tmp);
        }
    },

    // Updates the block properties to the version on the server, which is
    // described by "serverData".
    updateWithServerData: function (serverData) {
        this._versionOnServer = serverData.version;
        this._congruencyA = serverData.congruencyA;
        this._positionSpacingXY = serverData.positionSpacingXY;
        this._positionSpacingZ = serverData.positionSpacingZ;
        this._outlineBXY = serverData.outlineBXY;
        this._collisionOffsetsListBXY = serverData.collisionOffsetsListBXY;
        this._attachmentOffsetsListB = serverData.attachmentOffsetsListB;
        this._rotCenterBXY = serverData.rotCenterBXY;
        this._backgroundAlpha = serverData.backgroundAlpha;

        this._updateRotatedOutlinesBXY();
        this._updateRotatedCollisionOffsetsListsBXY();
        this._updateRotatedAttachmentOffsetsListsB();

        dojo.publish('realitybuilder/BlockProperties/changed');
    },

    positionSpacingXY: function () {
        return this._positionSpacingXY;
    },

    positionSpacingZ: function () {
        return this._positionSpacingZ;
    },

    // Returns the outline, rotated by angle "a", in multiples of 90° CCW when
    // viewed from above.
    rotatedOutlineBXY: function (a) {
        return this._rotatedOutlinesBXY[a % this._congruencyA];
    },

    // Returns the list of collision offsets, of block 2 relative to block 1.
    rotatedCollisionOffsetsBXY: function (block1, block2) {
        var collisionOffsetsListBXY, relative_a, a1, a2;

        a1 = block1.a() % this._congruencyA;
        a2 = block2.a() % this._congruencyA;

        collisionOffsetsListBXY = 
            this._rotatedCollisionOffsetsListsBXY[a1];

        relative_a = (this._congruencyA + a2 - a1) % this._congruencyA;

        return collisionOffsetsListBXY[relative_a];
    },

    // Returns the list of attachment offsets, of block 2 relative to block 1.
    rotatedAttachmentOffsetsB: function (block1, block2) {
        var attachmentOffsetsListB, relative_a, a1, a2;

        a1 = block1.a() % this._congruencyA;
        a2 = block2.a() % this._congruencyA;

        attachmentOffsetsListB = 
            this._rotatedAttachmentOffsetsListsB[a1];

        relative_a = (this._congruencyA + a2 - a1) % this._congruencyA;

        return attachmentOffsetsListB[relative_a];
    },

    backgroundAlpha: function () {
        return this._backgroundAlpha;
    }
});
