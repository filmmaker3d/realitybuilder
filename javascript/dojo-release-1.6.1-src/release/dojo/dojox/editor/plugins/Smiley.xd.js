/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.editor.plugins.Smiley"],["require","dijit._editor._Plugin"],["require","dijit.form.ToggleButton"],["require","dijit.form.DropDownButton"],["require","dojox.editor.plugins._SmileyPalette"],["require","dojo.i18n"],["require","dojox.html.format"],["requireLocalization","dojox.editor.plugins","Smiley",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw","ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.editor.plugins.Smiley"]){_4._hasResource["dojox.editor.plugins.Smiley"]=true;_4.provide("dojox.editor.plugins.Smiley");_4.require("dijit._editor._Plugin");_4.require("dijit.form.ToggleButton");_4.require("dijit.form.DropDownButton");_4.require("dojox.editor.plugins._SmileyPalette");_4.require("dojo.i18n");_4.require("dojox.html.format");_4.experimental("dojox.editor.plugins.Smiley");_4.declare("dojox.editor.plugins.Smiley",_5._editor._Plugin,{iconClassPrefix:"dijitAdditionalEditorIcon",emoticonMarker:"[]",emoticonImageClass:"dojoEditorEmoticon",_initButton:function(){this.dropDown=new _6.editor.plugins._SmileyPalette();this.connect(this.dropDown,"onChange",function(_7){this.button.closeDropDown();this.editor.focus();_7=this.emoticonMarker.charAt(0)+_7+this.emoticonMarker.charAt(1);this.editor.execCommand("inserthtml",_7);});this.i18n=_4.i18n.getLocalization("dojox.editor.plugins","Smiley");this.button=new _5.form.DropDownButton({label:this.i18n.smiley,showLabel:false,iconClass:this.iconClassPrefix+" "+this.iconClassPrefix+"Smiley",tabIndex:"-1",dropDown:this.dropDown});this.emoticonImageRegexp=new RegExp("class=(\"|')"+this.emoticonImageClass+"(\"|')");},updateState:function(){this.button.set("disabled",this.get("disabled"));},setEditor:function(_8){this.editor=_8;this._initButton();this.editor.contentPreFilters.push(_4.hitch(this,this._preFilterEntities));this.editor.contentPostFilters.push(_4.hitch(this,this._postFilterEntities));},_preFilterEntities:function(_9){return _9.replace(/\[([^\]]*)\]/g,_4.hitch(this,this._decode));},_postFilterEntities:function(_a){return _a.replace(/<img [^>]*>/gi,_4.hitch(this,this._encode));},_decode:function(_b,_c){var _d=_6.editor.plugins.Emoticon.fromAscii(_c);return _d?_d.imgHtml(this.emoticonImageClass):_b;},_encode:function(_e){if(_e.search(this.emoticonImageRegexp)>-1){return this.emoticonMarker.charAt(0)+_e.replace(/(<img [^>]*)alt="([^"]*)"([^>]*>)/,"$2")+this.emoticonMarker.charAt(1);}else{return _e;}}});_4.subscribe(_5._scopeName+".Editor.getPlugin",null,function(o){if(o.plugin){return;}if(o.args.name==="smiley"){o.plugin=new _6.editor.plugins.Smiley();}});}}};});