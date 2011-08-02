/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["realitybuilder.ConstructionBlock"]){dojo._hasResource["realitybuilder.ConstructionBlock"]=true;dojo.provide("realitybuilder.ConstructionBlock");dojo.require("realitybuilder.Block");dojo.declare("realitybuilder.ConstructionBlock",realitybuilder.Block,{_state:null,_timeStamp:null,_constructionBlockProperties:null,constructor:function(_1,_2,_3,a,_4,_5,_6){this._constructionBlockProperties=_4;this._state=_5;this._timeStamp=_6;},timeStamp:function(){return this._timeStamp;},isDeleted:function(){return this._state===0;},isPending:function(){return this._state===1;},isReal:function(){return this._state===2;},state:function(){return this._state;},render:function(_7){var _8,_9;if(!this.isDeleted()){_9=this._constructionBlockProperties;_8=this.isReal()?_9.realColor():_9.pendingColor();this.inherited(arguments,[arguments[0],_8]);}},renderSolidTop:function(_a){var _b,_c,i;this._updateCoordinates();_b=this._topVertexesS;_c=_b[0];_a.beginPath();_a.moveTo(_c[0],_c[1]);for(i=1;i<_b.length;i+=1){_c=_b[i];_a.lineTo(_c[0],_c[1]);}_a.closePath();_a.fill();}});}