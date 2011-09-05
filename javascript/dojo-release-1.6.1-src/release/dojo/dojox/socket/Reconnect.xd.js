/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.socket.Reconnect"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.socket.Reconnect"]){_4._hasResource["dojox.socket.Reconnect"]=true;_4.provide("dojox.socket.Reconnect");_6.socket.Reconnect=function(_7,_8){_8=_8||{};var _9=_8.reconnectTime||10000;var _a=_4.connect(_7,"onclose",function(_b){clearTimeout(_c);if(!_b.wasClean){_7.disconnected(function(){_6.socket.replace(_7,_d=_7.reconnect());});}});var _c,_d;if(!_7.disconnected){_7.disconnected=function(_e){setTimeout(function(){_e();_c=setTimeout(function(){if(_d.readyState<2){_9=_8.reconnectTime||10000;}},10000);},_9);_9*=_8.backoffRate||2;};}if(!_7.reconnect){_7.reconnect=function(){return _7.args?_6.socket.LongPoll(_7.args):_6.socket.WebSocket({url:_7.URL||_7.url});};}return _7;};}}};});