/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["realityBuilder.Sensor"]){dojo._hasResource["realityBuilder.Sensor"]=true;dojo.provide("realityBuilder.Sensor");dojo.declare("realityBuilder.Sensor",null,{_canvasNodes:null,_width:null,_height:null,constructor:function(_1,_2,_3){var _4;_4=this._addSensorNode(_3);this._canvasNodes={};dojo.forEach(["realBlocks","pendingBlocks","shadow","newBlock"],dojo.hitch(this,function(_5){this._canvasNodes[_5]=this._addCanvasNode(_4,_1,_2);}));this.setRealBlocksVisibility(false);this.setPendingBlocksVisibility(false);this._width=_1;this._height=_2;},_styleBasedOnDefaults:function(_6){var _7;_7={margin:0,padding:0,border:0,display:"block"};dojo.mixin(_7,_6);return _7;},_addSensorNode:function(_8){var _9;_9=dojo.create("div",null,_8);dojo.style(_9,this._styleBasedOnDefaults({position:"relative"}));return _9;},_addCanvasNode:function(_a,_b,_c){var _d;_d=dojo.create("canvas",{width:_b,height:_c},_a);dojo.style(_d,this._styleBasedOnDefaults({position:"absolute",left:0,top:0,width:_b,height:_c}));if(realityBuilder.util.isFlashCanvasActive()){FlashCanvas.initElement(_d);}return _d;},realBlocksCanvas:function(){return this._canvasNodes.realBlocks;},pendingBlocksCanvas:function(){return this._canvasNodes.pendingBlocks;},shadowCanvas:function(){return this._canvasNodes.shadow;},newBlockCanvas:function(){return this._canvasNodes.newBlock;},_setCanvasVisibility:function(_e,_f){dojo.style(_e,"visibility",_f?"visible":"hidden");},_canvasIsVisible:function(_10){return dojo.style(_10,"visibility")==="visible";},realBlocksAreVisible:function(){return this._canvasIsVisible(this._canvasNodes.realBlocks);},pendingBlocksAreVisible:function(){return this._canvasIsVisible(this._canvasNodes.pendingBlocks);},setRealBlocksVisibility:function(_11){this._setCanvasVisibility(this._canvasNodes.realBlocks,_11);},setPendingBlocksVisibility:function(_12){this._setCanvasVisibility(this._canvasNodes.pendingBlocks,_12);},width:function(){return this._width;},height:function(){return this._height;}});}