/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.charting.Theme"],["require","dojox.color"],["require","dojox.color.Palette"],["require","dojox.lang.utils"],["require","dojox.gfx.gradutils"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.charting.Theme"]){_4._hasResource["dojox.charting.Theme"]=true;_4.provide("dojox.charting.Theme");_4.require("dojox.color");_4.require("dojox.color.Palette");_4.require("dojox.lang.utils");_4.require("dojox.gfx.gradutils");_4.declare("dojox.charting.Theme",null,{shapeSpaces:{shape:1,shapeX:1,shapeY:1},constructor:function(_7){_7=_7||{};var _8=_6.charting.Theme.defaultTheme;_4.forEach(["chart","plotarea","axis","series","marker"],function(_9){this[_9]=_4.delegate(_8[_9],_7[_9]);},this);if(_7.seriesThemes&&_7.seriesThemes.length){this.colors=null;this.seriesThemes=_7.seriesThemes.slice(0);}else{this.seriesThemes=null;this.colors=(_7.colors||_6.charting.Theme.defaultColors).slice(0);}this.markerThemes=null;if(_7.markerThemes&&_7.markerThemes.length){this.markerThemes=_7.markerThemes.slice(0);}this.markers=_7.markers?_4.clone(_7.markers):_4.delegate(_6.charting.Theme.defaultMarkers);this.noGradConv=_7.noGradConv;this.noRadialConv=_7.noRadialConv;if(_7.reverseFills){this.reverseFills();}this._current=0;this._buildMarkerArray();},clone:function(){var _a=new _6.charting.Theme({chart:this.chart,plotarea:this.plotarea,axis:this.axis,series:this.series,marker:this.marker,colors:this.colors,markers:this.markers,seriesThemes:this.seriesThemes,markerThemes:this.markerThemes,noGradConv:this.noGradConv,noRadialConv:this.noRadialConv});_4.forEach(["clone","clear","next","skip","addMixin","post","getTick"],function(_b){if(this.hasOwnProperty(_b)){_a[_b]=this[_b];}},this);return _a;},clear:function(){this._current=0;},next:function(_c,_d,_e){var _f=_6.lang.utils.merge,_10,_11;if(this.colors){_10=_4.delegate(this.series);_11=_4.delegate(this.marker);var _12=new _4.Color(this.colors[this._current%this.colors.length]),old;if(_10.stroke&&_10.stroke.color){_10.stroke=_4.delegate(_10.stroke);old=new _4.Color(_10.stroke.color);_10.stroke.color=new _4.Color(_12);_10.stroke.color.a=old.a;}else{_10.stroke={color:_12};}if(_11.stroke&&_11.stroke.color){_11.stroke=_4.delegate(_11.stroke);old=new _4.Color(_11.stroke.color);_11.stroke.color=new _4.Color(_12);_11.stroke.color.a=old.a;}else{_11.stroke={color:_12};}if(!_10.fill||_10.fill.type){_10.fill=_12;}else{old=new _4.Color(_10.fill);_10.fill=new _4.Color(_12);_10.fill.a=old.a;}if(!_11.fill||_11.fill.type){_11.fill=_12;}else{old=new _4.Color(_11.fill);_11.fill=new _4.Color(_12);_11.fill.a=old.a;}}else{_10=this.seriesThemes?_f(this.series,this.seriesThemes[this._current%this.seriesThemes.length]):this.series;_11=this.markerThemes?_f(this.marker,this.markerThemes[this._current%this.markerThemes.length]):_10;}var _13=_11&&_11.symbol||this._markers[this._current%this._markers.length];var _14={series:_10,marker:_11,symbol:_13};++this._current;if(_d){_14=this.addMixin(_14,_c,_d);}if(_e){_14=this.post(_14,_c);}return _14;},skip:function(){++this._current;},addMixin:function(_15,_16,_17,_18){if(_4.isArray(_17)){_4.forEach(_17,function(m){_15=this.addMixin(_15,_16,m);},this);}else{var t={};if("color" in _17){if(_16=="line"||_16=="area"){_4.setObject("series.stroke.color",_17.color,t);_4.setObject("marker.stroke.color",_17.color,t);}else{_4.setObject("series.fill",_17.color,t);}}_4.forEach(["stroke","outline","shadow","fill","font","fontColor","labelWiring"],function(_19){var _1a="marker"+_19.charAt(0).toUpperCase()+_19.substr(1),b=_1a in _17;if(_19 in _17){_4.setObject("series."+_19,_17[_19],t);if(!b){_4.setObject("marker."+_19,_17[_19],t);}}if(b){_4.setObject("marker."+_19,_17[_1a],t);}});if("marker" in _17){t.symbol=_17.marker;}_15=_6.lang.utils.merge(_15,t);}if(_18){_15=this.post(_15,_16);}return _15;},post:function(_1b,_1c){var _1d=_1b.series.fill,t;if(!this.noGradConv&&this.shapeSpaces[_1d.space]&&_1d.type=="linear"){if(_1c=="bar"){t={x1:_1d.y1,y1:_1d.x1,x2:_1d.y2,y2:_1d.x2};}else{if(!this.noRadialConv&&_1d.space=="shape"&&(_1c=="slice"||_1c=="circle")){t={type:"radial",cx:0,cy:0,r:100};}}if(t){return _6.lang.utils.merge(_1b,{series:{fill:t}});}}return _1b;},getTick:function(_1e,_1f){var _20=this.axis.tick,_21=_1e+"Tick";merge=_6.lang.utils.merge;if(_20){if(this.axis[_21]){_20=merge(_20,this.axis[_21]);}}else{_20=this.axis[_21];}if(_1f){if(_20){if(_1f[_21]){_20=merge(_20,_1f[_21]);}}else{_20=_1f[_21];}}return _20;},inspectObjects:function(f){_4.forEach(["chart","plotarea","axis","series","marker"],function(_22){f(this[_22]);},this);if(this.seriesThemes){_4.forEach(this.seriesThemes,f);}if(this.markerThemes){_4.forEach(this.markerThemes,f);}},reverseFills:function(){this.inspectObjects(function(o){if(o&&o.fill){o.fill=_6.gfx.gradutils.reverse(o.fill);}});},addMarker:function(_23,_24){this.markers[_23]=_24;this._buildMarkerArray();},setMarkers:function(obj){this.markers=obj;this._buildMarkerArray();},_buildMarkerArray:function(){this._markers=[];for(var p in this.markers){this._markers.push(this.markers[p]);}}});_4.mixin(_6.charting.Theme,{defaultMarkers:{CIRCLE:"m-3,0 c0,-4 6,-4 6,0 m-6,0 c0,4 6,4 6,0",SQUARE:"m-3,-3 l0,6 6,0 0,-6 z",DIAMOND:"m0,-3 l3,3 -3,3 -3,-3 z",CROSS:"m0,-3 l0,6 m-3,-3 l6,0",X:"m-3,-3 l6,6 m0,-6 l-6,6",TRIANGLE:"m-3,3 l3,-6 3,6 z",TRIANGLE_INVERTED:"m-3,-3 l3,6 3,-6 z"},defaultColors:["#54544c","#858e94","#6e767a","#948585","#474747"],defaultTheme:{chart:{stroke:null,fill:"white",pageStyle:null,titleGap:20,titlePos:"top",titleFont:"normal normal bold 14pt Tahoma",titleFontColor:"#333"},plotarea:{stroke:null,fill:"white"},axis:{stroke:{color:"#333",width:1},tick:{color:"#666",position:"center",font:"normal normal normal 7pt Tahoma",fontColor:"#333",titleGap:15,titleFont:"normal normal normal 11pt Tahoma",titleFontColor:"#333",titleOrientation:"axis"},majorTick:{width:1,length:6},minorTick:{width:0.8,length:3},microTick:{width:0.5,length:1}},series:{stroke:{width:1.5,color:"#333"},outline:{width:0.1,color:"#ccc"},shadow:null,fill:"#ccc",font:"normal normal normal 8pt Tahoma",fontColor:"#000",labelWiring:{width:1,color:"#ccc"}},marker:{stroke:{width:1.5,color:"#333"},outline:{width:0.1,color:"#ccc"},shadow:null,fill:"#ccc",font:"normal normal normal 8pt Tahoma",fontColor:"#000"}},defineColors:function(_25){_25=_25||{};var c=[],n=_25.num||5;if(_25.colors){var l=_25.colors.length;for(var i=0;i<n;i++){c.push(_25.colors[i%l]);}return c;}if(_25.hue){var s=_25.saturation||100;var st=_25.low||30;var end=_25.high||90;var l=(end+st)/2;return _6.color.Palette.generate(_6.color.fromHsv(_25.hue,s,l),"monochromatic").colors;}if(_25.generator){return _6.color.Palette.generate(_25.base,_25.generator).colors;}return c;},generateGradient:function(_26,_27,_28){var _29=_4.delegate(_26);_29.colors=[{offset:0,color:_27},{offset:1,color:_28}];return _29;},generateHslColor:function(_2a,_2b){_2a=new _6.color.Color(_2a);var hsl=_2a.toHsl(),_2c=_6.color.fromHsl(hsl.h,hsl.s,_2b);_2c.a=_2a.a;return _2c;},generateHslGradient:function(_2d,_2e,_2f,_30){_2d=new _6.color.Color(_2d);var hsl=_2d.toHsl(),_31=_6.color.fromHsl(hsl.h,hsl.s,_2f),_32=_6.color.fromHsl(hsl.h,hsl.s,_30);_31.a=_32.a=_2d.a;return _6.charting.Theme.generateGradient(_2e,_31,_32);}});}}};});