/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.form.uploader.plugins.IFrame"],["require","dojox.form.uploader.plugins.HTML5"],["require","dojo.io.iframe"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.form.uploader.plugins.IFrame"]){_4._hasResource["dojox.form.uploader.plugins.IFrame"]=true;_4.provide("dojox.form.uploader.plugins.IFrame");_4.require("dojox.form.uploader.plugins.HTML5");_4.require("dojo.io.iframe");_4.declare("dojox.form.uploader.plugins.IFrame",[],{force:"",postMixInProperties:function(){this.inherited(arguments);if(!this.supports("multiple")){this.uploadType="iframe";}},upload:function(_7){if(!this.supports("multiple")||this.force=="iframe"){this.uploadIFrame(_7);_4.stopEvent(_7);return;}},uploadIFrame:function(){var _8=this.getUrl();var _9=_4.io.iframe.send({url:this.getUrl(),form:this.form,handleAs:"json",error:_4.hitch(this,function(_a){console.error("HTML Upload Error:"+_a.message);}),load:_4.hitch(this,function(_b,_c,_d){this.onComplete(_b);})});}});_6.form.addUploaderPlugin(_6.form.uploader.plugins.IFrame);}}};});