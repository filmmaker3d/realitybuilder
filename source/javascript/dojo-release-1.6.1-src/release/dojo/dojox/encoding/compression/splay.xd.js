/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.encoding.compression.splay"],["require","dojox.encoding.bits"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.encoding.compression.splay"]){_4._hasResource["dojox.encoding.compression.splay"]=true;_4.provide("dojox.encoding.compression.splay");_4.require("dojox.encoding.bits");_4.getObject("encoding.compression.splay",true,_6);_6.encoding.compression.Splay=function(n){this.up=new Array(2*n+1);this.left=new Array(n);this.right=new Array(n);this.reset();};_4.extend(_6.encoding.compression.Splay,{reset:function(){for(var i=1;i<this.up.length;this.up[i]=Math.floor((i-1)/2),++i){}for(var i=0;i<this.left.length;this.left[i]=2*i+1,this.right[i]=2*i+2,++i){}},splay:function(i){var a=i+this.left.length;do{var c=this.up[a];if(c){var d=this.up[c];var b=this.left[d];if(c==b){b=this.right[d];this.right[d]=a;}else{this.left[d]=a;}this[a==this.left[c]?"left":"right"][c]=b;this.up[a]=d;this.up[b]=c;a=d;}else{a=c;}}while(a);},encode:function(_7,_8){var s=[],a=_7+this.left.length;do{s.push(this.right[this.up[a]]==a);a=this.up[a];}while(a);this.splay(_7);var l=s.length;while(s.length){_8.putBits(s.pop()?1:0,1);}return l;},decode:function(_9){var a=0;do{a=this[_9.getBits(1)?"right":"left"][a];}while(a<this.left.length);a-=this.left.length;this.splay(a);return a;}});}}};});