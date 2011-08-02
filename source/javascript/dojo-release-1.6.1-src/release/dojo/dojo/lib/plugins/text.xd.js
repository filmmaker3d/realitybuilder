/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {defineResource:function(_4,_5,_6){define(["dojo","dojo/cache"],function(_7){var _8={},_9=function(_a,_b,_c){_8[_a]=_c;_7.cache({toString:function(){return _b;}},_c);},_d=function(_e){if(_e){_e=_e.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");var _f=_e.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);if(_f){_e=_f[1];}}else{_e="";}return _e;};return {load:function(id,_10,_11){var _12,_13,url,_14=id.split("!");if(_10.toAbsMid){_12=_14[0].match(/(.+)(\.[^\/]*)$/);_13=_12?_10.toAbsMid(_12[1])+_12[2]:_10.toAbsMid(_14[0]);if(_13 in _8){_11(_14[1]=="strip"?_d(_8[_13]):_8[_13]);return;}}url=_10.toUrl(_14[0]);_7.xhrGet({url:url,load:function(_15){_13&&_9(_13,url,_15);_11(_14[1]=="strip"?_d(_15):_15);}});},cache:function(_16,mid,_17,_18){_9(_16,require.nameToUrl(mid)+_17,_18);}};});}};});