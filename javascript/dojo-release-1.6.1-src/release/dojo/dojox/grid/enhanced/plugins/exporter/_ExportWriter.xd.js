/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.grid.enhanced.plugins.exporter._ExportWriter"],["require","dojox.grid.enhanced.plugins.Exporter"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.grid.enhanced.plugins.exporter._ExportWriter"]){_4._hasResource["dojox.grid.enhanced.plugins.exporter._ExportWriter"]=true;_4.provide("dojox.grid.enhanced.plugins.exporter._ExportWriter");_4.require("dojox.grid.enhanced.plugins.Exporter");_4.declare("dojox.grid.enhanced.plugins.exporter._ExportWriter",null,{constructor:function(_7){},_getExportDataForCell:function(_8,_9,_a,_b){var _c=(_a.get||_b.get).call(_a,_8,_9);if(this.formatter){return this.formatter(_c,_a,_8,_9);}else{return _c;}},beforeHeader:function(_d){return true;},afterHeader:function(){},beforeContent:function(_e){return true;},afterContent:function(){},beforeContentRow:function(_f){return true;},afterContentRow:function(_10){},beforeView:function(_11){return true;},afterView:function(_12){},beforeSubrow:function(_13){return true;},afterSubrow:function(_14){},handleCell:function(_15){},toString:function(){return "";}});}}};});