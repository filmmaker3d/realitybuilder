/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.editor.plugins.PasteFromWord"],["require","dojo.string"],["require","dijit._editor._Plugin"],["require","dijit.form.Button"],["require","dijit.Dialog"],["require","dojo.i18n"],["require","dojox.html.format"],["requireLocalization","dojox.editor.plugins","PasteFromWord",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw","ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.editor.plugins.PasteFromWord"]){_4._hasResource["dojox.editor.plugins.PasteFromWord"]=true;_4.provide("dojox.editor.plugins.PasteFromWord");_4.require("dojo.string");_4.require("dijit._editor._Plugin");_4.require("dijit.form.Button");_4.require("dijit.Dialog");_4.require("dojo.i18n");_4.require("dojox.html.format");_4.declare("dojox.editor.plugins.PasteFromWord",_5._editor._Plugin,{iconClassPrefix:"dijitAdditionalEditorIcon",width:"400px",height:"300px",_template:["<div class='dijitPasteFromWordEmbeddedRTE'>","<div style='width: ${width}; padding-top: 5px; padding-bottom: 5px;'>${instructions}</div>","<div id='${uId}_rte' style='width: ${width}; height: ${height}'></div>","<table style='width: ${width}' tabindex='-1'>","<tbody>","<tr>","<td align='center'>","<button type='button' dojoType='dijit.form.Button' id='${uId}_paste'>${paste}</button>","&nbsp;","<button type='button' dojoType='dijit.form.Button' id='${uId}_cancel'>${cancel}</button>","</td>","</tr>","</tbody>","</table>","</div>"].join(""),_filters:[{regexp:/(<meta\s*[^>]*\s*>)|(<\s*link\s* href="file:[^>]*\s*>)|(<\/?\s*\w+:[^>]*\s*>)/gi,handler:""},{regexp:/(?:<style([^>]*)>([\s\S]*?)<\/style>|<link\s+(?=[^>]*rel=['"]?stylesheet)([^>]*?href=(['"])([^>]*?)\4[^>\/]*)\/?>)/gi,handler:""},{regexp:/(class="Mso[^"]*")|(<!--(.|\s){1,}?-->)/gi,handler:""},{regexp:/(<p[^>]*>\s*(\&nbsp;|\u00A0)*\s*<\/p[^>]*>)|(<p[^>]*>\s*<font[^>]*>\s*(\&nbsp;|\u00A0)*\s*<\/\s*font\s*>\s<\/p[^>]*>)/ig,handler:""},{regexp:/(style="[^"]*mso-[^;][^"]*")|(style="margin:\s*[^;"]*;")/gi,handler:""},{regexp:/(<\s*script[^>]*>((.|\s)*?)<\\?\/\s*script\s*>)|(<\s*script\b([^<>]|\s)*>?)|(<[^>]*=(\s|)*[("|')]javascript:[^$1][(\s|.)]*[$1][^>]*>)/ig,handler:""}],_initButton:function(){var _7=_4.i18n.getLocalization("dojox.editor.plugins","PasteFromWord");this.button=new _5.form.Button({label:_7["pasteFromWord"],showLabel:false,iconClass:this.iconClassPrefix+" "+this.iconClassPrefix+"PasteFromWord",tabIndex:"-1",onClick:_4.hitch(this,"_openDialog")});this._uId=_5.getUniqueId(this.editor.id);_7.uId=this._uId;_7.width=this.width||"400px";_7.height=this.height||"300px";this._dialog=new _5.Dialog({title:_7["pasteFromWord"]}).placeAt(_4.body());this._dialog.set("content",_4.string.substitute(this._template,_7));_4.style(_4.byId(this._uId+"_rte"),"opacity",0.001);this.connect(_5.byId(this._uId+"_paste"),"onClick","_paste");this.connect(_5.byId(this._uId+"_cancel"),"onClick","_cancel");this.connect(this._dialog,"onHide","_clearDialog");},updateState:function(){this.button.set("disabled",this.get("disabled"));},setEditor:function(_8){this.editor=_8;this._initButton();},_openDialog:function(){this._dialog.show();if(!this._rte){setTimeout(_4.hitch(this,function(){this._rte=new _5._editor.RichText({height:this.height||"300px"},this._uId+"_rte");this._rte.onLoadDeferred.addCallback(_4.hitch(this,function(){_4.animateProperty({node:this._rte.domNode,properties:{opacity:{start:0.001,end:1}}}).play();}));}),100);}},_paste:function(){var _9=_6.html.format.prettyPrint(this._rte.get("value"));this._dialog.hide();var i;for(i=0;i<this._filters.length;i++){var _a=this._filters[i];_9=_9.replace(_a.regexp,_a.handler);}_9=_6.html.format.prettyPrint(_9);this.editor.execCommand("inserthtml",_9);},_cancel:function(){this._dialog.hide();},_clearDialog:function(){this._rte.set("value","");},destroy:function(){if(this._rte){this._rte.destroy();}if(this._dialog){this._dialog.destroyRecursive();}delete this._dialog;delete this._rte;this.inherited(arguments);}});_4.subscribe(_5._scopeName+".Editor.getPlugin",null,function(o){if(o.plugin){return;}var _b=o.args.name.toLowerCase();if(_b==="pastefromword"){o.plugin=new _6.editor.plugins.PasteFromWord({width:("width" in o.args)?o.args.width:"400px",height:("height" in o.args)?o.args.width:"300px"});}});}}};});