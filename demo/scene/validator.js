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

/*global realityBuilderSimPosesBList */

// This function returns true, iff the passed construction blocks plus new
// block describe a valid construction.
window.realityBuilderValidator = (function () {
    'use strict';

    var validSrtSimPosesBList;

    // List of valid prerendered sorted poses.
    function setValidSrtSimPosesBList(util, _) {
        validSrtSimPosesBList = [];

        _.each(realityBuilderSimPosesBList, function (simPosesB) {
            util.sortPosesB(simPosesB);
            validSrtSimPosesBList.push(simPosesB);
        });
    }

    return function (constructionBlocks, newBlock, util, _) {
        // poses to be tested:
        var srtSimPosesB = constructionBlocks.nonDeletedSimPosesB();

        srtSimPosesB.push(newBlock.simPoseB());
        util.sortPosesB(srtSimPosesB);

        if (validSrtSimPosesBList === undefined) {
            setValidSrtSimPosesBList(util, _);
        }

        return util.posInSrtSimPosesBList(srtSimPosesB,
                                          validSrtSimPosesBList) !== false;
    };
}());
