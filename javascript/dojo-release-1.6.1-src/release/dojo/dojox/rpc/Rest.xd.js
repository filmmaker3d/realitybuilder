/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.rpc.Rest"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.rpc.Rest"]){_4._hasResource["dojox.rpc.Rest"]=true;_4.provide("dojox.rpc.Rest");if(_6.rpc&&_6.rpc.transportRegistry){_6.rpc.transportRegistry.register("REST",function(_7){return _7=="REST";},{getExecutor:function(_8,_9,_a){return new _6.rpc.Rest(_9.name,(_9.contentType||_a._smd.contentType||"").match(/json|javascript/),null,function(id,_b){var _c=_a._getRequest(_9,[id]);_c.url=_c.target+(_c.data?"?"+_c.data:"");if(_b&&(_b.start>=0||_b.count>=0)){_c.headers=_c.headers||{};_c.headers.Range="items="+(_b.start||"0")+"-"+(("count" in _b&&_b.count!=Infinity)?(_b.count+(_b.start||0)-1):"");}return _c;});}});}var _d;function _e(_f,_10,_11,id){_f.addCallback(function(_12){if(_f.ioArgs.xhr&&_11){_11=_f.ioArgs.xhr.getResponseHeader("Content-Range");_f.fullLength=_11&&(_11=_11.match(/\/(.*)/))&&parseInt(_11[1]);}return _12;});return _f;};_d=_6.rpc.Rest=function(_13,_14,_15,_16){var _17;_17=function(id,_18){return _d._get(_17,id,_18);};_17.isJson=_14;_17._schema=_15;_17.cache={serialize:_14?((_6.json&&_6.json.ref)||_4).toJson:function(_19){return _19;}};_17._getRequest=_16||function(id,_1a){if(_4.isObject(id)){id=_4.objectToQuery(id);id=id?"?"+id:"";}if(_1a&&_1a.sort&&!_1a.queryStr){id+=(id?"&":"?")+"sort(";for(var i=0;i<_1a.sort.length;i++){var _1b=_1a.sort[i];id+=(i>0?",":"")+(_1b.descending?"-":"+")+encodeURIComponent(_1b.attribute);}id+=")";}var _1c={url:_13+(id==null?"":id),handleAs:_14?"json":"text",contentType:_14?"application/json":"text/plain",sync:_6.rpc._sync,headers:{Accept:_14?"application/json,application/javascript":"*/*"}};if(_1a&&(_1a.start>=0||_1a.count>=0)){_1c.headers.Range="items="+(_1a.start||"0")+"-"+(("count" in _1a&&_1a.count!=Infinity)?(_1a.count+(_1a.start||0)-1):"");}_6.rpc._sync=false;return _1c;};function _1d(_1e){_17[_1e]=function(id,_1f){return _d._change(_1e,_17,id,_1f);};};_1d("put");_1d("post");_1d("delete");_17.servicePath=_13;return _17;};_d._index={};_d._timeStamps={};_d._change=function(_20,_21,id,_22){var _23=_21._getRequest(id);_23[_20+"Data"]=_22;return _e(_4.xhr(_20.toUpperCase(),_23,true),_21);};_d._get=function(_24,id,_25){_25=_25||{};return _e(_4.xhrGet(_24._getRequest(id,_25)),_24,(_25.start>=0||_25.count>=0),id);};}}};});