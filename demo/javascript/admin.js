// For the admin page.

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

/*global realitybuilderDemo, realitybuilder, $ */

var realitybuilderAdminDemo = (function () {
    var publicInterface, logoutUrl;

    function updateBlocksVisibilityButton(type, text, blocksAreVisible, 
                                          setVisibility)
    {
        $('#' + type + 'BlocksVisibilityButton').
            text((blocksAreVisible ? "Hide" : "Show") + " " + text + 
                 " Blocks").
            one('click', function () { setVisibility(!blocksAreVisible); });
    }

    function updateRealBlocksVisibilityButton() {
        var setVisibility, blocksAreVisible;

        setVisibility = $.proxy(realitybuilder.setRealBlocksVisibility,
                                realitybuilder);
        blocksAreVisible = realitybuilder.realBlocksAreVisible();
        updateBlocksVisibilityButton('real', 'Real', 
                                     blocksAreVisible, setVisibility);
    }

    function updatePendingBlocksVisibilityButton() {
        var setVisibility, blocksAreVisible;

        setVisibility = $.proxy(realitybuilder.setPendingBlocksVisibility,
                                realitybuilder);
        blocksAreVisible = realitybuilder.pendingBlocksAreVisible();
        updateBlocksVisibilityButton('pending', 'Pending', 
                                     blocksAreVisible, setVisibility);
    }

    function onRealBlocksVisibilityChanged() {
        updateRealBlocksVisibilityButton();
    }

    function onPendingBlocksVisibilityChanged() {
        updatePendingBlocksVisibilityButton();
    }

    // Logs the administrator out, sending him back to the login screen.
    function logout() {
        if (typeof logoutUrl !== 'undefined') {
            location.href = logoutUrl;
        }
    }

    function setUpLogoutButton() {
        $('#logoutButton').click(logout);
    }

    // Returns data read entered using the camera controls.
    function cameraDataFromControls() {
        return {
            "position": [parseFloat($('#cameraXTextField').val()) || 0,
                         parseFloat($('#cameraYTextField').val()) || 0,
                         parseFloat($('#cameraZTextField').val()) || 0],
            "aX": parseFloat($('#cameraAXTextField').val()) || 0,
            "aY": parseFloat($('#cameraAYTextField').val()) || 0,
            "aZ": parseFloat($('#cameraAZTextField').val()) || 0,
            "fl": parseFloat($('#cameraFlTextField').val()) || 1,
            "sensorResolution": 
            parseFloat($('#cameraSensorResolutionTextField').val())
                || 100};
    }

    function setUpSaveSettingsButton() {
        $('#saveSettingsButton').click(function () {
            var cameraData = cameraDataFromControls();

            realitybuilder.storeSettingsOnServer({cameraData: cameraData});
            realitybuilder.camera().update(cameraData);
        });
    }

    // Updates the camera, reading data from the camera controls.
    function updateCamera() {
        realitybuilder.camera().update(cameraDataFromControls());
    }

    function setUpPreviewCameraButton() {
        $('#previewCameraButton').click(updateCamera);
    }

    // Updates controls defining the camera "camera".
    function updateCameraControls() {
        var camera, position;

        camera = realitybuilder.camera();
        position = camera.position();
        $('#cameraXTextField').val(position[0]);
        $('#cameraYTextField').val(position[1]);
        $('#cameraZTextField').val(position[2]);
        $('#cameraAXTextField').val(camera.aX());
        $('#cameraAYTextField').val(camera.aY());
        $('#cameraAZTextField').val(camera.aZ());
        $('#cameraFlTextField').val(camera.fl());
        $('#cameraSensorResolutionTextField').val(camera.sensorResolution());
    }

    function onCameraChanged() {
        updateCameraControls();
    }

    function onReady() {
        setUpLogoutButton();
        setUpSaveSettingsButton();
        setUpPreviewCameraButton();
        updateCameraControls();
        updateRealBlocksVisibilityButton();
        updatePendingBlocksVisibilityButton();
    }

    publicInterface = {
        setLogoutUrl: function (x) {
            logoutUrl = x;
        },

        settings: function () {
            var settings, baseOnReady;

            settings = realitybuilderDemo.settings();
            baseOnReady = settings.onReady;

            return $.extend(settings, {
                showAdminControls: true,
                onReady: function () {
                    baseOnReady();
                    onReady();
                },
                onRealBlocksVisibilityChanged: onRealBlocksVisibilityChanged,
                onPendingBlocksVisibilityChanged: 
                onPendingBlocksVisibilityChanged,
                onCameraChanged: onCameraChanged
            });
        }
    };

    return publicInterface;
}());

$(function () {
    var settings = realitybuilderAdminDemo.settings();
    
    realitybuilder.initialize(settings);
});
