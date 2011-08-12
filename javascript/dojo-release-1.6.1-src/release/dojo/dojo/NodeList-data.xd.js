/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojo.NodeList-data"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojo.NodeList-data"]){_4._hasResource["dojo.NodeList-data"]=true;_4.provide("dojo.NodeList-data");(function(d){var _7={},x=0,_8="data-dojo-dataid",nl=d.NodeList,_9=function(_a){var _b=d.attr(_a,_8);if(!_b){_b="pid"+(x++);d.attr(_a,_8,_b);}return _b;};var _c=d._nodeData=function(_d,_e,_f){var pid=_9(_d),r;if(!_7[pid]){_7[pid]={};}if(arguments.length==1){r=_7[pid];}if(typeof _e=="string"){if(arguments.length>2){_7[pid][_e]=_f;}else{r=_7[pid][_e];}}else{r=d._mixin(_7[pid],_e);}return r;};var _10=d._removeNodeData=function(_11,key){var pid=_9(_11);if(_7[pid]){if(key){delete _7[pid][key];}else{delete _7[pid];}}};d._gcNodeData=function(){var _12=_4.query("["+_8+"]").map(_9);for(var i in _7){if(_4.indexOf(_12,i)<0){delete _7[i];}}};d.extend(nl,{data:nl._adaptWithCondition(_c,function(a){return a.length===0||a.length==1&&(typeof a[0]=="string");}),removeData:nl._adaptAsForEach(_10)});})(_4);}}};});