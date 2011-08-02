/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.charting.themes.PlotKit.blue"],["require","dojox.charting.themes.PlotKit.base"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.charting.themes.PlotKit.blue"]){_4._hasResource["dojox.charting.themes.PlotKit.blue"]=true;_4.provide("dojox.charting.themes.PlotKit.blue");_4.require("dojox.charting.themes.PlotKit.base");(function(){var dc=_6.charting,pk=dc.themes.PlotKit;pk.blue=pk.base.clone();pk.blue.chart.fill=pk.blue.plotarea.fill="#e7eef6";pk.blue.colors=dc.Theme.defineColors({hue:217,saturation:60,low:40,high:88});})();}}};});