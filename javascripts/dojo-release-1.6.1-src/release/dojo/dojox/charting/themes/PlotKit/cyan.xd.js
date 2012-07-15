/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.charting.themes.PlotKit.cyan"],["require","dojox.charting.themes.PlotKit.base"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.charting.themes.PlotKit.cyan"]){_4._hasResource["dojox.charting.themes.PlotKit.cyan"]=true;_4.provide("dojox.charting.themes.PlotKit.cyan");_4.require("dojox.charting.themes.PlotKit.base");(function(){var dc=_6.charting,pk=dc.themes.PlotKit;pk.cyan=pk.base.clone();pk.cyan.chart.fill=pk.cyan.plotarea.fill="#e6f1f5";pk.cyan.colors=dc.Theme.defineColors({hue:194,saturation:60,low:40,high:88});})();}}};});