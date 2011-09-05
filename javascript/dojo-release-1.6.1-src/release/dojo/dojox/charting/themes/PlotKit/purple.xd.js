/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.charting.themes.PlotKit.purple"],["require","dojox.charting.themes.PlotKit.base"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.charting.themes.PlotKit.purple"]){_4._hasResource["dojox.charting.themes.PlotKit.purple"]=true;_4.provide("dojox.charting.themes.PlotKit.purple");_4.require("dojox.charting.themes.PlotKit.base");(function(){var dc=_6.charting,pk=dc.themes.PlotKit;pk.purple=pk.base.clone();pk.purple.chart.fill=pk.purple.plotarea.fill="#eee6f5";pk.purple.colors=dc.Theme.defineColors({hue:271,saturation:60,low:40,high:88});})();}}};});