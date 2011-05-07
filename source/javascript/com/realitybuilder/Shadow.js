// The shadow under the new block. It is used to indicate where the block is
// hovering.

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

dojo.provide('com.realitybuilder.Shadow');

dojo.require('com.realitybuilder.ShadowPart');

dojo.declare('com.realitybuilder.Shadow', null, {
    // New block that the shadow is associated with.
    _newBlock: null,

    // Parts of the shadow:
    _shadowParts: null,

    // Camera object, used for calculating the projection on the camera sensor.
    _camera: null,

    // Permament blocks in the construction, including real and pending blocks.
    // Needed for hidden lines removal and collision detection.
    _constructionBlocks: null,

    // Creates the shadow of the block "newBlock". When the shadow is rendered,
    // it is as seen by the sensor of the camera "camera". For finding which
    // parts of the shadow have to be obscured, the list of non-new blocks in
    // the construction is used: "constructionBlocks"
    constructor: function (newBlock, camera, constructionBlocks) {
        var i, deltaX, deltaY;

        this._newBlock = newBlock;
        this._camera = camera;
        this._constructionBlocks = constructionBlocks;

        this._shadowParts = [];
        i = 0;
        for (deltaX = 0; deltaX < 2; deltaX += 1) {
            for (deltaY = 0; deltaY < 2; deltaY += 1) {
                this._shadowParts[i] = new com.realitybuilder.ShadowPart
                    (deltaX, deltaY, newBlock, camera, constructionBlocks);
                i += 1;
            }
        }
    },

    // Sort function, for ordering shadow parts by height/layer. From bottom to
    // top.
    _sortByHeight: function (shadowPart1, shadowPart2) {
        if (shadowPart1.zB() > shadowPart2.zB()) {
            return 1;
        } else if (shadowPart1.zB() < shadowPart2.zB()) {
            return -1;
        } else {
            return 0;
        }
    },

    // Updates the sensor space of the shadow parts.
    _updateSensorSpace: function () {
        dojo.forEach(this._shadowParts, function (shadowPart) {
            shadowPart.updateSensorSpace();
        });
    },

    // Orders the shadow parts, from bottom to top.
    _sortShadowParts: function () {
        this._shadowParts.sort(this._sortByHeight);
    },

    // Draws the shadow as seen by the sensor of the camera. Depends on the
    // vertices in view coordinates.
    render: function () {
        var canvas = this._camera.sensor().shadowCanvas(), context;
        this._updateSensorSpace();
        this._sortShadowParts();
        if (canvas.getContext) {
            context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            dojo.forEach(this._shadowParts, function (shadowPart) {
                shadowPart.render(context);
            });
        }
    },

    // Makes sure that the shadow is not shown on the sensor.
    clear: function () {
        var canvas = this._camera.sensor().shadowCanvas(), context;
        if (canvas.getContext) {
            context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
});
