/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","realitybuilder.NewBlock"],["require","realitybuilder.Block"],["require","realitybuilder.Shadow"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["realitybuilder.NewBlock"]){_4._hasResource["realitybuilder.NewBlock"]=true;_4.provide("realitybuilder.NewBlock");_4.require("realitybuilder.Block");_4.require("realitybuilder.Shadow");_4.declare("realitybuilder.NewBlock",realitybuilder.Block,{"-chains-":{constructor:"manual"},_versionOnServer:"-1",_moveSpace1B:null,_moveSpace2B:null,_buildSpace1B:null,_buildSpace2B:null,_color:null,_stoppedColor:null,_shadowColor:null,_shadowAlpha:null,_isStopped:null,_constructionBlocks:null,_shadow:null,_camera:null,_lastPositionB:null,_lastIsStopped:null,_lastConstructionBlocksVersion:null,_prerenderMode:null,constructor:function(_7,_8,_9,_a){this.inherited(arguments,[_7,_8,[0,0,0],0]);this._isStopped=false;this._constructionBlocks=_9;this._shadow=new realitybuilder.Shadow(this,_7,_8,_9);this._camera=_8;this._prerenderMode=_a;},versionOnServer:function(){return this._versionOnServer;},isInitializedWithServerData:function(){return this._versionOnServer!=="-1";},updateWithServerData:function(_b){var _c;if(!this.isInitializedWithServerData()){this._positionB=_b.initPositionB;this._a=_b.initA;_c=true;}else{_c=false;}this._moveSpace1B=_b.moveSpace1B;this._moveSpace2B=_b.moveSpace2B;this._buildSpace1B=_b.buildSpace1B;this._buildSpace2B=_b.buildSpace2B;this._color=_b.color;this._stoppedColor=_b.stoppedColor;this._shadowColor=_b.shadowColor;this._shadowAlpha=_b.shadowAlpha;this._versionOnServer=_b.version;if(_c){_4.publish("realitybuilder/NewBlock/"+"positionAngleInitialized");}_4.publish("realitybuilder/NewBlock/moveOrBuildSpaceChanged");},_collidesWithRealBlock:function(){return this._constructionBlocks.realBlocksCollideWith(this);},move:function(_d){if(!this.wouldGoOutOfRange(_d,0)){this._positionB=realitybuilder.util.addVectorsB(this._positionB,_d);_4.publish("realitybuilder/NewBlock/movedOrRotated");}},rotate90:function(){var _e=this._blockProperties.congruencyA();if(!this.wouldGoOutOfRange([0,0,0],1)){this._a=(this._a+1)%_e;_4.publish("realitybuilder/NewBlock/movedOrRotated");}},requestMakeReal:function(){if(this.canBeMadeReal()){this._stop();this._createPendingOnServer();_4.publish("realitybuilder/NewBlock/makeRealRequested");}},isRotatable:function(){return !this._isStopped;},isMovable:function(){return !this._isStopped;},isStopped:function(){return this._isStopped;},_stop:function(){this._isStopped=true;_4.publish("realitybuilder/NewBlock/stopped");},_makeMovable:function(){this._isStopped=false;_4.publish("realitybuilder/NewBlock/madeMovable");},updatePositionAndMovability:function(){var _f,_10,_11;if(this.isStopped()){_11=this._constructionBlocks.blockAt(this.positionB());if(_11){if(_11.isDeleted()||_11.isReal()){this._makeMovable();}}}this._updatePositionB();},_updatePositionB:function(){var _12,cbs=this._constructionBlocks,xB=this.xB(),yB=this.yB(),_13;if(this._collidesWithRealBlock()){_13=this.zB();do{_13+=1;_12=new realitybuilder.Block(this._blockProperties,this._camera,[xB,yB,_13],this.a());}while(cbs.realBlocksCollideWith(_12));this._positionB[2]=_13;}},wouldGoOutOfRange:function(_14,_15){var _16,_17,_18,_19;_19=this._blockProperties.congruencyA();_16=realitybuilder.util.addVectorsB(this.positionB(),_14);_18=(this.a()+_15)%_19;_17=new realitybuilder.Block(this._blockProperties,this._camera,_16,_18);return (this._constructionBlocks.realBlocksCollideWith(_17)||!this._wouldBeInMoveSpace(_16));},_wouldBeInMoveSpace:function(_1a){var m1B=this._moveSpace1B,m2B=this._moveSpace2B;return (_1a[0]>=m1B[0]&&_1a[0]<=m2B[0]&&_1a[1]>=m1B[1]&&_1a[1]<=m2B[1]&&_1a[2]>=0&&_1a[2]<=m2B[2]);},_isInBuildSpace:function(){var xB=this._positionB[0],yB=this._positionB[1],zB=this._positionB[2],b1B=this._buildSpace1B,b2B=this._buildSpace2B;return (xB>=b1B[0]&&xB<=b2B[0]&&yB>=b1B[1]&&yB<=b2B[1]&&zB>=b1B[2]&&zB<=b2B[2]);},_isAttachable:function(){return (this._constructionBlocks.realBlocksAreAttachableTo(this)||this.zB()===0);},_isInPrerenderedBlockConfiguration:function(){var _1b=this._constructionBlocks.realBlocksSorted();return this._prerenderMode.matchingBlockConfiguration(_1b,this)!==false;},canBeMadeReal:function(){return this._isInBuildSpace()&&this._isAttachable()&&(!this._prerenderMode.isEnabled()||this._isInPrerenderedBlockConfiguration());},_boundingBoxesOverlap:function(_1c){var l,r,b,t,_1d,_1e,_1f,_20,_21,_22;this._updateCoordinates();l=this._boundingBoxS[0][0];r=this._boundingBoxS[1][0];b=this._boundingBoxS[0][1];t=this._boundingBoxS[1][1];_1c._updateCoordinates();_1d=_1c._boundingBoxS[0][0];_1e=_1c._boundingBoxS[1][0];_1f=_1c._boundingBoxS[0][1];_20=_1c._boundingBoxS[1][1];_21=(r>=_1d&&l<=_1e);_22=(t>=_1f&&b<=_20);return _21&&_22;},_relationVertexesEdges:function(_23,_24){var _25,len,i,j,_26,_27,_28,_29;_25=realitybuilder.util;len=_24.length;for(i=0;i<len;i+=1){_29=[_24[i],_24[(i+1)%len]];for(j=0;j<len;j+=1){_28=_23[j];_26=_25.relationPointSegmentVXZ(_28,_29);if(_26<0||_26>0){return _26;}}}return 0;},_isObscuredBySLO:function(_2a){var _2b,_2c,_2d;_2c=this.projectedVertexesVXZ();_2d=_2a.projectedVertexesVXZ();if(_2c===false||_2d===false){return false;}_2b=this._relationVertexesEdges(_2d,_2c);if(_2b===0){_2b=this._relationVertexesEdges(_2c,_2d);_2b=-_2b;}if(_2b<0){return true;}else{if(_2b>0){return false;}else{return false;}}},_subtractRealBlock:function(_2e,_2f){if(this._boundingBoxesOverlap(_2e)){_2e.subtract(_2f);}},_subtractRealBlocks:function(_30){var _31=this._constructionBlocks.realBlocksSorted(),i,_32,zB=this.zB();for(i=0;i<_31.length;i+=1){_32=_31[i];if(_32.zB()<zB){break;}else{if(_32.zB()===zB){if(this._isObscuredBySLO(_32)){this._subtractRealBlock(_32,_30);}}else{if(_32.zB()>zB){this._subtractRealBlock(_32,_30);}}}}},_renderShadow:function(){if(this.isMovable()){this._shadow.render(this._shadowColor,this._shadowAlpha);}else{this._shadow.clear();}},_needsToBeRendered:function(){var _33,_34,_35;_33=this._coordinatesChangedAfterLastRendering;_34=(this._lastConstructionBlocksVersion!==this._constructionBlocks.versionOnServer());_35=(this._lastIsStopped!==this._isStopped);return _33||_34||_35;},_onRendered:function(){this._coordinatesChangedAfterLastRendering=false;this._lastIsStopped=this._isStopped;this._lastConstructionBlocksVersion=this._constructionBlocks.versionOnServer();},render:function(){var _36,_37,_38;this._updateCoordinates();if(this._needsToBeRendered()){_36=this._camera.sensor().newBlockCanvas();if(_36.getContext){_37=_36.getContext("2d");_38=this.isMovable()?this._color:this._stoppedColor;if(!realitybuilder.util.isFlashCanvasActive()){this._renderShadow();}realitybuilder.util.clearCanvas(_36);this.inherited(arguments,[_37,_38]);this._subtractRealBlocks(_37);}this._onRendered();}},_createPendingOnServerSucceeded:function(){_4.publish("realitybuilder/NewBlock/createdPendingOnServer");if(this._prerenderMode.isEnabled()){setTimeout(_4.hitch(this,this._makeRealIfInPrerenderedBlockConfiguration),this._prerenderMode.makeRealAfter());}},_createPendingOnServer:function(){_4.xhrPost({url:"/rpc/create_pending",content:{"xB":this.xB(),"yB":this.yB(),"zB":this.zB(),"a":this.a()},load:_4.hitch(this,this._createPendingOnServerSucceeded)});},_makeRealIfInPrerenderedBlockConfiguration:function(){var i,_39;_39=this._constructionBlocks.realBlocksSorted();i=this._prerenderMode.matchingBlockConfiguration(_39,this);if(i!==false){this._prerenderMode.loadBlockConfigurationOnServer(i);}else{this._makeMovable();}}});}}};});