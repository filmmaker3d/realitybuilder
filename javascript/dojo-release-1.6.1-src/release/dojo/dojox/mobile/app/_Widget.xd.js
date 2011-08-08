/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.mobile.app._Widget"],["require","dijit._WidgetBase"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.mobile.app._Widget"]){_4._hasResource["dojox.mobile.app._Widget"]=true;_4.provide("dojox.mobile.app._Widget");_4.experimental("dojox.mobile.app._Widget");_4.require("dijit._WidgetBase");_4.declare("dojox.mobile.app._Widget",_5._WidgetBase,{getScroll:function(){return {x:_4.global.scrollX,y:_4.global.scrollY};},connect:function(_7,_8,fn){if(_8.toLowerCase()=="dblclick"||_8.toLowerCase()=="ondblclick"){if(_4.global["Mojo"]){return this.connect(_7,Mojo.Event.tap,fn);}}return this.inherited(arguments);}});}}};});