/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.xml.widgetParser"],["require","dojox.xml.parser"],["require","dojo.parser"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.xml.widgetParser"]){_4._hasResource["dojox.xml.widgetParser"]=true;_4.provide("dojox.xml.widgetParser");_4.require("dojox.xml.parser");_4.require("dojo.parser");_6.xml.widgetParser=new function(){var d=_4;this.parseNode=function(_7){var _8=[];d.query("script[type='text/xml']",_7).forEach(function(_9){_8.push.apply(_8,this._processScript(_9));},this).orphan();return d.parser.instantiate(_8);};this._processScript=function(_a){var _b=_a.src?d._getText(_a.src):_a.innerHTML||_a.firstChild.nodeValue;var _c=this.toHTML(_6.xml.parser.parse(_b).firstChild);var _d=d.query("[dojoType]",_c);_4.query(">",_c).place(_a,"before");_a.parentNode.removeChild(_a);return _d;};this.toHTML=function(_e){var _f;var _10=_e.nodeName;var dd=_4.doc;var _11=_e.nodeType;if(_11>=3){return dd.createTextNode((_11==3||_11==4)?_e.nodeValue:"");}var _12=_e.localName||_10.split(":").pop();var _13=_e.namespaceURI||(_e.getNamespaceUri?_e.getNamespaceUri():"");if(_13=="html"){_f=dd.createElement(_12);}else{var _14=_13+"."+_12;_f=_f||dd.createElement((_14=="dijit.form.ComboBox")?"select":"div");_f.setAttribute("dojoType",_14);}d.forEach(_e.attributes,function(_15){var _16=_15.name||_15.nodeName;var _17=_15.value||_15.nodeValue;if(_16.indexOf("xmlns")!=0){if(_4.isIE&&_16=="style"){_f.style.setAttribute("cssText",_17);}else{_f.setAttribute(_16,_17);}}});d.forEach(_e.childNodes,function(cn){var _18=this.toHTML(cn);if(_12=="script"){_f.text+=_18.nodeValue;}else{_f.appendChild(_18);}},this);return _f;};}();}}};});