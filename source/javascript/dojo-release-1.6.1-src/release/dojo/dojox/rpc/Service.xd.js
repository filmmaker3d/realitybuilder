/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.rpc.Service"],["require","dojo.AdapterRegistry"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.rpc.Service"]){_4._hasResource["dojox.rpc.Service"]=true;_4.provide("dojox.rpc.Service");_4.require("dojo.AdapterRegistry");_4.declare("dojox.rpc.Service",null,{constructor:function(_7,_8){var _9;var _a=this;function _b(_c){_c._baseUrl=new _4._Url((_4.isBrowser?location.href:_4.config.baseUrl),_9||".")+"";_a._smd=_c;for(var _d in _a._smd.services){var _e=_d.split(".");var _f=_a;for(var i=0;i<_e.length-1;i++){_f=_f[_e[i]]||(_f[_e[i]]={});}_f[_e[_e.length-1]]=_a._generateService(_d,_a._smd.services[_d]);}};if(_7){if((_4.isString(_7))||(_7 instanceof _4._Url)){if(_7 instanceof _4._Url){_9=_7+"";}else{_9=_7;}var _10=_4._getText(_9);if(!_10){throw new Error("Unable to load SMD from "+_7);}else{_b(_4.fromJson(_10));}}else{_b(_7);}}this._options=(_8?_8:{});this._requestId=0;},_generateService:function(_11,_12){if(this[_12]){throw new Error("WARNING: "+_11+" already exists for service. Unable to generate function");}_12.name=_11;var _13=_4.hitch(this,"_executeMethod",_12);var _14=_6.rpc.transportRegistry.match(_12.transport||this._smd.transport);if(_14.getExecutor){_13=_14.getExecutor(_13,_12,this);}var _15=_12.returns||(_12._schema={});var _16="/"+_11+"/";_15._service=_13;_13.servicePath=_16;_13._schema=_15;_13.id=_6.rpc.Service._nextId++;return _13;},_getRequest:function(_17,_18){var smd=this._smd;var _19=_6.rpc.envelopeRegistry.match(_17.envelope||smd.envelope||"NONE");var _1a=(_17.parameters||[]).concat(smd.parameters||[]);if(_19.namedParams){if((_18.length==1)&&_4.isObject(_18[0])){_18=_18[0];}else{var _1b={};for(var i=0;i<_17.parameters.length;i++){if(typeof _18[i]!="undefined"||!_17.parameters[i].optional){_1b[_17.parameters[i].name]=_18[i];}}_18=_1b;}if(_17.strictParameters||smd.strictParameters){for(i in _18){var _1c=false;for(var j=0;j<_1a.length;j++){if(_1a[i].name==i){_1c=true;}}if(!_1c){delete _18[i];}}}for(i=0;i<_1a.length;i++){var _1d=_1a[i];if(!_1d.optional&&_1d.name&&!_18[_1d.name]){if(_1d["default"]){_18[_1d.name]=_1d["default"];}else{if(!(_1d.name in _18)){throw new Error("Required parameter "+_1d.name+" was omitted");}}}}}else{if(_1a&&_1a[0]&&_1a[0].name&&(_18.length==1)&&_4.isObject(_18[0])){if(_19.namedParams===false){_18=_6.rpc.toOrdered(_1a,_18);}else{_18=_18[0];}}}if(_4.isObject(this._options)){_18=_4.mixin(_18,this._options);}var _1e=_17._schema||_17.returns;var _1f=_19.serialize.apply(this,[smd,_17,_18]);_1f._envDef=_19;var _20=(_17.contentType||smd.contentType||_1f.contentType);return _4.mixin(_1f,{sync:_6.rpc._sync,contentType:_20,headers:_17.headers||smd.headers||_1f.headers||{},target:_1f.target||_6.rpc.getTarget(smd,_17),transport:_17.transport||smd.transport||_1f.transport,envelope:_17.envelope||smd.envelope||_1f.envelope,timeout:_17.timeout||smd.timeout,callbackParamName:_17.callbackParamName||smd.callbackParamName,rpcObjectParamName:_17.rpcObjectParamName||smd.rpcObjectParamName,schema:_1e,handleAs:_1f.handleAs||"auto",preventCache:_17.preventCache||smd.preventCache,frameDoc:this._options.frameDoc||undefined});},_executeMethod:function(_21){var _22=[];var i;for(i=1;i<arguments.length;i++){_22.push(arguments[i]);}var _23=this._getRequest(_21,_22);var _24=_6.rpc.transportRegistry.match(_23.transport).fire(_23);_24.addBoth(function(_25){return _23._envDef.deserialize.call(this,_25);});return _24;}});_6.rpc.getTarget=function(smd,_26){var _27=smd._baseUrl;if(smd.target){_27=new _4._Url(_27,smd.target)+"";}if(_26.target){_27=new _4._Url(_27,_26.target)+"";}return _27;};_6.rpc.toOrdered=function(_28,_29){if(_4.isArray(_29)){return _29;}var _2a=[];for(var i=0;i<_28.length;i++){_2a.push(_29[_28[i].name]);}return _2a;};_6.rpc.transportRegistry=new _4.AdapterRegistry(true);_6.rpc.envelopeRegistry=new _4.AdapterRegistry(true);_6.rpc.envelopeRegistry.register("URL",function(str){return str=="URL";},{serialize:function(smd,_2b,_2c){var d=_4.objectToQuery(_2c);return {data:d,transport:"POST"};},deserialize:function(_2d){return _2d;},namedParams:true});_6.rpc.envelopeRegistry.register("JSON",function(str){return str=="JSON";},{serialize:function(smd,_2e,_2f){var d=_4.toJson(_2f);return {data:d,handleAs:"json",contentType:"application/json"};},deserialize:function(_30){return _30;}});_6.rpc.envelopeRegistry.register("PATH",function(str){return str=="PATH";},{serialize:function(smd,_31,_32){var i;var _33=_6.rpc.getTarget(smd,_31);if(_4.isArray(_32)){for(i=0;i<_32.length;i++){_33+="/"+_32[i];}}else{for(i in _32){_33+="/"+i+"/"+_32[i];}}return {data:"",target:_33};},deserialize:function(_34){return _34;}});_6.rpc.transportRegistry.register("POST",function(str){return str=="POST";},{fire:function(r){r.url=r.target;r.postData=r.data;return _4.rawXhrPost(r);}});_6.rpc.transportRegistry.register("GET",function(str){return str=="GET";},{fire:function(r){r.url=r.target+(r.data?"?"+((r.rpcObjectParamName)?r.rpcObjectParamName+"=":"")+r.data:"");return _4.xhrGet(r);}});_6.rpc.transportRegistry.register("JSONP",function(str){return str=="JSONP";},{fire:function(r){r.url=r.target+((r.target.indexOf("?")==-1)?"?":"&")+((r.rpcObjectParamName)?r.rpcObjectParamName+"=":"")+r.data;r.callbackParamName=r.callbackParamName||"callback";return _4.io.script.get(r);}});_6.rpc.Service._nextId=1;_4._contentHandlers.auto=function(xhr){var _35=_4._contentHandlers;var _36=xhr.getResponseHeader("Content-Type");var _37=!_36?_35.text(xhr):_36.match(/\/.*json/)?_35.json(xhr):_36.match(/\/javascript/)?_35.javascript(xhr):_36.match(/\/xml/)?_35.xml(xhr):_35.text(xhr);return _37;};}}};});