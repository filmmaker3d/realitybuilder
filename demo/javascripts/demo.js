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

/*global realityBuilderUI, realityBuilderAI, realityBuilder, $ */

$(function () {
    'use strict';

    // Note for IE < 9: FlashCanvas needs to be ready at this point in time!

    realityBuilder.initialize({
        width: 640,
        height: 480,
        namespace: 'demo',
        onReady: function () {
            realityBuilderUI.onReady();
            realityBuilderAI.onReady();
        },
        jsonpTimeout: 20000,
        onJsonpError: realityBuilderUI.onJsonpError,
        onRealBlocksVisibilityChanged:
            realityBuilderAI.onRealBlocksVisibilityChanged,
        onPendingBlocksVisibilityChanged:
            realityBuilderAI.onPendingBlocksVisibilityChanged,
        onCameraChanged: realityBuilderAI.onCameraChanged,
        onConstructionBlocksChanged: function () {
            realityBuilderUI.onConstructionBlocksChanged();
            realityBuilderAI.onConstructionBlocksChanged();
        },
        onMovedOrRotated: realityBuilderAI.onMovedOrRotated,
        onDegreesOfFreedomChanged: realityBuilderUI.onDegreesOfFreedomChanged,
        onServerError: realityBuilderUI.onServerError,
        onBrowserNotSupportedError: realityBuilderUI.onBrowserNotSupportedError
    });
});
