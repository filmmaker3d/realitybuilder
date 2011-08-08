/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.gfx.attach"],["require","dojox.gfx"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.gfx.attach"]){_4._hasResource["dojox.gfx.attach"]=true;_4.provide("dojox.gfx.attach");_4.require("dojox.gfx");(function(){var r=_6.gfx.svg.attach[_6.gfx.renderer];_4.gfx.attachSurface=r.attachSurface;_4.gfx.attachNode=r.attachNode;})();}}};});