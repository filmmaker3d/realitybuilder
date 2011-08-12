// Configuration for prerender-mode, if enabled.

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

/*global realityBuilder, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('realityBuilder.PrerenderMode');

dojo.declare('realityBuilder.PrerenderMode', null, {
    // Version of data last retrieved from the server, or "-1" initially. Is a
    // string in order to be able to contain very large integers.
    _versionOnServer: '-1',

    // With prerender-mode enabled, a block is automatically made real after
    // "_makeRealAfter" milliseconds, and if the total construction would
    // afterwards match one of the block configurations in the list
    // "_blockConfigurations".
    _isEnabled: null,
    _makeRealAfter: null, // ms
    _blockConfigurations: null, // [[xB, yB, zB, a], [xB, ...

    // Index of the currently and of the previously loaded prerendered block
    // configuration.
    _i: null,
    _prevI: null,

    versionOnServer: function () {
        return this._versionOnServer;
    },

    // Returns false when the object is new and has not yet been updated with
    // server data.
    isInitializedWithServerData: function () {
        return this._versionOnServer !== '-1';
    },

    // Updates the settings of the camera to the version on the server, which
    // is described by "serverData".
    updateWithServerData: function (serverData) {
        if (this._versionOnServer !== serverData.version) {
            this._versionOnServer = serverData.version;
            this._isEnabled = serverData.isEnabled;
            this._makeRealAfter = serverData.makeRealAfter;
            this._blockConfigurations = serverData.blockConfigurations;
            this._i = serverData.i;
            this._prevI = serverData.prevI;
            
            dojo.publish('realityBuilder/PrerenderMode/changed');
        }
    },

    i: function () {
        return this._i;
    },

    prevI: function () {
        return this._prevI;
    },

    isEnabled: function () {
        return this._isEnabled;
    },

    makeRealAfter: function () {
        return this._makeRealAfter;
    },

    _blockConfigurationSetKey: function (block) {
        return block.xB() + ',' + block.yB() + ',' + block.zB() + ',' +
            block.a();
    },

    // Returns a set describing the block configuration comprised of the real
    // blocks "realBlocks" and the block "newBlock". The keys in the set have
    // the format "xB,yB,zB,a".
    _blockConfigurationSet: function (realBlocks, newBlock) {
        var set = {}, setKey = this._blockConfigurationSetKey;

        dojo.forEach(realBlocks, function (realBlock) {
            set[setKey(realBlock)] = true;
        });

        set[setKey(newBlock)] = true;

        return set;
    },

    _setIsEmpty: function (set) {
        var key;

        for (key in set) {
            if (set.hasOwnProperty(key)) {
                return false;
            }
        }

        return true;
    },

    // Returns true, iff the real blocks "realBlocks" plus the block "newBlock"
    // form the same block configuration as described in "blockConfiguration".
    _blockConfigurationMatches: function (blockConfiguration, 
                                          realBlocks, newBlock)
    {
        var blockConfigurationSet, i, item, key;

        blockConfigurationSet = this._blockConfigurationSet(realBlocks, 
                                                            newBlock);

        for (i = 0; i < blockConfiguration.length; i += 1) {
            item = blockConfiguration[i];
            key = item[0] + ',' + item[1] + ',' + item[2] + ',' + item[3];
            if (typeof blockConfigurationSet[key] === 'undefined') {
                return false;
            } else {
                delete blockConfigurationSet[key];
            }
        }

        return this._setIsEmpty(blockConfigurationSet);
    },

    // Iff there is a prerendered block configuration that matches the block
    // configuration described by the real blocks "realBlocks" and the new
    // block "newBlock", then returns the index of that configuration.
    //
    // Otherwise returns false.
    matchingBlockConfiguration: function (realBlocks, newBlock) {
        var i, blockConfiguration;

        for (i = 0; i < this._blockConfigurations.length; i += 1) {
            blockConfiguration = this._blockConfigurations[i];
            if (this._blockConfigurationMatches(blockConfiguration, 
                                                realBlocks, newBlock)) {
                return i;
            }
        }
        return false; // no prerendered configuration matches
    },

    _loadBlockConfigurationOnServerSucceeded: function () {
        dojo.publish('realityBuilder/PrerenderMode/' + 
                     'loadedBlockConfigurationOnServer');
    },

    // Loads the prerendered block configuration with index "i" on the server.
    loadBlockConfigurationOnServer: function (i) {
        realityBuilder.util.jsonpGet({
            url: realityBuilder.util.rootUrl() + 
                "rpc/load_prerendered_block_configuration",
            content: {
                "i": i
            },
            load: dojo.hitch(this, 
                             this._loadBlockConfigurationOnServerSucceeded)
        });
    },

    // Loads the previous prerendered block configuration, unless the current
    // one is already the first.
    loadPrevBlockConfigurationOnServer: function () {
        if (this.i() > 0) {
            this.loadBlockConfigurationOnServer(this.i() - 1);
        }
    },

    // Loads the next prerendered block configuration, unless the current one
    // is already the last.
    loadNextBlockConfigurationOnServer: function () {
        if (this.i() < this._blockConfigurations.length - 1) {
            this.loadBlockConfigurationOnServer(this.i() + 1);
        }
    }
});
