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

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global realitybuilderDojo, acme, djConfig */

var realitybuilder = (function () {
    var
    scriptIsLoaded,
    initialized, // true, after the public "initialize" has been called
    settings, publicInterface;

    // Instanciates the widget and merges its global members into the
    // "realitybuilder" name space.
    function setupWidget() {
        var main = new realitybuilder.Main(settings);
        realitybuilderDojo.mixin(realitybuilder, main);
    }

    // Some old browsers may support JavaScript but not Dojo. In this case,
    // this function returns false.
    function dojoIsSupported() {
        return typeof realitybuilderDojo !== 'undefined';
    }

    // Returns false for some old browsers.
    function w3cDOMIsSupported() {
        // The check does not use "in" since older browsers such as Netscape 4
        // don't support that operator.
        return document.getElementById && document.createElement;
    }

    // Sets up the widget after waiting for Dojo to be ready.
    function requestSetupWidget() {
        if (dojoIsSupported()) {
            // {% if debug %}
            realitybuilderDojo.require('realitybuilder.Main');
            // {% endif %}

            // "addOnLoad" is necessary to wait for Dojo dependencies to be
            // resolved.
            realitybuilderDojo.addOnLoad(function () {
                setupWidget();
            });
        } else {
            settings.onBrowserNotSupportedError();
        }
    }

    function requestSetupWidgetIfScriptIsLoaded() {
        if (scriptIsLoaded) {
            requestSetupWidget();
        }
    }

    function requestSetupWidgetIfInitialized() {
        if (initialized) {
            requestSetupWidget();
        }
    }

    // Necessary to work around a bug in Dojo 1.6 where "scopeMap" breaks
    // "dojo.query":
    //
    // <url:http://groups.google.com/group/dojo-interest/browse_thread/thread/2
    // bcd6c8aff0487cb/4a164ecba59d16f9>
    function fixDojoBug() {
        if (!('query' in realitybuilderDojo) && 
            typeof acme !== 'undefined' && 'query' in acme) {
            realitybuilderDojo.query = acme.query; 
        }
    }

    function onScriptLoaded() {
        scriptIsLoaded = true;
        fixDojoBug();
        requestSetupWidgetIfInitialized();
    }

    // Requests asynchronous loading of the specified JavaScript file.
    //
    // Note that this function causes "onload" to be blocked until the script
    // is loaded in Firefox, Chrome, and Safari:
    //
    //   http://friendlybit.com/js/lazy-loading-asyncronous-javascript/
    //
    // However, in general this should be no problem. After all, in the
    // anticipated use cases the widget is an integral part of a web page.
    // Also, one can still work around the issue by loading the current script
    // in an asynchronous way.
    function requestLoadScript(scriptUrl) {
        var newScriptEl, firstScriptEl;

        if (w3cDOMIsSupported()) {
            newScriptEl = document.createElement('script');
            firstScriptEl = document.getElementsByTagName('script')[0];
    
            newScriptEl.type = 'text/javascript';
            newScriptEl.onload = onScriptLoaded;
            newScriptEl.async = 'true'; // probably superfluous

            newScriptEl.src = scriptUrl;
            firstScriptEl.parentNode.insertBefore(newScriptEl, firstScriptEl);
        }
    }

    // Loads the Dojo JavaScript that is used for debugging mode.
    function requestLoadDebugScript() {
        var scriptUrl;

        djConfig = {
            isDebug: true,
            locale: "en",
            debugContainerId: "firebugLite",
            scopeMap: [
                ["dojo", "realitybuilderDojo"], 
                ["dijit", "realitybuilderDijit"],
                ["dojox", "realitybuilderDojox"]
            ],
            modulePaths: {
                "realitybuilder": "/javascript/realitybuilder"
            }
        };
            
        // For debugging it is assumed that this script is included from a file
        // which is hosted on the same domain.
        //
        // This makes  it possible to  use for example Apache's  "ProxyPass" to
        // work around GAE's current limitation of only being able to serve one
        // file at a  time (slow!). "host" would be the host  of the Google App
        // Engine, and not of the proxy.
        scriptUrl = '/javascript/dojo-release-1.6.1/dojo/dojo.js';

        requestLoadScript(scriptUrl);
    }

    // Loads the Dojo JavaScript that is used for release mode. Almost all
    // functionality is built into one file.
    function requestLoadReleaseScript() {
        var host;
        host = '{{ host }}';
        requestLoadScript('http://' + host + '/javascript/dojo/dojo.xd.js');
    }

    function setSettings(x) {
        settings = x;
    }

    scriptIsLoaded = false;
    initialized = false;

    // {% if debug %}
    requestLoadDebugScript();
    // {% else %}
    requestLoadReleaseScript();
    // {% endif %}

    publicInterface = {
        // Available settings:
        //
        // * "showAdminControls": Iff true, then the admin controls are shown,
        //   and - in the rendering - the real and pending blocks.
        //
        // * "onCanvasNotSupportedError": Optional function that is executed
        //   when the HTML canvas element is not supported by the browser.
        //   Without this element, the Reality Builder does not work.
        //
        // * "onPrerenderedConfigurationChanged": Optional function that is
        //   executed when the prerendered configuration is changed.
        initialize: function (settings) {
            if (!w3cDOMIsSupported()) {
                // Happens for example with Netscape 4. There is no point in
                // continuing.
                settings.onBrowserNotSupportedError();
            } else {
                setSettings(settings);
                initialized = true;
                requestSetupWidgetIfScriptIsLoaded();
            }
        }
    };

    return publicInterface;
}());
