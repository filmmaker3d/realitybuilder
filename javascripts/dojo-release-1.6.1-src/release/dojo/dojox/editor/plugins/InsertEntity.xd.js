/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.editor.plugins.InsertEntity"],["require","dijit.TooltipDialog"],["require","dijit._editor._Plugin"],["require","dijit.form.Button"],["require","dojox.html.entities"],["require","dojox.editor.plugins.EntityPalette"],["require","dojo.i18n"],["requireLocalization","dojox.editor.plugins","InsertEntity",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw","ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.editor.plugins.InsertEntity"]){_4._hasResource["dojox.editor.plugins.InsertEntity"]=true;_4.provide("dojox.editor.plugins.InsertEntity");_4.require("dijit.TooltipDialog");_4.require("dijit._editor._Plugin");_4.require("dijit.form.Button");_4.require("dojox.html.entities");_4.require("dojox.editor.plugins.EntityPalette");_4.require("dojo.i18n");_4.declare("dojox.editor.plugins.InsertEntity",_5._editor._Plugin,{iconClassPrefix:"dijitAdditionalEditorIcon",_initButton:function(){this.dropDown=new _6.editor.plugins.EntityPalette({showCode:this.showCode,showEntityName:this.showEntityName});this.connect(this.dropDown,"onChange",function(_7){this.button.closeDropDown();this.editor.focus();this.editor.execCommand("inserthtml",_7);});var _8=_4.i18n.getLocalization("dojox.editor.plugins","InsertEntity");this.button=new _5.form.DropDownButton({label:_8["insertEntity"],showLabel:false,iconClass:this.iconClassPrefix+" "+this.iconClassPrefix+"InsertEntity",tabIndex:"-1",dropDown:this.dropDown});},updateState:function(){this.button.set("disabled",this.get("disabled"));},setEditor:function(_9){this.editor=_9;this._initButton();this.editor.addKeyHandler("s",true,true,_4.hitch(this,function(){this.button.openDropDown();this.dropDown.focus();}));_9.contentPreFilters.push(this._preFilterEntities);_9.contentPostFilters.push(this._postFilterEntities);},_preFilterEntities:function(s){return _6.html.entities.decode(s,_6.html.entities.latin);},_postFilterEntities:function(s){return _6.html.entities.encode(s,_6.html.entities.latin);}});_4.subscribe(_5._scopeName+".Editor.getPlugin",null,function(o){if(o.plugin){return;}var _a=o.args.name?o.args.name.toLowerCase():"";if(_a==="insertentity"){o.plugin=new _6.editor.plugins.InsertEntity({showCode:("showCode" in o.args)?o.args.showCode:false,showEntityName:("showEntityName" in o.args)?o.args.showEntityName:false});}});}}};});