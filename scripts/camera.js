// A camera at position "x", "y", "z" looking along the direction defined by
// the angles "aZ", "aX". With the angles set to zero, the directions of the
// view space and the block space axes coincide: The camera looks along the
// positive z-direction, with the x-axis extending to the right and the y-axis
// extending to the bottom. Depending on position, the construction is either
// behind the camera, or the camera sees the construction from the bottom
// first.
//
// The camera (and, thus, view space) is rotated, first about the x-axis, then
// about the y-axis, and then about the z-axis, always relative to the current
// view space.
//
// The distance from the focal point to the sensor is the focal length "fl".
//
// The resolution of the camera sensor is 'sensorResolution' (px/mm).

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

/*global define */

define(['./sensor', './util', './block_properties', './topic_mixin',
        './socket',
        './vendor/sylvester.src-wrapped', './vendor/underscore-wrapped'
       ], function (sensor, util, blockProperties, topicMixin, socket,
                    sylvester, _) {
    var isInitialized = false, // true, iff initialized with server data
        pos = [0, 0, 1], // position of the camera in world space (mm)
        aX = 0, // rotation angle about x axis (rad)
        aY = 0,
        aZ = 0,
        fl = 1, // focal length (mm)
        sensorResolution = 100, // sensor resolution (px/mm)
        rZYX = null, // matrix describing rotation about x, then y, then z axis
        exports;

    // Updates matrices describing the rotation of the camera. Should be
    // called every time the rotation angles have been changed.
    function updateRotationMatrices() {
        var rYX, rX, rY, rZ;

        // Matrices are for rotating view space points, and that rotation is in
        // the oposite direction as that of the camera, which is rotated
        // counterclockwise. Therefore the matrices rotate clockwise.
        rX = sylvester.Matrix.RotationX(aX);
        rY = sylvester.Matrix.RotationY(-aY);
        rZ = sylvester.Matrix.RotationZ(aZ);
        rYX = rY.multiply(rX);
        rZYX = rZ.multiply(rYX);
    }

    updateRotationMatrices();
    socket.on('camera data', function (data) {
        exports.update(data);
    });

    exports = _.extend({
        // Identifier of the camera settings. It is a random string that is
        // updated on every change of camera settings, not only on those on the
        // server.
        //
        // fixme: maybe remove
        _id: null,

        _updateId: function () {
            this._id = Math.random().toString();
        },

        pos: function () {
            return pos;
        },

        aX: function () {
            return aX;
        },

        aY: function () {
            return aY;
        },

        aZ: function () {
            return aZ;
        },

        fl: function () {
            return fl;
        },

        sensorResolution: function () {
            return sensorResolution;
        },

        id: function () {
            return this._id;
        },

        // Updates the settings of the camera using the "data" which is a
        // subset of the data that also the server delivers.
        update: function (data) {
            pos = data.pos;
            aX = data.aX;
            aY = data.aY;
            aZ = data.aZ;
            fl = data.fl;
            sensorResolution = data.sensorResolution;
            updateRotationMatrices();
            this._updateId();

            isInitialized = true;

            this.publishTopic('changed');
        },

        // Returns the coordinates of the world space point "point" in view
        // space.
        worldToView: function (point) {
            var tmp = util.subtractVectors3D(point, pos);

            // Rotation matrices are applied to the vector tmp, from the left
            // side:
            tmp = sylvester.Vector.create(tmp);
            tmp = rZYX.multiply(tmp);

            return tmp.elements;
        },

        // Scale of distances parallel to the screen at view space position
        // "zV", when projected to the screen.
        scale: function (zV) {
            return sensorResolution * fl / zV; // px / mm
        },

        // Returns the coordinates of the view space point "pointV" in sensor
        // space.
        viewToSensor: function (pointV) {
            var xV = pointV[0], yV = pointV[1], zV = pointV[2], scale;

            // Projection on sensor:
            scale = this.scale(zV);
            xV *= scale; // px
            yV *= scale; // px

            // Puts camera position (and, thus, vanishing point) in the center
            // of the sensor:
            xV += sensor.width() / 2;
            yV += sensor.height() / 2;

            return [xV, yV];
        },

        // Returns the coordinates of the block space point "pointB" in sensor
        // space.
        blockToSensor: function (pointB) {
            return this.viewToSensor(this.worldToView(
                util.blockToWorld(pointB, blockProperties)
            ));
        },

        // Stores camera settings on server.
        saveToServer: function () {
            socket.emit('camera data', {
                pos: pos,
                aX: aX,
                aY: aY,
                aZ: aZ,
                fl: fl,
                sensorResolution: sensorResolution
            });
        }
    }, topicMixin);

    Object.defineProperty(exports, "isInitialized",
                          {get: function () { return isInitialized; }});

    return exports;
});
