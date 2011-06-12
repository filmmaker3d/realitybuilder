/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["com.realitybuilder.PrerenderMode"]){dojo._hasResource["com.realitybuilder.PrerenderMode"]=true;dojo.provide("com.realitybuilder.PrerenderMode");dojo.declare("com.realitybuilder.PrerenderMode",null,{_versionOnServer:"-1",_isEnabled:null,_makeRealAfter:null,_blockConfigurations:null,_imageUrlTemplate:null,versionOnServer:function(){return this._versionOnServer;},isInitializedWithServerData:function(){return this._versionOnServer!=="-1";},updateWithServerData:function(_1){this._versionOnServer=_1.version;this._isEnabled=_1.isEnabled;this._makeRealAfter=_1.makeRealAfter;this._blockConfigurations=_1.blockConfigurations;this._imageUrlTemplate=_1.imageUrlTemplate;dojo.publish("com/realitybuilder/PrerenderMode/changed");},isEnabled:function(){return this._isEnabled;},makeRealAfter:function(){return this._makeRealAfter;},_blockConfigurationSetKey:function(_2){return _2.xB()+","+_2.yB()+","+_2.zB()+","+_2.a();},_blockConfigurationSet:function(_3,_4){var _5={},_6=this._blockConfigurationSetKey;dojo.forEach(_3,function(_7){_5[_6(_7)]=true;});_5[_6(_4)]=true;return _5;},_setIsEmpty:function(_8){var _9;for(_9 in _8){if(_8.hasOwnProperty(_9)){return false;}}return true;},_blockConfigurationMatches:function(_a,_b,_c){var _d,i,_e,_f;_d=this._blockConfigurationSet(_b,_c);for(i=0;i<_a.length;i+=1){_e=_a[i];_f=_e[0]+","+_e[1]+","+_e[2]+","+_e[3];if(typeof _d[_f]==="undefined"){return false;}else{delete _d[_f];}}return this._setIsEmpty(_d);},matchingBlockConfiguration:function(_10,_11){var i,_12;for(i=0;i<this._blockConfigurations.length;i+=1){_12=this._blockConfigurations[i];if(this._blockConfigurationMatches(_12,_10,_11)){return i;}}return false;},imageUrl:function(i){return this._imageUrlTemplate.replace("%d",i);}});}