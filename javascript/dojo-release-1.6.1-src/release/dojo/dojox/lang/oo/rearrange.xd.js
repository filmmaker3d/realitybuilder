/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.lang.oo.rearrange"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.lang.oo.rearrange"]){_4._hasResource["dojox.lang.oo.rearrange"]=true;_4.provide("dojox.lang.oo.rearrange");(function(){var _7=_4._extraNames,_8=_7.length,_9=Object.prototype.toString,_a={};_6.lang.oo.rearrange=function(_b,_c){var _d,_e,_f,i,t;for(_d in _c){_e=_c[_d];if(!_e||_9.call(_e)=="[object String]"){_f=_b[_d];if(!(_d in _a)||_a[_d]!==_f){if(!(delete _b[_d])){_b[_d]=undefined;}if(_e){_b[_e]=_f;}}}}if(_8){for(i=0;i<_8;++i){_d=_7[i];_e=_c[_d];if(!_e||_9.call(_e)=="[object String]"){_f=_b[_d];if(!(_d in _a)||_a[_d]!==_f){if(!(delete _b[_d])){_b[_d]=undefined;}if(_e){_b[_e]=_f;}}}}}return _b;};})();}}};});