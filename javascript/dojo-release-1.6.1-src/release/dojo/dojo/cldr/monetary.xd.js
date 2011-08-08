/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojo.cldr.monetary"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojo.cldr.monetary"]){_4._hasResource["dojo.cldr.monetary"]=true;_4.provide("dojo.cldr.monetary");_4.getObject("cldr.monetary",true,_4);_4.cldr.monetary.getData=function(_7){var _8={ADP:0,AFN:0,ALL:0,AMD:0,BHD:3,BIF:0,BYR:0,CLF:0,CLP:0,COP:0,CRC:0,DJF:0,ESP:0,GNF:0,GYD:0,HUF:0,IDR:0,IQD:0,IRR:3,ISK:0,ITL:0,JOD:3,JPY:0,KMF:0,KPW:0,KRW:0,KWD:3,LAK:0,LBP:0,LUF:0,LYD:3,MGA:0,MGF:0,MMK:0,MNT:0,MRO:0,MUR:0,OMR:3,PKR:0,PYG:0,RSD:0,RWF:0,SLL:0,SOS:0,STD:0,SYP:0,TMM:0,TND:3,TRL:0,TZS:0,UGX:0,UZS:0,VND:0,VUV:0,XAF:0,XOF:0,XPF:0,YER:0,ZMK:0,ZWD:0};var _9={CHF:5};var _a=_8[_7],_b=_9[_7];if(typeof _a=="undefined"){_a=2;}if(typeof _b=="undefined"){_b=0;}return {places:_a,round:_b};};}}};});