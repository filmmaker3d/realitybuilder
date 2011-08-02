/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.string.sprintf"],["require","dojox.string.tokenize"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.string.sprintf"]){_4._hasResource["dojox.string.sprintf"]=true;_4.provide("dojox.string.sprintf");_4.require("dojox.string.tokenize");_6.string.sprintf=function(_7,_8){for(var _9=[],i=1;i<arguments.length;i++){_9.push(arguments[i]);}var _a=new _6.string.sprintf.Formatter(_7);return _a.format.apply(_a,_9);};_6.string.sprintf.Formatter=function(_b){var _c=[];this._mapped=false;this._format=_b;this._tokens=_6.string.tokenize(_b,this._re,this._parseDelim,this);};_4.extend(_6.string.sprintf.Formatter,{_re:/\%(?:\(([\w_]+)\)|([1-9]\d*)\$)?([0 +\-\#]*)(\*|\d+)?(\.)?(\*|\d+)?[hlL]?([\%scdeEfFgGiouxX])/g,_parseDelim:function(_d,_e,_f,_10,_11,_12,_13){if(_d){this._mapped=true;}return {mapping:_d,intmapping:_e,flags:_f,_minWidth:_10,period:_11,_precision:_12,specifier:_13};},_specifiers:{b:{base:2,isInt:true},o:{base:8,isInt:true},x:{base:16,isInt:true},X:{extend:["x"],toUpper:true},d:{base:10,isInt:true},i:{extend:["d"]},u:{extend:["d"],isUnsigned:true},c:{setArg:function(_14){if(!isNaN(_14.arg)){var num=parseInt(_14.arg);if(num<0||num>127){throw new Error("invalid character code passed to %c in sprintf");}_14.arg=isNaN(num)?""+num:String.fromCharCode(num);}}},s:{setMaxWidth:function(_15){_15.maxWidth=(_15.period==".")?_15.precision:-1;}},e:{isDouble:true,doubleNotation:"e"},E:{extend:["e"],toUpper:true},f:{isDouble:true,doubleNotation:"f"},F:{extend:["f"]},g:{isDouble:true,doubleNotation:"g"},G:{extend:["g"],toUpper:true}},format:function(_16){if(this._mapped&&typeof _16!="object"){throw new Error("format requires a mapping");}var str="";var _17=0;for(var i=0,_18;i<this._tokens.length;i++){_18=this._tokens[i];if(typeof _18=="string"){str+=_18;}else{if(this._mapped){if(typeof _16[_18.mapping]=="undefined"){throw new Error("missing key "+_18.mapping);}_18.arg=_16[_18.mapping];}else{if(_18.intmapping){var _17=parseInt(_18.intmapping)-1;}if(_17>=arguments.length){throw new Error("got "+arguments.length+" printf arguments, insufficient for '"+this._format+"'");}_18.arg=arguments[_17++];}if(!_18.compiled){_18.compiled=true;_18.sign="";_18.zeroPad=false;_18.rightJustify=false;_18.alternative=false;var _19={};for(var fi=_18.flags.length;fi--;){var _1a=_18.flags.charAt(fi);_19[_1a]=true;switch(_1a){case " ":_18.sign=" ";break;case "+":_18.sign="+";break;case "0":_18.zeroPad=(_19["-"])?false:true;break;case "-":_18.rightJustify=true;_18.zeroPad=false;break;case "#":_18.alternative=true;break;default:throw Error("bad formatting flag '"+_18.flags.charAt(fi)+"'");}}_18.minWidth=(_18._minWidth)?parseInt(_18._minWidth):0;_18.maxWidth=-1;_18.toUpper=false;_18.isUnsigned=false;_18.isInt=false;_18.isDouble=false;_18.precision=1;if(_18.period=="."){if(_18._precision){_18.precision=parseInt(_18._precision);}else{_18.precision=0;}}var _1b=this._specifiers[_18.specifier];if(typeof _1b=="undefined"){throw new Error("unexpected specifier '"+_18.specifier+"'");}if(_1b.extend){_4.mixin(_1b,this._specifiers[_1b.extend]);delete _1b.extend;}_4.mixin(_18,_1b);}if(typeof _18.setArg=="function"){_18.setArg(_18);}if(typeof _18.setMaxWidth=="function"){_18.setMaxWidth(_18);}if(_18._minWidth=="*"){if(this._mapped){throw new Error("* width not supported in mapped formats");}_18.minWidth=parseInt(arguments[_17++]);if(isNaN(_18.minWidth)){throw new Error("the argument for * width at position "+_17+" is not a number in "+this._format);}if(_18.minWidth<0){_18.rightJustify=true;_18.minWidth=-_18.minWidth;}}if(_18._precision=="*"&&_18.period=="."){if(this._mapped){throw new Error("* precision not supported in mapped formats");}_18.precision=parseInt(arguments[_17++]);if(isNaN(_18.precision)){throw Error("the argument for * precision at position "+_17+" is not a number in "+this._format);}if(_18.precision<0){_18.precision=1;_18.period="";}}if(_18.isInt){if(_18.period=="."){_18.zeroPad=false;}this.formatInt(_18);}else{if(_18.isDouble){if(_18.period!="."){_18.precision=6;}this.formatDouble(_18);}}this.fitField(_18);str+=""+_18.arg;}}return str;},_zeros10:"0000000000",_spaces10:"          ",formatInt:function(_1c){var i=parseInt(_1c.arg);if(!isFinite(i)){if(typeof _1c.arg!="number"){throw new Error("format argument '"+_1c.arg+"' not an integer; parseInt returned "+i);}i=0;}if(i<0&&(_1c.isUnsigned||_1c.base!=10)){i=4294967295+i+1;}if(i<0){_1c.arg=(-i).toString(_1c.base);this.zeroPad(_1c);_1c.arg="-"+_1c.arg;}else{_1c.arg=i.toString(_1c.base);if(!i&&!_1c.precision){_1c.arg="";}else{this.zeroPad(_1c);}if(_1c.sign){_1c.arg=_1c.sign+_1c.arg;}}if(_1c.base==16){if(_1c.alternative){_1c.arg="0x"+_1c.arg;}_1c.arg=_1c.toUpper?_1c.arg.toUpperCase():_1c.arg.toLowerCase();}if(_1c.base==8){if(_1c.alternative&&_1c.arg.charAt(0)!="0"){_1c.arg="0"+_1c.arg;}}},formatDouble:function(_1d){var f=parseFloat(_1d.arg);if(!isFinite(f)){if(typeof _1d.arg!="number"){throw new Error("format argument '"+_1d.arg+"' not a float; parseFloat returned "+f);}f=0;}switch(_1d.doubleNotation){case "e":_1d.arg=f.toExponential(_1d.precision);break;case "f":_1d.arg=f.toFixed(_1d.precision);break;case "g":if(Math.abs(f)<0.0001){_1d.arg=f.toExponential(_1d.precision>0?_1d.precision-1:_1d.precision);}else{_1d.arg=f.toPrecision(_1d.precision);}if(!_1d.alternative){_1d.arg=_1d.arg.replace(/(\..*[^0])0*/,"$1");_1d.arg=_1d.arg.replace(/\.0*e/,"e").replace(/\.0$/,"");}break;default:throw new Error("unexpected double notation '"+_1d.doubleNotation+"'");}_1d.arg=_1d.arg.replace(/e\+(\d)$/,"e+0$1").replace(/e\-(\d)$/,"e-0$1");if(_4.isOpera){_1d.arg=_1d.arg.replace(/^\./,"0.");}if(_1d.alternative){_1d.arg=_1d.arg.replace(/^(\d+)$/,"$1.");_1d.arg=_1d.arg.replace(/^(\d+)e/,"$1.e");}if(f>=0&&_1d.sign){_1d.arg=_1d.sign+_1d.arg;}_1d.arg=_1d.toUpper?_1d.arg.toUpperCase():_1d.arg.toLowerCase();},zeroPad:function(_1e,_1f){_1f=(arguments.length==2)?_1f:_1e.precision;if(typeof _1e.arg!="string"){_1e.arg=""+_1e.arg;}var _20=_1f-10;while(_1e.arg.length<_20){_1e.arg=(_1e.rightJustify)?_1e.arg+this._zeros10:this._zeros10+_1e.arg;}var pad=_1f-_1e.arg.length;_1e.arg=(_1e.rightJustify)?_1e.arg+this._zeros10.substring(0,pad):this._zeros10.substring(0,pad)+_1e.arg;},fitField:function(_21){if(_21.maxWidth>=0&&_21.arg.length>_21.maxWidth){return _21.arg.substring(0,_21.maxWidth);}if(_21.zeroPad){this.zeroPad(_21,_21.minWidth);return;}this.spacePad(_21);},spacePad:function(_22,_23){_23=(arguments.length==2)?_23:_22.minWidth;if(typeof _22.arg!="string"){_22.arg=""+_22.arg;}var _24=_23-10;while(_22.arg.length<_24){_22.arg=(_22.rightJustify)?_22.arg+this._spaces10:this._spaces10+_22.arg;}var pad=_23-_22.arg.length;_22.arg=(_22.rightJustify)?_22.arg+this._spaces10.substring(0,pad):this._spaces10.substring(0,pad)+_22.arg;}});}}};});