/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.charting.axis2d.Invisible"],["require","dojox.charting.scaler.linear"],["require","dojox.charting.axis2d.common"],["require","dojox.charting.axis2d.Base"],["require","dojo.string"],["require","dojox.gfx"],["require","dojox.lang.functional"],["require","dojox.lang.utils"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.charting.axis2d.Invisible"]){_4._hasResource["dojox.charting.axis2d.Invisible"]=true;_4.provide("dojox.charting.axis2d.Invisible");_4.require("dojox.charting.scaler.linear");_4.require("dojox.charting.axis2d.common");_4.require("dojox.charting.axis2d.Base");_4.require("dojo.string");_4.require("dojox.gfx");_4.require("dojox.lang.functional");_4.require("dojox.lang.utils");(function(){var dc=_6.charting,df=_6.lang.functional,du=_6.lang.utils,g=_6.gfx,_7=dc.scaler.linear,_8=du.merge,_9=4,_a=45;_4.declare("dojox.charting.axis2d.Invisible",_6.charting.axis2d.Base,{defaultParams:{vertical:false,fixUpper:"none",fixLower:"none",natural:false,leftBottom:true,includeZero:false,fixed:true,majorLabels:true,minorTicks:true,minorLabels:true,microTicks:false,rotation:0},optionalParams:{min:0,max:1,from:0,to:1,majorTickStep:4,minorTickStep:2,microTickStep:1,labels:[],labelFunc:null,maxLabelSize:0,maxLabelCharCount:0,trailingSymbol:null},constructor:function(_b,_c){this.opt=_4.clone(this.defaultParams);du.updateWithObject(this.opt,_c);du.updateWithPattern(this.opt,_c,this.optionalParams);},dependOnData:function(){return !("min" in this.opt)||!("max" in this.opt);},clear:function(){delete this.scaler;delete this.ticks;this.dirty=true;return this;},initialized:function(){return "scaler" in this&&!(this.dirty&&this.dependOnData());},setWindow:function(_d,_e){this.scale=_d;this.offset=_e;return this.clear();},getWindowScale:function(){return "scale" in this?this.scale:1;},getWindowOffset:function(){return "offset" in this?this.offset:0;},_groupLabelWidth:function(_f,_10,_11){if(!_f.length){return 0;}if(_4.isObject(_f[0])){_f=df.map(_f,function(_12){return _12.text;});}if(_11){_f=df.map(_f,function(_13){return _4.trim(_13).length==0?"":_13.substring(0,_11)+this.trailingSymbol;},this);}var s=_f.join("<br>");return _6.gfx._base._getTextBox(s,{font:_10}).w||0;},calculate:function(min,max,_14,_15){if(this.initialized()){return this;}var o=this.opt;this.labels="labels" in o?o.labels:_15;this.scaler=_7.buildScaler(min,max,_14,o);var tsb=this.scaler.bounds;if("scale" in this){o.from=tsb.lower+this.offset;o.to=(tsb.upper-tsb.lower)/this.scale+o.from;if(!isFinite(o.from)||isNaN(o.from)||!isFinite(o.to)||isNaN(o.to)||o.to-o.from>=tsb.upper-tsb.lower){delete o.from;delete o.to;delete this.scale;delete this.offset;}else{if(o.from<tsb.lower){o.to+=tsb.lower-o.from;o.from=tsb.lower;}else{if(o.to>tsb.upper){o.from+=tsb.upper-o.to;o.to=tsb.upper;}}this.offset=o.from-tsb.lower;}this.scaler=_7.buildScaler(min,max,_14,o);tsb=this.scaler.bounds;if(this.scale==1&&this.offset==0){delete this.scale;delete this.offset;}}var ta=this.chart.theme.axis,_16=0,_17=o.rotation%360,_18=o.font||(ta.majorTick&&ta.majorTick.font)||(ta.tick&&ta.tick.font),_19=_18?g.normalizedLength(g.splitFontString(_18).size):0,_1a=Math.abs(Math.cos(_17*Math.PI/180)),_1b=Math.abs(Math.sin(_17*Math.PI/180));if(_17<0){_17+=360;}if(_19){if(this.vertical?_17!=0&&_17!=180:_17!=90&&_17!=270){if(this.labels){_16=this._groupLabelWidth(this.labels,_18,o.maxLabelCharCount);}else{var _1c=Math.ceil(Math.log(Math.max(Math.abs(tsb.from),Math.abs(tsb.to)))/Math.LN10),t=[];if(tsb.from<0||tsb.to<0){t.push("-");}t.push(_4.string.rep("9",_1c));var _1d=Math.floor(Math.log(tsb.to-tsb.from)/Math.LN10);if(_1d>0){t.push(".");t.push(_4.string.rep("9",_1d));}_16=_6.gfx._base._getTextBox(t.join(""),{font:_18}).w;}_16=o.maxLabelSize?Math.min(o.maxLabelSize,_16):_16;}else{_16=_19;}switch(_17){case 0:case 90:case 180:case 270:break;default:var _1e=Math.sqrt(_16*_16+_19*_19),_1f=this.vertical?_19*_1a+_16*_1b:_16*_1a+_19*_1b;_16=Math.min(_1e,_1f);break;}}this.scaler.minMinorStep=_16+_9;this.ticks=_7.buildTicks(this.scaler,o);return this;},getScaler:function(){return this.scaler;},getTicks:function(){return this.ticks;}});})();}}};});