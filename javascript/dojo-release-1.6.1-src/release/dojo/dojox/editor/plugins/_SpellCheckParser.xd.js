/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.editor.plugins._SpellCheckParser"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.editor.plugins._SpellCheckParser"]){_4._hasResource["dojox.editor.plugins._SpellCheckParser"]=true;_4.provide("dojox.editor.plugins._SpellCheckParser");_4.declare("dojox.editor.plugins._SpellCheckParser",null,{lang:"english",parseIntoWords:function(_7){function _8(c){var ch=c.charCodeAt(0);return 48<=ch&&ch<=57||65<=ch&&ch<=90||97<=ch&&ch<=122;};var _9=this.words=[],_a=this.indices=[],_b=0,_c=_7&&_7.length,_d=0;while(_b<_c){var ch;while(_b<_c&&!_8(ch=_7.charAt(_b))&&ch!="&"){_b++;}if(ch=="&"){while(++_b<_c&&(ch=_7.charAt(_b))!=";"&&_8(ch)){}}else{_d=_b;while(++_b<_c&&_8(_7.charAt(_b))){}if(_d<_c){_9.push(_7.substring(_d,_b));_a.push(_d);}}}return _9;},getIndices:function(){return this.indices;}});_4.subscribe(_5._scopeName+".Editor.plugin.SpellCheck.getParser",null,function(sp){if(sp.parser){return;}sp.parser=new _6.editor.plugins._SpellCheckParser();});}}};});