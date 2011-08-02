/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["realitybuilder.Shadow"]){dojo._hasResource["realitybuilder.Shadow"]=true;dojo.provide("realitybuilder.Shadow");dojo.require("realitybuilder.LayerShadow");dojo.require("realitybuilder.ShadowObscuringBlocks");dojo.declare("realitybuilder.Shadow",null,{_newBlock:null,_camera:null,_blockProperties:null,_constructionBlocks:null,_shadowObscuringBlocks:null,_layerShadow:null,constructor:function(_1,_2,_3,_4){this._newBlock=_1;this._blockProperties=_2;this._camera=_3;this._constructionBlocks=_4;this._shadowObscuringBlocks=new realitybuilder.ShadowObscuringBlocks(_1,_2,_3,_4);this._layerShadow=new realitybuilder.LayerShadow(_1,_2,_3,_4);},_renderLayerShadow:function(_5,_6,_7,_8,_9,_a,_b){this._layerShadow.render(_9,_a);_5.globalAlpha=_b;_5.drawImage(this._layerShadow.canvas(),0,0);_5.globalAlpha=1;},render:function(_c,_d){var _e=this._camera.sensor().shadowCanvas(),_f,_10,_11=this._newBlock,_12=this._camera,_13=this._constructionBlocks,_14=_13.highestRealBlocksZB();this._shadowObscuringBlocks.update();if(_e.getContext){_f=_e.getContext("2d");realitybuilder.util.clearCanvas(_e);for(_10=-1;_10<=_14;_10+=1){if(_10<_11.zB()){this._renderLayerShadow(_f,_11,_12,_13,_10,_c,_d);}this._shadowObscuringBlocks.subtract(_f,_10+1);}return;}},clear:function(){var _15=this._camera.sensor().shadowCanvas();realitybuilder.util.clearCanvas(_15);}});}