// For all pages.

// Copyright 2011 Felix E. Klee <felix.klee@inka.de>
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

/*global realitybuilder, dojo, dojox, alert */

var realitybuilderDemo = (function () {
    var publicInterface,
    coordinateButtonDeltaBs = {
        'incX': [1, 0, 0],
        'decX': [-1, 0, 0],
        'incY': [0, 1, 0],
        'decY': [0, -1, 0],
        'incZ': [0, 0, 1],
        'decZ': [0, 0, -1]
    };
    
    function forEachCoordinateButton(f) {
        var type, deltaB;

        for (type in coordinateButtonDeltaBs) {
            if (coordinateButtonDeltaBs.hasOwnProperty(type)) {
                deltaB = coordinateButtonDeltaBs[type];
                f(type, deltaB);
            }
        }
    }

    function onBrowserNotSupportedError() {
        // "alert" works also in very old browsers such as Netscape 4.
        alert('Your web browser is not supported.');
    }

    function onPrerenderedBlockConfigurationChanged(i) {
        var src = '/demo/images/prerendered_' + i + '.jpg';
        dojo.byId('backgroundImage').src = src;
    }

    function controlButtonEl(type) {
        return dojo.byId(type + 'Button');
    }

    // Updates the state of a control button, i.e. whether it's enabled or
    // disabled.
    function updateControlButtonState(type, shouldBeEnabled) {
        var el = controlButtonEl(type);

        if (shouldBeEnabled) {
            dojo.removeClass(el, 'disabled');
        } else {
            dojo.addClass(el, 'disabled');
        }
    }

    function updateCoordinateButtonState(type, deltaB) {
        updateControlButtonState(type, 
                                 realitybuilder.newBlock().canBeMoved(deltaB));
    }

    function updateRotate90ButtonState() {
        updateControlButtonState('rotate90', 
                                 realitybuilder.newBlock().canBeRotated90());
    }

    function updateMakeRealButtonState() {
        updateControlButtonState('requestMakeReal', 
                                 realitybuilder.newBlock().canBeMadeReal());
    }

    function onDegreesOfFreedomChanged() {
        forEachCoordinateButton(updateCoordinateButtonState);
        updateRotate90ButtonState();
        updateMakeRealButtonState();
    }

    function setUpControlButton(type, onClick) {
        dojo.connect(controlButtonEl(type), 'onclick', onClick);
    }

    function setUpCoordinateButton(type, deltaB) {
        setUpControlButton(type,
                           function () {
                               realitybuilder.newBlock().move(deltaB);
                           });
    }

    function setUpRotate90Button() {
        setUpControlButton('rotate90',
                           function () {
                               realitybuilder.newBlock().rotate90();
                           });
    }

    function setUpRequestMakeRealButton() {
        setUpControlButton('requestMakeReal',
                           function () {
                               realitybuilder.newBlock().requestMakeReal();
                           });
    }

    // Called when the Reality Builder is ready.
    //
    // Sets up the user interface.
    function onReady() {
        forEachCoordinateButton(setUpCoordinateButton);
        setUpRotate90Button();
        setUpRequestMakeRealButton();
    }

    publicInterface = {
        onLoad: function (showAdminControls) {
            // Note for IE < 9: FlashCanvas needs to be ready at this point in
            // time!
        
            realitybuilder.initialize({
                width: 640,
                height: 480,
                onReady: onReady,
                showAdminControls: showAdminControls,
                onBrowserNotSupportedError: onBrowserNotSupportedError,
                onPrerenderedBlockConfigurationChanged: 
                onPrerenderedBlockConfigurationChanged,
                onDegreesOfFreedomChanged: onDegreesOfFreedomChanged
            });
        }
    };

    return publicInterface;
}());
