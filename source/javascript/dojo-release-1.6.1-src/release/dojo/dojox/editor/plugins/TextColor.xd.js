/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.editor.plugins.TextColor"],["require","dijit.TooltipDialog"],["require","dijit.form.Button"],["require","dijit._editor._Plugin"],["require","dojox.widget.ColorPicker"],["require","dojo.i18n"],["requireLocalization","dojox.editor.plugins","TextColor",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw","ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.editor.plugins.TextColor"]){_4._hasResource["dojox.editor.plugins.TextColor"]=true;_4.provide("dojox.editor.plugins.TextColor");_4.require("dijit.TooltipDialog");_4.require("dijit.form.Button");_4.require("dijit._editor._Plugin");_4.require("dojox.widget.ColorPicker");_4.require("dojo.i18n");_4.experimental("dojox.editor.plugins.TextColor");_4.declare("dojox.editor.plugins._TextColorDropDown",[_5._Widget,_5._Templated],{templateString:"<div style='display: none; position: absolute; top: -10000; z-index: -10000'>"+"<div dojoType='dijit.TooltipDialog' dojoAttachPoint='dialog' class='dojoxEditorColorPicker'>"+"<div dojoType='dojox.widget.ColorPicker' dojoAttachPoint='_colorPicker'></div>"+"<br>"+"<center>"+"<button dojoType='dijit.form.Button' type='button' dojoAttachPoint='_setButton'>${setButtonText}</button>"+"&nbsp;"+"<button dojoType='dijit.form.Button' type='button' dojoAttachPoint='_cancelButton'>${cancelButtonText}</button>"+"</center>"+"</div>"+"</div>",widgetsInTemplate:true,constructor:function(){var _7=_4.i18n.getLocalization("dojox.editor.plugins","TextColor");_4.mixin(this,_7);},startup:function(){if(!this._started){this.inherited(arguments);this.connect(this._setButton,"onClick",_4.hitch(this,function(){this.onChange(this.get("value"));}));this.connect(this._cancelButton,"onClick",_4.hitch(this,function(){_5.popup.close(this.dialog);this.onCancel();}));_4.style(this.domNode,"display","block");}},_setValueAttr:function(_8,_9){this._colorPicker.set("value",_8,_9);},_getValueAttr:function(){return this._colorPicker.get("value");},onChange:function(_a){},onCancel:function(){}});_4.declare("dojox.editor.plugins.TextColor",_5._editor._Plugin,{buttonClass:_5.form.DropDownButton,useDefaultCommand:false,constructor:function(){this._picker=new _6.editor.plugins._TextColorDropDown();_4.body().appendChild(this._picker.domNode);this._picker.startup();this.dropDown=this._picker.dialog;this.connect(this._picker,"onChange",function(_b){this.editor.execCommand(this.command,_b);});this.connect(this._picker,"onCancel",function(){this.editor.focus();});},updateState:function(){var _c=this.editor;var _d=this.command;if(!_c||!_c.isLoaded||!_d.length){return;}var _e=this.get("disabled");var _f;if(this.button){this.button.set("disabled",_e);if(_e){return;}try{_f=_c.queryCommandValue(_d)||"";}catch(e){_f="";}}if(_f==""){_f="#000000";}if(_f=="transparent"){_f="#ffffff";}if(typeof _f=="string"){if(_f.indexOf("rgb")>-1){_f=_4.colorFromRgb(_f).toHex();}}else{_f=((_f&255)<<16)|(_f&65280)|((_f&16711680)>>>16);_f=_f.toString(16);_f="#000000".slice(0,7-_f.length)+_f;}if(_f!==this._picker.get("value")){this._picker.set("value",_f,false);}},destroy:function(){this.inherited(arguments);this._picker.destroyRecursive();delete this._picker;}});_4.subscribe(_5._scopeName+".Editor.getPlugin",null,function(o){if(o.plugin){return;}switch(o.args.name){case "foreColor":case "hiliteColor":o.plugin=new _6.editor.plugins.TextColor({command:o.args.name});}});}}};});