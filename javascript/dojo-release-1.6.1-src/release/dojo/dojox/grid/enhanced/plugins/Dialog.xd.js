/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.grid.enhanced.plugins.Dialog"],["require","dijit.Dialog"],["require","dojo.window"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.grid.enhanced.plugins.Dialog"]){_4._hasResource["dojox.grid.enhanced.plugins.Dialog"]=true;_4.provide("dojox.grid.enhanced.plugins.Dialog");_4.require("dijit.Dialog");_4.require("dojo.window");_4.declare("dojox.grid.enhanced.plugins.Dialog",_5.Dialog,{refNode:null,_position:function(){if(this.refNode&&!this._relativePosition){var _7=_4.position(_4.byId(this.refNode)),_8=_4.position(this.domNode),_9=_4.window.getBox();if(_7.x<0){_7.x=0;}if(_7.x+_7.w>_9.w){_7.w=_9.w-_7.x;}if(_7.y<0){_7.y=0;}if(_7.y+_7.h>_9.h){_7.h=_9.h-_7.y;}_7.x=_7.x+_7.w/2-_8.w/2;_7.y=_7.y+_7.h/2-_8.h/2;if(_7.x>=0&&_7.x+_8.w<=_9.w&&_7.y>=0&&_7.y+_8.h<=_9.h){this._relativePosition=_7;}}this.inherited(arguments);}});}}};});