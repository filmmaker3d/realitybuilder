/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.av.widget.Player"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.av.widget.Player"]){_4._hasResource["dojox.av.widget.Player"]=true;_4.provide("dojox.av.widget.Player");_4.require("dijit._Widget");_4.require("dijit._Templated");_4.declare("dojox.av.widget.Player",[_5._Widget,_5._Templated],{playerWidth:"480px",widgetsInTemplate:true,templateString:_4.cache("dojox.av.widget","resources/Player.html","<div class=\"playerContainer\">\r\n\t<div class=\"PlayerScreen\" dojoAttachPoint=\"playerScreen\"></div>\r\n\t<table class=\"Controls\">\r\n\t\t<tr>\r\n\t\t\t<td colspan=\"2\" dojoAttachPoint=\"progressContainer\"></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td class=\"PlayContainer\" dojoAttachPoint=\"playContainer\"></td>\r\n\t\t\t<td class=\"ControlsRight\">\r\n\t\t\t<table class=\"StatusContainer\">\r\n\t\t\t\t<tr dojoAttachPoint=\"statusContainer\">\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td colspan=\"3\" class=\"ControlsBottom\" dojoAttachPoint=\"controlsBottom\"></td>\r\n\t\t\t\t</tr>\r\n\t\t\t</table>\r\n\t\t</td>\r\n\t\t</tr>\r\n\t</table>\r\n</div>\r\n"),_fillContent:function(){if(!this.items&&this.srcNodeRef){this.items=[];var _7=_4.query("*",this.srcNodeRef);_4.forEach(_7,function(n){this.items.push(n);},this);}},postCreate:function(){_4.style(this.domNode,"width",this.playerWidth+(_4.isString(this.playerWidth)?"":"px"));if(_4.isString(this.playerWidth)&&this.playerWidth.indexOf("%")){_4.connect(window,"resize",this,"onResize");}this.children=[];var _8;_4.forEach(this.items,function(n,i){n.id=_5.getUniqueId("player_control");switch(_4.attr(n,"controlType")){case "play":this.playContainer.appendChild(n);break;case "volume":this.controlsBottom.appendChild(n);break;case "status":this.statusContainer.appendChild(n);break;case "progress":case "slider":this.progressContainer.appendChild(n);break;case "video":this.mediaNode=n;this.playerScreen.appendChild(n);break;default:}this.items[i]=n.id;},this);},startup:function(){this.media=_5.byId(this.mediaNode.id);if(!_4.isAIR){_4.style(this.media.domNode,"width","100%");_4.style(this.media.domNode,"height","100%");}_4.forEach(this.items,function(id){if(id!==this.mediaNode.id){var _9=_5.byId(id);this.children.push(_9);if(_9){_9.setMedia(this.media,this);}}},this);},onResize:function(_a){var _b=_4.marginBox(this.domNode);if(this.media&&this.media.onResize!==null){this.media.onResize(_b);}_4.forEach(this.children,function(_c){if(_c.onResize){_c.onResize(_b);}});}});}}};});