/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.wire.XmlWire"],["require","dojox.xml.parser"],["require","dojox.wire.Wire"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.wire.XmlWire"]){_4._hasResource["dojox.wire.XmlWire"]=true;_4.provide("dojox.wire.XmlWire");_4.require("dojox.xml.parser");_4.require("dojox.wire.Wire");_4.declare("dojox.wire.XmlWire",_6.wire.Wire,{_wireClass:"dojox.wire.XmlWire",constructor:function(_7){},_getValue:function(_8){if(!_8||!this.path){return _8;}var _9=_8;var _a=this.path;var i;if(_a.charAt(0)=="/"){i=_a.indexOf("/",1);_a=_a.substring(i+1);}var _b=_a.split("/");var _c=_b.length-1;for(i=0;i<_c;i++){_9=this._getChildNode(_9,_b[i]);if(!_9){return undefined;}}var _d=this._getNodeValue(_9,_b[_c]);return _d;},_setValue:function(_e,_f){if(!this.path){return _e;}var _10=_e;var doc=this._getDocument(_10);var _11=this.path;var i;if(_11.charAt(0)=="/"){i=_11.indexOf("/",1);if(!_10){var _12=_11.substring(1,i);_10=doc.createElement(_12);_e=_10;}_11=_11.substring(i+1);}else{if(!_10){return undefined;}}var _13=_11.split("/");var _14=_13.length-1;for(i=0;i<_14;i++){var _15=this._getChildNode(_10,_13[i]);if(!_15){_15=doc.createElement(_13[i]);_10.appendChild(_15);}_10=_15;}this._setNodeValue(_10,_13[_14],_f);return _e;},_getNodeValue:function(_16,exp){var _17=undefined;if(exp.charAt(0)=="@"){var _18=exp.substring(1);_17=_16.getAttribute(_18);}else{if(exp=="text()"){var _19=_16.firstChild;if(_19){_17=_19.nodeValue;}}else{_17=[];for(var i=0;i<_16.childNodes.length;i++){var _1a=_16.childNodes[i];if(_1a.nodeType===1&&_1a.nodeName==exp){_17.push(_1a);}}}}return _17;},_setNodeValue:function(_1b,exp,_1c){if(exp.charAt(0)=="@"){var _1d=exp.substring(1);if(_1c){_1b.setAttribute(_1d,_1c);}else{_1b.removeAttribute(_1d);}}else{if(exp=="text()"){while(_1b.firstChild){_1b.removeChild(_1b.firstChild);}if(_1c){var _1e=this._getDocument(_1b).createTextNode(_1c);_1b.appendChild(_1e);}}}},_getChildNode:function(_1f,_20){var _21=1;var i1=_20.indexOf("[");if(i1>=0){var i2=_20.indexOf("]");_21=_20.substring(i1+1,i2);_20=_20.substring(0,i1);}var _22=1;for(var i=0;i<_1f.childNodes.length;i++){var _23=_1f.childNodes[i];if(_23.nodeType===1&&_23.nodeName==_20){if(_22==_21){return _23;}_22++;}}return null;},_getDocument:function(_24){if(_24){return (_24.nodeType==9?_24:_24.ownerDocument);}else{return _6.xml.parser.parse();}}});}}};});