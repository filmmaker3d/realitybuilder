/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojo.data.api.Read"],["require","dojo.data.api.Request"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojo.data.api.Read"]){_4._hasResource["dojo.data.api.Read"]=true;_4.provide("dojo.data.api.Read");_4.require("dojo.data.api.Request");_4.declare("dojo.data.api.Read",null,{getValue:function(_7,_8,_9){var _a=null;throw new Error("Unimplemented API: dojo.data.api.Read.getValue");return _a;},getValues:function(_b,_c){var _d=[];throw new Error("Unimplemented API: dojo.data.api.Read.getValues");return _d;},getAttributes:function(_e){var _f=[];throw new Error("Unimplemented API: dojo.data.api.Read.getAttributes");return _f;},hasAttribute:function(_10,_11){throw new Error("Unimplemented API: dojo.data.api.Read.hasAttribute");return false;},containsValue:function(_12,_13,_14){throw new Error("Unimplemented API: dojo.data.api.Read.containsValue");return false;},isItem:function(_15){throw new Error("Unimplemented API: dojo.data.api.Read.isItem");return false;},isItemLoaded:function(_16){throw new Error("Unimplemented API: dojo.data.api.Read.isItemLoaded");return false;},loadItem:function(_17){if(!this.isItemLoaded(_17.item)){throw new Error("Unimplemented API: dojo.data.api.Read.loadItem");}},fetch:function(_18){var _19=null;throw new Error("Unimplemented API: dojo.data.api.Read.fetch");return _19;},getFeatures:function(){return {"dojo.data.api.Read":true};},close:function(_1a){throw new Error("Unimplemented API: dojo.data.api.Read.close");},getLabel:function(_1b){throw new Error("Unimplemented API: dojo.data.api.Read.getLabel");return undefined;},getLabelAttributes:function(_1c){throw new Error("Unimplemented API: dojo.data.api.Read.getLabelAttributes");return null;}});}}};});