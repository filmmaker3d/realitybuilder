// Socket to communicate with server.

// Copyright 2012 Felix E. Klee <felix.klee@inka.de>
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

/*global define, io */

define(['./util', './vendor/underscore-wrapped'], function (util, _) {
    var exports = {}, onParamsList = [];

    function init() {
        var socket = io.connect('http://localhost:3000'); // fixme: make
                                                          // configurable

        _.each(onParamsList, function (onParams) {
            socket.on(onParams[0], onParams[1]);
        });

        exports.on = _.bind(socket.on, socket);
        exports.emit = _.bind(socket.emit, socket);
    }

    // Used as long as socket has not been initialized. Collects event handlers
    // for later assignment.
    function on(name, fn) {
        onParamsList.push([name, fn]);
    }

    // Used as long as socket has not been initialized. Does nothing.
    function emit() { }

    exports = {
        init: init,
        on: on,
        emit: emit
    };

    return exports;
});
