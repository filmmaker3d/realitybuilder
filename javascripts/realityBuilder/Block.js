// A building block.

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

/*global realityBuilder, dojo, dojox, FlashCanvas */

dojo.provide('realityBuilder.Block');

dojo.declare('realityBuilder.Block', null, {
    // Position of the block in block space. From the position the block
    // extends in positive direction along the x-, y-, and z-axis.
    _posB: null,

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

    // Coordinates of the block's center of rotation in block space, world
    // space, view space, and sensor space:
    _bottomRotCenterB: null,
    _bottomRotCenter: null,
    _bottomRotCenterV: null,
    _bottomRotCenterS: null,
    _topRotCenterB: null,
    _topRotCenter: null,
    _topRotCenterV: null,
    _topRotCenterS: null,

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

    // Ids, data version numbers and block position and angle when last
    // updating coordinates:
    _lastCameraId: null,
    _lastBlockPropertiesVersionOnServer: null,
    _lastPosB: null,
    _lastA: null,

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
    // "posB", and rotated about its center of rotation by "a" (° CCW,
    // when viewed from above). When the block is rendered, it is as seen by
    // the sensor of the camera "camera".
    //
    // The block's properties, such as shape and size, are described by
    // "blockProperties".
    constructor: function (blockProperties, camera, posB, a) {
        this._posB = posB;
        this._a = a;
        this._blockProperties = blockProperties;
        this._camera = camera;
    },

    // Returns the block's position in block space. From the position the block
    // extends in positive direction along the x-, y-, and z-axis.
    posB: function () {
        return this._posB;
    },

    xB: function () {
        return this._posB[0];
    },

    yB: function () {
        return this._posB[1];
    },

    zB: function () {
        return this._posB[2];
    },

    a: function () {
        return this._a;
    },

    // position and orientation in block space
    poseB: function () {
        return [this.xB(), this.yB(), this.zB(), this.a()];
    },

    // Returns the pose in block space (position in block space and the
    // rotation angle) in a simplified form:
    //
    // * If the block has two-fold symmetry:
    //
    //   coordinates and rotation angle so that rotation angle is either 0° or
    //   90°
    //
    // * Otherwise: unchanged pose
    simPoseB: function () {
        var siPoseB, posB, a, congruencyOffsetB;

        posB = this.poseB();
        a = this.poseB()[3];

        if (this._blockProperties.has2FoldSymmetry() && a >= 2) {
            congruencyOffsetB = this.congruencyOffsetB();
            siPoseB = realityBuilder.util.addVectorsB(posB,
                                                      congruencyOffsetB);
            siPoseB.push(a % 2);
        } else {
            siPoseB = this.poseB().slice();
        }

        return siPoseB;
    },

    has2FoldSymmetry: function () {
        return this._blockProperties.has2FoldSymmetry();
    },

    congruencyOffsetB: function () {
        return this._blockProperties.congruencyOffsetB(this._a);
    },

    blockProperties: function () {
        return this._blockProperties;
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

        return (this._projectedVertexesVXZ === null ?
                false : this._projectedVertexesVXZ);
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
            pointVXZ = realityBuilder.util.intersectionLinePlaneVXZ(lineV);
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
        var testPosB, collisionOffsetsBXY, collisionOffsetBXY, i;

        collisionOffsetsBXY =
            this._blockProperties.rotatedCollisionOffsetsBXY(this, block);

        for (i = 0; i < collisionOffsetsBXY.length; i += 1) {
            collisionOffsetBXY = collisionOffsetsBXY[i];
            testPosB = [this.xB() + collisionOffsetBXY[0],
                             this.yB() + collisionOffsetBXY[1],
                             this.zB()];
            if (realityBuilder.util.pointsIdenticalB(block.posB(),
                                                     testPosB)) {
                return true;
            }
        }

        return false;
    },

    // Returns true, iff the current block is attachable to the block "block".
    attachableTo: function (block) {
        var testPosB, attachmentOffsetsB, attachmentOffsetB, i;

        attachmentOffsetsB =
            this._blockProperties.rotatedAttachmentOffsetsB(this, block);

        for (i = 0; i < attachmentOffsetsB.length; i += 1) {
            attachmentOffsetB = attachmentOffsetsB[i];
            testPosB =
                realityBuilder.util.addVectorsB(this.posB(),
                                                    attachmentOffsetB);
            if (realityBuilder.util.pointsIdenticalB(block.posB(),
                                                         testPosB)) {
                return true;
            }
        }

        return false;
    },

    // Updates the vertexes of the block and its center of rotation in block
    // space.
    _updateBlockSpaceCoordinates: function () {
        var
            xB = this.posB()[0],
            yB = this.posB()[1],
            zB = this.posB()[2],
            blockOutlineBXY =
            this._blockProperties.rotatedOutlineBXY(this.a()),
            rotCenterBXY = this._blockProperties.rotCenterBXY(),
            that = this;

        this._bottomVertexesB = [];
        this._topVertexesB = [];

        // top, counterclockwise (when viewed from top in block space):
        dojo.forEach(blockOutlineBXY, function (vertexBXY) {
            that._bottomVertexesB.push([xB + vertexBXY[0],
                                        yB + vertexBXY[1],
                                        zB]);
            that._topVertexesB.push([xB + vertexBXY[0],
                                     yB + vertexBXY[1],
                                     zB + 1]);
        });

        this._bottomRotCenterB = [xB + rotCenterBXY[0],
                                  yB + rotCenterBXY[1],
                                  zB];
        this._topRotCenterB = [xB + rotCenterBXY[0],
                               yB + rotCenterBXY[1],
                               zB + 1];
    },

    _blockToWorld: function (pB) {
        return realityBuilder.util.blockToWorld(pB,
                                                    this._blockProperties);
    },

    // Updates the vertexes of the block and its center of rotation in world
    // space.
    //
    // Depends of up to date block space coordinates.
    _updateWorldSpaceCoordinates: function () {
        this._bottomVertexes = dojo.map(this._bottomVertexesB,
                                        dojo.hitch(this, this._blockToWorld));
        this._topVertexes = dojo.map(this._topVertexesB,
                                     dojo.hitch(this, this._blockToWorld));

        this._bottomRotCenter = this._blockToWorld(this._bottomRotCenterB);
        this._topRotCenter = this._blockToWorld(this._topRotCenterB);
    },

    // Calculates the vertexes of the block and its center of rotation in view
    // space.
    //
    // Depends on up to date world space coordinates.
    _updateViewSpaceCoordinates: function () {
        this._bottomVertexesV =
            dojo.map(this._bottomVertexes,
                     dojo.hitch(this._camera, this._camera.worldToView));
        this._topVertexesV =
            dojo.map(this._topVertexes,
                     dojo.hitch(this._camera, this._camera.worldToView));

        this._bottomRotCenterV =
            this._camera.worldToView(this._bottomRotCenter);
        this._topRotCenterV =
            this._camera.worldToView(this._topRotCenter);
    },

    // Returns true, iff coordinates need to be updated.
    _coordinatesNeedToBeUpdated: function () {
        var
            cameraHasChanged, blockPropertiesHaveChanged, posBHasChanged,
            aHasChanged;

        cameraHasChanged = this._lastCameraId !== this._camera.id();
        blockPropertiesHaveChanged =
            this._lastBlockPropertiesVersionOnServer !==
            this._blockProperties.versionOnServer();
        posBHasChanged =
            this._lastPosB === null ||
            !realityBuilder.util.pointsIdenticalB(this._lastPosB,
                                                  this._posB);
        aHasChanged = this._lastA !== this._a;

        return cameraHasChanged || blockPropertiesHaveChanged ||
            posBHasChanged || aHasChanged;
    },

    // Called after the coordinates have been updated.
    _onCoordinatesUpdated: function () {
        this._lastBlockPropertiesVersionOnServer =
            this._blockProperties.versionOnServer();
        this._lastCameraId = this._camera.id();
        this._lastPosB = [this._posB[0],
                               this._posB[1],
                               this._posB[2]]; // deep copy necessary
        this._lastA = this._a;
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
            dojo.map(this._projectedVertexesVXZ, function (vertexVXZ) {
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
        var minX, minY, maxX, maxY, vertexesS, vertexS, i;

        vertexesS = this._vertexesS();

        if (vertexesS.length > 0) {
            vertexS = vertexesS[0];
            minX = maxX = vertexS[0];
            minY = maxY = vertexS[1];
            for (i = 1; i < vertexesS.length; i += 1) {
                vertexS = vertexesS[i];
                if (vertexS[0] < minX) {
                    minX = vertexS[0];
                } else if (vertexS[0] > maxX) {
                    maxX = vertexS[0];
                }
                if (vertexS[1] < minY) {
                    minY = vertexS[1];
                } else if (vertexS[1] > maxY) {
                    maxY = vertexS[1];
                }
            }
        }

        this._boundingBoxS = [[minX, minY], [maxX, maxY]];
    },

    // Calculates the vertexes of the block and its center of rotation in
    // sensor space. The camera is positioned in the center of the sensor.
    //
    // Depends on up to date view space coordinates.
    _updateSensorSpaceCoordinates: function () {
        var cam = this._camera;

        this._bottomVertexesS = dojo.map(this._bottomVertexesV,
                                         dojo.hitch(cam, cam.viewToSensor));
        this._topVertexesS = dojo.map(this._topVertexesV,
                                      dojo.hitch(cam, cam.viewToSensor));

        this._bottomRotCenterS = cam.viewToSensor(this._bottomRotCenterV);
        this._topRotCenterS = cam.viewToSensor(this._topRotCenterV);

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
        var bottomVertexesS, topVertexesS,
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
        var topVertexesS = this._topVertexesS,
            bottomVertexesS = this._bottomVertexesS,
            topRotCenterS = this._topRotCenterS,
            len = topVertexesS.length, // same for top and bottom
            vertexS,
            firstVertexS,
            i,
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

        // rotation center dot on top:
        context.beginPath();
        context.arc(topRotCenterS[0], topRotCenterS[1],
                    context.lineWidth, 0, 2 * Math.PI, false);
        context.fill();
    },

    // Renders the background of the block, i.e. the part of that block that
    // was invisible were the block solid.
    _renderBackground: function (context) {
        var bottomVertexesS = this._bottomVertexesS,
            topVertexesS = this._topVertexesS,
            bottomRotCenterS = this._bottomRotCenterS,
            topRotCenterS = this._topRotCenterS,
            len = topVertexesS.length, // same for top and bottom
            vertexS,
            i,
            ilv = this._indexOfLeftmostVertex,
            irv = this._indexOfRightmostVertex,
            imax;

        context.globalAlpha = this._blockProperties.backgroundAlpha();

        // bottom:
        context.beginPath();
        vertexS = bottomVertexesS[irv];
        context.moveTo(vertexS[0], vertexS[1]);
        imax = (irv + 1 <= ilv) ? ilv : ilv + len;
        for (i = irv + 1; i <= imax; i += 1) {
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

        // vertical line indicating axis of rotation:
        context.beginPath();
        context.moveTo(bottomRotCenterS[0], bottomRotCenterS[1]);
        context.lineTo(topRotCenterS[0], topRotCenterS[1]);
        context.stroke();

        context.globalAlpha = 1;
    },

    // Draws the block in the color "color" (CSS format) as seen by the sensor,
    // on the canvas with rendering context "context".
    render: function (context, color) {
        this._updateCoordinates();

        context.strokeStyle = color;
        context.fillStyle = color;
        context.lineWidth = realityBuilder.util.SETTINGS.lineWidthOfBlock;
        this._renderForeground(context);
        this._renderBackground(context);
    }
});
