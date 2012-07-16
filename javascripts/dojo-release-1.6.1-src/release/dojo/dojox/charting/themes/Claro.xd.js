/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.charting.themes.Claro"],["require","dojox.gfx.gradutils"],["require","dojox.charting.Theme"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.charting.themes.Claro"]){_4._hasResource["dojox.charting.themes.Claro"]=true;_4.provide("dojox.charting.themes.Claro");_4.require("dojox.gfx.gradutils");_4.require("dojox.charting.Theme");(function(){var dc=_6.charting,_7=dc.themes,_8=dc.Theme,g=_8.generateGradient,_9={type:"linear",space:"shape",x1:0,y1:0,x2:0,y2:100};_7.Claro=new dc.Theme({chart:{fill:{type:"linear",x1:0,x2:0,y1:0,y2:100,colors:[{offset:0,color:"#dbdbdb"},{offset:1,color:"#efefef"}]},stroke:{color:"#b5bcc7"}},plotarea:{fill:{type:"linear",x1:0,x2:0,y1:0,y2:100,colors:[{offset:0,color:"#dbdbdb"},{offset:1,color:"#efefef"}]}},axis:{stroke:{color:"#888c76",width:1},tick:{color:"#888c76",position:"center",font:"normal normal normal 7pt Verdana, Arial, sans-serif",fontColor:"#888c76"}},series:{stroke:{width:2.5,color:"#fff"},outline:null,font:"normal normal normal 7pt Verdana, Arial, sans-serif",fontColor:"#131313"},marker:{stroke:{width:1.25,color:"#131313"},outline:{width:1.25,color:"#131313"},font:"normal normal normal 8pt Verdana, Arial, sans-serif",fontColor:"#131313"},seriesThemes:[{fill:g(_9,"#2a6ead","#3a99f2")},{fill:g(_9,"#613e04","#996106")},{fill:g(_9,"#0e3961","#155896")},{fill:g(_9,"#55aafa","#3f7fba")},{fill:g(_9,"#ad7b2a","#db9b35")}],markerThemes:[{fill:"#2a6ead",stroke:{color:"#fff"}},{fill:"#613e04",stroke:{color:"#fff"}},{fill:"#0e3961",stroke:{color:"#fff"}},{fill:"#55aafa",stroke:{color:"#fff"}},{fill:"#ad7b2a",stroke:{color:"#fff"}}]});_7.Claro.next=function(_a,_b,_c){var _d=_a=="line";if(_d||_a=="area"){var s=this.seriesThemes[this._current%this.seriesThemes.length],m=this.markerThemes[this._current%this.markerThemes.length];s.fill.space="plot";if(_d){s.stroke={width:4,color:s.fill.colors[0].color};}m.outline={width:1.25,color:m.fill};var _e=_8.prototype.next.apply(this,arguments);delete s.outline;delete s.stroke;s.fill.space="shape";return _e;}else{if(_a=="candlestick"){var s=this.seriesThemes[this._current%this.seriesThemes.length];s.fill.space="plot";s.stroke={width:1,color:s.fill.colors[0].color};var _e=_8.prototype.next.apply(this,arguments);return _e;}}return _8.prototype.next.apply(this,arguments);};_7.Claro.post=function(_f,_10){_f=_8.prototype.post.apply(this,arguments);if((_10=="slice"||_10=="circle")&&_f.series.fill&&_f.series.fill.type=="radial"){_f.series.fill=_6.gfx.gradutils.reverse(_f.series.fill);}return _f;};})();}}};});