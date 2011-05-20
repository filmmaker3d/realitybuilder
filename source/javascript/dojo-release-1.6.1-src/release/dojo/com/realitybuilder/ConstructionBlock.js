/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["com.realitybuilder.ConstructionBlock"]){dojo._hasResource["com.realitybuilder.ConstructionBlock"]=true;dojo.provide("com.realitybuilder.ConstructionBlock");dojo.require("com.realitybuilder.Block");dojo.declare("com.realitybuilder.ConstructionBlock",com.realitybuilder.Block,{_state:null,_timeStamp:null,constructor:function(_1,_2,_3,_4,_5){this._state=_4;this._timeStamp=_5;},timeStamp:function(){return this._timeStamp;},isDeleted:function(){return this._state===0;},isPending:function(){return this._state===1;},isReal:function(){return this._state===2;},state:function(){return this._state;},render:function(_6){if(!this.isDeleted()){var _7=this.isReal()?"green":"white";this.inherited(arguments,[arguments[0],_7]);}},renderSolidTop:function(_8){var _9,_a,i;this._updateCoordinates();_9=this._topVertexesS;_a=_9[0];_8.beginPath();_8.moveTo(_a[0],_a[1]);for(i=1;i<_9.length;i+=1){_a=_9[i];_8.lineTo(_a[0],_a[1]);}_8.closePath();_8.fill();}});}