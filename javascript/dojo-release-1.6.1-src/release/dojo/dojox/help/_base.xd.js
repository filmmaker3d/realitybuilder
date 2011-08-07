/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.help._base"],["require","dojox.rpc.Service"],["require","dojo.io.script"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.help._base"]){_4._hasResource["dojox.help._base"]=true;_4.provide("dojox.help._base");_4.require("dojox.rpc.Service");_4.require("dojo.io.script");_4.experimental("dojox.help");console.warn("Script causes side effects (on numbers, strings, and booleans). Call dojox.help.noConflict() if you plan on executing code.");_6.help={locate:function(_7,_8,_9){_9=_9||20;var _a=[];var _b={};var _c;if(_8){if(!_4.isArray(_8)){_8=[_8];}for(var i=0,_d;_d=_8[i];i++){_c=_d;if(_4.isString(_d)){_d=_4.getObject(_d);if(!_d){continue;}}else{if(_4.isObject(_d)){_c=_d.__name__;}else{continue;}}_a.push(_d);if(_c){_c=_c.split(".")[0];if(!_b[_c]&&_4.indexOf(_6.help._namespaces,_c)==-1){_6.help.refresh(_c);}_b[_c]=true;}}}if(!_a.length){_a.push({__name__:"window"});_4.forEach(_6.help._namespaces,function(_e){_b[_e]=true;});}var _f=_7.toLowerCase();var _10=[];out:for(var i=0,_d;_d=_a[i];i++){var _11=_d.__name__||"";var _12=_4.some(_a,function(_13){_13=_13.__name__||"";return (_11.indexOf(_13+".")==0);});if(_11&&!_12){_c=_11.split(".")[0];var _14=[];if(_11=="window"){for(_c in _6.help._names){if(_4.isArray(_6.help._names[_c])){_14=_14.concat(_6.help._names[_c]);}}}else{_14=_6.help._names[_c];}for(var j=0,_15;_15=_14[j];j++){if((_11=="window"||_15.indexOf(_11+".")==0)&&_15.toLowerCase().indexOf(_f)!=-1){if(_15.slice(-10)==".prototype"){continue;}var obj=_4.getObject(_15);if(obj){_10.push([_15,obj]);if(_10.length==_9){break out;}}}}}}_6.help._displayLocated(_10);if(!_4.isMoz){return "";}},refresh:function(_16,_17){if(arguments.length<2){_17=true;}_6.help._recurse(_16,_17);},noConflict:function(_18){if(arguments.length){return _6.help._noConflict(_18);}else{while(_6.help._overrides.length){var _19=_6.help._overrides.pop();var _1a=_19[0];var key=_19[1];var _1b=_1a[key];_1a[key]=_6.help._noConflict(_1b);}}},init:function(_1c,_1d){if(_1c){_6.help._namespaces.concat(_1c);}_4.addOnLoad(function(){_4.require=(function(_1e){return function(){_6.help.noConflict();_1e.apply(_4,arguments);if(_6.help._timer){clearTimeout(_6.help._timer);}_6.help._timer=setTimeout(function(){_4.addOnLoad(function(){_6.help.refresh();_6.help._timer=false;});},500);};})(_4.require);_6.help._recurse();});},_noConflict:function(_1f){if(_1f instanceof String){return _1f.toString();}else{if(_1f instanceof Number){return +_1f;}else{if(_1f instanceof Boolean){return (_1f==true);}else{if(_4.isObject(_1f)){delete _1f.__name__;delete _1f.help;}}}}return _1f;},_namespaces:["dojo","dojox","dijit","djConfig"],_rpc:new _6.rpc.Service(_4.moduleUrl("dojox.rpc.SMDLibrary","dojo-api.smd")),_attributes:["summary","type","returns","parameters"],_clean:function(_20){var obj={};for(var i=0,_21;_21=_6.help._attributes[i];i++){var _22=_20["__"+_21+"__"];if(_22){obj[_21]=_22;}}return obj;},_displayLocated:function(_23){throw new Error("_displayLocated should be overridden in one of the dojox.help packages");},_displayHelp:function(_24,obj){throw new Error("_displayHelp should be overridden in one of the dojox.help packages");},_addVersion:function(obj){if(obj.name){obj.version=[_4.version.major,_4.version.minor,_4.version.patch].join(".");var _25=obj.name.split(".");if(_25[0]=="dojo"||_25[0]=="dijit"||_25[0]=="dojox"){obj.project=_25[0];}}return obj;},_stripPrototype:function(_26){var _27=_26.replace(/\.prototype(\.|$)/g,".");var _28=_27;if(_27.slice(-1)=="."){_28=_27=_27.slice(0,-1);}else{_27=_26;}return [_28,_27];},_help:function(){var _29=this.__name__;var _2a=_6.help._stripPrototype(_29)[0];var _2b=[];for(var i=0,_2c;_2c=_6.help._attributes[i];i++){if(!this["__"+_2c+"__"]){_2b.push(_2c);}}_6.help._displayHelp(true,{name:this.__name__});if(!_2b.length||this.__searched__){_6.help._displayHelp(false,_6.help._clean(this));}else{this.__searched__=true;_6.help._rpc.get(_6.help._addVersion({name:_2a,exact:true,attributes:_2b})).addCallback(this,function(_2d){if(this.toString===_6.help._toString){this.toString(_2d);}if(_2d&&_2d.length){_2d=_2d[0];for(var i=0,_2c;_2c=_6.help._attributes[i];i++){if(_2d[_2c]){this["__"+_2c+"__"]=_2d[_2c];}}_6.help._displayHelp(false,_6.help._clean(this));}else{_6.help._displayHelp(false,false);}});}if(!_4.isMoz){return "";}},_parse:function(_2e){delete this.__searching__;if(_2e&&_2e.length){var _2f=_2e[0].parameters;if(_2f){var _30=["function ",this.__name__,"("];this.__parameters__=_2f;for(var i=0,_31;_31=_2f[i];i++){if(i){_30.push(", ");}_30.push(_31.name);if(_31.types){var _32=[];for(var j=0,_33;_33=_31.types[j];j++){_32.push(_33.title);}if(_32.length){_30.push(": ");_30.push(_32.join("|"));}}if(_31.repeating){_30.push("...");}if(_31.optional){_30.push("?");}}_30.push(")");this.__source__=this.__source__.replace(/function[^\(]*\([^\)]*\)/,_30.join(""));}if(this.__output__){delete this.__output__;console.log(this);}}else{_6.help._displayHelp(false,false);}},_toStrings:{},_toString:function(_34){if(!this.__source__){return this.__name__;}var _35=(!this.__parameters__);this.__parameters__=[];if(_34){_6.help._parse.call(this,_34);}else{if(_35){this.__searching__=true;_6.help._toStrings[_6.help._stripPrototype(this.__name__)[0]]=this;if(_6.help._toStringTimer){clearTimeout(_6.help._toStringTimer);}_6.help._toStringTimer=setTimeout(function(){_6.help.__toString();},50);}}if(!_35||!this.__searching__){return this.__source__;}var _36="function Loading info for "+this.__name__+"... (watch console for result) {}";if(!_4.isMoz){this.__output__=true;return _36;}return {toString:_4.hitch(this,function(){this.__output__=true;return _36;})};},__toString:function(){if(_6.help._toStringTimer){clearTimeout(_6.help._toStringTimer);}var _37=[];_6.help.noConflict(_6.help._toStrings);for(var _38 in _6.help._toStrings){_37.push(_38);}while(_37.length){_6.help._rpc.batch(_6.help._addVersion({names:_37.splice(-50,50),exact:true,attributes:["parameters"]})).addCallback(this,function(_39){for(var i=0,_3a;_3a=_39[i];i++){var fn=_6.help._toStrings[_3a.name];if(fn){_6.help._parse.call(fn,[_3a]);delete _6.help._toStrings[_3a.name];}}});}},_overrides:[],_recursions:[],_names:{},_recurse:function(_3b,_3c){if(arguments.length<2){_3c=true;}var _3d=[];if(_3b&&_4.isString(_3b)){_6.help.__recurse(_4.getObject(_3b),_3b,_3b,_3d,_3c);}else{for(var i=0,ns;ns=_6.help._namespaces[i];i++){if(window[ns]){_6.help._recursions.push([window[ns],ns,ns]);window[ns].__name__=ns;if(!window[ns].help){window[ns].help=_6.help._help;}}}}while(_6.help._recursions.length){var _3e=_6.help._recursions.shift();_6.help.__recurse(_3e[0],_3e[1],_3e[2],_3d,_3c);}for(var i=0,_3f;_3f=_3d[i];i++){delete _3f.__seen__;}},__recurse:function(_40,_41,_42,_43,_44){for(var key in _40){if(key.match(/([^\w_.$]|__[\w_.$]+__)/)){continue;}var _45=_40[key];if(typeof _45=="undefined"||_45===document||_45===window||_45===_6.help._toString||_45===_6.help._help||_45===null||(+_4.isIE&&_45.tagName)||_45.__seen__){continue;}var _46=_4.isFunction(_45);var _47=_4.isObject(_45)&&!_4.isArray(_45)&&!_45.nodeType;var _48=(_42)?(_42+"."+key):key;if(_48=="dojo._blockAsync"){continue;}if(!_45.__name__){var _49=null;if(_4.isString(_45)){_49=String;}else{if(typeof _45=="number"){_49=Number;}else{if(typeof _45=="boolean"){_49=Boolean;}}}if(_49){_45=_40[key]=new _49(_45);}}_45.__seen__=true;_45.__name__=_48;(_6.help._names[_41]=_6.help._names[_41]||[]).push(_48);_43.push(_45);if(!_46){_6.help._overrides.push([_40,key]);}if((_46||_47)&&_44){_6.help._recursions.push([_45,_41,_48]);}if(_46){if(!_45.__source__){_45.__source__=_45.toString().replace(/^function\b ?/,"function "+_48);}if(_45.toString===Function.prototype.toString){_45.toString=_6.help._toString;}}if(!_45.help){_45.help=_6.help._help;}}}};}}};});