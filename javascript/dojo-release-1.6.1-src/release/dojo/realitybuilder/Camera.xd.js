/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","realitybuilder.Camera"],["require","realitybuilder.util"],["require","realitybuilder.Sensor"],["require","dojox.math.matrix"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["realitybuilder.Camera"]){_4._hasResource["realitybuilder.Camera"]=true;_4.provide("realitybuilder.Camera");_4.require("realitybuilder.util");_4.require("realitybuilder.Sensor");_4.require("dojox.math.matrix");_4.declare("realitybuilder.Camera",null,{_blockProperties:null,_position:null,_aX:0,_aY:0,_aZ:0,_fl:1,_sensorResolution:100,_rZ:null,_rX:null,_rZYX:null,_sensor:null,_versionOnServer:"-1",_id:null,constructor:function(_7,_8,_9,_a){this._blockProperties=_7;this._position=[0,0,1];this._sensor=new realitybuilder.Sensor(_8,_9,_a);this._updateRotationMatrices();},_updateId:function(){this._id=Math.random().toString();},sensor:function(){return this._sensor;},versionOnServer:function(){return this._versionOnServer;},isInitializedWithServerData:function(){return this._versionOnServer!=="-1";},position:function(){return this._position;},aX:function(){return this._aX;},aY:function(){return this._aY;},aZ:function(){return this._aZ;},fl:function(){return this._fl;},sensorResolution:function(){return this._sensorResolution;},id:function(){return this._id;},update:function(_b){this._position=_b.position;this._aX=_b.aX;this._aY=_b.aY;this._aZ=_b.aZ;this._fl=_b.fl;this._sensorResolution=_b.sensorResolution;this._updateRotationMatrices();this._updateId();_4.publish("realitybuilder/Camera/changed");},updateWithServerData:function(_c){if(this._versionOnServer!==_c.version){this._versionOnServer=_c.version;this.update(_c);}},_updateRotationMatrices:function(){var _d;this._rX=[[1,0,0],[0,Math.cos(-this._aX),Math.sin(-this._aX)],[0,-Math.sin(-this._aX),Math.cos(-this._aX)]];this._rY=[[Math.cos(-this._aY),0,Math.sin(-this._aY)],[0,1,0],[-Math.sin(-this._aY),0,Math.cos(-this._aY)]];this._rZ=[[Math.cos(-this._aZ),Math.sin(-this._aZ),0],[-Math.sin(-this._aZ),Math.cos(-this._aZ),0],[0,0,1]];_d=_6.math.matrix.multiply(this._rY,this._rX);this._rZYX=_6.math.matrix.multiply(this._rZ,_d);},worldToView:function(_e){var _f=realitybuilder.util.subtractVectors3D(_e,this._position);_f=_6.math.matrix.transpose([_f]);_f=_6.math.matrix.multiply(this._rZYX,_f);_f=_6.math.matrix.transpose(_f)[0];return _f;},scale:function(zV){return this._sensorResolution*this._fl/zV;},viewToSensor:function(_10){var xV=_10[0],yV=_10[1],zV=_10[2],_11;_11=this.scale(zV);xV*=_11;yV*=_11;xV+=this._sensor.width()/2;yV+=this._sensor.height()/2;return [xV,yV];},blockToSensor:function(_12){return this.viewToSensor(this.worldToView(realitybuilder.util.blockToWorld(_12,this._blockProperties)));}});}}};});