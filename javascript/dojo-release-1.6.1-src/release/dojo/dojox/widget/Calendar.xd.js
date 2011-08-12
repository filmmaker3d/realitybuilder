/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.widget.Calendar"],["require","dijit.Calendar"],["require","dijit._Container"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.widget.Calendar"]){_4._hasResource["dojox.widget.Calendar"]=true;_4.provide("dojox.widget.Calendar");_4.experimental("dojox.widget.Calendar");_4.require("dijit.Calendar");_4.require("dijit._Container");_4.declare("dojox.widget._CalendarBase",[_5._Widget,_5._Templated,_5._Container],{templateString:_4.cache("dojox.widget","Calendar/Calendar.html","<div class=\"dojoxCalendar\">\r\n    <div tabindex=\"0\" class=\"dojoxCalendarContainer\" style=\"visibility: visible;\" dojoAttachPoint=\"container\">\r\n\t\t<div style=\"display:none\">\r\n\t\t\t<div dojoAttachPoint=\"previousYearLabelNode\"></div>\r\n\t\t\t<div dojoAttachPoint=\"nextYearLabelNode\"></div>\r\n\t\t\t<div dojoAttachPoint=\"monthLabelSpacer\"></div>\r\n\t\t</div>\r\n        <div class=\"dojoxCalendarHeader\">\r\n            <div>\r\n                <div class=\"dojoxCalendarDecrease\" dojoAttachPoint=\"decrementMonth\"></div>\r\n            </div>\r\n            <div class=\"\">\r\n                <div class=\"dojoxCalendarIncrease\" dojoAttachPoint=\"incrementMonth\"></div>\r\n            </div>\r\n            <div class=\"dojoxCalendarTitle\" dojoAttachPoint=\"header\" dojoAttachEvent=\"onclick: onHeaderClick\">\r\n            </div>\r\n        </div>\r\n        <div class=\"dojoxCalendarBody\" dojoAttachPoint=\"containerNode\"></div>\r\n        <div class=\"\">\r\n            <div class=\"dojoxCalendarFooter\" dojoAttachPoint=\"footer\">                        \r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"),_views:null,useFx:true,widgetsInTemplate:true,value:new Date(),constraints:null,footerFormat:"medium",constructor:function(){this._views=[];this.value=new Date();},postMixInProperties:function(){var c=this.constraints;if(c){var _7=_4.date.stamp.fromISOString;if(typeof c.min=="string"){c.min=_7(c.min);}if(typeof c.max=="string"){c.max=_7(c.max);}}this.value=this.parseInitialValue(this.value);},parseInitialValue:function(_8){if(!_8||_8===-1){return new Date();}else{if(_8.getFullYear){return _8;}else{if(!isNaN(_8)){if(typeof this.value=="string"){_8=parseInt(_8);}_8=this._makeDate(_8);}}}return _8;},_makeDate:function(_9){return _9;},postCreate:function(){this.displayMonth=new Date(this.get("value"));if(this._isInvalidDate(this.displayMonth)){this.displayMonth=new Date();}var _a={parent:this,_getValueAttr:_4.hitch(this,function(){return new Date(this._internalValue||this.value);}),_getDisplayMonthAttr:_4.hitch(this,function(){return new Date(this.displayMonth);}),_getConstraintsAttr:_4.hitch(this,function(){return this.constraints;}),getLang:_4.hitch(this,function(){return this.lang;}),isDisabledDate:_4.hitch(this,this.isDisabledDate),getClassForDate:_4.hitch(this,this.getClassForDate),addFx:this.useFx?_4.hitch(this,this.addFx):function(){}};_4.forEach(this._views,function(_b){var _c=new _b(_a,_4.create("div"));this.addChild(_c);var _d=_c.getHeader();if(_d){this.header.appendChild(_d);_4.style(_d,"display","none");}_4.style(_c.domNode,"visibility","hidden");_4.connect(_c,"onValueSelected",this,"_onDateSelected");_c.set("value",this.get("value"));},this);if(this._views.length<2){_4.style(this.header,"cursor","auto");}this.inherited(arguments);this._children=this.getChildren();this._currentChild=0;var _e=new Date();this.footer.innerHTML="Today: "+_4.date.locale.format(_e,{formatLength:this.footerFormat,selector:"date",locale:this.lang});_4.connect(this.footer,"onclick",this,"goToToday");var _f=this._children[0];_4.style(_f.domNode,"top","0px");_4.style(_f.domNode,"visibility","visible");var _10=_f.getHeader();if(_10){_4.style(_f.getHeader(),"display","");}_4[_f.useHeader?"removeClass":"addClass"](this.container,"no-header");_f.onDisplay();var _11=this;var _12=function(_13,_14,adj){_5.typematic.addMouseListener(_11[_13],_11,function(_15){if(_15>=0){_11._adjustDisplay(_14,adj);}},0.8,500);};_12("incrementMonth","month",1);_12("decrementMonth","month",-1);this._updateTitleStyle();},addFx:function(_16,_17){},_isInvalidDate:function(_18){return !_18||isNaN(_18)||typeof _18!="object"||_18.toString()==this._invalidDate;},_setValueAttr:function(_19){if(!_19){_19=new Date();}if(!_19["getFullYear"]){_19=_4.date.stamp.fromISOString(_19+"");}if(this._isInvalidDate(_19)){return false;}if(!this.value||_4.date.compare(_19,this.value)){_19=new Date(_19);this.displayMonth=new Date(_19);this._internalValue=_19;if(!this.isDisabledDate(_19,this.lang)&&this._currentChild==0){this.value=_19;this.onChange(_19);}if(this._children&&this._children.length>0){this._children[this._currentChild].set("value",this.value);}return true;}return false;},isDisabledDate:function(_1a,_1b){var c=this.constraints;var _1c=_4.date.compare;return c&&(c.min&&(_1c(c.min,_1a,"date")>0)||(c.max&&_1c(c.max,_1a,"date")<0));},onValueSelected:function(_1d){},_onDateSelected:function(_1e,_1f,_20){this.displayMonth=_1e;this.set("value",_1e);if(!this._transitionVert(-1)){if(!_1f&&_1f!==0){_1f=this.get("value");}this.onValueSelected(_1f);}},onChange:function(_21){},onHeaderClick:function(e){this._transitionVert(1);},goToToday:function(){this.set("value",new Date());this.onValueSelected(this.get("value"));},_transitionVert:function(_22){var _23=this._children[this._currentChild];var _24=this._children[this._currentChild+_22];if(!_24){return false;}_4.style(_24.domNode,"visibility","visible");var _25=_4.style(this.containerNode,"height");_24.set("value",this.displayMonth);if(_23.header){_4.style(_23.header,"display","none");}if(_24.header){_4.style(_24.header,"display","");}_4.style(_24.domNode,"top",(_25*-1)+"px");_4.style(_24.domNode,"visibility","visible");this._currentChild+=_22;var _26=_25*_22;var _27=0;_4.style(_24.domNode,"top",(_26*-1)+"px");var _28=_4.animateProperty({node:_23.domNode,properties:{top:_26},onEnd:function(){_4.style(_23.domNode,"visibility","hidden");}});var _29=_4.animateProperty({node:_24.domNode,properties:{top:_27},onEnd:function(){_24.onDisplay();}});_4[_24.useHeader?"removeClass":"addClass"](this.container,"no-header");_28.play();_29.play();_23.onBeforeUnDisplay();_24.onBeforeDisplay();this._updateTitleStyle();return true;},_updateTitleStyle:function(){_4[this._currentChild<this._children.length-1?"addClass":"removeClass"](this.header,"navToPanel");},_slideTable:function(_2a,_2b,_2c){var _2d=_2a.domNode;var _2e=_2d.cloneNode(true);var _2f=_4.style(_2d,"width");_2d.parentNode.appendChild(_2e);_4.style(_2d,"left",(_2f*_2b)+"px");_2c();var _30=_4.animateProperty({node:_2e,properties:{left:_2f*_2b*-1},duration:500,onEnd:function(){_2e.parentNode.removeChild(_2e);}});var _31=_4.animateProperty({node:_2d,properties:{left:0},duration:500});_30.play();_31.play();},_addView:function(_32){this._views.push(_32);},getClassForDate:function(_33,_34){},_adjustDisplay:function(_35,_36,_37){var _38=this._children[this._currentChild];var _39=this.displayMonth=_38.adjustDate(this.displayMonth,_36);this._slideTable(_38,_36,function(){_38.set("value",_39);});}});_4.declare("dojox.widget._CalendarView",_5._Widget,{headerClass:"",useHeader:true,cloneClass:function(_3a,n,_3b){var _3c=_4.query(_3a,this.domNode)[0];var i;if(!_3b){for(i=0;i<n;i++){_3c.parentNode.appendChild(_3c.cloneNode(true));}}else{var _3d=_4.query(_3a,this.domNode)[0];for(i=0;i<n;i++){_3c.parentNode.insertBefore(_3c.cloneNode(true),_3d);}}},_setText:function(_3e,_3f){if(_3e.innerHTML!=_3f){_4.empty(_3e);_3e.appendChild(_4.doc.createTextNode(_3f));}},getHeader:function(){return this.header||(this.header=this.header=_4.create("span",{"class":this.headerClass}));},onValueSelected:function(_40){},adjustDate:function(_41,_42){return _4.date.add(_41,this.datePart,_42);},onDisplay:function(){},onBeforeDisplay:function(){},onBeforeUnDisplay:function(){}});_4.declare("dojox.widget._CalendarDay",null,{parent:null,constructor:function(){this._addView(_6.widget._CalendarDayView);}});_4.declare("dojox.widget._CalendarDayView",[_6.widget._CalendarView,_5._Templated],{templateString:_4.cache("dojox.widget","Calendar/CalendarDay.html","<div class=\"dijitCalendarDayLabels\" style=\"left: 0px;\" dojoAttachPoint=\"dayContainer\">\r\n\t<div dojoAttachPoint=\"header\">\r\n\t\t<div dojoAttachPoint=\"monthAndYearHeader\">\r\n\t\t\t<span dojoAttachPoint=\"monthLabelNode\" class=\"dojoxCalendarMonthLabelNode\"></span>\r\n\t\t\t<span dojoAttachPoint=\"headerComma\" class=\"dojoxCalendarComma\">,</span>\r\n\t\t\t<span dojoAttachPoint=\"yearLabelNode\" class=\"dojoxCalendarDayYearLabel\"></span>\r\n\t\t</div>\r\n\t</div>\r\n\t<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"margin: auto;\">\r\n\t\t<thead>\r\n\t\t\t<tr>\r\n\t\t\t\t<td class=\"dijitCalendarDayLabelTemplate\"><div class=\"dijitCalendarDayLabel\"></div></td>\r\n\t\t\t</tr>\r\n\t\t</thead>\r\n\t\t<tbody dojoAttachEvent=\"onclick: _onDayClick\">\r\n\t\t\t<tr class=\"dijitCalendarWeekTemplate\">\r\n\t\t\t\t<td class=\"dojoxCalendarNextMonth dijitCalendarDateTemplate\">\r\n\t\t\t\t\t<div class=\"dijitCalendarDateLabel\"></div>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t</tbody>\r\n\t</table>\r\n</div>\r\n"),datePart:"month",dayWidth:"narrow",postCreate:function(){this.cloneClass(".dijitCalendarDayLabelTemplate",6);this.cloneClass(".dijitCalendarDateTemplate",6);this.cloneClass(".dijitCalendarWeekTemplate",5);var _43=_4.date.locale.getNames("days",this.dayWidth,"standAlone",this.getLang());var _44=_4.cldr.supplemental.getFirstDayOfWeek(this.getLang());_4.query(".dijitCalendarDayLabel",this.domNode).forEach(function(_45,i){this._setText(_45,_43[(i+_44)%7]);},this);},onDisplay:function(){if(!this._addedFx){this._addedFx=true;this.addFx(".dijitCalendarDateTemplate div",this.domNode);}},_onDayClick:function(e){if(typeof (e.target._date)=="undefined"){return;}var _46=new Date(this.get("displayMonth"));var p=e.target.parentNode;var c="dijitCalendar";var d=_4.hasClass(p,c+"PreviousMonth")?-1:(_4.hasClass(p,c+"NextMonth")?1:0);if(d){_46=_4.date.add(_46,"month",d);}_46.setDate(e.target._date);if(this.isDisabledDate(_46)){_4.stopEvent(e);return;}this.parent._onDateSelected(_46);},_setValueAttr:function(_47){this._populateDays();},_populateDays:function(){var _48=new Date(this.get("displayMonth"));_48.setDate(1);var _49=_48.getDay();var _4a=_4.date.getDaysInMonth(_48);var _4b=_4.date.getDaysInMonth(_4.date.add(_48,"month",-1));var _4c=new Date();var _4d=this.get("value");var _4e=_4.cldr.supplemental.getFirstDayOfWeek(this.getLang());if(_4e>_49){_4e-=7;}var _4f=_4.date.compare;var _50=".dijitCalendarDateTemplate";var _51="dijitCalendarSelectedDate";var _52=this._lastDate;var _53=_52==null||_52.getMonth()!=_48.getMonth()||_52.getFullYear()!=_48.getFullYear();this._lastDate=_48;if(!_53){_4.query(_50,this.domNode).removeClass(_51).filter(function(_54){return _54.className.indexOf("dijitCalendarCurrent")>-1&&_54._date==_4d.getDate();}).addClass(_51);return;}_4.query(_50,this.domNode).forEach(function(_55,i){i+=_4e;var _56=new Date(_48);var _57,_58="dijitCalendar",adj=0;if(i<_49){_57=_4b-_49+i+1;adj=-1;_58+="Previous";}else{if(i>=(_49+_4a)){_57=i-_49-_4a+1;adj=1;_58+="Next";}else{_57=i-_49+1;_58+="Current";}}if(adj){_56=_4.date.add(_56,"month",adj);}_56.setDate(_57);if(!_4f(_56,_4c,"date")){_58="dijitCalendarCurrentDate "+_58;}if(!_4f(_56,_4d,"date")&&!_4f(_56,_4d,"month")&&!_4f(_56,_4d,"year")){_58=_51+" "+_58;}if(this.isDisabledDate(_56,this.getLang())){_58=" dijitCalendarDisabledDate "+_58;}var _59=this.getClassForDate(_56,this.getLang());if(_59){_58=_59+" "+_58;}_55.className=_58+"Month dijitCalendarDateTemplate";_55.dijitDateValue=_56.valueOf();var _5a=_4.query(".dijitCalendarDateLabel",_55)[0];this._setText(_5a,_56.getDate());_5a._date=_5a.parentNode._date=_56.getDate();},this);var _5b=_4.date.locale.getNames("months","wide","standAlone",this.getLang());this._setText(this.monthLabelNode,_5b[_48.getMonth()]);this._setText(this.yearLabelNode,_48.getFullYear());}});_4.declare("dojox.widget._CalendarMonthYear",null,{constructor:function(){this._addView(_6.widget._CalendarMonthYearView);}});_4.declare("dojox.widget._CalendarMonthYearView",[_6.widget._CalendarView,_5._Templated],{templateString:_4.cache("dojox.widget","Calendar/CalendarMonthYear.html","<div class=\"dojoxCal-MY-labels\" style=\"left: 0px;\"\t\r\n\tdojoAttachPoint=\"myContainer\" dojoAttachEvent=\"onclick: onClick\">\r\n\t\t<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"margin: auto;\">\r\n\t\t\t\t<tbody>\r\n\t\t\t\t\t\t<tr class=\"dojoxCal-MY-G-Template\">\r\n\t\t\t\t\t\t\t\t<td class=\"dojoxCal-MY-M-Template\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"dojoxCalendarMonthLabel\"></div>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td class=\"dojoxCal-MY-M-Template\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"dojoxCalendarMonthLabel\"></div>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td class=\"dojoxCal-MY-Y-Template\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"dojoxCalendarYearLabel\"></div>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td class=\"dojoxCal-MY-Y-Template\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"dojoxCalendarYearLabel\"></div>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t </tr>\r\n\t\t\t\t\t\t <tr class=\"dojoxCal-MY-btns\">\r\n\t\t\t\t\t\t \t <td class=\"dojoxCal-MY-btns\" colspan=\"4\">\r\n\t\t\t\t\t\t \t\t <span class=\"dijitReset dijitInline dijitButtonNode ok-btn\" dojoAttachEvent=\"onclick: onOk\" dojoAttachPoint=\"okBtn\">\r\n\t\t\t\t\t\t \t \t \t <button\tclass=\"dijitReset dijitStretch dijitButtonContents\">OK</button>\r\n\t\t\t\t\t\t\t\t </span>\r\n\t\t\t\t\t\t\t\t <span class=\"dijitReset dijitInline dijitButtonNode cancel-btn\" dojoAttachEvent=\"onclick: onCancel\" dojoAttachPoint=\"cancelBtn\">\r\n\t\t\t\t\t\t \t \t\t <button\tclass=\"dijitReset dijitStretch dijitButtonContents\">Cancel</button>\r\n\t\t\t\t\t\t\t\t </span>\r\n\t\t\t\t\t\t \t </td>\r\n\t\t\t\t\t\t </tr>\r\n\t\t\t\t</tbody>\r\n\t\t</table>\r\n</div>\r\n"),datePart:"year",displayedYears:10,useHeader:false,postCreate:function(){this.cloneClass(".dojoxCal-MY-G-Template",5,".dojoxCal-MY-btns");this.monthContainer=this.yearContainer=this.myContainer;var _5c="dojoxCalendarYearLabel";var _5d="dojoxCalendarDecrease";var _5e="dojoxCalendarIncrease";_4.query("."+_5c,this.myContainer).forEach(function(_5f,idx){var _60=_5e;switch(idx){case 0:_60=_5d;case 1:_4.removeClass(_5f,_5c);_4.addClass(_5f,_60);break;}});this._decBtn=_4.query("."+_5d,this.myContainer)[0];this._incBtn=_4.query("."+_5e,this.myContainer)[0];_4.query(".dojoxCal-MY-M-Template",this.domNode).filter(function(_61){return _61.cellIndex==1;}).addClass("dojoxCal-MY-M-last");_4.connect(this,"onBeforeDisplay",_4.hitch(this,function(){this._cachedDate=new Date(this.get("value").getTime());this._populateYears(this._cachedDate.getFullYear());this._populateMonths();this._updateSelectedMonth();this._updateSelectedYear();}));_4.connect(this,"_populateYears",_4.hitch(this,function(){this._updateSelectedYear();}));_4.connect(this,"_populateMonths",_4.hitch(this,function(){this._updateSelectedMonth();}));this._cachedDate=this.get("value");this._populateYears();this._populateMonths();this.addFx(".dojoxCalendarMonthLabel,.dojoxCalendarYearLabel ",this.myContainer);},_setValueAttr:function(_62){if(_62&&_62.getFullYear()){this._populateYears(_62.getFullYear());}},getHeader:function(){return null;},_getMonthNames:function(_63){this._monthNames=this._monthNames||_4.date.locale.getNames("months",_63,"standAlone",this.getLang());return this._monthNames;},_populateMonths:function(){var _64=this._getMonthNames("abbr");_4.query(".dojoxCalendarMonthLabel",this.monthContainer).forEach(_4.hitch(this,function(_65,cnt){this._setText(_65,_64[cnt]);}));var _66=this.get("constraints");if(_66){var _67=new Date();_67.setFullYear(this._year);var min=-1,max=12;if(_66.min){var _68=_66.min.getFullYear();if(_68>this._year){min=12;}else{if(_68==this._year){min=_66.min.getMonth();}}}if(_66.max){var _69=_66.max.getFullYear();if(_69<this._year){max=-1;}else{if(_69==this._year){max=_66.max.getMonth();}}}_4.query(".dojoxCalendarMonthLabel",this.monthContainer).forEach(_4.hitch(this,function(_6a,cnt){_4[(cnt<min||cnt>max)?"addClass":"removeClass"](_6a,"dijitCalendarDisabledDate");}));}var h=this.getHeader();if(h){this._setText(this.getHeader(),this.get("value").getFullYear());}},_populateYears:function(_6b){var _6c=this.get("constraints");var _6d=_6b||this.get("value").getFullYear();var _6e=_6d-Math.floor(this.displayedYears/2);var min=_6c&&_6c.min?_6c.min.getFullYear():_6e-10000;_6e=Math.max(min,_6e);this._displayedYear=_6d;var _6f=_4.query(".dojoxCalendarYearLabel",this.yearContainer);var max=_6c&&_6c.max?_6c.max.getFullYear()-_6e:_6f.length;var _70="dijitCalendarDisabledDate";_6f.forEach(_4.hitch(this,function(_71,cnt){if(cnt<=max){this._setText(_71,_6e+cnt);_4.removeClass(_71,_70);}else{_4.addClass(_71,_70);}}));if(this._incBtn){_4[max<_6f.length?"addClass":"removeClass"](this._incBtn,_70);}if(this._decBtn){_4[min>=_6e?"addClass":"removeClass"](this._decBtn,_70);}var h=this.getHeader();if(h){this._setText(this.getHeader(),_6e+" - "+(_6e+11));}},_updateSelectedYear:function(){this._year=String((this._cachedDate||this.get("value")).getFullYear());this._updateSelectedNode(".dojoxCalendarYearLabel",_4.hitch(this,function(_72,idx){return this._year!==null&&_72.innerHTML==this._year;}));},_updateSelectedMonth:function(){var _73=(this._cachedDate||this.get("value")).getMonth();this._month=_73;this._updateSelectedNode(".dojoxCalendarMonthLabel",function(_74,idx){return idx==_73;});},_updateSelectedNode:function(_75,_76){var sel="dijitCalendarSelectedDate";_4.query(_75,this.domNode).forEach(function(_77,idx,_78){_4[_76(_77,idx,_78)?"addClass":"removeClass"](_77.parentNode,sel);});var _79=_4.query(".dojoxCal-MY-M-Template div",this.myContainer).filter(function(_7a){return _4.hasClass(_7a.parentNode,sel);})[0];if(!_79){return;}var _7b=_4.hasClass(_79,"dijitCalendarDisabledDate");_4[_7b?"addClass":"removeClass"](this.okBtn,"dijitDisabled");},onClick:function(evt){var _7c;var _7d=this;var sel="dijitCalendarSelectedDate";function hc(c){return _4.hasClass(evt.target,c);};if(hc("dijitCalendarDisabledDate")){_4.stopEvent(evt);return false;}if(hc("dojoxCalendarMonthLabel")){_7c="dojoxCal-MY-M-Template";this._month=evt.target.parentNode.cellIndex+(evt.target.parentNode.parentNode.rowIndex*2);this._cachedDate.setMonth(this._month);this._updateSelectedMonth();}else{if(hc("dojoxCalendarYearLabel")){_7c="dojoxCal-MY-Y-Template";this._year=Number(evt.target.innerHTML);this._cachedDate.setYear(this._year);this._populateMonths();this._updateSelectedYear();}else{if(hc("dojoxCalendarDecrease")){this._populateYears(this._displayedYear-10);return true;}else{if(hc("dojoxCalendarIncrease")){this._populateYears(this._displayedYear+10);return true;}else{return true;}}}}_4.stopEvent(evt);return false;},onOk:function(evt){_4.stopEvent(evt);if(_4.hasClass(this.okBtn,"dijitDisabled")){return false;}this.onValueSelected(this._cachedDate);return false;},onCancel:function(evt){_4.stopEvent(evt);this.onValueSelected(this.get("value"));return false;}});_4.declare("dojox.widget.Calendar2Pane",[_6.widget._CalendarBase,_6.widget._CalendarDay,_6.widget._CalendarMonthYear],{});_4.declare("dojox.widget.Calendar",[_6.widget._CalendarBase,_6.widget._CalendarDay,_6.widget._CalendarMonthYear],{});_4.declare("dojox.widget.DailyCalendar",[_6.widget._CalendarBase,_6.widget._CalendarDay],{_makeDate:function(_7e){var now=new Date();now.setDate(_7e);return now;}});_4.declare("dojox.widget.MonthAndYearlyCalendar",[_6.widget._CalendarBase,_6.widget._CalendarMonthYear],{});}}};});