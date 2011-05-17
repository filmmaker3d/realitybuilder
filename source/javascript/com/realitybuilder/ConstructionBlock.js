// A block that is permanently part of the construction, though it may be
// marked as deleted or pending.

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

/*global com, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('com.realitybuilder.ConstructionBlock');

dojo.require('com.realitybuilder.Block');

dojo.declare('com.realitybuilder.ConstructionBlock', 
    com.realitybuilder.Block,
{
    // State of the block: 0 = deleted, 1 = pending (= requested to be build),
    // 2 = real
    _state: null,

    // Time stamp - in seconds since the epoch - of the date-time when the
    // bocks status was last changed. Block creation also counts as status
    // change.
    _timeStamp: null,

    // Creates a 2x2x1 building block at the position in block space ("xB",
    // "yB", "zB") = "positionB". A blocks extents are defined by two corners:
    // ("xB", "yB", "zB"), ("xB" + 2, "yB" + 2, "zB" + 1). A time stamp - in
    // seconds since the epoch - of the date-time when the bocks status was
    // last changed is "timeStamp". When the block is rendered, it is as seen
    // by the sensor of the camera "camera".
    //
    // The block's properties, such as shape and size, are described by
    // "blockProperties".
    constructor: function (blockProperties, camera, positionB, state, 
                           timeStamp)
    {
        this._state = state;
        this._timeStamp = timeStamp;
    },

    timeStamp: function () {
        return this._timeStamp;
    },

    isDeleted: function () {
        return this._state === 0;
    },

    isPending: function () {
        return this._state === 1;
    },

    isReal: function () {
        return this._state === 2;
    },

    state: function () {
        return this._state;
    },

    // If not deleted, draws the block as seen by the sensor on the canvas with
    // rendering context "context". Depends on the vertexes in view
    // coordinates.
    render: function (context) {
        if (!this.isDeleted()) {
            var color = this.isReal() ? "green" : "white";
            this.inherited(arguments, [arguments[0], color]);
        }
    },

    // Draws the top of the block solidly filled, onto the canvas with
    // rendering context "context".
    renderSolidTop: function (context) {
        var topVertexesS, vertexS, i;

        this._updateCoordinates();

        topVertexesS = this._topVertexesS;

        // counterclockwise:
        vertexS = topVertexesS[0];
        context.beginPath();
        context.moveTo(vertexS[0], vertexS[1]);
        for (i = 1; i < topVertexesS.length; i += 1) {
            vertexS = topVertexesS[i];
            context.lineTo(vertexS[0], vertexS[1]);
        }
        context.closePath();
        context.fill();
    }
});
