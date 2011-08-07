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

/*global realitybuilderDojo, acme, window */

var realitybuilder = (function () {
    var
    scriptIsLoaded,
    initialized, // true, after the public "initialize" has been called
    settings, publicInterface;

    /* {{ "*" }}{{ "/" }} 
       {% include "javascript/lazyload/lazyload-min.js" %}
    {{ "/" }}{{ "*" }} */

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
    function w3cDomIsSupported() {
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
    function fixDojoQueryBug() {
        if (!('query' in realitybuilderDojo) && 
            typeof acme !== 'undefined' && 'query' in acme) {
            realitybuilderDojo.query = acme.query; 
        }
    }

    function onScriptLoaded() {
        scriptIsLoaded = true;
        fixDojoQueryBug();
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

        if (w3cDomIsSupported()) {
            LazyLoad.js(scriptUrl, onScriptLoaded);
        }
    }

    // Loads the Dojo JavaScript that is used for debugging mode.
    function requestLoadDebugScript() {
        var scriptUrl, baseUrl;

        // For debugging it is assumed that this script and related Dojo
        // resources are included from files which are hosted on the same
        // domain.
        //
        // This makes  it possible to  use for example Apache's  "ProxyPass" to
        // work around GAE's current limitation of only being able to serve one
        // file at a  time (slow!). "host" would be the host  of the Google App
        // Engine, and not of the proxy.
        //
        // Note that with Dojo 1.6, the baseUrl has to be set manually because
        // it is not detected correctly:
        //
        //   <url:http://groups.google.com/group/dojo-interest/msg/65a43ee98f27
        //   cb6e>
        scriptUrl = 
            '/javascript/dojo-release-1.6.1/dojo/dojo.js.uncompressed.js';
        baseUrl = '/javascript/dojo-release-1.6.1/dojo/';

        window.djConfig = {
            isDebug: true,
            locale: "en",
            debugContainerId: "firebugLite",
            baseUrl: baseUrl,
            scopeMap: [
                ["dojo", "realitybuilderDojo"], 
                ["dijit", "realitybuilderDijit"],
                ["dojox", "realitybuilderDojox"]
            ],
            modulePaths: {
                "realitybuilder": "/javascript/realitybuilder"
            }
        };

        requestLoadScript(scriptUrl);
    }

    // Loads the Dojo JavaScript that is used for release mode. Almost all
    // functionality is built into one file.
    function requestLoadReleaseScript() {
        var host = '{{ host }}';
        requestLoadScript('http://' + host + '/javascript/dojo/dojo.xd.js');
    }

    function mergeIntoSettings(newSettings) {
        var prop;

        for (prop in newSettings) {
            if (newSettings.hasOwnProperty(prop)) {
                settings[prop] = newSettings[prop];
            }
        }
    }

    function nop() {}

    scriptIsLoaded = false;
    initialized = false;
    settings = {};

    // {% if debug %}
    requestLoadDebugScript();
    // {% else %}
    requestLoadReleaseScript();
    // {% endif %}

    publicInterface = {
        // Mandatory settings:
        //
        // * "width", "height": dimensions (px)
        //
        // Optional settings:
        //
        // * "id": ID of HTML element into which to insert the Reality Builder.
        //
        // * "onReady": Function that is called when the Reality Builder is
        //   ready to use, i.e. after it has downloaded the required resources,
        //   rendered itself, etc.
        //
        // * "showAdminControls": Iff true, then the admin controls are shown,
        //   and - in the rendering - the real and pending blocks.
        //
        // * "onBrowserNotSupportedError": Function that is executed when the
        //   Reality Builder does not work with the current browser, e.g. when
        //   the current browser doesn't support a required HTML element such
        //   as the canvas element.
        //
        // * "onPrerenderedBlockConfigurationChanged": Function that is
        //   executed when the prerendered configuration is changed.
        //
        // * "onDegreesOfFreedomChanged": Function that is called when the
        //   degrees of freedom of the new block changed.
        //
        //   That may happen for example when after the block has been moved
        //   into a corner from where it can only be moved in certain
        //   directions. Or it may happen if the block can now be made real.
        //
        // * "onCameraChanged": Function that is called when camera data has
        //   changed.
        initialize: function (settings) {
            var defaultSettings = {
                id: 'RealityBuilder',
                showAdminControls: false,
                onBrowserNotSupportedError: nop,
                onPrerenderedBlockConfigurationChanged: nop,
                onReady: nop,
                onDegreesOfFreedomChanged: nop,
                onRealBlocksVisibilityChanged: nop,
                onPendingBlocksVisibilityChanged: nop,
                onCameraChanged: nop
            };

            if (!w3cDomIsSupported()) {
                // Happens for example with Netscape 4. There is no point in
                // continuing.
                settings.onBrowserNotSupportedError();
            } else {
                mergeIntoSettings(defaultSettings);
                mergeIntoSettings(settings);
                initialized = true;
                requestSetupWidgetIfScriptIsLoaded();
            }
        }
    };

    return publicInterface;
}());
