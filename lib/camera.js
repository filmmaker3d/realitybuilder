// Camera data.

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

var mongo = require('./mongo'), db = mongo.db;

function emitData(socket) {
    console.log('fixme: open');
    db.open(function (err, db) {
    socket.emit('camera data', { // fixme: doesn't belong here
        "pos": [189.57, -159.16, 140.11],
        "sensorResolution": 19.9,
        "aY": -0.46583,
        "aX": 2.1589,
        "aZ": 0.29,
        "fl": 40.0
    });
/*fixme:        db.collection('cameras', function (err, collection) {
            collection.findOne(null, function (err, document) {
//fixme:                console.log('socket:', socket); // fixme
//fixme:                socket.emit('camera data', document);
            });
        });*/
    });
}

exports.onSocketConnection = function (socket) {
    emitData(socket);
/*fixme:    socket.on('camera data', function (data) {
        console.log('camera data', data);
    });*/
};
