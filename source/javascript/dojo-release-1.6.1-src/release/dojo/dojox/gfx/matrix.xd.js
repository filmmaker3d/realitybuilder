/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.gfx.matrix"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.gfx.matrix"]){_4._hasResource["dojox.gfx.matrix"]=true;_4.provide("dojox.gfx.matrix");(function(){var m=_6.gfx.matrix;var _7={};m._degToRad=function(_8){return _7[_8]||(_7[_8]=(Math.PI*_8/180));};m._radToDeg=function(_9){return _9/Math.PI*180;};m.Matrix2D=function(_a){if(_a){if(typeof _a=="number"){this.xx=this.yy=_a;}else{if(_a instanceof Array){if(_a.length>0){var _b=m.normalize(_a[0]);for(var i=1;i<_a.length;++i){var l=_b,r=_6.gfx.matrix.normalize(_a[i]);_b=new m.Matrix2D();_b.xx=l.xx*r.xx+l.xy*r.yx;_b.xy=l.xx*r.xy+l.xy*r.yy;_b.yx=l.yx*r.xx+l.yy*r.yx;_b.yy=l.yx*r.xy+l.yy*r.yy;_b.dx=l.xx*r.dx+l.xy*r.dy+l.dx;_b.dy=l.yx*r.dx+l.yy*r.dy+l.dy;}_4.mixin(this,_b);}}else{_4.mixin(this,_a);}}}};_4.extend(m.Matrix2D,{xx:1,xy:0,yx:0,yy:1,dx:0,dy:0});_4.mixin(m,{identity:new m.Matrix2D(),flipX:new m.Matrix2D({xx:-1}),flipY:new m.Matrix2D({yy:-1}),flipXY:new m.Matrix2D({xx:-1,yy:-1}),translate:function(a,b){if(arguments.length>1){return new m.Matrix2D({dx:a,dy:b});}return new m.Matrix2D({dx:a.x,dy:a.y});},scale:function(a,b){if(arguments.length>1){return new m.Matrix2D({xx:a,yy:b});}if(typeof a=="number"){return new m.Matrix2D({xx:a,yy:a});}return new m.Matrix2D({xx:a.x,yy:a.y});},rotate:function(_c){var c=Math.cos(_c);var s=Math.sin(_c);return new m.Matrix2D({xx:c,xy:-s,yx:s,yy:c});},rotateg:function(_d){return m.rotate(m._degToRad(_d));},skewX:function(_e){return new m.Matrix2D({xy:Math.tan(_e)});},skewXg:function(_f){return m.skewX(m._degToRad(_f));},skewY:function(_10){return new m.Matrix2D({yx:Math.tan(_10)});},skewYg:function(_11){return m.skewY(m._degToRad(_11));},reflect:function(a,b){if(arguments.length==1){b=a.y;a=a.x;}var a2=a*a,b2=b*b,n2=a2+b2,xy=2*a*b/n2;return new m.Matrix2D({xx:2*a2/n2-1,xy:xy,yx:xy,yy:2*b2/n2-1});},project:function(a,b){if(arguments.length==1){b=a.y;a=a.x;}var a2=a*a,b2=b*b,n2=a2+b2,xy=a*b/n2;return new m.Matrix2D({xx:a2/n2,xy:xy,yx:xy,yy:b2/n2});},normalize:function(_12){return (_12 instanceof m.Matrix2D)?_12:new m.Matrix2D(_12);},clone:function(_13){var obj=new m.Matrix2D();for(var i in _13){if(typeof (_13[i])=="number"&&typeof (obj[i])=="number"&&obj[i]!=_13[i]){obj[i]=_13[i];}}return obj;},invert:function(_14){var M=m.normalize(_14),D=M.xx*M.yy-M.xy*M.yx,M=new m.Matrix2D({xx:M.yy/D,xy:-M.xy/D,yx:-M.yx/D,yy:M.xx/D,dx:(M.xy*M.dy-M.yy*M.dx)/D,dy:(M.yx*M.dx-M.xx*M.dy)/D});return M;},_multiplyPoint:function(_15,x,y){return {x:_15.xx*x+_15.xy*y+_15.dx,y:_15.yx*x+_15.yy*y+_15.dy};},multiplyPoint:function(_16,a,b){var M=m.normalize(_16);if(typeof a=="number"&&typeof b=="number"){return m._multiplyPoint(M,a,b);}return m._multiplyPoint(M,a.x,a.y);},multiply:function(_17){var M=m.normalize(_17);for(var i=1;i<arguments.length;++i){var l=M,r=m.normalize(arguments[i]);M=new m.Matrix2D();M.xx=l.xx*r.xx+l.xy*r.yx;M.xy=l.xx*r.xy+l.xy*r.yy;M.yx=l.yx*r.xx+l.yy*r.yx;M.yy=l.yx*r.xy+l.yy*r.yy;M.dx=l.xx*r.dx+l.xy*r.dy+l.dx;M.dy=l.yx*r.dx+l.yy*r.dy+l.dy;}return M;},_sandwich:function(_18,x,y){return m.multiply(m.translate(x,y),_18,m.translate(-x,-y));},scaleAt:function(a,b,c,d){switch(arguments.length){case 4:return m._sandwich(m.scale(a,b),c,d);case 3:if(typeof c=="number"){return m._sandwich(m.scale(a),b,c);}return m._sandwich(m.scale(a,b),c.x,c.y);}return m._sandwich(m.scale(a),b.x,b.y);},rotateAt:function(_19,a,b){if(arguments.length>2){return m._sandwich(m.rotate(_19),a,b);}return m._sandwich(m.rotate(_19),a.x,a.y);},rotategAt:function(_1a,a,b){if(arguments.length>2){return m._sandwich(m.rotateg(_1a),a,b);}return m._sandwich(m.rotateg(_1a),a.x,a.y);},skewXAt:function(_1b,a,b){if(arguments.length>2){return m._sandwich(m.skewX(_1b),a,b);}return m._sandwich(m.skewX(_1b),a.x,a.y);},skewXgAt:function(_1c,a,b){if(arguments.length>2){return m._sandwich(m.skewXg(_1c),a,b);}return m._sandwich(m.skewXg(_1c),a.x,a.y);},skewYAt:function(_1d,a,b){if(arguments.length>2){return m._sandwich(m.skewY(_1d),a,b);}return m._sandwich(m.skewY(_1d),a.x,a.y);},skewYgAt:function(_1e,a,b){if(arguments.length>2){return m._sandwich(m.skewYg(_1e),a,b);}return m._sandwich(m.skewYg(_1e),a.x,a.y);}});})();_6.gfx.Matrix2D=_6.gfx.matrix.Matrix2D;}}};});