// A building block.

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

/*global com, dojo, dojox, G_vmlCanvasManager */

dojo.provide('com.realitybuilder.Block');

dojo.declare('com.realitybuilder.Block', null, {
    // Initial edges of the block, defined using indices of the array
    // "this._vertexesB". Only edges, that are visible when the construction is
    // oriented a certain way, are included. The third value is an index used
    // for identifying the edge (important if the position of the edge is
    // changed). The fourth value specifies whether the edge is a background
    // edge which, if the block was solid, would not be visible. The edges are
    // initial since the actual edges, while based on them, may be cut, e.g. by
    // a hidden lines algorithm.
    _INITIAL_EDGES: [
        // bottom
        [0, 1, 0, true], [1, 2, 1, true], [2, 3, 2, false], [3, 0, 3, false],

        // top
        [4, 5, 4, false], [5, 6, 5, false], [6, 7, 6, false], [7, 4, 7, false],

        // vertical
        [0, 4, 8, false], [1, 5, 9, true], 
        [2, 6, 10, false], [3, 7, 11, false]],

    // Position of the block in block space. From the position the block
    // extends in positive direction along the x-, y-, and z-axis.
    _positionB: null,

    // Camera object, used for calculating the projection of the block on the
    // camera sensor.
    _camera: null,

    // Edges of the block, defined using indices of the array
    // "this._vertexesB". Only edges, that are visible when the construction is
    // oriented a certain way, are included. The third number is an index used
    // for identifying the edge (important if the position of the edge is
    // changed).
    _edges: null,

    // Edges that - in sensor space - define the border (outline) of any block,
    // when it is oriented in a certain way.
    _BORDER_EDGES: [
        [2, 3, 2], [3, 0, 3], [0, 4, 8], 
        [4, 5, 4], [5, 6, 5], [2, 6, 10]],

    // Indexes of the vertexes, describing the border of any block, when it is
    // oriented in a certain way. Sorted so that following the vertexes creates
    // the outline.
    _BORDER_VERTEX_INDEXES: [2, 3, 0, 4, 5, 6],

    // Coordinates of the vertexes in block space, view space, and sensor
    // space.
    _vertexesBottomB: null,
    _vertexesBottomV: null,
    _vertexesBottomS: null,
    _vertexesTopB: null,
    _vertexesTopV: null,
    _vertexesTopS: null,

    // Camera id when last calculating the sensor space coordinates.
    _lastCameraId: null,

    // Horizontal extents of the block in sensor space (same index for top and
    // bottom). Note: depending on orientation of the block, the leftmost index
    // may be bigger than the rightmost index!
    _indexOfLeftmostVertex: null,
    _indexOfRightmostVertex: null,

    // Creates a 2x2x1 building block at the position in block space ("xB",
    // "yB", "zB") = "positionB". A blocks extents are defined by two corners:
    // ("xB", "yB", "zB"), ("xB" + 2, "yB" + 2, "zB" + 1). When the block is
    // rendered, it is as seen by the sensor of the camera "camera".
    constructor: function (camera, positionB, image) {
        this._positionB = positionB;
        this._camera = camera;
        this._edges = this._INITIAL_EDGES;
    },

    // Returns the block's position in block space. From the position the block
    // extends in positive direction along the x-, y-, and z-axis.
    positionB: function () {
        return this._positionB;
    },

    xB: function () {
        return this._positionB[0];
    },

    yB: function () {
        return this._positionB[1];
    },

    zB: function () {
        return this._positionB[2];
    },

    // Updates the vertexes of the block in world space.
    _updateWorldSpace: function () {
        var 
        xB = this.positionB()[0],
        yB = this.positionB()[1],
        zB = this.positionB()[2],
        vsBottom = [], vsTop = [],
        blockOutlineB = com.realitybuilder.util.BLOCK_OUTLINE_B;

        // top, counter clock wise:
        dojo.forEach(blockOutlineB, function (vertexXYB) {
            vsBottom.push(com.realitybuilder.util.blockToWorld(
                [xB + vertexXYB[0], 
                 yB + vertexXYB[1], 
                 zB]));
            vsTop.push(com.realitybuilder.util.blockToWorld([xB + vertexXYB[0], 
                                                             yB + vertexXYB[1], 
                                                             zB + 1]));
        });

        this._vertexesBottomB = vsBottom;
        this._vertexesTopB = vsTop;
    },

    // Calculates the vertexes of the block in view space.
    _updateViewSpace: function () {
        this._updateWorldSpace();
        this._vertexesBottomV = dojo.map(this._vertexesBottomB, 
                                         dojo.hitch(this._camera, 
                                                    this._camera.worldToView));
        this._vertexesTopV = dojo.map(this._vertexesTopB, 
                                      dojo.hitch(this._camera, 
                                                 this._camera.worldToView));
    },

    // Returns true, iff the sensor space needs to be updated.
    _sensorSpaceNeedsToBeUpdated: function () {
        return this._lastCameraId !== this._camera.id();
    },

    // Called after the sensor space has been updated.
    _onSensorSpaceUpdated: function () {
        this._lastCameraId = this._camera.id();
    },

    // Finds the index of - in screen space - the leftmost and the rightmost
    // vertex. This index is the same for the bottom and the top vertexes.
    _updateHorizontalExtentsInSensorSpace: function () {
        var
        vertexesBottomS = this._vertexesBottomS,
        vertexS,
        leftmostVertexS,
        rightmostVertexS,
        i, ilv, irv;

        leftmostVertexS = rightmostVertexS = vertexesBottomS[0];
        ilv = irv = 0;

        for (i = 1; i < vertexesBottomS.length; i += 1) {
            vertexS = vertexesBottomS[i];
            if (vertexS[0] < leftmostVertexS[0]) {
                leftmostVertexS = vertexS;
                ilv = i;
            }
            if (vertexS[0] > rightmostVertexS[0]) {
                rightmostVertexS = vertexS;
                irv = i;
            }
        }

        this._indexOfLeftmostVertex = ilv;
        this._indexOfRightmostVertex = irv;
    },

    // Calculates the vertexes of the block in sensor space. The camera is
    // positioned in the center of the sensor. Returns true, iff there have
    // been any changes in the result since the last call to this function.
    updateSensorSpace: function () {
        var cam = this._camera;
        if (this._sensorSpaceNeedsToBeUpdated()) {
            this._updateViewSpace();
            this._vertexesBottomS = dojo.map(this._vertexesBottomV,
                                             dojo.hitch(cam, 
                                                        cam.viewToSensor));
            this._vertexesTopS = dojo.map(this._vertexesTopV,
                                          dojo.hitch(cam, cam.viewToSensor));
            this._updateHorizontalExtentsInSensorSpace();
            this._onSensorSpaceUpdated();

            return true;
        } else {
            return false;
        }
    },

    // Subtracts the shapes of the real blocks in front of the block from the
    // drawing on the canvas context "context".
    _subtractRealBlocks: function (context) {
        var realBlocksSorted = this._constructionBlocks.realBlocksSorted(),
            i, realBlock;

        // Idea behind the following loop: the shadow may be covered by blocks
        // in a layer above or in the same layer.
        for (i = 0; i < realBlocksSorted.length; i += 1) {
            realBlock = realBlocksSorted[i];

            if (realBlock.zB() < this._zB) {
                break;
            }

            // Only blocks in front of the shadow are allowed to cut it.
            if (this._isCuttingBlock(realBlock)) {
                if (this._boundingBoxesOverlap(realBlock) && 
                    this._anyVertexInBoundingBox(realBlock)) {
                    realBlock.subtract(context);
                }
            }
        }
    },

    // Renders the foreground of the block, i.e. the part of that block that
    // was visible were the block solid.
    _renderForeground: function (context) {
        var
        vertexesTopS = this._vertexesTopS,
        vertexesBottomS = this._vertexesBottomS,
        len = vertexesTopS.length, // same for top and bottom
        vertexS, firstVertexS, i, 
        ilv = this._indexOfLeftmostVertex,
        irv = this._indexOfRightmostVertex;

        context.globalAlpha = 1;

        // bottom:
        context.beginPath();
        firstVertexS = vertexesBottomS[ilv];
        context.moveTo(firstVertexS[0], firstVertexS[1]);
        for (i = ilv + 1; i <= irv; i += 1) {
            vertexS = vertexesBottomS[i];
            context.lineTo(vertexS[0], vertexS[1]);
        }
        context.stroke();

        // top:
        context.beginPath();
        firstVertexS = vertexesTopS[0];
        context.moveTo(firstVertexS[0], firstVertexS[1]);
        for (i = 1; i <= vertexesTopS.length; i += 1) {
            vertexS = vertexesTopS[i % len];
            context.lineTo(vertexS[0], vertexS[1]);
        }
        context.lineTo(firstVertexS[0], firstVertexS[1]);
        context.stroke();

        // vertical lines:
        for (i = ilv; i <= irv; i += 1) {
            context.beginPath();
            vertexS = vertexesBottomS[i % len];
            context.moveTo(vertexS[0], vertexS[1]);
            vertexS = vertexesTopS[i % len];
            context.lineTo(vertexS[0], vertexS[1]);
            context.stroke();
        }
    },

    // Renders the background of the block, i.e. the part of that block that
    // was invisible were the block solid.
    _renderBackground: function (context) {
        var
        vertexesBottomS = this._vertexesBottomS,
        vertexesTopS = this._vertexesTopS,
        len = vertexesTopS.length, // same for top and bottom
        vertexS, i, 
        ilv = this._indexOfLeftmostVertex,
        irv = this._indexOfRightmostVertex;

        context.globalAlpha = 0.2;

        // bottom:
        context.beginPath();
        vertexS = vertexesBottomS[irv];
        context.moveTo(vertexS[0], vertexS[1]);
        for (i = irv + 1; i <= len + ilv; i += 1) {
            vertexS = vertexesBottomS[i % len];
            context.lineTo(vertexS[0], vertexS[1]);
        }
        context.stroke();

        // vertical lines:
        for (i = irv + 1; i <= len + ilv - 1; i += 1) {
            context.beginPath();
            vertexS = vertexesBottomS[i % len];
            context.moveTo(vertexS[0], vertexS[1]);
            vertexS = vertexesTopS[i % len];
            context.lineTo(vertexS[0], vertexS[1]);
            context.stroke();
        }
    },

    // Draws the block in the color "color" (CSS format) as seen by the sensor,
    // on the canvas rendering context "context". Depends on the vertexes in
    // view coordinates.
    render: function (context, color) {
        this.updateSensorSpace();

        context.strokeStyle = color;
        this._renderForeground(context);
        this._renderBackground(context);
    }
});
