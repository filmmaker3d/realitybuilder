/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojo.robot"],["require","doh.robot"],["require","dojo.window"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojo.robot"]){_4._hasResource["dojo.robot"]=true;_4.provide("dojo.robot");_4.require("doh.robot");_4.require("dojo.window");_4.experimental("dojo.robot");(function(){_4.mixin(doh.robot,{_resolveNode:function(n){if(typeof n=="function"){n=n();}return n?_4.byId(n):null;},_scrollIntoView:function(n){var d=_4,dr=doh.robot,p=null;d.forEach(dr._getWindowChain(n),function(w){d.withGlobal(w,function(){var p2=d.position(n,false),b=d._getPadBorderExtents(n),_7=null;if(!p){p=p2;}else{_7=p;p={x:p.x+p2.x+b.l,y:p.y+p2.y+b.t,w:p.w,h:p.h};}_4.window.scrollIntoView(n,p);p2=d.position(n,false);if(!_7){p=p2;}else{p={x:_7.x+p2.x+b.l,y:_7.y+p2.y+b.t,w:p.w,h:p.h};}n=w.frameElement;});});},_position:function(n){var d=_4,p=null,M=Math.max,m=Math.min;d.forEach(doh.robot._getWindowChain(n),function(w){d.withGlobal(w,function(){var p2=d.position(n,false),b=d._getPadBorderExtents(n);if(!p){p=p2;}else{var _8;d.withGlobal(n.contentWindow,function(){_8=_4.window.getBox();});p2.r=p2.x+_8.w;p2.b=p2.y+_8.h;p={x:M(p.x+p2.x,p2.x)+b.l,y:M(p.y+p2.y,p2.y)+b.t,r:m(p.x+p2.x+p.w,p2.r)+b.l,b:m(p.y+p2.y+p.h,p2.b)+b.t};p.w=p.r-p.x;p.h=p.b-p.y;}n=w.frameElement;});});return p;},_getWindowChain:function(n){var cW=_4.window.get(n.ownerDocument);var _9=[cW];var f=cW.frameElement;return (cW==_4.global||f==null)?_9:_9.concat(doh.robot._getWindowChain(f));},scrollIntoView:function(_a,_b){doh.robot.sequence(function(){doh.robot._scrollIntoView(doh.robot._resolveNode(_a));},_b);},mouseMoveAt:function(_c,_d,_e,_f,_10){doh.robot._assertRobot();_e=_e||100;this.sequence(function(){_c=doh.robot._resolveNode(_c);doh.robot._scrollIntoView(_c);var pos=doh.robot._position(_c);if(_10===undefined){_f=pos.w/2;_10=pos.h/2;}var x=pos.x+_f;var y=pos.y+_10;doh.robot._mouseMove(x,y,false,_e);},_d,_e);}});})();}}};});