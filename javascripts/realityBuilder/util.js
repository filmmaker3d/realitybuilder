// Various utility functions.

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

/*global realityBuilder, dojo, dojox, FlashCanvas, swfobject */

dojo.provide('realityBuilder.util');

dojo.require('dojo.io.script');

// Tolerance when comparing coordinates in sensor space.
realityBuilder.util.TOLERANCE_S = 0.5;

// Tolerance when comparing coordinates in view space.
realityBuilder.util.TOLERANCE_V = 0.00001;

// Tolerance when comparing coordinates in the view space x-z-plane.
realityBuilder.util.TOLERANCE_VXZ = 0.00001;

// Settings, set once at the beginning.
realityBuilder.util.SETTINGS = null;

// Returns the coordinates of the block space point "pB" in world space.
realityBuilder.util.blockToWorld = function (pB, blockProperties) {
    var factorX = blockProperties.posSpacingXY(),
        factorY = blockProperties.posSpacingXY(),
        factorZ = blockProperties.posSpacingZ();
    return [pB[0] * factorX, pB[1] * factorY, pB[2] * factorZ];
};

// In view space, tries to calculate the interesection point between the
// x-z-plane and the straight line "line", defined by a pair of points. If the
// y coordinates of the points defining the line are identical, then returns
// false. Otherwise returns the x-z-coordinates (2D) of the intersection point.
//
// The tolerance "tolerance" is used for comparison of coordinates.
realityBuilder.util.intersectionLinePlaneVXZ = function (lineV) {
    var delta, p1 = lineV[0], p2 = lineV[1];

    delta = realityBuilder.util.subtractVectors3D(p2, p1);
    if (Math.abs(delta[1]) < realityBuilder.util.TOLERANCE_V) {
        // line in parallel to plane or undefined => no intersection point
        return false;
    } else {
        return [p1[0] - p1[1] * delta[0] / delta[1],
                p1[2] - p1[1] * delta[2] / delta[1]];
    }
};

