/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.form.PasswordValidator"],["require","dijit.form._FormWidget"],["require","dijit.form.ValidationTextBox"],["requireLocalization","dojox.form","PasswordValidator",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw","ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.form.PasswordValidator"]){_4._hasResource["dojox.form.PasswordValidator"]=true;_4.provide("dojox.form.PasswordValidator");_4.require("dijit.form._FormWidget");_4.require("dijit.form.ValidationTextBox");_4.declare("dojox.form._ChildTextBox",_5.form.ValidationTextBox,{containerWidget:null,type:"password",reset:function(){_5.form.ValidationTextBox.prototype._setValueAttr.call(this,"",true);this._hasBeenBlurred=false;},postCreate:function(){this.inherited(arguments);if(!this.name){_4.removeAttr(this.focusNode,"name");}this.connect(this.focusNode,"onkeypress","_onChildKeyPress");},_onChildKeyPress:function(e){if(e&&e.keyCode==_4.keys.ENTER){this._setBlurValue();}}});_4.declare("dojox.form._OldPWBox",_6.form._ChildTextBox,{_isPWValid:false,_setValueAttr:function(_7,_8){if(_7===""){_7=_6.form._OldPWBox.superclass.attr.call(this,"value");}if(_8!==null){this._isPWValid=this.containerWidget.pwCheck(_7);}this.inherited(arguments);this.containerWidget._childValueAttr(this.containerWidget._inputWidgets[1].get("value"));},isValid:function(_9){return this.inherited("isValid",arguments)&&this._isPWValid;},_update:function(e){if(this._hasBeenBlurred){this.validate(true);}this._onMouse(e);},_getValueAttr:function(){if(this.containerWidget._started&&this.containerWidget.isValid()){return this.inherited(arguments);}return "";},_setBlurValue:function(){var _a=_5.form.ValidationTextBox.prototype._getValueAttr.call(this);this._setValueAttr(_a,(this.isValid?this.isValid():true));}});_4.declare("dojox.form._NewPWBox",_6.form._ChildTextBox,{required:true,onChange:function(){this.containerWidget._inputWidgets[2].validate(false);this.inherited(arguments);}});_4.declare("dojox.form._VerifyPWBox",_6.form._ChildTextBox,{isValid:function(_b){return this.inherited("isValid",arguments)&&(this.get("value")==this.containerWidget._inputWidgets[1].get("value"));}});_4.declare("dojox.form.PasswordValidator",_5.form._FormValueWidget,{required:true,_inputWidgets:null,oldName:"",templateString:_4.cache("dojox.form","resources/PasswordValidator.html","<div dojoAttachPoint=\"containerNode\">\r\n\t<input type=\"hidden\" name=\"${name}\" value=\"\" dojoAttachPoint=\"focusNode\" />\r\n</div>\r\n"),_hasBeenBlurred:false,isValid:function(_c){return _4.every(this._inputWidgets,function(i){if(i&&i._setStateClass){i._setStateClass();}return (!i||i.isValid());});},validate:function(_d){return _4.every(_4.map(this._inputWidgets,function(i){if(i&&i.validate){i._hasBeenBlurred=(i._hasBeenBlurred||this._hasBeenBlurred);return i.validate();}return true;},this),"return item;");},reset:function(){this._hasBeenBlurred=false;_4.forEach(this._inputWidgets,function(i){if(i&&i.reset){i.reset();}},this);},_createSubWidgets:function(){var _e=this._inputWidgets,_f=_4.i18n.getLocalization("dojox.form","PasswordValidator",this.lang);_4.forEach(_e,function(i,idx){if(i){var p={containerWidget:this},c;if(idx===0){p.name=this.oldName;p.invalidMessage=_f.badPasswordMessage;c=_6.form._OldPWBox;}else{if(idx===1){p.required=this.required;c=_6.form._NewPWBox;}else{if(idx===2){p.invalidMessage=_f.nomatchMessage;c=_6.form._VerifyPWBox;}}}_e[idx]=new c(p,i);}},this);},pwCheck:function(_10){return false;},postCreate:function(){this.inherited(arguments);var _11=this._inputWidgets=[];_4.forEach(["old","new","verify"],function(i){_11.push(_4.query("input[pwType="+i+"]",this.containerNode)[0]);},this);if(!_11[1]||!_11[2]){throw new Error("Need at least pwType=\"new\" and pwType=\"verify\"");}if(this.oldName&&!_11[0]){throw new Error("Need to specify pwType=\"old\" if using oldName");}this.containerNode=this.domNode;this._createSubWidgets();this.connect(this._inputWidgets[1],"_setValueAttr","_childValueAttr");this.connect(this._inputWidgets[2],"_setValueAttr","_childValueAttr");},_childValueAttr:function(v){this.set("value",this.isValid()?v:"");},_setDisabledAttr:function(_12){this.inherited(arguments);_4.forEach(this._inputWidgets,function(i){if(i&&i.set){i.set("disabled",_12);}});},_setRequiredAttribute:function(_13){this.required=_13;_4.attr(this.focusNode,"required",_13);_5.setWaiState(this.focusNode,"required",_13);this._refreshState();_4.forEach(this._inputWidgets,function(i){if(i&&i.set){i.set("required",_13);}});},_setValueAttr:function(v){this.inherited(arguments);_4.attr(this.focusNode,"value",v);},_getValueAttr:function(){return this.inherited(arguments)||"";},focus:function(){var f=false;_4.forEach(this._inputWidgets,function(i){if(i&&!i.isValid()&&!f){i.focus();f=true;}});if(!f){this._inputWidgets[1].focus();}}});}}};});