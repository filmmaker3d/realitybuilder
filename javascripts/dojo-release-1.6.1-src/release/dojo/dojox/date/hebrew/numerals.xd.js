/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.date.hebrew.numerals"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.date.hebrew.numerals"]){_4._hasResource["dojox.date.hebrew.numerals"]=true;_4.provide("dojox.date.hebrew.numerals");(function(){var _7="אבגדהוזחט";var _8="יכלמנסעפצ";var _9="קרשת";var _a=function(_b,_c){_b=_b.replace("יה","טו").replace("יו","טז");if(!_c){var _d=_b.length;if(_d>1){_b=_b.substr(0,_d-1)+"\""+_b.charAt(_d-1);}else{_b+="׳";}}return _b;};var _e=function(_f){var num=0;_4.forEach(_f,function(ch){var i;if((i=_7.indexOf(ch))!=-1){num+=++i;}else{if((i=_8.indexOf(ch))!=-1){num+=10*++i;}else{if((i=_9.indexOf(ch))!=-1){num+=100*++i;}}}});return num;};var _10=function(num){var str="",n=4,j=9;while(num){if(num>=n*100){str+=_9.charAt(n-1);num-=n*100;continue;}else{if(n>1){n--;continue;}else{if(num>=j*10){str+=_8.charAt(j-1);num-=j*10;}else{if(j>1){j--;continue;}else{if(num>0){str+=_7.charAt(num-1);num=0;}}}}}}return str;};_6.date.hebrew.numerals.getYearHebrewLetters=function(_11){var rem=_11%1000;return _a(_10(rem));};_6.date.hebrew.numerals.parseYearHebrewLetters=function(_12){return _e(_12)+5000;};_6.date.hebrew.numerals.getDayHebrewLetters=function(day,_13){return _a(_10(day),_13);};_6.date.hebrew.numerals.parseDayHebrewLetters=function(day){return _e(day);};_6.date.hebrew.numerals.getMonthHebrewLetters=function(_14){return _a(_10(_14+1));};_6.date.hebrew.numerals.parseMonthHebrewLetters=function(_15){var _16=_6.date.hebrew.numerals.parseDayHebrewLetters(_15)-1;if(_16==-1||_16>12){throw new Error("The month name is incorrect , month = "+_16);}return _16;};})();}}};});