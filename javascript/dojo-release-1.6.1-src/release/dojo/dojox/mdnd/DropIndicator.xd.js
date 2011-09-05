/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.mdnd.DropIndicator"],["require","dojox.mdnd.AreaManager"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.mdnd.DropIndicator"]){_4._hasResource["dojox.mdnd.DropIndicator"]=true;_4.provide("dojox.mdnd.DropIndicator");_4.require("dojox.mdnd.AreaManager");_4.declare("dojox.mdnd.DropIndicator",null,{node:null,constructor:function(){var _7=document.createElement("div");var _8=document.createElement("div");_7.appendChild(_8);_4.addClass(_7,"dropIndicator");this.node=_7;},place:function(_9,_a,_b){if(_b){this.node.style.height=_b.h+"px";}try{if(_a){_9.insertBefore(this.node,_a);}else{_9.appendChild(this.node);}return this.node;}catch(e){return null;}},remove:function(){if(this.node){this.node.style.height="";if(this.node.parentNode){this.node.parentNode.removeChild(this.node);}}},destroy:function(){if(this.node){if(this.node.parentNode){this.node.parentNode.removeChild(this.node);}_4._destroyElement(this.node);delete this.node;}}});(function(){_6.mdnd.areaManager()._dropIndicator=new _6.mdnd.DropIndicator();}());}}};});