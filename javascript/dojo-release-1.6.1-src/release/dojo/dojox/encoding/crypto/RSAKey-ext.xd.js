/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.encoding.crypto.RSAKey-ext"],["require","dojox.encoding.crypto.RSAKey"],["require","dojox.math.BigInteger-ext"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.encoding.crypto.RSAKey-ext"]){_4._hasResource["dojox.encoding.crypto.RSAKey-ext"]=true;_4.provide("dojox.encoding.crypto.RSAKey-ext");_4.require("dojox.encoding.crypto.RSAKey");_4.require("dojox.math.BigInteger-ext");_4.experimental("dojox.encoding.crypto.RSAKey-ext");(function(){var _7=_6.math.BigInteger;function _8(d,n){var b=d.toByteArray();for(var i=0,_9=b.length;i<_9&&!b[i];++i){}if(b.length-i!==n-1||b[i]!==2){return null;}for(++i;b[i];){if(++i>=_9){return null;}}var _a="";while(++i<_9){_a+=String.fromCharCode(b[i]);}return _a;};_4.extend(_6.encoding.crypto.RSAKey,{setPrivate:function(N,E,D){if(N&&E&&N.length&&E.length){this.n=new _7(N,16);this.e=parseInt(E,16);this.d=new _7(D,16);}else{throw new Error("Invalid RSA private key");}},setPrivateEx:function(N,E,D,P,Q,DP,DQ,C){if(N&&E&&N.length&&E.length){this.n=new _7(N,16);this.e=parseInt(E,16);this.d=new _7(D,16);this.p=new _7(P,16);this.q=new _7(Q,16);this.dmp1=new _7(DP,16);this.dmq1=new _7(DQ,16);this.coeff=new _7(C,16);}else{throw new Error("Invalid RSA private key");}},generate:function(B,E){var _b=this.rngf(),qs=B>>1;this.e=parseInt(E,16);var ee=new _7(E,16);for(;;){for(;;){this.p=new _7(B-qs,1,_b);if(!this.p.subtract(_7.ONE).gcd(ee).compareTo(_7.ONE)&&this.p.isProbablePrime(10)){break;}}for(;;){this.q=new _7(qs,1,_b);if(!this.q.subtract(_7.ONE).gcd(ee).compareTo(_7.ONE)&&this.q.isProbablePrime(10)){break;}}if(this.p.compareTo(this.q)<=0){var t=this.p;this.p=this.q;this.q=t;}var p1=this.p.subtract(_7.ONE);var q1=this.q.subtract(_7.ONE);var _c=p1.multiply(q1);if(!_c.gcd(ee).compareTo(_7.ONE)){this.n=this.p.multiply(this.q);this.d=ee.modInverse(_c);this.dmp1=this.d.mod(p1);this.dmq1=this.d.mod(q1);this.coeff=this.q.modInverse(this.p);break;}}_b.destroy();},decrypt:function(_d){var c=new _7(_d,16),m;if(!this.p||!this.q){m=c.modPow(this.d,this.n);}else{var cp=c.mod(this.p).modPow(this.dmp1,this.p),cq=c.mod(this.q).modPow(this.dmq1,this.q);while(cp.compareTo(cq)<0){cp=cp.add(this.p);}m=cp.subtract(cq).multiply(this.coeff).mod(this.p).multiply(this.q).add(cq);}if(!m){return null;}return _8(m,(this.n.bitLength()+7)>>3);}});})();}}};});