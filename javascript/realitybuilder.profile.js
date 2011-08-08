// Build profile, for baking the Reality Builder into one Dojo layer.

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

dependencies = {
    layers: [{
        name: "dojo.js", // if not "dojo.js", then 2 files would be created,
                         // and scopeMap would fail
        copyrightFile: "../../../realityBuilder.copyright.js",
        dependencies: [
            "dojox.math", 
            "dojox.math.matrix", 
            "realityBuilder.RealityBuilder"]
    }],
    prefixes: [
        ["dojox", "../dojox"], 
        ["realityBuilder", "../../realityBuilder"]
    ]
};
