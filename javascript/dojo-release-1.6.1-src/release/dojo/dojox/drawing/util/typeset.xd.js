/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.drawing.util.typeset"],["require","dojox.drawing.library.greek"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.drawing.util.typeset"]){_4._hasResource["dojox.drawing.util.typeset"]=true;_4.provide("dojox.drawing.util.typeset");_4.require("dojox.drawing.library.greek");(function(){var _7=_6.drawing.library.greek;_6.drawing.util.typeset={convertHTML:function(_8){if(_8){return _8.replace(/&([^;]+);/g,function(_9,_a){if(_a.charAt(0)=="#"){var _b=+_a.substr(1);if(!isNaN(_b)){return String.fromCharCode(_b);}}else{if(_7[_a]){return String.fromCharCode(_7[_a]);}}console.warn("no HTML conversion for ",_9);return _9;});}return _8;},convertLaTeX:function(_c){if(_c){return _c.replace(/\\([a-zA-Z]+)/g,function(_d,_e){if(_7[_e]){return String.fromCharCode(_7[_e]);}else{if(_e.substr(0,2)=="mu"){return String.fromCharCode(_7["mu"])+_e.substr(2);}else{if(_e.substr(0,5)=="theta"){return String.fromCharCode(_7["theta"])+_e.substr(5);}else{if(_e.substr(0,3)=="phi"){return String.fromCharCode(_7["phi"])+_e.substr(3);}}}}console.log("no match for ",_d," in ",_c);console.log("Need user-friendly error handling here!");}).replace(/\\\\/g,"\\");}return _c;}};})();}}};});