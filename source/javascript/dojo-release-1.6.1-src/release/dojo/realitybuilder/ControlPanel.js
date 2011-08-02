/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["realitybuilder.ControlPanel"]){dojo._hasResource["realitybuilder.ControlPanel"]=true;dojo.provide("realitybuilder.ControlPanel");dojo.require("realitybuilder.ControlButton");dojo.declare("realitybuilder.ControlPanel",null,{_newBlock:null,_buttons:null,_node:null,constructor:function(_1){var rb,nb,_2;this._newBlock=_1;this._node=dojo.byId("controlPanel");rb=realitybuilder;nb=_1;_2=[];_2.push(this._createCoordinateButton("incX",[1,0,0]));_2.push(this._createCoordinateButton("decX",[-1,0,0]));_2.push(this._createCoordinateButton("incY",[0,1,0]));_2.push(this._createCoordinateButton("decY",[0,-1,0]));_2.push(this._createCoordinateButton("incZ",[0,0,1]));_2.push(this._createCoordinateButton("decZ",[0,0,-1]));_2.push(this._createRotate90Button());_2.push(this._createRequestRealButton());this._buttons=_2;},_createCoordinateButton:function(_3,_4){var _5,_6,_7;_5=this._newBlock;_6=function(){_5.move(_4);};_7=function(){return (!_5.wouldGoOutOfRange(_4,0)&&_5.isMovable());};return new realitybuilder.ControlButton(_3+"Button",_6,_7);},_createRotate90Button:function(){var _8,_9,_a;_8=this._newBlock;_9=function(){_8.rotate90();};_a=function(){return (!_8.wouldGoOutOfRange([0,0,0],1)&&_8.isRotatable());};return new realitybuilder.ControlButton("rotate90Button",_9,_a);},_createRequestRealButton:function(){var _b,_c,_d;_b=this._newBlock;_c=function(){_b.requestMakeReal();};_d=function(){return _b.canBeMadeReal()&&!_b.isStopped();};return new realitybuilder.ControlButton("requestRealButton",_c,_d);},update:function(){dojo.forEach(this._buttons,function(_e){_e.update();});if(this._newBlock.isStopped()){dojo.addClass(this._node,"disabled");}else{dojo.removeClass(this._node,"disabled");}}});}