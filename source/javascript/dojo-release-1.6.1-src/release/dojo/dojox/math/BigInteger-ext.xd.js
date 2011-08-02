/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.math.BigInteger-ext"],["require","dojox.math.BigInteger"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.math.BigInteger-ext"]){_4._hasResource["dojox.math.BigInteger-ext"]=true;_4.provide("dojox.math.BigInteger-ext");_4.require("dojox.math.BigInteger");_4.experimental("dojox.math.BigInteger-ext");(function(){var _7=_6.math.BigInteger,_8=_7._nbi,_9=_7._nbv,_a=_7._nbits,_b=_7._Montgomery;function _c(){var r=_8();this._copyTo(r);return r;};function _d(){if(this.s<0){if(this.t==1){return this[0]-this._DV;}else{if(this.t==0){return -1;}}}else{if(this.t==1){return this[0];}else{if(this.t==0){return 0;}}}return ((this[1]&((1<<(32-this._DB))-1))<<this._DB)|this[0];};function _e(){return (this.t==0)?this.s:(this[0]<<24)>>24;};function _f(){return (this.t==0)?this.s:(this[0]<<16)>>16;};function _10(r){return Math.floor(Math.LN2*this._DB/Math.log(r));};function _11(){if(this.s<0){return -1;}else{if(this.t<=0||(this.t==1&&this[0]<=0)){return 0;}else{return 1;}}};function _12(b){if(b==null){b=10;}if(this.signum()==0||b<2||b>36){return "0";}var cs=this._chunkSize(b);var a=Math.pow(b,cs);var d=_9(a),y=_8(),z=_8(),r="";this._divRemTo(d,y,z);while(y.signum()>0){r=(a+z.intValue()).toString(b).substr(1)+r;y._divRemTo(d,y,z);}return z.intValue().toString(b)+r;};function _13(s,b){this._fromInt(0);if(b==null){b=10;}var cs=this._chunkSize(b);var d=Math.pow(b,cs),mi=false,j=0,w=0;for(var i=0;i<s.length;++i){var x=intAt(s,i);if(x<0){if(s.charAt(i)=="-"&&this.signum()==0){mi=true;}continue;}w=b*w+x;if(++j>=cs){this._dMultiply(d);this._dAddOffset(w,0);j=0;w=0;}}if(j>0){this._dMultiply(Math.pow(b,j));this._dAddOffset(w,0);}if(mi){_7.ZERO._subTo(this,this);}};function _14(a,b,c){if("number"==typeof b){if(a<2){this._fromInt(1);}else{this._fromNumber(a,c);if(!this.testBit(a-1)){this._bitwiseTo(_7.ONE.shiftLeft(a-1),_15,this);}if(this._isEven()){this._dAddOffset(1,0);}while(!this.isProbablePrime(b)){this._dAddOffset(2,0);if(this.bitLength()>a){this._subTo(_7.ONE.shiftLeft(a-1),this);}}}}else{var x=[],t=a&7;x.length=(a>>3)+1;b.nextBytes(x);if(t>0){x[0]&=((1<<t)-1);}else{x[0]=0;}this._fromString(x,256);}};function _16(){var i=this.t,r=[];r[0]=this.s;var p=this._DB-(i*this._DB)%8,d,k=0;if(i-->0){if(p<this._DB&&(d=this[i]>>p)!=(this.s&this._DM)>>p){r[k++]=d|(this.s<<(this._DB-p));}while(i>=0){if(p<8){d=(this[i]&((1<<p)-1))<<(8-p);d|=this[--i]>>(p+=this._DB-8);}else{d=(this[i]>>(p-=8))&255;if(p<=0){p+=this._DB;--i;}}if((d&128)!=0){d|=-256;}if(k==0&&(this.s&128)!=(d&128)){++k;}if(k>0||d!=this.s){r[k++]=d;}}}return r;};function _17(a){return (this.compareTo(a)==0);};function _18(a){return (this.compareTo(a)<0)?this:a;};function _19(a){return (this.compareTo(a)>0)?this:a;};function _1a(a,op,r){var i,f,m=Math.min(a.t,this.t);for(i=0;i<m;++i){r[i]=op(this[i],a[i]);}if(a.t<this.t){f=a.s&this._DM;for(i=m;i<this.t;++i){r[i]=op(this[i],f);}r.t=this.t;}else{f=this.s&this._DM;for(i=m;i<a.t;++i){r[i]=op(f,a[i]);}r.t=a.t;}r.s=op(this.s,a.s);r._clamp();};function _1b(x,y){return x&y;};function _1c(a){var r=_8();this._bitwiseTo(a,_1b,r);return r;};function _15(x,y){return x|y;};function _1d(a){var r=_8();this._bitwiseTo(a,_15,r);return r;};function _1e(x,y){return x^y;};function _1f(a){var r=_8();this._bitwiseTo(a,_1e,r);return r;};function _20(x,y){return x&~y;};function _21(a){var r=_8();this._bitwiseTo(a,_20,r);return r;};function _22(){var r=_8();for(var i=0;i<this.t;++i){r[i]=this._DM&~this[i];}r.t=this.t;r.s=~this.s;return r;};function _23(n){var r=_8();if(n<0){this._rShiftTo(-n,r);}else{this._lShiftTo(n,r);}return r;};function _24(n){var r=_8();if(n<0){this._lShiftTo(-n,r);}else{this._rShiftTo(n,r);}return r;};function _25(x){if(x==0){return -1;}var r=0;if((x&65535)==0){x>>=16;r+=16;}if((x&255)==0){x>>=8;r+=8;}if((x&15)==0){x>>=4;r+=4;}if((x&3)==0){x>>=2;r+=2;}if((x&1)==0){++r;}return r;};function _26(){for(var i=0;i<this.t;++i){if(this[i]!=0){return i*this._DB+_25(this[i]);}}if(this.s<0){return this.t*this._DB;}return -1;};function _27(x){var r=0;while(x!=0){x&=x-1;++r;}return r;};function _28(){var r=0,x=this.s&this._DM;for(var i=0;i<this.t;++i){r+=_27(this[i]^x);}return r;};function _29(n){var j=Math.floor(n/this._DB);if(j>=this.t){return (this.s!=0);}return ((this[j]&(1<<(n%this._DB)))!=0);};function _2a(n,op){var r=_7.ONE.shiftLeft(n);this._bitwiseTo(r,op,r);return r;};function _2b(n){return this._changeBit(n,_15);};function _2c(n){return this._changeBit(n,_20);};function _2d(n){return this._changeBit(n,_1e);};function _2e(a,r){var i=0,c=0,m=Math.min(a.t,this.t);while(i<m){c+=this[i]+a[i];r[i++]=c&this._DM;c>>=this._DB;}if(a.t<this.t){c+=a.s;while(i<this.t){c+=this[i];r[i++]=c&this._DM;c>>=this._DB;}c+=this.s;}else{c+=this.s;while(i<a.t){c+=a[i];r[i++]=c&this._DM;c>>=this._DB;}c+=a.s;}r.s=(c<0)?-1:0;if(c>0){r[i++]=c;}else{if(c<-1){r[i++]=this._DV+c;}}r.t=i;r._clamp();};function _2f(a){var r=_8();this._addTo(a,r);return r;};function _30(a){var r=_8();this._subTo(a,r);return r;};function _31(a){var r=_8();this._multiplyTo(a,r);return r;};function _32(a){var r=_8();this._divRemTo(a,r,null);return r;};function _33(a){var r=_8();this._divRemTo(a,null,r);return r;};function _34(a){var q=_8(),r=_8();this._divRemTo(a,q,r);return [q,r];};function _35(n){this[this.t]=this.am(0,n-1,this,0,0,this.t);++this.t;this._clamp();};function _36(n,w){while(this.t<=w){this[this.t++]=0;}this[w]+=n;while(this[w]>=this._DV){this[w]-=this._DV;if(++w>=this.t){this[this.t++]=0;}++this[w];}};function _37(){};function _38(x){return x;};function _39(x,y,r){x._multiplyTo(y,r);};function _3a(x,r){x._squareTo(r);};_37.prototype.convert=_38;_37.prototype.revert=_38;_37.prototype.mulTo=_39;_37.prototype.sqrTo=_3a;function _3b(e){return this._exp(e,new _37());};function _3c(a,n,r){var i=Math.min(this.t+a.t,n);r.s=0;r.t=i;while(i>0){r[--i]=0;}var j;for(j=r.t-this.t;i<j;++i){r[i+this.t]=this.am(0,a[i],r,i,0,this.t);}for(j=Math.min(a.t,n);i<j;++i){this.am(0,a[i],r,i,0,n-i);}r._clamp();};function _3d(a,n,r){--n;var i=r.t=this.t+a.t-n;r.s=0;while(--i>=0){r[i]=0;}for(i=Math.max(n-this.t,0);i<a.t;++i){r[this.t+i-n]=this.am(n-i,a[i],r,0,0,this.t+i-n);}r._clamp();r._drShiftTo(1,r);};function _3e(m){this.r2=_8();this.q3=_8();_7.ONE._dlShiftTo(2*m.t,this.r2);this.mu=this.r2.divide(m);this.m=m;};function _3f(x){if(x.s<0||x.t>2*this.m.t){return x.mod(this.m);}else{if(x.compareTo(this.m)<0){return x;}else{var r=_8();x._copyTo(r);this.reduce(r);return r;}}};function _40(x){return x;};function _41(x){x._drShiftTo(this.m.t-1,this.r2);if(x.t>this.m.t+1){x.t=this.m.t+1;x._clamp();}this.mu._multiplyUpperTo(this.r2,this.m.t+1,this.q3);this.m._multiplyLowerTo(this.q3,this.m.t+1,this.r2);while(x.compareTo(this.r2)<0){x._dAddOffset(1,this.m.t+1);}x._subTo(this.r2,x);while(x.compareTo(this.m)>=0){x._subTo(this.m,x);}};function _42(x,r){x._squareTo(r);this.reduce(r);};function _43(x,y,r){x._multiplyTo(y,r);this.reduce(r);};_3e.prototype.convert=_3f;_3e.prototype.revert=_40;_3e.prototype.reduce=_41;_3e.prototype.mulTo=_43;_3e.prototype.sqrTo=_42;function _44(e,m){var i=e.bitLength(),k,r=_9(1),z;if(i<=0){return r;}else{if(i<18){k=1;}else{if(i<48){k=3;}else{if(i<144){k=4;}else{if(i<768){k=5;}else{k=6;}}}}}if(i<8){z=new Classic(m);}else{if(m._isEven()){z=new _3e(m);}else{z=new _b(m);}}var g=[],n=3,k1=k-1,km=(1<<k)-1;g[1]=z.convert(this);if(k>1){var g2=_8();z.sqrTo(g[1],g2);while(n<=km){g[n]=_8();z.mulTo(g2,g[n-2],g[n]);n+=2;}}var j=e.t-1,w,is1=true,r2=_8(),t;i=_a(e[j])-1;while(j>=0){if(i>=k1){w=(e[j]>>(i-k1))&km;}else{w=(e[j]&((1<<(i+1))-1))<<(k1-i);if(j>0){w|=e[j-1]>>(this._DB+i-k1);}}n=k;while((w&1)==0){w>>=1;--n;}if((i-=n)<0){i+=this._DB;--j;}if(is1){g[w]._copyTo(r);is1=false;}else{while(n>1){z.sqrTo(r,r2);z.sqrTo(r2,r);n-=2;}if(n>0){z.sqrTo(r,r2);}else{t=r;r=r2;r2=t;}z.mulTo(r2,g[w],r);}while(j>=0&&(e[j]&(1<<i))==0){z.sqrTo(r,r2);t=r;r=r2;r2=t;if(--i<0){i=this._DB-1;--j;}}}return z.revert(r);};function _45(a){var x=(this.s<0)?this.negate():this.clone();var y=(a.s<0)?a.negate():a.clone();if(x.compareTo(y)<0){var t=x;x=y;y=t;}var i=x.getLowestSetBit(),g=y.getLowestSetBit();if(g<0){return x;}if(i<g){g=i;}if(g>0){x._rShiftTo(g,x);y._rShiftTo(g,y);}while(x.signum()>0){if((i=x.getLowestSetBit())>0){x._rShiftTo(i,x);}if((i=y.getLowestSetBit())>0){y._rShiftTo(i,y);}if(x.compareTo(y)>=0){x._subTo(y,x);x._rShiftTo(1,x);}else{y._subTo(x,y);y._rShiftTo(1,y);}}if(g>0){y._lShiftTo(g,y);}return y;};function _46(n){if(n<=0){return 0;}var d=this._DV%n,r=(this.s<0)?n-1:0;if(this.t>0){if(d==0){r=this[0]%n;}else{for(var i=this.t-1;i>=0;--i){r=(d*r+this[i])%n;}}}return r;};function _47(m){var ac=m._isEven();if((this._isEven()&&ac)||m.signum()==0){return _7.ZERO;}var u=m.clone(),v=this.clone();var a=_9(1),b=_9(0),c=_9(0),d=_9(1);while(u.signum()!=0){while(u._isEven()){u._rShiftTo(1,u);if(ac){if(!a._isEven()||!b._isEven()){a._addTo(this,a);b._subTo(m,b);}a._rShiftTo(1,a);}else{if(!b._isEven()){b._subTo(m,b);}}b._rShiftTo(1,b);}while(v._isEven()){v._rShiftTo(1,v);if(ac){if(!c._isEven()||!d._isEven()){c._addTo(this,c);d._subTo(m,d);}c._rShiftTo(1,c);}else{if(!d._isEven()){d._subTo(m,d);}}d._rShiftTo(1,d);}if(u.compareTo(v)>=0){u._subTo(v,u);if(ac){a._subTo(c,a);}b._subTo(d,b);}else{v._subTo(u,v);if(ac){c._subTo(a,c);}d._subTo(b,d);}}if(v.compareTo(_7.ONE)!=0){return _7.ZERO;}if(d.compareTo(m)>=0){return d.subtract(m);}if(d.signum()<0){d._addTo(m,d);}else{return d;}if(d.signum()<0){return d.add(m);}else{return d;}};var _48=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509];var _49=(1<<26)/_48[_48.length-1];function _4a(t){var i,x=this.abs();if(x.t==1&&x[0]<=_48[_48.length-1]){for(i=0;i<_48.length;++i){if(x[0]==_48[i]){return true;}}return false;}if(x._isEven()){return false;}i=1;while(i<_48.length){var m=_48[i],j=i+1;while(j<_48.length&&m<_49){m*=_48[j++];}m=x._modInt(m);while(i<j){if(m%_48[i++]==0){return false;}}}return x._millerRabin(t);};function _4b(t){var n1=this.subtract(_7.ONE);var k=n1.getLowestSetBit();if(k<=0){return false;}var r=n1.shiftRight(k);t=(t+1)>>1;if(t>_48.length){t=_48.length;}var a=_8();for(var i=0;i<t;++i){a._fromInt(_48[i]);var y=a.modPow(r,this);if(y.compareTo(_7.ONE)!=0&&y.compareTo(n1)!=0){var j=1;while(j++<k&&y.compareTo(n1)!=0){y=y.modPowInt(2,this);if(y.compareTo(_7.ONE)==0){return false;}}if(y.compareTo(n1)!=0){return false;}}}return true;};_4.extend(_7,{_chunkSize:_10,_toRadix:_12,_fromRadix:_13,_fromNumber:_14,_bitwiseTo:_1a,_changeBit:_2a,_addTo:_2e,_dMultiply:_35,_dAddOffset:_36,_multiplyLowerTo:_3c,_multiplyUpperTo:_3d,_modInt:_46,_millerRabin:_4b,clone:_c,intValue:_d,byteValue:_e,shortValue:_f,signum:_11,toByteArray:_16,equals:_17,min:_18,max:_19,and:_1c,or:_1d,xor:_1f,andNot:_21,not:_22,shiftLeft:_23,shiftRight:_24,getLowestSetBit:_26,bitCount:_28,testBit:_29,setBit:_2b,clearBit:_2c,flipBit:_2d,add:_2f,subtract:_30,multiply:_31,divide:_32,remainder:_33,divideAndRemainder:_34,modPow:_44,modInverse:_47,pow:_3b,gcd:_45,isProbablePrime:_4a});})();}}};});