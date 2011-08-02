/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojo.store.JsonRest"],["require","dojo.store.util.QueryResults"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojo.store.JsonRest"]){_4._hasResource["dojo.store.JsonRest"]=true;_4.provide("dojo.store.JsonRest");_4.require("dojo.store.util.QueryResults");_4.declare("dojo.store.JsonRest",null,{constructor:function(_7){_4.mixin(this,_7);},target:"",idProperty:"id",get:function(id,_8){var _9=_8||{};_9.Accept="application/javascript, application/json";return _4.xhrGet({url:this.target+id,handleAs:"json",headers:_9});},getIdentity:function(_a){return _a[this.idProperty];},put:function(_b,_c){_c=_c||{};var id=("id" in _c)?_c.id:this.getIdentity(_b);var _d=typeof id!="undefined";return _4.xhr(_d&&!_c.incremental?"PUT":"POST",{url:_d?this.target+id:this.target,postData:_4.toJson(_b),handleAs:"json",headers:{"Content-Type":"application/json","If-Match":_c.overwrite===true?"*":null,"If-None-Match":_c.overwrite===false?"*":null}});},add:function(_e,_f){_f=_f||{};_f.overwrite=false;return this.put(_e,_f);},remove:function(id){return _4.xhrDelete({url:this.target+id});},query:function(_10,_11){var _12={Accept:"application/javascript, application/json"};_11=_11||{};if(_11.start>=0||_11.count>=0){_12.Range="items="+(_11.start||"0")+"-"+(("count" in _11&&_11.count!=Infinity)?(_11.count+(_11.start||0)-1):"");}if(_4.isObject(_10)){_10=_4.objectToQuery(_10);_10=_10?"?"+_10:"";}if(_11&&_11.sort){_10+=(_10?"&":"?")+"sort(";for(var i=0;i<_11.sort.length;i++){var _13=_11.sort[i];_10+=(i>0?",":"")+(_13.descending?"-":"+")+encodeURIComponent(_13.attribute);}_10+=")";}var _14=_4.xhrGet({url:this.target+(_10||""),handleAs:"json",headers:_12});_14.total=_14.then(function(){var _15=_14.ioArgs.xhr.getResponseHeader("Content-Range");return _15&&(_15=_15.match(/\/(.*)/))&&+_15[1];});return _4.store.util.QueryResults(_14);}});}}};});