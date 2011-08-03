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

/*global realitybuilder, realitybuilderDojo,
  realitybuilderDojox, swfobject, videoId, 
  realitybuilderDemoCreateConstruction */

// Returns true, iff the browser works with the Dojo Toolkit.
function realitybuilderDemoIsDojoSupported() {
    return (typeof realitybuilderDojo !== 'undefined');
}

function realitybuilderDemoInit() {
    realitybuilderDojo.addOnLoad(function () {
        if (realitybuilder.util.isCanvasSupported()) {
            realitybuilderDemoCreateConstruction();
        } else {
            realitybuilder.util.showNoCanvasErrorMessage();
        }
    });
}

/*fixme: put some of the below around the initialization        

        if (realitybuilderDemoIsDojoSupported()) {
            if (realitybuilderDojo.isIE < 9) {
                // Initialization needs to be deferred, since otherwise it may
                // happen before FlashCanvas is ready.
                realitybuilderDojo.connect('onload', realitybuilderDemoInit);
            } else {
                realitybuilderDemoInit();
            }
        }*/
