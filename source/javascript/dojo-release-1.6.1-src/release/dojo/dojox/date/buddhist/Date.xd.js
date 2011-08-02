/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.date.buddhist.Date"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.date.buddhist.Date"]){_4._hasResource["dojox.date.buddhist.Date"]=true;_4.provide("dojox.date.buddhist.Date");_4.experimental("dojox.date.buddhist.Date");_4.declare("dojox.date.buddhist.Date",null,{_date:0,_month:0,_year:0,_hours:0,_minutes:0,_seconds:0,_milliseconds:0,_day:0,constructor:function(){var _7=arguments.length;if(!_7){this.fromGregorian(new Date());}else{if(_7==1){var _8=arguments[0];if(typeof _8=="number"){_8=new Date(_8);}if(_8 instanceof Date){this.fromGregorian(_8);}else{if(_8==""){this._date=new Date("");}else{this._year=_8._year;this._month=_8._month;this._date=_8._date;this._hours=_8._hours;this._minutes=_8._minutes;this._seconds=_8._seconds;this._milliseconds=_8._milliseconds;}}}else{if(_7>=3){this._year+=arguments[0];this._month+=arguments[1];this._date+=arguments[2];if(this._month>11){console.warn("the month is incorrect , set 0");this._month=0;}this._hours+=arguments[3]||0;this._minutes+=arguments[4]||0;this._seconds+=arguments[5]||0;this._milliseconds+=arguments[6]||0;}}}},getDate:function(_9){return parseInt(this._date);},getMonth:function(){return parseInt(this._month);},getFullYear:function(){return parseInt(this._year);},getHours:function(){return this._hours;},getMinutes:function(){return this._minutes;},getSeconds:function(){return this._seconds;},getMilliseconds:function(){return this._milliseconds;},setDate:function(_a){_a=parseInt(_a);if(_a>0&&_a<=this._getDaysInMonth(this._month,this._year)){this._date=_a;}else{var _b;if(_a>0){for(_b=this._getDaysInMonth(this._month,this._year);_a>_b;_a-=_b,_b=this._getDaysInMonth(this._month,this._year)){this._month++;if(this._month>=12){this._year++;this._month-=12;}}this._date=_a;}else{for(_b=this._getDaysInMonth((this._month-1)>=0?(this._month-1):11,((this._month-1)>=0)?this._year:this._year-1);_a<=0;_b=this._getDaysInMonth((this._month-1)>=0?(this._month-1):11,((this._month-1)>=0)?this._year:this._year-1)){this._month--;if(this._month<0){this._year--;this._month+=12;}_a+=_b;}this._date=_a;}}return this;},setFullYear:function(_c,_d,_e){this._year=parseInt(_c);},setMonth:function(_f){this._year+=Math.floor(_f/12);this._month=Math.floor(_f%12);for(;this._month<0;this._month=this._month+12){}},setHours:function(){var _10=arguments.length;var _11=0;if(_10>=1){_11=parseInt(arguments[0]);}if(_10>=2){this._minutes=parseInt(arguments[1]);}if(_10>=3){this._seconds=parseInt(arguments[2]);}if(_10==4){this._milliseconds=parseInt(arguments[3]);}while(_11>=24){this._date++;var _12=this._getDaysInMonth(this._month,this._year);if(this._date>_12){this._month++;if(this._month>=12){this._year++;this._month-=12;}this._date-=_12;}_11-=24;}this._hours=_11;},setMinutes:function(_13){while(_13>=60){this._hours++;if(this._hours>=24){this._date++;this._hours-=24;var _14=this._getDaysInMonth(this._month,this._year);if(this._date>_14){this._month++;if(this._month>=12){this._year++;this._month-=12;}this._date-=_14;}}_13-=60;}this._minutes=_13;},setSeconds:function(_15){while(_15>=60){this._minutes++;if(this._minutes>=60){this._hours++;this._minutes-=60;if(this._hours>=24){this._date++;this._hours-=24;var _16=this._getDaysInMonth(this._month,this._year);if(this._date>_16){this._month++;if(this._month>=12){this._year++;this._month-=12;}this._date-=_16;}}}_15-=60;}this._seconds=_15;},setMilliseconds:function(_17){while(_17>=1000){this.setSeconds++;if(this.setSeconds>=60){this._minutes++;this.setSeconds-=60;if(this._minutes>=60){this._hours++;this._minutes-=60;if(this._hours>=24){this._date++;this._hours-=24;var _18=this._getDaysInMonth(this._month,this._year);if(this._date>_18){this._month++;if(this._month>=12){this._year++;this._month-=12;}this._date-=_18;}}}}_17-=1000;}this._milliseconds=_17;},toString:function(){return this._date+", "+this._month+", "+this._year+"  "+this._hours+":"+this._minutes+":"+this._seconds;},_getDaysInMonth:function(_19,_1a){return _4.date.getDaysInMonth(new Date(_1a-543,_19));},fromGregorian:function(_1b){var _1c=new Date(_1b);this._date=_1c.getDate();this._month=_1c.getMonth();this._year=_1c.getFullYear()+543;this._hours=_1c.getHours();this._minutes=_1c.getMinutes();this._seconds=_1c.getSeconds();this._milliseconds=_1c.getMilliseconds();this._day=_1c.getDay();return this;},toGregorian:function(){return new Date(this._year-543,this._month,this._date,this._hours,this._minutes,this._seconds,this._milliseconds);},getDay:function(){return this.toGregorian().getDay();}});_6.date.buddhist.Date.prototype.valueOf=function(){return this.toGregorian().valueOf();};}}};});