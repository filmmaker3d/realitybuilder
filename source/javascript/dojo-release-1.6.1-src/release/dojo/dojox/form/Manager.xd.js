/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.form.Manager"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dojox.form.manager._Mixin"],["require","dojox.form.manager._NodeMixin"],["require","dojox.form.manager._FormMixin"],["require","dojox.form.manager._ValueMixin"],["require","dojox.form.manager._EnableMixin"],["require","dojox.form.manager._DisplayMixin"],["require","dojox.form.manager._ClassMixin"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.form.Manager"]){_4._hasResource["dojox.form.Manager"]=true;_4.provide("dojox.form.Manager");_4.require("dijit._Widget");_4.require("dijit._Templated");_4.require("dojox.form.manager._Mixin");_4.require("dojox.form.manager._NodeMixin");_4.require("dojox.form.manager._FormMixin");_4.require("dojox.form.manager._ValueMixin");_4.require("dojox.form.manager._EnableMixin");_4.require("dojox.form.manager._DisplayMixin");_4.require("dojox.form.manager._ClassMixin");_4.declare("dojox.form.Manager",[_5._Widget,_6.form.manager._Mixin,_6.form.manager._NodeMixin,_6.form.manager._FormMixin,_6.form.manager._ValueMixin,_6.form.manager._EnableMixin,_6.form.manager._DisplayMixin,_6.form.manager._ClassMixin],{buildRendering:function(){var _7=this.domNode=this.srcNodeRef;if(!this.containerNode){this.containerNode=_7;}this._attachPoints=[];_5._Templated.prototype._attachTemplateNodes.call(this,_7);},destroyRendering:function(){_5._Templated.prototype.destroyRendering.call(this);}});}}};});