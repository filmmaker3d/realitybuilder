/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.widget.rotator.Controller"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.widget.rotator.Controller"]){_4._hasResource["dojox.widget.rotator.Controller"]=true;_4.provide("dojox.widget.rotator.Controller");(function(d){var _7="dojoxRotator",_8=_7+"Play",_9=_7+"Pause",_a=_7+"Number",_b=_7+"Tab",_c=_7+"Selected";d.declare("dojox.widget.rotator.Controller",null,{rotator:null,commands:"prev,play/pause,info,next",constructor:function(_d,_e){d.mixin(this,_d);var r=this.rotator;if(r){while(_e.firstChild){_e.removeChild(_e.firstChild);}var ul=this._domNode=d.create("ul",null,_e),_f=" "+_7+"Icon",cb=function(_10,css,_11){d.create("li",{className:css,innerHTML:"<a href=\"#\"><span>"+_10+"</span></a>",onclick:function(e){d.stopEvent(e);if(r){r.control.apply(r,_11);}}},ul);};d.forEach(this.commands.split(","),function(b,i){switch(b){case "prev":cb("Prev",_7+"Prev"+_f,["prev"]);break;case "play/pause":cb("Play",_8+_f,["play"]);cb("Pause",_9+_f,["pause"]);break;case "info":this._info=d.create("li",{className:_7+"Info",innerHTML:this._buildInfo(r)},ul);break;case "next":cb("Next",_7+"Next"+_f,["next"]);break;case "#":case "titles":for(var j=0;j<r.panes.length;j++){cb(b=="#"?j+1:r.panes[j].title||"Tab "+(j+1),(b=="#"?_a:_b)+" "+(j==r.idx?_c:"")+" "+_7+"Pane"+j,["go",j]);}break;}},this);d.query("li:first-child",ul).addClass(_7+"First");d.query("li:last-child",ul).addClass(_7+"Last");this._togglePlay();this._con=d.connect(r,"onUpdate",this,"_onUpdate");}},destroy:function(){d.disconnect(this._con);d.destroy(this._domNode);},_togglePlay:function(_12){var p=this.rotator.playing;d.query("."+_8,this._domNode).style("display",p?"none":"");d.query("."+_9,this._domNode).style("display",p?"":"none");},_buildInfo:function(r){return "<span>"+(r.idx+1)+" / "+r.panes.length+"</span>";},_onUpdate:function(_13){var r=this.rotator;switch(_13){case "play":case "pause":this._togglePlay();break;case "onAfterTransition":if(this._info){this._info.innerHTML=this._buildInfo(r);}var s=function(n){if(r.idx<n.length){d.addClass(n[r.idx],_c);}};s(d.query("."+_a,this._domNode).removeClass(_c));s(d.query("."+_b,this._domNode).removeClass(_c));break;}}});})(_4);}}};});