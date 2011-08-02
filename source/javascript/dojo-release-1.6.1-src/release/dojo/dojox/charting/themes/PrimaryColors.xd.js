/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.charting.themes.PrimaryColors"],["require","dojox.charting.Theme"],["require","dojox.charting.themes.gradientGenerator"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.charting.themes.PrimaryColors"]){_4._hasResource["dojox.charting.themes.PrimaryColors"]=true;_4.provide("dojox.charting.themes.PrimaryColors");_4.require("dojox.charting.Theme");_4.require("dojox.charting.themes.gradientGenerator");(function(){var dc=_6.charting,_7=dc.themes,_8=["#f00","#0f0","#00f","#ff0","#0ff","#f0f"],_9={type:"linear",space:"plot",x1:0,y1:0,x2:0,y2:100};_7.PrimaryColors=new dc.Theme({seriesThemes:_7.gradientGenerator.generateMiniTheme(_8,_9,90,40,25)});})();}}};});