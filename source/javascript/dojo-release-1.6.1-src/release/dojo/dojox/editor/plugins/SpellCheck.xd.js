/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.editor.plugins.SpellCheck"],["require","dijit.form.TextBox"],["require","dijit.form.DropDownButton"],["require","dijit.TooltipDialog"],["require","dijit.form.MultiSelect"],["require","dojo.io.script"],["require","dijit.Menu"],["requireLocalization","dojox.editor.plugins","SpellCheck",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw","ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.editor.plugins.SpellCheck"]){_4._hasResource["dojox.editor.plugins.SpellCheck"]=true;_4.provide("dojox.editor.plugins.SpellCheck");_4.require("dijit.form.TextBox");_4.require("dijit.form.DropDownButton");_4.require("dijit.TooltipDialog");_4.require("dijit.form.MultiSelect");_4.require("dojo.io.script");_4.require("dijit.Menu");_4.experimental("dojox.editor.plugins.SpellCheck");_4.declare("dojox.editor.plugins._spellCheckControl",[_5._Widget,_5._Templated],{widgetsInTemplate:true,templateString:"<table class='dijitEditorSpellCheckTable'>"+"<tr><td colspan='3' class='alignBottom'><label for='${textId}' id='${textId}_label'>${unfound}</label>"+"<div class='dijitEditorSpellCheckBusyIcon' id='${id}_progressIcon'></div></td></tr>"+"<tr>"+"<td class='dijitEditorSpellCheckBox'><input dojoType='dijit.form.TextBox' required='false' intermediateChanges='true' "+"class='dijitEditorSpellCheckBox' dojoAttachPoint='unfoundTextBox' id='${textId}'/></td>"+"<td><button dojoType='dijit.form.Button' class='blockButton' dojoAttachPoint='skipButton'>${skip}</button></td>"+"<td><button dojoType='dijit.form.Button' class='blockButton' dojoAttachPoint='skipAllButton'>${skipAll}</button></td>"+"</tr>"+"<tr>"+"<td class='alignBottom'><label for='${selectId}'>${suggestions}</td></label>"+"<td colspan='2'><button dojoType='dijit.form.Button' class='blockButton' dojoAttachPoint='toDicButton'>${toDic}</button></td>"+"</tr>"+"<tr>"+"<td>"+"<select dojoType='dijit.form.MultiSelect' id='${selectId}' "+"class='dijitEditorSpellCheckBox listHeight' dojoAttachPoint='suggestionSelect'></select>"+"</td>"+"<td colspan='2'>"+"<button dojoType='dijit.form.Button' class='blockButton' dojoAttachPoint='replaceButton'>${replace}</button>"+"<div class='topMargin'><button dojoType='dijit.form.Button' class='blockButton' "+"dojoAttachPoint='replaceAllButton'>${replaceAll}</button><div>"+"</td>"+"</tr>"+"<tr>"+"<td><div class='topMargin'><button dojoType='dijit.form.Button' dojoAttachPoint='cancelButton'>${cancel}</button></div></td>"+"<td></td>"+"<td></td>"+"</tr>"+"</table>",constructor:function(){this.ignoreChange=false;this.isChanged=false;this.isOpen=false;this.closable=true;},postMixInProperties:function(){this.id=_5.getUniqueId(this.declaredClass.replace(/\./g,"_"));this.textId=this.id+"_textBox";this.selectId=this.id+"_select";},postCreate:function(){var _7=this.suggestionSelect;_4.removeAttr(_7.domNode,"multiple");_7.addItems=function(_8){var _9=this;var o=null;if(_8&&_8.length>0){_4.forEach(_8,function(_a,i){o=_4.create("option",{innerHTML:_a,value:_a},_9.domNode);if(i==0){o.selected=true;}});}};_7.removeItems=function(){_4.empty(this.domNode);};_7.deselectAll=function(){this.containerNode.selectedIndex=-1;};this.connect(this,"onKeyPress","_cancel");this.connect(this.unfoundTextBox,"onKeyPress","_enter");this.connect(this.unfoundTextBox,"onChange","_unfoundTextBoxChange");this.connect(this.suggestionSelect,"onKeyPress","_enter");this.connect(this.skipButton,"onClick","onSkip");this.connect(this.skipAllButton,"onClick","onSkipAll");this.connect(this.toDicButton,"onClick","onAddToDic");this.connect(this.replaceButton,"onClick","onReplace");this.connect(this.replaceAllButton,"onClick","onReplaceAll");this.connect(this.cancelButton,"onClick","onCancel");},onSkip:function(){},onSkipAll:function(){},onAddToDic:function(){},onReplace:function(){},onReplaceAll:function(){},onCancel:function(){},onEnter:function(){},focus:function(){this.unfoundTextBox.focus();},_cancel:function(_b){if(_b.keyCode==_4.keys.ESCAPE){this.onCancel();_4.stopEvent(_b);}},_enter:function(_c){if(_c.keyCode==_4.keys.ENTER){this.onEnter();_4.stopEvent(_c);}},_unfoundTextBoxChange:function(){var id=this.textId+"_label";if(!this.ignoreChange){_4.byId(id).innerHTML=this["replaceWith"];this.isChanged=true;this.suggestionSelect.deselectAll();}else{_4.byId(id).innerHTML=this["unfound"];}},_setUnfoundWordAttr:function(_d){_d=_d||"";this.unfoundTextBox.set("value",_d);},_getUnfoundWordAttr:function(){return this.unfoundTextBox.get("value");},_setSuggestionListAttr:function(_e){var _f=this.suggestionSelect;_e=_e||[];_f.removeItems();_f.addItems(_e);},_getSelectedWordAttr:function(){var _10=this.suggestionSelect.getSelected();if(_10&&_10.length>0){return _10[0].value;}else{return this.unfoundTextBox.get("value");}},_setDisabledAttr:function(_11){this.skipButton.set("disabled",_11);this.skipAllButton.set("disabled",_11);this.toDicButton.set("disabled",_11);this.replaceButton.set("disabled",_11);this.replaceAllButton.set("disabled",_11);},_setInProgressAttr:function(_12){var id=this.id+"_progressIcon",cmd=_12?"removeClass":"addClass";_4[cmd](id,"hidden");}});_4.declare("dojox.editor.plugins._SpellCheckScriptMultiPart",null,{ACTION_QUERY:"query",ACTION_UPDATE:"update",callbackHandle:"callback",maxBufferLength:100,delimiter:" ",label:"response",_timeout:30000,SEC:1000,constructor:function(){this.serviceEndPoint="";this._queue=[];this.isWorking=false;this.exArgs=null;this._counter=0;},send:function(_13,_14){var _15=this,dt=this.delimiter,mbl=this.maxBufferLength,_16=this.label,_17=this.serviceEndPoint,_18=this.callbackHandle,_19=this.exArgs,_1a=this._timeout,l=0,r=0;if(!this._result){this._result=[];}_14=_14||this.ACTION_QUERY;var _1b=function(){var _1c=[];var _1d=0;if(_13&&_13.length>0){_15.isWorking=true;var len=_13.length;do{l=r+1;if((r+=mbl)>len){r=len;}else{while(dt&&_13.charAt(r)!=dt&&r<=len){r++;}}_1c.push({l:l,r:r});_1d++;}while(r<len);_4.forEach(_1c,function(_1e,_1f){var _20={url:_17,action:_14,timeout:_1a,callbackParamName:_18,handle:function(_21,_22){if(++_15._counter<=this.size&&!(_21 instanceof Error)&&_21[_16]&&_4.isArray(_21[_16])){var _23=this.offset;_4.forEach(_21[_16],function(_24){_24.offset+=_23;});_15._result[this.number]=_21[_16];}if(_15._counter==this.size){_15._finalizeCollection(this.action);_15.isWorking=false;if(_15._queue.length>0){(_15._queue.shift())();}}}};_20.content=_19?_4.mixin(_19,{action:_14,content:_13.substring(_1e.l-1,_1e.r)}):{action:_14,content:_13.substring(_1e.l-1,_1e.r)};_20.size=_1d;_20.number=_1f;_20.offset=_1e.l-1;_4.io.script.get(_20);});}};if(!_15.isWorking){_1b();}else{_15._queue.push(_1b);}},_finalizeCollection:function(_25){var _26=this._result,len=_26.length;for(var i=0;i<len;i++){var _27=_26.shift();_26=_26.concat(_27);}if(_25==this.ACTION_QUERY){this.onLoad(_26);}this._counter=0;this._result=[];},onLoad:function(_28){},setWaitingTime:function(_29){this._timeout=_29*this.SEC;}});_4.declare("dojox.editor.plugins.SpellCheck",[_5._editor._Plugin],{url:"",bufferLength:100,interactive:false,timeout:30,button:null,_editor:null,exArgs:null,_cursorSpan:"<span class=\"cursorPlaceHolder\"></span>",_cursorSelector:"cursorPlaceHolder",_incorrectWordsSpan:"<span class='incorrectWordPlaceHolder'>${text}</span>",_ignoredIncorrectStyle:{"cursor":"inherit","borderBottom":"none","backgroundColor":"transparent"},_normalIncorrectStyle:{"cursor":"pointer","borderBottom":"1px dotted red","backgroundColor":"yellow"},_highlightedIncorrectStyle:{"borderBottom":"1px dotted red","backgroundColor":"#b3b3ff"},_selector:"incorrectWordPlaceHolder",_maxItemNumber:3,constructor:function(){this._spanList=[];this._cache={};this._enabled=true;this._iterator=0;},setEditor:function(_2a){this._editor=_2a;this._initButton();this._setNetwork();this._connectUp();},_initButton:function(){var _2b=this,_2c=this._strings=_4.i18n.getLocalization("dojox.editor.plugins","SpellCheck"),_2d=this._dialog=new _5.TooltipDialog();_2d.set("content",(this._dialogContent=new _6.editor.plugins._spellCheckControl({unfound:_2c["unfound"],skip:_2c["skip"],skipAll:_2c["skipAll"],toDic:_2c["toDic"],suggestions:_2c["suggestions"],replaceWith:_2c["replaceWith"],replace:_2c["replace"],replaceAll:_2c["replaceAll"],cancel:_2c["cancel"]})));this.button=new _5.form.DropDownButton({label:_2c["widgetLabel"],showLabel:false,iconClass:"dijitEditorSpellCheckIcon",dropDown:_2d,id:_5.getUniqueId(this.declaredClass.replace(/\./g,"_"))+"_dialogPane",closeDropDown:function(_2e){if(_2b._dialogContent.closable){_2b._dialogContent.isOpen=false;if(_4.isIE){var pos=_2b._iterator,_2f=_2b._spanList;if(pos<_2f.length&&pos>=0){_4.style(_2f[pos],_2b._normalIncorrectStyle);}}if(this._opened){_5.popup.close(this.dropDown);if(_2e){this.focus();}this._opened=false;this.state="";}}}});_2b._dialogContent.isOpen=false;_5.setWaiState(_2d.domNode,"label",this._strings["widgetLabel"]);},_setNetwork:function(){var _30=this.exArgs;if(!this._service){var _31=this._service=new _6.editor.plugins._SpellCheckScriptMultiPart();_31.serviceEndPoint=this.url;_31.maxBufferLength=this.bufferLength;_31.setWaitingTime(this.timeout);if(_30){delete _30.name;delete _30.url;delete _30.interactive;delete _30.timeout;_31.exArgs=_30;}}},_connectUp:function(){var _32=this._editor,_33=this._dialogContent;this.connect(this.button,"set","_disabled");this.connect(this._service,"onLoad","_loadData");this.connect(this._dialog,"onOpen","_openDialog");this.connect(_32,"onKeyPress","_keyPress");this.connect(_32,"onLoad","_submitContent");this.connect(_33,"onSkip","_skip");this.connect(_33,"onSkipAll","_skipAll");this.connect(_33,"onAddToDic","_add");this.connect(_33,"onReplace","_replace");this.connect(_33,"onReplaceAll","_replaceAll");this.connect(_33,"onCancel","_cancel");this.connect(_33,"onEnter","_enter");_32.contentPostFilters.push(this._spellCheckFilter);_4.publish(_5._scopeName+".Editor.plugin.SpellCheck.getParser",[this]);if(!this.parser){console.error("Can not get the word parser!");}},_disabled:function(_34,_35){if(_34=="disabled"){if(_35){this._iterator=0;this._spanList=[];}else{if(this.interactive&&!_35&&this._service){this._submitContent(true);}}this._enabled=!_35;}},_keyPress:function(evt){if(this.interactive){var v=118,V=86,cc=evt.charCode;if(!evt.altKey&&cc==_4.keys.SPACE){this._submitContent();}else{if((evt.ctrlKey&&(cc==v||cc==V))||(!evt.ctrlKey&&evt.charCode)){this._submitContent(true);}}}},_loadData:function(_36){var _37=this._cache,_38=this._editor.get("value"),_39=this._dialogContent;this._iterator=0;_4.forEach(_36,function(d){_37[d.text]=d.suggestion;_37[d.text].correct=false;});if(this._enabled){_39.closable=false;this._markIncorrectWords(_38,_37);_39.closable=true;if(this._dialogContent.isOpen){this._iterator=-1;this._skip();}}},_openDialog:function(){var _3a=this._dialogContent;_3a.ignoreChange=true;_3a.set("unfoundWord","");_3a.set("suggestionList",null);_3a.set("disabled",true);_3a.set("inProgress",true);_3a.isOpen=true;_3a.closable=false;this._submitContent();_3a.closable=true;},_skip:function(evt,_3b){var _3c=this._dialogContent,_3d=this._spanList||[],len=_3d.length,_3e=this._iterator;_3c.closable=false;_3c.isChanged=false;_3c.ignoreChange=true;if(!_3b&&_3e>=0&&_3e<len){this._skipWord(_3e);}while(++_3e<len&&_3d[_3e].edited==true){}if(_3e<len){this._iterator=_3e;this._populateDialog(_3e);this._selectWord(_3e);}else{this._iterator=-1;_3c.set("unfoundWord",this._strings["msg"]);_3c.set("suggestionList",null);_3c.set("disabled",true);_3c.set("inProgress",false);}setTimeout(function(){if(_4.isWebKit){_3c.skipButton.focus();}_3c.focus();_3c.ignoreChange=false;_3c.closable=true;},0);},_skipAll:function(){this._dialogContent.closable=false;this._skipWordAll(this._iterator);this._skip();},_add:function(){var _3f=this._dialogContent;_3f.closable=false;_3f.isOpen=true;this._addWord(this._iterator,_3f.get("unfoundWord"));this._skip();},_replace:function(){var _40=this._dialogContent,_41=this._iterator,_42=_40.get("selectedWord");_40.closable=false;this._replaceWord(_41,_42);this._skip(null,true);},_replaceAll:function(){var _43=this._dialogContent,_44=this._spanList,len=_44.length,_45=_44[this._iterator].innerHTML.toLowerCase(),_46=_43.get("selectedWord");_43.closable=false;for(var _47=0;_47<len;_47++){if(_44[_47].innerHTML.toLowerCase()==_45){this._replaceWord(_47,_46);}}this._skip(null,true);},_cancel:function(){this._dialogContent.closable=true;this._editor.focus();},_enter:function(){if(this._dialogContent.isChanged){this._replace();}else{this._skip();}},_query:function(_48){var _49=this._service,_4a=this._cache,_4b=this.parser.parseIntoWords(this._html2Text(_48))||[];var _4c=[];_4.forEach(_4b,function(_4d){_4d=_4d.toLowerCase();if(!_4a[_4d]){_4a[_4d]=[];_4a[_4d].correct=true;_4c.push(_4d);}});if(_4c.length>0){_49.send(_4c.join(" "));}else{if(!_49.isWorking){this._loadData([]);}}},_html2Text:function(_4e){var _4f=[],_50=false,len=_4e?_4e.length:0;for(var i=0;i<len;i++){if(_4e.charAt(i)=="<"){_50=true;}if(_50==true){_4f.push(" ");}else{_4f.push(_4e.charAt(i));}if(_4e.charAt(i)==">"){_50=false;}}return _4f.join("");},_getBookmark:function(_51){var ed=this._editor,cp=this._cursorSpan;ed.execCommand("inserthtml",cp);var nv=ed.get("value"),_52=nv.indexOf(cp),i=-1;while(++i<_52&&_51.charAt(i)==nv.charAt(i)){}return i;},_moveToBookmark:function(){var ed=this._editor,cps=_4.withGlobal(ed.window,"query",_4,["."+this._cursorSelector]),_53=cps&&cps[0];if(_53){ed._sCall("selectElement",[_53]);ed._sCall("collapse",[true]);var _54=_53.parentNode;if(_54){_54.removeChild(_53);}}},_submitContent:function(_55){if(_55){var _56=this,_57=3000;if(this._delayHandler){clearTimeout(this._delayHandler);this._delayHandler=null;}setTimeout(function(){_56._query(_56._editor.get("value"));},_57);}else{this._query(this._editor.get("value"));}},_populateDialog:function(_58){var _59=this._spanList,_5a=this._cache,_5b=this._dialogContent;_5b.set("disabled",false);if(_58<_59.length&&_59.length>0){var _5c=_59[_58].innerHTML;_5b.set("unfoundWord",_5c);_5b.set("suggestionList",_5a[_5c.toLowerCase()]);_5b.set("inProgress",false);}},_markIncorrectWords:function(_5d,_5e){var _5f=this,_60=this.parser,_61=this._editor,_62=this._incorrectWordsSpan,_63=this._normalIncorrectStyle,_64=this._selector,_65=_60.parseIntoWords(this._html2Text(_5d).toLowerCase()),_66=_60.getIndices(),_67=this._cursorSpan,_68=this._getBookmark(_5d),_69="<span class='incorrectWordPlaceHolder'>".length,_6a=false,_6b=_5d.split(""),_6c=null;for(var i=_65.length-1;i>=0;i--){var _6d=_65[i];if(_5e[_6d]&&!_5e[_6d].correct){var _6e=_66[i],len=_65[i].length,end=_6e+len;if(end<=_68&&!_6a){_6b.splice(_68,0,_67);_6a=true;}_6b.splice(_6e,len,_4.string.substitute(_62,{text:_5d.substring(_6e,end)}));if(_6e<_68&&_68<end&&!_6a){var tmp=_6b[_6e].split("");tmp.splice(_69+_68-_6e,0,_67);_6b[_6e]=tmp.join("");_6a=true;}}}if(!_6a){_6b.splice(_68,0,_67);_6a=true;}_61.set("value",_6b.join(""));_61._cursorToStart=false;this._moveToBookmark();_6c=this._spanList=_4.withGlobal(_61.window,"query",_4,["."+this._selector]);_4.forEach(_6c,function(_6f,i){_6f.id=_64+i;});if(!this.interactive){delete _63.cursor;}_6c.style(_63);if(this.interactive){if(_5f._contextMenu){_5f._contextMenu.uninitialize();_5f._contextMenu=null;}_5f._contextMenu=new _5.Menu({targetNodeIds:[_61.iframe],bindDomNode:function(_70){_70=_4.byId(_70);var cn;var _71,win;if(_70.tagName.toLowerCase()=="iframe"){_71=_70;win=this._iframeContentWindow(_71);cn=_4.withGlobal(win,_4.body);}else{cn=(_70==_4.body()?_4.doc.documentElement:_70);}var _72={node:_70,iframe:_71};_4.attr(_70,"_dijitMenu"+this.id,this._bindings.push(_72));var _73=_4.hitch(this,function(cn){return [_4.connect(cn,this.leftClickToOpen?"onclick":"oncontextmenu",this,function(evt){var _74=evt.target,_75=_5f._strings;if(_4.hasClass(_74,_64)&&!_74.edited){_4.stopEvent(evt);var _76=_5f._maxItemNumber,id=_74.id,_77=id.substring(_64.length),_78=_5e[_74.innerHTML.toLowerCase()],_79=_78.length;this.destroyDescendants();if(_79==0){this.addChild(new _5.MenuItem({label:_75["iMsg"],disabled:true}));}else{for(var i=0;i<_76&&i<_79;i++){this.addChild(new _5.MenuItem({label:_78[i],onClick:(function(){var idx=_77,txt=_78[i];return function(){_5f._replaceWord(idx,txt);_61.focus();};})()}));}}this.addChild(new _5.MenuSeparator());this.addChild(new _5.MenuItem({label:_75["iSkip"],onClick:function(){_5f._skipWord(_77);_61.focus();}}));this.addChild(new _5.MenuItem({label:_75["iSkipAll"],onClick:function(){_5f._skipWordAll(_77);_61.focus();}}));this.addChild(new _5.MenuSeparator());this.addChild(new _5.MenuItem({label:_75["toDic"],onClick:function(){_5f._addWord(_77);_61.focus();}}));this._scheduleOpen(_74,_71,{x:evt.pageX,y:evt.pageY});}}),_4.connect(cn,"onkeydown",this,function(evt){if(evt.shiftKey&&evt.keyCode==_4.keys.F10){_4.stopEvent(evt);this._scheduleOpen(evt.target,_71);}})];});_72.connects=cn?_73(cn):[];if(_71){_72.onloadHandler=_4.hitch(this,function(){var win=this._iframeContentWindow(_71);cn=_4.withGlobal(win,_4.body);_72.connects=_73(cn);});if(_71.addEventListener){_71.addEventListener("load",_72.onloadHandler,false);}else{_71.attachEvent("onload",_72.onloadHandler);}}}});}},_selectWord:function(_7a){var _7b=this._spanList,win=this._editor.window;if(_7a<_7b.length&&_7b.length>0){_4.withGlobal(win,"selectElement",_5._editor.selection,[_7b[_7a]]);_4.withGlobal(win,"collapse",_5._editor.selection,[true]);this._findText(_7b[_7a].innerHTML,false,false);if(_4.isIE){_4.style(_7b[_7a],this._highlightedIncorrectStyle);}}},_replaceWord:function(_7c,_7d){var _7e=this._spanList;_7e[_7c].innerHTML=_7d;_4.style(_7e[_7c],this._ignoredIncorrectStyle);_7e[_7c].edited=true;},_skipWord:function(_7f){var _80=this._spanList;_4.style(_80[_7f],this._ignoredIncorrectStyle);this._cache[_80[_7f].innerHTML.toLowerCase()].correct=true;_80[_7f].edited=true;},_skipWordAll:function(_81,_82){var _83=this._spanList,len=_83.length;_82=_82||_83[_81].innerHTML.toLowerCase();for(var i=0;i<len;i++){if(!_83[i].edited&&_83[i].innerHTML.toLowerCase()==_82){this._skipWord(i);}}},_addWord:function(_84,_85){var _86=this._service;_86.send(_85||this._spanList[_84].innerHTML.toLowerCase(),_86.ACTION_UPDATE);this._skipWordAll(_84,_85);},_findText:function(txt,_87,_88){var ed=this._editor,win=ed.window,_89=false;if(txt){if(win.find){_89=win.find(txt,_87,_88,false,false,false,false);}else{var doc=ed.document;if(doc.selection){this._editor.focus();var _8a=doc.body.createTextRange();var _8b=doc.selection?doc.selection.createRange():null;if(_8b){if(_88){_8a.setEndPoint("EndToStart",_8b);}else{_8a.setEndPoint("StartToEnd",_8b);}}var _8c=_87?4:0;if(_88){_8c=_8c|1;}_89=_8a.findText(txt,_8a.text.length,_8c);if(_89){_8a.select();}}}}return _89;},_spellCheckFilter:function(_8d){var _8e=/<span class=["']incorrectWordPlaceHolder["'].*?>(.*?)<\/span>/g;return _8d.replace(_8e,"$1");}});_4.subscribe(_5._scopeName+".Editor.getPlugin",null,function(o){if(o.plugin){return;}var _8f=o.args.name.toLowerCase();if(_8f==="spellcheck"){o.plugin=new _6.editor.plugins.SpellCheck({url:("url" in o.args)?o.args.url:"",interactive:("interactive" in o.args)?o.args.interactive:false,bufferLength:("bufferLength" in o.args)?o.args.bufferLength:100,timeout:("timeout" in o.args)?o.args.timeout:30,exArgs:o.args});}});}}};});