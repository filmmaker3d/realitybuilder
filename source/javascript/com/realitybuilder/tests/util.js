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

// Unit tests for utility functions.

dojo.provide("tests.util");

dojo.registerModulePath("com", "../../com");
dojo.require("com.realitybuilder.util");

doh.register("tests.util.all", [
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
        var pp; // polar point

        var toleranceA = 0.001; // tolerance when comparing angles

        // right
        pp = com.realitybuilder.util.cartesianToPolar([5, 0]);
        doh.assertTrue(
            Math.abs(pp[0] - 0) < toleranceA && 
            Math.abs(pp[1] - 5) < com.realitybuilder.util.TOLERANCE_S);

        // left
        pp = com.realitybuilder.util.cartesianToPolar([-5, 0]);
        doh.assertTrue(
            Math.abs(pp[0] - Math.PI) < toleranceA && 
            Math.abs(pp[1] - 5) < com.realitybuilder.util.TOLERANCE_S);

        // up
        pp = com.realitybuilder.util.cartesianToPolar([0, 5]);
        doh.assertTrue(
            Math.abs(pp[0] - Math.PI / 2) < 
                toleranceA && 
            Math.abs(pp[1] - 5) < com.realitybuilder.util.TOLERANCE_S);

        // down
        pp = com.realitybuilder.util.cartesianToPolar([0, -5]);
        doh.assertTrue(
            Math.abs(pp[0] + Math.PI / 2) < 
                toleranceA && 
            Math.abs(pp[1] - 5) < com.realitybuilder.util.TOLERANCE_S);

        // some point
        pp = com.realitybuilder.util.cartesianToPolar([-1.182, -2.757]);
        doh.assertTrue(
            Math.abs(pp[0] + 113.199 * 2 * Math.PI / 360) < 
                toleranceA && 
            Math.abs(pp[1] - 3) < com.realitybuilder.util.TOLERANCE_S);
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
            newPoints[0] == points[1] && newPoints[1] == points[3] && 
            newPoints[2] == points[4] && newPoints.length == 3);

        // All the same.
        points = [[2, 1.5], [2, 1.5], [2, 1.5], [2, 1.5], [2, 1.5]];
        newPoints = com.realitybuilder.util.withDuplicatesRemoved(points);
        doh.assertTrue(
            newPoints[0] == points[4] && newPoints.length == 1);

        // Only one entry.
        points = [[2, 1.5]];
        newPoints = com.realitybuilder.util.withDuplicatesRemoved(points);
        doh.assertTrue(
            newPoints[0] == points[0] && newPoints.length == 1);

        // Coordinates of identical points differ by a small value.
        points = [[2, 1.500001], [3, -20], [2.00001, 1.5], [2, 1.5], [4, 89]];
        newPoints = com.realitybuilder.util.withDuplicatesRemoved(points);
        doh.assertTrue(
            newPoints[0] == points[1] && newPoints[1] == points[3] && 
            newPoints[2] == points[4] && newPoints.length == 3);
    },
    function pointIsBetweenLineTest() {
        var between;

        // Point on origin between, horizontally and vertically.
        between = com.realitybuilder.util.
            pointIsBetween([0, 0], [-1, -1], [1, 1]);
        doh.assertTrue(between);

        // Point on origin between, horizontally, but not vertically.
        between = com.realitybuilder.util.
            pointIsBetween([0, 0], [-1, 2], [1, 1]);
        doh.assertTrue(!between);

        // Point on origin between, vertically, but not horizontally.
        between = com.realitybuilder.util.
            pointIsBetween([0, 0], [3, -1], [1, 1]);
        doh.assertTrue(!between);

        // Point on origin not between, neither vertically nor horizontally.
        between = com.realitybuilder.util.
            pointIsBetween([0, 0], [3, -1], [1, -8]);
        doh.assertTrue(!between);

        // Point between.
        between = com.realitybuilder.util.
            pointIsBetween([8.17, -4.34], [-4.3, 20.18], [8.7, -4.35]);
        doh.assertTrue(between);

        // Point not between.
        between = com.realitybuilder.util.
            pointIsBetween([8.17, -4.34], [-4.3, 20.18], [8.7, -4.33]);
        doh.assertTrue(!between);

        // Point not between.
        between = com.realitybuilder.util.
            pointIsBetween([8.17, -4.34], [-4.3, 20.18], [8.16, -4.35]);
        doh.assertTrue(!between);
    },
    function intersectionSegmentLineTest() {
        var segment, line, p;

        // Intersection in the origin:
        segment = [[-1, 0], [1, 0]];
        line = [[0, -1], [0, 1]];
        p = com.realitybuilder.util.intersectionSegmentLine(segment, line);
        doh.assertTrue(Math.abs(p[0]) < com.realitybuilder.util.TOLERANCE_S && 
            Math.abs(p[1]) < com.realitybuilder.util.TOLERANCE_S);

        // Parallel horizontal line and segment:
        segment = [[-1.5, 2], [3, 2]];
        line = [[-23, 1], [-4, 1]];
        p = com.realitybuilder.util.intersectionSegmentLine(segment, line);
        doh.assertTrue(!p);

        // Coinciding horizontal line and segment:
        segment = [[-1.5, 2], [3, 2]];
        line = [[-23, 2], [-4, 2]];
        p = com.realitybuilder.util.intersectionSegmentLine(segment, line);
        doh.assertTrue(
            Math.abs(p[0] - (-1.5)) < com.realitybuilder.util.TOLERANCE_S && 
            Math.abs(p[1] - 2) < com.realitybuilder.util.TOLERANCE_S);

        // Parallel sloped line and segment:
        segment = [[-21, 2], [3.749, 5.536]];
        line = [[-9, 2], [5, 4]];
        p = com.realitybuilder.util.intersectionSegmentLine(segment, line);
        doh.assertTrue(!p);

        // Coinciding sloped line and segment:
        segment = [[-21, 2], [3.749, 5.536]];
        line = [[-17.608, 2.485], [-3.608, 4.485]];
        p = com.realitybuilder.util.intersectionSegmentLine(segment, line);
        doh.assertTrue(
            Math.abs(p[0] - (-21)) < com.realitybuilder.util.TOLERANCE_S && 
            Math.abs(p[1] - 2) < com.realitybuilder.util.TOLERANCE_S);

        // Intersection:
        segment = [[-14, 7], [-7, 2]];
        line = [[-15, -2], [-2, 9]];
        p = com.realitybuilder.util.intersectionSegmentLine(segment, line);
        doh.assertTrue(
            Math.abs(p[0] - (-8.775)) < com.realitybuilder.util.TOLERANCE_S && 
            Math.abs(p[1] - 3.268) < com.realitybuilder.util.TOLERANCE_S);

        // Line outside of segment:
        segment = [[-16, 9], [-9, 4]];
        line = [[-15, -2], [-2, 9]];
        p = com.realitybuilder.util.intersectionSegmentLine(segment, line);
        doh.assertTrue(!p);

        // Intersection:
        segment = [[-5, 13], [2, 8]];
        line = [[-15, -2], [-2, 9]];
        p = com.realitybuilder.util.intersectionSegmentLine(segment, line);
        doh.assertTrue(
            Math.abs(p[0] - (-0.810)) < com.realitybuilder.util.TOLERANCE_S && 
            Math.abs(p[1] - 10.007) < com.realitybuilder.util.TOLERANCE_S);

        // Line touches vertex of segment:
        segment = [[126.38776006477147, 242.92831768175415],
            [178.41121635226813, 209.85042494320865]];
        line = [[187.41372593502646, 271.6707784935929], 
            [183.06026937785535, 241.77553416683304]];
        p = com.realitybuilder.util.intersectionSegmentLine(segment, line);
        doh.assertTrue(p);

        // Line misses vertex of segment:
        segment = [[178.41121635226813, 209.85042494320865],
            [228.08196920763885, 234.5755718462958]];
        line = [[187.41372593502646, 271.6707784935929], 
            [183.06026937785535, 241.77553416683304]];
        p = com.realitybuilder.util.intersectionSegmentLine(segment, line);
        doh.assertTrue(
            Math.abs(p[0] - 178.41121635226816) < 
            com.realitybuilder.util.TOLERANCE_S && 
            Math.abs(p[1] - 209.85042494320865) < 
            com.realitybuilder.util.TOLERANCE_S);
    }
]);
