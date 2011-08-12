/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojo.DeferredList"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojo.DeferredList"]){_4._hasResource["dojo.DeferredList"]=true;_4.provide("dojo.DeferredList");_4.DeferredList=function(_7,_8,_9,_a,_b){var _c=[];_4.Deferred.call(this);var _d=this;if(_7.length===0&&!_8){this.resolve([0,[]]);}var _e=0;_4.forEach(_7,function(_f,i){_f.then(function(_10){if(_8){_d.resolve([i,_10]);}else{_11(true,_10);}},function(_12){if(_9){_d.reject(_12);}else{_11(false,_12);}if(_a){return null;}throw _12;});function _11(_13,_14){_c[i]=[_13,_14];_e++;if(_e===_7.length){_d.resolve(_c);}};});};_4.DeferredList.prototype=new _4.Deferred();_4.DeferredList.prototype.gatherResults=function(_15){var d=new _4.DeferredList(_15,false,true,false);d.addCallback(function(_16){var ret=[];_4.forEach(_16,function(_17){ret.push(_17[1]);});return ret;});return d;};}}};});