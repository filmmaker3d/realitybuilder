/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.wire.DataWire"],["require","dojox.wire.Wire"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.wire.DataWire"]){_4._hasResource["dojox.wire.DataWire"]=true;_4.provide("dojox.wire.DataWire");_4.require("dojox.wire.Wire");_4.declare("dojox.wire.DataWire",_6.wire.Wire,{_wireClass:"dojox.wire.DataWire",constructor:function(_7){if(!this.dataStore&&this.parent){this.dataStore=this.parent.dataStore;}},_getValue:function(_8){if(!_8||!this.attribute||!this.dataStore){return _8;}var _9=_8;var _a=this.attribute.split(".");for(var i in _a){_9=this._getAttributeValue(_9,_a[i]);if(!_9){return undefined;}}return _9;},_setValue:function(_b,_c){if(!_b||!this.attribute||!this.dataStore){return _b;}var _d=_b;var _e=this.attribute.split(".");var _f=_e.length-1;for(var i=0;i<_f;i++){_d=this._getAttributeValue(_d,_e[i]);if(!_d){return undefined;}}this._setAttributeValue(_d,_e[_f],_c);return _b;},_getAttributeValue:function(_10,_11){var _12=undefined;var i1=_11.indexOf("[");if(i1>=0){var i2=_11.indexOf("]");var _13=_11.substring(i1+1,i2);_11=_11.substring(0,i1);var _14=this.dataStore.getValues(_10,_11);if(_14){if(!_13){_12=_14;}else{_12=_14[_13];}}}else{_12=this.dataStore.getValue(_10,_11);}return _12;},_setAttributeValue:function(_15,_16,_17){var i1=_16.indexOf("[");if(i1>=0){var i2=_16.indexOf("]");var _18=_16.substring(i1+1,i2);_16=_16.substring(0,i1);var _19=null;if(!_18){_19=_17;}else{_19=this.dataStore.getValues(_15,_16);if(!_19){_19=[];}_19[_18]=_17;}this.dataStore.setValues(_15,_16,_19);}else{this.dataStore.setValue(_15,_16,_17);}}});}}};});