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

var requirejs = require('requirejs');

requirejs.config({ nodeRequire: require });

requirejs(['http', 'socket.io', 'fs'], function (http, socketio, fs) {
    var httpServer, io;

    /*jslint unparam:true */
    function handler(req, res) {
        /*jslint unparam:false */
        fs.readFile(__dirname + '/fixme.html', function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading fixme.html');
            }

            res.writeHead(200);
            res.end(data);
        });
    }

    httpServer = http.createServer(handler);
    io = socketio.listen(httpServer);
    httpServer.listen(80);

    io.sockets.on('connection', function (socket) {
        socket.emit('construction blocks', [
            {
                posB: [0, 1, 0],
                a: 3,
                state: 2,
                timeStamp: 0 // fixme
            },
            {
                posB: [1, 0, 0],
                a: 0,
                state: 2,
                timeStamp: 0 // fixme
            }
        ]);
        socket.emit('camera', [
            
        ]);
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });
});
