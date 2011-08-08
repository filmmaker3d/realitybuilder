/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.storage._common"],["require","dojox.storage.Provider"],["require","dojox.storage.manager"],["require","dojox.storage.LocalStorageProvider"],["require","dojox.storage.GearsStorageProvider"],["require","dojox.storage.WhatWGStorageProvider"],["require","dojox.storage.FlashStorageProvider"],["require","dojox.storage.BehaviorStorageProvider"],["require","dojox.storage.CookieStorageProvider"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.storage._common"]){_4._hasResource["dojox.storage._common"]=true;_4.provide("dojox.storage._common");_4.require("dojox.storage.Provider");_4.require("dojox.storage.manager");_4.require("dojox.storage.LocalStorageProvider");_4.require("dojox.storage.GearsStorageProvider");_4.require("dojox.storage.WhatWGStorageProvider");_4.require("dojox.storage.FlashStorageProvider");_4.require("dojox.storage.BehaviorStorageProvider");_4.require("dojox.storage.CookieStorageProvider");_6.storage.manager.initialize();}}};});