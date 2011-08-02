/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {defineResource:function(_4,_5,_6){define(["require","dojo/_base/_loader/bootstrap"],function(_7,_8){var _9=["_moduleHasPrefix","_loadPath","_loadUri","_loadUriAndCheck","loaded","_callLoaded","_getModuleSymbols","_loadModule","require","provide","platformRequire","requireIf","requireAfterIf","registerModulePath"],i,_a;for(i=0;i<_9.length;){_a=_9[i++];_8[_a]=(function(_b){return function(){console.warn("dojo."+_b+" not available when using an AMD loader.");};})(_a);}var _c=function(_d){var _e=[],i;for(i=0;i<_d.length;){_e.push(_d[i++]);}return _e;},_f=function(_10,_11){if(_11){return (typeof _11=="string")?function(){_10[_11]();}:function(){_11.call(_10);};}else{return _10;}};_8.ready=_8.addOnLoad=function(_12,_13){_7.ready(_13?_f(_12,_13):_12);};_8.addOnLoad(function(){_8.postLoad=_8.config.afterOnLoad=true;});var dca=_8.config.addOnLoad;if(dca){_8.addOnLoad[(dca instanceof Array?"apply":"call")](_8,dca);}var _14=_8._loaders=[],_15=function(){var _16=_14.slice(0);Array.prototype.splice.apply(_14,[0,_14.length]);while(_16.length){_16.shift().call();}};_14.unshift=function(){Array.prototype.unshift.apply(_14,_c(arguments));_7.ready(_15);};_14.splice=function(){Array.prototype.splice.apply(_14,_c(arguments));_7.ready(_15);};var _17=_8._unloaders=[];_8.unloaded=function(){while(_17.length){_17.pop().call();}};_8._onto=function(arr,obj,fn){arr.push(fn?_f(obj,fn):obj);};_8._modulesLoaded=function(){};_8.loadInit=function(_18){_18();};var _19=function(_1a){return _1a.replace(/\./g,"/");};_8.getL10nName=function(_1b,_1c,_1d){_1d=_1d?_1d.toLowerCase():_8.locale;_1b="i18n!"+_19(_1b);return (/root/i.test(_1d))?(_1b+"/nls/"+_1c):(_1b+"/nls/"+_1d+"/"+_1c);};_8.requireLocalization=function(_1e,_1f,_20){if(_7.vendor!="altoviso.com"){_20=!_20||_20.toLowerCase()===_8.locale?"root":_20;}return _7(_8.getL10nName(_1e,_1f,_20));};_8.i18n={getLocalization:_8.requireLocalization,normalizeLocale:function(_21){var _22=_21?_21.toLowerCase():_8.locale;if(_22=="root"){_22="ROOT";}return _22;}};var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");_8._Url=function(){var n=null,_23=arguments,uri=[_23[0]];for(var i=1;i<_23.length;i++){if(!_23[i]){continue;}var _24=new _8._Url(_23[i]+""),_25=new _8._Url(uri[0]+"");if(_24.path==""&&!_24.scheme&&!_24.authority&&!_24.query){if(_24.fragment!=n){_25.fragment=_24.fragment;}_24=_25;}else{if(!_24.scheme){_24.scheme=_25.scheme;if(!_24.authority){_24.authority=_25.authority;if(_24.path.charAt(0)!="/"){var _26=_25.path.substring(0,_25.path.lastIndexOf("/")+1)+_24.path;var _27=_26.split("/");for(var j=0;j<_27.length;j++){if(_27[j]=="."){if(j==_27.length-1){_27[j]="";}else{_27.splice(j,1);j--;}}else{if(j>0&&!(j==1&&_27[0]=="")&&_27[j]==".."&&_27[j-1]!=".."){if(j==(_27.length-1)){_27.splice(j,1);_27[j-1]="";}else{_27.splice(j-1,2);j-=2;}}}}_24.path=_27.join("/");}}}}uri=[];if(_24.scheme){uri.push(_24.scheme,":");}if(_24.authority){uri.push("//",_24.authority);}uri.push(_24.path);if(_24.query){uri.push("?",_24.query);}if(_24.fragment){uri.push("#",_24.fragment);}}this.uri=uri.join("");var r=this.uri.match(ore);this.scheme=r[2]||(r[1]?"":n);this.authority=r[4]||(r[3]?"":n);this.path=r[5];this.query=r[7]||(r[6]?"":n);this.fragment=r[9]||(r[8]?"":n);if(this.authority!=n){r=this.authority.match(ire);this.user=r[3]||n;this.password=r[4]||n;this.host=r[6]||r[7];this.port=r[9]||n;}};_8._Url.prototype.toString=function(){return this.uri;};_8.moduleUrl=function(_28,url){if(!_28){return null;}_28=_19(_28)+(url?("/"+url):"");var _29="",_2a=_28.match(/(.+)(\.[^\/]*)$/);if(_2a){_28=_2a[1];_29=_2a[2];}return new _8._Url(_7.nameToUrl(_28,_29));};return _8;});}};});