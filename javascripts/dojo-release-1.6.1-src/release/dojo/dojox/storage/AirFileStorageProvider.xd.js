/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.storage.AirFileStorageProvider"],["require","dojox.storage.manager"],["require","dojox.storage.Provider"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.storage.AirFileStorageProvider"]){_4._hasResource["dojox.storage.AirFileStorageProvider"]=true;_4.provide("dojox.storage.AirFileStorageProvider");_4.require("dojox.storage.manager");_4.require("dojox.storage.Provider");if(_4.isAIR){(function(){if(!_7){var _7={};}_7.File=window.runtime.flash.filesystem.File;_7.FileStream=window.runtime.flash.filesystem.FileStream;_7.FileMode=window.runtime.flash.filesystem.FileMode;_4.declare("dojox.storage.AirFileStorageProvider",[_6.storage.Provider],{initialized:false,_storagePath:"__DOJO_STORAGE/",initialize:function(){this.initialized=false;try{var _8=_7.File.applicationStorageDirectory.resolvePath(this._storagePath);if(!_8.exists){_8.createDirectory();}this.initialized=true;}catch(e){console.debug("dojox.storage.AirFileStorageProvider.initialize:",e);}_6.storage.manager.loaded();},isAvailable:function(){return true;},put:function(_9,_a,_b,_c){if(this.isValidKey(_9)==false){throw new Error("Invalid key given: "+_9);}_c=_c||this.DEFAULT_NAMESPACE;if(this.isValidKey(_c)==false){throw new Error("Invalid namespace given: "+_c);}try{this.remove(_9,_c);var _d=_7.File.applicationStorageDirectory.resolvePath(this._storagePath+_c);if(!_d.exists){_d.createDirectory();}var _e=_d.resolvePath(_9);var _f=new _7.FileStream();_f.open(_e,_7.FileMode.WRITE);_f.writeObject(_a);_f.close();}catch(e){console.debug("dojox.storage.AirFileStorageProvider.put:",e);_b(this.FAILED,_9,e.toString(),_c);return;}if(_b){_b(this.SUCCESS,_9,null,_c);}},get:function(key,_10){if(this.isValidKey(key)==false){throw new Error("Invalid key given: "+key);}_10=_10||this.DEFAULT_NAMESPACE;var _11=null;var _12=_7.File.applicationStorageDirectory.resolvePath(this._storagePath+_10+"/"+key);if(_12.exists&&!_12.isDirectory){var _13=new _7.FileStream();_13.open(_12,_7.FileMode.READ);_11=_13.readObject();_13.close();}return _11;},getNamespaces:function(){var _14=[this.DEFAULT_NAMESPACE];var dir=_7.File.applicationStorageDirectory.resolvePath(this._storagePath);var _15=dir.getDirectoryListing(),i;for(i=0;i<_15.length;i++){if(_15[i].isDirectory&&_15[i].name!=this.DEFAULT_NAMESPACE){_14.push(_15[i].name);}}return _14;},getKeys:function(_16){_16=_16||this.DEFAULT_NAMESPACE;if(this.isValidKey(_16)==false){throw new Error("Invalid namespace given: "+_16);}var _17=[];var dir=_7.File.applicationStorageDirectory.resolvePath(this._storagePath+_16);if(dir.exists&&dir.isDirectory){var _18=dir.getDirectoryListing(),i;for(i=0;i<_18.length;i++){_17.push(_18[i].name);}}return _17;},clear:function(_19){if(this.isValidKey(_19)==false){throw new Error("Invalid namespace given: "+_19);}var dir=_7.File.applicationStorageDirectory.resolvePath(this._storagePath+_19);if(dir.exists&&dir.isDirectory){dir.deleteDirectory(true);}},remove:function(key,_1a){_1a=_1a||this.DEFAULT_NAMESPACE;var _1b=_7.File.applicationStorageDirectory.resolvePath(this._storagePath+_1a+"/"+key);if(_1b.exists&&!_1b.isDirectory){_1b.deleteFile();}},putMultiple:function(_1c,_1d,_1e,_1f){if(this.isValidKeyArray(_1c)===false||!_1d instanceof Array||_1c.length!=_1d.length){throw new Error("Invalid arguments: keys = ["+_1c+"], values = ["+_1d+"]");}if(_1f==null||typeof _1f=="undefined"){_1f=this.DEFAULT_NAMESPACE;}if(this.isValidKey(_1f)==false){throw new Error("Invalid namespace given: "+_1f);}this._statusHandler=_1e;try{for(var i=0;i<_1c.length;i++){this.put(_1c[i],_1d[i],null,_1f);}}catch(e){console.debug("dojox.storage.AirFileStorageProvider.putMultiple:",e);if(_1e){_1e(this.FAILED,_1c,e.toString(),_1f);}return;}if(_1e){_1e(this.SUCCESS,_1c,null,_1f);}},getMultiple:function(_20,_21){if(this.isValidKeyArray(_20)===false){throw new Error("Invalid key array given: "+_20);}if(_21==null||typeof _21=="undefined"){_21=this.DEFAULT_NAMESPACE;}if(this.isValidKey(_21)==false){throw new Error("Invalid namespace given: "+_21);}var _22=[];for(var i=0;i<_20.length;i++){_22[i]=this.get(_20[i],_21);}return _22;},removeMultiple:function(_23,_24){_24=_24||this.DEFAULT_NAMESPACE;for(var i=0;i<_23.length;i++){this.remove(_23[i],_24);}},isPermanent:function(){return true;},getMaximumSize:function(){return this.SIZE_NO_LIMIT;},hasSettingsUI:function(){return false;},showSettingsUI:function(){throw new Error(this.declaredClass+" does not support a storage settings user-interface");},hideSettingsUI:function(){throw new Error(this.declaredClass+" does not support a storage settings user-interface");}});_6.storage.manager.register("dojox.storage.AirFileStorageProvider",new _6.storage.AirFileStorageProvider());_6.storage.manager.initialize();})();}}}};});