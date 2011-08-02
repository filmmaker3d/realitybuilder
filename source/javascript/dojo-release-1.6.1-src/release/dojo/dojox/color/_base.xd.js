/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.color._base"],["require","dojo.colors"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.color._base"]){_4._hasResource["dojox.color._base"]=true;_4.provide("dojox.color._base");_4.require("dojo.colors");_6.color.Color=_4.Color;_6.color.blend=_4.blendColors;_6.color.fromRgb=_4.colorFromRgb;_6.color.fromHex=_4.colorFromHex;_6.color.fromArray=_4.colorFromArray;_6.color.fromString=_4.colorFromString;_6.color.greyscale=_4.colors.makeGrey;_4.mixin(_6.color,{fromCmy:function(_7,_8,_9){if(_4.isArray(_7)){_8=_7[1],_9=_7[2],_7=_7[0];}else{if(_4.isObject(_7)){_8=_7.m,_9=_7.y,_7=_7.c;}}_7/=100,_8/=100,_9/=100;var r=1-_7,g=1-_8,b=1-_9;return new _6.color.Color({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});},fromCmyk:function(_a,_b,_c,_d){if(_4.isArray(_a)){_b=_a[1],_c=_a[2],_d=_a[3],_a=_a[0];}else{if(_4.isObject(_a)){_b=_a.m,_c=_a.y,_d=_a.b,_a=_a.c;}}_a/=100,_b/=100,_c/=100,_d/=100;var r,g,b;r=1-Math.min(1,_a*(1-_d)+_d);g=1-Math.min(1,_b*(1-_d)+_d);b=1-Math.min(1,_c*(1-_d)+_d);return new _6.color.Color({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});},fromHsl:function(_e,_f,_10){if(_4.isArray(_e)){_f=_e[1],_10=_e[2],_e=_e[0];}else{if(_4.isObject(_e)){_f=_e.s,_10=_e.l,_e=_e.h;}}_f/=100;_10/=100;while(_e<0){_e+=360;}while(_e>=360){_e-=360;}var r,g,b;if(_e<120){r=(120-_e)/60,g=_e/60,b=0;}else{if(_e<240){r=0,g=(240-_e)/60,b=(_e-120)/60;}else{r=(_e-240)/60,g=0,b=(360-_e)/60;}}r=2*_f*Math.min(r,1)+(1-_f);g=2*_f*Math.min(g,1)+(1-_f);b=2*_f*Math.min(b,1)+(1-_f);if(_10<0.5){r*=_10,g*=_10,b*=_10;}else{r=(1-_10)*r+2*_10-1;g=(1-_10)*g+2*_10-1;b=(1-_10)*b+2*_10-1;}return new _6.color.Color({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});},fromHsv:function(hue,_11,_12){if(_4.isArray(hue)){_11=hue[1],_12=hue[2],hue=hue[0];}else{if(_4.isObject(hue)){_11=hue.s,_12=hue.v,hue=hue.h;}}if(hue==360){hue=0;}_11/=100;_12/=100;var r,g,b;if(_11==0){r=_12,b=_12,g=_12;}else{var _13=hue/60,i=Math.floor(_13),f=_13-i;var p=_12*(1-_11);var q=_12*(1-(_11*f));var t=_12*(1-(_11*(1-f)));switch(i){case 0:r=_12,g=t,b=p;break;case 1:r=q,g=_12,b=p;break;case 2:r=p,g=_12,b=t;break;case 3:r=p,g=q,b=_12;break;case 4:r=t,g=p,b=_12;break;case 5:r=_12,g=p,b=q;break;}}return new _6.color.Color({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});}});_4.extend(_6.color.Color,{toCmy:function(){var _14=1-(this.r/255),_15=1-(this.g/255),_16=1-(this.b/255);return {c:Math.round(_14*100),m:Math.round(_15*100),y:Math.round(_16*100)};},toCmyk:function(){var _17,_18,_19,_1a;var r=this.r/255,g=this.g/255,b=this.b/255;_1a=Math.min(1-r,1-g,1-b);_17=(1-r-_1a)/(1-_1a);_18=(1-g-_1a)/(1-_1a);_19=(1-b-_1a)/(1-_1a);return {c:Math.round(_17*100),m:Math.round(_18*100),y:Math.round(_19*100),b:Math.round(_1a*100)};},toHsl:function(){var r=this.r/255,g=this.g/255,b=this.b/255;var min=Math.min(r,b,g),max=Math.max(r,g,b);var _1b=max-min;var h=0,s=0,l=(min+max)/2;if(l>0&&l<1){s=_1b/((l<0.5)?(2*l):(2-2*l));}if(_1b>0){if(max==r&&max!=g){h+=(g-b)/_1b;}if(max==g&&max!=b){h+=(2+(b-r)/_1b);}if(max==b&&max!=r){h+=(4+(r-g)/_1b);}h*=60;}return {h:h,s:Math.round(s*100),l:Math.round(l*100)};},toHsv:function(){var r=this.r/255,g=this.g/255,b=this.b/255;var min=Math.min(r,b,g),max=Math.max(r,g,b);var _1c=max-min;var h=null,s=(max==0)?0:(_1c/max);if(s==0){h=0;}else{if(r==max){h=60*(g-b)/_1c;}else{if(g==max){h=120+60*(b-r)/_1c;}else{h=240+60*(r-g)/_1c;}}if(h<0){h+=360;}}return {h:h,s:Math.round(s*100),v:Math.round(max*100)};}});}}};});