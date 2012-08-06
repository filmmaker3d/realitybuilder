// Functionality for JSONP.

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

/*jslint browser: true, maxerr: 50, maxlen: 79, nomen: true, sloppy: true,
  unparam: true */

/*global define, FlashCanvas, swfobject */

define(['./util', './vendor/jquery-modified'], function (util, $) {
    return {
        // Performs a JSONP request, using some default settings.
        get: function (args) {
            if (typeof args.content === 'undefined') {
                args.content = {};
            }

            args.content.namespace = util.SETTINGS.namespace;

            $.ajax({
                dataType: 'jsonp',
                url: args.url,
                data: args.content,
                success: args.load,
                timeout: util.SETTINGS.jsonpTimeout,
                error: util.SETTINGS.onJsonpError
            });
        }
    };
});
