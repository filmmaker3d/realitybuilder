// Unit tests for utility functions.

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

/*global com, dojo, dojox, G_vmlCanvasManager, logoutUrl, doh */

dojo.provide("tests.util");

dojo.registerModulePath("com", "../../com");
dojo.require("com.realitybuilder.util");

doh.register("tests.util.all", [
    function intersectionLineVXZTest() {
        var line, pVXZ, tolerance = com.realitybuilder.util.TOLERANCE_V;

        // line through origin, along y axis:
        line = [[0, 0, 0], [0, 1, 0]];
        pVXZ = com.realitybuilder.util.intersectionLineVXZ(line);
        doh.assertTrue(Math.abs(pVXZ[0]) < tolerance && 
                       Math.abs(pVXZ[1]) < tolerance);

        // some line:
        line = [[3, 0, 4], [7, -3, -5]];
        pVXZ = com.realitybuilder.util.intersectionLineVXZ(line);
        doh.assertTrue(Math.abs(pVXZ[0] - 3) < tolerance && 
                       Math.abs(pVXZ[1] - 4) < tolerance);

        // some line:
        line = [[26, 4, 44], [-42, -11, -18]];
        pVXZ = com.realitybuilder.util.intersectionLineVXZ(line);
        doh.assertTrue(Math.abs(pVXZ[0] - 7.866667) < tolerance && 
                       Math.abs(pVXZ[1] - 27.466667) < tolerance);

        // line parallel to x-z plane:
        line = [[26, -2, 44], [-42, -2, -18]];
        pVXZ = com.realitybuilder.util.intersectionLineVXZ(line);
        doh.assertTrue(pVXZ === false);

        // undefined line (points identical):
        line = [[1, 2, 3], [1, 2, 3]];
        pVXZ = com.realitybuilder.util.intersectionLineVXZ(line);
        doh.assertTrue(pVXZ === false);
    },
    function polarToCartesianTest() {
        var p; // cartesian point

        // right
        p = com.realitybuilder.util.polarToCartesian([0, 5]);
        doh.assertTrue(com.realitybuilder.util.pointsIdenticalS(p, [5, 0]));

        // left
        p = com.realitybuilder.util.polarToCartesian([Math.PI, 5]);
        doh.assertTrue(com.realitybuilder.util.pointsIdenticalS(p, [-5, 0]));

        // up
        p = com.realitybuilder.util.polarToCartesian([Math.PI / 2, 5]);
        doh.assertTrue(com.realitybuilder.util.pointsIdenticalS(p, [0, 5]));

        // down
        p = com.realitybuilder.util.polarToCartesian([-Math.PI / 2, 5]);
        doh.assertTrue(com.realitybuilder.util.pointsIdenticalS(p, [0, -5]));

        // some point
        p = com.realitybuilder.util.polarToCartesian(
            [-113.199 * 2 * Math.PI / 360, 3]);
        doh.assertTrue(com.realitybuilder.util.
            pointsIdenticalS(p, [-1.182, -2.757]));
    },
    function cartesianToPolarTest() {
        var
        pp, // polar point
        toleranceA = 0.001, // tolerance when comparing angles
        tolerance = com.realitybuilder.util.TOLERANCE_S;

        // right
        pp = com.realitybuilder.util.cartesianToPolar([5, 0]);
        doh.assertTrue(
            Math.abs(pp[0] - 0) < toleranceA && 
            Math.abs(pp[1] - 5) < tolerance);

        // left
        pp = com.realitybuilder.util.cartesianToPolar([-5, 0]);
        doh.assertTrue(
            Math.abs(pp[0] - Math.PI) < toleranceA && 
            Math.abs(pp[1] - 5) < tolerance);

        // up
        pp = com.realitybuilder.util.cartesianToPolar([0, 5]);
        doh.assertTrue(
            Math.abs(pp[0] - Math.PI / 2) < 
                toleranceA && 
            Math.abs(pp[1] - 5) < tolerance);

        // down
        pp = com.realitybuilder.util.cartesianToPolar([0, -5]);
        doh.assertTrue(
            Math.abs(pp[0] + Math.PI / 2) < 
                toleranceA && 
            Math.abs(pp[1] - 5) < tolerance);

        // some point
        pp = com.realitybuilder.util.cartesianToPolar([-1.182, -2.757]);
        doh.assertTrue(
            Math.abs(pp[0] + 113.199 * 2 * Math.PI / 360) < 
                toleranceA && 
            Math.abs(pp[1] - 3) < tolerance);
    },
    function pointsIdenticalSTest() {
        var point1, point2, identical;

        // No difference at all.
        point1 = [2, 1];
        point2 = [2, 1];
        identical = com.realitybuilder.util.pointsIdenticalS(point1, point2);
        doh.assertTrue(identical);
    },
    function withDuplicatesRemovedTest() {
        var newPoints, points;

        // Some duplicate, also adjacent ones.
        points = [[2, 1.5], [3, -20], [2, 1.5], [2, 1.5], [4, 89]];
        newPoints = com.realitybuilder.util.withDuplicatesRemoved(points);
        doh.assertTrue(
            newPoints[0] === points[1] && newPoints[1] === points[3] && 
            newPoints[2] === points[4] && newPoints.length === 3);

        // All the same.
        points = [[2, 1.5], [2, 1.5], [2, 1.5], [2, 1.5], [2, 1.5]];
        newPoints = com.realitybuilder.util.withDuplicatesRemoved(points);
        doh.assertTrue(
            newPoints[0] === points[4] && newPoints.length === 1);

        // Only one entry.
        points = [[2, 1.5]];
        newPoints = com.realitybuilder.util.withDuplicatesRemoved(points);
        doh.assertTrue(
            newPoints[0] === points[0] && newPoints.length === 1);

        // Coordinates of identical points differ by a small value.
        points = [[2, 1.500001], [3, -20], [2.00001, 1.5], [2, 1.5], [4, 89]];
        newPoints = com.realitybuilder.util.withDuplicatesRemoved(points);
        doh.assertTrue(
            newPoints[0] === points[1] && newPoints[1] === points[3] && 
            newPoints[2] === points[4] && newPoints.length === 3);
    },
    function pointIsBetween2DTest() {
        var between;

        // Point on origin between, horizontally and vertically.
        between = com.realitybuilder.util.
            pointIsBetween2D([0, 0], [-1, -1], [1, 1]);
        doh.assertTrue(between);

        // Point on origin between, horizontally, but not vertically.
        between = com.realitybuilder.util.
            pointIsBetween2D([0, 0], [-1, 2], [1, 1]);
        doh.assertTrue(!between);

        // Point on origin between, vertically, but not horizontally.
        between = com.realitybuilder.util.
            pointIsBetween2D([0, 0], [3, -1], [1, 1]);
        doh.assertTrue(!between);

        // Point on origin not between, neither vertically nor horizontally.
        between = com.realitybuilder.util.
            pointIsBetween2D([0, 0], [3, -1], [1, -8]);
        doh.assertTrue(!between);

        // Point between.
        between = com.realitybuilder.util.
            pointIsBetween2D([8.17, -4.34], [-4.3, 20.18], [8.7, -4.35]);
        doh.assertTrue(between);

        // Point not between.
        between = com.realitybuilder.util.
            pointIsBetween2D([8.17, -4.34], [-4.3, 20.18], [8.7, -4.33]);
        doh.assertTrue(!between);

        // Point not between.
        between = com.realitybuilder.util.
            pointIsBetween2D([8.17, -4.34], [-4.3, 20.18], [8.16, -4.35]);
        doh.assertTrue(!between);
    },
    function intersectionSegmentLineVXZTest() {
        var segmentVXZ, lineVXZ, pVXZ, 
        tolerance = com.realitybuilder.util.TOLERANCE_VXZ;

        // Intersection in the origin:
        segmentVXZ = [[-1, 0], [1, 0]];
        lineVXZ = [[0, -1], [0, 1]];
        pVXZ = com.realitybuilder.util.intersectionSegmentLineVXZ(segmentVXZ, 
                                                                  lineVXZ);
        doh.assertTrue(Math.abs(pVXZ[0]) < tolerance && 
                       Math.abs(pVXZ[1]) < tolerance);

        // Parallel horizontal line and segment:
        segmentVXZ = [[-1.5, 2], [3, 2]];
        lineVXZ = [[-23, 1], [-4, 1]];
        pVXZ = com.realitybuilder.util.intersectionSegmentLineVXZ(segmentVXZ, 
                                                                  lineVXZ);
        doh.assertTrue(!pVXZ);

        // Coinciding horizontal line and segment:
        segmentVXZ = [[-1.5, 2], [3, 2]];
        lineVXZ = [[-23, 2], [-4, 2]];
        pVXZ = com.realitybuilder.util.intersectionSegmentLineVXZ(segmentVXZ, 
                                                                  lineVXZ);
        doh.assertTrue(
            Math.abs(pVXZ[0] - (-1.5)) < tolerance && 
            Math.abs(pVXZ[1] - 2) < tolerance);

        // Parallel sloped line and segment:
        segmentVXZ = [[-21, 2], [3.749, 5.536]];
        lineVXZ = [[-9, 2], [5, 4]];
        pVXZ = com.realitybuilder.util.intersectionSegmentLineVXZ(segmentVXZ, 
                                                                  lineVXZ);
        doh.assertTrue(!pVXZ);

        // Coinciding sloped line and segment:
        segmentVXZ = [[-21, 2], [3.749, 5.536]];
        lineVXZ = [[-17.608, 2.485], [-3.608, 4.485]];
        pVXZ = com.realitybuilder.util.intersectionSegmentLineVXZ(segmentVXZ, 
                                                                  lineVXZ);
        doh.assertTrue(
            Math.abs(pVXZ[0] - (-21)) < tolerance && 
            Math.abs(pVXZ[1] - 2) < tolerance);

        // Intersection:
        segmentVXZ = [[-14, 7], [-7, 2]];
        lineVXZ = [[-15, -2], [-2, 9]];
        pVXZ = com.realitybuilder.util.intersectionSegmentLineVXZ(segmentVXZ, 
                                                                  lineVXZ);
        doh.assertTrue(Math.abs(pVXZ[0] - (-8.774648)) < tolerance && 
                       Math.abs(pVXZ[1] - 3.267606) < tolerance);

        // Line outside of segment:
        segmentVXZ = [[-16, 9], [-9, 4]];
        lineVXZ = [[-15, -2], [-2, 9]];
        pVXZ = com.realitybuilder.util.intersectionSegmentLineVXZ(segmentVXZ, 
                                                                  lineVXZ);
        doh.assertTrue(!pVXZ);

        // Intersection:
        segmentVXZ = [[-5, 13], [2, 8]];
        lineVXZ = [[-15, -2], [-2, 9]];
        pVXZ = com.realitybuilder.util.intersectionSegmentLineVXZ(segmentVXZ, 
                                                                  lineVXZ);
        doh.assertTrue(
            Math.abs(pVXZ[0] - (-0.809859)) < tolerance && 
            Math.abs(pVXZ[1] - 10.007042) < tolerance);

        // Line touches vertex of segment:
        segmentVXZ = [[126.38776006477147, 242.92831768175415],
            [178.41121635226813, 209.85042494320865]];
        lineVXZ = [[187.41372593502646, 271.6707784935929], 
            [183.06026937785535, 241.77553416683304]];
        pVXZ = com.realitybuilder.util.intersectionSegmentLineVXZ(segmentVXZ, 
                                                                  lineVXZ);
        doh.assertTrue(pVXZ);

        // Line misses vertex of segment:
        segmentVXZ = [[178.41121635226813, 209.85042494320865],
                   [228.08196920763885, 234.5755718462958]];
        lineVXZ = [[187.41372593502646, 271.6707784935929], 
                [183.06026937785535, 241.77553416683304]];
        pVXZ = com.realitybuilder.util.intersectionSegmentLineVXZ(segmentVXZ, 
                                                                  lineVXZ);
        doh.assertTrue(
            Math.abs(pVXZ[0] - 178.41121635226816) < 
            tolerance && 
            Math.abs(pVXZ[1] - 209.85042494320865) < 
            tolerance);
    },
    function relationPointSegmentVXZTest() {
        var segmentVXZ, pVXZ, rel,
        tolerance = com.realitybuilder.util.TOLERANCE_VXZ;

        segmentVXZ = [[-16, 4], [-12, 8]];

        // Point in front of segment:
        pVXZ = [-12, 4];
        rel = com.realitybuilder.util.relationPointSegmentVXZ(pVXZ,
                                                              segmentVXZ);
        doh.assertTrue(rel === -1);

        // Point behind segment:
        pVXZ = [-21, 9];
        rel = com.realitybuilder.util.relationPointSegmentVXZ(pVXZ,
                                                              segmentVXZ);
        doh.assertTrue(rel === 1);

        // Point on segment:
        pVXZ = [-13, 7];
        rel = com.realitybuilder.util.relationPointSegmentVXZ(pVXZ,
                                                              segmentVXZ);
        doh.assertTrue(rel === 0);

        // Point and segment don't overlap in screen space:
        pVXZ = [-21, 2];
        rel = com.realitybuilder.util.relationPointSegmentVXZ(pVXZ,
                                                              segmentVXZ);
        doh.assertTrue(rel === 0);
    }
]);
