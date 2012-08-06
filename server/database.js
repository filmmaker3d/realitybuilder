// Object to access the Reality Builder database.

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

/*jslint node: true, maxerr: 50, maxlen: 79, unparam: true, nomen: true */

'use strict';

var mongo = require('mongodb'),
    host = 'localhost',
    port = mongo.Connection.DEFAULT_PORT,
    toCallForOpen = [],
    toCallForCollection = {},
    collections = {}, // by name
    dbConnector = new mongo.Db('realitybuilder',
                               new mongo.Server(host, port, {}), {}),
    db = null; // this is set once the connection is open

function setDb(x) {
    db = x;
}

function onOpen(err, db) {
    if (err !== null) {
        console.error('Can not open database');
        process.exit(1);
    } else {
        setDb(db);
        toCallForOpen.forEach(function (callback) { callback(db); });
    }
}

// Adds a callback that is called once the database connection has been opened.
function callForOpen(callback) {
    if (db !== null) {
        // already open => no need to queue callback
        callback(db);
    } else {
        // callback queued for later
        toCallForOpen.push(callback);
    }
}

function onCollection(err, collection, collectionName) {
    if (err !== null) {
        // fixme: perhaps handle error better (database not available?), and
        // don't exit
        console.error('Can not open camera collectaion');
        process.exit(1);
    } else {
        collections[collectionName] = collection;
        if (toCallForCollection.hasOwnProperty(collectionName)) {
            toCallForCollection[collectionName].forEach(function (callback) {
                callback(collection);
            });
        }
    }
}

function collectionIsLoaded(collectionName) {
    return collections.hasOwnProperty(collectionName);
}

function loadCollection(collectionName) {
    callForOpen(function () {
        db.collection(collectionName, function (err, collection) {
            onCollection(err, collection, collectionName);
        });
    });
}

// Adds a callback that is called once the specified collection has been
// loaded. If there hasn't yet been a request to load the collection, then such
// a request is made.
function callForCollection(collectionName, callback) {
    if (collectionIsLoaded(collectionName)) {
        callback(collections[collectionName]);
    } else {
        if (!toCallForCollection.hasOwnProperty(collectionName)) {
            toCallForCollection[collectionName] = [];
        }
        toCallForCollection[collectionName].push(callback);
    }
}

dbConnector.open(onOpen);

exports.callForCollection = callForCollection;
exports.loadCollection = loadCollection;
