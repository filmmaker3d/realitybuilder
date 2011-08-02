/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.layout.dnd.PlottedDnd"],["require","dojo.dnd.Source"],["require","dojo.dnd.Manager"],["require","dojox.layout.dnd.Avatar"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.layout.dnd.PlottedDnd"]){_4._hasResource["dojox.layout.dnd.PlottedDnd"]=true;_4.provide("dojox.layout.dnd.PlottedDnd");_4.require("dojo.dnd.Source");_4.require("dojo.dnd.Manager");_4.require("dojox.layout.dnd.Avatar");_4.declare("dojox.layout.dnd.PlottedDnd",[_4.dnd.Source],{GC_OFFSET_X:_4.dnd.manager().OFFSET_X,GC_OFFSET_Y:_4.dnd.manager().OFFSET_Y,constructor:function(_7,_8){this.childBoxes=null;this.dropIndicator=new _6.layout.dnd.DropIndicator("dndDropIndicator","div");this.withHandles=_8.withHandles;this.handleClasses=_8.handleClasses;this.opacity=_8.opacity;this.allowAutoScroll=_8.allowAutoScroll;this.dom=_8.dom;this.singular=true;this.skipForm=true;this._over=false;this.defaultHandleClass="GcDndHandle";this.isDropped=false;this._timer=null;this.isOffset=(_8.isOffset)?true:false;this.offsetDrag=(_8.offsetDrag)?_8.offsetDrag:{x:0,y:0};this.hideSource=_8.hideSource?_8.hideSource:true;this._drop=this.dropIndicator.create();},_calculateCoords:function(_9){_4.forEach(this.node.childNodes,function(_a){var c=_4.coords(_a,true);_a.coords={xy:c,w:_a.offsetWidth/2,h:_a.offsetHeight/2,mw:c.w};if(_9){_a.coords.mh=c.h;}},this);},_legalMouseDown:function(e){if(!this.withHandles){return true;}for(var _b=(e.target);_b&&_b!=this.node;_b=_b.parentNode){if(_4.hasClass(_b,this.defaultHandleClass)){return true;}}return false;},setDndItemSelectable:function(_c,_d){for(var _e=_c;_e&&_c!=this.node;_e=_e.parentNode){if(_4.hasClass(_e,"dojoDndItem")){_4.setSelectable(_e,_d);return;}}},getDraggedWidget:function(_f){var _10=_f;while(_10&&_10.nodeName.toLowerCase()!="body"&&!_4.hasClass(_10,"dojoDndItem")){_10=_10.parentNode;}return (_10)?_5.byNode(_10):null;},isAccepted:function(_11){var _12=(_11)?_11.getAttribute("dndtype"):null;return (_12&&_12 in this.accept);},onDndStart:function(_13,_14,_15){this.firstIndicator=(_13==this);this._calculateCoords(true);var m=_4.dnd.manager();if(_14[0].coords){this._drop.style.height=_14[0].coords.mh+"px";_4.style(m.avatar.node,"width",_14[0].coords.mw+"px");}else{this._drop.style.height=m.avatar.node.clientHeight+"px";}this.dndNodes=_14;_6.layout.dnd.PlottedDnd.superclass.onDndStart.call(this,_13,_14,_15);if(_13==this&&this.hideSource){_4.forEach(_14,function(n){_4.style(n,"display","none");});}},onDndCancel:function(){var m=_4.dnd.manager();if(m.source==this&&this.hideSource){var _16=this.getSelectedNodes();_4.forEach(_16,function(n){_4.style(n,"display","");});}_6.layout.dnd.PlottedDnd.superclass.onDndCancel.call(this);this.deleteDashedZone();},onDndDrop:function(_17,_18,_19,_1a){try{if(!this.isAccepted(_18[0])){this.onDndCancel();}else{if(_17==this&&this._over&&this.dropObject){this.current=this.dropObject.c;}_6.layout.dnd.PlottedDnd.superclass.onDndDrop.call(this,_17,_18,_19,_1a);this._calculateCoords(true);}}catch(e){console.warn(e);}},onMouseDown:function(e){if(this.current==null){this.selection={};}else{if(this.current==this.anchor){this.anchor=null;}}if(this.current!==null){var c=_4.coords(this.current,true);this.current.coords={xy:c,w:this.current.offsetWidth/2,h:this.current.offsetHeight/2,mh:c.h,mw:c.w};this._drop.style.height=this.current.coords.mh+"px";if(this.isOffset){if(this.offsetDrag.x==0&&this.offsetDrag.y==0){var _1b=true;var _1c=_4.coords(this._getChildByEvent(e));this.offsetDrag.x=_1c.x-e.pageX;this.offsetDrag.y=_1c.y-e.clientY;}if(this.offsetDrag.y<16&&this.current!=null){this.offsetDrag.y=this.GC_OFFSET_Y;}var m=_4.dnd.manager();m.OFFSET_X=this.offsetDrag.x;m.OFFSET_Y=this.offsetDrag.y;if(_1b){this.offsetDrag.x=0;this.offsetDrag.y=0;}}}if(_4.dnd.isFormElement(e)){this.setDndItemSelectable(e.target,true);}else{this.containerSource=true;var _1d=this.getDraggedWidget(e.target);if(_1d&&_1d.dragRestriction){}else{_6.layout.dnd.PlottedDnd.superclass.onMouseDown.call(this,e);}}},onMouseUp:function(e){_6.layout.dnd.PlottedDnd.superclass.onMouseUp.call(this,e);this.containerSource=false;if(!_4.isIE&&this.mouseDown){this.setDndItemSelectable(e.target,true);}var m=_4.dnd.manager();m.OFFSET_X=this.GC_OFFSET_X;m.OFFSET_Y=this.GC_OFFSET_Y;},onMouseMove:function(e){var m=_4.dnd.manager();if(this.isDragging){var _1e=false;if(this.current!=null||(this.current==null&&!this.dropObject)){if(this.isAccepted(m.nodes[0])||this.containerSource){_1e=this.setIndicatorPosition(e);}}if(this.current!=this.targetAnchor||_1e!=this.before){this._markTargetAnchor(_1e);m.canDrop(!this.current||m.source!=this||!(this.current.id in this.selection));}if(this.allowAutoScroll){this._checkAutoScroll(e);}}else{if(this.mouseDown&&this.isSource){var _1f=this.getSelectedNodes();if(_1f.length){m.startDrag(this,_1f,this.copyState(_4.isCopyKey(e)));}}if(this.allowAutoScroll){this._stopAutoScroll();}}},_markTargetAnchor:function(_20){if(this.current==this.targetAnchor&&this.before==_20){return;}this.targetAnchor=this.current;this.targetBox=null;this.before=_20;},_unmarkTargetAnchor:function(){if(!this.targetAnchor){return;}this.targetAnchor=null;this.targetBox=null;this.before=true;},setIndicatorPosition:function(e){var _21=false;if(this.current){if(!this.current.coords||this.allowAutoScroll){this.current.coords={xy:_4.coords(this.current,true),w:this.current.offsetWidth/2,h:this.current.offsetHeight/2};}_21=this.horizontal?(e.pageX-this.current.coords.xy.x)<this.current.coords.w:(e.pageY-this.current.coords.xy.y)<this.current.coords.h;this.insertDashedZone(_21);}else{if(!this.dropObject){this.insertDashedZone(false);}}return _21;},onOverEvent:function(){this._over=true;_6.layout.dnd.PlottedDnd.superclass.onOverEvent.call(this);if(this.isDragging){var m=_4.dnd.manager();if(!this.current&&!this.dropObject&&this.getSelectedNodes()[0]&&this.isAccepted(m.nodes[0])){this.insertDashedZone(false);}}},onOutEvent:function(){this._over=false;this.containerSource=false;_6.layout.dnd.PlottedDnd.superclass.onOutEvent.call(this);if(this.dropObject){this.deleteDashedZone();}},deleteDashedZone:function(){this._drop.style.display="none";var _22=this._drop.nextSibling;while(_22!=null){_22.coords.xy.y-=parseInt(this._drop.style.height);_22=_22.nextSibling;}delete this.dropObject;},insertDashedZone:function(_23){if(this.dropObject){if(_23==this.dropObject.b&&((this.current&&this.dropObject.c==this.current.id)||(!this.current&&!this.dropObject.c))){return;}else{this.deleteDashedZone();}}this.dropObject={n:this._drop,c:this.current?this.current.id:null,b:_23};if(this.current){_4.place(this._drop,this.current,_23?"before":"after");if(!this.firstIndicator){var _24=this._drop.nextSibling;while(_24!=null){_24.coords.xy.y+=parseInt(this._drop.style.height);_24=_24.nextSibling;}}else{this.firstIndicator=false;}}else{this.node.appendChild(this._drop);}this._drop.style.display="";},insertNodes:function(_25,_26,_27,_28){if(this.dropObject){_4.style(this.dropObject.n,"display","none");_6.layout.dnd.PlottedDnd.superclass.insertNodes.call(this,true,_26,true,this.dropObject.n);this.deleteDashedZone();}else{return _6.layout.dnd.PlottedDnd.superclass.insertNodes.call(this,_25,_26,_27,_28);}var _29=_5.byId(_26[0].getAttribute("widgetId"));if(_29){_6.layout.dnd._setGcDndHandle(_29,this.withHandles,this.handleClasses);if(this.hideSource){_4.style(_29.domNode,"display","");}}},_checkAutoScroll:function(e){if(this._timer){clearTimeout(this._timer);}this._stopAutoScroll();var _2a=this.dom,y=this._sumAncestorProperties(_2a,"offsetTop");if((e.pageY-_2a.offsetTop+30)>_2a.clientHeight){this.autoScrollActive=true;this._autoScrollDown(_2a);}else{if((_2a.scrollTop>0)&&(e.pageY-y)<30){this.autoScrollActive=true;this._autoScrollUp(_2a);}}},_autoScrollUp:function(_2b){if(this.autoScrollActive&&_2b.scrollTop>0){_2b.scrollTop-=30;this._timer=setTimeout(_4.hitch(this,"_autoScrollUp",_2b),100);}},_autoScrollDown:function(_2c){if(this.autoScrollActive&&(_2c.scrollTop<(_2c.scrollHeight-_2c.clientHeight))){_2c.scrollTop+=30;this._timer=setTimeout(_4.hitch(this,"_autoScrollDown",_2c),100);}},_stopAutoScroll:function(){this.autoScrollActive=false;},_sumAncestorProperties:function(_2d,_2e){_2d=_4.byId(_2d);if(!_2d){return 0;}var _2f=0;while(_2d){var val=_2d[_2e];if(val){_2f+=val-0;if(_2d==_4.body()){break;}}_2d=_2d.parentNode;}return _2f;}});_6.layout.dnd._setGcDndHandle=function(_30,_31,_32,_33){var cls="GcDndHandle";if(!_33){_4.query(".GcDndHandle",_30.domNode).removeClass(cls);}if(!_31){_4.addClass(_30.domNode,cls);}else{var _34=false;for(var i=_32.length-1;i>=0;i--){var _35=_4.query("."+_32[i],_30.domNode)[0];if(_35){_34=true;if(_32[i]!=cls){var _36=_4.query("."+cls,_30.domNode);if(_36.length==0){_4.removeClass(_30.domNode,cls);}else{_36.removeClass(cls);}_4.addClass(_35,cls);}}}if(!_34){_4.addClass(_30.domNode,cls);}}};_4.declare("dojox.layout.dnd.DropIndicator",null,{constructor:function(cn,tag){this.tag=tag||"div";this.style=cn||null;},isInserted:function(){return (this.node.parentNode&&this.node.parentNode.nodeType==1);},create:function(){if(this.node&&this.isInserted()){return this.node;}var h="90px",el=_4.doc.createElement(this.tag);if(this.style){el.className=this.style;el.style.height=h;}else{_4.style(el,{position:"relative",border:"1px dashed #F60",margin:"2px",height:h});}this.node=el;return el;},destroy:function(){if(!this.node||!this.isInserted()){return;}this.node.parentNode.removeChild(this.node);this.node=null;}});_4.extend(_4.dnd.Manager,{canDrop:function(_37){var _38=this.target&&_37;if(this.canDropFlag!=_38){this.canDropFlag=_38;if(this.avatar){this.avatar.update();}}},makeAvatar:function(){return (this.source.declaredClass=="dojox.layout.dnd.PlottedDnd")?new _6.layout.dnd.Avatar(this,this.source.opacity):new _4.dnd.Avatar(this);}});if(_4.isIE){_6.layout.dnd.handdleIE=[_4.subscribe("/dnd/start",null,function(){IEonselectstart=document.body.onselectstart;document.body.onselectstart=function(){return false;};}),_4.subscribe("/dnd/cancel",null,function(){document.body.onselectstart=IEonselectstart;}),_4.subscribe("/dnd/drop",null,function(){document.body.onselectstart=IEonselectstart;})];_4.addOnWindowUnload(function(){_4.forEach(_6.layout.dnd.handdleIE,_4.unsubscribe);});}}}};});