/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.wire.ml.Service"],["provide","dojox.wire.ml.RestHandler"],["provide","dojox.wire.ml.XmlHandler"],["provide","dojox.wire.ml.JsonHandler"],["require","dijit._Widget"],["require","dojox.xml.parser"],["require","dojox.wire._base"],["require","dojox.wire.ml.util"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.wire.ml.Service"]){_4._hasResource["dojox.wire.ml.Service"]=true;_4.provide("dojox.wire.ml.Service");_4.provide("dojox.wire.ml.RestHandler");_4.provide("dojox.wire.ml.XmlHandler");_4.provide("dojox.wire.ml.JsonHandler");_4.require("dijit._Widget");_4.require("dojox.xml.parser");_4.require("dojox.wire._base");_4.require("dojox.wire.ml.util");_4.declare("dojox.wire.ml.Service",_5._Widget,{url:"",serviceUrl:"",serviceType:"",handlerClass:"",preventCache:true,postCreate:function(){this.handler=this._createHandler();},_handlerClasses:{"TEXT":"dojox.wire.ml.RestHandler","XML":"dojox.wire.ml.XmlHandler","JSON":"dojox.wire.ml.JsonHandler","JSON-RPC":"dojo.rpc.JsonService"},_createHandler:function(){if(this.url){var _7=this;var d=_4.xhrGet({url:this.url,handleAs:"json",sync:true});d.addCallback(function(_8){_7.smd=_8;});if(this.smd&&!this.serviceUrl){this.serviceUrl=(this.smd.serviceUrl||this.smd.serviceURL);}}var _9=undefined;if(this.handlerClass){_9=_6.wire._getClass(this.handlerClass);}else{if(this.serviceType){_9=this._handlerClasses[this.serviceType];if(_9&&_4.isString(_9)){_9=_6.wire._getClass(_9);this._handlerClasses[this.serviceType]=_9;}}else{if(this.smd&&this.smd.serviceType){_9=this._handlerClasses[this.smd.serviceType];if(_9&&_4.isString(_9)){_9=_6.wire._getClass(_9);this._handlerClasses[this.smd.serviceType]=_9;}}}}if(!_9){return null;}return new _9();},callMethod:function(_a,_b){var _c=new _4.Deferred();this.handler.bind(_a,_b,_c,this.serviceUrl);return _c;}});_4.declare("dojox.wire.ml.RestHandler",null,{contentType:"text/plain",handleAs:"text",bind:function(_d,_e,_f,url){_d=_d.toUpperCase();var _10=this;var _11={url:this._getUrl(_d,_e,url),contentType:this.contentType,handleAs:this.handleAs,headers:this.headers,preventCache:this.preventCache};var d=null;if(_d=="POST"){_11.postData=this._getContent(_d,_e);d=_4.rawXhrPost(_11);}else{if(_d=="PUT"){_11.putData=this._getContent(_d,_e);d=_4.rawXhrPut(_11);}else{if(_d=="DELETE"){d=_4.xhrDelete(_11);}else{d=_4.xhrGet(_11);}}}d.addCallbacks(function(_12){_f.callback(_10._getResult(_12));},function(_13){_f.errback(_13);});},_getUrl:function(_14,_15,url){var _16;if(_14=="GET"||_14=="DELETE"){if(_15.length>0){_16=_15[0];}}else{if(_15.length>1){_16=_15[1];}}if(_16){var _17="";for(var _18 in _16){var _19=_16[_18];if(_19){_19=encodeURIComponent(_19);var _1a="{"+_18+"}";var _1b=url.indexOf(_1a);if(_1b>=0){url=url.substring(0,_1b)+_19+url.substring(_1b+_1a.length);}else{if(_17){_17+="&";}_17+=(_18+"="+_19);}}}if(_17){url+="?"+_17;}}return url;},_getContent:function(_1c,_1d){if(_1c=="POST"||_1c=="PUT"){return (_1d?_1d[0]:null);}else{return null;}},_getResult:function(_1e){return _1e;}});_4.declare("dojox.wire.ml.XmlHandler",_6.wire.ml.RestHandler,{contentType:"text/xml",handleAs:"xml",_getContent:function(_1f,_20){var _21=null;if(_1f=="POST"||_1f=="PUT"){var p=_20[0];if(p){if(_4.isString(p)){_21=p;}else{var _22=p;if(_22 instanceof _6.wire.ml.XmlElement){_22=_22.element;}else{if(_22.nodeType===9){_22=_22.documentElement;}}var _23="<?xml version=\"1.0\"?>";_21=_23+_6.xml.parser.innerXML(_22);}}}return _21;},_getResult:function(_24){if(_24){_24=new _6.wire.ml.XmlElement(_24);}return _24;}});_4.declare("dojox.wire.ml.JsonHandler",_6.wire.ml.RestHandler,{contentType:"text/json",handleAs:"json",headers:{"Accept":"*/json"},_getContent:function(_25,_26){var _27=null;if(_25=="POST"||_25=="PUT"){var p=(_26?_26[0]:undefined);if(p){if(_4.isString(p)){_27=p;}else{_27=_4.toJson(p);}}}return _27;}});}}};});