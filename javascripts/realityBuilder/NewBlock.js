// The new block in the construction. It may be positioned by the user.

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

dojo.provide('realityBuilder.NewBlock');

dojo.require('realityBuilder.Block');
dojo.require('realityBuilder.Shadow');

dojo.declare('realityBuilder.NewBlock', realityBuilder.Block, {
    '-chains-': {
        constructor: 'manual'
    },

    // Version of data last retrieved from the server, or "-1" initially. Is a
    // string in order to be able to contain very large integers.
    _versionOnServer: '-1',

    // Points in move space, defining the rectangle which represents the space
    // in which the block may be moved around.
    _moveSpace1B: null,
    _moveSpace2B: null,

    // Points in block space, defining the rectangle which represents the space
    // in which the block may be built.
    _buildSpace1B: null,
    _buildSpace2B: null,

    // Iff true, then the block is frozen, which means that it can neither be
    // moved nor be rotated, nor be made real.
    _isFrozen: null,

    // Permament blocks in the construction, including real and pending blocks.
    // Needed for hidden lines removal and collision detection.
    _constructionBlocks: null,

    // Shadow in south-east direction.
    _shadow: null,

    // Camera object, used for calculating the projection on the camera sensor.
    _camera: null,

    // Block space position used when last calculating the sensor space
    // coordinates.
    _lastPosB: null,

    // Whether the block was frozen or not when it was last rendered.
    _wasFrozenWhenLastRendered: null,

    // Version of the construction blocks when the shadow was last rendered.
    _lastConstructionBlocksVersion: null,

    // Prerender-mode (only relevant if enabled):
    _prerenderMode: null,

    // Creates the new block that the user may position. For collision
    // detection and for calculating hidden lines, the block needs to know
    // about the other blocks in the construction: "constructionBlocks" When
    // the block is rendered, it is as seen by the sensor of the camera
    // "camera".
    //
    // The block's properties, such as shape and size, are described by
    // "blockProperties".
    //
    // Details of data for prerender-mode, if enabled, are contained in
    // "prerenderMode".
    constructor: function (blockProperties, camera, constructionBlocks,
                           prerenderMode) {
        this.inherited(arguments, [blockProperties, camera, [0, 0, 0], 0]);
        this._isFrozen = false;
        this._constructionBlocks = constructionBlocks;
        this._shadow = new realityBuilder.Shadow(this, blockProperties,
                                                 camera,
                                                 constructionBlocks);
        this._camera = camera;
        this._prerenderMode = prerenderMode;
    },

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
        var positionAngleWereInitialized;

        if (this._versionOnServer !== serverData.version) {
            if (!this.isInitializedWithServerData()) {
                this._posB = serverData.initPosB;
                this._a = serverData.initA;
                positionAngleWereInitialized = true;
            } else {
                positionAngleWereInitialized = false;
            }

            this._moveSpace1B = serverData.moveSpace1B;
            this._moveSpace2B = serverData.moveSpace2B;
            this._buildSpace1B = serverData.buildSpace1B;
            this._buildSpace2B = serverData.buildSpace2B;

            this._versionOnServer = serverData.version;

            if (positionAngleWereInitialized) {
                dojo.publish('realityBuilder/NewBlock/' +
                             'positionAngleInitialized');
            }
            dojo.publish('realityBuilder/NewBlock/moveOrBuildSpaceChanged');
        }
    },

    // Returns true, iff the current block collides with any real block.
    _collidesWithRealBlock: function () {
        return this._constructionBlocks.realBlocksCollideWith(this);
    },

    // Moves the block in block space, by "delta", unless the move would make
    // it go out of range, and unless the block is frozen.
    move: function (deltaB) {
        if (!this._wouldGoOutOfRange(deltaB, 0) && !this._isFrozen) {
            this._posB = realityBuilder.util.addVectorsB(this._posB, deltaB);
            dojo.publish('realityBuilder/NewBlock/movedOrRotated');
        }
    },

    // Rotates the block by 90°, CCW when viewed from above, unless the
    // rotation would make it go out of range, and unless the block is frozen.
    rotate90: function () {
        if (!this._wouldGoOutOfRange([0, 0, 0], 1) && !this._isFrozen) {
            this._a = (this._a + 1) % 4; // multiples of 90°
            dojo.publish('realityBuilder/NewBlock/movedOrRotated');
        }
    },

    // Requests that the block be made pending, thereby requesting to
    // eventually have it made real.
    requestMakeReal: function () {
        if (this.canBeMadeReal()) {
            this._freeze();
            this._createPendingOnServer();
            dojo.publish('realityBuilder/NewBlock/makeRealRequested');
        }
    },

    isFrozen: function () {
        return this._isFrozen;
    },

    _freeze: function () {
        this._isFrozen = true;
        dojo.publish('realityBuilder/NewBlock/frozen');
    },

    unfreeze: function () {
        this._isFrozen = false;
        dojo.publish('realityBuilder/NewBlock/unfrozen');
    },

    // Returns true, iff this block equals a construction block that has been
    // marked deleted.
    _turnedIntoDeletedConstructionBlock: function () {
        var posB, constructionBlock;

        if (this.isFrozen()) {
            // The block is currently in the state "requested to be made real".

            if (this._prerenderMode.isEnabled()) {
                // With prerender-mode enabled it never happens that a "make
                // real" request is answered with turning the block into a
                // deleted construction block.
                //
                // Furthermore, the check below may fail in the case of
                // two-fold rotational symmetry, where it could happen that the
                // "make real" request is answered with a congruent block, is
                // rotated by 180°. This, on the other hand, does not happen
                // with prerender-mode disabled.
                return false;
            } else {
                constructionBlock =
                    this._constructionBlocks.blockAt(this.posB(),
                                                     this.a());
                if (constructionBlock) {
                    // Construction block in same position as new block.

                    if (constructionBlock.isDeleted()) {
                        return true;
                    }
                }
            }
        }

    },

    // Makes sure that this block does not intersect with any real block. If it
    // does, it is elevated step by step until it sits on top of another block.
    // Only updates the position of the block in block space. Does not update
    // any of the other coordinates.
    //
    // Returns true, iff the block has been elevated.
    _moveOutOfTheWay: function () {
        var testBlock, cbs = this._constructionBlocks,
            xB = this.xB(), yB = this.yB(), testZB;
        if (this._collidesWithRealBlock()) {
            testZB = this.zB();
            do {
                testZB += 1;
                testBlock = new realityBuilder.Block(this._blockProperties,
                                                         this._camera,
                                                         [xB, yB, testZB],
                                                         this.a());
            } while (cbs.realBlocksCollideWith(testBlock));
            this._posB[2] = testZB;
            return true;
        }

        return false;
    },

    // To be called after construction blocks have been changed.
    updateState: function () {
        var turnedIntoDeletedConstructionBlock, hasBeenMovedOutOfTheWay;

        // Has to be called before possibly moving the block out of the way:
        turnedIntoDeletedConstructionBlock =
            this._turnedIntoDeletedConstructionBlock();

        hasBeenMovedOutOfTheWay = this._moveOutOfTheWay();

        if (this.isFrozen() && (hasBeenMovedOutOfTheWay ||
                                turnedIntoDeletedConstructionBlock)) {
            this.unfreeze();
        }
    },

    // Returns true, if this block would intersect with any real block if:
    //
    // * it was moved in block space by the vector "deltaB", and/or 
    //
    // * rotated CCW (when viewd from above) by the angle "deltaA" (in
    //   multiples of 90°), or 
    //
    // * if it would be outside of the space where it is allowed to be moved.
    _wouldGoOutOfRange: function (deltaB, deltaA) {
        var testPosB, testBlock, testA;

        testPosB = realityBuilder.util.addVectorsB(this.posB(),
                                                        deltaB);
        testA = (this.a() + deltaA) % 4;
        testBlock = new realityBuilder.Block(this._blockProperties,
                                             this._camera,
                                             testPosB, testA);

        return (this._constructionBlocks.realBlocksCollideWith(testBlock) ||
                !this._wouldBeInMoveSpace(testPosB));
    },

    canBeRotated90: function () {
        return !this._wouldGoOutOfRange([0, 0, 0], 1) && !this._isFrozen;
    },

    canBeMoved: function (deltaB) {
        return !this._wouldGoOutOfRange(deltaB, 0) && !this._isFrozen;
    },

    // Returns true, if this block would be outside the move space, if it was
    // at the position "testB" (block space coordinates). The move space is the
    // space in which the block is allowed to be moved around.
    _wouldBeInMoveSpace: function (testB) {
        var m1B = this._moveSpace1B, m2B = this._moveSpace2B;
        return (testB[0] >= m1B[0] && testB[0] <= m2B[0] &&
                testB[1] >= m1B[1] && testB[1] <= m2B[1] &&
                testB[2] >= 0 && testB[2] <= m2B[2]);
    },

    // Returns true, iff this block is in the space where blocks may be build.
    _isInBuildSpace: function () {
        var xB = this._posB[0],
            yB = this._posB[1],
            zB = this._posB[2],
            b1B = this._buildSpace1B,
            b2B = this._buildSpace2B;
        return (xB >= b1B[0] && xB <= b2B[0] &&
                yB >= b1B[1] && yB <= b2B[1] &&
                zB >= b1B[2] && zB <= b2B[2]);
    },

    // Returns true, iff this block is attachable to another block or to the
    // ground.
    _isAttachable: function () {
        return (this._constructionBlocks.realBlocksAreAttachableTo(this) ||
                this.zB() === 0);
    },

    _isInPrerenderedBlockConfiguration: function () {
        var realBlocks = this._constructionBlocks.realBlocksSorted();
        return this._prerenderMode.matchingBlockConfigurationI(realBlocks,
                                                               this) !== false;
    },

    // Returns true, iff the new block can be made real in its current
    // position.
    canBeMadeReal: function () {
        return this._isInBuildSpace() && this._isAttachable() &&
            (!this._prerenderMode.isEnabled() ||
             this._isInPrerenderedBlockConfiguration()) &&
            !this._isFrozen;
    },

    // Returns true, iff the bounding box of the current block overlaps with
    // that of the block "block", in sensor space.
    _boundingBoxesOverlap: function (block) {
        // l = left, r = right, b = bottom, t = top
        var l, r, b, t, blockL, blockR, blockB, blockT,
            horizontalOverlap, verticalOverlap;

        this._updateCoordinates();
        l = this._boundingBoxS[0][0];
        r = this._boundingBoxS[1][0];
        b = this._boundingBoxS[0][1];
        t = this._boundingBoxS[1][1];
        block._updateCoordinates();
        blockL = block._boundingBoxS[0][0];
        blockR = block._boundingBoxS[1][0];
        blockB = block._boundingBoxS[0][1];
        blockT = block._boundingBoxS[1][1];

        horizontalOverlap = (r >= blockL && l <= blockR);
        verticalOverlap = (t >= blockB && b <= blockT);

        return horizontalOverlap && verticalOverlap;
    },

    // Compares the vertexes "vertexes1VXZ" with the edges defined by
    // "vertexes2VXZ".
    _relationVertexesEdges: function (vertexes1VXZ, vertexes2VXZ) {
        var util, len, i, j, relation, vertexVXZ, vertex1VXZ, edge2VXZ;

        util = realityBuilder.util;

        len = vertexes2VXZ.length; // same for all blocks
        for (i = 0; i < len; i += 1) { // iterates edges of this block
            edge2VXZ = [vertexes2VXZ[i], vertexes2VXZ[(i + 1) % len]];
            for (j = 0; j < len; j += 1) { // iterates vertexes of "block"
                vertex1VXZ = vertexes1VXZ[j];
                relation = util.relationPointSegmentVXZ(vertex1VXZ,
                                                        edge2VXZ);

                if (relation < 0 || relation > 0) {
                    return relation;
                } // else continue since no decision can be made yet
            }
        }

        return 0; // undecided
    },

    // If the new block (= the current block) and the block "block" are on the
    // same layer (SL) and they overlap (O) in sensor space, then this has one
    // of the following return values:
    //
    // True: The block "block" obscures the new block visually. In other words:
    //   To get a correct result, the block "block" has to be drawn on top of
    //   the new block.
    //
    // False: The new block obscures the block "block" visually.
    _isObscuredBySLO: function (block) {
        var relation, vertexesVXZ, blockVertexesVXZ;

        // What follows is a comparison of the projection of the blocks on the
        // view space x-z-plane, from the point of view of the camera. The
        // projection is a parallel projection: It works simply by extending
        // the vertical edges of the prismatic blocks to the view space
        // x-z-plane.

        vertexesVXZ = this.projectedVertexesVXZ();
        blockVertexesVXZ = block.projectedVertexesVXZ();

        if (vertexesVXZ === false || blockVertexesVXZ === false) {
            // something went wrong during calculation (extremely unlikely) =>
            // fail silently with an arbitrary return value:
            return false;
        }

        relation = this._relationVertexesEdges(blockVertexesVXZ, vertexesVXZ);
        if (relation === 0) {
            // Still undecided => swap around blocks. May be necessary if this
            // block is very narrow from the perspective of the camera. In that
            // case, the straight lines going through the vertexes of "block"
            // never cut the edges of this block.
            relation =
                this._relationVertexesEdges(vertexesVXZ, blockVertexesVXZ);
            relation = -relation;
        }

        if (relation < 0) {
            // Vertex of "block" is in front of edge of this block. =>
            // "block" is in front of this block, as both are convex
            // prisms in the same layer.
            return true;
        } else if (relation > 0) {
            // Vertex of "block" is behind edge of this block.
            return false;
        } else {
            return false; // blocks don't overlap in screen space, and so
                          // return value is irrelevant (see description of
                          // function)
        }
    },

    // Subtracts the shape of the the real block "realblock" from the canvas
    // containing the drawing of the new block. The context of that canvas is
    // "context". To speed up things, the block is only subtracted, if its
    // sensor space bounding box overlaps with that of the new block.
    _subtractRealBlock: function (realBlock, context) {
        if (this._boundingBoxesOverlap(realBlock)) {
            realBlock.subtract(context);
        }
    },

    // Subtracts the shapes of the real blocks in front of the block from the
    // drawing on the canvas with rendering context "context".
    _subtractRealBlocks: function (context) {
        var realBlocksSorted = this._constructionBlocks.realBlocksSorted(),
            i,
            realBlock,
            zB = this.zB();

        // Idea behind the following loop: the new block may be obscured by
        // blocks in a layer above or the same layer. Due to perspective
        // (camera always above construction), it will never be obscured by
        // blocks on the layer below.
        for (i = 0; i < realBlocksSorted.length; i += 1) {
            realBlock = realBlocksSorted[i];

            if (realBlock.zB() < zB) {
                break; // because all the following blocks are also below the
                       // new block
            } else if (realBlock.zB() === zB) {
                if (this._isObscuredBySLO(realBlock)) {
                    this._subtractRealBlock(realBlock, context);
                }
            } else if (realBlock.zB() > zB) {
                // Real blocks in a layer above always obscure real blocks in
                // the layer below, due to perspective.
                this._subtractRealBlock(realBlock, context);
            }
        }
    },

    // Updates the shadow, i.e. (re-)draws it or removes it.
    _renderShadow: function () {
        var color, alpha;

        if (this.isFrozen()) {
            this._shadow.clear();
        } else {
            color = realityBuilder.util.SETTINGS.colorOfNewBlockShadow;
            alpha = realityBuilder.util.SETTINGS.alphaOfNewBlockShadow;
            this._shadow.render(color, alpha);
        }
    },

    // Returns true, iff there have been changes that make it necessary to
    // rerender this block.
    _needsToBeRendered: function () {
        var coordinatesHaveChanged, constructionBlocksHaveChanged,
            isFrozenStateHasChanged;

        coordinatesHaveChanged = this._coordinatesChangedAfterLastRendering;

        // Rerendering is necessary on construction block change, because they
        // may obscure part of the block and shadow, and are thus part of the
        // rendering:
        constructionBlocksHaveChanged =
            (this._lastConstructionBlocksVersion !==
             this._constructionBlocks.versionOnServer());

        isFrozenStateHasChanged = (this._wasFrozenWhenLastRendered !==
                                   this._isFrozen);

        return coordinatesHaveChanged || constructionBlocksHaveChanged ||
            isFrozenStateHasChanged;
    },

    _onRendered: function () {
        this._coordinatesChangedAfterLastRendering = false;
        this._wasFrozenWhenLastRendered = this._isFrozen;
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
        var canvas, context, color;

        this._updateCoordinates();

        if (this._needsToBeRendered()) {
            canvas = this._camera.sensor().newBlockCanvas();
            if (canvas.getContext) {
                context = canvas.getContext('2d');
                color = (this.isFrozen() ?
                         realityBuilder.util.SETTINGS.colorOfFrozenNewBlock :
                         realityBuilder.util.SETTINGS.colorOfNewBlock);

                // Shadow does currently not work with FlashCanvas.
                if (!realityBuilder.util.isFlashCanvasActive()) {
                    this._renderShadow();
                }

                realityBuilder.util.clearCanvas(canvas);
                this.inherited(arguments, [context, color]);

                // removes parts of the real block obscured by other blocks:
                this._subtractRealBlocks(context);
            }
            this._onRendered();
        }
    },

    // Called if storing the block as pending on the server succeeded.
    _createPendingOnServerSucceeded: function () {
        dojo.publish('realityBuilder/NewBlock/createdPendingOnServer');

        if (this._prerenderMode.isEnabled()) {
            setTimeout(
                dojo.hitch(this,
                           this._makeRealIfInPrerenderedBlockConfiguration),
                this._prerenderMode.makeRealAfter()
            );
        }
    },

    // Adds this block to the list of blocks on the server, with state pending.
    _createPendingOnServer: function () {
        realityBuilder.util.jsonpGet({
            url: realityBuilder.util.rootUrl() + "rpc/create_pending",
            content: {
                "xB": this.xB(),
                "yB": this.yB(),
                "zB": this.zB(),
                "a": this.a()
            },
            load: dojo.hitch(this, this._createPendingOnServerSucceeded)
        });
    },

    // If this block together with the real blocks matches a prerendered block
    // configuration, then makes it real by loading the appropriate prerendered
    // block configuration.
    //
    // Otherwise, just unfreezes the block.
    _makeRealIfInPrerenderedBlockConfiguration: function () {
        var i, realBlocks;

        realBlocks = this._constructionBlocks.realBlocksSorted();
        i = this._prerenderMode.matchingBlockConfigurationI(realBlocks, this);

        if (i !== false) {
            this._prerenderMode.loadBlockConfigurationOnServer(i);
        } else {
            // this block and the real block don't match a prerendered
            // configuration
            this.unfreeze();
        }
    }
});
