/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.lang.functional.multirec"],["require","dojox.lang.functional.lambda"],["require","dojox.lang.functional.util"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.lang.functional.multirec"]){_4._hasResource["dojox.lang.functional.multirec"]=true;_4.provide("dojox.lang.functional.multirec");_4.require("dojox.lang.functional.lambda");_4.require("dojox.lang.functional.util");(function(){var df=_6.lang.functional,_7=df.inlineLambda,_8="_x",_9=["_y.r","_y.o"];df.multirec=function(_a,_b,_c,_d){var c,t,b,a,cs,ts,bs,as,_e={},_f={},_10=function(x){_e[x]=1;};if(typeof _a=="string"){cs=_7(_a,_8,_10);}else{c=df.lambda(_a);cs="_c.apply(this, _x)";_f["_c=_t.c"]=1;}if(typeof _b=="string"){ts=_7(_b,_8,_10);}else{t=df.lambda(_b);ts="_t.apply(this, _x)";}if(typeof _c=="string"){bs=_7(_c,_8,_10);}else{b=df.lambda(_c);bs="_b.apply(this, _x)";_f["_b=_t.b"]=1;}if(typeof _d=="string"){as=_7(_d,_9,_10);}else{a=df.lambda(_d);as="_a.call(this, _y.r, _y.o)";_f["_a=_t.a"]=1;}var _11=df.keys(_e),_12=df.keys(_f),f=new Function([],"var _y={a:arguments},_x,_r,_z,_i".concat(_11.length?","+_11.join(","):"",_12.length?",_t=arguments.callee,"+_12.join(","):"",t?(_12.length?",_t=_t.t":"_t=arguments.callee.t"):"",";for(;;){for(;;){if(_y.o){_r=",as,";break}_x=_y.a;if(",cs,"){_r=",ts,";break}_y.o=_x;_x=",bs,";_y.r=[];_z=_y;for(_i=_x.length-1;_i>=0;--_i){_y={p:_y,a:_x[_i],z:_z}}}if(!(_z=_y.z)){return _r}_z.r.push(_r);_y=_y.p}"));if(c){f.c=c;}if(t){f.t=t;}if(b){f.b=b;}if(a){f.a=a;}return f;};})();}}};});