/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","realitybuilder.Image"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["realitybuilder.Image"]){_4._hasResource["realitybuilder.Image"]=true;_4.provide("realitybuilder.Image");_4.declare("realitybuilder.Image",null,{_versionOnServer:"-1",_url:"",_updateIntervalServer:5,_node:null,_onloadHandle:null,_imageLoaded:false,constructor:function(_7){this._node=_4.byId("live");this._node.style.width=_7.sensor().width()+"px";this._node.style.height=_7.sensor().height()+"px";this._onloadHandle=_4.connect(this._node,"onload",this,this._onFirstImageLoad);},imageLoaded:function(){return this._imageLoaded;},versionOnServer:function(){return this._versionOnServer;},url:function(){return this._url;},updateIntervalServer:function(){return this._updateIntervalServer;},updateWithServerData:function(_8){this._versionOnServer=_8.version;this._updateIntervalServer=_8.updateIntervalServer;this._url=_8.url;_4.publish("realitybuilder/Image/changed");},_onFirstImageLoad:function(){this._imageLoaded=true;_4.disconnect(this._onloadHandle);},update:function(){this._node.src="/images/live.jpg?nocache="+Math.random().toString();}});}}};});