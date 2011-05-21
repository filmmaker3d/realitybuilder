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

/*global com, dojo, dojox, FlashCanvas */

dojo.provide('com.realitybuilder.Block');

dojo.declare('com.realitybuilder.Block', null, {
    // Position of the block in block space. From the position the block
    // extends in positive direction along the x-, y-, and z-axis.
    _positionB: null,

    // Rotation angle, about center of rotation:
    _a: null, // mulitples of 90°, CCW when viewed from above

    // Camera object, used for calculating the projection of the block on the
    // camera sensor.
    _camera: null,

    // Properties (shape, dimensions, etc.) of a block:
    _blockProperties: null,

    // Coordinates of the vertexes in block space, world space, view space, and
    // sensor space.
    _bottomVertexesB: null,
    _bottomVertexes: null,
    _bottomVertexesV: null,
    _bottomVertexesS: null,
    _topVertexesB: null,
    _topVertexes: null,
    _topVertexesV: null,
    _topVertexesS: null,

    // The vertexes of the block projected to the view space x-z-plane.
    // 
    // The vertexes, correspondingly, are x-z pairs.
    //
    // The projection is a parallel projection. It works simply by extending
    // the vertical edges of the block to the x-z-plane.
    //
    // If not all vertexes can be determined, for example due to problems with
    // precision in calculations, the value is null. This should normally not
    // happen.
    _projectedVertexesVXZ: null,

    // The vertexes of the block projected to the view space x-z-plane, in
    // sensor space.
    _projectedVertexesVXZS: null,

    // The sensor space bounding box of the block, i.e. the smallest rectangle,
    // which encloses the block in sensor space.
    _boundingBoxS: null,

    // Ids and data version numbers when last updating coordinates:
    _lastCameraId: null,
    _lastBlockPropertiesVersionOnServer: null,

    // True, if the coordinates changed after the last rendering:
    _coordinatesChangedAfterLastRendering: false,

    // Horizontal extents of the block in sensor space: Indexes of the vertexes
    // that correspond to the leftmost and rightmost edges, as displayed on the
    // sensor.
    //
    // Note: depending on orientation of the block, the leftmost index may be
    // bigger than the rightmost index!
    _indexOfLeftmostVertex: null,
    _indexOfRightmostVertex: null,

    // True, iff only the bottom of the block should be subtracted when using
    // the "subtract" function:
    _onlySubtractBottom: false,

    // Creates a block at the position in block space ("xB", "yB", "zB") =
    // "positionB", and rotated about its center of rotation by "a" (° CCW,
    // when viewed from above). When the block is rendered, it is as seen by
    // the sensor of the camera "camera".
    //
    // The block's properties, such as shape and size, are described by
    // "blockProperties".
    constructor: function (blockProperties, camera, positionB, a) {
        this._positionB = positionB;
        this._blockProperties = blockProperties;
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

    a: function () {
        return this._a;
    },

    // Returns the block's vertexes in screen space.
    _vertexesS: function () {
        return this._bottomVertexesS.concat(this._topVertexesS);
    },

    // If not all vertexes could be determined, for example due to problems
    // with precision in calculations, the return value is false. This should
    // normally not happen.
    projectedVertexesVXZ: function () {
        this._updateCoordinates();

        return (this._projectedVertexesVXZ === null) ? 
            false : this._projectedVertexesVXZ;
    },

    // Updates the vertexes of the block projected to the view space x-z-plane.
    //
    // Depends on up to date view space coordinates.
    _updateViewSpaceXZPlaneCoordinates: function () {
        var i, bottomVertexesV, topVertexesV, len, tmp = [], lineV, pointVXZ;

        bottomVertexesV = this._bottomVertexesV;
        topVertexesV = this._topVertexesV;
        len = bottomVertexesV.length;

        for (i = 0; i < len; i += 1) {
            lineV = [bottomVertexesV[i], topVertexesV[i]];
            pointVXZ = com.realitybuilder.util.intersectionLinePlaneVXZ(lineV);
            if (!pointVXZ) {
                tmp = null;
                break;
            } else {
                tmp.push(pointVXZ);
            }
        }

        this._projectedVertexesVXZ = tmp;
    },

    // Returns true, iff the current block collides with the block "block".
    collidesWith: function (block) {
        var 
        testPositionB,
        collisionOffsetsB = this._blockProperties.collisionOffsetsB(),
        collisionOffsetB,
        i;

        for (i = 0; i < collisionOffsetsB.length; i += 1) {
            collisionOffsetB = collisionOffsetsB[i];
            testPositionB = [this.xB() + collisionOffsetB[0],
                             this.yB() + collisionOffsetB[1],
                             this.zB()];
            if (com.realitybuilder.util.pointsIdenticalB(block.positionB(),
                                                         testPositionB)) {
                return true;
            }
        }

        return false;
    },

    // Returns true, iff the current block is attachable to the block "block".
    attachableTo: function (block) {
        var
        testPositionB,
        attachmentOffsetsB = this._blockProperties.attachmentOffsetsB(),
        attachmentOffsetB,
        i;

        for (i = 0; i < attachmentOffsetsB.length; i += 1) {
            attachmentOffsetB = attachmentOffsetsB[i];
            testPositionB = 
                com.realitybuilder.util.addVectorsB(this.positionB(),
                                                    attachmentOffsetB);
            if (com.realitybuilder.util.pointsIdenticalB(block.positionB(),
                                                         testPositionB)) {
                return true;
            }
        }

        return false;
    },

    // Updates the vertexes of the block in block space.
    _updateBlockSpaceCoordinates: function () {
        var 
        xB = this.positionB()[0],
        yB = this.positionB()[1],
        zB = this.positionB()[2],
        blockOutlineB = this._blockProperties.rotatedOutlineB(this.a()),
        that = this;

        this._bottomVertexesB = [];
        this._topVertexesB = [];

        // top, counterclockwise (when viewed from top in block space):
        dojo.forEach(blockOutlineB, function (vertexXYB) {
            that._bottomVertexesB.push([xB + vertexXYB[0], 
                                        yB + vertexXYB[1], 
                                        zB]);
            that._topVertexesB.push([xB + vertexXYB[0], 
                                     yB + vertexXYB[1], 
                                     zB + 1]);
        });
    },

    _blockToWorld: function (pB) {
        return com.realitybuilder.util.blockToWorld(pB,
                                                    this._blockProperties);
    },

    // Updates the vertexes of the block in world space.
    _updateWorldSpaceCoordinates: function () {
        this._bottomVertexes = dojo.map(this._bottomVertexesB, 
                                        dojo.hitch(this, this._blockToWorld));
        this._topVertexes = dojo.map(this._topVertexesB, 
                                     dojo.hitch(this, this._blockToWorld));
    },

    // Calculates the vertexes of the block in view space.
    //
    // Depends on up to date world space coordinates.
    _updateViewSpaceCoordinates: function () {
        this._bottomVertexesV = 
            dojo.map(this._bottomVertexes, 
                     dojo.hitch(this._camera, this._camera.worldToView));
        this._topVertexesV = 
            dojo.map(this._topVertexes, 
                     dojo.hitch(this._camera, this._camera.worldToView));
    },

    // Returns true, iff coordinates need to be updated.
    _coordinatesNeedToBeUpdated: function () {
        var cameraHasChanged, blockPropertiesHaveChanged;

        cameraHasChanged = this._lastCameraIdS !== this._camera.id();
        blockPropertiesHaveChanged = 
            this._lastBlockPropertiesVersionOnServer !== 
            this._blockProperties.versionOnServer();

        return cameraHasChanged || blockPropertiesHaveChanged;
    },

    // Called after the coordinates have been updated.
    _onCoordinatesUpdated: function () {
        this._lastBlockPropertiesVersionOnServer = 
            this._blockProperties.versionOnServer();
        this._lastCameraId = this._camera.id();
        this._coordinatesChangedAfterLastRendering = true;
    },

    // Finds the indexes of the vertexes that correspond to the leftmost and
    // rightmost edges, as displayed on the sensor.
    //
    // Note that these vertexes often, but not always, are identical to the
    // leftmost and rightmost vertex of the top or bottom.
    _updateHorizontalExtentsInSensorSpace: function () {
        var vertexesS, vertexS, leftmostVertexS, rightmostVertexS, i, ilv, irv;

        // Ideas behind the following algorithm, by example for the rightmost
        // edge:
        //
        // * The rightmost edge doesn't change it the block is extended to a
        //   prism with infinite vertical extents.
        //
        // * The rightmost edge goes through the rightmost (as displayed on the
        //   sensor) intersection point between the prism and the view space
        //   x-z-plane.

        vertexesS = this._projectedVertexesVXZS;

        leftmostVertexS = rightmostVertexS = vertexesS[0];
        ilv = irv = 0;

        for (i = 1; i < vertexesS.length; i += 1) {
            vertexS = vertexesS[i];
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

    _updateProjectedVertexesVXZS: function () {
        var cam = this._camera;

        this._projectedVertexesVXZS = 
            dojo.map(this._projectedVertexesVXZ,
                     function (vertexVXZ) {
                         var vertexV = [vertexVXZ[0],
                                        0, // in view space x-z plane!
                                        vertexVXZ[1]];
                         return cam.viewToSensor(vertexV);
                     });
    },

    // Updates the vertices (top left, lower right) defining the bounding box
    // of the block in sensor space. Depends on the vertices of the block in
    // sensor space.
    _updateSensorSpaceBoundingBox: function () {
        var minX = Number.MAX_VALUE, minY = Number.MAX_VALUE,
            maxX = Number.MIN_VALUE, maxY = Number.MIN_VALUE;
        dojo.forEach(this._vertexesS(), function (vertexS) {
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

    // Calculates the vertexes of the block in sensor space. The camera is
    // positioned in the center of the sensor.
    //
    // Depends on up to date view space coordinates.
    _updateSensorSpaceCoordinates: function () {
        var cam = this._camera;

        this._bottomVertexesS = dojo.map(this._bottomVertexesV,
                                         dojo.hitch(cam, cam.viewToSensor));
        this._topVertexesS = dojo.map(this._topVertexesV,
                                      dojo.hitch(cam, cam.viewToSensor));
        this._updateProjectedVertexesVXZS();
        this._updateHorizontalExtentsInSensorSpace();
        this._updateSensorSpaceBoundingBox();
    },

    // Updates coordinates, but only if there have been changes.
    _updateCoordinates: function () {
        if (this._coordinatesNeedToBeUpdated()) {
            this._updateBlockSpaceCoordinates();
            this._updateWorldSpaceCoordinates();
            this._updateViewSpaceCoordinates();
            this._updateViewSpaceXZPlaneCoordinates();
            this._updateSensorSpaceCoordinates();
            this._onCoordinatesUpdated();
        }
    },

    onlySubtractBottom: function () {
        this._onlySubtractBottom = true;
    },

    _subtractDrawBottomPath: function (context) {
        var vertexesS, len, vertexS, i;

        vertexesS = this._bottomVertexesS;

        // counterclockwise (when viewed from top in block space):
        vertexS = vertexesS[0];
        context.moveTo(vertexS[0], vertexS[1]);
        for (i = 1; i < vertexesS.length; i += 1) {
            vertexS = vertexesS[i];
            context.lineTo(vertexS[0], vertexS[1]);
        }
    },

    _subtractDrawPath: function (context) {
        var bottomVertexesS, topVertexesS, len, vertexS, i, ilv, irv;

        bottomVertexesS = this._bottomVertexesS;
        topVertexesS = this._topVertexesS;
        len = topVertexesS.length; // same for top and bottom

        ilv = this._indexOfLeftmostVertex;
        irv = this._indexOfRightmostVertex;

        // top, from rightmost to leftmost vertex, counterclockwise (when
        // viewed from top in block space):
        vertexS = topVertexesS[irv];
        context.moveTo(vertexS[0], vertexS[1]);
        for (i = irv + 1; i <= len + ilv; i += 1) {
            vertexS = topVertexesS[i % len];
            context.lineTo(vertexS[0], vertexS[1]);
        }

        // line from leftmost vertex on top to leftmost vertex on bottom:
        vertexS = bottomVertexesS[ilv];
        context.lineTo(vertexS[0], vertexS[1]);

        // bottom, from leftmost to rightmost vertex, counterclockwise (when
        // viewed from top in block space):
        for (i = ilv + 1; i <= len + irv; i += 1) {
            vertexS = bottomVertexesS[i % len];
            context.lineTo(vertexS[0], vertexS[1]);
        }

        // line from rightmost vertex on bottom to rightmost vertex on top:
        vertexS = bottomVertexesS[irv];
        context.lineTo(vertexS[0], vertexS[1]);
    },

    // Subtracts the shape of the block from the drawing on the canvas with
    // rendering context "context".
    subtract: function (context) {
        var
        bottomVertexesS, topVertexesS,
        len, vertexS, i, ilv, irv;

        this._updateCoordinates();

        context.globalCompositeOperation = "destination-out";
        context.fillStyle = "black";

        context.beginPath();
        if (this._onlySubtractBottom) {
            this._subtractDrawBottomPath(context);
        } else {
            this._subtractDrawPath(context);
        }
        context.closePath();

        context.fill();

        context.globalCompositeOperation = "source-over";
    },

    // Renders the foreground of the block, i.e. the part of that block that
    // was visible were the block solid.
    _renderForeground: function (context) {
        var
        topVertexesS = this._topVertexesS,
        bottomVertexesS = this._bottomVertexesS,
        len = topVertexesS.length, // same for top and bottom
        vertexS, firstVertexS, i, 
        ilv = this._indexOfLeftmostVertex,
        irv = this._indexOfRightmostVertex,
        imax;

        context.globalAlpha = 1;

        // bottom:
        context.beginPath();
        firstVertexS = bottomVertexesS[ilv];
        context.moveTo(firstVertexS[0], firstVertexS[1]);
        imax = (ilv + 1 <= irv) ? irv : irv + len;
        for (i = ilv + 1; i <= imax; i += 1) {
            vertexS = bottomVertexesS[i % len];
            context.lineTo(vertexS[0], vertexS[1]);
        }
        context.stroke();

        // top:
        context.beginPath();
        firstVertexS = topVertexesS[0];
        context.moveTo(firstVertexS[0], firstVertexS[1]);
        for (i = 1; i <= len; i += 1) {
            vertexS = topVertexesS[i % len];
            context.lineTo(vertexS[0], vertexS[1]);
        }
        context.lineTo(firstVertexS[0], firstVertexS[1]);
        context.stroke();

        // vertical lines:
        imax = (ilv <= irv) ? irv : irv + len;
        for (i = ilv; i <= imax; i += 1) {
            context.beginPath();
            vertexS = bottomVertexesS[i % len];
            context.moveTo(vertexS[0], vertexS[1]);
            vertexS = topVertexesS[i % len];
            context.lineTo(vertexS[0], vertexS[1]);
            context.stroke();
        }
    },

    // Renders the background of the block, i.e. the part of that block that
    // was invisible were the block solid.
    _renderBackground: function (context) {
        var
        bottomVertexesS = this._bottomVertexesS,
        topVertexesS = this._topVertexesS,
        len = topVertexesS.length, // same for top and bottom
        vertexS, i, 
        ilv = this._indexOfLeftmostVertex,
        irv = this._indexOfRightmostVertex,
        imax;

        context.globalAlpha = 0.2;

        // bottom:
        context.beginPath();
        vertexS = bottomVertexesS[irv];
        context.moveTo(vertexS[0], vertexS[1]);
        imax = (irv + 1 <= ilv) ? ilv : ilv + len;
        for (i = irv + 1; i <= ilv; i += 1) {
            vertexS = bottomVertexesS[i % len];
            context.lineTo(vertexS[0], vertexS[1]);
        }
        context.stroke();

        // vertical lines:
        imax = (irv + 1 <= ilv - 1) ? ilv - 1 : ilv - 1 + len;
        for (i = irv + 1; i <= imax; i += 1) {
            context.beginPath();
            vertexS = bottomVertexesS[i % len];
            context.moveTo(vertexS[0], vertexS[1]);
            vertexS = topVertexesS[i % len];
            context.lineTo(vertexS[0], vertexS[1]);
            context.stroke();
        }

        context.globalAlpha = 1;
    },

    // Draws the block in the color "color" (CSS format) as seen by the sensor,
    // on the canvas with rendering context "context".
    render: function (context, color) {
        this._updateCoordinates();

        context.strokeStyle = color;
        this._renderForeground(context);
        this._renderBackground(context);
    }
});
