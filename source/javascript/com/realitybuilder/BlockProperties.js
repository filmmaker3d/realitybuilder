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

    // Two blocks are defined to collide, iff one block is offset against the
    // other in the x-y-plane by:
    _collisionOffsetsB: null,

    // A block is defined to be attachable to another block, if it is in any of
    // the following positions relative to the other block, in block space:
    _attachmentOffsetsB: null,

    // Center of rotation, with coordinates in block space, relative to the
    // lower left corner of the unrotated block, when viewed from above:
    _rotCenterXB: null,
    _rotCenterYB: null,

    versionOnServer: function () {
        return this._versionOnServer;
    },

    // Returns false when the object is new and has not yet been updated with
    // server data.
    isInitializedWithServerData: function () {
        return this._versionOnServer !== '-1';
    },

    // Rotates the outline point "pBXY" by the angle "a", which is measured in
    // multiples of 90°, CCW when viewed from above. The center of rotation is
    // the center of rotation of the block. Rounds the resulting coordinates to
    // integers.
    _rotateOutlinePointBXY: function (pBXY, a) {
        var tmpXB, tmpYB, cXB, cYB;

        cXB = this._rotCenterXB;
        cYB = this._rotCenterYB;
        tmpXB = pBXY[0] - cXB;
        tmpYB = pBXY[1] - cYB;

        if (a % 4 === 0) {
            return pBXY;
        } else if (a % 4 === 1) {
            return [cXB - tmpYB, cYB + tmpXB];
        } else if (a % 4 === 2) {
            return [cXB - tmpXB, cYB - tmpYB];
        } else if (a % 4 === 3) {
            return [cXB + tmpYB, cYB - tmpXB];
        }
    },

    _rotateOutlineBXY: function (a) {
        var that = this;

        return dojo.map(this._outlineB, function (pBXY) {
            return that._rotateOutlinePointBXY(pBXY, a);
        });
    },

    _updateRotatedOutlinesB: function () {
        var a;

        for (a = 0; a < 4; a += 1) { 
            this._rotatedOutlinesB[a] = this._rotateOutlineBXY(a);
        }
    },

    // Updates the block properties to the version on the server, which is
    // described by "serverData".
    updateWithServerData: function (serverData) {
        this._versionOnServer = serverData.version;
        this._positionSpacingXY = serverData.positionSpacingXY;
        this._positionSpacingZ = serverData.positionSpacingZ;
        this._outlineB = serverData.outlineB;
        this._collisionOffsetsB = serverData.collisionOffsetsB;
        this._attachmentOffsetsB = serverData.attachmentOffsetsB;
        this._rotCenterXB = serverData.rotCenterXB;
        this._rotCenterYB = serverData.rotCenterYB;

        this._updateRotatedOutlinesB();

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

    collisionOffsetsB: function () {
        return this._collisionOffsetsB;
    },

    attachmentOffsetsB: function () {
        return this._attachmentOffsetsB;
    }
});
