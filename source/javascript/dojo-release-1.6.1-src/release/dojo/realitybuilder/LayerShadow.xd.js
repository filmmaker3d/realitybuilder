/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","realitybuilder.LayerShadow"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["realitybuilder.LayerShadow"]){_4._hasResource["realitybuilder.LayerShadow"]=true;_4.provide("realitybuilder.LayerShadow");_4.declare("realitybuilder.LayerShadow",null,{_newBlock:null,_camera:null,_blockProperties:null,_constructionBlocks:null,_fullVertexes:null,_fullVertexesV:null,_fullVertexesS:null,_canvas:null,_helperCanvas:null,constructor:function(_7,_8,_9,_a){var _b;this._newBlock=_7;this._blockProperties=_8;this._camera=_9;this._constructionBlocks=_a;_b=_9.sensor().shadowCanvas();this._canvas=_4.create("canvas");_4.attr(this._canvas,"width",_b.width);_4.attr(this._canvas,"height",_b.height);this._helperCanvas=_4.create("canvas");_4.attr(this._helperCanvas,"width",_b.width);_4.attr(this._helperCanvas,"height",_b.height);if(realitybuilder.util.isFlashCanvasActive()){FlashCanvas.initElement(this._canvas);FlashCanvas.initElement(this._helperCanvas);}},canvas:function(){return this._canvas;},_updateWorldSpace:function(_c){var xB=this._newBlock.xB(),yB=this._newBlock.yB(),zB=_c+1,vs=[],_d=this._blockProperties.rotatedOutlineBXY(this._newBlock.a()),_e=this;_4.forEach(_d,function(_f){vs.push(realitybuilder.util.blockToWorld([xB+_f[0],yB+_f[1],zB],_e._blockProperties));});this._fullVertexes=vs;},_updateViewSpaceCoordinates:function(_10){this._updateWorldSpace(_10);this._fullVertexesV=_4.map(this._fullVertexes,_4.hitch(this._camera,this._camera.worldToView));},_updateSensorSpaceCoordinates:function(_11){this._fullVertexesS=_4.map(this._fullVertexesV,_4.hitch(this._camera,this._camera.viewToSensor));},_updateCoordinates:function(_12){this._updateViewSpaceCoordinates(_12);this._updateSensorSpaceCoordinates(_12);},_renderTops:function(_13,_14){var _15=this._constructionBlocks.realBlocksInLayer(_13);_4.forEach(_15,function(_16){_16.renderSolidTop(_14);});},_renderFull:function(_17,_18,_19){var _1a,_1b,i;this._updateCoordinates(_17);_1a=this._fullVertexesS;_18.fillStyle=_19;_1b=_1a[0];_18.beginPath();_18.moveTo(_1b[0],_1b[1]);for(i=1;i<_1a.length;i+=1){_1b=_1a[i];_18.lineTo(_1b[0],_1b[1]);}_18.closePath();_18.fill();},render:function(_1c,_1d){var _1e=this._canvas,_1f=this._helperCanvas,_20,_21;if(_1e.getContext){_20=_1e.getContext("2d");realitybuilder.util.clearCanvas(_1e);_21=_1f.getContext("2d");realitybuilder.util.clearCanvas(_1f);_20.globalCompositeOperation="source-over";if(_1c===-1){realitybuilder.util.fillCanvas(_1e,"black");}else{this._renderTops(_1c,_20);}_21.globalCompositeOperation="source-over";_21.drawImage(_1e,0,0);_21.globalCompositeOperation="xor";this._renderFull(_1c,_21,_1d);this._renderFull(_1c,_20,_1d);_20.globalCompositeOperation="destination-out";_20.drawImage(_1f,0,0);}}});}}};});