// Topic system (name inspired by Dojo 1.7), allowing different parts of the
// application to communicate. Mix this into Reality Builder objects which
// should support the topic system.

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

/*global define */

define(['./vendor/underscore-wrapped'], function (_) {
    return {
        topicHandlersList: {}, // list of handlers per topic (for this object)

        // Emits the given topic (normally a string).
        publishTopic: function (topic) {
            var handlers = this.topicHandlersList[topic] || [];

            _.each(handlers, function (handler) {
                handler();
            });
        },

        // Adds a handler for the given topic. The handler is associated with
        // the *origin object*, i.e. the object that emits the topic.
        subscribeToTopic: function (origin, topic, handler) {
            var handlers;
            if (!origin.topicHandlersList.hasOwnProperty(topic)) {
                origin.topicHandlersList[topic] = [];
            }
            handlers = origin.topicHandlersList[topic];
            handlers.push(_.bind(handler, this));
        }
    };
});
