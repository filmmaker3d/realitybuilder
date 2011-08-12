/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.mobile.app.compat"],["require","dojox.mobile.compat"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.mobile.app.compat"]){_4._hasResource["dojox.mobile.app.compat"]=true;_4.provide("dojox.mobile.app.compat");_4.require("dojox.mobile.compat");_4.extend(_6.mobile.app.AlertDialog,{_doTransition:function(_7){console.log("in _doTransition and this = ",this);var h=_4.marginBox(this.domNode.firstChild).h;var _8=this.controller.getWindowSize().h;var _9=_8-h;var _a=_8;var _b=_4.fx.slideTo({node:this.domNode,duration:400,top:{start:_7<0?_9:_a,end:_7<0?_a:_9}});var _c=_4[_7<0?"fadeOut":"fadeIn"]({node:this.mask,duration:400});var _d=_4.fx.combine([_b,_c]);var _e=this;_4.connect(_d,"onEnd",this,function(){if(_7<0){_e.domNode.style.display="none";_4.destroy(_e.domNode);_4.destroy(_e.mask);}});_d.play();}});_4.extend(_6.mobile.app.List,{deleteRow:function(){console.log("deleteRow in compat mode",_f);var _f=this._selectedRow;_4.style(_f,{visibility:"hidden",minHeight:"0px"});_4.removeClass(_f,"hold");var _10=_4.contentBox(_f).h;_4.animateProperty({node:_f,duration:800,properties:{height:{start:_10,end:1},paddingTop:{end:0},paddingBottom:{end:0}},onEnd:this._postDeleteAnim}).play();}});if(_6.mobile.app.ImageView&&!_4.create("canvas").getContext){_4.extend(_6.mobile.app.ImageView,{buildRendering:function(){this.domNode.innerHTML="ImageView widget is not supported on this browser."+"Please try again with a modern browser, e.g. "+"Safari, Chrome or Firefox";this.canvas={};},postCreate:function(){}});}if(_6.mobile.app.ImageThumbView){_4.extend(_6.mobile.app.ImageThumbView,{place:function(_11,x,y){_4.style(_11,{top:y+"px",left:x+"px",visibility:"visible"});}});}}}};});