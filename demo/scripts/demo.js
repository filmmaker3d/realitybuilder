// For the index page.

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

/*jslint browser: true, maxerr: 50, maxlen: 79, nomen: true */

/*global $, _, require */

(function () {
    'use strict';

    var baseUrl, develModeIsRequested, host;

    // Returns the value of the named URL parameter, or null if not available.
    function urlParamVal(name) {
        var regexp = new RegExp('[?&]' + name + '=([^&]*)'), matches;
        matches = regexp.exec(window.location.search);
        return (_.isArray(matches) && matches.length === 2 ?
                decodeURIComponent(matches[1]) :
                null);
    }

    host = urlParamVal('demoHost');
    if (_.isNull(host)) {
        window.alert('Host not specified!');
        window.location = 'index.html'; // error: host needs to be specified
    }
    baseUrl = 'http://' + host;
    develModeIsRequested = urlParamVal('demoDevelMode') === 'on';

    require.config({
        baseUrl: 'scripts',
        paths: {
            'reality_builder_base': baseUrl
        },
        map: {
            '*': {
                'reality_builder': (develModeIsRequested ?
                                    'reality_builder_base/scripts/main' :
                                    'reality_builder_base/reality_builder')
            }
        }
    });

    require(['reality_builder', 'user_interface', 'admin_interface',
             'reality_builder_base/socket.io/socket.io'
            ], function (realityBuilder, userInterface, adminInterface) {
        // Note for IE < 9: FlashCanvas needs to be ready at this point in
        // time!
        realityBuilder.init({
            width: 640,
            height: 480,
            namespace: 'demo',
            baseUrl: 'http://localhost:8080', // fixme: make configurable
            onReady: function () {
                userInterface.onReady();
                adminInterface.onReady();
            },
            jsonpTimeout: 20000,
            onJsonpError: userInterface.onJsonpError,
            onRealBlocksVisibilityChanged:
                adminInterface.onRealBlocksVisibilityChanged,
            onPendingBlocksVisibilityChanged:
                adminInterface.onPendingBlocksVisibilityChanged,
            onCameraChanged: adminInterface.onCameraChanged,
            onConstructionBlocksChanged: function () {
                userInterface.onConstructionBlocksChanged();
                adminInterface.onConstructionBlocksChanged();
            },
            onMovedOrRotated: adminInterface.onMovedOrRotated,
            onDegreesOfFreedomChanged: userInterface.onDegreesOfFreedomChanged,
            onServerError: userInterface.onServerError,
            onBrowserNotSupportedError:
                userInterface.onBrowserNotSupportedError
        });
    });
}());
