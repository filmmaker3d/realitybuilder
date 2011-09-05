/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojo.store.Cache"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojo.store.Cache"]){_4._hasResource["dojo.store.Cache"]=true;_4.provide("dojo.store.Cache");_4.getObject("store",true,_4);_4.store.Cache=function(_7,_8,_9){_9=_9||{};return _4.delegate(_7,{query:function(_a,_b){var _c=_7.query(_a,_b);_c.forEach(function(_d){if(!_9.isLoaded||_9.isLoaded(_d)){_8.put(_d);}});return _c;},queryEngine:_7.queryEngine||_8.queryEngine,get:function(id,_e){return _4.when(_8.get(id),function(_f){return _f||_4.when(_7.get(id,_e),function(_10){if(_10){_8.put(_10,{id:id});}return _10;});});},add:function(_11,_12){return _4.when(_7.add(_11,_12),function(_13){return _8.add(typeof _13=="object"?_13:_11,_12);});},put:function(_14,_15){_8.remove((_15&&_15.id)||this.getIdentity(_14));return _4.when(_7.put(_14,_15),function(_16){return _8.put(typeof _16=="object"?_16:_14,_15);});},remove:function(id,_17){return _4.when(_7.remove(id,_17),function(_18){return _8.remove(id,_17);});},evict:function(id){return _8.remove(id);}});};}}};});