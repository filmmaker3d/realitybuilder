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
    var publicInterface;
    
    function onBrowserNotSupportedError() {
        // "alert" works also in very old browsers such as Netscape 4.
        alert('Your web browser is not supported.');
    }

    function onPrerenderedConfigurationChanged(i) {
        var src = '/demo/images/prerendered_' + i + '.jpg';
        dojo.byId('backgroundImage').src = src;
    }

    publicInterface = {
        onLoad: function (showAdminControls) {
            // Note for IE < 9: FlashCanvas needs to be ready at this point in
            // time!
        
            realitybuilder.initialize({
                showAdminControls: showAdminControls,
                onBrowserNotSupportedError: onBrowserNotSupportedError,
                onPrerenderedConfigurationChanged: 
                onPrerenderedConfigurationChanged
            });
        }
    };

    return publicInterface;
}());
