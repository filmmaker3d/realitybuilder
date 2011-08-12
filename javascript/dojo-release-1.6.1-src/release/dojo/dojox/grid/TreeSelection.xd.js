/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.grid.TreeSelection"],["require","dojox.grid.DataSelection"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.grid.TreeSelection"]){_4._hasResource["dojox.grid.TreeSelection"]=true;_4.provide("dojox.grid.TreeSelection");_4.require("dojox.grid.DataSelection");_4.declare("dojox.grid.TreeSelection",_6.grid.DataSelection,{setMode:function(_7){this.selected={};this.sorted_sel=[];this.sorted_ltos={};this.sorted_stol={};_6.grid.DataSelection.prototype.setMode.call(this,_7);},addToSelection:function(_8){if(this.mode=="none"){return;}var _9=null;if(typeof _8=="number"||typeof _8=="string"){_9=_8;}else{_9=this.grid.getItemIndex(_8);}if(this.selected[_9]){this.selectedIndex=_9;}else{if(this.onCanSelect(_9)!==false){this.selectedIndex=_9;var _a=_4.query("tr[dojoxTreeGridPath='"+_9+"']",this.grid.domNode);if(_a.length){_4.attr(_a[0],"aria-selected","true");}this._beginUpdate();this.selected[_9]=true;this._insertSortedSelection(_9);this.onSelected(_9);this._endUpdate();}}},deselect:function(_b){if(this.mode=="none"){return;}var _c=null;if(typeof _b=="number"||typeof _b=="string"){_c=_b;}else{_c=this.grid.getItemIndex(_b);}if(this.selectedIndex==_c){this.selectedIndex=-1;}if(this.selected[_c]){if(this.onCanDeselect(_c)===false){return;}var _d=_4.query("tr[dojoxTreeGridPath='"+_c+"']",this.grid.domNode);if(_d.length){_4.attr(_d[0],"aria-selected","false");}this._beginUpdate();delete this.selected[_c];this._removeSortedSelection(_c);this.onDeselected(_c);this._endUpdate();}},getSelected:function(){var _e=[];for(var i in this.selected){if(this.selected[i]){_e.push(this.grid.getItem(i));}}return _e;},getSelectedCount:function(){var c=0;for(var i in this.selected){if(this.selected[i]){c++;}}return c;},_bsearch:function(v){var o=this.sorted_sel;var h=o.length-1,l=0,m;while(l<=h){var _f=this._comparePaths(o[m=(l+h)>>1],v);if(_f<0){l=m+1;continue;}if(_f>0){h=m-1;continue;}return m;}return _f<0?m-_f:m;},_comparePaths:function(a,b){for(var i=0,l=(a.length<b.length?a.length:b.length);i<l;i++){if(a[i]<b[i]){return -1;}if(a[i]>b[i]){return 1;}}if(a.length<b.length){return -1;}if(a.length>b.length){return 1;}return 0;},_insertSortedSelection:function(_10){_10=String(_10);var s=this.sorted_sel;var sl=this.sorted_ltos;var ss=this.sorted_stol;var _11=_10.split("/");_11=_4.map(_11,function(_12){return parseInt(_12,10);});sl[_11]=_10;ss[_10]=_11;if(s.length===0){s.push(_11);return;}if(s.length==1){var cmp=this._comparePaths(s[0],_11);if(cmp==1){s.unshift(_11);}else{s.push(_11);}return;}var idx=this._bsearch(_11);this.sorted_sel.splice(idx,0,_11);},_removeSortedSelection:function(_13){_13=String(_13);var s=this.sorted_sel;var sl=this.sorted_ltos;var ss=this.sorted_stol;if(s.length===0){return;}var _14=ss[_13];if(!_14){return;}var idx=this._bsearch(_14);if(idx>-1){delete sl[_14];delete ss[_13];s.splice(idx,1);}},getFirstSelected:function(){if(!this.sorted_sel.length||this.mode=="none"){return -1;}var _15=this.sorted_sel[0];if(!_15){return -1;}_15=this.sorted_ltos[_15];if(!_15){return -1;}return _15;},getNextSelected:function(_16){if(!this.sorted_sel.length||this.mode=="none"){return -1;}_16=String(_16);var _17=this.sorted_stol[_16];if(!_17){return -1;}var idx=this._bsearch(_17);var _18=this.sorted_sel[idx+1];if(!_18){return -1;}return this.sorted_ltos[_18];},_range:function(_19,_1a,_1b){if(!_4.isString(_19)&&_19<0){_19=_1a;}var _1c=this.grid.layout.cells,_1d=this.grid.store,_1e=this.grid;_19=new _6.grid.TreePath(String(_19),_1e);_1a=new _6.grid.TreePath(String(_1a),_1e);if(_19.compare(_1a)>0){var tmp=_19;_19=_1a;_1a=tmp;}var _1f=_19._str,_20=_1a._str;_1b(_1f);var p=_19;while((p=p.next())){if(p._str==_20){break;}_1b(p._str);}_1b(_20);}});}}};});