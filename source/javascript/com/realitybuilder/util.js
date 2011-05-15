// Various utility functions.

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

dojo.provide('com.realitybuilder.util');

// Tolerance when comparing coordinates in sensor space.
com.realitybuilder.util.TOLERANCE_S = 0.5;

// Tolerance when comparing coordinates in view space.
com.realitybuilder.util.TOLERANCE_V = 0.00001;

// Tolerance when comparing coordinates in the view space x-z-plane.
com.realitybuilder.util.TOLERANCE_XZV = 0.00001;

// Returns the coordinates of the block space point "pB" in world space.
com.realitybuilder.util.blockToWorld = function (pB, blockProperties) {
    var 
    factorX = blockProperties.positionSpacingXY(),
    factorY = blockProperties.positionSpacingXY(),
    factorZ = blockProperties.positionSpacingZ();
    return [pB[0] * factorX, pB[1] * factorY, pB[2] * factorZ];
};

// In view space, tries to calculate the interesection point between the
// x-z-plane and the straight line "line", defined by a pair of points. If the
// y coordinates of the points defining the line are identical, then returns
// false. Otherwise returns the x-z-coordinates (2D) of the intersection point.
//
// The tolerance "tolerance" is used for comparison of coordinates.
com.realitybuilder.util.intersectionLineXZV = function (line) {
    var delta, factor, p1 = line[0], p2 = line[1];

    delta = com.realitybuilder.util.subtractVectors3D(p2, p1);
    if (Math.abs(delta[1]) < com.realitybuilder.util.TOLERANCE_V) {
        // line in parallel to plane or undefined => no intersection point
        return false;
    } else {
        factor = -p1[1] / delta[1];
        return [p1[0] + factor * delta[0], p1[2] + factor * delta[2]];
    }
};

// Returns true, iff the point "p" lies somewhere between the points "p1" and
// "p2", horizontally and vertically. If points coincide, the result is
// undefined.
com.realitybuilder.util.pointIsBetween = function (p, p1, p2) {
    var horizontally =
        (p[0] >= p1[0] && p[0] <= p2[0]) ||
        (p[0] <= p1[0] && p[0] >= p2[0]),
        vertically =
        (p[1] >= p1[1] && p[1] <= p2[1]) ||
        (p[1] <= p1[1] && p[1] >= p2[1]);
    return horizontally && vertically;
};

// Returns true, iff the points "p1" and "p2" are in the same position in
// sensor space.
com.realitybuilder.util.pointsIdenticalS = function (p1, p2) {
    return (
        Math.abs(p1[0] - p2[0]) < 
            com.realitybuilder.util.TOLERANCE_S &&
        Math.abs(p1[1] - p2[1]) < com.realitybuilder.util.TOLERANCE_S);
};

// Returns true, iff the points "p1B" and "p2B" are in the same position in
// block space.
com.realitybuilder.util.pointsIdenticalB = function (p1B, p2B) {
    return (
        (p1B[0] - p2B[0]) === 0 &&
        (p1B[1] - p2B[1]) === 0 &&
        (p1B[2] - p2B[2]) === 0);
};

// Subtracts the vectors "vector2" from the vector "vector1" in 3D and returns
// the result.
com.realitybuilder.util.subtractVectors3D = function (vector1, vector2) {
    return [
        vector1[0] - vector2[0], 
        vector1[1] - vector2[1],
        vector1[2] - vector2[2]];
};

// Adds the vectors "vector1B" and "vector2B" in blocks space and returns the
// result.
com.realitybuilder.util.addVectorsB = function (vector1B, vector2B) {
    return [
        vector1B[0] + vector2B[0], 
        vector1B[1] + vector2B[1],
        vector1B[2] + vector2B[2]];
};

// Subtracts the vectors "vector2B" from the vector "vector1B" in blocks space
// and returns the result.
com.realitybuilder.util.subtractVectorsB = function (vector1B, vector2B) {
    return [
        vector1B[0] - vector2B[0], 
        vector1B[1] - vector2B[1],
        vector1B[2] - vector2B[2]];
};

// Removes duplicate points from the list of points "ps". Returns the resulting
// list. Removes points from the front. Does not change the order.
com.realitybuilder.util.withDuplicatesRemoved = function (ps) {
    var newPs = [], i, j, p1, p2, duplicate;
    for (i = 0; i < ps.length; i += 1) {
        p1 = ps[i];
        duplicate = false;
        for (j = i + 1; j < ps.length; j += 1) {
            p2 = ps[j];
            if (com.realitybuilder.util.pointsIdenticalS(p1, p2)) {
                duplicate = true;
                break;
            }
        }
        if (!duplicate) {
            newPs.push(p1);
        }
    }
    return newPs;
};

