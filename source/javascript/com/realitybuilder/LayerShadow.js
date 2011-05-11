// "Layer shadow": The shadow under the new block, projected onto a layer of
// blocks under the assumption that there are no layers below and above that
// layer.

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

/*global com, dojo, dojox, G_vmlCanvasManager, logoutUrl */

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

    // Elevation of the layer of blocks, on which the shadow is projected (-1
    // is the ground plane):
    _layerZB: null,

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
                           constructionBlocks, layerZB)
    {
        var shadowCanvas;

        this._newBlock = newBlock;
        this._blockProperties = blockProperties;
        this._camera = camera;
        this._constructionBlocks = constructionBlocks;
        this._layerZB = layerZB;

        shadowCanvas = camera.sensor().shadowCanvas();
        this._canvas = dojo.create('canvas');
        dojo.attr(this._canvas, 'width', shadowCanvas.width);
        dojo.attr(this._canvas, 'height', shadowCanvas.height);
        this._helperCanvas = dojo.create('canvas');
        dojo.attr(this._helperCanvas, 'width', shadowCanvas.width);
        dojo.attr(this._helperCanvas, 'height', shadowCanvas.height);
    },

    // Returns the canvas onto which the layer shadow is drawn:
    canvas: function () {
        return this._canvas;
    },

    // Updates the vertexes of the full shadow in world space.
    _updateWorldSpace: function () {
        var 
        xB = this._newBlock.xB(),
        yB = this._newBlock.yB(),
        zB = this._layerZB + 1,
        vs = [],
        blockOutlineB = this._blockProperties.outlineB();

        // counterclockwise:
        dojo.forEach(blockOutlineB, function (vertexXYB) {
            vs.push(com.realitybuilder.util.blockToWorld([xB + vertexXYB[0], 
                                                          yB + vertexXYB[1], 
                                                          zB]));
        });

        this._fullVertexes = vs;
    },

    // Calculates the vertexes of the full shadow in view space.
    _updateViewSpace: function () {
        this._updateWorldSpace();
        this._fullVertexesV = dojo.map(this._fullVertexes, 
                                       dojo.hitch(this._camera, 
                                                  this._camera.worldToView));
    },

    // Calculates the vertexes of the full shadow in sensor space. The camera
    // is positioned in the center of the sensor.
    updateSensorSpace: function () {
        this._updateViewSpace();
        this._fullVertexesS = dojo.map(this._fullVertexesV,
                                   dojo.hitch(this._camera, 
                                              this._camera.viewToSensor));
    },

    // Renders the tops of the blocks in the layer.
    _renderTops: function (context) {
        var 
        realBlocksOnLayer = 
            this._constructionBlocks.realBlocksInLayer(this._layerZB);

        dojo.forEach(realBlocksOnLayer, function (realBlock) {
            realBlock.renderSolidTop(context);
        });
    },

    // Draws the full shadow, intersecting it with what is already on the
    // canvas with rendering context "context".
    _renderFull: function (context) {
        var fullVertexesS, vertexS, i;

        this.updateSensorSpace();

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

    // Draws the shadow as seen by the sensor of the camera, on the canvas with
    // rendering context "context".
    render: function () {
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
            if (this._layerZB === -1) {
                com.realitybuilder.util.fillCanvas(canvas, "black");
            } else {
                this._renderTops(context); // slow with many blocks
            }

            // xor:
            helperContext.globalCompositeOperation = "source-over";
            helperContext.drawImage(canvas, 0, 0);
            helperContext.globalCompositeOperation = "xor";
            this._renderFull(helperContext); // fast

            // completes combination:
            this._renderFull(context); // fast
            
            // subtracts:
            context.globalCompositeOperation = "destination-out";
            context.drawImage(helperCanvas, 0, 0);
        }
    }
});
