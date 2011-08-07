/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.fx.Shadow"],["require","dijit._Widget"],["require","dojo.NodeList-fx"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.fx.Shadow"]){_4._hasResource["dojox.fx.Shadow"]=true;_4.provide("dojox.fx.Shadow");_4.experimental("dojox.fx.Shadow");_4.require("dijit._Widget");_4.require("dojo.NodeList-fx");_4.declare("dojox.fx.Shadow",_5._Widget,{shadowPng:_4.moduleUrl("dojox.fx","resources/shadow"),shadowThickness:7,shadowOffset:3,opacity:0.75,animate:false,node:null,startup:function(){this.inherited(arguments);this.node.style.position="relative";this.pieces={};var x1=-1*this.shadowThickness;var y0=this.shadowOffset;var y1=this.shadowOffset+this.shadowThickness;this._makePiece("tl","top",y0,"left",x1);this._makePiece("l","top",y1,"left",x1,"scale");this._makePiece("tr","top",y0,"left",0);this._makePiece("r","top",y1,"left",0,"scale");this._makePiece("bl","top",0,"left",x1);this._makePiece("b","top",0,"left",0,"crop");this._makePiece("br","top",0,"left",0);this.nodeList=_4.query(".shadowPiece",this.node);this.setOpacity(this.opacity);this.resize();},_makePiece:function(_7,_8,_9,_a,_b,_c){var _d;var _e=this.shadowPng+_7.toUpperCase()+".png";if(_4.isIE<7){_d=_4.create("div");_d.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+_e+"'"+(_c?", sizingMethod='"+_c+"'":"")+")";}else{_d=_4.create("img",{src:_e});}_d.style.position="absolute";_d.style[_8]=_9+"px";_d.style[_a]=_b+"px";_d.style.width=this.shadowThickness+"px";_d.style.height=this.shadowThickness+"px";_4.addClass(_d,"shadowPiece");this.pieces[_7]=_d;this.node.appendChild(_d);},setOpacity:function(n,_f){if(_4.isIE){return;}if(!_f){_f={};}if(this.animate){var _10=[];this.nodeList.forEach(function(_11){_10.push(_4._fade(_4.mixin(_f,{node:_11,end:n})));});_4.fx.combine(_10).play();}else{this.nodeList.style("opacity",n);}},setDisabled:function(_12){if(_12){if(this.disabled){return;}if(this.animate){this.nodeList.fadeOut().play();}else{this.nodeList.style("visibility","hidden");}this.disabled=true;}else{if(!this.disabled){return;}if(this.animate){this.nodeList.fadeIn().play();}else{this.nodeList.style("visibility","visible");}this.disabled=false;}},resize:function(_13){var x;var y;if(_13){x=_13.x;y=_13.y;}else{var co=_4._getBorderBox(this.node);x=co.w;y=co.h;}var _14=y-(this.shadowOffset+this.shadowThickness);if(_14<0){_14=0;}if(y<1){y=1;}if(x<1){x=1;}with(this.pieces){l.style.height=_14+"px";r.style.height=_14+"px";b.style.width=x+"px";bl.style.top=y+"px";b.style.top=y+"px";br.style.top=y+"px";tr.style.left=x+"px";r.style.left=x+"px";br.style.left=x+"px";}}});}}};});