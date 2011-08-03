// Provides the Reality Builder Widget.
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
    var el, s, initialized;

    initialized = false; // fixme

    el = document.createElement('script');
    s = document.getElementsByTagName('script')[0];
    
    el.type = 'text/javascript';
    el.async = true;
    el.onload = function () {
        if (initialized) {
            realitybuilder.configuration.ready();
        }
    };

    // {%if debug%}

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
    el.src = '/source/javascript/dojo-release-1.6.1/dojo/dojo.js';
    
    // {%else%}

    el.src = '/javascript/dojo/dojo.xd.js';

    // {%endif%}

    s.parentNode.insertBefore(el, s);

    window.realitybuilder = {};

    window.realitybuilder.initialize = function (configuration) {
        realitybuilder.configuration = configuration;
        initialized = true;
        if (typeof realitybuilderDojo !== 'undefined') {
            configuration.ready();
        }
    };
}());
