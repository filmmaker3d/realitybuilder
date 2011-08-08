/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.mobile._ScrollableMixin"],["require","dijit._WidgetBase"],["require","dojox.mobile.scrollable"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.mobile._ScrollableMixin"]){_4._hasResource["dojox.mobile._ScrollableMixin"]=true;_4.provide("dojox.mobile._ScrollableMixin");_4.require("dijit._WidgetBase");_4.require("dojox.mobile.scrollable");_4.declare("dojox.mobile._ScrollableMixin",null,{fixedHeader:"",fixedFooter:"",destroy:function(){this.cleanup();this.inherited(arguments);},startup:function(){var _7={};if(this.fixedHeader){_7.fixedHeaderHeight=_4.byId(this.fixedHeader).offsetHeight;}if(this.fixedFooter){var _8=_4.byId(this.fixedFooter);if(_8.parentNode==this.domNode){this.isLocalFooter=true;_8.style.bottom="0px";}_7.fixedFooterHeight=_8.offsetHeight;}this.init(_7);this.inherited(arguments);}});(function(){var _9=new _6.mobile.scrollable();_4.extend(_6.mobile._ScrollableMixin,_9);if(_4.version.major==1&&_4.version.minor==4){_4.mixin(_6.mobile._ScrollableMixin._meta.hidden,_9);}})();}}};});