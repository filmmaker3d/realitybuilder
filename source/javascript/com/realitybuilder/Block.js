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
    // "this._verticesB". Only edges, that are visible when the construction is
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
    // "this._verticesB". Only edges, that are visible when the construction is
    // oriented a certain way, are included. The third number is an index used
    // for identifying the edge (important if the position of the edge is
    // changed).
    _edges: null,

    // Edges that - in sensor space - define the border (outline) of any block,
    // when it is oriented in a certain way.
    _BORDER_EDGES: [
        [2, 3, 2], [3, 0, 3], [0, 4, 8], 
        [4, 5, 4], [5, 6, 5], [2, 6, 10]],

    // Indexes of the vertices, describing the border of any block, when it is
    // oriented in a certain way. Sorted so that following the vertices creates
    // the outline.
    _BORDER_VERTEX_INDEXES: [2, 3, 0, 4, 5, 6],

    // Coordinates of the vertices in block space, view space, and sensor
    // space.
    _verticesB: null,
    _verticesV: null,
    _verticesS: null,

    // The sensor space bounding box of the block, i.e. the smallest rectangle,
    // which encloses the block in sensor space.
    _boundingBoxS: null,

    // Camera id when last calculating the sensor space coordinates.
    _lastCameraId: null,

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

    // Updates the vertices of the block in world space.
    _updateWorldSpace: function () {
        var xB = this.positionB()[0],
            yB = this.positionB()[1],
            zB = this.positionB()[2],
            vs = [];

        // bottom, clock wise:
        vs.push(com.realitybuilder.util.blockToWorld([xB, yB, zB]));
        vs.push(com.realitybuilder.util.blockToWorld([xB, yB + 2, zB]));
        vs.push(com.realitybuilder.util.blockToWorld([xB + 2, yB + 2, zB]));
        vs.push(com.realitybuilder.util.blockToWorld([xB + 2, yB, zB]));

        // top, clock wise:
        vs.push(com.realitybuilder.util.blockToWorld([xB, yB, zB + 1]));
        vs.push(com.realitybuilder.util.blockToWorld([xB, yB + 2, zB + 1]));
        vs.push(com.realitybuilder.util.blockToWorld([xB + 2, yB + 2, zB + 1]));
        vs.push(com.realitybuilder.util.blockToWorld([xB + 2, yB, zB + 1]));

        this._verticesB = vs;
    },

    // Calculates the vertices of the block in view space.
    _updateViewSpace: function () {
        this._updateWorldSpace();
        this._verticesV = dojo.map(this._verticesB, 
            dojo.hitch(this._camera, this._camera.worldToView));
    },

    // Returns true, iff the sensor space needs to be updated.
    _sensorSpaceNeedsToBeUpdated: function () {
        return this._lastCameraId !== this._camera.id();
    },

    // Called after the sensor space has been updated.
    _onSensorSpaceUpdated: function () {
        this._lastCameraId = this._camera.id();
    },

    // Calculates the vertices and the bounding box of the block in sensor
    // space. The camera is positioned in the center of the sensor. Returns
    // true, iff there have been any changes in the result since the last call
    // to this function.
    updateSensorSpace: function () {
        if (this._sensorSpaceNeedsToBeUpdated()) {
            this._updateViewSpace();
            this._verticesS = dojo.map(this._verticesV,
                dojo.hitch(this._camera, this._camera.viewToSensor));
            this._updateSensorSpaceBoundingBox();
            this._onSensorSpaceUpdated();

            return true;
        } else {
            return false;
        }
    },

    // Returns the sensor space bounding box, as an array of two points in
    // sensor space, which describe the corners of the box.
    boundingBoxS: function () {
        this.updateSensorSpace();
        return this._boundingBoxS;
    },

    // Updates the vertices (top left, lower right) defining the bounding box
    // of the block in sensor space. Depends on the vertices of the block in
    // sensor space.
    _updateSensorSpaceBoundingBox: function () {
        var minX = Number.MAX_VALUE, minY = Number.MAX_VALUE,
            maxX = Number.MIN_VALUE, maxY = Number.MIN_VALUE;
        dojo.forEach(this._verticesS, function (vertexS) {
            if (vertexS[0] < minX) {
                minX = vertexS[0];
            } else if (vertexS[0] > maxX) {
                maxX = vertexS[0];
            } if (vertexS[1] < minY) {
                minY = vertexS[1];
            } else if (vertexS[1] > maxY) {
                maxY = vertexS[1];
            }
        });

        this._boundingBoxS = [[minX, minY], [maxX, maxY]];
    },

    // Draws the block in the color "color" (CSS format) as seen by the sensor,
    // on the canvas rendering context "context". Depends on the vertices in
    // view coordinates.
    render: function (context, color) {
        var verticesS, vertexS1, vertexS2;
        this.updateSensorSpace();
        verticesS = this._verticesS;
        dojo.forEach(this._edges, function (edge) {
            vertexS1 = verticesS[edge[0]];
            vertexS2 = verticesS[edge[1]];
            context.globalAlpha = edge[3] ? 0.2 : 1;
            context.strokeStyle = color;
            context.beginPath();
            context.moveTo(vertexS1[0], vertexS1[1]);
            context.lineTo(vertexS2[0], vertexS2[1]);
            context.stroke();
        });
    }
});
