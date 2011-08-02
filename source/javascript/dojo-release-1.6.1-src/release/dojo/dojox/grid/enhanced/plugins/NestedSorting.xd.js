/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.grid.enhanced.plugins.NestedSorting"],["require","dojox.grid.enhanced._Plugin"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.grid.enhanced.plugins.NestedSorting"]){_4._hasResource["dojox.grid.enhanced.plugins.NestedSorting"]=true;_4.provide("dojox.grid.enhanced.plugins.NestedSorting");_4.require("dojox.grid.enhanced._Plugin");_4.declare("dojox.grid.enhanced.plugins.NestedSorting",_6.grid.enhanced._Plugin,{name:"nestedSorting",_currMainSort:"none",_currRegionIdx:-1,_a11yText:{"dojoxGridDescending":"&#9662;","dojoxGridAscending":"&#9652;","dojoxGridAscendingTip":"&#1784;","dojoxGridDescendingTip":"&#1783;","dojoxGridUnsortedTip":"x"},constructor:function(){this._sortDef=[];this._sortData={};this._headerNodes={};this._excludedColIdx=[];this.nls=this.grid._nls;this.grid.setSortInfo=function(){};this.grid.setSortIndex=_4.hitch(this,"_setGridSortIndex");this.grid.getSortProps=_4.hitch(this,"getSortProps");if(this.grid.sortFields){this._setGridSortIndex(this.grid.sortFields,null,true);}this.connect(this.grid.views,"render","_initSort");this.initCookieHandler();_4.subscribe("dojox/grid/rearrange/move/"+this.grid.id,_4.hitch(this,"_onColumnDnD"));},onStartUp:function(){this.inherited(arguments);this.connect(this.grid,"onHeaderCellClick","_onHeaderCellClick");this.connect(this.grid,"onHeaderCellMouseOver","_onHeaderCellMouseOver");this.connect(this.grid,"onHeaderCellMouseOut","_onHeaderCellMouseOut");},_onColumnDnD:function(_7,_8){if(_7!=="col"){return;}var m=_8,_9={},d=this._sortData,p;var cr=this._getCurrentRegion();this._blurRegion(cr);var _a=_4.attr(this._getRegionHeader(cr),"idx");for(p in m){if(d[p]){_9[m[p]]=d[p];delete d[p];}if(p===_a){_a=m[p];}}for(p in _9){d[p]=_9[p];}var c=this._headerNodes[_a];this._currRegionIdx=_4.indexOf(this._getRegions(),c.firstChild);this._initSort(false);},_setGridSortIndex:function(_b,_c,_d){if(_4.isArray(_b)){var i,d,_e;for(i=0;i<_b.length;i++){d=_b[i];_e=this.grid.getCellByField(d.attribute);if(!_e){console.warn("Invalid sorting option, column ",d.attribute," not found.");return;}if(_e["nosort"]||!this.grid.canSort(_e.index,_e.field)){console.warn("Invalid sorting option, column ",d.attribute," is unsortable.");return;}}this.clearSort();_4.forEach(_b,function(d,i){_e=this.grid.getCellByField(d.attribute);this.setSortData(_e.index,"index",i);this.setSortData(_e.index,"order",d.descending?"desc":"asc");},this);}else{if(!isNaN(_b)){if(_c===undefined){return;}this.setSortData(_b,"order",_c?"asc":"desc");}else{return;}}this._updateSortDef();if(!_d){this.grid.sort();}},getSortProps:function(){return this._sortDef.length?this._sortDef:null;},_initSort:function(_f){var g=this.grid,n=g.domNode,len=this._sortDef.length;_4.toggleClass(n,"dojoxGridSorted",!!len);_4.toggleClass(n,"dojoxGridSingleSorted",len===1);_4.toggleClass(n,"dojoxGridNestSorted",len>1);if(len>0){this._currMainSort=this._sortDef[0].descending?"desc":"asc";}var idx,_10=this._excludedCoIdx=[];this._headerNodes=_4.query("th",g.viewsHeaderNode).forEach(function(n){idx=parseInt(_4.attr(n,"idx"),10);if(_4.style(n,"display")==="none"||g.layout.cells[idx]["nosort"]||(g.canSort&&!g.canSort(idx,g.layout.cells[idx]["field"]))){_10.push(idx);}});this._headerNodes.forEach(this._initHeaderNode,this);this._initFocus();if(_f){this._focusHeader();}},_initHeaderNode:function(_11){var _12=_4.query(".dojoxGridSortNode",_11)[0];if(_12){_4.toggleClass(_12,"dojoxGridSortNoWrap",true);}if(_4.indexOf(this._excludedCoIdx,_4.attr(_11,"idx"))>=0){_4.addClass(_11,"dojoxGridNoSort");return;}if(!_4.query(".dojoxGridSortBtn",_11).length){this._connects=_4.filter(this._connects,function(_13){if(_13._sort){_4.disconnect(_13);return false;}return true;});var n=_4.create("a",{className:"dojoxGridSortBtn dojoxGridSortBtnNested",title:this.nls.nestedSort+" - "+this.nls.ascending,innerHTML:"1"},_11.firstChild,"last");n.onmousedown=_4.stopEvent;n=_4.create("a",{className:"dojoxGridSortBtn dojoxGridSortBtnSingle",title:this.nls.singleSort+" - "+this.nls.ascending},_11.firstChild,"last");n.onmousedown=_4.stopEvent;}else{var a1=_4.query(".dojoxGridSortBtnSingle",_11)[0];var a2=_4.query(".dojoxGridSortBtnNested",_11)[0];a1.className="dojoxGridSortBtn dojoxGridSortBtnSingle";a2.className="dojoxGridSortBtn dojoxGridSortBtnNested";a2.innerHTML="1";_4.removeClass(_11,"dojoxGridCellShowIndex");_4.removeClass(_11.firstChild,"dojoxGridSortNodeSorted");_4.removeClass(_11.firstChild,"dojoxGridSortNodeAsc");_4.removeClass(_11.firstChild,"dojoxGridSortNodeDesc");_4.removeClass(_11.firstChild,"dojoxGridSortNodeMain");_4.removeClass(_11.firstChild,"dojoxGridSortNodeSub");}this._updateHeaderNodeUI(_11);},_onHeaderCellClick:function(e){this._focusRegion(e.target);if(_4.hasClass(e.target,"dojoxGridSortBtn")){this._onSortBtnClick(e);_4.stopEvent(e);this._focusRegion(this._getCurrentRegion());}},_onHeaderCellMouseOver:function(e){if(!e.cell){return;}if(this._sortDef.length>1){return;}if(this._sortData[e.cellIndex]&&this._sortData[e.cellIndex].index===0){return;}var p;for(p in this._sortData){if(this._sortData[p]&&this._sortData[p].index===0){_4.addClass(this._headerNodes[p],"dojoxGridCellShowIndex");break;}}if(!_4.hasClass(_4.body(),"dijit_a11y")){return;}var i=e.cell.index,_14=e.cellNode;var _15=_4.query(".dojoxGridSortBtnSingle",_14)[0];var _16=_4.query(".dojoxGridSortBtnNested",_14)[0];var _17="none";if(_4.hasClass(this.grid.domNode,"dojoxGridSingleSorted")){_17="single";}else{if(_4.hasClass(this.grid.domNode,"dojoxGridNestSorted")){_17="nested";}}var _18=_4.attr(_16,"orderIndex");if(_18===null||_18===undefined){_4.attr(_16,"orderIndex",_16.innerHTML);_18=_16.innerHTML;}if(this.isAsc(i)){_16.innerHTML=_18+this._a11yText.dojoxGridDescending;}else{if(this.isDesc(i)){_16.innerHTML=_18+this._a11yText.dojoxGridUnsortedTip;}else{_16.innerHTML=_18+this._a11yText.dojoxGridAscending;}}if(this._currMainSort==="none"){_15.innerHTML=this._a11yText.dojoxGridAscending;}else{if(this._currMainSort==="asc"){_15.innerHTML=this._a11yText.dojoxGridDescending;}else{if(this._currMainSort==="desc"){_15.innerHTML=this._a11yText.dojoxGridUnsortedTip;}}}},_onHeaderCellMouseOut:function(e){var p;for(p in this._sortData){if(this._sortData[p]&&this._sortData[p].index===0){_4.removeClass(this._headerNodes[p],"dojoxGridCellShowIndex");break;}}},_onSortBtnClick:function(e){var _19=e.cell.index;if(_4.hasClass(e.target,"dojoxGridSortBtnSingle")){this._prepareSingleSort(_19);}else{if(_4.hasClass(e.target,"dojoxGridSortBtnNested")){this._prepareNestedSort(_19);}else{return;}}_4.stopEvent(e);this._doSort(_19);},_doSort:function(_1a){if(!this._sortData[_1a]||!this._sortData[_1a].order){this.setSortData(_1a,"order","asc");}else{if(this.isAsc(_1a)){this.setSortData(_1a,"order","desc");}else{if(this.isDesc(_1a)){this.removeSortData(_1a);}}}this._updateSortDef();this.grid.sort();this._initSort(true);},setSortData:function(_1b,_1c,_1d){var sd=this._sortData[_1b];if(!sd){sd=this._sortData[_1b]={};}sd[_1c]=_1d;},removeSortData:function(_1e){var d=this._sortData,i=d[_1e].index,p;delete d[_1e];for(p in d){if(d[p].index>i){d[p].index--;}}},_prepareSingleSort:function(_1f){var d=this._sortData,p;for(p in d){delete d[p];}this.setSortData(_1f,"index",0);this.setSortData(_1f,"order",this._currMainSort==="none"?null:this._currMainSort);if(!this._sortData[_1f]||!this._sortData[_1f].order){this._currMainSort="asc";}else{if(this.isAsc(_1f)){this._currMainSort="desc";}else{if(this.isDesc(_1f)){this._currMainSort="none";}}}},_prepareNestedSort:function(_20){var i=this._sortData[_20]?this._sortData[_20].index:null;if(i===0||!!i){return;}this.setSortData(_20,"index",this._sortDef.length);},_updateSortDef:function(){this._sortDef.length=0;var d=this._sortData,p;for(p in d){this._sortDef[d[p].index]={attribute:this.grid.layout.cells[p].field,descending:d[p].order==="desc"};}},_updateHeaderNodeUI:function(_21){var _22=this._getCellByNode(_21);var _23=_22.index;var _24=this._sortData[_23];var _25=_4.query(".dojoxGridSortNode",_21)[0];var _26=_4.query(".dojoxGridSortBtnSingle",_21)[0];var _27=_4.query(".dojoxGridSortBtnNested",_21)[0];_4.toggleClass(_26,"dojoxGridSortBtnAsc",this._currMainSort==="asc");_4.toggleClass(_26,"dojoxGridSortBtnDesc",this._currMainSort==="desc");if(this._currMainSort==="asc"){_26.title=this.nls.singleSort+" - "+this.nls.descending;}else{if(this._currMainSort==="desc"){_26.title=this.nls.singleSort+" - "+this.nls.unsorted;}else{_26.title=this.nls.singleSort+" - "+this.nls.ascending;}}var _28=this;function _29(){var _2a="Column "+(_22.index+1)+" "+_22.field;var _2b="none";var _2c="ascending";if(_24){_2b=_24.order==="asc"?"ascending":"descending";_2c=_24.order==="asc"?"descending":"none";}var _2d=_2a+" - is sorted by "+_2b;var _2e=_2a+" - is nested sorted by "+_2b;var _2f=_2a+" - choose to sort by "+_2c;var _30=_2a+" - choose to nested sort by "+_2c;_5.setWaiState(_26,"label",_2d);_5.setWaiState(_27,"label",_2e);var _31=[_28.connect(_26,"onmouseover",function(){_5.setWaiState(_26,"label",_2f);}),_28.connect(_26,"onmouseout",function(){_5.setWaiState(_26,"label",_2d);}),_28.connect(_27,"onmouseover",function(){_5.setWaiState(_27,"label",_30);}),_28.connect(_27,"onmouseout",function(){_5.setWaiState(_27,"label",_2e);})];_4.forEach(_31,function(_32){_32._sort=true;});};_29();var _33=_4.hasClass(_4.body(),"dijit_a11y");if(!_24){_27.innerHTML=this._sortDef.length+1;return;}if(_24.index||(_24.index===0&&this._sortDef.length>1)){_27.innerHTML=_24.index+1;}_4.addClass(_25,"dojoxGridSortNodeSorted");if(this.isAsc(_23)){_4.addClass(_25,"dojoxGridSortNodeAsc");_27.title=this.nls.nestedSort+" - "+this.nls.descending;if(_33){_25.innerHTML=this._a11yText.dojoxGridAscendingTip;}}else{if(this.isDesc(_23)){_4.addClass(_25,"dojoxGridSortNodeDesc");_27.title=this.nls.nestedSort+" - "+this.nls.unsorted;if(_33){_25.innerHTML=this._a11yText.dojoxGridDescendingTip;}}}_4.addClass(_25,(_24.index===0?"dojoxGridSortNodeMain":"dojoxGridSortNodeSub"));},isAsc:function(_34){return this._sortData[_34].order==="asc";},isDesc:function(_35){return this._sortData[_35].order==="desc";},_getCellByNode:function(_36){var i;for(i=0;i<this._headerNodes.length;i++){if(this._headerNodes[i]===_36){return this.grid.layout.cells[i];}}return null;},clearSort:function(){this._sortData={};this._sortDef.length=0;},initCookieHandler:function(){if(this.grid.addCookieHandler){this.grid.addCookieHandler({name:"sortOrder",onLoad:_4.hitch(this,"_loadNestedSortingProps"),onSave:_4.hitch(this,"_saveNestedSortingProps")});}},_loadNestedSortingProps:function(_37,_38){this._setGridSortIndex(_37);},_saveNestedSortingProps:function(_39){return this.getSortProps();},_initFocus:function(){var f=this.focus=this.grid.focus;this._focusRegions=this._getRegions();if(!this._headerArea){var _3a=this._headerArea=f.getArea("header");_3a.onFocus=f.focusHeader=_4.hitch(this,"_focusHeader");_3a.onBlur=f.blurHeader=f._blurHeader=_4.hitch(this,"_blurHeader");_3a.onMove=_4.hitch(this,"_onMove");_3a.onKeyDown=_4.hitch(this,"_onKeyDown");_3a._regions=[];_3a.getRegions=null;this.connect(this.grid,"onBlur","_blurHeader");}},_focusHeader:function(evt){if(this._currRegionIdx===-1){this._onMove(0,1,null);}else{this._focusRegion(this._getCurrentRegion());}try{_4.stopEvent(evt);}catch(e){}return true;},_blurHeader:function(evt){this._blurRegion(this._getCurrentRegion());return true;},_onMove:function(_3b,_3c,evt){var _3d=this._currRegionIdx||0,_3e=this._focusRegions;var _3f=_3e[_3d+_3c];if(!_3f){return;}else{if(_4.style(_3f,"display")==="none"||_4.style(_3f,"visibility")==="hidden"){this._onMove(_3b,_3c+(_3c>0?1:-1),evt);return;}}this._focusRegion(_3f);var _40=this._getRegionView(_3f);_40.scrollboxNode.scrollLeft=_40.headerNode.scrollLeft;},_onKeyDown:function(e,_41){if(_41){switch(e.keyCode){case _4.keys.ENTER:case _4.keys.SPACE:if(_4.hasClass(e.target,"dojoxGridSortBtnSingle")||_4.hasClass(e.target,"dojoxGridSortBtnNested")){this._onSortBtnClick(e);}}}},_getRegionView:function(_42){var _43=_42;while(_43&&!_4.hasClass(_43,"dojoxGridHeader")){_43=_43.parentNode;}if(_43){return _4.filter(this.grid.views.views,function(_44){return _44.headerNode===_43;})[0]||null;}return null;},_getRegions:function(){var _45=[],_46=this.grid.layout.cells;this._headerNodes.forEach(function(n,i){if(_4.style(n,"display")==="none"){return;}if(_46[i]["isRowSelector"]){_45.push(n);return;}_4.query(".dojoxGridSortNode,.dojoxGridSortBtnNested,.dojoxGridSortBtnSingle",n).forEach(function(_47){_4.attr(_47,"tabindex",0);_45.push(_47);});},this);return _45;},_focusRegion:function(_48){if(!_48){return;}var _49=this._getCurrentRegion();if(_49&&_48!==_49){this._blurRegion(_49);}var _4a=this._getRegionHeader(_48);_4.addClass(_4a,"dojoxGridCellSortFocus");if(_4.hasClass(_48,"dojoxGridSortNode")){_4.addClass(_48,"dojoxGridSortNodeFocus");}else{if(_4.hasClass(_48,"dojoxGridSortBtn")){_4.addClass(_48,"dojoxGridSortBtnFocus");}}_48.focus();this.focus.currentArea("header");this._currRegionIdx=_4.indexOf(this._focusRegions,_48);},_blurRegion:function(_4b){if(!_4b){return;}var _4c=this._getRegionHeader(_4b);_4.removeClass(_4c,"dojoxGridCellSortFocus");if(_4.hasClass(_4b,"dojoxGridSortNode")){_4.removeClass(_4b,"dojoxGridSortNodeFocus");}else{if(_4.hasClass(_4b,"dojoxGridSortBtn")){_4.removeClass(_4b,"dojoxGridSortBtnFocus");}}_4b.blur();},_getCurrentRegion:function(){return this._focusRegions[this._currRegionIdx];},_getRegionHeader:function(_4d){while(_4d&&!_4.hasClass(_4d,"dojoxGridCell")){_4d=_4d.parentNode;}return _4d;},destroy:function(){this._sortDef=this._sortData=null;this._headerNodes=this._focusRegions=null;this.inherited(arguments);}});_6.grid.EnhancedGrid.registerPlugin(_6.grid.enhanced.plugins.NestedSorting);}}};});