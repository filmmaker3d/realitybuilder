/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.grid.cells.tree"],["require","dojox.grid.cells"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.grid.cells.tree"]){_4._hasResource["dojox.grid.cells.tree"]=true;_4.provide("dojox.grid.cells.tree");_4.require("dojox.grid.cells");_6.grid.cells.TreeCell={formatAggregate:function(_7,_8,_9){var f,g=this.grid,i=g.edit.info,d=g.aggregator?g.aggregator.getForCell(this,_8,_7,_8===this.level?"cnt":this.parentCell.aggregate):(this.value||this.defaultValue);return this._defaultFormat(d,[d,_8-this.level,_9,this]);},formatIndexes:function(_a,_b){var f,g=this.grid,i=g.edit.info,d=this.get?this.get(_a[0],_b,_a):(this.value||this.defaultValue);if(this.editable&&(this.alwaysEditing||(i.rowIndex==_a[0]&&i.cell==this))){return this.formatEditing(d,_a[0],_a);}else{return this._defaultFormat(d,[d,_a[0],_a,this]);}},getOpenState:function(_c){var _d=this.grid,_e=_d.store,_f=null;if(_e.isItem(_c)){_f=_c;_c=_e.getIdentity(_c);}if(!this.openStates){this.openStates={};}if(typeof _c!="string"||!(_c in this.openStates)){this.openStates[_c]=_d.getDefaultOpenState(this,_f);}return this.openStates[_c];},formatAtLevel:function(_10,_11,_12,_13,_14,_15){if(!_4.isArray(_10)){_10=[_10];}var _16="";if(_12>this.level||(_12===this.level&&_13)){_15.push("dojoxGridSpacerCell");if(_12===this.level){_15.push("dojoxGridTotalCell");}_16="<span></span>";}else{if(_12<this.level){_15.push("dojoxGridSummaryCell");_16="<span class=\"dojoxGridSummarySpan\">"+this.formatAggregate(_11,_12,_10)+"</span>";}else{var ret="";if(this.isCollapsable){var _17=this.grid.store,id="";if(_17.isItem(_11)){id=_17.getIdentity(_11);}_15.push("dojoxGridExpandoCell");ret="<span dojoType=\"dojox.grid._Expando\" level=\""+_12+"\" class=\"dojoxGridExpando\""+"\" toggleClass=\""+_14+"\" itemId=\""+id+"\" cellIdx=\""+this.index+"\"></span>";}_16=ret+this.formatIndexes(_10,_11);}}if(this.grid.focus.cell&&this.index==this.grid.focus.cell.index&&_10.join("/")==this.grid.focus.rowIndex){_15.push(this.grid.focus.focusClass);}return _16;}};}}};});