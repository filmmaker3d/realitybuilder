// Describes the properties of a block, including shape and dimensions.

// Sometimes the term "full shadow" is used, which refers to the shadow how it
// would look if the all blocks in the layer would form an infinite plane
// without holes.

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

/*global com, dojo, dojox, G_vmlCanvasManager, logoutUrl */

dojo.provide('com.realitybuilder.BlockProperties');

dojo.declare('com.realitybuilder.BlockProperties', com.realitybuilder.Block, {
    // Block dimensions in world space. The side length of a block is
    // approximately two times the grid spacing in the respective direction.
    outlineB: function () {
        return [[0, 0], [2, 0], [2, 2], [0, 2]];
    }
});
