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

var database = require('./database'),
    toCallWhenReady = [],
    collection = null;

function isReady() {
    return collection !== null;
}

function callWhenReady(callback) {
    if (isReady()) {
        callback();
    } else {
        toCallWhenReady.push(callback);
    }
}

function emitData(socket) {
    database.callForCollection('cameras', function (collection) {
        collection.findOne(null, function (err, document) {
            if (err === null) {
                delete document._id;
                socket.emit('camera data', document);
            } // else: fails silently
        });
    });
}

database.loadCollection('cameras');

exports.onSocketConnection = function (socket) {
    emitData(socket);
    socket.on('camera data', function (data) {
        console.log('camera data', data);
    });
};
