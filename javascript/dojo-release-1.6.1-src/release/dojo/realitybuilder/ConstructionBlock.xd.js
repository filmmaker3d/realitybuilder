/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","realitybuilder.ConstructionBlock"],["require","realitybuilder.Block"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["realitybuilder.ConstructionBlock"]){_4._hasResource["realitybuilder.ConstructionBlock"]=true;_4.provide("realitybuilder.ConstructionBlock");_4.require("realitybuilder.Block");_4.declare("realitybuilder.ConstructionBlock",realitybuilder.Block,{_state:null,_timeStamp:null,_constructionBlockProperties:null,constructor:function(_7,_8,_9,a,_a,_b,_c){this._constructionBlockProperties=_a;this._state=_b;this._timeStamp=_c;},timeStamp:function(){return this._timeStamp;},isDeleted:function(){return this._state===0;},isPending:function(){return this._state===1;},isReal:function(){return this._state===2;},state:function(){return this._state;},render:function(_d){var _e,_f;if(!this.isDeleted()){_f=this._constructionBlockProperties;_e=this.isReal()?_f.realColor():_f.pendingColor();this.inherited(arguments,[arguments[0],_e]);}},renderSolidTop:function(_10){var _11,_12,i;this._updateCoordinates();_11=this._topVertexesS;_12=_11[0];_10.beginPath();_10.moveTo(_12[0],_12[1]);for(i=1;i<_11.length;i+=1){_12=_11[i];_10.lineTo(_12[0],_12[1]);}_10.closePath();_10.fill();}});}}};});