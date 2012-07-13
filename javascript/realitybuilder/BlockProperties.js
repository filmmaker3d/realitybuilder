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

/*jslint browser: true, maxerr: 50, maxlen: 79, nomen: true, sloppy: true,
  unparam: true */

/*global realityBuilder, dojo, dojox, FlashCanvas */

dojo.provide('realityBuilder.BlockProperties');

dojo.declare('realityBuilder.BlockProperties', null, {
    // Version of data last retrieved from the server, or "-1" initially. Is a
    // string in order to be able to contain very large integers.
    _versionOnServer: '-1',

    // True if the block has two-fold rotational symmetry, when viewed from
    // above. Note that this setting is irrespective of the center of rotation.
    _has2FoldSymmetry: null,

    // Outline of the block in the xy plane, with coordinates in block space,
    // counterclockwise:
    _outlineBXY: null,

    // Array with the outline rotated by 0°, 90°, ... around the cneter of
    // rotation, in block space:
    _rotatedOutlinesBXY: null,

    // Two blocks 1 and 2 are defined to collide, iff block 2 is offset against
    // block 1 in the block space x-y-plane by any of the following values. The
    // rotation angles below are those of block 2 relative to block 1. The
    // offsets are stored as JSON arrays.
    _collisionOffsetsListBXY: null,

    // Array with the list of collision offsets rotated by 0°, 90°, ... CCW
    // (when viewed from above) around the center of rotation of block 1, in
    // block space:
    _rotatedCollisionOffsetsListsBXY: null,

    // Two blocks 1 and 2 are defined to be attachable, iff block 2 is offset
    // against block 1 in the block space by any of the following values. The
    // rotation angles below are those of block 2 relative to block 1. The
    // offsets are stored as JSON arrays.
    _attachmentOffsetsListB: null,

    // Array with the list of attachment offsets rotated by 0°, 90°, ... CCW
    // (when viewed from above) around the center of rotation of block 1, in
    // block space:
    _rotatedAttachmentOffsetsListsB: null,

    // Center of rotation, in the block space x-y-plane, with coordinates
    // relative to the origin of the unrotated block.
    _rotCenterBXY: null,

    // A block with two-fold rotational symmetry, remains congruent with
    // itself, if rotated by 180° about the centroid:
    _centroidBXY: null,

    // The congruency offset for the angles "a" = 0°, 90°, ... 
    //
    // That is the offset that makes two blocks 1 and 2 congruent, if they have
    // two-fold rotational symmetry:
    //
    // * Block 1: rotated by angle "a"
    //
    // * Block 2: rotated by angle "a" and by 180°, and moved by the
    //   congruency offset
    _congruencyOffsetsB: null,

    versionOnServer: function () {
        return this._versionOnServer;
    },

    // Returns false when the object is new and has not yet been updated with
    // server data.
    isInitializedWithServerData: function () {
        return this._versionOnServer !== '-1';
    },

    _updateCentroidBXY: function () {
        var i, pointBXY, totXB = 0, totYB = 0, len = this._outlineBXY.length;

        for (i = 0; i < len; i += 1) {
            pointBXY = this._outlineBXY[i];
            totXB += pointBXY[0];
            totYB += pointBXY[1];
        }

        this._centroidBXY = [totXB / len, totYB / len];
    },

    _rotateOutlineBXY: function (a) {
        var that = this;

        return dojo.map(this._outlineBXY, function (pBXY) {
            return realityBuilder.util.rotatePointBXY(pBXY,
                                                      that._rotCenterBXY,
                                                      a);
        });
    },

    _updateRotatedOutlinesBXY: function () {
        var a;

        this._rotatedOutlinesBXY = [];
        for (a = 0; a < 4; a += 1) {
            this._rotatedOutlinesBXY.push(this._rotateOutlineBXY(a));
        }
    },

    // Only relevant for blocks with two-fold rotational symmetry.
    _updateCongruencyOffsetB: function () {
        var diffBXY, offsetBXY, a;

        diffBXY =
            realityBuilder.util.multiplyVectorBXY(
                2,
                realityBuilder.util.subtractVectorsBXY(this._centroidBXY,
                                                       this._rotCenterBXY)
            );

        this._congruencyOffsetsB = [];
        for (a = 0; a < 4; a += 1) {
            offsetBXY = realityBuilder.util.rotatePointBXY(diffBXY, [0, 0], a);
            this._congruencyOffsetsB.push([offsetBXY[0], offsetBXY[1], 0]);
        }
    },

    congruencyOffsetB: function (a) {
        return this._congruencyOffsetsB[a];
    },

    // Adds the congruency offset for the angle "a" (in multiples of 90°) to
    // every element in the given list of coordinates, and returns the
    // resulting list. Does not modify the original list.
    _withCongruencyOffsetsAddedBXY: function (coordinatesListBXY, a) {
        var offsetB = this.congruencyOffsetB(a);

        return dojo.map(coordinatesListBXY, function (coordinatesBXY) {
            return realityBuilder.util.addVectorsBXY(coordinatesBXY,
                                                     offsetB);
        });
    },

    has2FoldSymmetry: function () {
        return this._has2FoldSymmetry;
    },

    // If the block has two-fold rotational symmetry, then completes the list
    // of offsets for the missing angles, as follows:
    //
    // There are already offsets for 0° and 90°. And this function calculates
    // the offsets for 180° (based on 0°) and 270° (based on 90°), and adds
    // them to the list.
    _completeCollisionOffsetsListBXY: function () {
        var listBXY = this._collisionOffsetsListBXY;

        if (this._has2FoldSymmetry) {
            // 180°: from 0° + congruency offset:
            listBXY.push(this._withCongruencyOffsetsAddedBXY(listBXY[0], 0));

            // 270°: from 90° + congruency offset:
            listBXY.push(this._withCongruencyOffsetsAddedBXY(listBXY[1], 1));
        }
    },

    _rotateCollisionOffsetsBXY: function (collisionOffsetsBXY, a) {
        var util = realityBuilder.util;

        return dojo.map(collisionOffsetsBXY, function (collisionOffsetBXY) {
            return util.rotatePointBXY(collisionOffsetBXY, [0, 0], a);
        });
    },

    _rotateCollisionOffsetsListBXY: function (a1) {
        var a2, collisionOffsetsBXY, tmp = [];

        for (a2 = 0; a2 < 4; a2 += 1) {
            collisionOffsetsBXY = this._collisionOffsetsListBXY[a2];
            tmp.push(this._rotateCollisionOffsetsBXY(collisionOffsetsBXY, a1));
        }

        return tmp;
    },

    _updateRotatedCollisionOffsetsListsBXY: function () {
        var a1, tmp;

        this._rotatedCollisionOffsetsListsBXY = [];

        for (a1 = 0; a1 < 4; a1 += 1) {
            tmp = this._rotateCollisionOffsetsListBXY(a1);
            this._rotatedCollisionOffsetsListsBXY.push(tmp);
        }
    },

    // See also: _withCongruencyOffsetsAddedBXY()
    _withCongruencyOffsetsAddedB: function (coordinatesListB, a) {
        var offsetB = this.congruencyOffsetB(a);

        return dojo.map(coordinatesListB, function (coordinatesB) {
            return realityBuilder.util.addVectorsB(coordinatesB, offsetB);
        });
    },

    // See also: _completeCollisionOffsetsListBXY()
    _completeAttachmentOffsetsListB: function () {
        var listB = this._attachmentOffsetsListB;

        if (this._has2FoldSymmetry) {
            listB.push(this._withCongruencyOffsetsAddedB(listB[0], 0));
            listB.push(this._withCongruencyOffsetsAddedB(listB[1], 1));
        }
    },

    _rotateAttachmentOffsetB: function (attachmentOffsetB, a) {
        var pBXY, rotatedPBXY, rotatedPB, util;

        util = realityBuilder.util;

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

        for (a2 = 0; a2 < 4; a2 += 1) {
            attachmentOffsetsB = this._attachmentOffsetsListB[a2];
            tmp.push(this._rotateAttachmentOffsetsB(attachmentOffsetsB, a1));
        }

        return tmp;
    },

    _updateRotatedAttachmentOffsetsListsB: function () {
        var a1, tmp;

        this._rotatedAttachmentOffsetsListsB = [];
        for (a1 = 0; a1 < 4; a1 += 1) {
            tmp = this._rotateAttachmentOffsetsListB(a1);
            this._rotatedAttachmentOffsetsListsB.push(tmp);
        }
    },

    // Updates the block properties to the version on the server, which is
    // described by "serverData".
    updateWithServerData: function (serverData) {
        if (this._versionOnServer !== serverData.version) {
            this._versionOnServer = serverData.version;
            this._has2FoldSymmetry = serverData.has2FoldSymmetry;
            this._posSpacingXY = serverData.posSpacingXY;
            this._posSpacingZ = serverData.posSpacingZ;
            this._outlineBXY = serverData.outlineBXY;
            this._collisionOffsetsListBXY = serverData.collisionOffsetsListBXY;
            this._attachmentOffsetsListB = serverData.attachmentOffsetsListB;
            this._rotCenterBXY = serverData.rotCenterBXY;

            this._updateCentroidBXY();
            this._updateCongruencyOffsetB();

            this._updateRotatedOutlinesBXY();

            this._completeCollisionOffsetsListBXY();
            this._updateRotatedCollisionOffsetsListsBXY();

            this._completeAttachmentOffsetsListB();
            this._updateRotatedAttachmentOffsetsListsB();

            dojo.publish('realityBuilder/BlockProperties/changed');
        }
    },

    posSpacingXY: function () {
        return this._posSpacingXY;
    },

    posSpacingZ: function () {
        return this._posSpacingZ;
    },

    // Returns the outline, rotated by angle "a", in multiples of 90° CCW when
    // viewed from above.
    rotatedOutlineBXY: function (a) {
        return this._rotatedOutlinesBXY[a % 4];
    },

    // Returns the list of collision offsets, of block 2 relative to block 1.
    rotatedCollisionOffsetsBXY: function (block1, block2) {
        var collisionOffsetsListBXY, relative_a, a1, a2;

        a1 = block1.a() % 4;
        a2 = block2.a() % 4;

        collisionOffsetsListBXY = this._rotatedCollisionOffsetsListsBXY[a1];

        relative_a = (4 + a2 - a1) % 4;

        return collisionOffsetsListBXY[relative_a];
    },

    // Returns the list of attachment offsets, of block 2 relative to block 1.
    rotatedAttachmentOffsetsB: function (block1, block2) {
        var attachmentOffsetsListB, relative_a, a1, a2;

        a1 = block1.a() % 4;
        a2 = block2.a() % 4;

        attachmentOffsetsListB =
            this._rotatedAttachmentOffsetsListsB[a1];

        relative_a = (4 + a2 - a1) % 4;

        return attachmentOffsetsListB[relative_a];
    },

    // Alpha transparency of the block's background:
    backgroundAlpha: function () {
        return realityBuilder.util.SETTINGS.backgroundAlpha;
    },

    rotCenterBXY: function () {
        return this._rotCenterBXY;
    }
});
