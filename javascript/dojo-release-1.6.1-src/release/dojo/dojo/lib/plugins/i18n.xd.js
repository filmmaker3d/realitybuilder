/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {defineResource:function(_4,_5,_6){define(["dojo"],function(_7){var _8=/(^.*(^|\/)nls(\/|$))([^\/]*)\/?([^\/]*)/,_9=function(_a,_b,_c,_d){for(var _e=[_c+_d],_f=_b.split("-"),_10="",i=0;i<_f.length;i++){_10+=_f[i];if(_a[_10]){_e.push(_c+_10+"/"+_d);}}return _e;},_11={};return {load:function(id,_12,_13){var _14=_8.exec(id),_15=(_12.toAbsMid&&_12.toAbsMid(_14[1]))||_14[1],_16=_14[5]||_14[4],_17=_15+_16,_18=(_14[5]&&_14[4])||_7.locale,_19=_17+"/"+_18;if(_11[_19]){_13(_11[_19]);return;}_12([_17],function(_1a){var _1b=_11[_17+"/"]=_7.clone(_1a.root),_1c=_9(_1a,_18,_15,_16);_12(_1c,function(){for(var i=1;i<_1c.length;i++){_11[_17+"/"+_1c[i]]=_1b=_7.mixin(_7.clone(_1b),arguments[i]);}_11[_19]=_1b;_13(_1b);});});},cache:function(mid,_1d){_11[mid]=_1d;}};});}};});