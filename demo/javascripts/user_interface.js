// User interface to the Reality Builder.

// Copyright 2011-2012 Felix E. Klee <felix.klee@inka.de>
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

/*global realityBuilder, $, _, realityBuilderSimPosesBList */

var realityBuilderUI = (function () {
    'use strict';

    var coordinateButtonDeltaBs = {
            'incX': [1, 0, 0],
            'decX': [-1, 0, 0],
            'incY': [0, 1, 0],
            'decY': [0, -1, 0],
            'incZ': [0, 0, 1],
            'decZ': [0, 0, -1]
        },
        backgroundImageIsLoaded = false, // initially only a placeholder is
                                         // loaded
        realityBuilderIsReady = false,
        prerenderedSrtSimPosesBList;

    function forEachCoordinateButton(f) {
        $.each(coordinateButtonDeltaBs, function (type, deltaB) {
            f(type, deltaB);
        });
    }

    function onBrowserNotSupportedError() {
        // "alert" works also in very old browsers such as Netscape 4.
        window.alert('Your web browser is not supported.');
    }

    function onServerError() {
        window.alert('Server error.');
    }

    // Unhides the content.
    function unhideView() {
        $('#loadIndicator').fadeOut(1000);
    }

    // Unhides the view, if the Reality Builder is ready and if the background
    // image is ready, i.e. has been loaded.
    function unhideViewIfAllReady() {
        if (realityBuilderIsReady && backgroundImageIsLoaded) {
            unhideView();
        }
    }

    // Returns the list of sorted simplified poses of prerendered construction
    // blocks:
    prerenderedSrtSimPosesBList = _.memoize(function () {
        var srtSimPosesBList = realityBuilderSimPosesBList;
        _.each(srtSimPosesBList, function (simPosesB) {
            realityBuilder.util.sortPosesB(simPosesB);
        });
        return srtSimPosesBList;
    });

    // Returns the index of the prerendered image that matches the current
    // construction, or false if there is no matching image.
    function prerenderedImageIndex() {
        var util = realityBuilder.util, srtSimPosesB;

        srtSimPosesB =
            realityBuilder.constructionBlocks().nonDeletedSimPosesB();
        util.sortPosesB(srtSimPosesB);

        return util.posInSrtSimPosesBList(srtSimPosesB,
                                          prerenderedSrtSimPosesBList());
    }

    function updateBackgroundImage() {
        var index = prerenderedImageIndex();

        if (index !== false) {
            $('#backgroundImage').attr('src',
                                       'images/prerendered_' + index +
                                       '.jpg');

            if (!backgroundImageIsLoaded) {
                $('#backgroundImage').one('load', function () {
                    backgroundImageIsLoaded = true;
                    unhideViewIfAllReady();
                });
            }
        }
    }

    // Called also at the very beginning.
    function onConstructionBlocksChanged() {
        updateBackgroundImage();
    }

    // Updates the state of a node, i.e. whether it's enabled or disabled.
    function updateNodeState(node, shouldBeEnabled) {
        if (shouldBeEnabled) {
            node.removeClass('disabled');
        } else {
            node.addClass('disabled');
        }
    }

    function controlButtonNode(type) {
        return $('#' + type + 'Button');
    }

    function updateControlButtonState(type, shouldBeEnabled) {
        updateNodeState(controlButtonNode(type), shouldBeEnabled);
    }

    // Returns true, iff the new block can be moved by "deltaB".
    function newBlockCanBeMovedBy(deltaB) {
        var newBlock = realityBuilder.newBlock();
        return newBlock.zB() + deltaB[2] >= 0 && newBlock.canBeMovedBy(deltaB);
    }

    function updateCoordinateButtonState(type, deltaB) {
        if (realityBuilderIsReady) {
            updateControlButtonState(type, newBlockCanBeMovedBy(deltaB));
        }
    }

    function updateRotate90ButtonState() {
        var newBlock;

        if (realityBuilderIsReady) {
            newBlock = realityBuilder.newBlock();
            updateControlButtonState('rotate90', newBlock.canBeRotated90());
        }
    }

    function updateMakeRealButtonState() {
        var newBlock;

        if (realityBuilderIsReady) {
            newBlock = realityBuilder.newBlock();
            updateControlButtonState('requestMakeReal',
                                     newBlock.canBeMadeReal());
        }
    }

    function updateControlPanelState() {
        var newBlock;

        if (realityBuilderIsReady) {
            newBlock = realityBuilder.newBlock();
            updateNodeState($('#controlPanel'), !newBlock.isFrozen());
        }
    }

    function onDegreesOfFreedomChanged() {
        forEachCoordinateButton(updateCoordinateButtonState);
        updateControlPanelState();
        updateRotate90ButtonState();
        updateMakeRealButtonState();
    }

    function setUpControlButton(type, onClick) {
        controlButtonNode(type).click(onClick);
    }

    function setUpCoordinateButton(type, deltaB) {
        setUpControlButton(type, function () {
            if (newBlockCanBeMovedBy(deltaB)) {
                realityBuilder.newBlock().move(deltaB);
            }
        });
    }

    function setUpRotate90Button() {
        setUpControlButton('rotate90', function () {
            realityBuilder.newBlock().rotate90();
        });
    }

    function setUpRequestMakeRealButton() {
        setUpControlButton('requestMakeReal', function () {
            realityBuilder.newBlock().requestMakeReal();
        });
    }

    // Called when the Reality Builder is ready. Note that the background image
    // is separate and may still be in the process of being loaded.
    function onReady() {
        forEachCoordinateButton(setUpCoordinateButton);
        setUpRotate90Button();
        setUpRequestMakeRealButton();

        realityBuilderIsReady = true;

        unhideViewIfAllReady();
    }

    return {
        onReady: onReady,

        onBrowserNotSupportedError: onBrowserNotSupportedError,

        onConstructionBlocksChanged: onConstructionBlocksChanged,

        onDegreesOfFreedomChanged: onDegreesOfFreedomChanged,

        onServerError: onServerError
    };
}());
