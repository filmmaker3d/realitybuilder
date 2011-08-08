/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.charting.themes.Tufte"],["require","dojox.charting.Theme"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.charting.themes.Tufte"]){_4._hasResource["dojox.charting.themes.Tufte"]=true;_4.provide("dojox.charting.themes.Tufte");_4.require("dojox.charting.Theme");_6.charting.themes.Tufte=new _6.charting.Theme({chart:{stroke:null,fill:"inherit"},plotarea:{stroke:null,fill:"transparent"},axis:{stroke:{width:1,color:"#ccc"},majorTick:{color:"black",width:1,length:5},minorTick:{color:"#666",width:1,length:2},font:"normal normal normal 8pt Tahoma",fontColor:"#999"},series:{outline:null,stroke:{width:1,color:"black"},fill:new _4.Color([59,68,75,0.85]),font:"normal normal normal 7pt Tahoma",fontColor:"#717171"},marker:{stroke:{width:1,color:"black"},fill:"#333",font:"normal normal normal 7pt Tahoma",fontColor:"black"},colors:[_4.colorFromHex("#8a8c8f"),_4.colorFromHex("#4b4b4b"),_4.colorFromHex("#3b444b"),_4.colorFromHex("#2e2d30"),_4.colorFromHex("#000000")]});}}};});