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

/*jslint browser: true, maxerr: 50, maxlen: 79 */

/*global $, require */

require(['user_interface',
         'admin_interface',
         'http://localhost:8080/realitybuilder.js'
        ], function (userInterface,
                     adminInterface,
                     realityBuilder) {
    'use strict';

    // Note for IE < 9: FlashCanvas needs to be ready at this point in time!
    realityBuilder.init({
        width: 640,
        height: 480,
        namespace: 'demo',
        onReady: function () {

// fixme:
//    userInterface.init({realityBuilder: realityBuilder});
//    adminInterface.init({realityBuilder: realityBuilder});

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
        onBrowserNotSupportedError: userInterface.onBrowserNotSupportedError
    });
});