/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojo.store.util.SimpleQueryEngine"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojo.store.util.SimpleQueryEngine"]){_4._hasResource["dojo.store.util.SimpleQueryEngine"]=true;_4.provide("dojo.store.util.SimpleQueryEngine");_4.getObject("store.util",true,_4);_4.store.util.SimpleQueryEngine=function(_7,_8){switch(typeof _7){default:throw new Error("Can not query with a "+typeof _7);case "object":case "undefined":var _9=_7;_7=function(_a){for(var _b in _9){var _c=_9[_b];if(_c&&_c.test){if(!_c.test(_a[_b])){return false;}}else{if(_c!=_a[_b]){return false;}}}return true;};break;case "string":if(!this[_7]){throw new Error("No filter function "+_7+" was found in store");}_7=this[_7];case "function":}function _d(_e){var _f=_4.filter(_e,_7);if(_8&&_8.sort){_f.sort(function(a,b){for(var _10,i=0;_10=_8.sort[i];i++){var _11=a[_10.attribute];var _12=b[_10.attribute];if(_11!=_12){return !!_10.descending==_11>_12?-1:1;}}return 0;});}if(_8&&(_8.start||_8.count)){var _13=_f.length;_f=_f.slice(_8.start||0,(_8.start||0)+(_8.count||Infinity));_f.total=_13;}return _f;};_d.matches=_7;return _d;};}}};});