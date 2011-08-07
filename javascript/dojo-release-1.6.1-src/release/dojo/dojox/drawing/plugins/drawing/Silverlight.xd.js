/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.drawing.plugins.drawing.Silverlight"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.drawing.plugins.drawing.Silverlight"]){_4._hasResource["dojox.drawing.plugins.drawing.Silverlight"]=true;_4.provide("dojox.drawing.plugins.drawing.Silverlight");_6.drawing.plugins.drawing.Silverlight=_6.drawing.util.oo.declare(function(_7){if(_6.gfx.renderer!="silverlight"){return;}this.mouse=_7.mouse;this.stencils=_7.stencils;this.anchors=_7.anchors;this.canvas=_7.canvas;this.util=_7.util;_4.connect(this.stencils,"register",this,function(_8){var c1,c2,c3,c4,c5,_9=this;var _a=function(){c1=_8.container.connect("onmousedown",function(_b){_b.superTarget=_8;_9.mouse.down(_b);});};_a();c2=_4.connect(_8,"setTransform",this,function(){});c3=_4.connect(_8,"onBeforeRender",function(){});c4=_4.connect(_8,"onRender",this,function(){});c5=_4.connect(_8,"destroy",this,function(){_4.forEach([c1,c2,c3,c4,c5],_4.disconnect,_4);});});_4.connect(this.anchors,"onAddAnchor",this,function(_c){var c1=_c.shape.connect("onmousedown",this.mouse,function(_d){_d.superTarget=_c;this.down(_d);});var c2=_4.connect(_c,"disconnectMouse",this,function(){_4.disconnect(c1);_4.disconnect(c2);});});this.mouse._down=function(_e){var _f=this._getXY(_e);var x=_f.x-this.origin.x;var y=_f.y-this.origin.y;x*=this.zoom;y*=this.zoom;this.origin.startx=x;this.origin.starty=y;this._lastx=x;this._lasty=y;this.drawingType=this.util.attr(_e,"drawingType")||"";var id=this._getId(_e);var obj={x:x,y:y,id:id};console.log(" > > > id:",id,"drawingType:",this.drawingType,"evt:",_e);this.onDown(obj);this._clickTime=new Date().getTime();if(this._lastClickTime){if(this._clickTime-this._lastClickTime<this.doublClickSpeed){var dnm=this.eventName("doubleClick");console.warn("DOUBLE CLICK",dnm,obj);this._broadcastEvent(dnm,obj);}else{}}this._lastClickTime=this._clickTime;};this.mouse.down=function(evt){clearTimeout(this.__downInv);if(this.util.attr(evt,"drawingType")=="surface"){this.__downInv=setTimeout(_4.hitch(this,function(){this._down(evt);}),500);return;}this._down(evt);};this.mouse._getXY=function(evt){if(evt.pageX){return {x:evt.pageX,y:evt.pageY,cancelBubble:true};}console.log("EVT",evt);for(var nm in evt){}console.log("EVTX",evt.x);if(evt.x!==undefined){return {x:evt.x+this.origin.x,y:evt.y+this.origin.y};}else{return {x:evt.pageX,y:evt.pageY};}};this.mouse._getId=function(evt){return this.util.attr(evt,"id");};this.util.attr=function(_10,_11,_12,_13){if(!_10){return false;}try{var t;if(_10.superTarget){t=_10.superTarget;}else{if(_10.superClass){t=_10.superClass;}else{if(_10.target){t=_10.target;}else{t=_10;}}}if(_12!==undefined){_10[_11]=_12;return _12;}if(t.tagName){if(_11=="drawingType"&&t.tagName.toLowerCase()=="object"){return "surface";}var r=_4.attr(t,_11);}var r=t[_11];return r;}catch(e){if(!_13){}return false;}};},{});}}};});