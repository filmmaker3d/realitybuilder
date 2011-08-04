/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","realitybuilder.BlockProperties"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["realitybuilder.BlockProperties"]){_4._hasResource["realitybuilder.BlockProperties"]=true;_4.provide("realitybuilder.BlockProperties");_4.declare("realitybuilder.BlockProperties",null,{_versionOnServer:"-1",_congruencyA:null,_blockPositionSpacingXY:null,_blockPositionSpacingZ:null,_outlineBXY:null,_rotatedOutlinesBXY:null,_collisionOffsetsListBXY:null,_rotatedCollisionOffsetsListsBXY:null,_attachmentOffsetsListB:null,_rotatedAttachmentOffsetsListsB:null,_rotCenterBXY:null,_backgroundAlpha:null,versionOnServer:function(){return this._versionOnServer;},isInitializedWithServerData:function(){return this._versionOnServer!=="-1";},congruencyA:function(){return this._congruencyA;},_rotateOutlineBXY:function(a){var _7=this;return _4.map(this._outlineBXY,function(_8){return realitybuilder.util.rotatePointBXY(_8,_7._rotCenterBXY,a);});},_updateRotatedOutlinesBXY:function(){var a;this._rotatedOutlinesBXY=[];for(a=0;a<this._congruencyA;a+=1){this._rotatedOutlinesBXY.push(this._rotateOutlineBXY(a));}},_rotateCollisionOffsetsBXY:function(_9,a){var _a=realitybuilder.util;return _4.map(_9,function(_b){return _a.rotatePointBXY(_b,[0,0],a);});},_rotateCollisionOffsetsListBXY:function(a1){var a2,_c,_d=[];for(a2=0;a2<this._congruencyA;a2+=1){_c=this._collisionOffsetsListBXY[a2];_d.push(this._rotateCollisionOffsetsBXY(_c,a1));}return _d;},_updateRotatedCollisionOffsetsListsBXY:function(){var a1,_e;this._rotatedCollisionOffsetsListsBXY=[];for(a1=0;a1<this._congruencyA;a1+=1){_e=this._rotateCollisionOffsetsListBXY(a1);this._rotatedCollisionOffsetsListsBXY.push(_e);}},_rotateAttachmentOffsetB:function(_f,a){var _10,_11,_12,_13;_13=realitybuilder.util;_10=[_f[0],_f[1]];_11=_13.rotatePointBXY(_10,[0,0],a);return [_11[0],_11[1],_f[2]];},_rotateAttachmentOffsetsB:function(_14,a){var _15=this;return _4.map(_14,function(_16){return _15._rotateAttachmentOffsetB(_16,a);});},_rotateAttachmentOffsetsListB:function(a1){var a2,_17,tmp=[];for(a2=0;a2<this._congruencyA;a2+=1){_17=this._attachmentOffsetsListB[a2];tmp.push(this._rotateAttachmentOffsetsB(_17,a1));}return tmp;},_updateRotatedAttachmentOffsetsListsB:function(){var a1,tmp;this._rotatedAttachmentOffsetsListsB=[];for(a1=0;a1<this._congruencyA;a1+=1){tmp=this._rotateAttachmentOffsetsListB(a1);this._rotatedAttachmentOffsetsListsB.push(tmp);}},updateWithServerData:function(_18){if(this._versionOnServer!==_18.version){this._versionOnServer=_18.version;this._congruencyA=_18.congruencyA;this._positionSpacingXY=_18.positionSpacingXY;this._positionSpacingZ=_18.positionSpacingZ;this._outlineBXY=_18.outlineBXY;this._collisionOffsetsListBXY=_18.collisionOffsetsListBXY;this._attachmentOffsetsListB=_18.attachmentOffsetsListB;this._rotCenterBXY=_18.rotCenterBXY;this._backgroundAlpha=_18.backgroundAlpha;this._updateRotatedOutlinesBXY();this._updateRotatedCollisionOffsetsListsBXY();this._updateRotatedAttachmentOffsetsListsB();_4.publish("realitybuilder/BlockProperties/changed");}},positionSpacingXY:function(){return this._positionSpacingXY;},positionSpacingZ:function(){return this._positionSpacingZ;},rotatedOutlineBXY:function(a){return this._rotatedOutlinesBXY[a%this._congruencyA];},rotatedCollisionOffsetsBXY:function(_19,_1a){var _1b,_1c,a1,a2;a1=_19.a()%this._congruencyA;a2=_1a.a()%this._congruencyA;_1b=this._rotatedCollisionOffsetsListsBXY[a1];_1c=(this._congruencyA+a2-a1)%this._congruencyA;return _1b[_1c];},rotatedAttachmentOffsetsB:function(_1d,_1e){var _1f,_20,a1,a2;a1=_1d.a()%this._congruencyA;a2=_1e.a()%this._congruencyA;_1f=this._rotatedAttachmentOffsetsListsB[a1];_20=(this._congruencyA+a2-a1)%this._congruencyA;return _1f[_20];},backgroundAlpha:function(){return this._backgroundAlpha;}});}}};});