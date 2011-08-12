/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.widget.rotator.Pan"],["require","dojo.fx"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.widget.rotator.Pan"]){_4._hasResource["dojox.widget.rotator.Pan"]=true;_4.provide("dojox.widget.rotator.Pan");_4.require("dojo.fx");(function(d){var _7=0,_8=1,UP=2,_9=3;function _a(_b,_c){var n=_c.next.node,r=_c.rotatorBox,m=_b%2,a=m?"left":"top",s=(m?r.w:r.h)*(_b<2?-1:1),p={},q={};d.style(n,"display","");p[a]={start:0,end:-s};q[a]={start:s,end:0};return d.fx.combine([d.animateProperty({node:_c.current.node,duration:_c.duration,properties:p,easing:_c.easing}),d.animateProperty({node:n,duration:_c.duration,properties:q,easing:_c.easing})]);};function _d(n,z){d.style(n,"zIndex",z);};d.mixin(_6.widget.rotator,{pan:function(_e){var w=_e.wrap,p=_e.rotator.panes,_f=p.length,z=_f,j=_e.current.idx,k=_e.next.idx,nw=Math.abs(k-j),ww=Math.abs((_f-Math.max(j,k))+Math.min(j,k))%_f,_10=j<k,_11=_9,_12=[],_13=[],_14=_e.duration;if((!w&&!_10)||(w&&(_10&&nw>ww||!_10&&nw<ww))){_11=_8;}if(_e.continuous){if(_e.quick){_14=Math.round(_14/(w?Math.min(ww,nw):nw));}_d(p[j].node,z--);var f=(_11==_9);while(1){var i=j;if(f){if(++j>=_f){j=0;}}else{if(--j<0){j=_f-1;}}var x=p[i],y=p[j];_d(y.node,z--);_12.push(_a(_11,d.mixin({easing:function(m){return m;}},_e,{current:x,next:y,duration:_14})));if((f&&j==k)||(!f&&j==k)){break;}_13.push(y.node);}var _15=d.fx.chain(_12),h=d.connect(_15,"onEnd",function(){d.disconnect(h);d.forEach(_13,function(q){d.style(q,{display:"none",left:0,opacity:1,top:0,zIndex:0});});});return _15;}return _a(_11,_e);},panDown:function(_16){return _a(_7,_16);},panRight:function(_17){return _a(_8,_17);},panUp:function(_18){return _a(UP,_18);},panLeft:function(_19){return _a(_9,_19);}});})(_4);}}};});