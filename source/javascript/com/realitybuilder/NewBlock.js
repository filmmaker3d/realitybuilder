// The new block in the construction. It may be positioned by the user.
// Published topics:
//
// - When the block has been stopped: com/realitybuilder/NewBlock/stopped
// 
// - When the block has been made movable: 
//   com/realitybuilder/NewBlock/madeMovable

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

/*global com, dojo, dojox, G_vmlCanvasManager, logoutUrl */

dojo.provide('com.realitybuilder.NewBlock');

dojo.require('com.realitybuilder.Block');
dojo.require('com.realitybuilder.Shadow');

dojo.declare('com.realitybuilder.NewBlock', com.realitybuilder.Block, {
    // Points in block space, defining the rectangle which represents the space
    // in which blocks may be build.
    _BUILD_SPACE_1B: [-1, -1, 0],
    _BUILD_SPACE_2B: [11, 11, 6],

    // State of the block: 0 = stopped, 1 = movable
    _state: null,

    // Permament blocks in the construction, including real and pending blocks.
    // Needed for hidden lines removal and collision detection.
    _constructionBlocks: null,

    // Shadow in south-east direction.
    _shadow: null,

    // Camera object, used for calculating the projection on the camera sensor.
    _camera: null,

    // Block space position used when last calculating the sensor space
    // coordinates.
    _lastPositionB: null,

    // State of the block when it was last rendered.
    _lastState: null,

    // Version of the construction blocks when the shadow was last rendered.
    _lastConstructionBlocksVersion: null,

    // Creates the new block that the user may position. It is placed at the
    // position "positionB" in block space. For collision detection and for
    // calculating hidden lines, the block needs to know about the other blocks
    // in the construction: "constructionBlocks" When the block is rendered, it
    // is as seen by the sensor of the camera "camera".
    constructor: function (camera, positionB, constructionBlocks) {
        this._state = 1;
        this._constructionBlocks = constructionBlocks;
        this._shadow = new com.realitybuilder.Shadow(this, camera, 
                                                     constructionBlocks);
        this._camera = camera;
    },

    // See same function in super class.
    _sensorSpaceNeedsToBeUpdated: function () {
        return (this._lastPositionB === null ||
            !com.realitybuilder.util.pointsIdenticalB(
                this._lastPositionB, this._positionB) ||
            this.inherited(arguments));
    },

    // See same function in super class.
    _onSensorSpaceUpdated: function () {
        this._lastPositionB = dojo.clone(this._positionB);
        this.inherited(arguments);
    },

    // Moves the block in block space, by "delta", unless the move would make
    // it go out of range.
    move: function (deltaB) {
        if (!this.wouldGoOutOfRange(deltaB)) {
            this._positionB = com.realitybuilder.util.addVectorsB(
                this._positionB, deltaB);
        }
        dojo.publish('com/realitybuilder/NewBlock/moved');
    },

    isMovable: function () {
        return this._state === 1;
    },

    isStopped: function () {
        return this._state === 0;
    },

    stop: function () {
        this._state = 0;
        dojo.publish('com/realitybuilder/NewBlock/stopped');
    },

    makeMovable: function () {
        this._state = 1;
        dojo.publish('com/realitybuilder/NewBlock/madeMovable');
    },

    // Makes sure that this block does not intersect with any real block. If it
    // does, it is elevated step by step until it sits on top of another block.
    // Only updates the position of the block in block space. Does not update
    // any of the other coordinates.
    updatePositionB: function () {
        var status = this._constructionBlocks.realBlockIntersectionState(
            this._positionB),
            testZB;
        if (status !== 0) {
            testZB = this._positionB[2] + 1;
            while (this._wouldIntersectWithRealBlock(
                [this._positionB[0], this._positionB[1], testZB])) {
                testZB += 1;
            }
            this._positionB[2] = testZB;
        }
    },

    // Returns true, if this block would intersect with any real block if it
    // was moved in block space by the vector "deltaB", or if it would be
    // outside of the space where it is allowed to be moved. This space may be
    // larger than the building space, allowing movement of the block alongside
    // the exterior of the construction, for positioning.
    wouldGoOutOfRange: function (deltaB) {
        var testB = com.realitybuilder.util.addVectorsB(
            this._positionB, deltaB);
        return (this._wouldIntersectWithRealBlock(testB) ||
            !this._wouldBeInMoveSpace(testB));
    },

    // Returns true, if this block would be outside the move space, if it was
    // in block space at the position "testB". The move space is above the
    // ground and just as large as to allow a block to be moved anywhere
    // outside the boundary of the build space.
    _wouldBeInMoveSpace: function (testB) {
        var b1B = this._BUILD_SPACE_1B, b2B = this._BUILD_SPACE_2B;
        return (
            testB[0] >= b1B[0] - 2 && testB[0] <= b2B[0] &&
            testB[1] >= b1B[1] - 2 && testB[1] <= b2B[1] &&
            testB[2] >= 0 && testB[2] <= b2B[2] + 1);
    },

    // Returns true, iff this block is in the space where blocks may be build.
    _isInBuildSpace: function () {
        var xB = this._positionB[0],
            yB = this._positionB[1],
            zB = this._positionB[2],
            b1B = this._BUILD_SPACE_1B, b2B = this._BUILD_SPACE_2B;
        return (
            xB >= b1B[0] && xB <= b2B[0] - 2 &&
            yB >= b1B[1] && yB <= b2B[1] - 2 &&
            zB >= b1B[2] && zB <= b2B[2]);
    },

    // Returns true, iff this block is attachable to another block or to the
    // ground. That is the case when there is the ground plate or another block
    // immediately below this block, or if there is another block immediately
    // above this block.
    _isAttachable: function () {
        var xB = this._positionB[0],
            yB = this._positionB[1],
            zB = this._positionB[2];
        return (
            this._wouldIntersectWithRealBlock([xB, yB, zB - 1]) ||
            this._wouldIntersectWithRealBlock([xB, yB, zB + 1]) ||
            zB === 0);
    },

    // Returns true, iff the new block can be made real in its current
    // position.
    canBeMadeReal: function () {
        return this._isInBuildSpace() && this._isAttachable();
    },

    // Returns true, if this block would intersect with any real block if it
    // was in block space at the position "testB".
    _wouldIntersectWithRealBlock: function (testB) {
        return (this._constructionBlocks.
            realBlockIntersectionState(testB) !== 0);
    },

    // Returns true, iff the bounding box of the current block overlaps with
    // that of the block "block", in sensor space.
    _boundingBoxesOverlap: function (block) {
        return true;

        /* FIXME - reactivate: (
            (this._boundingBoxS[1][0] >= block._boundingBoxS[0][0]) &&
            (this._boundingBoxS[0][0] <= block._boundingBoxS[1][0]) &&
            (this._boundingBoxS[1][1] >= block._boundingBoxS[0][1]) &&
            (this._boundingBoxS[0][1] <= block._boundingBoxS[1][1]));
            */
    },

    // Returns true, iff any vertex of the current block is inside the bounding
    // box of the block "block", in sensor space. If the block "block" is
    // obscuring part or all of the current block, then this is the case.
    _anyVertexInBoundingBox: function (block) {
        var vertexesS = this._vertexesS, i, vS;
        for (i = 0; i < vertexesS.length; i += 1) {
            vS = vertexesS[i];
            if (vS[0] >= block._boundingBoxS[0][0] &&
                vS[0] <= block._boundingBoxS[1][0] &&
                vS[1] >= block._boundingBoxS[0][1] &&
                vS[1] <= block._boundingBoxS[1][1]) {
                return true;
            }
        }
        return false;
    },

    // Returns a list of points, defining the intersection between the line
    // "line", and the border of the block "block", in sensor space. The line
    // has inifinite extension and goes through the points "line[0]" and
    // "line[1]".
    _intersectionLineBlock: function (line, block) {
        var ips = [], bvsS = block._vertexesS, segment, p;
        dojo.forEach(this._BORDER_EDGES, function (edge) {
            segment = [bvsS[edge[0]], bvsS[edge[1]]];
            p = com.realitybuilder.util.intersectionSegmentLine(
                segment, line);
            if (p) {
                ips.push(p);
            }
        });
        return com.realitybuilder.util.withDuplicatesRemoved(ips);
    },

    // Subtracts the block "block" from the edge "edge". Returns the resulting
    // edge, or - if the edge has been completely removed - false. May modify
    // the vertexes in sensor space.
    _subtractFromEdge: function (edge, block) {
        var vertexesS = this._vertexesS,
            edgePoint1 = vertexesS[edge[0]],
            edgePoint2 = vertexesS[edge[1]],
            line = [edgePoint1, edgePoint2],
            intersectionPoints = this._intersectionLineBlock(line, block),
            iPoint1, iPoint2, edgePoint1Between, edgePoint2Between,
            iPoint1Between, newVertexIndex1, newVertexIndex2;
        if (intersectionPoints.length < 2) {
            // No intersection point, or pathological case that is ignored.
            // => Edge is not cut.
            return edge;
        } else {
            // Edge may be cut.
            iPoint1 = intersectionPoints[0];
            iPoint2 = intersectionPoints[1];

            edgePoint1Between = 
                com.realitybuilder.util.pointIsBetween(edgePoint1, 
                iPoint1, iPoint2);
            edgePoint2Between = 
                com.realitybuilder.util.pointIsBetween(edgePoint2, 
                iPoint1, iPoint2);

            if (edgePoint1Between && edgePoint2Between) {
                // Edge completely hidden.
                return false;
            }
            if (!edgePoint1Between && !edgePoint2Between) {
                // No intersection between the edge and the block.
                return edge;
            }

            // Stores the visible part of the edge:
            iPoint1Between = com.realitybuilder.util.pointIsBetween(
                iPoint1, edgePoint1, edgePoint2);
            newVertexIndex1 = vertexesS.push(
                edgePoint1Between ? edgePoint2 : edgePoint1) - 1;
            newVertexIndex2 = vertexesS.push(
                iPoint1Between ? iPoint1 : iPoint2) - 1;
            return [newVertexIndex1, newVertexIndex2, edge[2], edge[3]];
        }
    },

    // True, if - in block space - an edge of the border of the current block
    // touches an edge of the border of the block "block". The border is the
    // set of edges that make up the border of the block in sensor space.
    _borderTouchesBorder: function (block) {
        var deltas = [], cases, i, j;
        deltas[0] = com.realitybuilder.util.subtractVectorsB(
            block.positionB(), this._positionB);
        deltas[1] = com.realitybuilder.util.subtractVectorsB(
            this._positionB, block.positionB());
        cases = [
            [-1, 2, 1],
            [0, 2, 1],
            [1, 2, 1],
            [2, 2, 0],
            [2, 1, -1],
            [2, 0, -1],
            [2, -1, -1]];
        for (i = 0; i < 2; i += 1) {
            for (j = 0; j < 7; j += 1) {
                if (com.realitybuilder.util.pointsIdenticalB(
                    deltas[i], cases[j])) {
                    return true;
                }
            }
        }
        return false;
    },

    // Returns true, iff the edge "edge" is an inside edge, i.e. it is not a
    // border edge, and iff it is touched by the border of the block "block".
    // The block "block" has to be a cutting block.
    _edgeIsInsideEdgeAndTouchedByBorder: function (edge, block) {
        var deltaB = com.realitybuilder.util.subtractVectorsB(
            block.positionB(), this._positionB),
            cases = [], i;
        switch (edge[2]) {
        case 7:
            cases = [
                [-1, 0, 1], [0, 0, 1], [1, 0, 1], 
                [-1, -2, 0], [0, -2, 0], [1, -2, 0]];
            break;
        case 6:
            cases = [
                [0, -1, 1], [0, 0, 1], [0, 1, 1],
                [2, -1, 0], [2, 0, 0], [2, 1, 0]];
            break;
        case 11:
            cases = [[0, -2, 0], [2, 0, 0]];
            break;
        default:
            // not an inside edge
            return false;
        }
        for (i = 0; i < cases.length; i += 1) {
            if (com.realitybuilder.util.pointsIdenticalB(deltaB, cases[i])) {
                return true;
            }
        }
        return false;
    },

    // Returns true, if the edge "edge" should not be cut by the block "block".
    _edgeShouldNotBeCut: function (edge, block) {
        // If the edge is an inside edge and lies on the border of the block
        // then it should not be cut. Cutting it would not be wrong, but in the
        // authors opinion, not cutting it looks better.
        return this._edgeIsInsideEdgeAndTouchedByBorder(edge, block);
    },

    // Subtracts the block "block" from the current block, in sensor space.
    // What this means is that any line segments of the current block that lie
    // within the block "block" are removed.
    _subtract: function (block) {
        var newEdges = [], that = this, newEdge;
        dojo.forEach(this._edges, function (edge) {
            if (!that._edgeShouldNotBeCut(edge, block)) {
                newEdge = that._subtractFromEdge(edge, block);
                if (newEdge) {
                    newEdges.push(newEdge);
                }
            } else {
                newEdges.push(edge);
            }
        });
        this._edges = newEdges;
    },

    // Returns true, if the block "block" is a cutting block, i.e. if it is a
    // block in front of the current block.
    _isCuttingBlock: function (block) {
        return (
            block.xB() >= this.xB() - 1 && 
            block.yB() <= this.yB() + 1 &&
            block.zB() >= this.zB());
    },

    // Returns true, iff the block "block" fullfills conditions in block space
    // that are necessary for it hiding part of the current block. The
    // conditions work because the construction is oriented in a certain way.
    // It is assumed that the blocks do not intersect in block space.
    _fulfillsBlockSpaceHidingConditions: function (block) {
        // Only blocks in front of the current block are allowed to cut it. If
        // the blocks - in block space - touch along the border, then nothing
        // should be hidden. Without this check, the result is correct, but may
        // not be visually pleasing, since sometimes a line along the border is
        // removed and sometimes not. And, in the authors opinion, it looks
        // better if lines along borders are not removed.
        return (
            this._isCuttingBlock(block) && 
            !this._borderTouchesBorder(block));
    },

    // Removes hidden lines in sensor space. Depends on up to date coordinates
    // of the current block in sensor space. There is a special case here that
    // simplifies things: There is no overlap that cuts away from the middle of
    // an edge. And also - in world space - there is no overlap between this
    // block and a real block.
    _removeHiddenLines: function () {
        var realBlocksSorted, i, realBlock;

        /* FIXME
        this._edges = this._INITIAL_EDGES;
        realBlocksSorted = this._constructionBlocks.realBlocksSorted();

        // Idea behind the following loop: the current block may be covered by
        // blocks in a layer above or the same layer.
        for (i = 0; i < realBlocksSorted.length; i += 1) {
            realBlock = realBlocksSorted[i];

            if (realBlock.zB() < this.zB()) {
                break;
            }

            if (this._fulfillsBlockSpaceHidingConditions(realBlock)) {
                realBlock.updateSensorSpace();
                if (this._boundingBoxesOverlap(realBlock) && 
                    this._anyVertexInBoundingBox(realBlock)) {
                    this._subtract(realBlock);
                    this._updateSensorSpaceBoundingBox();
                }
            }
        }
        */
    },

    // Subtracts the shapes of the real blocks in front of the block from the
    // drawing on the canvas with rendering context "context".
    _subtractRealBlocks: function (context) {
        var realBlocksSorted = this._constructionBlocks.realBlocksSorted(),
            i, realBlock;

        // Idea behind the following loop: the shadow may be covered by blocks
        // in a layer above or the same layer.
        for (i = 0; i < realBlocksSorted.length; i += 1) {
            realBlock = realBlocksSorted[i];

            if (realBlock.zB() < this._zB) {
                break;
            }

            // Only blocks in front of the shadow are allowed to cut it.
            if (this._isCuttingBlock(realBlock)) {
                if (this._boundingBoxesOverlap(realBlock)) {
                    realBlock.subtract(context);
                }
            }
        }
    },

    // Updates the shadow, i.e. (re-)draws it or removes it. But only only when
    // the sensor space projection of the new block has changed
    // ("stateHasChanged" is true), when the state of the new block has changed
    // ("sensorSpaceHasChanged" is true), or when the construction blocks have
    // changed.
    _renderShadow: function (stateHasChanged, sensorSpaceHasChanged) {
        var constructionBlocksHaveChanged = (
            this._lastConstructionBlocksVersion !==
            this._constructionBlocks.versionOnServer());
        if (stateHasChanged || sensorSpaceHasChanged || 
            constructionBlocksHaveChanged) {
            if (this.isMovable()) {
                this._shadow.render();
            } else {
                this._shadow.clear();
            }
        }
        this._lastConstructionBlocksVersion =
            this._constructionBlocks.versionOnServer();
    },

    // Draws the block with shadow on the sensor of the camera. Depends on the
    // vertexes in view coordinates. Only re-renders the new block when
    // necessary, i.e. when its sensor space projection has changed or when its
    // state has changed. The shadow is updated only when the sensor space
    // projection of the new block has changed, when the state of the new block
    // has changed, or when the construction blocks have changed.
    render: function () {
        var canvas = this._camera.sensor().newBlockCanvas(),
            sensorSpaceHasChanged = this.updateSensorSpace(),
            stateHasChanged = (this._lastState !== this._state),
            context, color;

        if (canvas.getContext) {
            context = canvas.getContext('2d');
            color = this.isMovable() ? 'red' : 'white';
            this._renderShadow(stateHasChanged, sensorSpaceHasChanged);

            if (sensorSpaceHasChanged || stateHasChanged) {
                com.realitybuilder.util.clearCanvas(canvas);
                this.inherited(arguments, [context, color]);

                // hidden lines removal:
                this._subtractRealBlocks(context);
            }
        }
        this._lastState = this._state;
    }
});
