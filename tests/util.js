// Unit tests for utility functions.

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

/*jslint node: true, maxerr: 50, maxlen: 79, nomen: true */

'use strict';

var requirejs = require('requirejs');

requirejs.config({
    nodeRequire: require,
    baseUrl: 'scripts'
});

requirejs(['util'], function (util) {
    console.log('fixme2');
    exports.intersectionLinePlaneVXZ = function (test) {
        var line, pVXZ, tolerance = util.TOLERANCE_V;

        // line through origin, along y axis:
        line = [[0, 0, 0], [0, 1, 0]];
        pVXZ = util.intersectionLinePlaneVXZ(line);
        test.ok(Math.abs(pVXZ[0]) < tolerance &&
                Math.abs(pVXZ[1]) < tolerance);

        // some line:
        line = [[3, 0, 4], [7, -3, -5]];
        pVXZ = util.intersectionLinePlaneVXZ(line);
        test.ok(Math.abs(pVXZ[0] - 3) < tolerance &&
                Math.abs(pVXZ[1] - 4) < tolerance);

        // some line:
        line = [[26, 4, 44], [-42, -11, -18]];
        pVXZ = util.intersectionLinePlaneVXZ(line);
        test.ok(Math.abs(pVXZ[0] - 7.866667) < tolerance &&
                Math.abs(pVXZ[1] - 27.466667) < tolerance);

        // line parallel to x-z plane:
        line = [[26, -2, 44], [-42, -2, -18]];
        pVXZ = util.intersectionLinePlaneVXZ(line);
        test.ok(pVXZ === false);

        // undefined line (points identical):
        line = [[1, 2, 3], [1, 2, 3]];
        pVXZ = util.intersectionLinePlaneVXZ(line);
        test.ok(pVXZ === false);

        test.done();
    };

    exports.polarToCartesian = function (test) {
        var p; // cartesian point

        // right
        p = util.polarToCartesian([0, 5]);
        test.ok(util.pointsIdenticalS(p, [5, 0]));

        // left
        p = util.polarToCartesian([Math.PI, 5]);
        test.ok(util.pointsIdenticalS(p, [-5, 0]));

        // up
        p = util.polarToCartesian([Math.PI / 2, 5]);
        test.ok(util.pointsIdenticalS(p, [0, 5]));

        // down
        p = util.polarToCartesian([-Math.PI / 2, 5]);
        test.ok(util.pointsIdenticalS(p, [0, -5]));

        // some point
        p = util.polarToCartesian(
            [-113.199 * 2 * Math.PI / 360, 3]
        );
        test.ok(util.
                pointsIdenticalS(p, [-1.182, -2.757]));
        test.done();
    };

    exports.cartesianToPolar = function (test) {
        var pp, // polar point
            toleranceA = 0.001, // tolerance when comparing angles
            tolerance = util.TOLERANCE_S;

        // right
        pp = util.cartesianToPolar([5, 0]);
        test.ok(Math.abs(pp[0]) < toleranceA &&
                Math.abs(pp[1] - 5) < tolerance);

        // left
        pp = util.cartesianToPolar([-5, 0]);
        test.ok(Math.abs(pp[0] - Math.PI) < toleranceA &&
                Math.abs(pp[1] - 5) < tolerance);

        // up
        pp = util.cartesianToPolar([0, 5]);
        test.ok(Math.abs(pp[0] - Math.PI / 2) < toleranceA &&
                Math.abs(pp[1] - 5) < tolerance);

        // down
        pp = util.cartesianToPolar([0, -5]);
        test.ok(Math.abs(pp[0] + Math.PI / 2) < toleranceA &&
                Math.abs(pp[1] - 5) < tolerance);

        // some point
        pp = util.cartesianToPolar([-1.182, -2.757]);
        test.ok((Math.abs(pp[0] + 113.199 * 2 * Math.PI / 360) <
                 toleranceA) && Math.abs(pp[1] - 3) < tolerance);
        test.done();
    };

    exports.pointsIdenticalS = function (test) {
        var point1, point2, identical;

        // No difference at all.
        point1 = [2, 1];
        point2 = [2, 1];
        identical = util.pointsIdenticalS(point1, point2);
        test.ok(identical);
        test.done();
    };

    exports.withDuplicatesRemoved = function (test) {
        var newPoints, points;

        // Some duplicate, also adjacent ones.
        points = [[2, 1.5], [3, -20], [2, 1.5], [2, 1.5], [4, 89]];
        newPoints = util.withDuplicatesRemoved(points);
        test.ok(newPoints[0] === points[1] &&
                newPoints[1] === points[3] &&
                newPoints[2] === points[4] &&
                newPoints.length === 3);

        // All the same.
        points = [[2, 1.5], [2, 1.5], [2, 1.5], [2, 1.5], [2, 1.5]];
        newPoints = util.withDuplicatesRemoved(points);
        test.ok(newPoints[0] === points[4] &&
                newPoints.length === 1);

        // Only one entry.
        points = [[2, 1.5]];
        newPoints = util.withDuplicatesRemoved(points);
        test.ok(newPoints[0] === points[0] &&
                newPoints.length === 1);

        // Coordinates of identical points differ by a small value.
        points = [[2, 1.500001], [3, -20], [2.00001, 1.5], [2, 1.5], [4, 89]];
        newPoints = util.withDuplicatesRemoved(points);
        test.ok(newPoints[0] === points[1] &&
                newPoints[1] === points[3] &&
                newPoints[2] === points[4] &&
                newPoints.length === 3);
        test.done();
    };

    exports.pointIsBetween2D = function (test) {
        var between;

        // Point on origin between, horizontally and vertically.
        between = util.pointIsBetween2D([0, 0], [-1, -1], [1, 1]);
        test.ok(between);

        // Point on origin between, horizontally, but not vertically.
        between = util.pointIsBetween2D([0, 0], [-1, 2], [1, 1]);
        test.ok(!between);

        // Point on origin between, vertically, but not horizontally.
        between = util.pointIsBetween2D([0, 0], [3, -1], [1, 1]);
        test.ok(!between);

        // Point on origin not between, neither vertically nor horizontally.
        between = util.pointIsBetween2D([0, 0], [3, -1], [1, -8]);
        test.ok(!between);

        // Point between.
        between = util.pointIsBetween2D([8.17, -4.34], [-4.3, 20.18],
                                        [8.7, -4.35]);
        test.ok(between);

        // Point not between.
        between = util.pointIsBetween2D([8.17, -4.34], [-4.3, 20.18],
                                        [8.7, -4.33]);
        test.ok(!between);

        // Point not between.
        between = util.pointIsBetween2D([8.17, -4.34], [-4.3, 20.18],
                                        [8.16, -4.35]);
        test.ok(!between);
        test.done();
    };

    exports.intersectionSegmentLineVXZ = function (test) {
        var segmentVXZ, lineVXZ, pVXZ,
            tolerance = util.TOLERANCE_VXZ;

        // Intersection in the origin:
        segmentVXZ = [[-1, 0], [1, 0]];
        lineVXZ = [[0, -1], [0, 1]];
        pVXZ = util.intersectionSegmentLineVXZ(segmentVXZ, lineVXZ);
        test.ok(Math.abs(pVXZ[0]) < tolerance &&
                Math.abs(pVXZ[1]) < tolerance);

        // Parallel horizontal line and line segment:
        segmentVXZ = [[-1.5, 2], [3, 2]];
        lineVXZ = [[-23, 1], [-4, 1]];
        pVXZ = util.intersectionSegmentLineVXZ(segmentVXZ, lineVXZ);
        test.ok(!pVXZ);

        // Coinciding horizontal line and line segment:
        segmentVXZ = [[-1.5, 2], [3, 2]];
        lineVXZ = [[-23, 2], [-4, 2]];
        pVXZ = util.intersectionSegmentLineVXZ(segmentVXZ, lineVXZ);
        test.ok(!pVXZ);

        // Parallel sloped line and line segment:
        segmentVXZ = [[-21, 2], [3.749, 5.536]];
        lineVXZ = [[-9, 2], [5, 4]];
        pVXZ = util.intersectionSegmentLineVXZ(segmentVXZ, lineVXZ);
        test.ok(!pVXZ);

        // Coinciding sloped line and line segment:
        segmentVXZ = [[-21, 2], [3.749, 5.536]];
        lineVXZ = [[-17.608, 2.485], [-3.608, 4.485]];
        pVXZ = util.intersectionSegmentLineVXZ(segmentVXZ, lineVXZ);
        test.ok(!pVXZ);

        // Intersection:
        segmentVXZ = [[-14, 7], [-7, 2]];
        lineVXZ = [[-15, -2], [-2, 9]];
        pVXZ = util.intersectionSegmentLineVXZ(segmentVXZ, lineVXZ);
        test.ok(Math.abs(pVXZ[0] - (-8.774648)) < tolerance &&
                Math.abs(pVXZ[1] - 3.267606) < tolerance);

        // Line outside of line segment:
        segmentVXZ = [[-16, 9], [-9, 4]];
        lineVXZ = [[-15, -2], [-2, 9]];
        pVXZ = util.intersectionSegmentLineVXZ(segmentVXZ, lineVXZ);
        test.ok(!pVXZ);

        // Intersection:
        segmentVXZ = [[-5, 13], [2, 8]];
        lineVXZ = [[-15, -2], [-2, 9]];
        pVXZ = util.intersectionSegmentLineVXZ(segmentVXZ, lineVXZ);
        test.ok(Math.abs(pVXZ[0] - (-0.809859)) < tolerance &&
                Math.abs(pVXZ[1] - 10.007042) < tolerance);

        // Line touches boundary point of line segment:
        segmentVXZ = [[126.38776006477147, 242.92831768175415],
                      [178.41121635226813, 209.85042494320865]];
        lineVXZ = [[187.41372593502646, 271.6707784935929],
                   [183.06026937785535, 241.77553416683304]];
        pVXZ = util.intersectionSegmentLineVXZ(segmentVXZ, lineVXZ);
        test.ok(pVXZ);

        // Line misses boundary point of line segment:
        segmentVXZ = [[178.41121635226813, 209.85042494320865],
                      [228.08196920763885, 234.5755718462958]];
        lineVXZ = [[187.41372593502646, 271.6707784935929],
                   [183.06026937785535, 241.77553416683304]];
        pVXZ = util.intersectionSegmentLineVXZ(segmentVXZ,
                                               lineVXZ);
        test.ok(Math.abs(pVXZ[0] - 178.41121635226816) < tolerance &&
                Math.abs(pVXZ[1] - 209.85042494320865) < tolerance);
        test.done();
    };

    exports.relationPointSegmentVXZ = function (test) {
        var segmentVXZ, pVXZ, rel,
            tolerance = util.TOLERANCE_VXZ;

        segmentVXZ = [[-16, 4], [-12, 8]];

        // Point in front of line segment:
        pVXZ = [-12, 4];
        rel = util.relationPointSegmentVXZ(pVXZ, segmentVXZ);
        test.ok(rel === -1);

        // Point behind line segment:
        pVXZ = [-21, 9];
        rel = util.relationPointSegmentVXZ(pVXZ, segmentVXZ);
        test.ok(rel === 1);

        // Point on line segment:
        pVXZ = [-13, 7];
        rel = util.relationPointSegmentVXZ(pVXZ, segmentVXZ);
        test.ok(rel === 0);

        // Point and line segment don't overlap in screen space:
        pVXZ = [-21, 2];
        rel = util.relationPointSegmentVXZ(pVXZ, segmentVXZ);
        test.ok(rel === 0);

        // Point on line segment:
        segmentVXZ = [[1.823239, 3.208525], [7.178144, 7.020492]];
        pVXZ = [6.275621, 6.378017];
        rel = util.relationPointSegmentVXZ(pVXZ, segmentVXZ);
        test.ok(rel === 0);

        // Line segment in direction of camera (i.e. being mapped to a point in
        // screen space) with point in front:
        segmentVXZ = [[-10.520543, 4.508804], [-15.975598, 6.846685]];
        pVXZ = [-7.354858, 3.152082];
        rel = util.relationPointSegmentVXZ(pVXZ, segmentVXZ);
        test.ok(rel === 0);

        // Line segment in direction of camera with point behind:
        pVXZ = [-21.000000, 9.000000];
        rel = util.relationPointSegmentVXZ(pVXZ, segmentVXZ);
        test.ok(rel === 0);

        // Line segment in direction of camera with point on line segment:
        pVXZ = [-11.841860, 5.075083];
        rel = util.relationPointSegmentVXZ(pVXZ, segmentVXZ);
        test.ok(rel === 0);

        // Line segment in direction of camera with point that doesn't overlap
        // in screen space:
        pVXZ = [-10.974078, 8.291147];
        rel = util.relationPointSegmentVXZ(pVXZ, segmentVXZ);
        test.ok(rel === 0);
        test.done();
    };
});
