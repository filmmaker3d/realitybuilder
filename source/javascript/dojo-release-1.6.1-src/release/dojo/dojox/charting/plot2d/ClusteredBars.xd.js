/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.charting.plot2d.ClusteredBars"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Bars"],["require","dojox.lang.functional"],["require","dojox.lang.functional.reversed"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.charting.plot2d.ClusteredBars"]){_4._hasResource["dojox.charting.plot2d.ClusteredBars"]=true;_4.provide("dojox.charting.plot2d.ClusteredBars");_4.require("dojox.charting.plot2d.common");_4.require("dojox.charting.plot2d.Bars");_4.require("dojox.lang.functional");_4.require("dojox.lang.functional.reversed");(function(){var df=_6.lang.functional,dc=_6.charting.plot2d.common,_7=df.lambda("item.purgeGroup()");_4.declare("dojox.charting.plot2d.ClusteredBars",_6.charting.plot2d.Bars,{render:function(_8,_9){if(this.zoom&&!this.isDataDirty()){return this.performZoom(_8,_9);}this.resetEvents();this.dirty=this.isDirty();if(this.dirty){_4.forEach(this.series,_7);this._eventSeries={};this.cleanGroup();var s=this.group;df.forEachRev(this.series,function(_a){_a.cleanGroup(s);});}var t=this.chart.theme,f,_b,_c,_d,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_e=Math.max(0,this._hScaler.bounds.lower),_f=ht(_e),_10=this.events();f=dc.calculateBarSize(this._vScaler.bounds.scale,this.opt,this.series.length);_b=f.gap;_c=_d=f.size;for(var i=this.series.length-1;i>=0;--i){var run=this.series[i],_11=_d*(this.series.length-i-1);if(!this.dirty&&!run.dirty){t.skip();this._reconnectEvents(run.name);continue;}run.cleanGroup();var _12=t.next("bar",[this.opt,run]),s=run.group,_13=new Array(run.data.length);for(var j=0;j<run.data.length;++j){var _14=run.data[j];if(_14!==null){var v=typeof _14=="number"?_14:_14.y,hv=ht(v),_15=hv-_f,w=Math.abs(_15),_16=typeof _14!="number"?t.addMixin(_12,"bar",_14,true):t.post(_12,"bar");if(w>=1&&_c>=1){var _17={x:_9.l+(v<_e?hv:_f),y:_8.height-_9.b-vt(j+1.5)+_b+_11,width:w,height:_c};var _18=this._plotFill(_16.series.fill,_8,_9);_18=this._shapeFill(_18,_17);var _19=s.createRect(_17).setFill(_18).setStroke(_16.series.stroke);run.dyn.fill=_19.getFill();run.dyn.stroke=_19.getStroke();if(_10){var o={element:"bar",index:j,run:run,shape:_19,x:v,y:j+1.5};this._connectEvents(o);_13[j]=o;}if(this.animate){this._animateBar(_19,_9.l+_f,-_15);}}}}this._eventSeries[run.name]=_13;run.dirty=false;}this.dirty=false;return this;}});})();}}};});