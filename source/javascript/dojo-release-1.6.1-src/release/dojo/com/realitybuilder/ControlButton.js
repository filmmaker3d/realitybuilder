/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["com.realitybuilder.ControlButton"]){dojo._hasResource["com.realitybuilder.ControlButton"]=true;dojo.provide("com.realitybuilder.ControlButton");dojo.declare("com.realitybuilder.ControlButton",null,{_onClicked:null,_shouldBeEnabled:null,_isEnabled:false,_node:null,constructor:function(id,_1,_2){this._onClicked=_1;this._shouldBeEnabled=_2;this._node=dojo.byId(id);dojo.connect(this._node,"onclick",this,this._onClicked2);dojo.connect(this._node,"onmouseover",this,this._onMouseOver);dojo.connect(this._node,"onmouseout",this,this._onMouseOut);},_onMouseOver:function(){if(this._isEnabled){dojo.addClass(this._node,"hover");}},_onMouseOut:function(){dojo.removeClass(this._node,"hover");},_onClicked2:function(){if(this._isEnabled){this._onClicked();}},update:function(){this._isEnabled=this._shouldBeEnabled();if(!this._isEnabled){this._onMouseOut();dojo.addClass(this._node,"disabled");}else{dojo.removeClass(this._node,"disabled");}}});}