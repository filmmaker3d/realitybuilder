/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.xmpp.UserService"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.xmpp.UserService"]){_4._hasResource["dojox.xmpp.UserService"]=true;_4.provide("dojox.xmpp.UserService");_4.declare("dojox.xmpp.UserService",null,{constructor:function(_7){this.session=_7;},getPersonalProfile:function(){var _8={id:this.session.getNextIqId(),type:"get"};var _9=new _6.string.Builder(_6.xmpp.util.createElement("iq",_8,false));_9.append(_6.xmpp.util.createElement("query",{xmlns:"jabber:iq:private"},false));_9.append(_6.xmpp.util.createElement("sunmsgr",{xmlsns:"sun:xmpp:properties"},true));_9.append("</query></iq>");var _a=this.session.dispatchPacket(_9.toString(),"iq",_8.id);_a.addCallback(this,"_onGetPersonalProfile");},setPersonalProfile:function(_b){var _c={id:this.session.getNextIqId(),type:"set"};var _d=new _6.string.Builder(_6.xmpp.util.createElement("iq",_c,false));_d.append(_6.xmpp.util.createElement("query",{xmlns:"jabber:iq:private"},false));_d.append(_6.xmpp.util.createElement("sunmsgr",{xmlsns:"sun:xmpp:properties"},false));for(var _e in _b){_d.append(_6.xmpp.util.createElement("property",{name:_e},false));_d.append(_6.xmpp.util.createElement("value",{},false));_d.append(_b[_e]);_d.append("</value></props>");}_d.append("</sunmsgr></query></iq>");var _f=this.session.dispatchPacket(_d.toString(),"iq",_c.id);_f.addCallback(this,"_onSetPersonalProfile");},_onSetPersonalProfile:function(_10){if(_10.getAttribute("type")=="result"){this.onSetPersonalProfile(_10.getAttribute("id"));}else{if(_10.getAttribute("type")=="error"){var err=this.session.processXmppError(_10);this.onSetPersonalProfileFailure(err);}}},onSetPersonalProfile:function(id){},onSetPersonalProfileFailure:function(err){},_onGetPersonalProfile:function(_11){if(_11.getAttribute("type")=="result"){var _12={};if(_11.hasChildNodes()){var _13=_11.firstChild;if((_13.nodeName=="query")&&(_13.getAttribute("xmlns")=="jabber:iq:private")){var _14=_13.firstChild;if((_14.nodeName=="query")&&(_14.getAttributes("xmlns")=="sun:xmpp:properties")){for(var i=0;i<_14.childNodes.length;i++){var n=_14.childNodes[i];if(n.nodeName=="property"){var _15=n.getAttribute("name");var val=n.firstChild||"";_12[_15]=val;}}}}this.onGetPersonalProfile(_12);}}else{if(_11.getAttribute("type")=="error"){var err=this.session.processXmppError(_11);this.onGetPersonalProfileFailure(err);}}return _11;},onGetPersonalProfile:function(_16){},onGetPersonalProfileFailure:function(err){}});}}};});