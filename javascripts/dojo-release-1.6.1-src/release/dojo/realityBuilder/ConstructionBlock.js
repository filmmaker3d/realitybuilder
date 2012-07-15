/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["realityBuilder.ConstructionBlock"]){dojo._hasResource["realityBuilder.ConstructionBlock"]=true;dojo.provide("realityBuilder.ConstructionBlock");dojo.require("realityBuilder.Block");dojo.declare("realityBuilder.ConstructionBlock",realityBuilder.Block,{_state:null,_timeStamp:null,constructor:function(_1,_2,_3,a,_4,_5){this._state=_4;this._timeStamp=_5;},timeStamp:function(){return this._timeStamp;},isDeleted:function(){return this._state===0;},isPending:function(){return this._state===1;},isReal:function(){return this._state===2;},state:function(){return this._state;},render:function(_6){var _7,_8;if(!this.isDeleted()){_7=this.isReal()?realityBuilder.util.SETTINGS.colorOfRealBlock:realityBuilder.util.SETTINGS.colorOfPendingBlock;this.inherited(arguments,[arguments[0],_7]);}},renderSolidTop:function(_9){var _a,_b,i;this._updateCoordinates();_a=this._topVertexesS;_b=_a[0];_9.beginPath();_9.moveTo(_b[0],_b[1]);for(i=1;i<_a.length;i+=1){_b=_a[i];_9.lineTo(_b[0],_b[1]);}_9.closePath();_9.fill();}});}