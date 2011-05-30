if(!dojo._hasResource["dojox.grid.enhanced.plugins.filter.ClearFilterConfirm"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.grid.enhanced.plugins.filter.ClearFilterConfirm"] = true;
dojo.provide("dojox.grid.enhanced.plugins.filter.ClearFilterConfirm");

dojo.require("dijit.form.Button");

dojo.declare("dojox.grid.enhanced.plugins.filter.ClearFilterConfirm",[dijit._Widget,dijit._Templated],{
	// summary:
	//		The UI for user to confirm the operation of clearing filter.
	templateString: dojo.cache("dojox.grid", "enhanced/templates/ClearFilterConfirmPane.html", "<div class=\"dojoxGridClearFilterConfirm\">\r\n\t<div class=\"dojoxGridClearFilterMsg\">\r\n\t\t${_clearFilterMsg}\r\n\t</div>\r\n\t<div class=\"dojoxGridClearFilterBtns\" dojoAttachPoint=\"btnsNode\">\r\n\t\t<span dojoType=\"dijit.form.Button\" label=\"${_cancelBtnLabel}\" dojoAttachPoint=\"cancelBtn\" dojoAttachEvent=\"onClick:_onCancel\"></span>\r\n\t\t<span dojoType=\"dijit.form.Button\" label=\"${_clearBtnLabel}\" dojoAttachPoint=\"clearBtn\" dojoAttachEvent=\"onClick:_onClear\"></span>\r\n\t</div>\r\n</div>\r\n"),
	widgetsInTemplate: true,
	plugin: null,
	postMixInProperties: function(){
		var nls = this.plugin.nls;
		this._clearBtnLabel = nls["clearButton"];
		this._cancelBtnLabel = nls["cancelButton"];
		this._clearFilterMsg = nls["clearFilterMsg"];
	},
	postCreate: function(){
		this.inherited(arguments);
		dijit.setWaiState(this.cancelBtn.domNode, "label", this.plugin.nls["waiCancelButton"]);
		dijit.setWaiState(this.clearBtn.domNode, "label", this.plugin.nls["waiClearButton"]);
	},
	uninitialize: function(){
		this.plugin = null;
	},
	_onCancel: function(){
		this.plugin.clearFilterDialog.hide();
	},
	_onClear: function(){
		this.plugin.clearFilterDialog.hide();
		this.plugin.filterDefDialog.clearFilter(this.plugin.filterDefDialog._clearWithoutRefresh);
	}
});


}
