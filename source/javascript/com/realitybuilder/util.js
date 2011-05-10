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

// Block dimensions in world space. The side length of a block is approximately
// two times the grid spacing in the respective direction.
com.realitybuilder.util.BLOCK_POSITION_SPACING_XY = 8; // mm
com.realitybuilder.util.BLOCK_POSITION_SPACING_Z = 9.6; // mm

// Outline of the block in the xy plane, with coordinates in block space,
// counterclockwise:
com.realitybuilder.util.BLOCK_OUTLINE_B = [[0, 0], [2, 0], [2, 2], [0, 2]];

// Two blocks are defined to collide, iff one block is offset against the
// other in the x-y-plane by:
com.realitybuilder.util.COLLISION_OFFSETS = [[0, 0], 
                                             [-1, 0], 
                                             [-1, 1], [0, 1], [1, 1],
                                             [1, 0],
                                             [1, -1], [0, -1], [-1, -1]];

// Returns the coordinates of the block space point "pointB" in world space.
com.realitybuilder.util.blockToWorld = function (pointB) {
    var factorX = com.realitybuilder.util.BLOCK_POSITION_SPACING_XY,
        factorY = com.realitybuilder.util.BLOCK_POSITION_SPACING_XY,
        factorZ = com.realitybuilder.util.BLOCK_POSITION_SPACING_Z;
    return [pointB[0] * factorX, pointB[1] * factorY, pointB[2] * factorZ];
};

// Returns true, iff the point "point" lies somewhere between the points
// "point1" and "point2", horizontally and vertically. If points coincide, the
// result is undefined.
com.realitybuilder.util.pointIsBetween = function (point, point1, point2) {
    var horizontally =
        (point[0] >= point1[0] && point[0] <= point2[0]) ||
        (point[0] <= point1[0] && point[0] >= point2[0]),
        vertically =
        (point[1] >= point1[1] && point[1] <= point2[1]) ||
        (point[1] <= point1[1] && point[1] >= point2[1]);
    return horizontally && vertically;
};

// Returns true, iff the points "point1" and "point2" are in the same position
// in sensor space.
com.realitybuilder.util.pointsIdenticalS = function (point1, point2) {
    return (
        Math.abs(point1[0] - point2[0]) < 
            com.realitybuilder.util.TOLERANCE_S &&
        Math.abs(point1[1] - point2[1]) < com.realitybuilder.util.TOLERANCE_S);
};

// Returns true, iff the points "point1B" and "point2B" are in the same
// position in block space.
com.realitybuilder.util.pointsIdenticalB = function (point1B, point2B) {
    return (
        (point1B[0] - point2B[0]) === 0 &&
        (point1B[1] - point2B[1]) === 0 &&
        (point1B[2] - point2B[2]) === 0);
};

// Subtracts the vectors "vector2" from the vector "vector1" in world space and
// returns the result.
com.realitybuilder.util.subtractVectors = function (vector1, vector2) {
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

// Removes duplicate points from the list of points "points". Returns the
// resulting list. Removes points from the front. Does not change the order.
com.realitybuilder.util.withDuplicatesRemoved = function (points) {
    var newPoints = [], i, j, point1, point2, duplicate;
    for (i = 0; i < points.length; i += 1) {
        point1 = points[i];
        duplicate = false;
        for (j = i + 1; j < points.length; j += 1) {
            point2 = points[j];
            if (com.realitybuilder.util.pointsIdenticalS(point1, point2)) {
                duplicate = true;
                break;
            }
        }
        if (!duplicate) {
            newPoints.push(point1);
        }
    }
    return newPoints;
};

// If there is an intersection between the line "line" (infinite extension) and
// the line segment "segment", returns the intersection point. If the line and
// the segment coincide, returns the first point of the segment. Otherwise
// returns false.
// 
// If the line touches a vertex of a segment, then this is also regarded as
// intersection.
com.realitybuilder.util.intersectionSegmentLine = function (segment, line) {
    // As of 2010-Apr, an explanation can be found e.g. at:
    // http://local.wasp.uwa.edu.au/~pbourke/geometry/lineline2d/

    var x1 = segment[0][0], y1 = segment[0][1],
        x2 = segment[1][0], y2 = segment[1][1],
        x3 = line[0][0], y3 = line[0][1],
        x4 = line[1][0], y4 = line[1][1],
        u1 = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3),
        u2 = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1),
        epsilon = 0.01,
        u, x, y;

    if (Math.abs(u2) < epsilon) {
        if (Math.abs(u1) < epsilon) {
            // The lines coincide.
            return [x1, y1];
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
            y = y1 + u * (y2 - y1);
            return [x, y];
        } else {
            return false;
        }
    }
};

// Returns the polar coordinates of the sensor space point "pointS".
com.realitybuilder.util.cartesianToPolar = function (pointS) {
    var x = pointS[0], y = pointS[1],
        angle = Math.atan2(y, x),
        distance = Math.sqrt(x * x + y * y);
    return [angle, distance];
};

// Returns a new point, whose coordinates are the sum of the coordinates of the
// points "point1S" and "point2S" in sensor space.
com.realitybuilder.util.addS = function (point1S, point2S) {
    return [point1S[0] + point2S[0], point1S[1] + point2S[1]];
};

// Returns the cartesian coordinates of the sensor space point "polarPointS"
// which is in polar coordinates.
com.realitybuilder.util.polarToCartesian = function (polarPointS) {
    var angle = polarPointS[0], distance = polarPointS[1],
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
