/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.mobile.app.SceneAssistant"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.mobile.app.SceneAssistant"]){_4._hasResource["dojox.mobile.app.SceneAssistant"]=true;_4.provide("dojox.mobile.app.SceneAssistant");_4.experimental("dojox.mobile.app.SceneAssistant");_4.declare("dojox.mobile.app.SceneAssistant",null,{constructor:function(){},setup:function(){},activate:function(_7){},deactivate:function(){},destroy:function(){var _8=_4.query("> [widgetId]",this.containerNode).map(_5.byNode);_4.forEach(_8,function(_9){_9.destroyRecursive();});this.disconnect();},connect:function(_a,_b,_c){if(!this._connects){this._connects=[];}this._connects.push(_4.connect(_a,_b,_c));},disconnect:function(){_4.forEach(this._connects,_4.disconnect);this._connects=[];}});}}};});