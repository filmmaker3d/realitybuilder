/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.gfx.path"],["require","dojox.gfx.matrix"],["require","dojox.gfx.shape"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.gfx.path"]){_4._hasResource["dojox.gfx.path"]=true;_4.provide("dojox.gfx.path");_4.require("dojox.gfx.matrix");_4.require("dojox.gfx.shape");_4.declare("dojox.gfx.path.Path",_6.gfx.shape.Shape,{constructor:function(_7){this.shape=_4.clone(_6.gfx.defaultPath);this.segments=[];this.tbbox=null;this.absolute=true;this.last={};this.rawNode=_7;this.segmented=false;},setAbsoluteMode:function(_8){this._confirmSegmented();this.absolute=typeof _8=="string"?(_8=="absolute"):_8;return this;},getAbsoluteMode:function(){this._confirmSegmented();return this.absolute;},getBoundingBox:function(){this._confirmSegmented();return (this.bbox&&("l" in this.bbox))?{x:this.bbox.l,y:this.bbox.t,width:this.bbox.r-this.bbox.l,height:this.bbox.b-this.bbox.t}:null;},_getRealBBox:function(){this._confirmSegmented();if(this.tbbox){return this.tbbox;}var _9=this.bbox,_a=this._getRealMatrix();this.bbox=null;for(var i=0,_b=this.segments.length;i<_b;++i){this._updateWithSegment(this.segments[i],_a);}var t=this.bbox;this.bbox=_9;this.tbbox=t?[{x:t.l,y:t.t},{x:t.r,y:t.t},{x:t.r,y:t.b},{x:t.l,y:t.b}]:null;return this.tbbox;},getLastPosition:function(){this._confirmSegmented();return "x" in this.last?this.last:null;},_applyTransform:function(){this.tbbox=null;return this.inherited(arguments);},_updateBBox:function(x,y,_c){if(_c){var t=_6.gfx.matrix.multiplyPoint(_c,x,y);x=t.x;y=t.y;}if(this.bbox&&("l" in this.bbox)){if(this.bbox.l>x){this.bbox.l=x;}if(this.bbox.r<x){this.bbox.r=x;}if(this.bbox.t>y){this.bbox.t=y;}if(this.bbox.b<y){this.bbox.b=y;}}else{this.bbox={l:x,b:y,r:x,t:y};}},_updateWithSegment:function(_d,_e){var n=_d.args,l=n.length;switch(_d.action){case "M":case "L":case "C":case "S":case "Q":case "T":for(var i=0;i<l;i+=2){this._updateBBox(n[i],n[i+1],_e);}this.last.x=n[l-2];this.last.y=n[l-1];this.absolute=true;break;case "H":for(var i=0;i<l;++i){this._updateBBox(n[i],this.last.y,_e);}this.last.x=n[l-1];this.absolute=true;break;case "V":for(var i=0;i<l;++i){this._updateBBox(this.last.x,n[i],_e);}this.last.y=n[l-1];this.absolute=true;break;case "m":var _f=0;if(!("x" in this.last)){this._updateBBox(this.last.x=n[0],this.last.y=n[1],_e);_f=2;}for(var i=_f;i<l;i+=2){this._updateBBox(this.last.x+=n[i],this.last.y+=n[i+1],_e);}this.absolute=false;break;case "l":case "t":for(var i=0;i<l;i+=2){this._updateBBox(this.last.x+=n[i],this.last.y+=n[i+1],_e);}this.absolute=false;break;case "h":for(var i=0;i<l;++i){this._updateBBox(this.last.x+=n[i],this.last.y,_e);}this.absolute=false;break;case "v":for(var i=0;i<l;++i){this._updateBBox(this.last.x,this.last.y+=n[i],_e);}this.absolute=false;break;case "c":for(var i=0;i<l;i+=6){this._updateBBox(this.last.x+n[i],this.last.y+n[i+1],_e);this._updateBBox(this.last.x+n[i+2],this.last.y+n[i+3],_e);this._updateBBox(this.last.x+=n[i+4],this.last.y+=n[i+5],_e);}this.absolute=false;break;case "s":case "q":for(var i=0;i<l;i+=4){this._updateBBox(this.last.x+n[i],this.last.y+n[i+1],_e);this._updateBBox(this.last.x+=n[i+2],this.last.y+=n[i+3],_e);}this.absolute=false;break;case "A":for(var i=0;i<l;i+=7){this._updateBBox(n[i+5],n[i+6],_e);}this.last.x=n[l-2];this.last.y=n[l-1];this.absolute=true;break;case "a":for(var i=0;i<l;i+=7){this._updateBBox(this.last.x+=n[i+5],this.last.y+=n[i+6],_e);}this.absolute=false;break;}var _10=[_d.action];for(var i=0;i<l;++i){_10.push(_6.gfx.formatNumber(n[i],true));}if(typeof this.shape.path=="string"){this.shape.path+=_10.join("");}else{Array.prototype.push.apply(this.shape.path,_10);}},_validSegments:{m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7,z:0},_pushSegment:function(_11,_12){this.tbbox=null;var _13=this._validSegments[_11.toLowerCase()];if(typeof _13=="number"){if(_13){if(_12.length>=_13){var _14={action:_11,args:_12.slice(0,_12.length-_12.length%_13)};this.segments.push(_14);this._updateWithSegment(_14);}}else{var _14={action:_11,args:[]};this.segments.push(_14);this._updateWithSegment(_14);}}},_collectArgs:function(_15,_16){for(var i=0;i<_16.length;++i){var t=_16[i];if(typeof t=="boolean"){_15.push(t?1:0);}else{if(typeof t=="number"){_15.push(t);}else{if(t instanceof Array){this._collectArgs(_15,t);}else{if("x" in t&&"y" in t){_15.push(t.x,t.y);}}}}}},moveTo:function(){this._confirmSegmented();var _17=[];this._collectArgs(_17,arguments);this._pushSegment(this.absolute?"M":"m",_17);return this;},lineTo:function(){this._confirmSegmented();var _18=[];this._collectArgs(_18,arguments);this._pushSegment(this.absolute?"L":"l",_18);return this;},hLineTo:function(){this._confirmSegmented();var _19=[];this._collectArgs(_19,arguments);this._pushSegment(this.absolute?"H":"h",_19);return this;},vLineTo:function(){this._confirmSegmented();var _1a=[];this._collectArgs(_1a,arguments);this._pushSegment(this.absolute?"V":"v",_1a);return this;},curveTo:function(){this._confirmSegmented();var _1b=[];this._collectArgs(_1b,arguments);this._pushSegment(this.absolute?"C":"c",_1b);return this;},smoothCurveTo:function(){this._confirmSegmented();var _1c=[];this._collectArgs(_1c,arguments);this._pushSegment(this.absolute?"S":"s",_1c);return this;},qCurveTo:function(){this._confirmSegmented();var _1d=[];this._collectArgs(_1d,arguments);this._pushSegment(this.absolute?"Q":"q",_1d);return this;},qSmoothCurveTo:function(){this._confirmSegmented();var _1e=[];this._collectArgs(_1e,arguments);this._pushSegment(this.absolute?"T":"t",_1e);return this;},arcTo:function(){this._confirmSegmented();var _1f=[];this._collectArgs(_1f,arguments);this._pushSegment(this.absolute?"A":"a",_1f);return this;},closePath:function(){this._confirmSegmented();this._pushSegment("Z",[]);return this;},_confirmSegmented:function(){if(!this.segmented){var _20=this.shape.path;this.shape.path=[];this._setPath(_20);this.shape.path=this.shape.path.join("");this.segmented=true;}},_setPath:function(_21){var p=_4.isArray(_21)?_21:_21.match(_6.gfx.pathSvgRegExp);this.segments=[];this.absolute=true;this.bbox={};this.last={};if(!p){return;}var _22="",_23=[],l=p.length;for(var i=0;i<l;++i){var t=p[i],x=parseFloat(t);if(isNaN(x)){if(_22){this._pushSegment(_22,_23);}_23=[];_22=t;}else{_23.push(x);}}this._pushSegment(_22,_23);},setShape:function(_24){this.inherited(arguments,[typeof _24=="string"?{path:_24}:_24]);this.segmented=false;this.segments=[];if(!_6.gfx.lazyPathSegmentation){this._confirmSegmented();}return this;},_2PI:Math.PI*2});_4.declare("dojox.gfx.path.TextPath",_6.gfx.path.Path,{constructor:function(_25){if(!("text" in this)){this.text=_4.clone(_6.gfx.defaultTextPath);}if(!("fontStyle" in this)){this.fontStyle=_4.clone(_6.gfx.defaultFont);}},getText:function(){return this.text;},setText:function(_26){this.text=_6.gfx.makeParameters(this.text,typeof _26=="string"?{text:_26}:_26);this._setText();return this;},getFont:function(){return this.fontStyle;},setFont:function(_27){this.fontStyle=typeof _27=="string"?_6.gfx.splitFontString(_27):_6.gfx.makeParameters(_6.gfx.defaultFont,_27);this._setFont();return this;}});}}};});