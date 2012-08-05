// Initializes the MongoDB database for the demo scene.

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

/*jslint maxerr: 50, maxlen: 79, sloppy: true */

/*global db */

db.dropDatabase();

db.cameras.save({
    pos: [189.57, -159.16, 140.11],
    a_x: 2.1589,
    a_y: -0.46583,
    a_z: 0.29,
    fl: 40.0,
    sensor_resolution: 19.9
});
