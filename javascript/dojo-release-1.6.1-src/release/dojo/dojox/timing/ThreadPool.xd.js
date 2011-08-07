/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.timing.ThreadPool"],["require","dojox.timing"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.timing.ThreadPool"]){_4._hasResource["dojox.timing.ThreadPool"]=true;_4.provide("dojox.timing.ThreadPool");_4.require("dojox.timing");_4.experimental("dojox.timing.ThreadPool");(function(){var t=_6.timing;t.threadStates={UNSTARTED:"unstarted",STOPPED:"stopped",PENDING:"pending",RUNNING:"running",SUSPENDED:"suspended",WAITING:"waiting",COMPLETE:"complete",ERROR:"error"};t.threadPriorities={LOWEST:1,BELOWNORMAL:2,NORMAL:3,ABOVENORMAL:4,HIGHEST:5};t.Thread=function(fn,_7){var _8=this;this.state=t.threadStates.UNSTARTED;this.priority=_7||t.threadPriorities.NORMAL;this.lastError=null;this.func=fn;this.invoke=function(){_8.state=t.threadStates.RUNNING;try{fn(this);_8.state=t.threadStates.COMPLETE;}catch(e){_8.lastError=e;_8.state=t.threadStates.ERROR;}};};t.ThreadPool=new (function(_9,_a){var _b=this;var _c=_9;var _d=_c;var _e=_a;var _f=Math.floor((_e/2)/_c);var _10=[];var _11=new Array(_c+1);var _12=new _6.timing.Timer();var _13=function(){var _14=_11[0]={};for(var i=0;i<_11.length;i++){window.clearTimeout(_11[i]);var _15=_10.shift();if(typeof (_15)=="undefined"){break;}_14["thread-"+i]=_15;_11[i]=window.setTimeout(_15.invoke,(_f*i));}_d=_c-(i-1);};this.getMaxThreads=function(){return _c;};this.getAvailableThreads=function(){return _d;};this.getTickInterval=function(){return _e;};this.queueUserWorkItem=function(fn){var _16=fn;if(_16 instanceof Function){_16=new t.Thread(_16);}var idx=_10.length;for(var i=0;i<_10.length;i++){if(_10[i].priority<_16.priority){idx=i;break;}}if(idx<_10.length){_10.splice(idx,0,_16);}else{_10.push(_16);}return true;};this.removeQueuedUserWorkItem=function(_17){if(_17 instanceof Function){var idx=-1;for(var i=0;i<_10.length;i++){if(_10[i].func==_17){idx=i;break;}}if(idx>-1){_10.splice(idx,1);return true;}return false;}var idx=-1;for(var i=0;i<_10.length;i++){if(_10[i]==_17){idx=i;break;}}if(idx>-1){_10.splice(idx,1);return true;}return false;};this.start=function(){_12.start();};this.stop=function(){_12.stop();};this.abort=function(){this.stop();for(var i=1;i<_11.length;i++){if(_11[i]){window.clearTimeout(_11[i]);}}for(var _18 in _11[0]){this.queueUserWorkItem(_18);}_11[0]={};};this.reset=function(){this.abort();_10=[];};this.sleep=function(_19){_12.stop();window.setTimeout(_12.start,_19);};_12.onTick=_b.invoke;})(16,5000);})();}}};});