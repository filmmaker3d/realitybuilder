/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","realitybuilder.ConstructionBlockProperties"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["realitybuilder.ConstructionBlockProperties"]){_4._hasResource["realitybuilder.ConstructionBlockProperties"]=true;_4.provide("realitybuilder.ConstructionBlockProperties");_4.declare("realitybuilder.ConstructionBlockProperties",null,{_versionOnServer:"-1",_pendingColor:null,_realColor:null,versionOnServer:function(){return this._versionOnServer;},isInitializedWithServerData:function(){return this._versionOnServer!=="-1";},updateWithServerData:function(_7){if(this._versionOnServer!==_7.version){this._versionOnServer=_7.version;this._pendingColor=_7.pendingColor;this._realColor=_7.realColor;_4.publish("realitybuilder/ConstructionBlockProperties/changed");}},pendingColor:function(){return this._pendingColor;},realColor:function(){return this._realColor;}});}}};});