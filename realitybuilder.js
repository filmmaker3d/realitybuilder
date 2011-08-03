// Provides the Reality Builder as a web widget.
//
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

(function () {
    var el, s, initialized, settings2, httpHost;

    httpHost = '{{ http_host }}';

    initialized = false; // fixme

    el = document.createElement('script');
    s = document.getElementsByTagName('script')[0];
    
    el.type = 'text/javascript';
    el.async = true;
    el.onload = function () {
        if (initialized) {
            setupWidgetIfLoaded();
        }
    };

    // {% if debug %}

    // debug mode enabled on server

    window.djConfig = {
        isDebug: true,
        locale: "en",
        debugContainerId: 'firebugLite',
        scopeMap: [
            ['dojo', 'realitybuilderDojo'],
            ['dijit', 'realitybuilderDijit'],
            ['dojox', 'realitybuilderDojox']
        ],
        modulePaths: {
            "realitybuilder": "/source/javascript/realitybuilder"
        }
    };
    el.src = 'http://' + httpHost + 
        '/source/javascript/dojo-release-1.6.1/dojo/dojo.js';
    
    // {% else %}

    el.src = 'http://' + httpHost + '/javascript/dojo/dojo.xd.js';

    // {% endif %}

    s.parentNode.insertBefore(el, s);

    window.realitybuilder = {};

    isLoaded = function () {
        return (typeof realitybuilderDojo !== 'undefined');
    };

    // Sets up the widget.
    setupWidgetIfLoaded = function () {
        var construction; // variable to please JSLint

        if (isLoaded()) {
            // {% if debug %}
            realitybuilderDojo.require('realitybuilder.Construction');
            realitybuilderDojo.require('realitybuilder.util');
            // {% endif %}
            construction = 
                new realitybuilder.Construction(settings2.showAdminControls);
            if ('ready' in settings2) {
                settings2.ready();
            }
        }
    };

    // Attributes of "settings":
    //
    // "ready": Function that is called once the Reality Builder widget has
    //   been loaded and embedded.
    // 
    // "showAdminControls": Whether admin controls should be shown.
    window.realitybuilder.initialize = function (settings) {
        settings2 = settings;
        initialized = true;
        setupWidgetIfLoaded();
    };
}());
