/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.lang.utils"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.lang.utils"]){_4._hasResource["dojox.lang.utils"]=true;_4.provide("dojox.lang.utils");(function(){var _7={},du=_6.lang.utils,_8=Object.prototype.toString;var _9=function(o){if(o){switch(_8.call(o)){case "[object Array]":return o.slice(0);case "[object Object]":return _4.delegate(o);}}return o;};_4.mixin(du,{coerceType:function(_a,_b){switch(typeof _a){case "number":return Number(eval("("+_b+")"));case "string":return String(_b);case "boolean":return Boolean(eval("("+_b+")"));}return eval("("+_b+")");},updateWithObject:function(_c,_d,_e){if(!_d){return _c;}for(var x in _c){if(x in _d&&!(x in _7)){var t=_c[x];if(t&&typeof t=="object"){du.updateWithObject(t,_d[x],_e);}else{_c[x]=_e?du.coerceType(t,_d[x]):_9(_d[x]);}}}return _c;},updateWithPattern:function(_f,_10,_11,_12){if(!_10||!_11){return _f;}for(var x in _11){if(x in _10&&!(x in _7)){_f[x]=_12?du.coerceType(_11[x],_10[x]):_9(_10[x]);}}return _f;},merge:function(_13,_14){if(_14){var _15=_8.call(_13),_16=_8.call(_14),t,i,l,m;switch(_16){case "[object Array]":if(_16==_15){t=new Array(Math.max(_13.length,_14.length));for(i=0,l=t.length;i<l;++i){t[i]=du.merge(_13[i],_14[i]);}return t;}return _14.slice(0);case "[object Object]":if(_16==_15&&_13){t=_4.delegate(_13);for(i in _14){if(i in _13){l=_13[i];m=_14[i];if(m!==l){t[i]=du.merge(l,m);}}else{t[i]=_4.clone(_14[i]);}}return t;}return _4.clone(_14);}}return _14;}});})();}}};});