/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.data.AndOrReadStore"],["require","dojo.data.util.filter"],["require","dojo.data.util.simpleFetch"],["require","dojo.date.stamp"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.data.AndOrReadStore"]){_4._hasResource["dojox.data.AndOrReadStore"]=true;_4.provide("dojox.data.AndOrReadStore");_4.require("dojo.data.util.filter");_4.require("dojo.data.util.simpleFetch");_4.require("dojo.date.stamp");_4.declare("dojox.data.AndOrReadStore",null,{constructor:function(_7){this._arrayOfAllItems=[];this._arrayOfTopLevelItems=[];this._loadFinished=false;this._jsonFileUrl=_7.url;this._ccUrl=_7.url;this.url=_7.url;this._jsonData=_7.data;this.data=null;this._datatypeMap=_7.typeMap||{};if(!this._datatypeMap["Date"]){this._datatypeMap["Date"]={type:Date,deserialize:function(_8){return _4.date.stamp.fromISOString(_8);}};}this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};this._itemsByIdentity=null;this._storeRefPropName="_S";this._itemNumPropName="_0";this._rootItemPropName="_RI";this._reverseRefMap="_RRM";this._loadInProgress=false;this._queuedFetches=[];if(_7.urlPreventCache!==undefined){this.urlPreventCache=_7.urlPreventCache?true:false;}if(_7.hierarchical!==undefined){this.hierarchical=_7.hierarchical?true:false;}if(_7.clearOnClose){this.clearOnClose=true;}},url:"",_ccUrl:"",data:null,typeMap:null,clearOnClose:false,urlPreventCache:false,hierarchical:true,_assertIsItem:function(_9){if(!this.isItem(_9)){throw new Error("dojox.data.AndOrReadStore: Invalid item argument.");}},_assertIsAttribute:function(_a){if(typeof _a!=="string"){throw new Error("dojox.data.AndOrReadStore: Invalid attribute argument.");}},getValue:function(_b,_c,_d){var _e=this.getValues(_b,_c);return (_e.length>0)?_e[0]:_d;},getValues:function(_f,_10){this._assertIsItem(_f);this._assertIsAttribute(_10);var arr=_f[_10]||[];return arr.slice(0,arr.length);},getAttributes:function(_11){this._assertIsItem(_11);var _12=[];for(var key in _11){if((key!==this._storeRefPropName)&&(key!==this._itemNumPropName)&&(key!==this._rootItemPropName)&&(key!==this._reverseRefMap)){_12.push(key);}}return _12;},hasAttribute:function(_13,_14){this._assertIsItem(_13);this._assertIsAttribute(_14);return (_14 in _13);},containsValue:function(_15,_16,_17){var _18=undefined;if(typeof _17==="string"){_18=_4.data.util.filter.patternToRegExp(_17,false);}return this._containsValue(_15,_16,_17,_18);},_containsValue:function(_19,_1a,_1b,_1c){return _4.some(this.getValues(_19,_1a),function(_1d){if(_1d!==null&&!_4.isObject(_1d)&&_1c){if(_1d.toString().match(_1c)){return true;}}else{if(_1b===_1d){return true;}}});},isItem:function(_1e){if(_1e&&_1e[this._storeRefPropName]===this){if(this._arrayOfAllItems[_1e[this._itemNumPropName]]===_1e){return true;}}return false;},isItemLoaded:function(_1f){return this.isItem(_1f);},loadItem:function(_20){this._assertIsItem(_20.item);},getFeatures:function(){return this._features;},getLabel:function(_21){if(this._labelAttr&&this.isItem(_21)){return this.getValue(_21,this._labelAttr);}return undefined;},getLabelAttributes:function(_22){if(this._labelAttr){return [this._labelAttr];}return null;},_fetchItems:function(_23,_24,_25){var _26=this;var _27=function(_28,_29){var _2a=[];if(_28.query){var _2b=_4.fromJson(_4.toJson(_28.query));if(typeof _2b=="object"){var _2c=0;var p;for(p in _2b){_2c++;}if(_2c>1&&_2b.complexQuery){var cq=_2b.complexQuery;var _2d=false;for(p in _2b){if(p!=="complexQuery"){if(!_2d){cq="( "+cq+" )";_2d=true;}var v=_28.query[p];if(_4.isString(v)){v="'"+v+"'";}cq+=" AND "+p+":"+v;delete _2b[p];}}_2b.complexQuery=cq;}}var _2e=_28.queryOptions?_28.queryOptions.ignoreCase:false;if(typeof _2b!="string"){_2b=_4.toJson(_2b);_2b=_2b.replace(/\\\\/g,"\\");}_2b=_2b.replace(/\\"/g,"\"");var _2f=_4.trim(_2b.replace(/{|}/g,""));var _30,i;if(_2f.match(/"? *complexQuery *"?:/)){_2f=_4.trim(_2f.replace(/"?\s*complexQuery\s*"?:/,""));var _31=["'","\""];var _32,_33;var _34=false;for(i=0;i<_31.length;i++){_32=_2f.indexOf(_31[i]);_30=_2f.indexOf(_31[i],1);_33=_2f.indexOf(":",1);if(_32===0&&_30!=-1&&_33<_30){_34=true;break;}}if(_34){_2f=_2f.replace(/^\"|^\'|\"$|\'$/g,"");}}var _35=_2f;var _36=/^,|^NOT |^AND |^OR |^\(|^\)|^!|^&&|^\|\|/i;var _37="";var op="";var val="";var pos=-1;var err=false;var key="";var _38="";var tok="";_30=-1;for(i=0;i<_29.length;++i){var _39=true;var _3a=_29[i];if(_3a===null){_39=false;}else{_2f=_35;_37="";while(_2f.length>0&&!err){op=_2f.match(_36);while(op&&!err){_2f=_4.trim(_2f.replace(op[0],""));op=_4.trim(op[0]).toUpperCase();op=op=="NOT"?"!":op=="AND"||op==","?"&&":op=="OR"?"||":op;op=" "+op+" ";_37+=op;op=_2f.match(_36);}if(_2f.length>0){pos=_2f.indexOf(":");if(pos==-1){err=true;break;}else{key=_4.trim(_2f.substring(0,pos).replace(/\"|\'/g,""));_2f=_4.trim(_2f.substring(pos+1));tok=_2f.match(/^\'|^\"/);if(tok){tok=tok[0];pos=_2f.indexOf(tok);_30=_2f.indexOf(tok,pos+1);if(_30==-1){err=true;break;}_38=_2f.substring(pos+1,_30);if(_30==_2f.length-1){_2f="";}else{_2f=_4.trim(_2f.substring(_30+1));}_37+=_26._containsValue(_3a,key,_38,_4.data.util.filter.patternToRegExp(_38,_2e));}else{tok=_2f.match(/\s|\)|,/);if(tok){var _3b=new Array(tok.length);for(var j=0;j<tok.length;j++){_3b[j]=_2f.indexOf(tok[j]);}pos=_3b[0];if(_3b.length>1){for(var j=1;j<_3b.length;j++){pos=Math.min(pos,_3b[j]);}}_38=_4.trim(_2f.substring(0,pos));_2f=_4.trim(_2f.substring(pos));}else{_38=_4.trim(_2f);_2f="";}_37+=_26._containsValue(_3a,key,_38,_4.data.util.filter.patternToRegExp(_38,_2e));}}}}_39=eval(_37);}if(_39){_2a.push(_3a);}}if(err){_2a=[];console.log("The store's _fetchItems failed, probably due to a syntax error in query.");}_24(_2a,_28);}else{for(var i=0;i<_29.length;++i){var _3c=_29[i];if(_3c!==null){_2a.push(_3c);}}_24(_2a,_28);}};if(this._loadFinished){_27(_23,this._getItemsArray(_23.queryOptions));}else{if(this._jsonFileUrl!==this._ccUrl){_4.deprecated("dojox.data.AndOrReadStore: ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");this._ccUrl=this._jsonFileUrl;this.url=this._jsonFileUrl;}else{if(this.url!==this._ccUrl){this._jsonFileUrl=this.url;this._ccUrl=this.url;}}if(this.data!=null&&this._jsonData==null){this._jsonData=this.data;this.data=null;}if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:_23,filter:_27});}else{this._loadInProgress=true;var _3d={url:_26._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache};var _3e=_4.xhrGet(_3d);_3e.addCallback(function(_3f){try{_26._getItemsFromLoadedData(_3f);_26._loadFinished=true;_26._loadInProgress=false;_27(_23,_26._getItemsArray(_23.queryOptions));_26._handleQueuedFetches();}catch(e){_26._loadFinished=true;_26._loadInProgress=false;_25(e,_23);}});_3e.addErrback(function(_40){_26._loadInProgress=false;_25(_40,_23);});var _41=null;if(_23.abort){_41=_23.abort;}_23.abort=function(){var df=_3e;if(df&&df.fired===-1){df.cancel();df=null;}if(_41){_41.call(_23);}};}}else{if(this._jsonData){try{this._loadFinished=true;this._getItemsFromLoadedData(this._jsonData);this._jsonData=null;_27(_23,this._getItemsArray(_23.queryOptions));}catch(e){_25(e,_23);}}else{_25(new Error("dojox.data.AndOrReadStore: No JSON source data was provided as either URL or a nested Javascript object."),_23);}}}},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var i=0;i<this._queuedFetches.length;i++){var _42=this._queuedFetches[i];var _43=_42.args;var _44=_42.filter;if(_44){_44(_43,this._getItemsArray(_43.queryOptions));}else{this.fetchItemByIdentity(_43);}}this._queuedFetches=[];}},_getItemsArray:function(_45){if(_45&&_45.deep){return this._arrayOfAllItems;}return this._arrayOfTopLevelItems;},close:function(_46){if(this.clearOnClose&&this._loadFinished&&!this._loadInProgress){if(((this._jsonFileUrl==""||this._jsonFileUrl==null)&&(this.url==""||this.url==null))&&this.data==null){console.debug("dojox.data.AndOrReadStore: WARNING!  Data reload "+" information has not been provided."+"  Please set 'url' or 'data' to the appropriate value before"+" the next fetch");}this._arrayOfAllItems=[];this._arrayOfTopLevelItems=[];this._loadFinished=false;this._itemsByIdentity=null;this._loadInProgress=false;this._queuedFetches=[];}},_getItemsFromLoadedData:function(_47){var _48=this;function _49(_4a){var _4b=((_4a!==null)&&(typeof _4a==="object")&&(!_4.isArray(_4a))&&(!_4.isFunction(_4a))&&(_4a.constructor==Object)&&(typeof _4a._reference==="undefined")&&(typeof _4a._type==="undefined")&&(typeof _4a._value==="undefined")&&_48.hierarchical);return _4b;};function _4c(_4d){_48._arrayOfAllItems.push(_4d);for(var _4e in _4d){var _4f=_4d[_4e];if(_4f){if(_4.isArray(_4f)){var _50=_4f;for(var k=0;k<_50.length;++k){var _51=_50[k];if(_49(_51)){_4c(_51);}}}else{if(_49(_4f)){_4c(_4f);}}}}};this._labelAttr=_47.label;var i;var _52;this._arrayOfAllItems=[];this._arrayOfTopLevelItems=_47.items;for(i=0;i<this._arrayOfTopLevelItems.length;++i){_52=this._arrayOfTopLevelItems[i];_4c(_52);_52[this._rootItemPropName]=true;}var _53={};var key;for(i=0;i<this._arrayOfAllItems.length;++i){_52=this._arrayOfAllItems[i];for(key in _52){if(key!==this._rootItemPropName){var _54=_52[key];if(_54!==null){if(!_4.isArray(_54)){_52[key]=[_54];}}else{_52[key]=[null];}}_53[key]=key;}}while(_53[this._storeRefPropName]){this._storeRefPropName+="_";}while(_53[this._itemNumPropName]){this._itemNumPropName+="_";}while(_53[this._reverseRefMap]){this._reverseRefMap+="_";}var _55;var _56=_47.identifier;if(_56){this._itemsByIdentity={};this._features["dojo.data.api.Identity"]=_56;for(i=0;i<this._arrayOfAllItems.length;++i){_52=this._arrayOfAllItems[i];_55=_52[_56];var _57=_55[0];if(!this._itemsByIdentity[_57]){this._itemsByIdentity[_57]=_52;}else{if(this._jsonFileUrl){throw new Error("dojox.data.AndOrReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+_56+"].  Value collided: ["+_57+"]");}else{if(this._jsonData){throw new Error("dojox.data.AndOrReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+_56+"].  Value collided: ["+_57+"]");}}}}}else{this._features["dojo.data.api.Identity"]=Number;}for(i=0;i<this._arrayOfAllItems.length;++i){_52=this._arrayOfAllItems[i];_52[this._storeRefPropName]=this;_52[this._itemNumPropName]=i;}for(i=0;i<this._arrayOfAllItems.length;++i){_52=this._arrayOfAllItems[i];for(key in _52){_55=_52[key];for(var j=0;j<_55.length;++j){_54=_55[j];if(_54!==null&&typeof _54=="object"){if(("_type" in _54)&&("_value" in _54)){var _58=_54._type;var _59=this._datatypeMap[_58];if(!_59){throw new Error("dojox.data.AndOrReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+_58+"'");}else{if(_4.isFunction(_59)){_55[j]=new _59(_54._value);}else{if(_4.isFunction(_59.deserialize)){_55[j]=_59.deserialize(_54._value);}else{throw new Error("dojox.data.AndOrReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function");}}}}if(_54._reference){var _5a=_54._reference;if(!_4.isObject(_5a)){_55[j]=this._getItemByIdentity(_5a);}else{for(var k=0;k<this._arrayOfAllItems.length;++k){var _5b=this._arrayOfAllItems[k];var _5c=true;for(var _5d in _5a){if(_5b[_5d]!=_5a[_5d]){_5c=false;}}if(_5c){_55[j]=_5b;}}}if(this.referenceIntegrity){var _5e=_55[j];if(this.isItem(_5e)){this._addReferenceToMap(_5e,_52,key);}}}else{if(this.isItem(_54)){if(this.referenceIntegrity){this._addReferenceToMap(_54,_52,key);}}}}}}}},_addReferenceToMap:function(_5f,_60,_61){},getIdentity:function(_62){var _63=this._features["dojo.data.api.Identity"];if(_63===Number){return _62[this._itemNumPropName];}else{var _64=_62[_63];if(_64){return _64[0];}}return null;},fetchItemByIdentity:function(_65){if(!this._loadFinished){var _66=this;if(this._jsonFileUrl!==this._ccUrl){_4.deprecated("dojox.data.AndOrReadStore: ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");this._ccUrl=this._jsonFileUrl;this.url=this._jsonFileUrl;}else{if(this.url!==this._ccUrl){this._jsonFileUrl=this.url;this._ccUrl=this.url;}}if(this.data!=null&&this._jsonData==null){this._jsonData=this.data;this.data=null;}if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:_65});}else{this._loadInProgress=true;var _67={url:_66._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache};var _68=_4.xhrGet(_67);_68.addCallback(function(_69){var _6a=_65.scope?_65.scope:_4.global;try{_66._getItemsFromLoadedData(_69);_66._loadFinished=true;_66._loadInProgress=false;var _6b=_66._getItemByIdentity(_65.identity);if(_65.onItem){_65.onItem.call(_6a,_6b);}_66._handleQueuedFetches();}catch(error){_66._loadInProgress=false;if(_65.onError){_65.onError.call(_6a,error);}}});_68.addErrback(function(_6c){_66._loadInProgress=false;if(_65.onError){var _6d=_65.scope?_65.scope:_4.global;_65.onError.call(_6d,_6c);}});}}else{if(this._jsonData){_66._getItemsFromLoadedData(_66._jsonData);_66._jsonData=null;_66._loadFinished=true;var _6e=_66._getItemByIdentity(_65.identity);if(_65.onItem){var _6f=_65.scope?_65.scope:_4.global;_65.onItem.call(_6f,_6e);}}}}else{var _6e=this._getItemByIdentity(_65.identity);if(_65.onItem){var _6f=_65.scope?_65.scope:_4.global;_65.onItem.call(_6f,_6e);}}},_getItemByIdentity:function(_70){var _71=null;if(this._itemsByIdentity){_71=this._itemsByIdentity[_70];}else{_71=this._arrayOfAllItems[_70];}if(_71===undefined){_71=null;}return _71;},getIdentityAttributes:function(_72){var _73=this._features["dojo.data.api.Identity"];if(_73===Number){return null;}else{return [_73];}},_forceLoad:function(){var _74=this;if(this._jsonFileUrl!==this._ccUrl){_4.deprecated("dojox.data.AndOrReadStore: ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");this._ccUrl=this._jsonFileUrl;this.url=this._jsonFileUrl;}else{if(this.url!==this._ccUrl){this._jsonFileUrl=this.url;this._ccUrl=this.url;}}if(this.data!=null&&this._jsonData==null){this._jsonData=this.data;this.data=null;}if(this._jsonFileUrl){var _75={url:_74._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,sync:true};var _76=_4.xhrGet(_75);_76.addCallback(function(_77){try{if(_74._loadInProgress!==true&&!_74._loadFinished){_74._getItemsFromLoadedData(_77);_74._loadFinished=true;}else{if(_74._loadInProgress){throw new Error("dojox.data.AndOrReadStore:  Unable to perform a synchronous load, an async load is in progress.");}}}catch(e){console.log(e);throw e;}});_76.addErrback(function(_78){throw _78;});}else{if(this._jsonData){_74._getItemsFromLoadedData(_74._jsonData);_74._jsonData=null;_74._loadFinished=true;}}}});_4.extend(_6.data.AndOrReadStore,_4.data.util.simpleFetch);}}};});