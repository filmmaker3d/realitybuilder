/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.data.FileStore"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.data.FileStore"]){_4._hasResource["dojox.data.FileStore"]=true;_4.provide("dojox.data.FileStore");_4.declare("dojox.data.FileStore",null,{constructor:function(_7){if(_7&&_7.label){this.label=_7.label;}if(_7&&_7.url){this.url=_7.url;}if(_7&&_7.options){if(_4.isArray(_7.options)){this.options=_7.options;}else{if(_4.isString(_7.options)){this.options=_7.options.split(",");}}}if(_7&&_7.pathAsQueryParam){this.pathAsQueryParam=true;}if(_7&&"urlPreventCache" in _7){this.urlPreventCache=_7.urlPreventCache?true:false;}},url:"",_storeRef:"_S",label:"name",_identifier:"path",_attributes:["children","directory","name","path","modified","size","parentDir"],pathSeparator:"/",options:[],failOk:false,urlPreventCache:true,_assertIsItem:function(_8){if(!this.isItem(_8)){throw new Error("dojox.data.FileStore: a function was passed an item argument that was not an item");}},_assertIsAttribute:function(_9){if(typeof _9!=="string"){throw new Error("dojox.data.FileStore: a function was passed an attribute argument that was not an attribute name string");}},pathAsQueryParam:false,getFeatures:function(){return {"dojo.data.api.Read":true,"dojo.data.api.Identity":true};},getValue:function(_a,_b,_c){var _d=this.getValues(_a,_b);if(_d&&_d.length>0){return _d[0];}return _c;},getAttributes:function(_e){return this._attributes;},hasAttribute:function(_f,_10){this._assertIsItem(_f);this._assertIsAttribute(_10);return (_10 in _f);},getIdentity:function(_11){return this.getValue(_11,this._identifier);},getIdentityAttributes:function(_12){return [this._identifier];},isItemLoaded:function(_13){var _14=this.isItem(_13);if(_14&&typeof _13._loaded=="boolean"&&!_13._loaded){_14=false;}return _14;},loadItem:function(_15){var _16=_15.item;var _17=this;var _18=_15.scope||_4.global;var _19={};if(this.options.length>0){_19.options=_4.toJson(this.options);}if(this.pathAsQueryParam){_19.path=_16.parentPath+this.pathSeparator+_16.name;}var _1a={url:this.pathAsQueryParam?this.url:this.url+"/"+_16.parentPath+"/"+_16.name,handleAs:"json-comment-optional",content:_19,preventCache:this.urlPreventCache,failOk:this.failOk};var _1b=_4.xhrGet(_1a);_1b.addErrback(function(_1c){if(_15.onError){_15.onError.call(_18,_1c);}});_1b.addCallback(function(_1d){delete _16.parentPath;delete _16._loaded;_4.mixin(_16,_1d);_17._processItem(_16);if(_15.onItem){_15.onItem.call(_18,_16);}});},getLabel:function(_1e){return this.getValue(_1e,this.label);},getLabelAttributes:function(_1f){return [this.label];},containsValue:function(_20,_21,_22){var _23=this.getValues(_20,_21);for(var i=0;i<_23.length;i++){if(_23[i]==_22){return true;}}return false;},getValues:function(_24,_25){this._assertIsItem(_24);this._assertIsAttribute(_25);var _26=_24[_25];if(typeof _26!=="undefined"&&!_4.isArray(_26)){_26=[_26];}else{if(typeof _26==="undefined"){_26=[];}}return _26;},isItem:function(_27){if(_27&&_27[this._storeRef]===this){return true;}return false;},close:function(_28){},fetch:function(_29){_29=_29||{};if(!_29.store){_29.store=this;}var _2a=this;var _2b=_29.scope||_4.global;var _2c={};if(_29.query){_2c.query=_4.toJson(_29.query);}if(_29.sort){_2c.sort=_4.toJson(_29.sort);}if(_29.queryOptions){_2c.queryOptions=_4.toJson(_29.queryOptions);}if(typeof _29.start=="number"){_2c.start=""+_29.start;}if(typeof _29.count=="number"){_2c.count=""+_29.count;}if(this.options.length>0){_2c.options=_4.toJson(this.options);}var _2d={url:this.url,preventCache:this.urlPreventCache,failOk:this.failOk,handleAs:"json-comment-optional",content:_2c};var _2e=_4.xhrGet(_2d);_2e.addCallback(function(_2f){_2a._processResult(_2f,_29);});_2e.addErrback(function(_30){if(_29.onError){_29.onError.call(_2b,_30,_29);}});},fetchItemByIdentity:function(_31){var _32=_31.identity;var _33=this;var _34=_31.scope||_4.global;var _35={};if(this.options.length>0){_35.options=_4.toJson(this.options);}if(this.pathAsQueryParam){_35.path=_32;}var _36={url:this.pathAsQueryParam?this.url:this.url+"/"+_32,handleAs:"json-comment-optional",content:_35,preventCache:this.urlPreventCache,failOk:this.failOk};var _37=_4.xhrGet(_36);_37.addErrback(function(_38){if(_31.onError){_31.onError.call(_34,_38);}});_37.addCallback(function(_39){var _3a=_33._processItem(_39);if(_31.onItem){_31.onItem.call(_34,_3a);}});},_processResult:function(_3b,_3c){var _3d=_3c.scope||_4.global;try{if(_3b.pathSeparator){this.pathSeparator=_3b.pathSeparator;}if(_3c.onBegin){_3c.onBegin.call(_3d,_3b.total,_3c);}var _3e=this._processItemArray(_3b.items);if(_3c.onItem){var i;for(i=0;i<_3e.length;i++){_3c.onItem.call(_3d,_3e[i],_3c);}_3e=null;}if(_3c.onComplete){_3c.onComplete.call(_3d,_3e,_3c);}}catch(e){if(_3c.onError){_3c.onError.call(_3d,e,_3c);}else{console.log(e);}}},_processItemArray:function(_3f){var i;for(i=0;i<_3f.length;i++){this._processItem(_3f[i]);}return _3f;},_processItem:function(_40){if(!_40){return null;}_40[this._storeRef]=this;if(_40.children&&_40.directory){if(_4.isArray(_40.children)){var _41=_40.children;var i;for(i=0;i<_41.length;i++){var _42=_41[i];if(_4.isObject(_42)){_41[i]=this._processItem(_42);}else{_41[i]={name:_42,_loaded:false,parentPath:_40.path};_41[i][this._storeRef]=this;}}}else{delete _40.children;}}return _40;}});}}};});