// In the view space x-z-plane (2D):
//
// * If there is an intersection between the straight line "lineXZV" (infinite
//   extension) and the line segment "segmentXZV", returns the intersection
//   point. If the line and the line segment coincide, returns the first point
//   of the segment. Otherwise returns false.
// 
// * If the line touches a boundary point of a segment, then this is also
//   regarded as intersection.
com.realitybuilder.util.intersectionSegmentLineXZV = function (segmentXZV, 
                                                               lineXZV)
{
    // As of 2010-Apr, an explanation can be found e.g. at:
    // http://local.wasp.uwa.edu.au/~pbourke/geometry/lineline2d/

    var x1 = segmentXZV[0][0], z1 = segmentXZV[0][1],
        x2 = segmentXZV[1][0], z2 = segmentXZV[1][1],
        x3 = lineXZV[0][0], y3 = lineXZV[0][1],
        x4 = lineXZV[1][0], y4 = lineXZV[1][1],
        u1 = (x4 - x3) * (z1 - y3) - (y4 - y3) * (x1 - x3),
        u2 = (y4 - y3) * (x2 - x1) - (x4 - x3) * (z2 - z1),
        epsilon = 0.01,
        u, x, y;

    if (Math.abs(u2) < epsilon) {
        if (Math.abs(u1) < epsilon) {
            // The lines coincide.
            return [x1, z1];
        } else {
            // The lines are parallel.
            return false;
        }
    } else {
        u = u1 / u2;
        if (u > -epsilon && u < 1 + epsilon) {
            // u was between 0 and 1. => Intersection point is on segment.
            // Reason for using epsilons: For the hidden lines removal
            // algorithm it is important to not miss any intersections, for
            // example if the line intersects with the join of two segments. If
            // two intersection points are detected, they are later removed by
            // the function "withDuplicatesRemoved".
            x = x1 + u * (x2 - x1);
            y = z1 + u * (z2 - z1);
            return [x, y];
        } else {
            return false;
        }
    }
};

// Returns the polar coordinates of the sensor space point "pS".
com.realitybuilder.util.cartesianToPolar = function (pS) {
    var x = pS[0], y = pS[1],
        angle = Math.atan2(y, x),
        distance = Math.sqrt(x * x + y * y);
    return [angle, distance];
};

// Returns a new point, whose coordinates are the sum of the coordinates of the
// points "p1S" and "p2S" in sensor space.
com.realitybuilder.util.addS = function (p1S, p2S) {
    return [p1S[0] + p2S[0], p1S[1] + p2S[1]];
};

// Returns the cartesian coordinates of the sensor space point "polarPS", which
// is in polar coordinates.
com.realitybuilder.util.polarToCartesian = function (polarPS) {
    var angle = polarPS[0], distance = polarPS[1],
        x = distance * Math.cos(angle),
        y = distance * Math.sin(angle);
    return [x, y];
};

// Returns the object "object" with all keys converted to strings and being
// prefixed by "prefix".
com.realitybuilder.addPrefix = function (prefix, object) {
    var tmp = [], i;
    for (i in object) {
        if (object.hasOwnProperty(i)) {
            tmp[prefix.toString() + i.toString()] = object[i];
        }
    }
    return tmp;
};

// Returns true, iff Explorer Canvas has loaded. The detection code is inspired
// by a blog post: <http://www.stpe.se/2008/12/detect-if-excanvas-is-loaded/>.
com.realitybuilder.hasExplorerCanvasLoaded = function () {
    return (typeof G_vmlCanvasManager !== 'undefined');
};

// Returns true, iff the canvas functionality is somehow supported, either
// natively by the browser, or via some emulation.
com.realitybuilder.isCanvasSupported = function () {
    return (
        document.createElement('canvas').getContext ||  // Native support
        com.realitybuilder.hasExplorerCanvasLoaded());
};

com.realitybuilder.aboutMessage = function () {
    return '<p><a href="about">About the Reality Builder</a></p>';
};

com.realitybuilder.showNoCanvasErrorMessage = function () {
    dojo.attr('noCanvasErrorMessage', 'innerHTML', 
        '<p class="first">The Reality Builder does not work because your ' +
        'browser does not support the <a ' +
        'href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas ' +
        'element</a>.</p>' +
        com.realitybuilder.aboutMessage());
};

com.realitybuilder.showNoImagesErrorMessage = function () {
    dojo.attr('noImagesErrorMessage', 'innerHTML', 
        '<p class="first">The Reality Builder does not work because your ' +
        'browser does not load images.</p>' +
        com.realitybuilder.aboutMessage());
};

// Clears the canvas "canvas".
com.realitybuilder.util.clearCanvas = function (canvas) {
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
};

// Fills the canvas "canvas" with color "color".
com.realitybuilder.util.fillCanvas = function (canvas, color) {
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        context.fillStyle = color;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
};
