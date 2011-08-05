/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","realitybuilder.ControlButton"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["realitybuilder.ControlButton"]){_4._hasResource["realitybuilder.ControlButton"]=true;_4.provide("realitybuilder.ControlButton");_4.declare("realitybuilder.ControlButton",null,{_onClicked:null,_shouldBeEnabled:null,_isEnabled:false,_node:null,constructor:function(id,_7,_8){this._onClicked=_7;this._shouldBeEnabled=_8;this._node=_4.byId(id);_4.connect(this._node,"onclick",this,this._onClicked2);_4.connect(this._node,"onmouseover",this,this._onMouseOver);_4.connect(this._node,"onmouseout",this,this._onMouseOut);},_onMouseOver:function(){if(this._isEnabled){_4.addClass(this._node,"hover");}},_onMouseOut:function(){_4.removeClass(this._node,"hover");},_onClicked2:function(){if(this._isEnabled){this._onClicked();}},update:function(){this._isEnabled=this._shouldBeEnabled();if(!this._isEnabled){this._onMouseOut();_4.addClass(this._node,"disabled");}else{_4.removeClass(this._node,"disabled");}}});}}};});