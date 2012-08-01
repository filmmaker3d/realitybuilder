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
        './vendor/sylvester.src-wrapped', './vendor/underscore-wrapped'
       ], function (sensor, util, blockProperties, topicMixin, sylvester, _) {
    var object = _.extend({
        // Position of the camera in world space (mm):
        _pos: [0, 0, 1],

        // Angles defining orientation (rad):
        _aX: 0,
        _aY: 0,
        _aZ: 0,

        // Focal length (mm):
        _fl: 1,

        // Sensor resolution (px/mm) and dimensions (px):
        _sensorResolution: 100,

        // Rotation matrices.
        _rZYX: null, // rotation about X, then Y, then Z

        // Version of data last retrieved from the server, or "-1" initially.
        // Is a string in order to be able to contain very large integers.
        _versionOnServer: '-1',

        // Identifier of the camera settings. It is a random string that is
        // updated on every change of camera settings, not only on those on the
        // server.
        _id: null,

        init: function () {
            this._updateRotationMatrices();
        },

        _updateId: function () {
            this._id = Math.random().toString();
        },

        versionOnServer: function () {
            return this._versionOnServer;
        },

        // Returns false when the object is new and has not yet been updated
        // with server data.
        isInitializedWithServerData: function () {
            return this._versionOnServer !== '-1';
        },

        pos: function () {
            return this._pos;
        },

        aX: function () {
            return this._aX;
        },

        aY: function () {
            return this._aY;
        },

        aZ: function () {
            return this._aZ;
        },

        fl: function () {
            return this._fl;
        },

        sensorResolution: function () {
            return this._sensorResolution;
        },

        id: function () {
            return this._id;
        },

        // Updates the settings of the camera using the "data" which is a
        // subset of the data that also the server delivers.
        update: function (data) {
            this._pos = data.pos;
            this._aX = data.aX;
            this._aY = data.aY;
            this._aZ = data.aZ;
            this._fl = data.fl;
            this._sensorResolution = data.sensorResolution;
            this._updateRotationMatrices();
            this._updateId();

            this.publishTopic('changed');
        },

        // Updates the settings of the camera to the version on the server,
        // which is described by "serverData".
        updateWithServerData: function (serverData) {
            if (this._versionOnServer !== serverData.version) {
                this._versionOnServer = serverData.version;
                this.update(serverData);
            }
        },

        // Updates matrices describing the rotation of the camera. Should be
        // called every time the rotation angles have been changed.
        _updateRotationMatrices: function () {
            var rYX, rX, rY, rZ;

            // Matrices are for rotating view space points, and that rotation
            // is in the oposite direction as that of the camera, which is
            // rotated counterclockwise. Therefore the matrices rotate
            // clockwise.
            rX = sylvester.Matrix.RotationX(this._aX);
            rY = sylvester.Matrix.RotationY(-this._aY);
            rZ = sylvester.Matrix.RotationZ(this._aZ);
            rYX = rY.multiply(rX);
            this._rZYX = rZ.multiply(rYX);
        },

        // Returns the coordinates of the world space point "point" in view
        // space.
        worldToView: function (point) {
            var tmp = util.subtractVectors3D(point,
                                                            this._pos);

            // Rotation matrices are applied to the vector tmp, from the left
            // side:
            tmp = sylvester.Vector.create(tmp);
            tmp = this._rZYX.multiply(tmp);

            return tmp.elements;
        },

        // Scale of distances parallel to the screen at view space position
        // "zV", when projected to the screen.
        scale: function (zV) {
            return this._sensorResolution * this._fl / zV; // px / mm
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
        }
    }, topicMixin);

    object.init();

    return object;
});
