/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["realitybuilder.Image"]){dojo._hasResource["realitybuilder.Image"]=true;dojo.provide("realitybuilder.Image");dojo.declare("realitybuilder.Image",null,{_versionOnServer:"-1",_url:"",_updateIntervalServer:5,_node:null,_onloadHandle:null,_imageLoaded:false,constructor:function(_1){this._node=dojo.byId("live");this._node.style.width=_1.sensor().width()+"px";this._node.style.height=_1.sensor().height()+"px";this._onloadHandle=dojo.connect(this._node,"onload",this,this._onFirstImageLoad);},imageLoaded:function(){return this._imageLoaded;},versionOnServer:function(){return this._versionOnServer;},url:function(){return this._url;},updateIntervalServer:function(){return this._updateIntervalServer;},updateWithServerData:function(_2){this._versionOnServer=_2.version;this._updateIntervalServer=_2.updateIntervalServer;this._url=_2.url;dojo.publish("realitybuilder/Image/changed");},_onFirstImageLoad:function(){this._imageLoaded=true;dojo.disconnect(this._onloadHandle);},update:function(){this._node.src="/images/live.jpg?nocache="+Math.random().toString();}});}