// In the view space x-z-plane (2D):
//
// * If there is an intersection between the straight line "lineVXZ" (infinite
//   extension) and the line segment "segmentVXZ", returns the intersection
//   point. Otherwise returns false.
//
// * If the line segment lies on the straight line, they are defined to have no
//   intersection.
// 
// * If the line touches a boundary point of a segment, then this is also
//   regarded as intersection.
realityBuilder.util.intersectionSegmentLineVXZ = function (segmentVXZ,
                                                           lineVXZ) {
    // As of 2010-Apr, an explanation can be found e.g. at:
    // http://local.wasp.uwa.edu.au/~pbourke/geometry/lineline2d/

    var x1 = segmentVXZ[0][0], z1 = segmentVXZ[0][1],
        x2 = segmentVXZ[1][0], z2 = segmentVXZ[1][1],
        x3 = lineVXZ[0][0], y3 = lineVXZ[0][1],
        x4 = lineVXZ[1][0], y4 = lineVXZ[1][1],
        u1 = (x4 - x3) * (z1 - y3) - (y4 - y3) * (x1 - x3),
        u2 = (y4 - y3) * (x2 - x1) - (x4 - x3) * (z2 - z1),
        epsilon = 0.01, // not the same as for comparing position
        u, x, y;

    if (Math.abs(u2) < epsilon) {
        // The segment line lies on the straight line (|u1| < epsilon) or the
        // lines are parallel (|u1| >= epsilon).
        return false;
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

// Investigates the relation between the positions of the point "pointVXZ" and
// the line segment "segmentVXZ", in the view space x-z-plane, when viewed with
// the camera "camera".
//
// Return values:
//
// -1: point is visually in front of line segment
//
// 1: point is visually behind line segment
//
// 0: point neither in front nor behind line segment. This is the case under
//   the following conditions:
//
//   - The point and the line segment don't overlap in screen space.
//
//   - The point is on the line segment in the view space x-z-plane.
//
//   - In the view space x-z-plane, The line segment is on the straight line
//     going through the origin (camera) and the point.
//
// It is assumed that the point and the segment are in front of the camera,
// i.e. in front of the plane defined by the camera's sensor. If that's not the
// case, then the result is undefined.
realityBuilder.util.relationPointSegmentVXZ = function (pointVXZ,
                                                        segmentVXZ) {
    var camPositionVXZ, lineVXZ, intersectionVXZ, util;

    util = realityBuilder.util;

    camPositionVXZ = [0, 0]; // in origin of view space, naturally

    lineVXZ = [camPositionVXZ, pointVXZ];

    intersectionVXZ = util.intersectionSegmentLineVXZ(segmentVXZ, lineVXZ);

    if (intersectionVXZ === false) {
        // no intersection
        return 0;
    } else {
        // intersection
        if (util.pointsIdenticalVXZ(intersectionVXZ, pointVXZ)) {
            return 0; // point on line segment
        } else {
            return util.pointIsBetween2D(pointVXZ,
                                         camPositionVXZ,
                                         intersectionVXZ) ? -1 : 1;
        }
    }
};

// In 2D, returns true, iff the point "p" lies somewhere between the points
// "p1" and "p2", horizontally and vertically. If points coincide, the result
// is undefined.
realityBuilder.util.pointIsBetween2D = function (p, p1, p2) {
    var horizontally =
        (p[0] >= p1[0] && p[0] <= p2[0]) ||
        (p[0] <= p1[0] && p[0] >= p2[0]),
        vertically =
        (p[1] >= p1[1] && p[1] <= p2[1]) ||
        (p[1] <= p1[1] && p[1] >= p2[1]);
    return horizontally && vertically;
};

// Returns true, iff the points "p1" and "p2" are in the same position, within
// the tolerance "tolerance".
realityBuilder.util.pointsIdentical2D = function (p1, p2, tolerance) {
    return (Math.abs(p1[0] - p2[0]) < tolerance &&
            Math.abs(p1[1] - p2[1]) < tolerance);
};

// Returns true, iff the points "p1" and "p2" are in the same position in
// sensor space.
realityBuilder.util.pointsIdenticalS = function (p1S, p2S) {
    var tolerance = realityBuilder.util.TOLERANCE_S;
    return realityBuilder.util.pointsIdentical2D(p1S, p2S, tolerance);
};

// Returns true, iff the points "p1" and "p2" are in the same position in
// the view space x-z-plane.
realityBuilder.util.pointsIdenticalVXZ = function (p1VXZ, p2VXZ) {
    var tolerance = realityBuilder.util.TOLERANCE_VXZ;
    return realityBuilder.util.pointsIdentical2D(p1VXZ, p2VXZ, tolerance);
};

// Returns true, iff the points "p1B" and "p2B" are in the same position in
// block space.
realityBuilder.util.pointsIdenticalB = function (p1B, p2B) {
    return ((p1B[0] - p2B[0]) === 0 &&
            (p1B[1] - p2B[1]) === 0 &&
            (p1B[2] - p2B[2]) === 0);
};

// Subtracts the vectors "vector2" from the vector "vector1" in 3D and returns
// the result.
realityBuilder.util.subtractVectors3D = function (vector1, vector2) {
    return [vector1[0] - vector2[0],
            vector1[1] - vector2[1],
            vector1[2] - vector2[2]];
};

// Adds the vectors "vector1B" and "vector2B" in blocks space and returns the
// result.
realityBuilder.util.addVectorsB = function (vector1B, vector2B) {
    return [vector1B[0] + vector2B[0],
            vector1B[1] + vector2B[1],
            vector1B[2] + vector2B[2]];
};

// Adds the vectors "vector1BXY" and "vector2BXY" in the block space x-y-plane
// and returns the result.
realityBuilder.util.addVectorsBXY = function (vector1BXY, vector2BXY) {
    return [vector1BXY[0] + vector2BXY[0],
            vector1BXY[1] + vector2BXY[1]];
};

// Subtracts the vectors "vector1BXY" and "vector2BXY" in the block space
// x-y-plane and returns the result.
realityBuilder.util.subtractVectorsBXY = function (vector1BXY, vector2BXY) {
    return [vector1BXY[0] - vector2BXY[0],
            vector1BXY[1] - vector2BXY[1]];
};

// Returns the specified vector, multiplied with the specified factor.
realityBuilder.util.multiplyVectorBXY = function (factor, vectorBXY) {
    return [factor * vectorBXY[0],
            factor * vectorBXY[1]];
};

// Subtracts the vectors "vector2B" from the vector "vector1B" in blocks space
// and returns the result.
realityBuilder.util.subtractVectorsB = function (vector1B, vector2B) {
    return realityBuilder.util.subtractVectors3D(vector1B, vector2B);
};

// Removes duplicate points from the list of points "ps". Returns the resulting
// list. Removes points from the front. Does not change the order.
realityBuilder.util.withDuplicatesRemoved = function (ps) {
    var newPs = [], i, j, p1, p2, duplicate;
    for (i = 0; i < ps.length; i += 1) {
        p1 = ps[i];
        duplicate = false;
        for (j = i + 1; j < ps.length; j += 1) {
            p2 = ps[j];
            if (realityBuilder.util.pointsIdenticalS(p1, p2)) {
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

// Returns the polar coordinates of the sensor space point "pS".
realityBuilder.util.cartesianToPolar = function (pS) {
    var x = pS[0], y = pS[1],
        angle = Math.atan2(y, x),
        distance = Math.sqrt(x * x + y * y);
    return [angle, distance];
};

// Returns the cartesian coordinates of the sensor space point "polarPS", which
// is in polar coordinates.
realityBuilder.util.polarToCartesian = function (polarPS) {
    var angle = polarPS[0], distance = polarPS[1],
        x = distance * Math.cos(angle),
        y = distance * Math.sin(angle);
    return [x, y];
};

// Returns a new point, whose coordinates are the sum of the coordinates of the
// points "p1S" and "p2S" in sensor space.
realityBuilder.util.addS = function (p1S, p2S) {
    return [p1S[0] + p2S[0], p1S[1] + p2S[1]];
};

// Returns the point "pBXY" in the block space x-z-plane, rotated about the
// center "cBXY" by the angle "a", CCW when viewed from above. The angle is in
// multiples of 90°.
realityBuilder.util.rotatePointBXY = function (pBXY, cBXY, a) {
    var tmpXB, tmpYB, cXB, cYB;

    if (a % 4 === 0) {
        return pBXY;
    } else {
        cXB = cBXY[0];
        cYB = cBXY[1];
        tmpXB = pBXY[0] - cXB;
        tmpYB = pBXY[1] - cYB;

        if (a % 4 === 1) {
            return [Math.round(cXB - tmpYB), Math.round(cYB + tmpXB)];
        } else if (a % 4 === 2) {
            return [Math.round(cXB - tmpXB), Math.round(cYB - tmpYB)];
        } else { // a % 4 === 3
            return [Math.round(cXB + tmpYB), Math.round(cYB - tmpXB)];
        }
    }
};

// Returns the object "object" with all keys converted to strings and being
// prefixed by "prefix".
realityBuilder.util.addPrefix = function (prefix, object) {
    var tmp = [], i;
    for (i in object) {
        if (object.hasOwnProperty(i)) {
            tmp[prefix.toString() + i.toString()] = object[i];
        }
    }
    return tmp;
};

// Returns true, iff FlashCanvas has loaded. FlashCanvas implements HTML canvas
// support for Internet Explorer.
realityBuilder.util.isFlashCanvasActive = function () {
    return (typeof FlashCanvas !== 'undefined');
};

realityBuilder.util.isFlashReadyForFlashCanvas = function () {
    return (typeof swfobject !== 'undefined' &&
            swfobject.hasFlashPlayerVersion("9")); // includes higher versions
};

// Returns true, iff the canvas functionality is somehow supported, either
// natively by the browser, or via some emulation.
realityBuilder.util.isCanvasSupported = function () {
    return (document.createElement('canvas').getContext ||  // Native support
            (realityBuilder.util.isFlashCanvasActive() &&
             realityBuilder.util.isFlashReadyForFlashCanvas()));
};

// Clears the canvas "canvas".
realityBuilder.util.clearCanvas = function (canvas) {
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
};

// Fills the canvas "canvas" with color "color".
realityBuilder.util.fillCanvas = function (canvas, color) {
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        context.fillStyle = color;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
};

// Has a trailing slash.
realityBuilder.util.rootUrl = function () {
    if (dojo.config.isDebug) {
        return dojo.baseUrl + '../../../';
    } else {
        return dojo.baseUrl + '../../';
    }
};

// Performs a JSONP request, using some default settings.
realityBuilder.util.jsonpGet = function (args) {
    if (typeof args.content === 'undefined') {
        args.content = {};
    }

    args.content.namespace = realityBuilder.util.SETTINGS.namespace;

    dojo.io.script.get(dojo.mixin({
        callbackParamName: 'callback',
        timeout: realityBuilder.util.SETTINGS.jsonpTimeout,
        error: realityBuilder.util.SETTINGS.onJsonpError
    }, args));
};
