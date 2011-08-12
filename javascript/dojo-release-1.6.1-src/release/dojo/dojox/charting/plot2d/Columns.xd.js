/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.charting.plot2d.Columns"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Base"],["require","dojox.gfx.fx"],["require","dojox.lang.utils"],["require","dojox.lang.functional"],["require","dojox.lang.functional.reversed"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.charting.plot2d.Columns"]){_4._hasResource["dojox.charting.plot2d.Columns"]=true;_4.provide("dojox.charting.plot2d.Columns");_4.require("dojox.charting.plot2d.common");_4.require("dojox.charting.plot2d.Base");_4.require("dojox.gfx.fx");_4.require("dojox.lang.utils");_4.require("dojox.lang.functional");_4.require("dojox.lang.functional.reversed");(function(){var df=_6.lang.functional,du=_6.lang.utils,dc=_6.charting.plot2d.common,_7=df.lambda("item.purgeGroup()");_4.declare("dojox.charting.plot2d.Columns",_6.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:0,animate:null},optionalParams:{minBarSize:1,maxBarSize:1,stroke:{},outline:{},shadow:{},fill:{},font:"",fontColor:""},constructor:function(_8,_9){this.opt=_4.clone(this.defaultParams);du.updateWithObject(this.opt,_9);du.updateWithPattern(this.opt,_9,this.optionalParams);this.series=[];this.hAxis=this.opt.hAxis;this.vAxis=this.opt.vAxis;this.animate=this.opt.animate;},getSeriesStats:function(){var _a=dc.collectSimpleStats(this.series);_a.hmin-=0.5;_a.hmax+=0.5;return _a;},render:function(_b,_c){if(this.zoom&&!this.isDataDirty()){return this.performZoom(_b,_c);}this.resetEvents();this.dirty=this.isDirty();if(this.dirty){_4.forEach(this.series,_7);this._eventSeries={};this.cleanGroup();var s=this.group;df.forEachRev(this.series,function(_d){_d.cleanGroup(s);});}var t=this.chart.theme,f,_e,_f,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_10=Math.max(0,this._vScaler.bounds.lower),_11=vt(_10),_12=this.events();f=dc.calculateBarSize(this._hScaler.bounds.scale,this.opt);_e=f.gap;_f=f.size;for(var i=this.series.length-1;i>=0;--i){var run=this.series[i];if(!this.dirty&&!run.dirty){t.skip();this._reconnectEvents(run.name);continue;}run.cleanGroup();var _13=t.next("column",[this.opt,run]),s=run.group,_14=new Array(run.data.length);for(var j=0;j<run.data.length;++j){var _15=run.data[j];if(_15!==null){var v=typeof _15=="number"?_15:_15.y,vv=vt(v),_16=vv-_11,h=Math.abs(_16),_17=typeof _15!="number"?t.addMixin(_13,"column",_15,true):t.post(_13,"column");if(_f>=1&&h>=1){var _18={x:_c.l+ht(j+0.5)+_e,y:_b.height-_c.b-(v>_10?vv:_11),width:_f,height:h};var _19=this._plotFill(_17.series.fill,_b,_c);_19=this._shapeFill(_19,_18);var _1a=s.createRect(_18).setFill(_19).setStroke(_17.series.stroke);run.dyn.fill=_1a.getFill();run.dyn.stroke=_1a.getStroke();if(_12){var o={element:"column",index:j,run:run,shape:_1a,x:j+0.5,y:v};this._connectEvents(o);_14[j]=o;}if(this.animate){this._animateColumn(_1a,_b.height-_c.b-_11,h);}}}}this._eventSeries[run.name]=_14;run.dirty=false;}this.dirty=false;return this;},_animateColumn:function(_1b,_1c,_1d){_6.gfx.fx.animateTransform(_4.delegate({shape:_1b,duration:1200,transform:[{name:"translate",start:[0,_1c-(_1c/_1d)],end:[0,0]},{name:"scale",start:[1,1/_1d],end:[1,1]},{name:"original"}]},this.animate)).play();}});})();}}};});