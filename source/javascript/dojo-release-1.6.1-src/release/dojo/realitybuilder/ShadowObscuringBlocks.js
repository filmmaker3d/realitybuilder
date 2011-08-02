/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["realitybuilder.ShadowObscuringBlocks"]){dojo._hasResource["realitybuilder.ShadowObscuringBlocks"]=true;dojo.provide("realitybuilder.ShadowObscuringBlocks");dojo.declare("realitybuilder.ShadowObscuringBlocks",null,{_blocksSorted:null,_newBlock:null,_camera:null,_blockProperties:null,_constructionBlocks:null,constructor:function(_1,_2,_3,_4){this._newBlock=_1;this._blockProperties=_2;this._camera=_3;this._constructionBlocks=_4;},_copyBlocksToLayer:function(_5,_6){var _7=[],_8=this._camera,_9=this;dojo.forEach(_5,function(_a){var _b,_c;_c=[_a.xB(),_a.yB(),_6];_b=new realitybuilder.Block(_9._blockProperties,_8,_c,_a.a());_b.onlySubtractBottom();_7.push(_b);});return _7;},update:function(){var zB,_d=this._newBlock,_e=this._constructionBlocks,_f=[],_10,_11=[],_12;for(zB=_e.highestRealBlocksZB();zB>=0;zB-=1){_10=_e.realBlocksInLayer(zB);if(zB<_d.zB()){_12=this._copyBlocksToLayer(_11,zB);_10=_10.concat(_10,_12);}_f=_f.concat(_10);_11=_10;}this._blocksSorted=_f;},_blocksInLayer:function(zB){var _13,_14,i,_15=[];_13=this._blocksSorted;for(i=0;i<_13.length;i+=1){_14=_13[i];if(_14.zB()===zB){_15.push(_14);}else{if(_14.zB()<zB){break;}}}return _15;},subtract:function(_16,zB){var _17=this._blocksInLayer(zB);dojo.forEach(_17,function(_18){_18.subtract(_16);});}});}