/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.grid.enhanced.plugins.filter.FilterBar"],["require","dijit.form.Button"],["require","dojo.string"],["require","dojo.fx"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.grid.enhanced.plugins.filter.FilterBar"]){_4._hasResource["dojox.grid.enhanced.plugins.filter.FilterBar"]=true;_4.provide("dojox.grid.enhanced.plugins.filter.FilterBar");_4.require("dijit.form.Button");_4.require("dojo.string");_4.require("dojo.fx");(function(){var _7="dojoxGridFBarHover",_8="dojoxGridFBarFiltered",_9=function(_a){try{if(_a&&_a.preventDefault){_4.stopEvent(_a);}}catch(e){}};_4.declare("dojox.grid.enhanced.plugins.filter.FilterBar",[_5._Widget,_5._Templated],{templateString:_4.cache("dojox.grid","enhanced/templates/FilterBar.html","<table class=\"dojoxGridFBar\" border=\"0\" cellspacing=\"0\" dojoAttachEvent=\"onclick:_onClickFilterBar, onmouseenter:_onMouseEnter, onmouseleave:_onMouseLeave, onmousemove:_onMouseMove\"\r\n\t><tr><td class=\"dojoxGridFBarBtnTD\"\r\n\t\t><span dojoType=\"dijit.form.Button\" class=\"dojoxGridFBarBtn\" dojoAttachPoint=\"defineFilterButton\" label=\"...\" iconClass=\"dojoxGridFBarDefFilterBtnIcon\" showLabel=\"true\" dojoAttachEvent=\"onClick:_showFilterDefDialog, onMouseEnter:_onEnterButton, onMouseLeave:_onLeaveButton, onMouseMove:_onMoveButton\"></span\r\n\t></td><td class=\"dojoxGridFBarInfoTD\"\r\n\t\t><span class=\"dojoxGridFBarInner\"\r\n\t\t\t><span class=\"dojoxGridFBarStatus\" dojoAttachPoint=\"statusBarNode\">${_noFilterMsg}</span\r\n\t\t\t><span dojoType=\"dijit.form.Button\" class=\"dojoxGridFBarClearFilterBtn\" dojoAttachPoint=\"clearFilterButton\" \r\n\t\t\t\tlabel=\"${_filterBarClearBtnLabel}\" iconClass=\"dojoxGridFBarClearFilterBtnIcon\" showLabel=\"true\" \r\n\t\t\t\tdojoAttachEvent=\"onClick:_clearFilterDefDialog, onMouseEnter:_onEnterButton, onMouseLeave:_onLeaveButton, onMouseMove:_onMoveButton\"></span\r\n\t\t\t><span dojotype=\"dijit.form.Button\" class=\"dojoxGridFBarCloseBtn\" dojoAttachPoint=\"closeFilterBarButton\" \r\n\t\t\t\tlabel=\"${_closeFilterBarBtnLabel}\" iconClass=\"dojoxGridFBarCloseBtnIcon\" showLabel=\"false\" \r\n\t\t\t\tdojoAttachEvent=\"onClick:_closeFilterBar, onMouseEnter:_onEnterButton, onMouseLeave:_onLeaveButton, onMouseMove:_onMoveButton\"></span\r\n\t\t></span\r\n\t></td></tr\r\n></table>\r\n"),widgetsInTemplate:true,_timeout_statusTooltip:300,_handle_statusTooltip:null,_curColIdx:-1,plugin:null,postMixInProperties:function(){var _b=this.plugin;var _c=_b.nls;this._filterBarDefBtnLabel=_c["filterBarDefButton"];this._filterBarClearBtnLabel=_c["filterBarClearButton"];this._closeFilterBarBtnLabel=_c["closeFilterBarBtn"];var _d=_b.args.itemsName||_c["defaultItemsName"];this._noFilterMsg=_4.string.substitute(_c["filterBarMsgNoFilterTemplate"],["",_d]);var t=this.plugin.args.statusTipTimeout;if(typeof t=="number"){this._timeout_statusTooltip=t;}var g=_b.grid;g.showFilterBar=_4.hitch(this,"showFilterBar");g.toggleFilterBar=_4.hitch(this,"toggleFilterBar");g.isFilterBarShown=_4.hitch(this,"isFilterBarShown");},postCreate:function(){this.inherited(arguments);if(!this.plugin.args.closeFilterbarButton){_4.style(this.closeFilterBarButton.domNode,"display","none");}var _e=this,g=this.plugin.grid,_f=this.oldGetHeaderHeight=_4.hitch(g,g._getHeaderHeight);this.placeAt(g.viewsHeaderNode,"after");this.connect(this.plugin.filterDefDialog,"showDialog","_onShowFilterDefDialog");this.connect(this.plugin.filterDefDialog,"closeDialog","_onCloseFilterDefDialog");this.connect(g.layer("filter"),"onFiltered",this._onFiltered);this.defineFilterButton.domNode.title=this.plugin.nls["filterBarDefButton"];if(_4.hasClass(_4.body(),"dijit_a11y")){this.defineFilterButton.set("label",this.plugin.nls["a11yFilterBarDefButton"]);}this.connect(this.defineFilterButton.domNode,"click",_9);this.connect(this.clearFilterButton.domNode,"click",_9);this.connect(this.closeFilterBarButton.domNode,"click",_9);this.toggleClearFilterBtn(true);this._initAriaInfo();g._getHeaderHeight=function(){return _f()+_4.marginBox(_e.domNode).h;};g.focus.addArea({name:"filterbar",onFocus:_4.hitch(this,this._onFocusFilterBar,false),onBlur:_4.hitch(this,this._onBlurFilterBar)});g.focus.placeArea("filterbar","after","header");},uninitialize:function(){var g=this.plugin.grid;g._getHeaderHeight=this.oldGetHeaderHeight;g.focus.removeArea("filterbar");this.plugin=null;},isFilterBarShown:function(){return _4.style(this.domNode,"display")!="none";},showFilterBar:function(_10,_11,_12){var g=this.plugin.grid;if(_11){if(Boolean(_10)==this.isFilterBarShown()){return;}_12=_12||{};var _13=[],_14=500;_13.push(_4.fx[_10?"wipeIn":"wipeOut"](_4.mixin({"node":this.domNode,"duration":_14},_12)));var _15=g.views.views[0].domNode.offsetHeight;var _16={"duration":_14,"properties":{"height":{"end":_4.hitch(this,function(){var _17=this.domNode.scrollHeight;if(_4.isFF){_17-=2;}return _10?(_15-_17):(_15+_17);})}}};_4.forEach(g.views.views,function(_18){_13.push(_4.animateProperty(_4.mixin({"node":_18.domNode},_16,_12)),_4.animateProperty(_4.mixin({"node":_18.scrollboxNode},_16,_12)));});_13.push(_4.animateProperty(_4.mixin({"node":g.viewsNode},_16,_12)));_4.fx.combine(_13).play();}else{_4.style(this.domNode,"display",_10?"":"none");g.update();}},toggleFilterBar:function(_19,_1a){this.showFilterBar(!this.isFilterBarShown(),_19,_1a);},getColumnIdx:function(_1b){var _1c=_4.query("[role='columnheader']",this.plugin.grid.viewsHeaderNode);var idx=-1;for(var i=_1c.length-1;i>=0;--i){var _1d=_4.coords(_1c[i]);if(_1b>=_1d.x&&_1b<_1d.x+_1d.w){idx=i;break;}}if(idx>=0&&this.plugin.grid.layout.cells[idx].filterable!==false){return idx;}else{return -1;}},toggleClearFilterBtn:function(_1e){_4.style(this.clearFilterButton.domNode,"display",_1e?"none":"");},_closeFilterBar:function(e){_9(e);var _1f=this.plugin.filterDefDialog.getCriteria();if(_1f){var _20=_4.connect(this.plugin.filterDefDialog,"clearFilter",this,function(){this.showFilterBar(false,true);_4.disconnect(_20);});this._clearFilterDefDialog(e);}else{this.showFilterBar(false,true);}},_showFilterDefDialog:function(e){_9(e);this.plugin.filterDefDialog.showDialog(this._curColIdx);this.plugin.grid.focus.focusArea("filterbar");},_clearFilterDefDialog:function(e){_9(e);this.plugin.filterDefDialog.onClearFilter();this.plugin.grid.focus.focusArea("filterbar");},_onEnterButton:function(e){this._onBlurFilterBar();_9(e);},_onMoveButton:function(e){this._onBlurFilterBar();},_onLeaveButton:function(e){this._leavingBtn=true;},_onShowFilterDefDialog:function(_21){if(typeof _21=="number"){this._curColIdx=_21;}this._defPaneIsShown=true;},_onCloseFilterDefDialog:function(){this._defPaneIsShown=false;this._curColIdx=-1;_5.focus(this.defineFilterButton.domNode);},_onClickFilterBar:function(e){_9(e);this._clearStatusTipTimeout();this.plugin.grid.focus.focusArea("filterbar");this.plugin.filterDefDialog.showDialog(this.getColumnIdx(e.clientX));},_onMouseEnter:function(e){this._onFocusFilterBar(true,null);this._updateTipPosition(e);this._setStatusTipTimeout();},_onMouseMove:function(e){if(this._leavingBtn){this._onFocusFilterBar(true,null);this._leavingBtn=false;}if(this._isFocused){this._setStatusTipTimeout();this._highlightHeader(this.getColumnIdx(e.clientX));if(this._handle_statusTooltip){this._updateTipPosition(e);}}},_onMouseLeave:function(e){this._onBlurFilterBar();},_updateTipPosition:function(evt){this._tippos={x:evt.pageX,y:evt.pageY};},_onFocusFilterBar:function(_22,evt,_23){if(!this.isFilterBarShown()){return false;}this._isFocused=true;_4.addClass(this.domNode,_7);if(!_22){var _24=_4.style(this.clearFilterButton.domNode,"display")!=="none";var _25=_4.style(this.closeFilterBarButton.domNode,"display")!=="none";if(typeof this._focusPos=="undefined"){if(_23>0){this._focusPos=0;}else{if(_25){this._focusPos=1;}else{this._focusPos=0;}if(_24){++this._focusPos;}}}if(this._focusPos===0){_5.focus(this.defineFilterButton.focusNode);}else{if(this._focusPos===1&&_24){_5.focus(this.clearFilterButton.focusNode);}else{_5.focus(this.closeFilterBarButton.focusNode);}}}_9(evt);return true;},_onBlurFilterBar:function(evt,_26){if(this._isFocused){this._isFocused=false;_4.removeClass(this.domNode,_7);this._clearStatusTipTimeout();this._clearHeaderHighlight();}var _27=true;if(_26){var _28=3;if(_4.style(this.closeFilterBarButton.domNode,"display")==="none"){--_28;}if(_4.style(this.clearFilterButton.domNode,"display")==="none"){--_28;}if(_28==1){delete this._focusPos;}else{var _29=this._focusPos;for(var _2a=_29+_26;_2a<0;_2a+=_28){}_2a%=_28;if((_26>0&&_2a<_29)||(_26<0&&_2a>_29)){delete this._focusPos;}else{this._focusPos=_2a;_27=false;}}}return _27;},_onFiltered:function(_2b,_2c){var p=this.plugin,_2d=p.args.itemsName||p.nls["defaultItemsName"],msg="",g=p.grid,_2e=g.layer("filter");if(_2e.filterDef()){msg=_4.string.substitute(p.nls["filterBarMsgHasFilterTemplate"],[_2b,_2c,_2d]);_4.addClass(this.domNode,_8);}else{msg=_4.string.substitute(p.nls["filterBarMsgNoFilterTemplate"],[_2c,_2d]);_4.removeClass(this.domNode,_8);}this.statusBarNode.innerHTML=msg;this._focusPos=0;},_initAriaInfo:function(){_5.setWaiState(this.defineFilterButton.domNode,"label",this.plugin.nls["waiFilterBarDefButton"]);_5.setWaiState(this.clearFilterButton.domNode,"label",this.plugin.nls["waiFilterBarClearButton"]);},_isInColumn:function(_2f,_30,_31){var _32=_4.coords(_30);return _2f>=_32.x&&_2f<_32.x+_32.w;},_setStatusTipTimeout:function(){this._clearStatusTipTimeout();if(!this._defPaneIsShown){this._handle_statusTooltip=setTimeout(_4.hitch(this,this._showStatusTooltip),this._timeout_statusTooltip);}},_clearStatusTipTimeout:function(){clearTimeout(this._handle_statusTooltip);this._handle_statusTooltip=null;},_showStatusTooltip:function(){this._handle_statusTooltip=null;this.plugin.filterStatusTip.showDialog(this._tippos.x,this._tippos.y,this.getColumnIdx(this._tippos.x));},_highlightHeader:function(_33){if(_33!=this._previousHeaderIdx){var g=this.plugin.grid,_34=g.getCell(this._previousHeaderIdx);if(_34){_4.removeClass(_34.getHeaderNode(),"dojoxGridCellOver");}_34=g.getCell(_33);if(_34){_4.addClass(_34.getHeaderNode(),"dojoxGridCellOver");}this._previousHeaderIdx=_33;}},_clearHeaderHighlight:function(){if(typeof this._previousHeaderIdx!="undefined"){var g=this.plugin.grid,_35=g.getCell(this._previousHeaderIdx);if(_35){g.onHeaderCellMouseOut({cellNode:_35.getHeaderNode()});}delete this._previousHeaderIdx;}}});})();}}};});