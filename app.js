// The Reality Builder.

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

/*jslint node: true, maxerr: 50, maxlen: 79, nomen: true */

'use strict';

var requirejs = require('requirejs'), url = require('url');

requirejs.config({ nodeRequire: require });

requirejs(['http', 'socket.io', 'fixme_data', 'lactate'], function (http,
                                                                    socketio,
                                                                    fixmeData,
                                                                    Lactate) {
    var httpServer, io,
        lactateOptions = {},
        scriptsFixmeLactate = Lactate.dir('.', lactateOptions),
        scriptsLactate = Lactate.dir('scripts', lactateOptions),
        scriptsBuildLactate = Lactate.dir('scripts.build', lactateOptions),
        env = process.env.NODE_ENV || 'development';

    function tryToHandleFixme(req, res, path) {
        return ((path === '/fixme.html') ?
                scriptsFixmeLactate.serve('fixme.html', req, res) :
                false);
    }

    function tryToHandleScripts(req, res, path) {
        var matches = /^\/scripts\/([a-z_\-\/\.]*[.]js)/.exec(path);
        return ((matches !== null && matches.length === 2) ?
                scriptsLactate.serve(matches[1], req, res) :
                false);
    }

    function tryToHandleRealityBuilder(req, res, path) {
        return ((path === '/reality_builder.js') ?
                scriptsBuildLactate.serve('main.js', req, res) :
                false);
    }

    function handler(req, res) {
        var path = url.parse(req.url).pathname, tmp;

        tmp = tryToHandleRealityBuilder(req, res, path);
        if (tmp !== false) {
            return tmp;
        }

        if (env === 'development') {
            tmp = tryToHandleScripts(req, res, path);
            if (tmp !== false) {
                return tmp;
            }

            tmp = tryToHandleFixme(req, res, path);
            if (tmp !== false) {
                return tmp;
            }
        }

        // path not found
        res.writeHead(404);
        return res.end();
    }

    httpServer = http.createServer(handler);
    io = socketio.listen(httpServer);
    httpServer.listen(3000);

    io.sockets.on('connection', function (socket) {
        console.log('fixme: connected');
        socket.emit('updated new block', fixmeData.newBlock);
        socket.emit('camera data', fixmeData.camera);
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });

    console.log('HTTP server listening on port %d in %s mode',
                httpServer.address().port, env);
});
