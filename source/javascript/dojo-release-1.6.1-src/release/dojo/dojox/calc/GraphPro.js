if(!dojo._hasResource["dojox.calc.GraphPro"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.calc.GraphPro"] = true;
dojo.provide("dojox.calc.GraphPro");
dojo.require("dojox.calc.Standard");
dojo.require("dijit.dijit");
dojo.require("dijit.form.ComboBox");
dojo.require("dijit.form.Select");
dojo.require("dijit.form.CheckBox");
dojo.require("dijit.ColorPalette");
dojo.require("dojox.charting.Chart2D");
dojo.require("dojox.calc.Grapher");
dojo.require("dojox.layout.FloatingPane");
dojo.require("dojox.charting.themes.Tufte");
dojo.require("dojo.colors");



dojo.experimental("dojox.calc.GraphPro");

dojo.declare(
	"dojox.calc.GraphPro",
	dojox.calc.Standard,
{
	// summary:
	//		The dialog widget for a graphing, scientific calculator
	//
	templateString: dojo.cache("dojox.calc", "templates/GraphPro.html", "<div class=\"dijitReset dijitInline dojoxCalc\"\r\n><table class=\"dijitReset dijitInline dojoxCalcLayout\" dojoAttachPoint=\"calcTable\" rules=\"none\" cellspacing=0 cellpadding=0 border=0>\r\n\t<tr\r\n\t\t><td colspan=\"4\" class=\"dojoxCalcTextAreaContainer\"\r\n\t\t\t><div class=\"dijitTextBox dijitTextArea\" style=\"height:10em;width:auto;max-width:15.3em;border-width:0px;\" dojoAttachPoint='displayBox'></div\r\n\t\t></td\r\n\t></tr>\r\n\t<tr\r\n\t\t><td colspan=\"4\" class=\"dojoxCalcInputContainer\"\r\n\t\t\t><input dojoType=\"dijit.form.TextBox\" dojoAttachEvent=\"onBlur:onBlur,onKeyPress:onKeyPress\" dojoAttachPoint='textboxWidget'\r\n\t\t/></td\r\n\t></tr>\r\n\t<tr>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"grapherMakerButton\" label=\"Graph\" dojoAttachEvent='onClick:makeGrapherWindow' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"functionMakerButton\" label=\"Func\" dojoAttachEvent='onClick:makeFunctionWindow' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"toFracButton\" label=\"toFrac\" value=\"toFrac(\" dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td colspan=\"1\" class=\"dojoxCalcButtonContainer\">\r\n\t\t</td>\r\n\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"seven\" label=\"7\" value='7' dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"eight\" label=\"8\" value='8' dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"nine\" label=\"9\" value='9' dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"divide\" label=\"/\" value='/' dojoAttachEvent='onClick:insertOperator' />\r\n\t\t</td>\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"four\" label=\"4\" value='4' dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"five\" label=\"5\" value='5' dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"six\" label=\"6\" value='6' dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"multiply\" label=\"*\" value='*' dojoAttachEvent='onClick:insertOperator' />\r\n\t\t</td>\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"one\" label=\"1\" value='1' dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"two\" label=\"2\" value='2' dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"three\" label=\"3\" value='3' dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"add\" label=\"+\" value='+' dojoAttachEvent='onClick:insertOperator' />\r\n\t\t</td>\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"decimal\" label=\".\" value='.' dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"zero\" label=\"0\" value='0' dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"equals\" label=\"x=y\" value='=' dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcMinusButtonContainer\">\r\n\t\t\t<span dojoType=\"dijit.form.ComboButton\" dojoAttachPoint=\"subtract\" label='-' value='-' dojoAttachEvent='onClick:insertOperator'>\r\n\r\n\t\t\t\t<div dojoType=\"dijit.Menu\" style=\"display:none;\">\r\n\t\t\t\t\t<div dojoType=\"dijit.MenuItem\" dojoAttachEvent=\"onClick:insertMinus\">\r\n\t\t\t\t\t\t(-)\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</span>\r\n\t\t</td>\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"clear\" label=\"Clear\" dojoAttachEvent='onClick:clearText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"sqrt\" label=\"&#x221A;\" value=\"&#x221A;\" dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"power\" label=\"^\" value=\"^\" dojoAttachEvent='onClick:insertOperator' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"factorialButton\" label=\"!\" value=\"!\" dojoAttachEvent='onClick:insertOperator' />\r\n\t\t</td>\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"pi\" label=\"&#x03C0;\" value=\"&#x03C0;\" dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"sin\" label=\"sin\" value=\"sin(\" dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"cos\" label=\"cos\" value=\"cos(\" dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"tan\" label=\"tan\" value=\"tan(\" dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"e\" label=\"&#x03F5;\" value=\"&#x03F5;\" dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"log10\" label=\"log\" value=\"log(\" value=\"log(\" dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"lnE\" label=\"ln\" value=\"ln(\" dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"round\" label=\"Round\" value=\"Round(\" dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"intButton\" label=\"Int\" value=\"Int(\" dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"PermutationButton\" label=\"P\" value=\"P(\" dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"CombinationButton\" label=\"C\" value=\"C(\" dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"comma\" label=\",\" value=',' dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"AnsButton\" label=\"Ans\" value=\"Ans\" dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"LeftParenButton\" label=\"(\" value=\"(\" dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"RightParenButton\" label=\")\" value=\")\" dojoAttachEvent='onClick:insertText' />\r\n\t\t</td>\r\n\t\t<td class=\"dojoxCalcButtonContainer\">\r\n\t\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"enter\" label=\"Enter\" dojoAttachEvent='onClick:parseTextbox' />\r\n\t\t</td>\r\n\t</tr>\r\n</table>\r\n<span dojoAttachPoint=\"executor\" dojoType=\"dojox.calc._Executor\" dojoAttachEvent=\"onLoad:executorLoaded\"></span>\r\n</div>\r\n"),

	grapher:null,
	funcMaker:null,
	aFloatingPane: null,

	executorLoaded: function(){
		// summary
		//	when executor loads check to see if the writestore is there
		this.inherited(arguments);
		dojo.addOnLoad(dojo.hitch(this, function(){
			if(this.writeStore == null && "functionMakerButton" in this){
				dojo.style(this.functionMakerButton.domNode, { visibility: "hidden" });
			}
		}));
	},
	makeFunctionWindow: function(){
		// summary
		//	use this function to create a function window (with the button on the layout)
		var body = dojo.body();

		var pane = dojo.create('div');
		body.appendChild(pane);

		this.aFloatingPane = new dojox.layout.FloatingPane({resizable:false, dockable:true, maxable:false, closable:true, duration:300, title:"Function Window", style:"position:absolute;left:10em;top:10em;width:50em;"}, pane);
		var that = this;
		var d = dojo.create("div");
		this.funcMaker = new dojox.calc.FuncGen({
			writeStore:that.writeStore,
			readStore:that.readStore,
			functions:that.functions,
			deleteFunction: that.executor.deleteFunction,
			onSaved:function(){
				var	name,
					body;
				if((name = this.combo.get("value")) == ""){
					this.status.set("value", "The function needs a name");
				}else if ((body = this.textarea.get("value")) == ""){
					// i don't think users need empty functions for math
					this.status.set("value", "The function needs a body");
				}else{
					var args = this.args.get("value");
					if(!(name in this.functions)){
						this.combo.item = this.writeStore.newItem({name: name, args: args, body: body});
						this.writeStore.save();
					}
					this.saveFunction(name, args, body);
					this.status.set("value", "Function "+name+" was saved");
				}
			},
			saveFunction: dojo.hitch(that, that.saveFunction)
		}, d);
		this.aFloatingPane.set('content', this.funcMaker);
		this.aFloatingPane.startup();
		this.aFloatingPane.bringToTop();
	},
	makeGrapherWindow: function(){
		// summary
		//	use this to make a Grapher window appear with a button
		var body = dojo.body();

		var pane = dojo.create('div');
		body.appendChild(pane);

		this.aFloatingPane = new dojox.layout.FloatingPane({resizable:false, dockable:true, maxable:false, closable:true, duration:300, title:"Graph Window", style:"position:absolute;left:10em;top:5em;width:50em;"}, pane);
		var that = this;

		var d = dojo.create("div");
		this.grapher = new dojox.calc.Grapher({
			myPane: this.aFloatingPane,
			drawOne: function(i){
				this.array[i][this.chartIndex].resize(this.graphWidth.get("value"), this.graphHeight.get("value"));
				this.array[i][this.chartIndex].axes["x"].max = this.graphMaxX.get('value');
				if(this.array[i][this.expressionIndex].get("value")==""){
					this.setStatus(i, "Error");
					return;
				}
				var func;
				var yEquals = (this.array[i][this.functionMode]=="y=");
				if(this.array[i][this.expressionIndex].get("value")!=this.array[i][this.evaluatedExpression]){
					var args = 'x';
					if(!yEquals){
						args = 'y';
					}
					func = that.executor.Function('', args, "return "+this.array[i][this.expressionIndex].get('value'));
					this.array[i][this.evaluatedExpression] = this.array[i][this.expressionIndex].value;
					this.array[i][this.functionRef] = func;
				}
				else{
					func = this.array[i][this.functionRef];
				}
				var pickedColor = this.array[i][this.colorIndex].get("value");
				if(!pickedColor){
					pickedColor = 'black';
				}
				dojox.calc.Grapher.draw(this.array[i][this.chartIndex], func, {graphNumber:this.array[i][this.funcNumberIndex], fOfX:yEquals, color:{stroke:{color:pickedColor}}});
				this.setStatus(i, "Drawn");
			},
			onDraw:function(){
				for(var i = 0; i < this.rowCount; i++){
					if((!this.dirty && this.array[i][this.checkboxIndex].get("checked")) || (this.dirty && this.array[i][this.statusIndex].innerHTML=="Drawn")){
						this.drawOne(i);
					}else{
						this.array[i][this.chartIndex].resize(this.graphWidth.get("value"), this.graphHeight.get("value"));
						this.array[i][this.chartIndex].axes["x"].max = this.graphMaxX.get('value');
					}
				}

				var bufferY = dojo.position(this.outerDiv).y-dojo.position(this.myPane.domNode).y;
				bufferY*=2;
				bufferY=Math.abs(bufferY);
				var height = "" + Math.max(parseInt(this.graphHeight.get('value'))+50, this.outerDiv.scrollHeight+bufferY);
				var width = "" + (parseInt(this.graphWidth.get('value')) + this.outerDiv.scrollWidth);
				this.myPane.resize({w:width, h:height});
			}
		}, d);
		this.aFloatingPane.set('content', this.grapher);
		this.aFloatingPane.startup();
		this.aFloatingPane.bringToTop();
	}
});

}
