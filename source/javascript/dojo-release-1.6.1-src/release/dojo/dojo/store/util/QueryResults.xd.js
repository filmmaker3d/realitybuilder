/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojo.store.util.QueryResults"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojo.store.util.QueryResults"]){_4._hasResource["dojo.store.util.QueryResults"]=true;_4.provide("dojo.store.util.QueryResults");_4.getObject("store.util",true,_4);_4.store.util.QueryResults=function(_7){if(!_7){return _7;}if(_7.then){_7=_4.delegate(_7);}function _8(_9){if(!_7[_9]){_7[_9]=function(){var _a=arguments;return _4.when(_7,function(_b){Array.prototype.unshift.call(_a,_b);return _4.store.util.QueryResults(_4[_9].apply(_4,_a));});};}};_8("forEach");_8("filter");_8("map");if(!_7.total){_7.total=_4.when(_7,function(_c){return _c.length;});}return _7;};}}};});