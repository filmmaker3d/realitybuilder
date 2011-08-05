/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {defineResource:function(_4,_5,_6){define([],function(){_4.declare("dojo.store.api.Store",null,{idProperty:"id",queryEngine:null,get:function(id){},getIdentity:function(_7){},put:function(_8,_9){},add:function(_a,_b){},remove:function(id){delete this.index[id];var _c=this.data,_d=this.idProperty;for(var i=0,l=_c.length;i<l;i++){if(_c[i][_d]==id){_c.splice(i,1);return;}}},query:function(_e,_f){},transaction:function(){},getChildren:function(_10,_11){},getMetadata:function(_12){}});_4.store.api.Store.PutDirectives=function(id,_13,_14,_15){this.id=id;this.before=_13;this.parent=_14;this.overwrite=_15;};_4.store.api.Store.SortInformation=function(_16,_17){this.attribute=_16;this.descending=_17;};_4.store.api.Store.QueryOptions=function(_18,_19,_1a){this.sort=_18;this.start=_19;this.count=_1a;};_4.declare("dojo.store.api.Store.QueryResults",null,{forEach:function(_1b,_1c){},filter:function(_1d,_1e){},map:function(_1f,_20){},then:function(_21,_22){},observe:function(_23,_24){},total:0});_4.declare("dojo.store.api.Store.Transaction",null,{commit:function(){},abort:function(_25,_26){}});});}};});