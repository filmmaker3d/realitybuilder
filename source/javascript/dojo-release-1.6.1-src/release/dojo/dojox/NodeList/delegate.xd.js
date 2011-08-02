/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.NodeList.delegate"],["require","dojo.NodeList-traverse"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.NodeList.delegate"]){_4._hasResource["dojox.NodeList.delegate"]=true;_4.provide("dojox.NodeList.delegate");_4.require("dojo.NodeList-traverse");_4.extend(_4.NodeList,{delegate:function(_7,_8,fn){return this.connect(_8,function(_9){var _a=_4.query(_9.target).closest(_7,this);if(_a.length){fn.call(_a[0],_9);}});}});}}};});