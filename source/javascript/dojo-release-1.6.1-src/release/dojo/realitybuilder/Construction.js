/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["realitybuilder.Construction"]){dojo._hasResource["realitybuilder.Construction"]=true;dojo.provide("realitybuilder.Construction");dojo.require("realitybuilder.BlockProperties");dojo.require("realitybuilder.ConstructionBlockProperties");dojo.require("realitybuilder.ConstructionBlocks");dojo.require("realitybuilder.ConstructionBlock");dojo.require("realitybuilder.NewBlock");dojo.require("realitybuilder.Image");dojo.require("realitybuilder.Camera");dojo.require("realitybuilder.AdminControls");dojo.require("realitybuilder.ControlPanel");dojo.require("realitybuilder.PrerenderMode");dojo.require("realitybuilder.util");dojo.declare("realitybuilder.Construction",null,{_showAdminControls:null,_constructionBlocks:null,_CHECK_IF_HAS_LOADED_INTERVAL:500,_showReal:null,_showPending:null,_blockProperties:null,_constructionBlockProperties:null,_prerenderMode:null,_newBlock:null,_camera:null,_image:null,_controlPanel:null,_adminControls:null,_updateTimeout:null,constructor:function(_1){var rb=realitybuilder;this._insertLoadIndicator();this._showAdminControls=_1;this._showReal=_1;this._showPending=_1;this._blockProperties=new rb.BlockProperties();this._constructionBlockProperties=new rb.ConstructionBlockProperties();this._camera=new rb.Camera(this._blockProperties,640,480);this._image=new rb.Image(this._camera);this._constructionBlocks=new rb.ConstructionBlocks(this,this._blockProperties,this._constructionBlockProperties);this._prerenderMode=new rb.PrerenderMode();this._newBlock=new rb.NewBlock(this._blockProperties,this._camera,this._constructionBlocks,this._prerenderMode);this._controlPanel=new rb.ControlPanel(this._newBlock);if(this._showAdminControls){this._adminControls=new rb.AdminControls(this);dojo.subscribe("realitybuilder/ConstructionBlocks/changeOnServerFailed",this._adminControls,this._adminControls.updateBlocksTable);}dojo.subscribe("realitybuilder/ConstructionBlocks/changedOnServer",this,this._update);dojo.subscribe("realitybuilder/PrerenderMode/"+"loadedBlockConfigurationOnServer",this,this._update);dojo.subscribe("realitybuilder/NewBlock/createdPendingOnServer",this,this._update);dojo.subscribe("realitybuilder/NewBlock/"+"positionAngleInitialized",this,this._onNewBlockPositionAngleInitialized);dojo.subscribe("realitybuilder/NewBlock/buildOrMoveSpaceChanged",this,this._onMoveOrBuildSpaceChanged);dojo.subscribe("realitybuilder/NewBlock/stopped",this,this._onNewBlockStopped);dojo.subscribe("realitybuilder/NewBlock/madeMovable",this,this._onNewBlockMadeMovable);dojo.subscribe("realitybuilder/NewBlock/movedOrRotated",this,this._onNewBlockMovedOrRotated);dojo.subscribe("realitybuilder/NewBlock/"+"onNewBlockMakeRealRequested",this,this._onNewBlockMakeRealRequested);dojo.subscribe("realitybuilder/ConstructionBlocks/changed",this,this._onConstructionBlocksChanged);dojo.subscribe("realitybuilder/Camera/changed",this,this._onCameraChanged);dojo.subscribe("realitybuilder/Image/changed",this,this._onImageChanged);dojo.subscribe("realitybuilder/BlockProperties/changed",this,this._onBlockPropertiesChanged);dojo.subscribe("realitybuilder/ConstructionBlockProperties/changed",this,this._onConstructionBlockPropertiesChanged);dojo.subscribe("realitybuilder/PrerenderMode/changed",this,this._onPrerenderModeChanged);dojo.connect(null,"onkeypress",dojo.hitch(this,this._onKeyPress));this._update();this._checkIfHasLoaded();},newBlock:function(){return this._newBlock;},camera:function(){return this._camera;},prerenderMode:function(){return this._prerenderMode;},showPending:function(){return this._showPending;},showReal:function(){return this._showReal;},constructionBlocks:function(){return this._constructionBlocks;},_onNewBlockStopped:function(){this._newBlock.render();this._controlPanel.update();},_onNewBlockMadeMovable:function(){this._newBlock.render();this._controlPanel.update();},_onNewBlockMakeRealRequested:function(){this._controlPanel.update();},toggleReal:function(){this._showReal=!this._showReal;this._camera.sensor().showRealBlocks(this._showReal);this._adminControls.updateToggleRealButton();},togglePending:function(){this._showPending=!this._showPending;this._camera.sensor().showPendingBlocks(this._showPending);this._adminControls.updateTogglePendingButton();},_onKeyPress:function(_2){var _3,_4;_4=this._newBlock;if(_2.keyCode===109){_3=this._constructionBlocks;_3.setBlockStateOnServer(_4.positionB(),_4.a(),2);}},_onNewBlockMovedOrRotated:function(){this._newBlock.render();this._controlPanel.update();if(this._showAdminControls){this._adminControls.updateCoordinateDisplays();}},_renderBlocksIfFullyInitialized:function(){if(this._constructionBlocks.isInitializedWithServerData()&&this._newBlock.isInitializedWithServerData()&&this._camera.isInitializedWithServerData()&&this._blockProperties.isInitializedWithServerData()&&this._constructionBlockProperties.isInitializedWithServerData()){if(this._showAdminControls){this._constructionBlocks.render();}this._newBlock.render();}},_updateNewBlockStateIfFullyInitialized:function(){if(this._constructionBlocks.isInitializedWithServerData()&&this._newBlock.isInitializedWithServerData()&&this._blockProperties.isInitializedWithServerData()&&this._prerenderMode.isInitializedWithServerData()){this._newBlock.updatePositionAndMovability();this._controlPanel.update();if(this._showAdminControls){this._adminControls.updateCoordinateDisplays();}}},_onConstructionBlocksChanged:function(){if(this._showAdminControls){this._adminControls.updateBlocksTable();}this._updateNewBlockStateIfFullyInitialized();this._renderBlocksIfFullyInitialized();},_onCameraChanged:function(){if(this._showAdminControls){this._adminControls.updateCameraControls(this._camera);}this._renderBlocksIfFullyInitialized();},_onNewBlockPositionAngleInitialized:function(){this._updateNewBlockStateIfFullyInitialized();this._renderBlocksIfFullyInitialized();},_onMoveOrBuildSpaceChanged:function(){this._updateNewBlockStateIfFullyInitialized();this._renderBlocksIfFullyInitialized();},_onBlockPropertiesChanged:function(){this._updateNewBlockStateIfFullyInitialized();this._renderBlocksIfFullyInitialized();},_onConstructionBlockPropertiesChanged:function(){this._renderBlocksIfFullyInitialized();},_onPrerenderModeChanged:function(){if(this._showAdminControls){this._adminControls.updatePrerenderModeControls();}this._updateNewBlockStateIfFullyInitialized();},_onImageChanged:function(){if(this._showAdminControls){this._adminControls.updateImageControls(this._image);}},_insertLoadIndicator:function(){dojo.attr("loadIndicator","innerHTML","Loading...");},_checkIfHasLoaded:function(){if(this._constructionBlocks.isInitializedWithServerData()&&this._camera.isInitializedWithServerData()&&this._blockProperties.isInitializedWithServerData()&&this._constructionBlockProperties.isInitializedWithServerData()&&this._image.imageLoaded()){dojo.destroy(dojo.byId("loadIndicator"));this._unhideContent();}else{setTimeout(dojo.hitch(this,this._checkIfHasLoaded),this._CHECK_IF_HAS_LOADED_INTERVAL);}},_updateSucceeded:function(_5,_6){var _7=this;if(_5.blocksData.changed){this._constructionBlocks.updateWithServerData(_5.blocksData,this._image);}if(_5.prerenderModeData.changed){this._prerenderMode.updateWithServerData(_5.prerenderModeData);}if(_5.cameraData.changed){this._camera.updateWithServerData(_5.cameraData);}if(_5.imageData.changed){this._image.updateWithServerData(_5.imageData);}if(_5.blockPropertiesData.changed){this._blockProperties.updateWithServerData(_5.blockPropertiesData);}if(_5.constructionBlockPropertiesData.changed){this._constructionBlockProperties.updateWithServerData(_5.constructionBlockPropertiesData);}if(_5.newBlockData.changed){this._newBlock.updateWithServerData(_5.newBlockData);}if(this._updateTimeout){clearTimeout(this._updateTimeout);}this._updateTimeout=setTimeout(function(){_7._update();},_5.updateIntervalClient);},_update:function(){dojo.xhrGet({url:"/rpc/construction",content:{"blocksDataVersion":this._constructionBlocks.versionOnServer(),"cameraDataVersion":this._camera.versionOnServer(),"imageDataVersion":this._image.versionOnServer(),"blockPropertiesDataVersion":this._blockProperties.versionOnServer(),"constructionBlockPropertiesDataVersion":this._constructionBlockProperties.versionOnServer(),"newBlockDataVersion":this._newBlock.versionOnServer(),"prerenderModeDataVersion":this._prerenderMode.versionOnServer()},handleAs:"json",load:dojo.hitch(this,this._updateSucceeded)});this._image.update();},_unhideContent:function(){var _8=dojo.byId("content"),_9=(!dojo.isIE||dojo.isIE>8),_a;if(_9){dojo.style(_8,"opacity","0");}dojo.style(_8,"width","auto");dojo.style(_8,"height","auto");if(dojo.isIE&&dojo.isIE<=7){dojo.style(_8,"zoom","1");}if(_9){_a={node:_8,duration:1000};dojo.fadeIn(_a).play();}},_storeSettingsOnServerSucceeded:function(){this._update();},storeSettingsOnServer:function(){var _b,_c,_d,_e;_e=realitybuilder.util;_b=_e.addPrefix("image.",this._adminControls.readImageControls());_c=_e.addPrefix("camera.",this._adminControls.readCameraControls());_c["camera.x"]=_c["camera.position"][0];_c["camera.y"]=_c["camera.position"][1];_c["camera.z"]=_c["camera.position"][2];_d={};dojo.mixin(_d,_b,_c);dojo.xhrPost({url:"/admin/rpc/update_settings",content:_d,load:dojo.hitch(this,this._storeSettingsOnServerSucceeded)});}});}