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

/*global com, dojo, dojox, G_vmlCanvasManager, logoutUrl */

dojo.provide('com.realitybuilder.BlockProperties');

dojo.declare('com.realitybuilder.BlockProperties', com.realitybuilder.Block, {
    // Version of data last retrieved from the server, or "-1" initially. Is a
    // string in order to be able to contain very large integers.
    _versionOnServer: '-1',

    // Block dimensions in world space. The side length of a block is
    // approximately two times the grid spacing in the respective direction.
    _blockPositionSpacingXY: null, // mm
    _blockPositionSpacingZ: null, // mm

    // Block dimensions in world space. The side length of a block is
    // approximately two times the grid spacing in the respective direction.
    _outlineB: null,

    // Two blocks are defined to collide, iff one block is offset against the
    // other in the x-y-plane by:
    _collisionOffsetsB: null,

    // A block is defined to be attachable to another block, if it is in any of
    // the following positions relative to the other block, in block space:
    _attachmentOffsetsB: null,

    versionOnServer: function () {
        return this._versionOnServer;
    },

    // Returns false when the object is new and has not yet been updated with
    // server data.
    isInitializedWithServerData: function () {
        return this._versionOnServer !== '-1';
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

    collisionOffsetsB: function () {
        return this._collisionOffsetsB;
    },

    attachmentOffsetsB: function () {
        return this._attachmentOffsetsB;
    }
});
