/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.fx.scroll"],["require","dojox.fx._core"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.fx.scroll"]){_4._hasResource["dojox.fx.scroll"]=true;_4.provide("dojox.fx.scroll");_4.experimental("dojox.fx.scroll");_4.require("dojox.fx._core");_6.fx.smoothScroll=function(_7){if(!_7.target){_7.target=_4.position(_7.node);}var _8=_4[(_4.isIE?"isObject":"isFunction")](_7["win"].scrollTo),_9={x:_7.target.x,y:_7.target.y};if(!_8){var _a=_4.position(_7.win);_9.x-=_a.x;_9.y-=_a.y;}var _b=(_8)?(function(_c){_7.win.scrollTo(_c[0],_c[1]);}):(function(_d){_7.win.scrollLeft=_d[0];_7.win.scrollTop=_d[1];});var _e=new _4.Animation(_4.mixin({beforeBegin:function(){if(this.curve){delete this.curve;}var _f=_8?_4._docScroll():{x:_7.win.scrollLeft,y:_7.win.scrollTop};_e.curve=new _6.fx._Line([_f.x,_f.y],[_f.x+_9.x,_f.y+_9.y]);},onAnimate:_b},_7));return _e;};}}};});