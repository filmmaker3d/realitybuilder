/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.sql._crypto"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.sql._crypto"]){_4._hasResource["dojox.sql._crypto"]=true;_4.provide("dojox.sql._crypto");_4.mixin(_6.sql._crypto,{_POOL_SIZE:100,encrypt:function(_7,_8,_9){this._initWorkerPool();var _a={plaintext:_7,password:_8};_a=_4.toJson(_a);_a="encr:"+String(_a);this._assignWork(_a,_9);},decrypt:function(_b,_c,_d){this._initWorkerPool();var _e={ciphertext:_b,password:_c};_e=_4.toJson(_e);_e="decr:"+String(_e);this._assignWork(_e,_d);},_initWorkerPool:function(){if(!this._manager){try{this._manager=google.gears.factory.create("beta.workerpool","1.0");this._unemployed=[];this._employed={};this._handleMessage=[];var _f=this;this._manager.onmessage=function(msg,_10){var _11=_f._employed["_"+_10];_f._employed["_"+_10]=undefined;_f._unemployed.push("_"+_10);if(_f._handleMessage.length){var _12=_f._handleMessage.shift();_f._assignWork(_12.msg,_12.callback);}_11(msg);};var _13="function _workerInit(){"+"gearsWorkerPool.onmessage = "+String(this._workerHandler)+";"+"}";var _14=_13+" _workerInit();";for(var i=0;i<this._POOL_SIZE;i++){this._unemployed.push("_"+this._manager.createWorker(_14));}}catch(exp){throw exp.message||exp;}}},_assignWork:function(msg,_15){if(!this._handleMessage.length&&this._unemployed.length){var _16=this._unemployed.shift().substring(1);this._employed["_"+_16]=_15;this._manager.sendMessage(msg,parseInt(_16,10));}else{this._handleMessage={msg:msg,callback:_15};}},_workerHandler:function(msg,_17){var _18=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22];var _19=[[0,0,0,0],[1,0,0,0],[2,0,0,0],[4,0,0,0],[8,0,0,0],[16,0,0,0],[32,0,0,0],[64,0,0,0],[128,0,0,0],[27,0,0,0],[54,0,0,0]];function _1a(_1b,w){var Nb=4;var Nr=w.length/Nb-1;var _1c=[[],[],[],[]];for(var i=0;i<4*Nb;i++){_1c[i%4][Math.floor(i/4)]=_1b[i];}_1c=_1d(_1c,w,0,Nb);for(var _1e=1;_1e<Nr;_1e++){_1c=_1f(_1c,Nb);_1c=_20(_1c,Nb);_1c=_21(_1c,Nb);_1c=_1d(_1c,w,_1e,Nb);}_1c=_1f(_1c,Nb);_1c=_20(_1c,Nb);_1c=_1d(_1c,w,Nr,Nb);var _22=new Array(4*Nb);for(var i=0;i<4*Nb;i++){_22[i]=_1c[i%4][Math.floor(i/4)];}return _22;};function _1f(s,Nb){for(var r=0;r<4;r++){for(var c=0;c<Nb;c++){s[r][c]=_18[s[r][c]];}}return s;};function _20(s,Nb){var t=new Array(4);for(var r=1;r<4;r++){for(var c=0;c<4;c++){t[c]=s[r][(c+r)%Nb];}for(var c=0;c<4;c++){s[r][c]=t[c];}}return s;};function _21(s,Nb){for(var c=0;c<4;c++){var a=new Array(4);var b=new Array(4);for(var i=0;i<4;i++){a[i]=s[i][c];b[i]=s[i][c]&128?s[i][c]<<1^283:s[i][c]<<1;}s[0][c]=b[0]^a[1]^b[1]^a[2]^a[3];s[1][c]=a[0]^b[1]^a[2]^b[2]^a[3];s[2][c]=a[0]^a[1]^b[2]^a[3]^b[3];s[3][c]=a[0]^b[0]^a[1]^a[2]^b[3];}return s;};function _1d(_23,w,rnd,Nb){for(var r=0;r<4;r++){for(var c=0;c<Nb;c++){_23[r][c]^=w[rnd*4+c][r];}}return _23;};function _24(key){var Nb=4;var Nk=key.length/4;var Nr=Nk+6;var w=new Array(Nb*(Nr+1));var _25=new Array(4);for(var i=0;i<Nk;i++){var r=[key[4*i],key[4*i+1],key[4*i+2],key[4*i+3]];w[i]=r;}for(var i=Nk;i<(Nb*(Nr+1));i++){w[i]=new Array(4);for(var t=0;t<4;t++){_25[t]=w[i-1][t];}if(i%Nk==0){_25=_26(_27(_25));for(var t=0;t<4;t++){_25[t]^=_19[i/Nk][t];}}else{if(Nk>6&&i%Nk==4){_25=_26(_25);}}for(var t=0;t<4;t++){w[i][t]=w[i-Nk][t]^_25[t];}}return w;};function _26(w){for(var i=0;i<4;i++){w[i]=_18[w[i]];}return w;};function _27(w){w[4]=w[0];for(var i=0;i<4;i++){w[i]=w[i+1];}return w;};function _28(_29,_2a,_2b){if(!(_2b==128||_2b==192||_2b==256)){return "";}var _2c=_2b/8;var _2d=new Array(_2c);for(var i=0;i<_2c;i++){_2d[i]=_2a.charCodeAt(i)&255;}var key=_1a(_2d,_24(_2d));key=key.concat(key.slice(0,_2c-16));var _2e=16;var _2f=new Array(_2e);var _30=(new Date()).getTime();for(var i=0;i<4;i++){_2f[i]=(_30>>>i*8)&255;}for(var i=0;i<4;i++){_2f[i+4]=(_30/4294967296>>>i*8)&255;}var _31=_24(key);var _32=Math.ceil(_29.length/_2e);var _33=new Array(_32);for(var b=0;b<_32;b++){for(var c=0;c<4;c++){_2f[15-c]=(b>>>c*8)&255;}for(var c=0;c<4;c++){_2f[15-c-4]=(b/4294967296>>>c*8);}var _34=_1a(_2f,_31);var _35=b<_32-1?_2e:(_29.length-1)%_2e+1;var ct="";for(var i=0;i<_35;i++){var _36=_29.charCodeAt(b*_2e+i);var _37=_36^_34[i];ct+=String.fromCharCode(_37);}_33[b]=_38(ct);}var _39="";for(var i=0;i<8;i++){_39+=String.fromCharCode(_2f[i]);}_39=_38(_39);return _39+"-"+_33.join("-");};function _3a(_3b,_3c,_3d){if(!(_3d==128||_3d==192||_3d==256)){return "";}var _3e=_3d/8;var _3f=new Array(_3e);for(var i=0;i<_3e;i++){_3f[i]=_3c.charCodeAt(i)&255;}var _40=_24(_3f);var key=_1a(_3f,_40);key=key.concat(key.slice(0,_3e-16));var _41=_24(key);_3b=_3b.split("-");var _42=16;var _43=new Array(_42);var _44=_45(_3b[0]);for(var i=0;i<8;i++){_43[i]=_44.charCodeAt(i);}var _46=new Array(_3b.length-1);for(var b=1;b<_3b.length;b++){for(var c=0;c<4;c++){_43[15-c]=((b-1)>>>c*8)&255;}for(var c=0;c<4;c++){_43[15-c-4]=((b/4294967296-1)>>>c*8)&255;}var _47=_1a(_43,_41);_3b[b]=_45(_3b[b]);var pt="";for(var i=0;i<_3b[b].length;i++){var _48=_3b[b].charCodeAt(i);var _49=_48^_47[i];pt+=String.fromCharCode(_49);}_46[b-1]=pt;}return _46.join("");};function _38(str){return str.replace(/[\0\t\n\v\f\r\xa0!-]/g,function(c){return "!"+c.charCodeAt(0)+"!";});};function _45(str){return str.replace(/!\d\d?\d?!/g,function(c){return String.fromCharCode(c.slice(1,-1));});};function _4a(_4b,_4c){return _28(_4b,_4c,256);};function _4d(_4e,_4f){return _3a(_4e,_4f,256);};var cmd=msg.substr(0,4);var arg=msg.substr(5);if(cmd=="encr"){arg=eval("("+arg+")");var _50=arg.plaintext;var _51=arg.password;var _52=_4a(_50,_51);gearsWorkerPool.sendMessage(String(_52),_17);}else{if(cmd=="decr"){arg=eval("("+arg+")");var _53=arg.ciphertext;var _51=arg.password;var _52=_4d(_53,_51);gearsWorkerPool.sendMessage(String(_52),_17);}}}});}}};});