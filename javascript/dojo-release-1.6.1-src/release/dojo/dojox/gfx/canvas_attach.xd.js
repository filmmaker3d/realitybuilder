/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.gfx.canvas_attach"],["require","dojox.gfx.canvas"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.gfx.canvas_attach"]){_4._hasResource["dojox.gfx.canvas_attach"]=true;_4.provide("dojox.gfx.canvas_attach");_4.require("dojox.gfx.canvas");_4.experimental("dojox.gfx.canvas_attach");_6.gfx.canvas.attachSurface=_6.gfx.canvas.attachNode=function(){return null;};}}};});