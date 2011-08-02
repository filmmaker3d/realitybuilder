/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["realitybuilder.util"]){dojo._hasResource["realitybuilder.util"]=true;dojo.provide("realitybuilder.util");realitybuilder.util.TOLERANCE_S=0.5;realitybuilder.util.TOLERANCE_V=0.00001;realitybuilder.util.TOLERANCE_VXZ=0.00001;realitybuilder.util.blockToWorld=function(pB,_1){var _2=_1.positionSpacingXY(),_3=_1.positionSpacingXY(),_4=_1.positionSpacingZ();return [pB[0]*_2,pB[1]*_3,pB[2]*_4];};realitybuilder.util.intersectionLinePlaneVXZ=function(_5){var _6,p1=_5[0],p2=_5[1];_6=realitybuilder.util.subtractVectors3D(p2,p1);if(Math.abs(_6[1])<realitybuilder.util.TOLERANCE_V){return false;}else{return [p1[0]-p1[1]*_6[0]/_6[1],p1[2]-p1[1]*_6[2]/_6[1]];}};realitybuilder.util.intersectionSegmentLineVXZ=function(_7,_8){var x1=_7[0][0],z1=_7[0][1],x2=_7[1][0],z2=_7[1][1],x3=_8[0][0],y3=_8[0][1],x4=_8[1][0],y4=_8[1][1],u1=(x4-x3)*(z1-y3)-(y4-y3)*(x1-x3),u2=(y4-y3)*(x2-x1)-(x4-x3)*(z2-z1),_9=0.01,u,x,y;if(Math.abs(u2)<_9){return false;}else{u=u1/u2;if(u>-_9&&u<1+_9){x=x1+u*(x2-x1);y=z1+u*(z2-z1);return [x,y];}else{return false;}}};realitybuilder.util.relationPointSegmentVXZ=function(_a,_b){var _c,_d,_e,_f;_f=realitybuilder.util;_c=[0,0];_d=[_c,_a];_e=_f.intersectionSegmentLineVXZ(_b,_d);if(_e===false){return 0;}else{if(_f.pointsIdenticalVXZ(_e,_a)){return 0;}else{return _f.pointIsBetween2D(_a,_c,_e)?-1:1;}}};realitybuilder.util.pointIsBetween2D=function(p,p1,p2){var _10=(p[0]>=p1[0]&&p[0]<=p2[0])||(p[0]<=p1[0]&&p[0]>=p2[0]),_11=(p[1]>=p1[1]&&p[1]<=p2[1])||(p[1]<=p1[1]&&p[1]>=p2[1]);return _10&&_11;};realitybuilder.util.pointsIdentical2D=function(p1,p2,_12){return (Math.abs(p1[0]-p2[0])<_12&&Math.abs(p1[1]-p2[1])<_12);};realitybuilder.util.pointsIdenticalS=function(p1S,p2S){var _13=realitybuilder.util.TOLERANCE_S;return realitybuilder.util.pointsIdentical2D(p1S,p2S,_13);};realitybuilder.util.pointsIdenticalVXZ=function(_14,_15){var _16=realitybuilder.util.TOLERANCE_VXZ;return realitybuilder.util.pointsIdentical2D(_14,_15,_16);};realitybuilder.util.pointsIdenticalB=function(p1B,p2B){return ((p1B[0]-p2B[0])===0&&(p1B[1]-p2B[1])===0&&(p1B[2]-p2B[2])===0);};realitybuilder.util.subtractVectors3D=function(_17,_18){return [_17[0]-_18[0],_17[1]-_18[1],_17[2]-_18[2]];};realitybuilder.util.addVectorsB=function(_19,_1a){return [_19[0]+_1a[0],_19[1]+_1a[1],_19[2]+_1a[2]];};realitybuilder.util.subtractVectorsB=function(_1b,_1c){return [_1b[0]-_1c[0],_1b[1]-_1c[1],_1b[2]-_1c[2]];};realitybuilder.util.withDuplicatesRemoved=function(ps){var _1d=[],i,j,p1,p2,_1e;for(i=0;i<ps.length;i+=1){p1=ps[i];_1e=false;for(j=i+1;j<ps.length;j+=1){p2=ps[j];if(realitybuilder.util.pointsIdenticalS(p1,p2)){_1e=true;break;}}if(!_1e){_1d.push(p1);}}return _1d;};realitybuilder.util.cartesianToPolar=function(pS){var x=pS[0],y=pS[1],_1f=Math.atan2(y,x),_20=Math.sqrt(x*x+y*y);return [_1f,_20];};realitybuilder.util.polarToCartesian=function(_21){var _22=_21[0],_23=_21[1],x=_23*Math.cos(_22),y=_23*Math.sin(_22);return [x,y];};realitybuilder.util.addS=function(p1S,p2S){return [p1S[0]+p2S[0],p1S[1]+p2S[1]];};realitybuilder.util.rotatePointBXY=function(_24,_25,a){var _26,_27,cXB,cYB;if(a%4===0){return _24;}else{cXB=_25[0];cYB=_25[1];_26=_24[0]-cXB;_27=_24[1]-cYB;if(a%4===1){return [Math.round(cXB-_27),Math.round(cYB+_26)];}else{if(a%4===2){return [Math.round(cXB-_26),Math.round(cYB-_27)];}else{return [Math.round(cXB+_27),Math.round(cYB-_26)];}}}};realitybuilder.util.addPrefix=function(_28,_29){var tmp=[],i;for(i in _29){if(_29.hasOwnProperty(i)){tmp[_28.toString()+i.toString()]=_29[i];}}return tmp;};realitybuilder.util.isFlashCanvasActive=function(){return (typeof FlashCanvas!=="undefined");};realitybuilder.util.isFlashReadyForFlashCanvas=function(){return (typeof swfobject!=="undefined")&&swfobject.hasFlashPlayerVersion("9");};realitybuilder.util.isCanvasSupported=function(){return (document.createElement("canvas").getContext||(realitybuilder.util.isFlashCanvasActive()&&realitybuilder.util.isFlashReadyForFlashCanvas()));};realitybuilder.util.showNoCanvasErrorMessage=function(){dojo.attr("noCanvasErrorMessage","innerHTML","<p class=\"first\">The Reality Builder does not work because your "+"browser does not support the <a "+"href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas "+"element</a>.</p>");};realitybuilder.util.showNoImagesErrorMessage=function(){dojo.attr("noImagesErrorMessage","innerHTML","<p class=\"first\">The Reality Builder does not work because your "+"browser does not load images.</p>");};realitybuilder.util.clearCanvas=function(_2a){if(_2a.getContext){var _2b=_2a.getContext("2d");_2b.clearRect(0,0,_2a.width,_2a.height);}};realitybuilder.util.fillCanvas=function(_2c,_2d){if(_2c.getContext){var _2e=_2c.getContext("2d");_2e.fillStyle=_2d;_2e.fillRect(0,0,_2c.width,_2c.height);}};}