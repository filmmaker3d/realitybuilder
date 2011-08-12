/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.xmpp.util"],["require","dojox.string.Builder"],["require","dojox.encoding.base64"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.xmpp.util"]){_4._hasResource["dojox.xmpp.util"]=true;_4.provide("dojox.xmpp.util");_4.require("dojox.string.Builder");_4.require("dojox.encoding.base64");_6.xmpp.util.xmlEncode=function(_7){if(_7){_7=_7.replace("&","&amp;").replace(">","&gt;").replace("<","&lt;").replace("'","&apos;").replace("\"","&quot;");}return _7;};_6.xmpp.util.encodeJid=function(_8){var _9=new _6.string.Builder();for(var i=0;i<_8.length;i++){var ch=_8.charAt(i);var _a=ch;switch(ch){case " ":_a="\\20";break;case "\"":_a="\\22";break;case "#":_a="\\23";break;case "&":_a="\\26";break;case "'":_a="\\27";break;case "/":_a="\\2f";break;case ":":_a="\\3a";break;case "<":_a="\\3c";break;case ">":_a="\\3e";break;}_9.append(_a);}return _9.toString();};_6.xmpp.util.decodeJid=function(_b){_b=_b.replace(/\\([23][02367acef])/g,function(_c){switch(_c){case "\\20":return " ";case "\\22":return "\"";case "\\23":return "#";case "\\26":return "&";case "\\27":return "'";case "\\2f":return "/";case "\\3a":return ":";case "\\3c":return "<";case "\\3e":return ">";}return "ARG";});return _b;};_6.xmpp.util.createElement=function(_d,_e,_f){var _10=new _6.string.Builder("<");_10.append(_d+" ");for(var _11 in _e){_10.append(_11+"=\"");_10.append(_e[_11]);_10.append("\" ");}if(_f){_10.append("/>");}else{_10.append(">");}return _10.toString();};_6.xmpp.util.stripHtml=function(str){var re=/<[^>]*?>/gi;for(var i=0;i<arguments.length;i++){}return str.replace(re,"");};_6.xmpp.util.decodeHtmlEntities=function(str){var ta=_4.doc.createElement("textarea");ta.innerHTML=str.replace(/</g,"&lt;").replace(/>/g,"&gt;");return ta.value;};_6.xmpp.util.htmlToPlain=function(str){str=_6.xmpp.util.decodeHtmlEntities(str);str=str.replace(/<br\s*[i\/]{0,1}>/gi,"\n");str=_6.xmpp.util.stripHtml(str);return str;};_6.xmpp.util.Base64={};_6.xmpp.util.Base64.encode=function(_12){var s2b=function(s){var b=[];for(var i=0;i<s.length;++i){b.push(s.charCodeAt(i));}return b;};return _6.encoding.base64.encode(s2b(_12));};_6.xmpp.util.Base64.decode=function(_13){var b2s=function(b){var s=[];_4.forEach(b,function(c){s.push(String.fromCharCode(c));});return s.join("");};return b2s(_6.encoding.base64.decode(_13));};}}};});