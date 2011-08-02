/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojo._base.declare"],["require","dojo._base.lang"],["require","dojo._base.array"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojo._base.declare"]){_4._hasResource["dojo._base.declare"]=true;_4.provide("dojo._base.declare");_4.require("dojo._base.lang");_4.require("dojo._base.array");(function(){var d=_4,_7=d._mixin,op=Object.prototype,_8=op.toString,_9=new Function,_a=0,_b="constructor";function _c(_d,_e){throw new Error("declare"+(_e?" "+_e:"")+": "+_d);};function _f(_10,_11){var _12=[],_13=[{cls:0,refs:[]}],_14={},_15=1,l=_10.length,i=0,j,lin,_16,top,_17,rec,_18,_19;for(;i<l;++i){_16=_10[i];if(!_16){_c("mixin #"+i+" is unknown. Did you use dojo.require to pull it in?",_11);}else{if(_8.call(_16)!="[object Function]"){_c("mixin #"+i+" is not a callable constructor.",_11);}}lin=_16._meta?_16._meta.bases:[_16];top=0;for(j=lin.length-1;j>=0;--j){_17=lin[j].prototype;if(!_17.hasOwnProperty("declaredClass")){_17.declaredClass="uniqName_"+(_a++);}_18=_17.declaredClass;if(!_14.hasOwnProperty(_18)){_14[_18]={count:0,refs:[],cls:lin[j]};++_15;}rec=_14[_18];if(top&&top!==rec){rec.refs.push(top);++top.count;}top=rec;}++top.count;_13[0].refs.push(top);}while(_13.length){top=_13.pop();_12.push(top.cls);--_15;while(_19=top.refs,_19.length==1){top=_19[0];if(!top||--top.count){top=0;break;}_12.push(top.cls);--_15;}if(top){for(i=0,l=_19.length;i<l;++i){top=_19[i];if(!--top.count){_13.push(top);}}}}if(_15){_c("can't build consistent linearization",_11);}_16=_10[0];_12[0]=_16?_16._meta&&_16===_12[_12.length-_16._meta.bases.length]?_16._meta.bases.length:1:0;return _12;};function _1a(_1b,a,f){var _1c,_1d,_1e,_1f,_20,_21,_22,opf,pos,_23=this._inherited=this._inherited||{};if(typeof _1b=="string"){_1c=_1b;_1b=a;a=f;}f=0;_1f=_1b.callee;_1c=_1c||_1f.nom;if(!_1c){_c("can't deduce a name to call inherited()",this.declaredClass);}_20=this.constructor._meta;_1e=_20.bases;pos=_23.p;if(_1c!=_b){if(_23.c!==_1f){pos=0;_21=_1e[0];_20=_21._meta;if(_20.hidden[_1c]!==_1f){_1d=_20.chains;if(_1d&&typeof _1d[_1c]=="string"){_c("calling chained method with inherited: "+_1c,this.declaredClass);}do{_20=_21._meta;_22=_21.prototype;if(_20&&(_22[_1c]===_1f&&_22.hasOwnProperty(_1c)||_20.hidden[_1c]===_1f)){break;}}while(_21=_1e[++pos]);pos=_21?pos:-1;}}_21=_1e[++pos];if(_21){_22=_21.prototype;if(_21._meta&&_22.hasOwnProperty(_1c)){f=_22[_1c];}else{opf=op[_1c];do{_22=_21.prototype;f=_22[_1c];if(f&&(_21._meta?_22.hasOwnProperty(_1c):f!==opf)){break;}}while(_21=_1e[++pos]);}}f=_21&&f||op[_1c];}else{if(_23.c!==_1f){pos=0;_20=_1e[0]._meta;if(_20&&_20.ctor!==_1f){_1d=_20.chains;if(!_1d||_1d.constructor!=="manual"){_c("calling chained constructor with inherited",this.declaredClass);}while(_21=_1e[++pos]){_20=_21._meta;if(_20&&_20.ctor===_1f){break;}}pos=_21?pos:-1;}}while(_21=_1e[++pos]){_20=_21._meta;f=_20?_20.ctor:_21;if(f){break;}}f=_21&&f;}_23.c=f;_23.p=pos;if(f){return a===true?f:f.apply(this,a||_1b);}};function _24(_25,_26){if(typeof _25=="string"){return this.inherited(_25,_26,true);}return this.inherited(_25,true);};function _27(cls){var _28=this.constructor._meta.bases;for(var i=0,l=_28.length;i<l;++i){if(_28[i]===cls){return true;}}return this instanceof cls;};function _29(_2a,_2b){var _2c,i=0,l=d._extraNames.length;for(_2c in _2b){if(_2c!=_b&&_2b.hasOwnProperty(_2c)){_2a[_2c]=_2b[_2c];}}for(;i<l;++i){_2c=d._extraNames[i];if(_2c!=_b&&_2b.hasOwnProperty(_2c)){_2a[_2c]=_2b[_2c];}}};function _2d(_2e,_2f){var _30,t,i=0,l=d._extraNames.length;for(_30 in _2f){t=_2f[_30];if((t!==op[_30]||!(_30 in op))&&_30!=_b){if(_8.call(t)=="[object Function]"){t.nom=_30;}_2e[_30]=t;}}for(;i<l;++i){_30=d._extraNames[i];t=_2f[_30];if((t!==op[_30]||!(_30 in op))&&_30!=_b){if(_8.call(t)=="[object Function]"){t.nom=_30;}_2e[_30]=t;}}return _2e;};function _31(_32){_2d(this.prototype,_32);return this;};function _33(_34,_35){return function(){var a=arguments,_36=a,a0=a[0],f,i,m,l=_34.length,_37;if(!(this instanceof a.callee)){return _38(a);}if(_35&&(a0&&a0.preamble||this.preamble)){_37=new Array(_34.length);_37[0]=a;for(i=0;;){a0=a[0];if(a0){f=a0.preamble;if(f){a=f.apply(this,a)||a;}}f=_34[i].prototype;f=f.hasOwnProperty("preamble")&&f.preamble;if(f){a=f.apply(this,a)||a;}if(++i==l){break;}_37[i]=a;}}for(i=l-1;i>=0;--i){f=_34[i];m=f._meta;f=m?m.ctor:f;if(f){f.apply(this,_37?_37[i]:a);}}f=this.postscript;if(f){f.apply(this,_36);}};};function _39(_3a,_3b){return function(){var a=arguments,t=a,a0=a[0],f;if(!(this instanceof a.callee)){return _38(a);}if(_3b){if(a0){f=a0.preamble;if(f){t=f.apply(this,t)||t;}}f=this.preamble;if(f){f.apply(this,t);}}if(_3a){_3a.apply(this,a);}f=this.postscript;if(f){f.apply(this,a);}};};function _3c(_3d){return function(){var a=arguments,i=0,f,m;if(!(this instanceof a.callee)){return _38(a);}for(;f=_3d[i];++i){m=f._meta;f=m?m.ctor:f;if(f){f.apply(this,a);break;}}f=this.postscript;if(f){f.apply(this,a);}};};function _3e(_3f,_40,_41){return function(){var b,m,f,i=0,_42=1;if(_41){i=_40.length-1;_42=-1;}for(;b=_40[i];i+=_42){m=b._meta;f=(m?m.hidden:b.prototype)[_3f];if(f){f.apply(this,arguments);}}};};function _43(_44){_9.prototype=_44.prototype;var t=new _9;_9.prototype=null;return t;};function _38(_45){var _46=_45.callee,t=_43(_46);_46.apply(t,_45);return t;};d.declare=function(_47,_48,_49){if(typeof _47!="string"){_49=_48;_48=_47;_47="";}_49=_49||{};var _4a,i,t,_4b,_4c,_4d,_4e,_4f=1,_50=_48;if(_8.call(_48)=="[object Array]"){_4d=_f(_48,_47);t=_4d[0];_4f=_4d.length-t;_48=_4d[_4f];}else{_4d=[0];if(_48){if(_8.call(_48)=="[object Function]"){t=_48._meta;_4d=_4d.concat(t?t.bases:_48);}else{_c("base class is not a callable constructor.",_47);}}else{if(_48!==null){_c("unknown base class. Did you use dojo.require to pull it in?",_47);}}}if(_48){for(i=_4f-1;;--i){_4a=_43(_48);if(!i){break;}t=_4d[i];(t._meta?_29:_7)(_4a,t.prototype);_4b=new Function;_4b.superclass=_48;_4b.prototype=_4a;_48=_4a.constructor=_4b;}}else{_4a={};}_2d(_4a,_49);t=_49.constructor;if(t!==op.constructor){t.nom=_b;_4a.constructor=t;}for(i=_4f-1;i;--i){t=_4d[i]._meta;if(t&&t.chains){_4e=_7(_4e||{},t.chains);}}if(_4a["-chains-"]){_4e=_7(_4e||{},_4a["-chains-"]);}t=!_4e||!_4e.hasOwnProperty(_b);_4d[0]=_4b=(_4e&&_4e.constructor==="manual")?_3c(_4d):(_4d.length==1?_39(_49.constructor,t):_33(_4d,t));_4b._meta={bases:_4d,hidden:_49,chains:_4e,parents:_50,ctor:_49.constructor};_4b.superclass=_48&&_48.prototype;_4b.extend=_31;_4b.prototype=_4a;_4a.constructor=_4b;_4a.getInherited=_24;_4a.inherited=_1a;_4a.isInstanceOf=_27;if(_47){_4a.declaredClass=_47;d.setObject(_47,_4b);}if(_4e){for(_4c in _4e){if(_4a[_4c]&&typeof _4e[_4c]=="string"&&_4c!=_b){t=_4a[_4c]=_3e(_4c,_4d,_4e[_4c]==="after");t.nom=_4c;}}}return _4b;};d.safeMixin=_2d;})();}}};});