// For the admin page.

// Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
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

/*global realitybuilderDemoBase, realitybuilder, dojo */

(function () {
    var blocksVisibilityButtonHandles = {};

    function updateBlocksVisibilityButton(type, text, blocksAreVisible, 
                                          setVisibility)
    {
        var node = dojo.byId(type + 'BlocksVisibilityButton');
        node.innerHTML = (blocksAreVisible ? "Hide" : "Show") + " " + 
            text + " Blocks";
        if (type in blocksVisibilityButtonHandles) {
            dojo.disconnect(blocksVisibilityButtonHandles[type]);
        }
        blocksVisibilityButtonHandles[type] = 
            dojo.connect(node, 'onclick', 
                         function () { setVisibility(!blocksAreVisible); });
    }

    function updateRealBlocksVisibilityButton() {
        var setVisibility, blocksAreVisible;

        setVisibility = dojo.hitch(realitybuilder,
                                   realitybuilder.setRealBlocksVisibility);
        blocksAreVisible = realitybuilder.realBlocksAreVisible();
        updateBlocksVisibilityButton('real', 'Real', 
                                     blocksAreVisible, setVisibility);
    }

    function updatePendingBlocksVisibilityButton() {
        var setVisibility, blocksAreVisible;

        setVisibility = dojo.hitch(realitybuilder,
                                   realitybuilder.setPendingBlocksVisibility);
        blocksAreVisible = realitybuilder.pendingBlocksAreVisible();
        updateBlocksVisibilityButton('pending', 'Pending', 
                                     blocksAreVisible, setVisibility);
    }

    function onRealBlocksVisibilityChanged() {
        updateRealBlocksVisibilityButton();
    }

    function onPendingBlocksVisibilityChanged() {
        updatePendingBlocksVisibilityButton();
    }

    function onReady() {
        updateRealBlocksVisibilityButton();
        updatePendingBlocksVisibilityButton();
    }

    dojo.addOnLoad(function () {
        var settings, baseOnReady;
        
        settings = realitybuilderDemoBase.settings();
        baseOnReady = settings.onReady;
        dojo.mixin(settings, {
            showAdminControls: true,
            onReady: function () {
                baseOnReady();
                onReady();
            },
            onRealBlocksVisibilityChanged: onRealBlocksVisibilityChanged,
            onPendingBlocksVisibilityChanged: onPendingBlocksVisibilityChanged
        });
        
        realitybuilder.initialize(settings);
    });
}());

