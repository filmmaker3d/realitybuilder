if(!dojo._hasResource['com.realitybuilder.LayerShadow']){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource['com.realitybuilder.LayerShadow'] = true;
// "Layer shadow": The shadow under the new block, projected onto a layer of
// blocks under the assumption that there are no layers below and above that
// layer.
//
// Instantiating this class causes creation of DOM elements. These elements may
// not be removed from memory upon deletion of an instance. This problem
// happens for example in Firefox 4, thus leading to memory leaks. As a
// solution, it is recommended that an instance is reused wherever possible.

// Sometimes the term "full shadow" is used, which refers to the shadow how it
// would look if the all blocks in the layer would form an infinite plane
// without holes.

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

dojo.provide('com.realitybuilder.LayerShadow');

dojo.declare('com.realitybuilder.LayerShadow', null, {
    // New block that the shadow is associated with.
    _newBlock: null,

    // Camera object, used for calculating the projection on the camera sensor.
    _camera: null,

    // Properties (shape, dimensions, etc.) of a block:
    _blockProperties: null,

    // Permament blocks in the construction, including real and pending blocks.
    // Needed for hidden lines removal and collision detection.
    _constructionBlocks: null,

    // Coordinates of the full shadow's vertexes in world space, view space,
    // and sensor space.
    _fullVertexes: null,
    _fullVertexesV: null,
    _fullVertexesS: null,

    // Canvas onto which the layer shadow is drawn:
    _canvas: null,

    // Temporary canvas, for constructing the layer shadow (it's safer to
    // create it only once and reuse it, to avoid possible memory leaks with
    // weak garbage collectors).
    _helperCanvas: null,

    constructor: function (newBlock, blockProperties, camera, 
                           constructionBlocks)
    {
        var shadowCanvas;

        this._newBlock = newBlock;
        this._blockProperties = blockProperties;
        this._camera = camera;
        this._constructionBlocks = constructionBlocks;

        shadowCanvas = camera.sensor().shadowCanvas();
        this._canvas = dojo.create('canvas');
        dojo.attr(this._canvas, 'width', shadowCanvas.width);
        dojo.attr(this._canvas, 'height', shadowCanvas.height);
        this._helperCanvas = dojo.create('canvas');
        dojo.attr(this._helperCanvas, 'width', shadowCanvas.width);
        dojo.attr(this._helperCanvas, 'height', shadowCanvas.height);

        if (com.realitybuilder.util.isFlashCanvasActive()) {
            FlashCanvas.initElement(this._canvas);
            FlashCanvas.initElement(this._helperCanvas);
        }
    },

    // Returns the canvas onto which the layer shadow is drawn:
    canvas: function () {
        return this._canvas;
    },

    // Updates the vertexes of the full shadow, projected onto the layer of
    // blocks of elevation "layerZB", in world space.
    _updateWorldSpace: function (layerZB) {
        var 
        xB = this._newBlock.xB(),
        yB = this._newBlock.yB(),
        zB = layerZB + 1,
        vs = [],
        blockOutlineBXY = 
            this._blockProperties.rotatedOutlineBXY(this._newBlock.a()),
        that = this;

        // counterclockwise:
        dojo.forEach(blockOutlineBXY, function (vertexBXY) {
            vs.push(com.realitybuilder.util.
                    blockToWorld([xB + vertexBXY[0], 
                                  yB + vertexBXY[1], 
                                  zB],
                                 that._blockProperties));
        });

        this._fullVertexes = vs;
    },

    // Calculates the vertexes of the full shadow, projected onto the layer of
    // blocks of elevation "layerZB", in view space.
    _updateViewSpaceCoordinates: function (layerZB) {
        this._updateWorldSpace(layerZB);
        this._fullVertexesV = dojo.map(this._fullVertexes, 
                                       dojo.hitch(this._camera, 
                                                  this._camera.worldToView));
    },

    // Calculates the vertexes of the full shadow, projected onto the layer of
    // blocks of elevation "layerZB", in sensor space. The camera is positioned
    // in the center of the sensor.
    //
    // Depends on up to date view space coordinates.
    _updateSensorSpaceCoordinates: function (layerZB) {
        this._fullVertexesS = dojo.map(this._fullVertexesV,
                                   dojo.hitch(this._camera, 
                                              this._camera.viewToSensor));
    },

    // Updates coordinates for the full shadow, projected onto the layer of
    // blocks of elevation "layerZB"
    _updateCoordinates: function (layerZB) {
        this._updateViewSpaceCoordinates(layerZB);
        this._updateSensorSpaceCoordinates(layerZB);
    },

    // Renders the tops of the blocks in the layer "layerZB".
    _renderTops: function (layerZB, context) {
        var 
        realBlocksOnLayer = 
            this._constructionBlocks.realBlocksInLayer(layerZB);

        dojo.forEach(realBlocksOnLayer, function (realBlock) {
            realBlock.renderSolidTop(context);
        });
    },

    // Draws the full shadow, projected onto the layer of blocks of elevation
    // "layerZB", on the canvas with rendering context "context".
    _renderFull: function (layerZB, context) {
        var fullVertexesS, vertexS, i;

        this._updateCoordinates(layerZB);

        fullVertexesS = this._fullVertexesS;

        context.fillStyle = "red";

        // counterclockwise:
        vertexS = fullVertexesS[0];
        context.beginPath();
        context.moveTo(vertexS[0], vertexS[1]);
        for (i = 1; i < fullVertexesS.length; i += 1) {
            vertexS = fullVertexesS[i];
            context.lineTo(vertexS[0], vertexS[1]);
        }
        context.closePath();
        context.fill();
    },

    // Draws the shadow on top of a layer of blocks, or on the ground plane, on
    // the canvas with rendering context "context", as seen by the sensor of
    // the camera.
    //
    // "layerZB" is the elevation of the layer of blocks, on which the shadow
    // is projected (-1 is the ground plane):
    render: function (layerZB) {
        var 
        canvas = this._canvas, helperCanvas = this._helperCanvas, 
        context, helperContext;

        // Draws the layer shadow by drawing the intersection between the tops
        // of the layer's blocks (or the ground plane) and the full shadow. To
        // do this, first xors the tops (ground plane) and the full shadow.
        // Then subtracts that from the combination of the blocks and the full
        // shadow. Rationale for this rather complicated procedure: The easier
        // canvas compositing method "source-in" is not supported by Google
        // Chrome 11.
        if (canvas.getContext) {
            context = canvas.getContext('2d');
            com.realitybuilder.util.clearCanvas(canvas);
            helperContext = helperCanvas.getContext('2d');
            com.realitybuilder.util.clearCanvas(helperCanvas);

            context.globalCompositeOperation = "source-over";
            if (layerZB === -1) {
                com.realitybuilder.util.fillCanvas(canvas, "black");
            } else {
                this._renderTops(layerZB, context); // slow with many blocks
            }

            // xor:
            helperContext.globalCompositeOperation = "source-over";
            helperContext.drawImage(canvas, 0, 0);
            helperContext.globalCompositeOperation = "xor";
            this._renderFull(layerZB, helperContext); // fast

            // completes combination:
            this._renderFull(layerZB, context); // fast
            
            // subtracts:
            context.globalCompositeOperation = "destination-out";
            context.drawImage(helperCanvas, 0, 0);
        }
    }
});

}
