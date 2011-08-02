/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","realitybuilder.Construction"],["require","realitybuilder.BlockProperties"],["require","realitybuilder.ConstructionBlockProperties"],["require","realitybuilder.ConstructionBlocks"],["require","realitybuilder.ConstructionBlock"],["require","realitybuilder.NewBlock"],["require","realitybuilder.Image"],["require","realitybuilder.Camera"],["require","realitybuilder.AdminControls"],["require","realitybuilder.ControlPanel"],["require","realitybuilder.PrerenderMode"],["require","realitybuilder.util"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["realitybuilder.Construction"]){_4._hasResource["realitybuilder.Construction"]=true;_4.provide("realitybuilder.Construction");_4.require("realitybuilder.BlockProperties");_4.require("realitybuilder.ConstructionBlockProperties");_4.require("realitybuilder.ConstructionBlocks");_4.require("realitybuilder.ConstructionBlock");_4.require("realitybuilder.NewBlock");_4.require("realitybuilder.Image");_4.require("realitybuilder.Camera");_4.require("realitybuilder.AdminControls");_4.require("realitybuilder.ControlPanel");_4.require("realitybuilder.PrerenderMode");_4.require("realitybuilder.util");_4.declare("realitybuilder.Construction",null,{_showAdminControls:null,_constructionBlocks:null,_CHECK_IF_HAS_LOADED_INTERVAL:500,_showReal:null,_showPending:null,_blockProperties:null,_constructionBlockProperties:null,_prerenderMode:null,_newBlock:null,_camera:null,_image:null,_controlPanel:null,_adminControls:null,_updateTimeout:null,constructor:function(_7){var rb=realitybuilder;this._insertLoadIndicator();this._showAdminControls=_7;this._showReal=_7;this._showPending=_7;this._blockProperties=new rb.BlockProperties();this._constructionBlockProperties=new rb.ConstructionBlockProperties();this._camera=new rb.Camera(this._blockProperties,640,480);this._image=new rb.Image(this._camera);this._constructionBlocks=new rb.ConstructionBlocks(this,this._blockProperties,this._constructionBlockProperties);this._prerenderMode=new rb.PrerenderMode();this._newBlock=new rb.NewBlock(this._blockProperties,this._camera,this._constructionBlocks,this._prerenderMode);this._controlPanel=new rb.ControlPanel(this._newBlock);if(this._showAdminControls){this._adminControls=new rb.AdminControls(this);_4.subscribe("realitybuilder/ConstructionBlocks/changeOnServerFailed",this._adminControls,this._adminControls.updateBlocksTable);}_4.subscribe("realitybuilder/ConstructionBlocks/changedOnServer",this,this._update);_4.subscribe("realitybuilder/PrerenderMode/"+"loadedBlockConfigurationOnServer",this,this._update);_4.subscribe("realitybuilder/NewBlock/createdPendingOnServer",this,this._update);_4.subscribe("realitybuilder/NewBlock/"+"positionAngleInitialized",this,this._onNewBlockPositionAngleInitialized);_4.subscribe("realitybuilder/NewBlock/buildOrMoveSpaceChanged",this,this._onMoveOrBuildSpaceChanged);_4.subscribe("realitybuilder/NewBlock/stopped",this,this._onNewBlockStopped);_4.subscribe("realitybuilder/NewBlock/madeMovable",this,this._onNewBlockMadeMovable);_4.subscribe("realitybuilder/NewBlock/movedOrRotated",this,this._onNewBlockMovedOrRotated);_4.subscribe("realitybuilder/NewBlock/"+"onNewBlockMakeRealRequested",this,this._onNewBlockMakeRealRequested);_4.subscribe("realitybuilder/ConstructionBlocks/changed",this,this._onConstructionBlocksChanged);_4.subscribe("realitybuilder/Camera/changed",this,this._onCameraChanged);_4.subscribe("realitybuilder/Image/changed",this,this._onImageChanged);_4.subscribe("realitybuilder/BlockProperties/changed",this,this._onBlockPropertiesChanged);_4.subscribe("realitybuilder/ConstructionBlockProperties/changed",this,this._onConstructionBlockPropertiesChanged);_4.subscribe("realitybuilder/PrerenderMode/changed",this,this._onPrerenderModeChanged);_4.connect(null,"onkeypress",_4.hitch(this,this._onKeyPress));this._update();this._checkIfHasLoaded();},newBlock:function(){return this._newBlock;},camera:function(){return this._camera;},prerenderMode:function(){return this._prerenderMode;},showPending:function(){return this._showPending;},showReal:function(){return this._showReal;},constructionBlocks:function(){return this._constructionBlocks;},_onNewBlockStopped:function(){this._newBlock.render();this._controlPanel.update();},_onNewBlockMadeMovable:function(){this._newBlock.render();this._controlPanel.update();},_onNewBlockMakeRealRequested:function(){this._controlPanel.update();},toggleReal:function(){this._showReal=!this._showReal;this._camera.sensor().showRealBlocks(this._showReal);this._adminControls.updateToggleRealButton();},togglePending:function(){this._showPending=!this._showPending;this._camera.sensor().showPendingBlocks(this._showPending);this._adminControls.updateTogglePendingButton();},_onKeyPress:function(_8){var _9,_a;_a=this._newBlock;if(_8.keyCode===109){_9=this._constructionBlocks;_9.setBlockStateOnServer(_a.positionB(),_a.a(),2);}},_onNewBlockMovedOrRotated:function(){this._newBlock.render();this._controlPanel.update();if(this._showAdminControls){this._adminControls.updateCoordinateDisplays();}},_renderBlocksIfFullyInitialized:function(){if(this._constructionBlocks.isInitializedWithServerData()&&this._newBlock.isInitializedWithServerData()&&this._camera.isInitializedWithServerData()&&this._blockProperties.isInitializedWithServerData()&&this._constructionBlockProperties.isInitializedWithServerData()){if(this._showAdminControls){this._constructionBlocks.render();}this._newBlock.render();}},_updateNewBlockStateIfFullyInitialized:function(){if(this._constructionBlocks.isInitializedWithServerData()&&this._newBlock.isInitializedWithServerData()&&this._blockProperties.isInitializedWithServerData()&&this._prerenderMode.isInitializedWithServerData()){this._newBlock.updatePositionAndMovability();this._controlPanel.update();if(this._showAdminControls){this._adminControls.updateCoordinateDisplays();}}},_onConstructionBlocksChanged:function(){if(this._showAdminControls){this._adminControls.updateBlocksTable();}this._updateNewBlockStateIfFullyInitialized();this._renderBlocksIfFullyInitialized();},_onCameraChanged:function(){if(this._showAdminControls){this._adminControls.updateCameraControls(this._camera);}this._renderBlocksIfFullyInitialized();},_onNewBlockPositionAngleInitialized:function(){this._updateNewBlockStateIfFullyInitialized();this._renderBlocksIfFullyInitialized();},_onMoveOrBuildSpaceChanged:function(){this._updateNewBlockStateIfFullyInitialized();this._renderBlocksIfFullyInitialized();},_onBlockPropertiesChanged:function(){this._updateNewBlockStateIfFullyInitialized();this._renderBlocksIfFullyInitialized();},_onConstructionBlockPropertiesChanged:function(){this._renderBlocksIfFullyInitialized();},_onPrerenderModeChanged:function(){if(this._showAdminControls){this._adminControls.updatePrerenderModeControls();}this._updateNewBlockStateIfFullyInitialized();},_onImageChanged:function(){if(this._showAdminControls){this._adminControls.updateImageControls(this._image);}},_insertLoadIndicator:function(){_4.attr("loadIndicator","innerHTML","Loading...");},_checkIfHasLoaded:function(){if(this._constructionBlocks.isInitializedWithServerData()&&this._camera.isInitializedWithServerData()&&this._blockProperties.isInitializedWithServerData()&&this._constructionBlockProperties.isInitializedWithServerData()&&this._image.imageLoaded()){_4.destroy(_4.byId("loadIndicator"));this._unhideContent();}else{setTimeout(_4.hitch(this,this._checkIfHasLoaded),this._CHECK_IF_HAS_LOADED_INTERVAL);}},_updateSucceeded:function(_b,_c){var _d=this;if(_b.blocksData.changed){this._constructionBlocks.updateWithServerData(_b.blocksData,this._image);}if(_b.prerenderModeData.changed){this._prerenderMode.updateWithServerData(_b.prerenderModeData);}if(_b.cameraData.changed){this._camera.updateWithServerData(_b.cameraData);}if(_b.imageData.changed){this._image.updateWithServerData(_b.imageData);}if(_b.blockPropertiesData.changed){this._blockProperties.updateWithServerData(_b.blockPropertiesData);}if(_b.constructionBlockPropertiesData.changed){this._constructionBlockProperties.updateWithServerData(_b.constructionBlockPropertiesData);}if(_b.newBlockData.changed){this._newBlock.updateWithServerData(_b.newBlockData);}if(this._updateTimeout){clearTimeout(this._updateTimeout);}this._updateTimeout=setTimeout(function(){_d._update();},_b.updateIntervalClient);},_update:function(){_4.xhrGet({url:"/rpc/construction",content:{"blocksDataVersion":this._constructionBlocks.versionOnServer(),"cameraDataVersion":this._camera.versionOnServer(),"imageDataVersion":this._image.versionOnServer(),"blockPropertiesDataVersion":this._blockProperties.versionOnServer(),"constructionBlockPropertiesDataVersion":this._constructionBlockProperties.versionOnServer(),"newBlockDataVersion":this._newBlock.versionOnServer(),"prerenderModeDataVersion":this._prerenderMode.versionOnServer()},handleAs:"json",load:_4.hitch(this,this._updateSucceeded)});this._image.update();},_unhideContent:function(){var _e=_4.byId("content"),_f=(!_4.isIE||_4.isIE>8),_10;if(_f){_4.style(_e,"opacity","0");}_4.style(_e,"width","auto");_4.style(_e,"height","auto");if(_4.isIE&&_4.isIE<=7){_4.style(_e,"zoom","1");}if(_f){_10={node:_e,duration:1000};_4.fadeIn(_10).play();}},_storeSettingsOnServerSucceeded:function(){this._update();},storeSettingsOnServer:function(){var _11,_12,_13,_14;_14=realitybuilder.util;_11=_14.addPrefix("image.",this._adminControls.readImageControls());_12=_14.addPrefix("camera.",this._adminControls.readCameraControls());_12["camera.x"]=_12["camera.position"][0];_12["camera.y"]=_12["camera.position"][1];_12["camera.z"]=_12["camera.position"][2];_13={};_4.mixin(_13,_11,_12);_4.xhrPost({url:"/admin/rpc/update_settings",content:_13,load:_4.hitch(this,this._storeSettingsOnServerSucceeded)});}});}}};});