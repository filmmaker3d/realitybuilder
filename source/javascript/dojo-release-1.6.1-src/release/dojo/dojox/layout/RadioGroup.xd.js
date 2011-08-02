/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.layout.RadioGroup"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dijit._Contained"],["require","dijit.layout.StackContainer"],["require","dojo.fx.easing"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.layout.RadioGroup"]){_4._hasResource["dojox.layout.RadioGroup"]=true;_4.provide("dojox.layout.RadioGroup");_4.experimental("dojox.layout.RadioGroup");_4.require("dijit._Widget");_4.require("dijit._Templated");_4.require("dijit._Contained");_4.require("dijit.layout.StackContainer");_4.require("dojo.fx.easing");_4.declare("dojox.layout.RadioGroup",[_5.layout.StackContainer,_5._Templated],{duration:750,hasButtons:false,buttonClass:"dojox.layout._RadioButton",templateString:"<div class=\"dojoxRadioGroup\">"+" \t<div dojoAttachPoint=\"buttonHolder\" style=\"display:none;\">"+"\t\t<table class=\"dojoxRadioButtons\"><tbody><tr class=\"dojoxRadioButtonRow\" dojoAttachPoint=\"buttonNode\"></tr></tbody></table>"+"\t</div>"+"\t<div class=\"dojoxRadioView\" dojoAttachPoint=\"containerNode\"></div>"+"</div>",startup:function(){this.inherited(arguments);this._children=this.getChildren();this._buttons=this._children.length;this._size=_4.coords(this.containerNode);if(this.hasButtons){_4.style(this.buttonHolder,"display","block");}},_setupChild:function(_7){_4.style(_7.domNode,"position","absolute");if(this.hasButtons){var _8=this.buttonNode.appendChild(_4.create("td"));var n=_4.create("div",null,_8),_9=_4.getObject(this.buttonClass),_a=new _9({label:_7.title,page:_7},n);_4.mixin(_7,{_radioButton:_a});_a.startup();}_7.domNode.style.display="none";},removeChild:function(_b){if(this.hasButtons&&_b._radioButton){_b._radioButton.destroy();delete _b._radioButton;}this.inherited(arguments);},_transition:function(_c,_d){this._showChild(_c);if(_d){this._hideChild(_d);}if(this.doLayout&&_c.resize){_c.resize(this._containerContentBox||this._contentBox);}},_showChild:function(_e){var _f=this.getChildren();_e.isFirstChild=(_e==_f[0]);_e.isLastChild=(_e==_f[_f.length-1]);_e.selected=true;_e.domNode.style.display="";if(_e._onShow){_e._onShow();}else{if(_e.onShow){_e.onShow();}}},_hideChild:function(_10){_10.selected=false;_10.domNode.style.display="none";if(_10.onHide){_10.onHide();}}});_4.declare("dojox.layout.RadioGroupFade",_6.layout.RadioGroup,{_hideChild:function(_11){_4.fadeOut({node:_11.domNode,duration:this.duration,onEnd:_4.hitch(this,"inherited",arguments,arguments)}).play();},_showChild:function(_12){this.inherited(arguments);_4.style(_12.domNode,"opacity",0);_4.fadeIn({node:_12.domNode,duration:this.duration}).play();}});_4.declare("dojox.layout.RadioGroupSlide",_6.layout.RadioGroup,{easing:"dojo.fx.easing.backOut",zTop:99,constructor:function(){if(_4.isString(this.easing)){this.easing=_4.getObject(this.easing);}},_positionChild:function(_13){if(!this._size){return;}var rA=true,rB=true;switch(_13.slideFrom){case "bottom":rB=!rB;break;case "right":rA=!rA;rB=!rB;break;case "top":break;case "left":rA=!rA;break;default:rA=Math.round(Math.random());rB=Math.round(Math.random());break;}var _14=rA?"top":"left",val=(rB?"-":"")+(this._size[rA?"h":"w"]+20)+"px";_4.style(_13.domNode,_14,val);},_showChild:function(_15){var _16=this.getChildren();_15.isFirstChild=(_15==_16[0]);_15.isLastChild=(_15==_16[_16.length-1]);_15.selected=true;_4.style(_15.domNode,{zIndex:this.zTop,display:""});if(this._anim&&this._anim.status()=="playing"){this._anim.gotoPercent(100,true);}this._anim=_4.animateProperty({node:_15.domNode,properties:{left:0,top:0},duration:this.duration,easing:this.easing,onEnd:_4.hitch(_15,function(){if(this.onShow){this.onShow();}if(this._onShow){this._onShow();}}),beforeBegin:_4.hitch(this,"_positionChild",_15)});this._anim.play();},_hideChild:function(_17){_17.selected=false;_17.domNode.style.zIndex=this.zTop-1;if(_17.onHide){_17.onHide();}}});_4.declare("dojox.layout._RadioButton",[_5._Widget,_5._Templated,_5._Contained],{label:"",page:null,templateString:"<div dojoAttachPoint=\"focusNode\" class=\"dojoxRadioButton\"><span dojoAttachPoint=\"titleNode\" class=\"dojoxRadioButtonLabel\">${label}</span></div>",startup:function(){this.connect(this.domNode,"onmouseenter","_onMouse");},_onMouse:function(e){this.getParent().selectChild(this.page);this._clearSelected();_4.addClass(this.domNode,"dojoxRadioButtonSelected");},_clearSelected:function(){_4.query(".dojoxRadioButtonSelected",this.domNode.parentNode.parentNode).removeClass("dojoxRadioButtonSelected");}});_4.extend(_5._Widget,{slideFrom:"random"});}}};});