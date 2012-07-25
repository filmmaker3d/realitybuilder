// A block that is permanently part of the construction, though it may be
// marked as deleted or pending.

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

/*global realityBuilder, dojo, FlashCanvas */

dojo.provide('realityBuilder.ConstructionBlock');

dojo.require('realityBuilder.Block');

dojo.declare('realityBuilder.ConstructionBlock', realityBuilder.Block, {
    // State of the block: 0 = deleted, 1 = pending (= requested to be build),
    // 2 = real
    _state: null,

    // Time stamp - in seconds since the epoch - of the date-time when the
    // bocks status was last changed. Block creation also counts as status
    // change.
    _timeStamp: null,

    // Creates a block at the position in block space ("xB", "yB", "zB") =
    // "posB", and rotated about its center of rotation by "a" (° CCW, when
    // viewed from above). A time stamp - in seconds since the epoch - of the
    // date-time when the bocks status was last changed is "timeStamp".
    constructor: function (posB, a, state, timeStamp) {
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
        var color, properties;

        if (!this.isDeleted()) {
            color = (this.isReal() ?
                     realityBuilder.util.SETTINGS.colorOfRealBlock :
                     realityBuilder.util.SETTINGS.colorOfPendingBlock);
            this.inherited(arguments, [context, color]);
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
