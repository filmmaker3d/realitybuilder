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

// For the index and admin pages.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, dojo, dojox, swfobject, videoId, DetectImageState, 
  realityBuilderCreateConstruction */

// Returns true, iff the browser works with the Dojo Toolkit.
function realityBuilderIsDojoSupported() {
    return (typeof dojo !== 'undefined');
}

// Called after it has been detected whether images are enabled ("disabled"
// false) or disabled ("disabled" false) in the browser. If they are enabled,
// continues with the initialization process. Otherwise shows an error message
// to the user.
function realityBuilderOnImageStateDetected(disabled) {
    if (disabled) {
        com.realitybuilder.showNoImagesErrorMessage();
    } else {
        realityBuilderCreateConstruction();
    }
}

function realityBuilderInit() {
    dojo.addOnLoad(function () {
        if (com.realitybuilder.isCanvasSupported()) {
            DetectImageState.init('/images/placeholder.gif', 
                                  realityBuilderOnImageStateDetected);
        } else {
            com.realitybuilder.showNoCanvasErrorMessage();
        }
    });
}

if (realityBuilderIsDojoSupported()) {
    if (dojo.config.isDebug) {
        dojo.registerModulePath("com", "../../com");
        dojo.require('com.realitybuilder.Construction');
        dojo.require('com.realitybuilder.util');
    }

    if (dojo.isIE) {
        // Initialization needs to be deferred, since otherwise it may happen
        // before excanvas is ready. See <url:http://stackoverflow.com/question
        // s/3273118>
        dojo.connect('onload', realityBuilderInit);
    } else {
        realityBuilderInit();
    }
}
