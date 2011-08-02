/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["realitybuilder.ConstructionBlockProperties"]){dojo._hasResource["realitybuilder.ConstructionBlockProperties"]=true;dojo.provide("realitybuilder.ConstructionBlockProperties");dojo.declare("realitybuilder.ConstructionBlockProperties",null,{_versionOnServer:"-1",_pendingColor:null,_realColor:null,versionOnServer:function(){return this._versionOnServer;},isInitializedWithServerData:function(){return this._versionOnServer!=="-1";},updateWithServerData:function(_1){this._versionOnServer=_1.version;this._pendingColor=_1.pendingColor;this._realColor=_1.realColor;dojo.publish("realitybuilder/ConstructionBlockProperties/changed");},pendingColor:function(){return this._pendingColor;},realColor:function(){return this._realColor;}});}