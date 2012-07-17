// Copyright 2012 Felix E. Klee <felix.klee@inka.de>
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

/*jslint browser: true, maxerr: 50, maxlen: 79, nomen: true */

/*global realityBuilder */

// This function returns true, iff the passed simplified block poses describe a
// valid construction.
var realityBuilderValidator = (function () {
    'use strict';

    // List of prerendered poses:
    var util = realityBuilder.util,
        _ = realityBuilder._,
        validSiPosesBList = [
            [
                [1, 4, 3, 1], [1, 4, 2, 0], [1, 4, 1, 3], [1, 4, 0, 2],
                [5, 5, 1, 2], [5, 5, 0, 2], [0, 1, 0, 3], [3, 0, 0, 2],
                [4, 0, 0, 0], [1, 0, 0, 0], [4, 4, 0, 0]
            ],
            [
                [1, 4, 3, 1], [1, 4, 2, 0], [1, 4, 1, 3], [1, 4, 0, 2],
                [5, 5, 1, 2], [5, 5, 0, 2], [0, 1, 0, 3], [3, 0, 0, 2],
                [4, 0, 0, 0], [1, 0, 0, 0], [4, 4, 0, 0], [1, 1, 0, 0]
            ],
            [
                [1, 4, 3, 1], [1, 4, 2, 0], [1, 4, 1, 3], [1, 4, 0, 2],
                [5, 5, 1, 2], [5, 5, 0, 2], [0, 1, 0, 3], [3, 0, 0, 2],
                [4, 0, 0, 0], [1, 0, 0, 0], [4, 4, 0, 0], [1, 1, 0, 0],
                [3, 1, 0, 2]
            ],
            [
                [1, 4, 3, 1], [1, 4, 2, 0], [1, 4, 1, 3], [1, 4, 0, 2],
                [5, 5, 1, 2], [5, 5, 0, 2], [0, 1, 0, 3], [3, 0, 0, 2],
                [4, 0, 0, 0], [1, 0, 0, 0], [4, 4, 0, 0], [3, 1, 0, 2]
            ],
            [
                [1, 4, 3, 1], [1, 4, 2, 0], [1, 4, 1, 3], [1, 4, 0, 2],
                [5, 5, 1, 2], [5, 5, 0, 2], [0, 1, 0, 3], [3, 0, 0, 2],
                [4, 0, 0, 0], [1, 0, 0, 0], [4, 4, 0, 0], [1, 1, 0, 0],
                [3, 1, 0, 2], [2, 1, 1, 0]
            ],
            [
                [1, 4, 3, 1], [1, 4, 2, 0], [1, 4, 1, 3], [1, 4, 0, 2],
                [5, 5, 1, 2], [5, 5, 0, 2], [0, 1, 0, 3], [3, 0, 0, 2],
                [4, 0, 0, 0], [1, 0, 0, 0], [4, 4, 0, 0], [1, 1, 0, 0],
                [3, 1, 0, 2], [2, 1, 1, 0], [1, 1, 1, 3]
            ],
            [
                [1, 4, 3, 1], [1, 4, 2, 0], [1, 4, 1, 3], [1, 4, 0, 2],
                [5, 5, 1, 2], [5, 5, 0, 2], [0, 1, 0, 3], [3, 0, 0, 2],
                [4, 0, 0, 0], [1, 0, 0, 0], [4, 4, 0, 0], [1, 1, 0, 0],
                [3, 1, 0, 2], [1, 1, 1, 3]
            ],
            [
                [1, 4, 3, 1], [1, 4, 2, 0], [1, 4, 1, 3], [1, 4, 0, 2],
                [5, 5, 1, 2], [5, 5, 0, 2], [0, 1, 0, 3], [3, 0, 0, 2],
                [4, 0, 0, 0], [1, 0, 0, 0], [4, 4, 0, 0], [1, 1, 0, 0],
                [1, 1, 1, 3]
            ]
        ];

    _.each(validSiPosesBList, function (siPosesB) {
        util.sortPosesB(siPosesB);
    });

    return function (constructionBlocks, newBlock) {
        var siPosesBAreValid, siPosesB;

        siPosesB = constructionBlocks.nonDeletedSiPosesB();
        siPosesB.push(newBlock.siPoseB());

        util.sortPosesB(siPosesB);

        return util.posInSoSiPosesBList(siPosesB, validSiPosesBList) !== false;
    };
}());
