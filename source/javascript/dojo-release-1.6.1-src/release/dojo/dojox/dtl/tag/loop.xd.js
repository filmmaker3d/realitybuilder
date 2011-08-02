/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.dtl.tag.loop"],["require","dojox.dtl._base"],["require","dojox.string.tokenize"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.dtl.tag.loop"]){_4._hasResource["dojox.dtl.tag.loop"]=true;_4.provide("dojox.dtl.tag.loop");_4.require("dojox.dtl._base");_4.require("dojox.string.tokenize");(function(){var dd=_6.dtl;var _7=dd.tag.loop;_7.CycleNode=_4.extend(function(_8,_9,_a,_b){this.cyclevars=_8;this.name=_9;this.contents=_a;this.shared=_b||{counter:-1,map:{}};},{render:function(_c,_d){if(_c.forloop&&!_c.forloop.counter0){this.shared.counter=-1;}++this.shared.counter;var _e=this.cyclevars[this.shared.counter%this.cyclevars.length];var _f=this.shared.map;if(!_f[_e]){_f[_e]=new dd._Filter(_e);}_e=_f[_e].resolve(_c,_d);if(this.name){_c[this.name]=_e;}this.contents.set(_e);return this.contents.render(_c,_d);},unrender:function(_10,_11){return this.contents.unrender(_10,_11);},clone:function(_12){return new this.constructor(this.cyclevars,this.name,this.contents.clone(_12),this.shared);}});_7.IfChangedNode=_4.extend(function(_13,_14,_15){this.nodes=_13;this._vars=_14;this.shared=_15||{last:null,counter:0};this.vars=_4.map(_14,function(_16){return new _6.dtl._Filter(_16);});},{render:function(_17,_18){if(_17.forloop){if(_17.forloop.counter<=this.shared.counter){this.shared.last=null;}this.shared.counter=_17.forloop.counter;}var _19;if(this.vars.length){_19=_4.toJson(_4.map(this.vars,function(_1a){return _1a.resolve(_17);}));}else{_19=this.nodes.dummyRender(_17,_18);}if(_19!=this.shared.last){var _1b=(this.shared.last===null);this.shared.last=_19;_17=_17.push();_17.ifchanged={firstloop:_1b};_18=this.nodes.render(_17,_18);_17=_17.pop();}else{_18=this.nodes.unrender(_17,_18);}return _18;},unrender:function(_1c,_1d){return this.nodes.unrender(_1c,_1d);},clone:function(_1e){return new this.constructor(this.nodes.clone(_1e),this._vars,this.shared);}});_7.RegroupNode=_4.extend(function(_1f,key,_20){this._expression=_1f;this.expression=new dd._Filter(_1f);this.key=key;this.alias=_20;},{_push:function(_21,_22,_23){if(_23.length){_21.push({grouper:_22,list:_23});}},render:function(_24,_25){_24[this.alias]=[];var _26=this.expression.resolve(_24);if(_26){var _27=null;var _28=[];for(var i=0;i<_26.length;i++){var id=_26[i][this.key];if(_27!==id){this._push(_24[this.alias],_27,_28);_27=id;_28=[_26[i]];}else{_28.push(_26[i]);}}this._push(_24[this.alias],_27,_28);}return _25;},unrender:function(_29,_2a){return _2a;},clone:function(_2b,_2c){return this;}});_4.mixin(_7,{cycle:function(_2d,_2e){var _2f=_2e.split_contents();if(_2f.length<2){throw new Error("'cycle' tag requires at least two arguments");}if(_2f[1].indexOf(",")!=-1){var _30=_2f[1].split(",");_2f=[_2f[0]];for(var i=0;i<_30.length;i++){_2f.push("\""+_30[i]+"\"");}}if(_2f.length==2){var _31=_2f[_2f.length-1];if(!_2d._namedCycleNodes){throw new Error("No named cycles in template: '"+_31+"' is not defined");}if(!_2d._namedCycleNodes[_31]){throw new Error("Named cycle '"+_31+"' does not exist");}return _2d._namedCycleNodes[_31];}if(_2f.length>4&&_2f[_2f.length-2]=="as"){var _31=_2f[_2f.length-1];var _32=new _7.CycleNode(_2f.slice(1,_2f.length-2),_31,_2d.create_text_node());if(!_2d._namedCycleNodes){_2d._namedCycleNodes={};}_2d._namedCycleNodes[_31]=_32;}else{_32=new _7.CycleNode(_2f.slice(1),null,_2d.create_text_node());}return _32;},ifchanged:function(_33,_34){var _35=_34.contents.split();var _36=_33.parse(["endifchanged"]);_33.delete_first_token();return new _7.IfChangedNode(_36,_35.slice(1));},regroup:function(_37,_38){var _39=_6.string.tokenize(_38.contents,/(\s+)/g,function(_3a){return _3a;});if(_39.length<11||_39[_39.length-3]!="as"||_39[_39.length-7]!="by"){throw new Error("Expected the format: regroup list by key as newList");}var _3b=_39.slice(2,-8).join("");var key=_39[_39.length-5];var _3c=_39[_39.length-1];return new _7.RegroupNode(_3b,key,_3c);}});})();}}};});