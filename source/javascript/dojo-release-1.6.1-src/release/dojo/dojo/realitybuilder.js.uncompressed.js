/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

if(!dojo._hasResource["dojox.math._base"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.math._base"] = true;
dojo.provide("dojox.math._base");


dojo.getObject("math", true, dojox);

(function(){
	var m = dojox.math;
	dojo.mixin(dojox.math, {
		toRadians: function(/* Number */n){
			//	summary:
			//		Convert the passed number to radians.
			return (n*Math.PI)/180;	// Number
		},
		toDegrees: function(/* Number */n){
			//	summary:
			//		Convert the passed number to degrees.
			return (n*180)/Math.PI;	//	Number
		},
		degreesToRadians: function(/* Number */n){
			//	summary:
			//		Deprecated.  Use dojox.math.toRadians.
			return m.toRadians(n);	// Number
		},
		radiansToDegrees: function(/* Number */n){
			//	summary:
			//		Deprecated.  Use dojox.math.toDegrees.
			return m.toDegrees(n);	//	Number
		},

		_gamma: function(z){
			//	summary:
			//		Compute the gamma function for the passed number.
			//		Approximately 14 dijits of precision with non-integers.
			var answer = 1; // 0!
			// gamma(n+1) = n * gamma(n)
			while (--z >= 1){
				answer *= z;
			}
			if(z == 0){ return answer; } // normal integer quick return
			if(Math.floor(z) == z){ return NaN; } // undefined at nonpositive integers since sin() below will return 0
			// assert: z < 1, remember this z is really z-1
			if(z == -0.5){ return Math.sqrt(Math.PI); } // popular gamma(1/2)
			if(z < -0.5){ // remember this z is really z-1
				return Math.PI / (Math.sin(Math.PI * (z + 1)) * this._gamma(-z)); // reflection
			}
			// assert: -0.5 < z < 1
			// Spouge approximation algorithm
			var a = 13;
			// c[0] = sqrt(2*PI) / exp(a)
			// var kfact = 1
			// for (var k=1; k < a; k++){
			//      c[k] = pow(-k + a, k - 0.5) * exp(-k) / kfact
			//      kfact *= -k  // (-1)^(k-1) * (k-1)!
			// }
			var c = [ // precomputed from the above algorithm
					 5.6658056015186327e-6,
					 1.2743717663379679,
					-4.9374199093155115,
					 7.8720267032485961,
					-6.6760503749436087,
					 3.2525298444485167,
					-9.1852521441026269e-1,
					 1.4474022977730785e-1,
					-1.1627561382389853e-2,
					 4.0117980757066622e-4,
					-4.2652458386405744e-6,
					 6.6651913290336086e-9,
					-1.5392547381874824e-13
				];
			var sum = c[0];
			for (var k=1; k < a; k++){
				sum += c[k] / (z + k);
			}
			return answer * Math.pow(z + a, z + 0.5) / Math.exp(z) * sum;
		},

		factorial: function(/* Number */n){
			//	summary:
			//		Return the factorial of n
			return this._gamma(n+1);	// Number
		},

		permutations: function(/* Number */n, /* Number */k){
			//	summary:
			//	TODO
			if(n==0 || k==0){
				return 1; 	// Number
			}
			return this.factorial(n) / this.factorial(n-k);
		},

		combinations: function(/* Number */n, /* Number */r){
			//	summary:
			//	TODO
			if(n==0 || r==0){
				return 1; 	//	Number
			}
			return this.factorial(n) / (this.factorial(n-r) * this.factorial(r));	// Number
		},

		bernstein: function(/* Number */t, /* Number */n, /* Number */ i){
			//	summary:
			//	TODO
			return this.combinations(n, i) * Math.pow(t, i) * Math.pow(1-t, n-i);	//	Number
		},

		gaussian: function(){
			//	summary:
			//		Return a random number based on the Gaussian algo.
			var k=2;
			do{
				var i=2*Math.random()-1;
				var j=2*Math.random()-1;
				k = i*i+j*j;
			}while(k>=1);
			return i * Math.sqrt((-2*Math.log(k))/k);	//	Number
		},

		//	create a range of numbers
		range: function(/* Number */a, /* Number? */b, /* Number? */step){
			//	summary:
			//		Create a range of numbers based on the parameters.
			if(arguments.length<2){
				b=a,a=0;
			}
			var range=[], s=step||1, i;
			if(s>0){
				for(i=a; i<b; i+=s){
					range.push(i);
				}
			}else{
				if(s<0){
					for(i=a; i>b; i+=s){
						range.push(i);
					}
				}else{
					throw new Error("dojox.math.range: step must not be zero.");
				}
			}
			return range; 	// Array
		},

		distance: function(/* Array */a, /* Array */b){
			//	summary:
			//		Calculate the distance between point A and point B
			return Math.sqrt(Math.pow(b[0]-a[0],2)+Math.pow(b[1]-a[1],2));	//	Number
		},

		midpoint: function(/* Array */a, /* Array */b){
			//	summary:
			//		Calculate the midpoint between points A and B.  A and B may be multidimensional.
			if(a.length!=b.length){
				console.error("dojox.math.midpoint: Points A and B are not the same dimensionally.", a, b);
			}
			var m=[];
			for(var i=0; i<a.length; i++){
				m[i]=(a[i]+b[i])/2;
			}
			return m;	//	Array
		}
	});
})();

}

if(!dojo._hasResource["dojox.math"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.math"] = true;
dojo.provide("dojox.math");



dojo.getObject("math", true, dojox);

}

if(!dojo._hasResource["dojox.math.matrix"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.math.matrix"] = true;
dojo.provide("dojox.math.matrix");


dojo.getObject("math.matrix", true, dojox);

dojo.mixin(dojox.math.matrix, {
	iDF:0,
	ALMOST_ZERO: 1e-10,
	multiply: function(/* Array */a, /* Array */b){
		//	summary
		//	Multiply matrix a by matrix b.
		var ay=a.length, ax=a[0].length, by=b.length, bx=b[0].length;
		if(ax!=by){
			console.warn("Can't multiply matricies of sizes " + ax + "," + ay + " and " + bx + "," + by);
			return [[0]];
		}
		var c=[];
		for (var k=0; k<ay; k++) {
			c[k]=[];
			for(var i=0; i<bx; i++){
				c[k][i]=0;
				for(var m=0; m<ax; m++){
					c[k][i]+=a[k][m]*b[m][i];
				}
			}
		}
		return c;	//	Array
	},
	product: function(/* Array... */){
		//	summary
		//	Return the product of N matrices
		if (arguments.length==0){
			console.warn("can't multiply 0 matrices!");
			return 1;
		}
		var m=arguments[0];
		for(var i=1; i<arguments.length; i++){
			m=this.multiply(m, arguments[i]);
		}
		return m;	//	Array
	},
	sum: function(/* Array... */){
		//	summary
		//	Return the sum of N matrices
		if(arguments.length==0){
			console.warn("can't sum 0 matrices!");
			return 0;	//	Number
		}
		var m=this.copy(arguments[0]);
		var rows=m.length;
		if(rows==0){
			console.warn("can't deal with matrices of 0 rows!");
			return 0;
		}
		var cols=m[0].length;
		if(cols==0){
			console.warn("can't deal with matrices of 0 cols!");
			return 0;
		}
		for(var i=1; i<arguments.length; ++i){
			var arg=arguments[i];
			if(arg.length!=rows || arg[0].length!=cols){
				console.warn("can't add matrices of different dimensions: first dimensions were " + rows + "x" + cols + ", current dimensions are " + arg.length + "x" + arg[0].length);
				return 0;
			}
			for(var r=0; r<rows; r++) {
				for(var c=0; c<cols; c++) {
					m[r][c]+=arg[r][c];
				}
			}
		}
		return m;	//	Array
	},
	inverse: function(/* Array */a){
		//	summary
		//	Return the inversion of the passed matrix
		if(a.length==1 && a[0].length==1){
			return [[1/a[0][0]]];	//	Array
		}
		var tms=a.length, m=this.create(tms, tms), mm=this.adjoint(a), det=this.determinant(a), dd=0;
		if(det==0){
			console.warn("Determinant Equals 0, Not Invertible.");
			return [[0]];
		}else{
			dd=1/det;
		}
		for(var i=0; i<tms; i++) {
			for (var j=0; j<tms; j++) {
				m[i][j]=dd*mm[i][j];
			}
		}
		return m;	//	Array
	},
	determinant: function(/* Array */a){
		//	summary
		//	Calculate the determinant of the passed square matrix.
		if(a.length!=a[0].length){
			console.warn("Can't calculate the determinant of a non-squre matrix!");
			return 0;
		}
		var tms=a.length, det=1, b=this.upperTriangle(a);
		for (var i=0; i<tms; i++){
			var bii=b[i][i];
			if (Math.abs(bii)<this.ALMOST_ZERO) {
				return 0;	//	Number
			}
			det*=bii;
		}
		det*=this.iDF;
		return det;	//	Number
	},
	upperTriangle: function(/* Array */m){
		//	Summary
		//	Find the upper triangle of the passed matrix and return it.
		m=this.copy(m);
		var f1=0, temp=0, tms=m.length, v=1;
		this.iDF=1;
		for(var col=0; col<tms-1; col++){
			if(typeof m[col][col]!="number") {
				console.warn("non-numeric entry found in a numeric matrix: m[" + col + "][" + col + "]=" + m[col][col]);
			}
			v=1;
			var stop_loop=0;
			while((m[col][col] == 0) && !stop_loop){
				if (col+v>=tms){
					this.iDF=0;
					stop_loop=1;
				}else{
					for(var r=0; r<tms; r++){
						temp=m[col][r];
						m[col][r]=m[col+v][r];
						m[col+v][r]=temp;
					}
					v++;
					this.iDF*=-1;
				}
			}
			for(var row=col+1; row<tms; row++){
				if(typeof m[row][col]!="number"){
					console.warn("non-numeric entry found in a numeric matrix: m[" + row + "][" + col + "]=" + m[row][col]);
				}
				if(typeof m[col][row]!="number"){
					console.warn("non-numeric entry found in a numeric matrix: m[" + col + "][" + row + "]=" + m[col][row]);
				}
				if(m[col][col]!=0){
					var f1=(-1)* m[row][col]/m[col][col];
					for (var i=col; i<tms; i++){
						m[row][i]=f1*m[col][i]+m[row][i];
					}
				}
			}
		}
		return m;	//	Array
	},
	create: function(/* Number */a, /* Number */b, /* Number? */value){
		//	summary
		//	Create a new matrix with rows a and cols b, and pre-populate with value.
		value=value||0;
		var m=[];
		for (var i=0; i<b; i++){
			m[i]=[];
			for(var j=0; j<a; j++) {
				m[i][j]=value;
			}
		}
		return m;	//	Array
	},
	ones: function(/* Number */a, /* Number */b){
		//	summary
		//	Create a matrix pre-populated with ones
		return this.create(a, b, 1);	//	Array
	},
	zeros: function(/* Number */a, /* Number */b){
		//	summary
		//	Create a matrix pre-populated with zeros
		return this.create(a, b);	// Array
	},
	identity: function(/* Number */size, /* Number? */scale){
		//	summary
		//	Create an identity matrix based on the size and scale.
		scale=scale||1;
		var m=[];
		for(var i=0; i<size; i++){
			m[i]=[];
			for(var j=0; j<size; j++){
				m[i][j]=(i==j?scale:0);
			}
		}
		return m;	//	Array
	},
	adjoint: function(/* Array */a){
		//	summary
		//	Find the adjoint of the passed matrix
		var tms=a.length;
		if(tms<=1){
			console.warn("Can't find the adjoint of a matrix with a dimension less than 2");
			return [[0]];
		}
		if(a.length!=a[0].length){
			console.warn("Can't find the adjoint of a non-square matrix");
			return [[0]];
		}
		var m=this.create(tms, tms), ap=this.create(tms-1, tms-1);
		var ii=0, jj=0, ia=0, ja=0, det=0;
		for(var i=0; i<tms; i++){
			for (var j=0; j<tms; j++){
				ia=0;
				for(ii=0; ii<tms; ii++){
					if(ii==i){
						continue;
					}
					ja = 0;
					for(jj=0; jj<tms; jj++){
						if(jj==j){
							continue;
						}
						ap[ia][ja] = a[ii][jj];
						ja++;
					}
					ia++;
				}
				det=this.determinant(ap);
				m[i][j]=Math.pow(-1, (i+j))*det;
			}
		}
		return this.transpose(m);	//	Array
	},
	transpose: function(/* Array */a){
		//	summary
		//	Transpose the passed matrix (i.e. rows to columns)
		var m=this.create(a.length, a[0].length);
		for(var i=0; i<a.length; i++){
			for(var j=0; j<a[i].length; j++){
				m[j][i]=a[i][j];
			}
		}
		return m;	//	Array
	},
	format: function(/* Array */a, /* Number? */points){
		//	summary
		//	Return a string representation of the matrix, rounded to points (if needed)
		points=points||5;
		function format_int(x, dp){
			var fac=Math.pow(10, dp);
			var a=Math.round(x*fac)/fac;
			var b=a.toString();
			if(b.charAt(0)!="-"){
				b=" "+b;
			}
			if(b.indexOf(".")>-1){
				b+=".";
			}
			while(b.length<dp+3){
				b+="0";
			}
			return b;
		}
		var ya=a.length;
		var xa=ya>0?a[0].length:0;
		var buffer="";
		for(var y=0; y<ya; y++){
			buffer+="| ";
			for(var x=0; x<xa; x++){
				buffer+=format_int(a[y][x], points)+" ";
			}
			buffer+="|\n";
		}
		return buffer;	//	string
	},
	copy: function(/* Array */a){
		//	summary
		//	Create a copy of the passed matrix
		var ya=a.length, xa=a[0].length, m=this.create(xa, ya);
		for(var y=0; y<ya; y++){
			for(var x=0; x<xa; x++){
				m[y][x]=a[y][x];
			}
		}
		return m;	// Array
	},
	scale: function(/* Array */a, /* Number */factor){
		//	summary
		//	Create a copy of passed matrix and scale each member by factor.
		a=this.copy(a);
		var ya=a.length, xa=a[0].length;
		for(var y=0; y<ya; y++){
			for(var x=0; x<xa; x++){
				a[y][x]*=factor;
			}
		}
		return a;
	}
});

}

if(!dojo._hasResource["dojox.xml.parser"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.xml.parser"] = true;
dojo.provide("dojox.xml.parser");

//DOM type to int value for reference.
//Ints make for more compact code than full constant names.
//ELEMENT_NODE                  = 1;
//ATTRIBUTE_NODE                = 2;
//TEXT_NODE                     = 3;
//CDATA_SECTION_NODE            = 4;
//ENTITY_REFERENCE_NODE         = 5;
//ENTITY_NODE                   = 6;
//PROCESSING_INSTRUCTION_NODE   = 7;
//COMMENT_NODE                  = 8;
//DOCUMENT_NODE                 = 9;
//DOCUMENT_TYPE_NODE            = 10;
//DOCUMENT_FRAGMENT_NODE        = 11;
//NOTATION_NODE                 = 12;

dojox.xml.parser.parse = function(/*String?*/ str, /*String?*/ mimetype){
	//	summary:
	//		cross-browser implementation of creating an XML document object from null, empty string, and XML text..
	//
	//	str:
	//		Optional text to create the document from.  If not provided, an empty XML document will be created.
	//		If str is empty string "", then a new empty document will be created.
	//	mimetype:
	//		Optional mimetype of the text.  Typically, this is text/xml.  Will be defaulted to text/xml if not provided.
	var _document = dojo.doc;
	var doc;

	mimetype = mimetype || "text/xml";
	if(str && dojo.trim(str) && "DOMParser" in dojo.global){
		//Handle parsing the text on Mozilla based browsers etc..
		var parser = new DOMParser();
		doc = parser.parseFromString(str, mimetype);
		var de = doc.documentElement;
		var errorNS = "http://www.mozilla.org/newlayout/xml/parsererror.xml";
		if(de.nodeName == "parsererror" && de.namespaceURI == errorNS){
			var sourceText = de.getElementsByTagNameNS(errorNS, 'sourcetext')[0];
			if(sourceText){
				sourceText = sourceText.firstChild.data;
			}
        	throw new Error("Error parsing text " + de.firstChild.data + " \n" + sourceText);
		}
		return doc;

	}else if("ActiveXObject" in dojo.global){
		//Handle IE.
		var ms = function(n){ return "MSXML" + n + ".DOMDocument"; };
		var dp = ["Microsoft.XMLDOM", ms(6), ms(4), ms(3), ms(2)];
		dojo.some(dp, function(p){
			try{
				doc = new ActiveXObject(p);
			}catch(e){ return false; }
			return true;
		});
		if(str && doc){
			doc.async = false;
			doc.loadXML(str);
			var pe = doc.parseError;
			if(pe.errorCode !== 0){
				throw new Error("Line: " + pe.line + "\n" +
					"Col: " + pe.linepos + "\n" +
					"Reason: " + pe.reason + "\n" +
					"Error Code: " + pe.errorCode + "\n" +
					"Source: " + pe.srcText);
			}
		}
		if(doc){
			return doc; //DOMDocument
		}
	}else if(_document.implementation && _document.implementation.createDocument){
		if(str && dojo.trim(str) && _document.createElement){
			//Everyone else that we couldn't get to work.  Fallback case.
			// FIXME: this may change all tags to uppercase!
			var tmp = _document.createElement("xml");
			tmp.innerHTML = str;
			var xmlDoc = _document.implementation.createDocument("foo", "", null);
			dojo.forEach(tmp.childNodes, function(child){
				xmlDoc.importNode(child, true);
			});
			return xmlDoc;	//	DOMDocument
		}else{
			return _document.implementation.createDocument("", "", null); // DOMDocument
		}
	}
	return null;	//	null
}

dojox.xml.parser.textContent = function(/*Node*/node, /*String?*/text){
	//	summary:
	//		Implementation of the DOM Level 3 attribute; scan node for text
	//	description:
	//		Implementation of the DOM Level 3 attribute; scan node for text
	//		This function can also update the text of a node by replacing all child
	//		content of the node.
	//	node:
	//		The node to get the text off of or set the text on.
	//	text:
	//		Optional argument of the text to apply to the node.
	if(arguments.length>1){
		var _document = node.ownerDocument || dojo.doc;  //Preference is to get the node owning doc first or it may fail
		dojox.xml.parser.replaceChildren(node, _document.createTextNode(text));
		return text;	//	String
	}else{
		if(node.textContent !== undefined){ //FF 1.5 -- remove?
			return node.textContent;	//	String
		}
		var _result = "";
		if(node){
			dojo.forEach(node.childNodes, function(child){
				switch(child.nodeType){
					case 1: // ELEMENT_NODE
					case 5: // ENTITY_REFERENCE_NODE
						_result += dojox.xml.parser.textContent(child);
						break;
					case 3: // TEXT_NODE
					case 2: // ATTRIBUTE_NODE
					case 4: // CDATA_SECTION_NODE
						_result += child.nodeValue;
				}
			});
		}
		return _result;	//	String
	}
}

dojox.xml.parser.replaceChildren = function(/*Element*/node, /*Node || Array*/ newChildren){
	//	summary:
	//		Removes all children of node and appends newChild. All the existing
	//		children will be destroyed.
	//	description:
	//		Removes all children of node and appends newChild. All the existing
	//		children will be destroyed.
	// 	node:
	//		The node to modify the children on
	//	newChildren:
	//		The children to add to the node.  It can either be a single Node or an
	//		array of Nodes.
	var nodes = [];

	if(dojo.isIE){
		dojo.forEach(node.childNodes, function(child){
			nodes.push(child);
		});
	}

	dojox.xml.parser.removeChildren(node);
	dojo.forEach(nodes, dojo.destroy);

	if(!dojo.isArray(newChildren)){
		node.appendChild(newChildren);
	}else{
		dojo.forEach(newChildren, function(child){
			node.appendChild(child);
		});
	}
}

dojox.xml.parser.removeChildren = function(/*Element*/node){
	//	summary:
	//		removes all children from node and returns the count of children removed.
	//		The children nodes are not destroyed. Be sure to call dojo.destroy on them
	//		after they are not used anymore.
	//	node:
	//		The node to remove all the children from.
	var count = node.childNodes.length;
	while(node.hasChildNodes()){
		node.removeChild(node.firstChild);
	}
	return count; // int
}


dojox.xml.parser.innerXML = function(/*Node*/node){
	//	summary:
	//		Implementation of MS's innerXML function.
	//	node:
	//		The node from which to generate the XML text representation.
	if(node.innerXML){
		return node.innerXML;	//	String
	}else if(node.xml){
		return node.xml;		//	String
	}else if(typeof XMLSerializer != "undefined"){
		return (new XMLSerializer()).serializeToString(node);	//	String
	}
	return null;
}

}

if(!dojo._hasResource["dojo.string"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo.string"] = true;
dojo.provide("dojo.string");


dojo.getObject("string", true, dojo);

/*=====
dojo.string = {
	// summary: String utilities for Dojo
};
=====*/

dojo.string.rep = function(/*String*/str, /*Integer*/num){
	//	summary:
	//		Efficiently replicate a string `n` times.
	//	str:
	//		the string to replicate
	//	num:
	//		number of times to replicate the string
	
	if(num <= 0 || !str){ return ""; }
	
	var buf = [];
	for(;;){
		if(num & 1){
			buf.push(str);
		}
		if(!(num >>= 1)){ break; }
		str += str;
	}
	return buf.join("");	// String
};

dojo.string.pad = function(/*String*/text, /*Integer*/size, /*String?*/ch, /*Boolean?*/end){
	//	summary:
	//		Pad a string to guarantee that it is at least `size` length by
	//		filling with the character `ch` at either the start or end of the
	//		string. Pads at the start, by default.
	//	text:
	//		the string to pad
	//	size:
	//		length to provide padding
	//	ch:
	//		character to pad, defaults to '0'
	//	end:
	//		adds padding at the end if true, otherwise pads at start
	//	example:
	//	|	// Fill the string to length 10 with "+" characters on the right.  Yields "Dojo++++++".
	//	|	dojo.string.pad("Dojo", 10, "+", true);

	if(!ch){
		ch = '0';
	}
	var out = String(text),
		pad = dojo.string.rep(ch, Math.ceil((size - out.length) / ch.length));
	return end ? out + pad : pad + out;	// String
};

dojo.string.substitute = function(	/*String*/		template,
									/*Object|Array*/map,
									/*Function?*/	transform,
									/*Object?*/		thisObject){
	//	summary:
	//		Performs parameterized substitutions on a string. Throws an
	//		exception if any parameter is unmatched.
	//	template:
	//		a string with expressions in the form `${key}` to be replaced or
	//		`${key:format}` which specifies a format function. keys are case-sensitive.
	//	map:
	//		hash to search for substitutions
	//	transform:
	//		a function to process all parameters before substitution takes
	//		place, e.g. mylib.encodeXML
	//	thisObject:
	//		where to look for optional format function; default to the global
	//		namespace
	//	example:
	//		Substitutes two expressions in a string from an Array or Object
	//	|	// returns "File 'foo.html' is not found in directory '/temp'."
	//	|	// by providing substitution data in an Array
	//	|	dojo.string.substitute(
	//	|		"File '${0}' is not found in directory '${1}'.",
	//	|		["foo.html","/temp"]
	//	|	);
	//	|
	//	|	// also returns "File 'foo.html' is not found in directory '/temp'."
	//	|	// but provides substitution data in an Object structure.  Dotted
	//	|	// notation may be used to traverse the structure.
	//	|	dojo.string.substitute(
	//	|		"File '${name}' is not found in directory '${info.dir}'.",
	//	|		{ name: "foo.html", info: { dir: "/temp" } }
	//	|	);
	//	example:
	//		Use a transform function to modify the values:
	//	|	// returns "file 'foo.html' is not found in directory '/temp'."
	//	|	dojo.string.substitute(
	//	|		"${0} is not found in ${1}.",
	//	|		["foo.html","/temp"],
	//	|		function(str){
	//	|			// try to figure out the type
	//	|			var prefix = (str.charAt(0) == "/") ? "directory": "file";
	//	|			return prefix + " '" + str + "'";
	//	|		}
	//	|	);
	//	example:
	//		Use a formatter
	//	|	// returns "thinger -- howdy"
	//	|	dojo.string.substitute(
	//	|		"${0:postfix}", ["thinger"], null, {
	//	|			postfix: function(value, key){
	//	|				return value + " -- howdy";
	//	|			}
	//	|		}
	//	|	);

	thisObject = thisObject || dojo.global;
	transform = transform ?
		dojo.hitch(thisObject, transform) : function(v){ return v; };

	return template.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,
		function(match, key, format){
			var value = dojo.getObject(key, false, map);
			if(format){
				value = dojo.getObject(format, false, thisObject).call(thisObject, value, key);
			}
			return transform(value, key).toString();
		}); // String
};

/*=====
dojo.string.trim = function(str){
	//	summary:
	//		Trims whitespace from both sides of the string
	//	str: String
	//		String to be trimmed
	//	returns: String
	//		Returns the trimmed string
	//	description:
	//		This version of trim() was taken from [Steven Levithan's blog](http://blog.stevenlevithan.com/archives/faster-trim-javascript).
	//		The short yet performant version of this function is dojo.trim(),
	//		which is part of Dojo base.  Uses String.prototype.trim instead, if available.
	return "";	// String
}
=====*/

dojo.string.trim = String.prototype.trim ?
	dojo.trim : // aliasing to the native function
	function(str){
		str = str.replace(/^\s+/, '');
		for(var i = str.length - 1; i >= 0; i--){
			if(/\S/.test(str.charAt(i))){
				str = str.substring(0, i + 1);
				break;
			}
		}
		return str;
	};

}

if(!dojo._hasResource["dojo.date.stamp"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo.date.stamp"] = true;
dojo.provide("dojo.date.stamp");


dojo.getObject("date.stamp", true, dojo);

// Methods to convert dates to or from a wire (string) format using well-known conventions

dojo.date.stamp.fromISOString = function(/*String*/formattedString, /*Number?*/defaultTime){
	//	summary:
	//		Returns a Date object given a string formatted according to a subset of the ISO-8601 standard.
	//
	//	description:
	//		Accepts a string formatted according to a profile of ISO8601 as defined by
	//		[RFC3339](http://www.ietf.org/rfc/rfc3339.txt), except that partial input is allowed.
	//		Can also process dates as specified [by the W3C](http://www.w3.org/TR/NOTE-datetime)
	//		The following combinations are valid:
	//
	//			* dates only
	//			|	* yyyy
	//			|	* yyyy-MM
	//			|	* yyyy-MM-dd
	// 			* times only, with an optional time zone appended
	//			|	* THH:mm
	//			|	* THH:mm:ss
	//			|	* THH:mm:ss.SSS
	// 			* and "datetimes" which could be any combination of the above
	//
	//		timezones may be specified as Z (for UTC) or +/- followed by a time expression HH:mm
	//		Assumes the local time zone if not specified.  Does not validate.  Improperly formatted
	//		input may return null.  Arguments which are out of bounds will be handled
	// 		by the Date constructor (e.g. January 32nd typically gets resolved to February 1st)
	//		Only years between 100 and 9999 are supported.
	//
  	//	formattedString:
	//		A string such as 2005-06-30T08:05:00-07:00 or 2005-06-30 or T08:05:00
	//
	//	defaultTime:
	//		Used for defaults for fields omitted in the formattedString.
	//		Uses 1970-01-01T00:00:00.0Z by default.

	if(!dojo.date.stamp._isoRegExp){
		dojo.date.stamp._isoRegExp =
//TODO: could be more restrictive and check for 00-59, etc.
			/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
	}

	var match = dojo.date.stamp._isoRegExp.exec(formattedString),
		result = null;

	if(match){
		match.shift();
		if(match[1]){match[1]--;} // Javascript Date months are 0-based
		if(match[6]){match[6] *= 1000;} // Javascript Date expects fractional seconds as milliseconds

		if(defaultTime){
			// mix in defaultTime.  Relatively expensive, so use || operators for the fast path of defaultTime === 0
			defaultTime = new Date(defaultTime);
			dojo.forEach(dojo.map(["FullYear", "Month", "Date", "Hours", "Minutes", "Seconds", "Milliseconds"], function(prop){
				return defaultTime["get" + prop]();
			}), function(value, index){
				match[index] = match[index] || value;
			});
		}
		result = new Date(match[0]||1970, match[1]||0, match[2]||1, match[3]||0, match[4]||0, match[5]||0, match[6]||0); //TODO: UTC defaults
		if(match[0] < 100){
			result.setFullYear(match[0] || 1970);
		}

		var offset = 0,
			zoneSign = match[7] && match[7].charAt(0);
		if(zoneSign != 'Z'){
			offset = ((match[8] || 0) * 60) + (Number(match[9]) || 0);
			if(zoneSign != '-'){ offset *= -1; }
		}
		if(zoneSign){
			offset -= result.getTimezoneOffset();
		}
		if(offset){
			result.setTime(result.getTime() + offset * 60000);
		}
	}

	return result; // Date or null
};

/*=====
	dojo.date.stamp.__Options = function(){
		//	selector: String
		//		"date" or "time" for partial formatting of the Date object.
		//		Both date and time will be formatted by default.
		//	zulu: Boolean
		//		if true, UTC/GMT is used for a timezone
		//	milliseconds: Boolean
		//		if true, output milliseconds
		this.selector = selector;
		this.zulu = zulu;
		this.milliseconds = milliseconds;
	}
=====*/

dojo.date.stamp.toISOString = function(/*Date*/dateObject, /*dojo.date.stamp.__Options?*/options){
	//	summary:
	//		Format a Date object as a string according a subset of the ISO-8601 standard
	//
	//	description:
	//		When options.selector is omitted, output follows [RFC3339](http://www.ietf.org/rfc/rfc3339.txt)
	//		The local time zone is included as an offset from GMT, except when selector=='time' (time without a date)
	//		Does not check bounds.  Only years between 100 and 9999 are supported.
	//
	//	dateObject:
	//		A Date object

	var _ = function(n){ return (n < 10) ? "0" + n : n; };
	options = options || {};
	var formattedDate = [],
		getter = options.zulu ? "getUTC" : "get",
		date = "";
	if(options.selector != "time"){
		var year = dateObject[getter+"FullYear"]();
		date = ["0000".substr((year+"").length)+year, _(dateObject[getter+"Month"]()+1), _(dateObject[getter+"Date"]())].join('-');
	}
	formattedDate.push(date);
	if(options.selector != "date"){
		var time = [_(dateObject[getter+"Hours"]()), _(dateObject[getter+"Minutes"]()), _(dateObject[getter+"Seconds"]())].join(':');
		var millis = dateObject[getter+"Milliseconds"]();
		if(options.milliseconds){
			time += "."+ (millis < 100 ? "0" : "") + _(millis);
		}
		if(options.zulu){
			time += "Z";
		}else if(options.selector != "time"){
			var timezoneOffset = dateObject.getTimezoneOffset();
			var absOffset = Math.abs(timezoneOffset);
			time += (timezoneOffset > 0 ? "-" : "+") +
				_(Math.floor(absOffset/60)) + ":" + _(absOffset%60);
		}
		formattedDate.push(time);
	}
	return formattedDate.join('T'); // String
};

}

if(!dojo._hasResource["dojox.atom.io.model"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.atom.io.model"] = true;
dojo.provide("dojox.atom.io.model");





dojox.atom.io.model._Constants = {
	//	summary:
	//		Container for general constants.
	//	description:
	//		Container for general constants.
	"ATOM_URI": "http://www.w3.org/2005/Atom",
	"ATOM_NS": "http://www.w3.org/2005/Atom",
	"PURL_NS": "http://purl.org/atom/app#",
	"APP_NS": "http://www.w3.org/2007/app"
};

dojox.atom.io.model._actions = {
	//	summary:
	//		Container for tag handling functions.
	//	description:
	//		Container for tag handling functions.  Each child of this container is
	//		a handler function for the given type of node. Each accepts two parameters:
	//	obj:  Object.
	//		  The object to insert data into.
	//	node: DOM Node.
	//		  The dom node containing the data
	"link": function(obj,node){
		if(obj.links === null){obj.links = [];}
		var link = new dojox.atom.io.model.Link();
		link.buildFromDom(node);
		obj.links.push(link);
	},
	"author": function(obj,node){
		if(obj.authors === null){obj.authors = [];}
		var person = new dojox.atom.io.model.Person("author");
		person.buildFromDom(node);
		obj.authors.push(person);
	},
	"contributor": function(obj,node){
		if(obj.contributors === null){obj.contributors = [];}
		var person = new dojox.atom.io.model.Person("contributor");
		person.buildFromDom(node);
		obj.contributors.push(person);
	},
	"category": function(obj,node){
		if(obj.categories === null){obj.categories = [];}
		var cat = new dojox.atom.io.model.Category();
		cat.buildFromDom(node);
		obj.categories.push(cat);
	},
	"icon": function(obj,node){
		obj.icon = dojox.xml.parser.textContent(node);
	},
	"id": function(obj,node){
		obj.id = dojox.xml.parser.textContent(node);
	},
	"rights": function(obj,node){
		obj.rights = dojox.xml.parser.textContent(node);
	},
	"subtitle": function(obj,node){
		var cnt = new dojox.atom.io.model.Content("subtitle");
		cnt.buildFromDom(node);
		obj.subtitle = cnt;
	},
	"title": function(obj,node){
		var cnt = new dojox.atom.io.model.Content("title");
		cnt.buildFromDom(node);
		obj.title = cnt;
	},
	"updated": function(obj,node){
		obj.updated = dojox.atom.io.model.util.createDate(node);
	},
	// Google news
	"issued": function(obj,node){
		obj.issued = dojox.atom.io.model.util.createDate(node);
	},
	// Google news
	"modified": function(obj,node){
		obj.modified = dojox.atom.io.model.util.createDate(node);
	},
	"published": function(obj,node){
		obj.published = dojox.atom.io.model.util.createDate(node);
	},
	"entry": function(obj,node){
		if(obj.entries === null){obj.entries = [];}
		//The object passed in should be a Feed object, since only feeds can contain Entries
		var entry = obj.createEntry ? obj.createEntry() : new dojox.atom.io.model.Entry();
		entry.buildFromDom(node);
		obj.entries.push(entry);
	},
	"content": function(obj, node){
		var cnt = new dojox.atom.io.model.Content("content");
		cnt.buildFromDom(node);
		obj.content = cnt;
	},
	"summary": function(obj, node){
		var summary = new dojox.atom.io.model.Content("summary");
		summary.buildFromDom(node);
		obj.summary = summary;
	},

	"name": function(obj,node){
		obj.name = dojox.xml.parser.textContent(node);
	},
	"email" : function(obj,node){
		obj.email = dojox.xml.parser.textContent(node);
	},
	"uri" : function(obj,node){
		obj.uri = dojox.xml.parser.textContent(node);
	},
	"generator" : function(obj,node){
		obj.generator = new dojox.atom.io.model.Generator();
		obj.generator.buildFromDom(node);
	}
};

dojox.atom.io.model.util = {
	createDate: function(/*DOM node*/node){
		//	summary:
		//		Utility function to create a date from a DOM node's text content.
		//	description:
		//		Utility function to create a date from a DOM node's text content.
		//
		//	node:
		//		The DOM node to inspect.
		//	returns:
		//		Date object from a DOM Node containing a ISO-8610 string.
		var textContent = dojox.xml.parser.textContent(node);
		if(textContent){
			return dojo.date.stamp.fromISOString(dojo.trim(textContent));
		}
		return null;
	},
	escapeHtml: function(/*String*/str){
		//	summary:
		//		Utility function to escape XML special characters in an HTML string.
		//	description:
		//		Utility function to escape XML special characters in an HTML string.
		//
		//	str:
		//		The string to escape
		//	returns:
		//		HTML String with special characters (<,>,&, ", etc,) escaped.
		return str.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;")
			.replace(/'/gm, "&#39;"); // String
	},
	unEscapeHtml: function(/*String*/str){
		//	summary:
		//		Utility function to un-escape XML special characters in an HTML string.
		//	description:
		//		Utility function to un-escape XML special characters in an HTML string.
		//
		//	str:
		//		The string to un-escape.
		//	returns:
		//		HTML String converted back to the normal text (unescaped) characters (<,>,&, ", etc,).
		return str.replace(/&lt;/gm, "<").replace(/&gt;/gm, ">").replace(/&quot;/gm, "\"")
			.replace(/&#39;/gm, "'").replace(/&amp;/gm, "&"); // String
	},
	getNodename: function(/*DOM node*/node){
		//	summary:
		//		Utility function to get a node name and deal with IE's bad handling of namespaces
		//		on tag names.
		//	description:
		//		Utility function to get a node name and deal with IE's bad handling of namespaces
		//		on tag names.
		//
		//	node:
		//		The DOM node whose name to retrieve.
		//	returns:
		//		String
		//	The name without namespace prefixes.
		var name = null;
		if(node !== null){
			name = node.localName ? node.localName: node.nodeName;
			if(name !== null){
				var nsSep = name.indexOf(":");
				if(nsSep !== -1){
					name = name.substring((nsSep + 1), name.length);
				}
			}
		}
		return name;
	}
};

dojo.declare('dojox.atom.io.model.Node', null, {
	constructor: function(name_space,name, attributes,content, shortNs){
		this.name_space = name_space;
		this.name = name;
		this.attributes = [];
		if(attributes){
			this.attributes = attributes;
		}
		this.content = [];
		this.rawNodes = [];
		this.textContent = null;
		if(content){
			this.content.push(content);
		}
		this.shortNs = shortNs;
		this._objName = "Node";//for debugging purposes
	},
	buildFromDom: function(node){
		this._saveAttributes(node);
		this.name_space = node.namespaceURI;
		this.shortNs = node.prefix;
		this.name = dojox.atom.io.model.util.getNodename(node);
		for(var x=0; x < node.childNodes.length; x++){
			var c = node.childNodes[x];
			if(dojox.atom.io.model.util.getNodename(c) != "#text" ){
				this.rawNodes.push(c);
				var n = new dojox.atom.io.model.Node();
				n.buildFromDom(c, true);
				this.content.push(n);
			}else{
				this.content.push(c.nodeValue);
			}
		}
		this.textContent = dojox.xml.parser.textContent(node);
	},
	_saveAttributes: function(node){
		if(!this.attributes){this.attributes = [];}
		// Work around lack of hasAttributes() in IE
		var hasAttributes = function(node){
			var attrs = node.attributes;
			if(attrs === null){return false;}
			return (attrs.length !== 0);
		};
	
		if(hasAttributes(node) && this._getAttributeNames){
			var names = this._getAttributeNames(node);
			if(names && names.length > 0){
				for(var x in names){
					var attrib = node.getAttribute(names[x]);
					if(attrib){this.attributes[names[x]] = attrib;}
				}
			}
		}
	},
	addAttribute: function(name, value){
		this.attributes[name]=value;
	},
	getAttribute: function(name){
		return this.attributes[name];
	},
	//if child objects want their attributes parsed, they should override
	//to return an array of attrib names
	_getAttributeNames: function(node){
		var names = [];
		for(var i =0; i<node.attributes.length; i++){
			names.push(node.attributes[i].nodeName);
		}
		return names;
	},
	toString: function(){
		var xml = [];
		var x;
		var name = (this.shortNs?this.shortNs+":":'')+this.name;
		var cdata = (this.name == "#cdata-section");
		if(cdata){
			xml.push("<![CDATA[");
			xml.push(this.textContent);
			xml.push("]]>");
		}else{
			xml.push("<");
			xml.push(name);
			if(this.name_space){
				xml.push(" xmlns='" + this.name_space + "'");
			}
			if(this.attributes){
				for(x in this.attributes){
					xml.push(" " + x + "='" + this.attributes[x] + "'");
				}
			}
			if(this.content){
				xml.push(">");
				for(x in this.content){
					xml.push(this.content[x]);
				}
				xml.push("</" + name + ">\n");
			}else{
				xml.push("/>\n");
			}
		}
		return xml.join('');
	},
	addContent: function(content){
		this.content.push(content);
	}
});
//Types are as follows: links: array of Link, authors: array of Person, categories: array of Category
//contributors: array of Person, ico
dojo.declare("dojox.atom.io.model.AtomItem",dojox.atom.io.model.Node,{
	 constructor: function(args){
		this.ATOM_URI = dojox.atom.io.model._Constants.ATOM_URI;
		this.links = null;						//Array of Link
		this.authors = null;					//Array of Person
		this.categories = null;					//Array of Category
		this.contributors = null;				//Array of Person
		this.icon = this.id = this.logo = this.xmlBase = this.rights = null; //String
		this.subtitle = this.title = null;		//Content
		this.updated = this.published = null;	//Date
		// Google news
		this.issued = this.modified = null;		//Date
		this.content =  null;					//Content
		this.extensions = null;					//Array of Node, non atom based
		this.entries = null;					//Array of Entry
		this.name_spaces = {};
		this._objName = "AtomItem";			 //for debugging purposes
	},
	// summary: Class container for generic Atom items.
	// description: Class container for generic Atom items.
	_getAttributeNames: function(){return null;},
	_accepts: {},
	accept: function(tag){return Boolean(this._accepts[tag]);},
	_postBuild: function(){},//child objects can override this if they want to be called after a Dom build
	buildFromDom: function(node){
		var i, c, n;
		for(i=0; i<node.attributes.length; i++){
			c = node.attributes.item(i);
			n = dojox.atom.io.model.util.getNodename(c);
			if(c.prefix == "xmlns" && c.prefix != n){
				this.addNamespace(c.nodeValue, n);
			}
		}
		c = node.childNodes;
		for(i = 0; i< c.length; i++){
			if(c[i].nodeType == 1) {
				var name = dojox.atom.io.model.util.getNodename(c[i]);
				if(!name){continue;}
				if(c[i].namespaceURI != dojox.atom.io.model._Constants.ATOM_NS && name != "#text"){
					if(!this.extensions){this.extensions = [];}
					var extensionNode = new dojox.atom.io.model.Node();
					extensionNode.buildFromDom(c[i]);
					this.extensions.push(extensionNode);
				}
				if(!this.accept(name.toLowerCase())){
					continue;
				}
				var fn = dojox.atom.io.model._actions[name];
				if(fn) {
					fn(this,c[i]);
				}
			}
		}
		this._saveAttributes(node);
		if(this._postBuild){this._postBuild();}
	},
	addNamespace: function(fullName, shortName){
		if(fullName && shortName){
			this.name_spaces[shortName] = fullName;
		}
	},
	addAuthor: function(/*String*/name, /*String*/email, /*String*/uri){
		//	summary:
		//		Function to add in an author to the list of authors.
		//	description:
		//		Function to add in an author to the list of authors.
		//
		//	name:
		//		The author's name.
		//	email:
		//		The author's e-mail address.
		//	uri:
		//		A URI associated with the author.
		if(!this.authors){this.authors = [];}
		this.authors.push(new dojox.atom.io.model.Person("author",name,email,uri));
	},
	addContributor: function(/*String*/name, /*String*/email, /*String*/uri){
		//	summary:
		//		Function to add in an author to the list of authors.
		//	description:
		//		Function to add in an author to the list of authors.
		//
		//	name:
		//		The author's name.
		//	email:
		//		The author's e-mail address.
		//	uri:
		//		A URI associated with the author.
		if(!this.contributors){this.contributors = [];}
		this.contributors.push(new dojox.atom.io.model.Person("contributor",name,email,uri));
	},
	addLink: function(/*String*/href,/*String*/rel,/*String*/hrefLang,/*String*/title,/*String*/type){
		//	summary:
		//		Function to add in a link to the list of links.
		//	description:
		//		Function to add in a link to the list of links.
		//
		//	href:
		//		The href.
		//	rel:
		//		String
		//	hrefLang:
		//		String
		//	title:
		//		A title to associate with the link.
		//	type:
		//		The type of link is is.
		if(!this.links){this.links=[];}
		this.links.push(new dojox.atom.io.model.Link(href,rel,hrefLang,title,type));
	},
	removeLink: function(/*String*/href, /*String*/rel){
		//	summary:
		//		Function to remove a link from the list of links.
		//	description:
		//		Function to remove a link from the list of links.
		//
		//	href:
		//		The href.
		//	rel:
		//		String
		if(!this.links || !dojo.isArray(this.links)){return;}
		var count = 0;
		for(var i = 0; i < this.links.length; i++){
			if((!href || this.links[i].href === href) && (!rel || this.links[i].rel === rel)){
				this.links.splice(i,1); count++;
			}
		}
		return count;
	},
	removeBasicLinks: function(){
		//	summary:
		//		Function to remove all basic links from the list of links.
		//	description:
		//		Function to remove all basic link from the list of links.
		if(!this.links){return;}
		var count = 0;
		for(var i = 0; i < this.links.length; i++){
			if(!this.links[i].rel){this.links.splice(i,1); count++; i--;}
		}
		return count;
	},
	addCategory: function(/*String*/scheme, /*String*/term, /*String*/label){
		//	summary:
		//		Function to add in a category to the list of categories.
		//	description:
		//		Function to add in a category to the list of categories.
		//
		//	scheme:
		//		String
		//	term:
		//		String
		//	label:
		//		String
		if(!this.categories){this.categories = [];}
		this.categories.push(new dojox.atom.io.model.Category(scheme,term,label));
	},
	getCategories: function(/*String*/scheme){
		//	summary:
		//		Function to get all categories that match a particular scheme.
		//	description:
		//		Function to get all categories that match a particular scheme.
		//
		//	scheme:
		//		String
		//		The scheme to filter on.
		if(!scheme){return this.categories;}
		//If categories belonging to a particular scheme are required, then create a new array containing these
		var arr = [];
		for(var x in this.categories){
			if(this.categories[x].scheme === scheme){arr.push(this.categories[x]);}
		}
		return arr;
	},
	removeCategories: function(/*String*/scheme, /*String*/term){
		//	summary:
		//		Function to remove all categories that match a particular scheme and term.
		//	description:
		//		Function to remove all categories that match a particular scheme and term.
		//
		//	scheme:
		//		The scheme to filter on.
		//	term:
		//		The term to filter on.
		if(!this.categories){return;}
		var count = 0;
		for(var i=0; i<this.categories.length; i++){
			if((!scheme || this.categories[i].scheme === scheme) && (!term || this.categories[i].term === term)){
				this.categories.splice(i, 1); count++; i--;
			}
		}
		return count;
	},
	setTitle: function(/*String*/str, /*String*/type){
		//	summary:
		//		Function to set the title of the item.
		//	description:
		//		Function to set the title of the item.
		//
		//	str:
		//		The title to set.
		//	type:
		//		The type of title format, text, xml, xhtml, etc.
		if(!str){return;}
		this.title = new dojox.atom.io.model.Content("title");
		this.title.value = str;
		if(type){this.title.type = type;}
	},
	addExtension: function(/*String*/name_space,/*String*/name, /*Array*/attributes, /*String*/content, /*String*/shortNS){
		//	summary:
		//		Function to add in an extension namespace into the item.
		//	description:
		//		Function to add in an extension namespace into the item.
		//
		//	name_space:
		//		The namespace of the extension.
		//	name:
		//		The name of the extension
		//	attributes:
		//		The attributes associated with the extension.
		//	content:
		//		The content of the extension.
		if(!this.extensions){this.extensions=[];}
		this.extensions.push(new dojox.atom.io.model.Node(name_space,name,attributes,content, shortNS || "ns"+this.extensions.length));
	},
	getExtensions: function(/*String*/name_space, /*String*/name){
		//	summary:
		//		Function to get extensions that match a namespace and name.
		//	description:
		//		Function to get extensions that match a namespace and name.
		//
		//	name_space:
		//		The namespace of the extension.
		//	name:
		//		The name of the extension
		var arr = [];
		if(!this.extensions){return arr;}
		for(var x in this.extensions){
			if((this.extensions[x].name_space === name_space || this.extensions[x].shortNs === name_space) && (!name || this.extensions[x].name === name)){
				arr.push(this.extensions[x]);
			}
		}
		return arr;
	},
	removeExtensions: function(/*String*/name_space, /*String*/name){
		//	summary:
		//		Function to remove extensions that match a namespace and name.
		//	description:
		//		Function to remove extensions that match a namespace and name.
		//
		//	name_space:
		//		The namespace of the extension.
		//	name:
		//		The name of the extension
		if(!this.extensions){return;}
		for(var i=0; i< this.extensions.length; i++){
			if((this.extensions[i].name_space == name_space || this.extensions[i].shortNs === name_space) && this.extensions[i].name === name){
				this.extensions.splice(i,1);
				i--;
			}
		}
	},
	destroy: function() {
		this.links = null;
		this.authors = null;
		this.categories = null;
		this.contributors = null;
		this.icon = this.id = this.logo = this.xmlBase = this.rights = null;
		this.subtitle = this.title = null;
		this.updated = this.published = null;
		// Google news
		this.issued = this.modified = null;
		this.content =  null;
		this.extensions = null;
		this.entries = null;
	}
});

dojo.declare("dojox.atom.io.model.Category",dojox.atom.io.model.Node,{
	//	summary:
	//		Class container for 'Category' types.
	//	description:
	//		Class container for 'Category' types.
	constructor: function(/*String*/scheme, /*String*/term, /*String*/label){
		this.scheme = scheme; this.term = term; this.label = label;
		this._objName = "Category";//for debugging
	},
	_postBuild: function(){},
	_getAttributeNames: function(){
		return ["label","scheme","term"];
	},
	toString: function(){
		//	summary:
		//		Function to construct string form of the category tag, which is an XML structure.
		//	description:
		//		Function to construct string form of the category tag, which is an XML structure.
		var s = [];
		s.push('<category ');
		if(this.label){s.push(' label="'+this.label+'" ');}
		if(this.scheme){s.push(' scheme="'+this.scheme+'" ');}
		if(this.term){s.push(' term="'+this.term+'" ');}
		s.push('/>\n');
		return s.join('');
	},
	buildFromDom: function(/*DOM node*/node){
		//	summary:
		//		Function to do construction of the Category data from the DOM node containing it.
		//	description:
		//		Function to do construction of the Category data from the DOM node containing it.
		//
		//	node:
		//		The DOM node to process for content.
		this._saveAttributes(node);//just get the attributes from the node
		this.label = this.attributes.label;
		this.scheme = this.attributes.scheme;
		this.term = this.attributes.term;
		if(this._postBuild){this._postBuild();}
	}
});

dojo.declare("dojox.atom.io.model.Content",dojox.atom.io.model.Node,{
	//	summary:
	//		Class container for 'Content' types. Such as summary, content, username, and so on types of data.
	//	description:
	//		Class container for 'Content' types. Such as summary, content, username, and so on types of data.
	constructor: function(tagName, value, src, type,xmlLang){
		this.tagName = tagName; this.value = value; this.src = src; this.type=type; this.xmlLang = xmlLang;
		this.HTML = "html"; this.TEXT = "text"; this.XHTML = "xhtml"; this.XML="xml";
		this._useTextContent = "true";
	},
	_getAttributeNames: function(){return ["type","src"];},
	_postBuild: function(){},
	buildFromDom: function(/*DOM node*/node){
		//	summary:
		//		Function to do construction of the Content data from the DOM node containing it.
		//	description:
		//		Function to do construction of the Content data from the DOM node containing it.
		//
		//	node:
		//		The DOM node to process for content.
		//Handle checking for XML content as the content type
		var type = node.getAttribute("type");
		if(type){
			type = type.toLowerCase();
			if(type == "xml" || "text/xml"){
				type = this.XML;
			}
		}else{
			type="text";
		}
		if(type === this.XML){
			if(node.firstChild){
				var i;
				this.value = "";
				for(i = 0; i < node.childNodes.length; i++){
					var c = node.childNodes[i];
					if(c){
						this.value += dojox.xml.parser.innerXML(c);
					}
				}
			}
		} else if(node.innerHTML){
			this.value = node.innerHTML;
		}else{
			this.value = dojox.xml.parser.textContent(node);
		}

		this._saveAttributes(node);

		if(this.attributes){
			this.type = this.attributes.type;
			this.scheme = this.attributes.scheme;
			this.term = this.attributes.term;
		}
		if(!this.type){this.type = "text";}

		//We need to unescape the HTML content here so that it can be displayed correctly when the value is fetched.
		var lowerType = this.type.toLowerCase();
		if(lowerType === "html" || lowerType === "text/html" || lowerType === "xhtml" || lowerType === "text/xhtml"){
			this.value = this.value?dojox.atom.io.model.util.unEscapeHtml(this.value):"";
		}

		if(this._postBuild){this._postBuild();}
	},
	toString: function(){
		//	summary:
		//		Function to construct string form of the content tag, which is an XML structure.
		//	description:
		//		Function to construct string form of the content tag, which is an XML structure.
		var s = [];
		s.push('<'+this.tagName+' ');
		if(!this.type){this.type = "text";}
		if(this.type){s.push(' type="'+this.type+'" ');}
		if(this.xmlLang){s.push(' xml:lang="'+this.xmlLang+'" ');}
		if(this.xmlBase){s.push(' xml:base="'+this.xmlBase+'" ');}
		
		//all HTML must be escaped
		if(this.type.toLowerCase() == this.HTML){
			s.push('>'+dojox.atom.io.model.util.escapeHtml(this.value)+'</'+this.tagName+'>\n');
		}else{
			s.push('>'+this.value+'</'+this.tagName+'>\n');
		}
		var ret = s.join('');
		return ret;
	}
});

dojo.declare("dojox.atom.io.model.Link",dojox.atom.io.model.Node,{
	//	summary:
	//		Class container for 'link' types.
	//	description:
	//		Class container for 'link' types.
	constructor: function(href,rel,hrefLang,title,type){
		this.href = href; this.hrefLang = hrefLang; this.rel = rel; this.title = title;this.type = type;
	},
	_getAttributeNames: function(){return ["href","jrefLang","rel","title","type"];},
	_postBuild: function(){},
	buildFromDom: function(node){
		//	summary:
		//		Function to do construction of the link data from the DOM node containing it.
		//	description:
		//		Function to do construction of the link data from the DOM node containing it.
		//
		//	node:
		//		The DOM node to process for link data.
		this._saveAttributes(node);//just get the attributes from the node
		this.href = this.attributes.href;
		this.hrefLang = this.attributes.hreflang;
		this.rel = this.attributes.rel;
		this.title = this.attributes.title;
		this.type = this.attributes.type;
		if(this._postBuild){this._postBuild();}
	},
	toString: function(){
		//	summary:
		//		Function to construct string form of the link tag, which is an XML structure.
		//	description:
		//		Function to construct string form of the link tag, which is an XML structure.
		var s = [];
		s.push('<link ');
		if(this.href){s.push(' href="'+this.href+'" ');}
		if(this.hrefLang){s.push(' hrefLang="'+this.hrefLang+'" ');}
		if(this.rel){s.push(' rel="'+this.rel+'" ');}
		if(this.title){s.push(' title="'+this.title+'" ');}
		if(this.type){s.push(' type = "'+this.type+'" ');}
		s.push('/>\n');
		return s.join('');
	}
});

dojo.declare("dojox.atom.io.model.Person",dojox.atom.io.model.Node,{
	//	summary:
	//		Class container for 'person' types, such as Author, controbutors, and so on.
	//	description:
	//		Class container for 'person' types, such as Author, controbutors, and so on.
	constructor: function(personType, name, email, uri){
		this.author = "author";
		this.contributor = "contributor";
		if(!personType){
			personType = this.author;
		}
		this.personType = personType;
		this.name = name || '';
		this.email = email || '';
		this.uri = uri || '';
		this._objName = "Person";//for debugging
	},
	_getAttributeNames: function(){return null;},
	_postBuild: function(){},
	accept: function(tag){return Boolean(this._accepts[tag]);},
	buildFromDom: function(node){
		//	summary:
		//		Function to do construction of the person data from the DOM node containing it.
		//	description:
		//		Function to do construction of the person data from the DOM node containing it.
		//
		//	node:
		//		The DOM node to process for person data.
		var c = node.childNodes;
		for(var i = 0; i< c.length; i++){
			var name = dojox.atom.io.model.util.getNodename(c[i]);
			
			if(!name){continue;}

			if(c[i].namespaceURI != dojox.atom.io.model._Constants.ATOM_NS && name != "#text"){
				if(!this.extensions){this.extensions = [];}
				var extensionNode = new dojox.atom.io.model.Node();
				extensionNode.buildFromDom(c[i]);
				this.extensions.push(extensionNode);
			}
			if(!this.accept(name.toLowerCase())){
				continue;
			}
			var fn = dojox.atom.io.model._actions[name];
			if(fn) {
				fn(this,c[i]);
			}
		}
		this._saveAttributes(node);
		if(this._postBuild){this._postBuild();}
	},
	_accepts: {
		'name': true,
		'uri': true,
		'email': true
	},
	toString: function(){
		//	summary:
		//		Function to construct string form of the Person tag, which is an XML structure.
		//	description:
		//		Function to construct string form of the Person tag, which is an XML structure.
		var s = [];
		s.push('<'+this.personType+'>\n');
		if(this.name){s.push('\t<name>'+this.name+'</name>\n');}
		if(this.email){s.push('\t<email>'+this.email+'</email>\n');}
		if(this.uri){s.push('\t<uri>'+this.uri+'</uri>\n');}
		s.push('</'+this.personType+'>\n');
		return s.join('');
	}
});

dojo.declare("dojox.atom.io.model.Generator",dojox.atom.io.model.Node,{
	//	summary:
	//		Class container for 'Generator' types.
	//	description:
	//		Class container for 'Generator' types.
	constructor: function(/*String*/uri, /*String*/version, /*String*/value){
		this.uri = uri;
		this.version = version;
		this.value = value;
	},
	_postBuild: function(){},
	buildFromDom: function(node){
		//	summary:
		//		Function to do construction of the generator data from the DOM node containing it.
		//	description:
		//		Function to do construction of the generator data from the DOM node containing it.
		//
		//	node:
		//		The DOM node to process for link data.

		this.value = dojox.xml.parser.textContent(node);
		this._saveAttributes(node);

		this.uri = this.attributes.uri;
		this.version = this.attributes.version;

		if(this._postBuild){this._postBuild();}
	},
	toString: function(){
		//	summary:
		//		Function to construct string form of the Generator tag, which is an XML structure.
		//	description:
		//		Function to construct string form of the Generator tag, which is an XML structure.
		var s = [];
		s.push('<generator ');
		if(this.uri){s.push(' uri="'+this.uri+'" ');}
		if(this.version){s.push(' version="'+this.version+'" ');}
		s.push('>'+this.value+'</generator>\n');
		var ret = s.join('');
		return ret;
	}
});

dojo.declare("dojox.atom.io.model.Entry",dojox.atom.io.model.AtomItem,{
	//	summary:
	//		Class container for 'Entry' types.
	//	description:
	//		Class container for 'Entry' types.
	constructor: function(/*String*/id){
		this.id = id; this._objName = "Entry"; this.feedUrl = null;
	},
	_getAttributeNames: function(){return null;},
	_accepts: {
		'author': true,
		'content': true,
		'category': true,
		'contributor': true,
		'created': true,
		'id': true,
		'link': true,
		'published': true,
		'rights': true,
		'summary': true,
		'title': true,
		'updated': true,
		'xmlbase': true,
		'issued': true,
		'modified': true
	},
	toString: function(amPrimary){
		//	summary:
		//		Function to construct string form of the entry tag, which is an XML structure.
		//	description:
		//		Function to construct string form of the entry tag, which is an XML structure.
		var s = [];
		var i;
		if(amPrimary){
			s.push("<?xml version='1.0' encoding='UTF-8'?>");
			s.push("<entry xmlns='"+dojox.atom.io.model._Constants.ATOM_URI+"'");
		}else{s.push("<entry");}
		if(this.xmlBase){s.push(' xml:base="'+this.xmlBase+'" ');}
		for(i in this.name_spaces){s.push(' xmlns:'+i+'="'+this.name_spaces[i]+'"');}
		s.push('>\n');
		s.push('<id>' + (this.id ? this.id: '') + '</id>\n');
		if(this.issued && !this.published){this.published = this.issued;}
		if(this.published){s.push('<published>'+dojo.date.stamp.toISOString(this.published)+'</published>\n');}
		if(this.created){s.push('<created>'+dojo.date.stamp.toISOString(this.created)+'</created>\n');}
		//Google News
		if(this.issued){s.push('<issued>'+dojo.date.stamp.toISOString(this.issued)+'</issued>\n');}

		//Google News
		if(this.modified){s.push('<modified>'+dojo.date.stamp.toISOString(this.modified)+'</modified>\n');}

		if(this.modified && !this.updated){this.updated = this.modified;}
		if(this.updated){s.push('<updated>'+dojo.date.stamp.toISOString(this.updated)+'</updated>\n');}
		if(this.rights){s.push('<rights>'+this.rights+'</rights>\n');}
		if(this.title){s.push(this.title.toString());}
		if(this.summary){s.push(this.summary.toString());}
		var arrays = [this.authors,this.categories,this.links,this.contributors,this.extensions];
		for(var x in arrays){
			if(arrays[x]){
				for(var y in arrays[x]){
					s.push(arrays[x][y]);
				}
			}
		}
		if(this.content){s.push(this.content.toString());}
		s.push("</entry>\n");
		return s.join(''); //string
	},
	getEditHref: function(){
		//	summary:
		//		Function to get the href that allows editing of this feed entry.
		//	description:
		//		Function to get the href that allows editing of this feed entry.
		//
		//	returns:
		//		The href that specifies edit capability.
		if(this.links === null || this.links.length === 0){
			return null;
		}
		for(var x in this.links){
			if(this.links[x].rel && this.links[x].rel == "edit"){
				return this.links[x].href; //string
			}
		}
		return null;
	},
	setEditHref: function(url){
		if(this.links === null){
			this.links = [];
		}
		for(var x in this.links){
			if(this.links[x].rel && this.links[x].rel == "edit"){
				this.links[x].href = url;
				return;
			}
		}
		this.addLink(url, 'edit');
	}
});

dojo.declare("dojox.atom.io.model.Feed",dojox.atom.io.model.AtomItem,{
	//	summary:
	//		Class container for 'Feed' types.
	//	description:
	//		Class container for 'Feed' types.
	_accepts: {
		'author': true,
		'content': true,
		'category': true,
		'contributor': true,
		'created': true,
		'id': true,
		'link': true,
		'published': true,
		'rights': true,
		'summary': true,
		'title': true,
		'updated': true,
		'xmlbase': true,
		'entry': true,
		'logo': true,
		'issued': true,
		'modified': true,
		'icon': true,
		'subtitle': true
	},
	addEntry: function(/*object*/entry){
		//	summary:
		//		Function to add an entry to this feed.
		//	description:
		//		Function to add an entry to this feed.
		//	entry:
		//		The entry object to add.
		if(!entry.id){
			throw new Error("The entry object must be assigned an ID attribute.");
		}
		if(!this.entries){this.entries = [];}
		entry.feedUrl = this.getSelfHref();
		this.entries.push(entry);
	},
	getFirstEntry: function(){
		//	summary:
		//		Function to get the first entry of the feed.
		//	description:
		//		Function to get the first entry of the feed.
		//
		//	returns:
		//		The first entry in the feed.
		if(!this.entries || this.entries.length === 0){return null;}
		return this.entries[0]; //object
	},
	getEntry: function(/*String*/entryId){
		//	summary:
		//		Function to get an entry by its id.
		//	description:
		//		Function to get an entry by its id.
		//
		//	returns:
		//		The entry desired, or null if none.
		if(!this.entries){return null;}
		for(var x in this.entries){
			if(this.entries[x].id == entryId){
				return this.entries[x];
			}
		}
		return null;
	},
	removeEntry: function(/*object*/entry){
		//	summary:
		//		Function to remove an entry from the list of links.
		//	description:
		//		Function to remove an entry from the list of links.
		//
		//	entry:
		//		The entry.
		if(!this.entries){return;}
		var count = 0;
		for(var i = 0; i < this.entries.length; i++){
			if(this.entries[i] === entry){
				this.entries.splice(i,1);
				count++;
			}
		}
		return count;
	},
	setEntries: function(/*array*/arrayOfEntry){
		//	summary:
		//		Function to add a set of entries to the feed.
		//	description:
		//		Function to get an entry by its id.
		//
		//	arrayOfEntry:
		//		An array of entry objects to add to the feed.
		for(var x in arrayOfEntry){
			this.addEntry(arrayOfEntry[x]);
		}
	},
	toString: function(){
		//	summary:
		//		Function to construct string form of the feed tag, which is an XML structure.
		//	description:
		//		Function to construct string form of the feed tag, which is an XML structure.
		var s = [];
		var i;
		s.push('<?xml version="1.0" encoding="utf-8"?>\n');
		s.push('<feed xmlns="'+dojox.atom.io.model._Constants.ATOM_URI+'"');
		if(this.xmlBase){s.push(' xml:base="'+this.xmlBase+'"');}
		for(i in this.name_spaces){s.push(' xmlns:'+i+'="'+this.name_spaces[i]+'"');}
		s.push('>\n');
		s.push('<id>' + (this.id ? this.id: '') + '</id>\n');
		if(this.title){s.push(this.title);}
		if(this.copyright && !this.rights){this.rights = this.copyright;}
		if(this.rights){s.push('<rights>' + this.rights + '</rights>\n');}
		
		// Google news
		if(this.issued){s.push('<issued>'+dojo.date.stamp.toISOString(this.issued)+'</issued>\n');}
		if(this.modified){s.push('<modified>'+dojo.date.stamp.toISOString(this.modified)+'</modified>\n');}

		if(this.modified && !this.updated){this.updated=this.modified;}
		if(this.updated){s.push('<updated>'+dojo.date.stamp.toISOString(this.updated)+'</updated>\n');}
		if(this.published){s.push('<published>'+dojo.date.stamp.toISOString(this.published)+'</published>\n');}
		if(this.icon){s.push('<icon>'+this.icon+'</icon>\n');}
		if(this.language){s.push('<language>'+this.language+'</language>\n');}
		if(this.logo){s.push('<logo>'+this.logo+'</logo>\n');}
		if(this.subtitle){s.push(this.subtitle.toString());}
		if(this.tagline){s.push(this.tagline.toString());}
		//TODO: need to figure out what to do with xmlBase
		var arrays = [this.alternateLinks,this.authors,this.categories,this.contributors,this.otherLinks,this.extensions,this.entries];
		for(i in arrays){
			if(arrays[i]){
				for(var x in arrays[i]){
					s.push(arrays[i][x]);
				}
			}
		}
		s.push('</feed>');
		return s.join('');
	},
	createEntry: function(){
		//	summary:
		//		Function to Create a new entry object in the feed.
		//	description:
		//		Function to Create a new entry object in the feed.
		//	returns:
		//		An empty entry object in the feed.
		var entry = new dojox.atom.io.model.Entry();
		entry.feedUrl = this.getSelfHref();
		return entry; //object
	},
	getSelfHref: function(){
		//	summary:
		//		Function to get the href that refers to this feed.
		//	description:
		//		Function to get the href that refers to this feed.
		//	returns:
		//		The href that refers to this feed or null if none.
		if(this.links === null || this.links.length === 0){
			return null;
		}
		for(var x in this.links){
			if(this.links[x].rel && this.links[x].rel == "self"){
				return this.links[x].href; //string
			}
		}
		return null;
	}
});

dojo.declare("dojox.atom.io.model.Service",dojox.atom.io.model.AtomItem,{
	//	summary:
	//		Class container for 'Feed' types.
	//	description:
	//		Class container for 'Feed' types.
	constructor: function(href){
		this.href = href;
	},
	//builds a Service document.  each element of this, except for the namespace, is the href of
	//a service that the server supports.  Some of the common services are:
	//"create-entry" , "user-prefs" , "search-entries" , "edit-template" , "categories"
	buildFromDom: function(/*DOM node*/node){
		//	summary:
		//		Function to do construction of the Service data from the DOM node containing it.
		//	description:
		//		Function to do construction of the Service data from the DOM node containing it.
		//
		//	node:
		//		The DOM node to process for content.
		var i;
		this.workspaces = [];
		if(node.tagName != "service"){
			// FIXME: Need 0.9 DOM util...
			//node = dojox.xml.parser.firstElement(node,"service");
			//if(!node){return;}
			return;
		}
		if(node.namespaceURI != dojox.atom.io.model._Constants.PURL_NS && node.namespaceURI != dojox.atom.io.model._Constants.APP_NS){return;}
		var ns = node.namespaceURI;
		this.name_space = node.namespaceURI;
		//find all workspaces, and create them
		var workspaces ;
		if(typeof(node.getElementsByTagNameNS)!= "undefined"){
			workspaces = node.getElementsByTagNameNS(ns,"workspace");
		}else{
			// This block is IE only, which doesn't have a 'getElementsByTagNameNS' function
			workspaces = [];
			var temp = node.getElementsByTagName('workspace');
			for(i=0; i<temp.length; i++){
				if(temp[i].namespaceURI == ns){
					workspaces.push(temp[i]);
				}
			}
		}
		if(workspaces && workspaces.length > 0){
			var wkLen = 0;
			var workspace;
			for(i = 0; i< workspaces.length; i++){
				workspace = (typeof(workspaces.item)==="undefined"?workspaces[i]:workspaces.item(i));
				var wkspace = new dojox.atom.io.model.Workspace();
				wkspace.buildFromDom(workspace);
				this.workspaces[wkLen++] = wkspace;
			}
		}
	},
	getCollection: function(/*String*/url){
		//	summary:
		//		Function to collections that match a specific url.
		//	description:
		//		Function to collections that match a specific url.
		//
		//	url:
		//		e URL to match collections against.
		for(var i=0;i<this.workspaces.length;i++){
			var coll=this.workspaces[i].collections;
			for(var j=0;j<coll.length;j++){
				if(coll[j].href == url){
					return coll;
				}
			}
		}
		return null;
	}
});

dojo.declare("dojox.atom.io.model.Workspace",dojox.atom.io.model.AtomItem,{
	//	summary:
	//		Class container for 'Workspace' types.
	//	description:
	//		Class container for 'Workspace' types.
	constructor: function(title){
		this.title = title;
		this.collections = [];
	},

	buildFromDom: function(/*DOM node*/node){
		//	summary:
		//		Function to do construction of the Workspace data from the DOM node containing it.
		//	description:
		//		Function to do construction of the Workspace data from the DOM node containing it.
		//
		//	node:
		//		The DOM node to process for content.
		var name = dojox.atom.io.model.util.getNodename(node);
		if(name != "workspace"){return;}
		var c = node.childNodes;
		var len = 0;
		for(var i = 0; i< c.length; i++){
			var child = c[i];
			if(child.nodeType === 1){
				name = dojox.atom.io.model.util.getNodename(child);
				if(child.namespaceURI == dojox.atom.io.model._Constants.PURL_NS || child.namespaceURI == dojox.atom.io.model._Constants.APP_NS){
					if(name === "collection"){
						var coll = new dojox.atom.io.model.Collection();
						coll.buildFromDom(child);
						this.collections[len++] = coll;
					}
				}else if(child.namespaceURI === dojox.atom.io.model._Constants.ATOM_NS){
					if(name === "title"){
						this.title = dojox.xml.parser.textContent(child);
					}
				}
				//FIXME: Add an extension point so others can impl different namespaces.  For now just
				//ignore unknown namespace tags.
			}
		}
	}
});

dojo.declare("dojox.atom.io.model.Collection",dojox.atom.io.model.AtomItem,{
	//	summary:
	//		Class container for 'Collection' types.
	//	description:
	//		Class container for 'Collection' types.
	constructor: function(href, title){
		this.href = href;
		this.title = title;
		this.attributes = [];
		this.features = [];
		this.children = [];
		this.memberType = null;
		this.id = null;
	},

	buildFromDom: function(/*DOM node*/node){
		//	summary:
		//		Function to do construction of the Collection data from the DOM node containing it.
		//	description:
		//		Function to do construction of the Collection data from the DOM node containing it.
		//
		//	node:
		//		The DOM node to process for content.
		this.href = node.getAttribute("href");
		var c = node.childNodes;
		for(var i = 0; i< c.length; i++){
			var child = c[i];
			if(child.nodeType === 1){
				var name = dojox.atom.io.model.util.getNodename(child);
				if(child.namespaceURI == dojox.atom.io.model._Constants.PURL_NS || child.namespaceURI == dojox.atom.io.model._Constants.APP_NS){
					if(name === "member-type"){
						this.memberType = dojox.xml.parser.textContent(child);
					}else if(name == "feature"){//this IF stmt might need some more work
						if(child.getAttribute("id")){this.features.push(child.getAttribute("id"));}
					}else{
						var unknownTypeChild = new dojox.atom.io.model.Node();
						unknownTypeChild.buildFromDom(child);
						this.children.push(unknownTypeChild);
					}
				}else if(child.namespaceURI === dojox.atom.io.model._Constants.ATOM_NS){
					if(name === "id"){
						this.id = dojox.xml.parser.textContent(child);
					}else if(name === "title"){
						this.title = dojox.xml.parser.textContent(child);
					}
				}
			}
		}
	}
});

}

if(!dojo._hasResource["dojo.date"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo.date"] = true;
dojo.provide("dojo.date");


dojo.getObject("date", true, dojo);

/*=====
dojo.date = {
	// summary: Date manipulation utilities
}
=====*/

dojo.date.getDaysInMonth = function(/*Date*/dateObject){
	//	summary:
	//		Returns the number of days in the month used by dateObject
	var month = dateObject.getMonth();
	var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if(month == 1 && dojo.date.isLeapYear(dateObject)){ return 29; } // Number
	return days[month]; // Number
};

dojo.date.isLeapYear = function(/*Date*/dateObject){
	//	summary:
	//		Determines if the year of the dateObject is a leap year
	//	description:
	//		Leap years are years with an additional day YYYY-02-29, where the
	//		year number is a multiple of four with the following exception: If
	//		a year is a multiple of 100, then it is only a leap year if it is
	//		also a multiple of 400. For example, 1900 was not a leap year, but
	//		2000 is one.

	var year = dateObject.getFullYear();
	return !(year%400) || (!(year%4) && !!(year%100)); // Boolean
};

// FIXME: This is not localized
dojo.date.getTimezoneName = function(/*Date*/dateObject){
	//	summary:
	//		Get the user's time zone as provided by the browser
	// dateObject:
	//		Needed because the timezone may vary with time (daylight savings)
	//	description:
	//		Try to get time zone info from toString or toLocaleString method of
	//		the Date object -- UTC offset is not a time zone.  See
	//		http://www.twinsun.com/tz/tz-link.htm Note: results may be
	//		inconsistent across browsers.

	var str = dateObject.toString(); // Start looking in toString
	var tz = ''; // The result -- return empty string if nothing found
	var match;

	// First look for something in parentheses -- fast lookup, no regex
	var pos = str.indexOf('(');
	if(pos > -1){
		tz = str.substring(++pos, str.indexOf(')'));
	}else{
		// If at first you don't succeed ...
		// If IE knows about the TZ, it appears before the year
		// Capital letters or slash before a 4-digit year
		// at the end of string
		var pat = /([A-Z\/]+) \d{4}$/;
		if((match = str.match(pat))){
			tz = match[1];
		}else{
		// Some browsers (e.g. Safari) glue the TZ on the end
		// of toLocaleString instead of putting it in toString
			str = dateObject.toLocaleString();
			// Capital letters or slash -- end of string,
			// after space
			pat = / ([A-Z\/]+)$/;
			if((match = str.match(pat))){
				tz = match[1];
			}
		}
	}

	// Make sure it doesn't somehow end up return AM or PM
	return (tz == 'AM' || tz == 'PM') ? '' : tz; // String
};

// Utility methods to do arithmetic calculations with Dates

dojo.date.compare = function(/*Date*/date1, /*Date?*/date2, /*String?*/portion){
	//	summary:
	//		Compare two date objects by date, time, or both.
	//	description:
	//  	Returns 0 if equal, positive if a > b, else negative.
	//	date1:
	//		Date object
	//	date2:
	//		Date object.  If not specified, the current Date is used.
	//	portion:
	//		A string indicating the "date" or "time" portion of a Date object.
	//		Compares both "date" and "time" by default.  One of the following:
	//		"date", "time", "datetime"

	// Extra step required in copy for IE - see #3112
	date1 = new Date(+date1);
	date2 = new Date(+(date2 || new Date()));

	if(portion == "date"){
		// Ignore times and compare dates.
		date1.setHours(0, 0, 0, 0);
		date2.setHours(0, 0, 0, 0);
	}else if(portion == "time"){
		// Ignore dates and compare times.
		date1.setFullYear(0, 0, 0);
		date2.setFullYear(0, 0, 0);
	}
	
	if(date1 > date2){ return 1; } // int
	if(date1 < date2){ return -1; } // int
	return 0; // int
};

dojo.date.add = function(/*Date*/date, /*String*/interval, /*int*/amount){
	//	summary:
	//		Add to a Date in intervals of different size, from milliseconds to years
	//	date: Date
	//		Date object to start with
	//	interval:
	//		A string representing the interval.  One of the following:
	//			"year", "month", "day", "hour", "minute", "second",
	//			"millisecond", "quarter", "week", "weekday"
	//	amount:
	//		How much to add to the date.

	var sum = new Date(+date); // convert to Number before copying to accomodate IE (#3112)
	var fixOvershoot = false;
	var property = "Date";

	switch(interval){
		case "day":
			break;
		case "weekday":
			//i18n FIXME: assumes Saturday/Sunday weekend, but this is not always true.  see dojo.cldr.supplemental

			// Divide the increment time span into weekspans plus leftover days
			// e.g., 8 days is one 5-day weekspan / and two leftover days
			// Can't have zero leftover days, so numbers divisible by 5 get
			// a days value of 5, and the remaining days make up the number of weeks
			var days, weeks;
			var mod = amount % 5;
			if(!mod){
				days = (amount > 0) ? 5 : -5;
				weeks = (amount > 0) ? ((amount-5)/5) : ((amount+5)/5);
			}else{
				days = mod;
				weeks = parseInt(amount/5);
			}
			// Get weekday value for orig date param
			var strt = date.getDay();
			// Orig date is Sat / positive incrementer
			// Jump over Sun
			var adj = 0;
			if(strt == 6 && amount > 0){
				adj = 1;
			}else if(strt == 0 && amount < 0){
			// Orig date is Sun / negative incrementer
			// Jump back over Sat
				adj = -1;
			}
			// Get weekday val for the new date
			var trgt = strt + days;
			// New date is on Sat or Sun
			if(trgt == 0 || trgt == 6){
				adj = (amount > 0) ? 2 : -2;
			}
			// Increment by number of weeks plus leftover days plus
			// weekend adjustments
			amount = (7 * weeks) + days + adj;
			break;
		case "year":
			property = "FullYear";
			// Keep increment/decrement from 2/29 out of March
			fixOvershoot = true;
			break;
		case "week":
			amount *= 7;
			break;
		case "quarter":
			// Naive quarter is just three months
			amount *= 3;
			// fallthrough...
		case "month":
			// Reset to last day of month if you overshoot
			fixOvershoot = true;
			property = "Month";
			break;
//		case "hour":
//		case "minute":
//		case "second":
//		case "millisecond":
		default:
			property = "UTC"+interval.charAt(0).toUpperCase() + interval.substring(1) + "s";
	}

	if(property){
		sum["set"+property](sum["get"+property]()+amount);
	}

	if(fixOvershoot && (sum.getDate() < date.getDate())){
		sum.setDate(0);
	}

	return sum; // Date
};

dojo.date.difference = function(/*Date*/date1, /*Date?*/date2, /*String?*/interval){
	//	summary:
	//		Get the difference in a specific unit of time (e.g., number of
	//		months, weeks, days, etc.) between two dates, rounded to the
	//		nearest integer.
	//	date1:
	//		Date object
	//	date2:
	//		Date object.  If not specified, the current Date is used.
	//	interval:
	//		A string representing the interval.  One of the following:
	//			"year", "month", "day", "hour", "minute", "second",
	//			"millisecond", "quarter", "week", "weekday"
	//		Defaults to "day".

	date2 = date2 || new Date();
	interval = interval || "day";
	var yearDiff = date2.getFullYear() - date1.getFullYear();
	var delta = 1; // Integer return value

	switch(interval){
		case "quarter":
			var m1 = date1.getMonth();
			var m2 = date2.getMonth();
			// Figure out which quarter the months are in
			var q1 = Math.floor(m1/3) + 1;
			var q2 = Math.floor(m2/3) + 1;
			// Add quarters for any year difference between the dates
			q2 += (yearDiff * 4);
			delta = q2 - q1;
			break;
		case "weekday":
			var days = Math.round(dojo.date.difference(date1, date2, "day"));
			var weeks = parseInt(dojo.date.difference(date1, date2, "week"));
			var mod = days % 7;

			// Even number of weeks
			if(mod == 0){
				days = weeks*5;
			}else{
				// Weeks plus spare change (< 7 days)
				var adj = 0;
				var aDay = date1.getDay();
				var bDay = date2.getDay();

				weeks = parseInt(days/7);
				mod = days % 7;
				// Mark the date advanced by the number of
				// round weeks (may be zero)
				var dtMark = new Date(date1);
				dtMark.setDate(dtMark.getDate()+(weeks*7));
				var dayMark = dtMark.getDay();

				// Spare change days -- 6 or less
				if(days > 0){
					switch(true){
						// Range starts on Sat
						case aDay == 6:
							adj = -1;
							break;
						// Range starts on Sun
						case aDay == 0:
							adj = 0;
							break;
						// Range ends on Sat
						case bDay == 6:
							adj = -1;
							break;
						// Range ends on Sun
						case bDay == 0:
							adj = -2;
							break;
						// Range contains weekend
						case (dayMark + mod) > 5:
							adj = -2;
					}
				}else if(days < 0){
					switch(true){
						// Range starts on Sat
						case aDay == 6:
							adj = 0;
							break;
						// Range starts on Sun
						case aDay == 0:
							adj = 1;
							break;
						// Range ends on Sat
						case bDay == 6:
							adj = 2;
							break;
						// Range ends on Sun
						case bDay == 0:
							adj = 1;
							break;
						// Range contains weekend
						case (dayMark + mod) < 0:
							adj = 2;
					}
				}
				days += adj;
				days -= (weeks*2);
			}
			delta = days;
			break;
		case "year":
			delta = yearDiff;
			break;
		case "month":
			delta = (date2.getMonth() - date1.getMonth()) + (yearDiff * 12);
			break;
		case "week":
			// Truncate instead of rounding
			// Don't use Math.floor -- value may be negative
			delta = parseInt(dojo.date.difference(date1, date2, "day")/7);
			break;
		case "day":
			delta /= 24;
			// fallthrough
		case "hour":
			delta /= 60;
			// fallthrough
		case "minute":
			delta /= 60;
			// fallthrough
		case "second":
			delta /= 1000;
			// fallthrough
		case "millisecond":
			delta *= date2.getTime() - date1.getTime();
	}

	// Round for fractional values and DST leaps
	return Math.round(delta); // Number (integer)
};

}

if(!dojo._hasResource["dojo.i18n"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo.i18n"] = true;
dojo.provide("dojo.i18n");


dojo.getObject("i18n", true, dojo);

/*=====
dojo.i18n = {
	// summary: Utility classes to enable loading of resources for internationalization (i18n)
};
=====*/

// when using a real AMD loader, dojo.i18n.getLocalization is already defined by dojo/lib/backCompat
dojo.i18n.getLocalization = dojo.i18n.getLocalization || function(/*String*/packageName, /*String*/bundleName, /*String?*/locale){
	//	summary:
	//		Returns an Object containing the localization for a given resource
	//		bundle in a package, matching the specified locale.
	//	description:
	//		Returns a hash containing name/value pairs in its prototypesuch
	//		that values can be easily overridden.  Throws an exception if the
	//		bundle is not found.  Bundle must have already been loaded by
	//		`dojo.requireLocalization()` or by a build optimization step.  NOTE:
	//		try not to call this method as part of an object property
	//		definition (`var foo = { bar: dojo.i18n.getLocalization() }`).  In
	//		some loading situations, the bundle may not be available in time
	//		for the object definition.  Instead, call this method inside a
	//		function that is run after all modules load or the page loads (like
	//		in `dojo.addOnLoad()`), or in a widget lifecycle method.
	//	packageName:
	//		package which is associated with this resource
	//	bundleName:
	//		the base filename of the resource bundle (without the ".js" suffix)
	//	locale:
	//		the variant to load (optional).  By default, the locale defined by
	//		the host environment: dojo.locale

	locale = dojo.i18n.normalizeLocale(locale);

	// look for nearest locale match
	var elements = locale.split('-');
	var module = [packageName,"nls",bundleName].join('.');
		var bundle = dojo._loadedModules[module];
	if(bundle){
		var localization;
		for(var i = elements.length; i > 0; i--){
			var loc = elements.slice(0, i).join('_');
			if(bundle[loc]){
				localization = bundle[loc];
				break;
			}
		}
		if(!localization){
			localization = bundle.ROOT;
		}

		// make a singleton prototype so that the caller won't accidentally change the values globally
		if(localization){
			var clazz = function(){};
			clazz.prototype = localization;
			return new clazz(); // Object
		}
	}

	throw new Error("Bundle not found: " + bundleName + " in " + packageName+" , locale=" + locale);
};

dojo.i18n.normalizeLocale = function(/*String?*/locale){
	//	summary:
	//		Returns canonical form of locale, as used by Dojo.
	//
	//  description:
	//		All variants are case-insensitive and are separated by '-' as specified in [RFC 3066](http://www.ietf.org/rfc/rfc3066.txt).
	//		If no locale is specified, the dojo.locale is returned.  dojo.locale is defined by
	//		the user agent's locale unless overridden by djConfig.

	var result = locale ? locale.toLowerCase() : dojo.locale;
	if(result == "root"){
		result = "ROOT";
	}
	return result; // String
};

dojo.i18n._requireLocalization = function(/*String*/moduleName, /*String*/bundleName, /*String?*/locale, /*String?*/availableFlatLocales){
	//	summary:
	//		See dojo.requireLocalization()
	//	description:
	// 		Called by the bootstrap, but factored out so that it is only
	// 		included in the build when needed.

	var targetLocale = dojo.i18n.normalizeLocale(locale);
 	var bundlePackage = [moduleName, "nls", bundleName].join(".");
	// NOTE:
	//		When loading these resources, the packaging does not match what is
	//		on disk.  This is an implementation detail, as this is just a
	//		private data structure to hold the loaded resources.  e.g.
	//		`tests/hello/nls/en-us/salutations.js` is loaded as the object
	//		`tests.hello.nls.salutations.en_us={...}` The structure on disk is
	//		intended to be most convenient for developers and translators, but
	//		in memory it is more logical and efficient to store in a different
	//		order.  Locales cannot use dashes, since the resulting path will
	//		not evaluate as valid JS, so we translate them to underscores.

	//Find the best-match locale to load if we have available flat locales.
	var bestLocale = "";
	if(availableFlatLocales){
		var flatLocales = availableFlatLocales.split(",");
		for(var i = 0; i < flatLocales.length; i++){
			//Locale must match from start of string.
			//Using ["indexOf"] so customBase builds do not see
			//this as a dojo._base.array dependency.
			if(targetLocale["indexOf"](flatLocales[i]) == 0){
				if(flatLocales[i].length > bestLocale.length){
					bestLocale = flatLocales[i];
				}
			}
		}
		if(!bestLocale){
			bestLocale = "ROOT";
		}
	}

	//See if the desired locale is already loaded.
	var tempLocale = availableFlatLocales ? bestLocale : targetLocale;
	var bundle = dojo._loadedModules[bundlePackage];
	var localizedBundle = null;
	if(bundle){
		if(dojo.config.localizationComplete && bundle._built){return;}
		var jsLoc = tempLocale.replace(/-/g, '_');
		var translationPackage = bundlePackage+"."+jsLoc;
		localizedBundle = dojo._loadedModules[translationPackage];
	}

	if(!localizedBundle){
		bundle = dojo["provide"](bundlePackage);
		var syms = dojo._getModuleSymbols(moduleName);
		var modpath = syms.concat("nls").join("/");
		var parent;

		dojo.i18n._searchLocalePath(tempLocale, availableFlatLocales, function(loc){
			var jsLoc = loc.replace(/-/g, '_');
			var translationPackage = bundlePackage + "." + jsLoc;
			var loaded = false;
			if(!dojo._loadedModules[translationPackage]){
				// Mark loaded whether it's found or not, so that further load attempts will not be made
				dojo["provide"](translationPackage);
				var module = [modpath];
				if(loc != "ROOT"){module.push(loc);}
				module.push(bundleName);
				var filespec = module.join("/") + '.js';
				loaded = dojo._loadPath(filespec, null, function(hash){
					hash = hash.root || hash;
					// Use singleton with prototype to point to parent bundle, then mix-in result from loadPath
					var clazz = function(){};
					clazz.prototype = parent;
					bundle[jsLoc] = new clazz();
					for(var j in hash){ bundle[jsLoc][j] = hash[j]; }
				});
			}else{
				loaded = true;
			}
			if(loaded && bundle[jsLoc]){
				parent = bundle[jsLoc];
			}else{
				bundle[jsLoc] = parent;
			}

			if(availableFlatLocales){
				//Stop the locale path searching if we know the availableFlatLocales, since
				//the first call to this function will load the only bundle that is needed.
				return true;
			}
		});
	}

	//Save the best locale bundle as the target locale bundle when we know the
	//the available bundles.
	if(availableFlatLocales && targetLocale != bestLocale){
		bundle[targetLocale.replace(/-/g, '_')] = bundle[bestLocale.replace(/-/g, '_')];
	}
};

(function(){
	// If other locales are used, dojo.requireLocalization should load them as
	// well, by default.
	//
	// Override dojo.requireLocalization to do load the default bundle, then
	// iterate through the extraLocale list and load those translations as
	// well, unless a particular locale was requested.

	var extra = dojo.config.extraLocale;
	if(extra){
		if(!extra instanceof Array){
			extra = [extra];
		}

		var req = dojo.i18n._requireLocalization;
		dojo.i18n._requireLocalization = function(m, b, locale, availableFlatLocales){
			req(m,b,locale, availableFlatLocales);
			if(locale){return;}
			for(var i=0; i<extra.length; i++){
				req(m,b,extra[i], availableFlatLocales);
			}
		};
	}
})();

dojo.i18n._searchLocalePath = function(/*String*/locale, /*Boolean*/down, /*Function*/searchFunc){
	//	summary:
	//		A helper method to assist in searching for locale-based resources.
	//		Will iterate through the variants of a particular locale, either up
	//		or down, executing a callback function.  For example, "en-us" and
	//		true will try "en-us" followed by "en" and finally "ROOT".

	locale = dojo.i18n.normalizeLocale(locale);

	var elements = locale.split('-');
	var searchlist = [];
	for(var i = elements.length; i > 0; i--){
		searchlist.push(elements.slice(0, i).join('-'));
	}
	searchlist.push(false);
	if(down){searchlist.reverse();}

	for(var j = searchlist.length - 1; j >= 0; j--){
		var loc = searchlist[j] || "ROOT";
		var stop = searchFunc(loc);
		if(stop){ break; }
	}
};

dojo.i18n._preloadLocalizations = function(/*String*/bundlePrefix, /*Array*/localesGenerated){
	//	summary:
	//		Load built, flattened resource bundles, if available for all
	//		locales used in the page. Only called by built layer files.

	function preload(locale){
		locale = dojo.i18n.normalizeLocale(locale);
		dojo.i18n._searchLocalePath(locale, true, function(loc){
			for(var i=0; i<localesGenerated.length;i++){
				if(localesGenerated[i] == loc){
					dojo["require"](bundlePrefix+"_"+loc);
					return true; // Boolean
				}
			}
			return false; // Boolean
		});
	}
	preload();
	var extra = dojo.config.extraLocale||[];
	for(var i=0; i<extra.length; i++){
		preload(extra[i]);
	}
};

}

if(!dojo._hasResource["dojo.cldr.supplemental"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo.cldr.supplemental"] = true;
dojo.provide("dojo.cldr.supplemental");



dojo.getObject("cldr.supplemental", true, dojo);

dojo.cldr.supplemental.getFirstDayOfWeek = function(/*String?*/locale){
// summary: Returns a zero-based index for first day of the week
// description:
//		Returns a zero-based index for first day of the week, as used by the local (Gregorian) calendar.
//		e.g. Sunday (returns 0), or Monday (returns 1)

	// from http://www.unicode.org/cldr/data/common/supplemental/supplementalData.xml:supplementalData/weekData/firstDay
	var firstDay = {/*default is 1=Monday*/
		mv:5,
		ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,
		ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,sy:6,tn:6,ye:6,
		ar:0,as:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,
		il:0,'in':0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mn:0,mo:0,mp:0,
		mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,
		vi:0,zw:0
// variant. do not use?		gb:0,
	};

	var country = dojo.cldr.supplemental._region(locale);
	var dow = firstDay[country];
	return (dow === undefined) ? 1 : dow; /*Number*/
};

dojo.cldr.supplemental._region = function(/*String?*/locale){
	locale = dojo.i18n.normalizeLocale(locale);
	var tags = locale.split('-');
	var region = tags[1];
	if(!region){
		// IE often gives language only (#2269)
		// Arbitrary mappings of language-only locales to a country:
		region = {de:"de", en:"us", es:"es", fi:"fi", fr:"fr", he:"il", hu:"hu", it:"it",
			ja:"jp", ko:"kr", nl:"nl", pt:"br", sv:"se", zh:"cn"}[tags[0]];
	}else if(region.length == 4){
		// The ISO 3166 country code is usually in the second position, unless a
		// 4-letter script is given. See http://www.ietf.org/rfc/rfc4646.txt
		region = tags[2];
	}
	return region;
};

dojo.cldr.supplemental.getWeekend = function(/*String?*/locale){
// summary: Returns a hash containing the start and end days of the weekend
// description:
//		Returns a hash containing the start and end days of the weekend according to local custom using locale,
//		or by default in the user's locale.
//		e.g. {start:6, end:0}

	// from http://www.unicode.org/cldr/data/common/supplemental/supplementalData.xml:supplementalData/weekData/weekend{Start,End}
	var weekendStart = {/*default is 6=Saturday*/
		'in':0,
		af:4,dz:4,ir:4,om:4,sa:4,ye:4,
		ae:5,bh:5,eg:5,il:5,iq:5,jo:5,kw:5,ly:5,ma:5,qa:5,sd:5,sy:5,tn:5
	};

	var weekendEnd = {/*default is 0=Sunday*/
		af:5,dz:5,ir:5,om:5,sa:5,ye:5,
		ae:6,bh:5,eg:6,il:6,iq:6,jo:6,kw:6,ly:6,ma:6,qa:6,sd:6,sy:6,tn:6
	};

	var country = dojo.cldr.supplemental._region(locale);
	var start = weekendStart[country];
	var end = weekendEnd[country];
	if(start === undefined){start=6;}
	if(end === undefined){end=0;}
	return {start:start, end:end}; /*Object {start,end}*/
};

}

if(!dojo._hasResource["dojo.regexp"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo.regexp"] = true;
dojo.provide("dojo.regexp");


dojo.getObject("regexp", true, dojo);

/*=====
dojo.regexp = {
	// summary: Regular expressions and Builder resources
};
=====*/

dojo.regexp.escapeString = function(/*String*/str, /*String?*/except){
	//	summary:
	//		Adds escape sequences for special characters in regular expressions
	// except:
	//		a String with special characters to be left unescaped

	return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, function(ch){
		if(except && except.indexOf(ch) != -1){
			return ch;
		}
		return "\\" + ch;
	}); // String
};

dojo.regexp.buildGroupRE = function(/*Object|Array*/arr, /*Function*/re, /*Boolean?*/nonCapture){
	//	summary:
	//		Builds a regular expression that groups subexpressions
	//	description:
	//		A utility function used by some of the RE generators. The
	//		subexpressions are constructed by the function, re, in the second
	//		parameter.  re builds one subexpression for each elem in the array
	//		a, in the first parameter. Returns a string for a regular
	//		expression that groups all the subexpressions.
	// arr:
	//		A single value or an array of values.
	// re:
	//		A function. Takes one parameter and converts it to a regular
	//		expression.
	// nonCapture:
	//		If true, uses non-capturing match, otherwise matches are retained
	//		by regular expression. Defaults to false

	// case 1: a is a single value.
	if(!(arr instanceof Array)){
		return re(arr); // String
	}

	// case 2: a is an array
	var b = [];
	for(var i = 0; i < arr.length; i++){
		// convert each elem to a RE
		b.push(re(arr[i]));
	}

	 // join the REs as alternatives in a RE group.
	return dojo.regexp.group(b.join("|"), nonCapture); // String
};

dojo.regexp.group = function(/*String*/expression, /*Boolean?*/nonCapture){
	// summary:
	//		adds group match to expression
	// nonCapture:
	//		If true, uses non-capturing match, otherwise matches are retained
	//		by regular expression.
	return "(" + (nonCapture ? "?:":"") + expression + ")"; // String
};

}

if(!dojo._hasResource["dojo.date.locale"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo.date.locale"] = true;
dojo.provide("dojo.date.locale");








dojo.getObject("date.locale", true, dojo);

// Localization methods for Date.   Honor local customs using locale-dependent dojo.cldr data.


// Load the bundles containing localization information for
// names and formats

//NOTE: Everything in this module assumes Gregorian calendars.
// Other calendars will be implemented in separate modules.

(function(){
	// Format a pattern without literals
	function formatPattern(dateObject, bundle, options, pattern){
		return pattern.replace(/([a-z])\1*/ig, function(match){
			var s, pad,
				c = match.charAt(0),
				l = match.length,
				widthList = ["abbr", "wide", "narrow"];
			switch(c){
				case 'G':
					s = bundle[(l < 4) ? "eraAbbr" : "eraNames"][dateObject.getFullYear() < 0 ? 0 : 1];
					break;
				case 'y':
					s = dateObject.getFullYear();
					switch(l){
						case 1:
							break;
						case 2:
							if(!options.fullYear){
								s = String(s); s = s.substr(s.length - 2);
								break;
							}
							// fallthrough
						default:
							pad = true;
					}
					break;
				case 'Q':
				case 'q':
					s = Math.ceil((dateObject.getMonth()+1)/3);
//					switch(l){
//						case 1: case 2:
							pad = true;
//							break;
//						case 3: case 4: // unimplemented
//					}
					break;
				case 'M':
					var m = dateObject.getMonth();
					if(l<3){
						s = m+1; pad = true;
					}else{
						var propM = ["months", "format", widthList[l-3]].join("-");
						s = bundle[propM][m];
					}
					break;
				case 'w':
					var firstDay = 0;
					s = dojo.date.locale._getWeekOfYear(dateObject, firstDay); pad = true;
					break;
				case 'd':
					s = dateObject.getDate(); pad = true;
					break;
				case 'D':
					s = dojo.date.locale._getDayOfYear(dateObject); pad = true;
					break;
				case 'E':
					var d = dateObject.getDay();
					if(l<3){
						s = d+1; pad = true;
					}else{
						var propD = ["days", "format", widthList[l-3]].join("-");
						s = bundle[propD][d];
					}
					break;
				case 'a':
					var timePeriod = (dateObject.getHours() < 12) ? 'am' : 'pm';
					s = options[timePeriod] || bundle['dayPeriods-format-wide-' + timePeriod];
					break;
				case 'h':
				case 'H':
				case 'K':
				case 'k':
					var h = dateObject.getHours();
					// strange choices in the date format make it impossible to write this succinctly
					switch (c){
						case 'h': // 1-12
							s = (h % 12) || 12;
							break;
						case 'H': // 0-23
							s = h;
							break;
						case 'K': // 0-11
							s = (h % 12);
							break;
						case 'k': // 1-24
							s = h || 24;
							break;
					}
					pad = true;
					break;
				case 'm':
					s = dateObject.getMinutes(); pad = true;
					break;
				case 's':
					s = dateObject.getSeconds(); pad = true;
					break;
				case 'S':
					s = Math.round(dateObject.getMilliseconds() * Math.pow(10, l-3)); pad = true;
					break;
				case 'v': // FIXME: don't know what this is. seems to be same as z?
				case 'z':
					// We only have one timezone to offer; the one from the browser
					s = dojo.date.locale._getZone(dateObject, true, options);
					if(s){break;}
					l=4;
					// fallthrough... use GMT if tz not available
				case 'Z':
					var offset = dojo.date.locale._getZone(dateObject, false, options);
					var tz = [
						(offset<=0 ? "+" : "-"),
						dojo.string.pad(Math.floor(Math.abs(offset)/60), 2),
						dojo.string.pad(Math.abs(offset)% 60, 2)
					];
					if(l==4){
						tz.splice(0, 0, "GMT");
						tz.splice(3, 0, ":");
					}
					s = tz.join("");
					break;
//				case 'Y': case 'u': case 'W': case 'F': case 'g': case 'A': case 'e':
//					console.log(match+" modifier unimplemented");
				default:
					throw new Error("dojo.date.locale.format: invalid pattern char: "+pattern);
			}
			if(pad){ s = dojo.string.pad(s, l); }
			return s;
		});
	}

/*=====
	dojo.date.locale.__FormatOptions = function(){
	//	selector: String
	//		choice of 'time','date' (default: date and time)
	//	formatLength: String
	//		choice of long, short, medium or full (plus any custom additions).  Defaults to 'short'
	//	datePattern:String
	//		override pattern with this string
	//	timePattern:String
	//		override pattern with this string
	//	am: String
	//		override strings for am in times
	//	pm: String
	//		override strings for pm in times
	//	locale: String
	//		override the locale used to determine formatting rules
	//	fullYear: Boolean
	//		(format only) use 4 digit years whenever 2 digit years are called for
	//	strict: Boolean
	//		(parse only) strict parsing, off by default
		this.selector = selector;
		this.formatLength = formatLength;
		this.datePattern = datePattern;
		this.timePattern = timePattern;
		this.am = am;
		this.pm = pm;
		this.locale = locale;
		this.fullYear = fullYear;
		this.strict = strict;
	}
=====*/

dojo.date.locale._getZone = function(/*Date*/dateObject, /*boolean*/getName, /*dojo.date.locale.__FormatOptions?*/options){
	// summary:
	//		Returns the zone (or offset) for the given date and options.  This
	//		is broken out into a separate function so that it can be overridden
	//		by timezone-aware code.
	//
	// dateObject:
	//		the date and/or time being formatted.
	//
	// getName:
	//		Whether to return the timezone string (if true), or the offset (if false)
	//
	// options:
	//		The options being used for formatting
	if(getName){
		return dojo.date.getTimezoneName(dateObject);
	}else{
		return dateObject.getTimezoneOffset();
	}
};


dojo.date.locale.format = function(/*Date*/dateObject, /*dojo.date.locale.__FormatOptions?*/options){
	// summary:
	//		Format a Date object as a String, using locale-specific settings.
	//
	// description:
	//		Create a string from a Date object using a known localized pattern.
	//		By default, this method formats both date and time from dateObject.
	//		Formatting patterns are chosen appropriate to the locale.  Different
	//		formatting lengths may be chosen, with "full" used by default.
	//		Custom patterns may be used or registered with translations using
	//		the dojo.date.locale.addCustomFormats method.
	//		Formatting patterns are implemented using [the syntax described at
	//		unicode.org](http://www.unicode.org/reports/tr35/tr35-4.html#Date_Format_Patterns)
	//
	// dateObject:
	//		the date and/or time to be formatted.  If a time only is formatted,
	//		the values in the year, month, and day fields are irrelevant.  The
	//		opposite is true when formatting only dates.

	options = options || {};

	var locale = dojo.i18n.normalizeLocale(options.locale),
		formatLength = options.formatLength || 'short',
		bundle = dojo.date.locale._getGregorianBundle(locale),
		str = [],
		sauce = dojo.hitch(this, formatPattern, dateObject, bundle, options);
	if(options.selector == "year"){
		return _processPattern(bundle["dateFormatItem-yyyy"] || "yyyy", sauce);
	}
	var pattern;
	if(options.selector != "date"){
		pattern = options.timePattern || bundle["timeFormat-"+formatLength];
		if(pattern){str.push(_processPattern(pattern, sauce));}
	}
	if(options.selector != "time"){
		pattern = options.datePattern || bundle["dateFormat-"+formatLength];
		if(pattern){str.push(_processPattern(pattern, sauce));}
	}

	return str.length == 1 ? str[0] : bundle["dateTimeFormat-"+formatLength].replace(/\{(\d+)\}/g,
		function(match, key){ return str[key]; }); // String
};

dojo.date.locale.regexp = function(/*dojo.date.locale.__FormatOptions?*/options){
	// summary:
	//		Builds the regular needed to parse a localized date

	return dojo.date.locale._parseInfo(options).regexp; // String
};

dojo.date.locale._parseInfo = function(/*dojo.date.locale.__FormatOptions?*/options){
	options = options || {};
	var locale = dojo.i18n.normalizeLocale(options.locale),
		bundle = dojo.date.locale._getGregorianBundle(locale),
		formatLength = options.formatLength || 'short',
		datePattern = options.datePattern || bundle["dateFormat-" + formatLength],
		timePattern = options.timePattern || bundle["timeFormat-" + formatLength],
		pattern;
	if(options.selector == 'date'){
		pattern = datePattern;
	}else if(options.selector == 'time'){
		pattern = timePattern;
	}else{
		pattern = bundle["dateTimeFormat-"+formatLength].replace(/\{(\d+)\}/g,
			function(match, key){ return [timePattern, datePattern][key]; });
	}

	var tokens = [],
		re = _processPattern(pattern, dojo.hitch(this, _buildDateTimeRE, tokens, bundle, options));
	return {regexp: re, tokens: tokens, bundle: bundle};
};

dojo.date.locale.parse = function(/*String*/value, /*dojo.date.locale.__FormatOptions?*/options){
	// summary:
	//		Convert a properly formatted string to a primitive Date object,
	//		using locale-specific settings.
	//
	// description:
	//		Create a Date object from a string using a known localized pattern.
	//		By default, this method parses looking for both date and time in the string.
	//		Formatting patterns are chosen appropriate to the locale.  Different
	//		formatting lengths may be chosen, with "full" used by default.
	//		Custom patterns may be used or registered with translations using
	//		the dojo.date.locale.addCustomFormats method.
	//
	//		Formatting patterns are implemented using [the syntax described at
	//		unicode.org](http://www.unicode.org/reports/tr35/tr35-4.html#Date_Format_Patterns)
	//		When two digit years are used, a century is chosen according to a sliding
	//		window of 80 years before and 20 years after present year, for both `yy` and `yyyy` patterns.
	//		year < 100CE requires strict mode.
	//
	// value:
	//		A string representation of a date

	// remove non-printing bidi control chars from input and pattern
	var controlChars = /[\u200E\u200F\u202A\u202E]/g,
		info = dojo.date.locale._parseInfo(options),
		tokens = info.tokens, bundle = info.bundle,
		re = new RegExp("^" + info.regexp.replace(controlChars, "") + "$",
			info.strict ? "" : "i"),
		match = re.exec(value && value.replace(controlChars, ""));

	if(!match){ return null; } // null

	var widthList = ['abbr', 'wide', 'narrow'],
		result = [1970,0,1,0,0,0,0], // will get converted to a Date at the end
		amPm = "",
		valid = dojo.every(match, function(v, i){
		if(!i){return true;}
		var token=tokens[i-1];
		var l=token.length;
		switch(token.charAt(0)){
			case 'y':
				if(l != 2 && options.strict){
					//interpret year literally, so '5' would be 5 A.D.
					result[0] = v;
				}else{
					if(v<100){
						v = Number(v);
						//choose century to apply, according to a sliding window
						//of 80 years before and 20 years after present year
						var year = '' + new Date().getFullYear(),
							century = year.substring(0, 2) * 100,
							cutoff = Math.min(Number(year.substring(2, 4)) + 20, 99),
							num = (v < cutoff) ? century + v : century - 100 + v;
						result[0] = num;
					}else{
						//we expected 2 digits and got more...
						if(options.strict){
							return false;
						}
						//interpret literally, so '150' would be 150 A.D.
						//also tolerate '1950', if 'yyyy' input passed to 'yy' format
						result[0] = v;
					}
				}
				break;
			case 'M':
				if(l>2){
					var months = bundle['months-format-' + widthList[l-3]].concat();
					if(!options.strict){
						//Tolerate abbreviating period in month part
						//Case-insensitive comparison
						v = v.replace(".","").toLowerCase();
						months = dojo.map(months, function(s){ return s.replace(".","").toLowerCase(); } );
					}
					v = dojo.indexOf(months, v);
					if(v == -1){
//						console.log("dojo.date.locale.parse: Could not parse month name: '" + v + "'.");
						return false;
					}
				}else{
					v--;
				}
				result[1] = v;
				break;
			case 'E':
			case 'e':
				var days = bundle['days-format-' + widthList[l-3]].concat();
				if(!options.strict){
					//Case-insensitive comparison
					v = v.toLowerCase();
					days = dojo.map(days, function(d){return d.toLowerCase();});
				}
				v = dojo.indexOf(days, v);
				if(v == -1){
//					console.log("dojo.date.locale.parse: Could not parse weekday name: '" + v + "'.");
					return false;
				}

				//TODO: not sure what to actually do with this input,
				//in terms of setting something on the Date obj...?
				//without more context, can't affect the actual date
				//TODO: just validate?
				break;
			case 'D':
				result[1] = 0;
				// fallthrough...
			case 'd':
				result[2] = v;
				break;
			case 'a': //am/pm
				var am = options.am || bundle['dayPeriods-format-wide-am'],
					pm = options.pm || bundle['dayPeriods-format-wide-pm'];
				if(!options.strict){
					var period = /\./g;
					v = v.replace(period,'').toLowerCase();
					am = am.replace(period,'').toLowerCase();
					pm = pm.replace(period,'').toLowerCase();
				}
				if(options.strict && v != am && v != pm){
//					console.log("dojo.date.locale.parse: Could not parse am/pm part.");
					return false;
				}

				// we might not have seen the hours field yet, so store the state and apply hour change later
				amPm = (v == pm) ? 'p' : (v == am) ? 'a' : '';
				break;
			case 'K': //hour (1-24)
				if(v == 24){ v = 0; }
				// fallthrough...
			case 'h': //hour (1-12)
			case 'H': //hour (0-23)
			case 'k': //hour (0-11)
				//TODO: strict bounds checking, padding
				if(v > 23){
//					console.log("dojo.date.locale.parse: Illegal hours value");
					return false;
				}

				//in the 12-hour case, adjusting for am/pm requires the 'a' part
				//which could come before or after the hour, so we will adjust later
				result[3] = v;
				break;
			case 'm': //minutes
				result[4] = v;
				break;
			case 's': //seconds
				result[5] = v;
				break;
			case 'S': //milliseconds
				result[6] = v;
//				break;
//			case 'w':
//TODO				var firstDay = 0;
//			default:
//TODO: throw?
//				console.log("dojo.date.locale.parse: unsupported pattern char=" + token.charAt(0));
		}
		return true;
	});

	var hours = +result[3];
	if(amPm === 'p' && hours < 12){
		result[3] = hours + 12; //e.g., 3pm -> 15
	}else if(amPm === 'a' && hours == 12){
		result[3] = 0; //12am -> 0
	}

	//TODO: implement a getWeekday() method in order to test
	//validity of input strings containing 'EEE' or 'EEEE'...

	var dateObject = new Date(result[0], result[1], result[2], result[3], result[4], result[5], result[6]); // Date
	if(options.strict){
		dateObject.setFullYear(result[0]);
	}

	// Check for overflow.  The Date() constructor normalizes things like April 32nd...
	//TODO: why isn't this done for times as well?
	var allTokens = tokens.join(""),
		dateToken = allTokens.indexOf('d') != -1,
		monthToken = allTokens.indexOf('M') != -1;

	if(!valid ||
		(monthToken && dateObject.getMonth() > result[1]) ||
		(dateToken && dateObject.getDate() > result[2])){
		return null;
	}

	// Check for underflow, due to DST shifts.  See #9366
	// This assumes a 1 hour dst shift correction at midnight
	// We could compare the timezone offset after the shift and add the difference instead.
	if((monthToken && dateObject.getMonth() < result[1]) ||
		(dateToken && dateObject.getDate() < result[2])){
		dateObject = dojo.date.add(dateObject, "hour", 1);
	}

	return dateObject; // Date
};

function _processPattern(pattern, applyPattern, applyLiteral, applyAll){
	//summary: Process a pattern with literals in it

	// Break up on single quotes, treat every other one as a literal, except '' which becomes '
	var identity = function(x){return x;};
	applyPattern = applyPattern || identity;
	applyLiteral = applyLiteral || identity;
	applyAll = applyAll || identity;

	//split on single quotes (which escape literals in date format strings)
	//but preserve escaped single quotes (e.g., o''clock)
	var chunks = pattern.match(/(''|[^'])+/g),
		literal = pattern.charAt(0) == "'";

	dojo.forEach(chunks, function(chunk, i){
		if(!chunk){
			chunks[i]='';
		}else{
			chunks[i]=(literal ? applyLiteral : applyPattern)(chunk.replace(/''/g, "'"));
			literal = !literal;
		}
	});
	return applyAll(chunks.join(''));
}

function _buildDateTimeRE(tokens, bundle, options, pattern){
	pattern = dojo.regexp.escapeString(pattern);
	if(!options.strict){ pattern = pattern.replace(" a", " ?a"); } // kludge to tolerate no space before am/pm
	return pattern.replace(/([a-z])\1*/ig, function(match){
		// Build a simple regexp.  Avoid captures, which would ruin the tokens list
		var s,
			c = match.charAt(0),
			l = match.length,
			p2 = '', p3 = '';
		if(options.strict){
			if(l > 1){ p2 = '0' + '{'+(l-1)+'}'; }
			if(l > 2){ p3 = '0' + '{'+(l-2)+'}'; }
		}else{
			p2 = '0?'; p3 = '0{0,2}';
		}
		switch(c){
			case 'y':
				s = '\\d{2,4}';
				break;
			case 'M':
				s = (l>2) ? '\\S+?' : '1[0-2]|'+p2+'[1-9]';
				break;
			case 'D':
				s = '[12][0-9][0-9]|3[0-5][0-9]|36[0-6]|'+p3+'[1-9][0-9]|'+p2+'[1-9]';
				break;
			case 'd':
				s = '3[01]|[12]\\d|'+p2+'[1-9]';
				break;
			case 'w':
				s = '[1-4][0-9]|5[0-3]|'+p2+'[1-9]';
				break;
			case 'E':
				s = '\\S+';
				break;
			case 'h': //hour (1-12)
				s = '1[0-2]|'+p2+'[1-9]';
				break;
			case 'k': //hour (0-11)
				s = '1[01]|'+p2+'\\d';
				break;
			case 'H': //hour (0-23)
				s = '1\\d|2[0-3]|'+p2+'\\d';
				break;
			case 'K': //hour (1-24)
				s = '1\\d|2[0-4]|'+p2+'[1-9]';
				break;
			case 'm':
			case 's':
				s = '[0-5]\\d';
				break;
			case 'S':
				s = '\\d{'+l+'}';
				break;
			case 'a':
				var am = options.am || bundle['dayPeriods-format-wide-am'],
					pm = options.pm || bundle['dayPeriods-format-wide-pm'];
				s = am + '|' + pm;
				if(!options.strict){
					if(am != am.toLowerCase()){ s += '|' + am.toLowerCase(); }
					if(pm != pm.toLowerCase()){ s += '|' + pm.toLowerCase(); }
					if(s.indexOf('.') != -1){ s += '|' + s.replace(/\./g, ""); }
				}
				s = s.replace(/\./g, "\\.");
				break;
			default:
			// case 'v':
			// case 'z':
			// case 'Z':
				s = ".*";
//				console.log("parse of date format, pattern=" + pattern);
		}

		if(tokens){ tokens.push(match); }

		return "(" + s + ")"; // add capture
	}).replace(/[\xa0 ]/g, "[\\s\\xa0]"); // normalize whitespace.  Need explicit handling of \xa0 for IE.
}
})();

(function(){
var _customFormats = [];
dojo.date.locale.addCustomFormats = function(/*String*/packageName, /*String*/bundleName){
	// summary:
	//		Add a reference to a bundle containing localized custom formats to be
	//		used by date/time formatting and parsing routines.
	//
	// description:
	//		The user may add custom localized formats where the bundle has properties following the
	//		same naming convention used by dojo.cldr: `dateFormat-xxxx` / `timeFormat-xxxx`
	//		The pattern string should match the format used by the CLDR.
	//		See dojo.date.locale.format() for details.
	//		The resources must be loaded by dojo.requireLocalization() prior to use

	_customFormats.push({pkg:packageName,name:bundleName});
};

dojo.date.locale._getGregorianBundle = function(/*String*/locale){
	var gregorian = {};
	dojo.forEach(_customFormats, function(desc){
		var bundle = dojo.i18n.getLocalization(desc.pkg, desc.name, locale);
		gregorian = dojo.mixin(gregorian, bundle);
	}, this);
	return gregorian; /*Object*/
};
})();

dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");

dojo.date.locale.getNames = function(/*String*/item, /*String*/type, /*String?*/context, /*String?*/locale){
	// summary:
	//		Used to get localized strings from dojo.cldr for day or month names.
	//
	// item:
	//	'months' || 'days'
	// type:
	//	'wide' || 'narrow' || 'abbr' (e.g. "Monday", "Mon", or "M" respectively, in English)
	// context:
	//	'standAlone' || 'format' (default)
	// locale:
	//	override locale used to find the names

	var label,
		lookup = dojo.date.locale._getGregorianBundle(locale),
		props = [item, context, type];
	if(context == 'standAlone'){
		var key = props.join('-');
		label = lookup[key];
		// Fall back to 'format' flavor of name
		if(label[0] == 1){ label = undefined; } // kludge, in the absence of real aliasing support in dojo.cldr
	}
	props[1] = 'format';

	// return by copy so changes won't be made accidentally to the in-memory model
	return (label || lookup[props.join('-')]).concat(); /*Array*/
};

dojo.date.locale.isWeekend = function(/*Date?*/dateObject, /*String?*/locale){
	// summary:
	//	Determines if the date falls on a weekend, according to local custom.

	var weekend = dojo.cldr.supplemental.getWeekend(locale),
		day = (dateObject || new Date()).getDay();
	if(weekend.end < weekend.start){
		weekend.end += 7;
		if(day < weekend.start){ day += 7; }
	}
	return day >= weekend.start && day <= weekend.end; // Boolean
};

// These are used only by format and strftime.  Do they need to be public?  Which module should they go in?

dojo.date.locale._getDayOfYear = function(/*Date*/dateObject){
	// summary: gets the day of the year as represented by dateObject
	return dojo.date.difference(new Date(dateObject.getFullYear(), 0, 1, dateObject.getHours()), dateObject) + 1; // Number
};

dojo.date.locale._getWeekOfYear = function(/*Date*/dateObject, /*Number*/firstDayOfWeek){
	if(arguments.length == 1){ firstDayOfWeek = 0; } // Sunday

	var firstDayOfYear = new Date(dateObject.getFullYear(), 0, 1).getDay(),
		adj = (firstDayOfYear - firstDayOfWeek + 7) % 7,
		week = Math.floor((dojo.date.locale._getDayOfYear(dateObject) + adj - 1) / 7);

	// if year starts on the specified day, start counting weeks at 1
	if(firstDayOfYear == firstDayOfWeek){ week++; }

	return week; // Number
};

}

if(!dojo._hasResource["dojox.date.posix"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.date.posix"] = true;
dojo.provide("dojox.date.posix");





dojox.date.posix.strftime = function(/*Date*/dateObject, /*String*/format, /*String?*/locale){
//
// summary:
//		Formats the date object using the specifications of the POSIX strftime function
//
// description:
//		see http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html

	// zero pad
	var padChar = null;
	var _ = function(s, n){
		return dojo.string.pad(s, n || 2, padChar || "0");
	};

	var bundle = dojo.date.locale._getGregorianBundle(locale);

	var $ = function(property){
		switch(property){
			case "a": // abbreviated weekday name according to the current locale
				return dojo.date.locale.getNames('days', 'abbr', 'format', locale)[dateObject.getDay()];

			case "A": // full weekday name according to the current locale
				return dojo.date.locale.getNames('days', 'wide', 'format', locale)[dateObject.getDay()];

			case "b":
			case "h": // abbreviated month name according to the current locale
				return dojo.date.locale.getNames('months', 'abbr', 'format', locale)[dateObject.getMonth()];
				
			case "B": // full month name according to the current locale
				return dojo.date.locale.getNames('months', 'wide', 'format', locale)[dateObject.getMonth()];
				
			case "c": // preferred date and time representation for the current
				      // locale
				return dojo.date.locale.format(dateObject, {formatLength: 'full', locale: locale});

			case "C": // century number (the year divided by 100 and truncated
				      // to an integer, range 00 to 99)
				return _(Math.floor(dateObject.getFullYear()/100));
				
			case "d": // day of the month as a decimal number (range 01 to 31)
				return _(dateObject.getDate());
				
			case "D": // same as %m/%d/%y
				return $("m") + "/" + $("d") + "/" + $("y");
					
			case "e": // day of the month as a decimal number, a single digit is
				      // preceded by a space (range ' 1' to '31')
				if(padChar == null){ padChar = " "; }
				return _(dateObject.getDate());
			
			case "f": // month as a decimal number, a single digit is
							// preceded by a space (range ' 1' to '12')
				if(padChar == null){ padChar = " "; }
				return _(dateObject.getMonth()+1);
			
			case "g": // like %G, but without the century.
				break;
			
			case "G": // The 4-digit year corresponding to the ISO week number
				      // (see %V).  This has the same format and value as %Y,
				      // except that if the ISO week number belongs to the
				      // previous or next year, that year is used instead.
				dojo.unimplemented("unimplemented modifier 'G'");
				break;
			
			case "F": // same as %Y-%m-%d
				return $("Y") + "-" + $("m") + "-" + $("d");
				
			case "H": // hour as a decimal number using a 24-hour clock (range
				      // 00 to 23)
				return _(dateObject.getHours());
				
			case "I": // hour as a decimal number using a 12-hour clock (range
				      // 01 to 12)
				return _(dateObject.getHours() % 12 || 12);

			case "j": // day of the year as a decimal number (range 001 to 366)
				return _(dojo.date.locale._getDayOfYear(dateObject), 3);

			case "k": // Hour as a decimal number using a 24-hour clock (range
					  // 0 to 23 (space-padded))
				if(padChar == null){ padChar = " "; }
				return _(dateObject.getHours());

			case "l": // Hour as a decimal number using a 12-hour clock (range
					  // 1 to 12 (space-padded))
				if(padChar == null){ padChar = " "; }
				return _(dateObject.getHours() % 12 || 12);

			case "m": // month as a decimal number (range 01 to 12)
				return _(dateObject.getMonth() + 1);

			case "M": // minute as a decimal number
				return _(dateObject.getMinutes());

			case "n":
				return "\n";

			case "p": // either `am' or `pm' according to the given time value,
				      // or the corresponding strings for the current locale
				return bundle['dayPeriods-format-wide-' + (dateObject.getHours() < 12 ? "am" : "pm")];
				
			case "r": // time in a.m. and p.m. notation
				return $("I") + ":" + $("M") + ":" + $("S") + " " + $("p");
				
			case "R": // time in 24 hour notation
				return $("H") + ":" + $("M");
				
			case "S": // second as a decimal number
				return _(dateObject.getSeconds());

			case "t":
				return "\t";

			case "T": // current time, equal to %H:%M:%S
				return $("H") + ":" + $("M") + ":" + $("S");
				
			case "u": // weekday as a decimal number [1,7], with 1 representing
				      // Monday
				return String(dateObject.getDay() || 7);
				
			case "U": // week number of the current year as a decimal number,
				      // starting with the first Sunday as the first day of the
				      // first week
				return _(dojo.date.locale._getWeekOfYear(dateObject));

			case "V": // week number of the year (Monday as the first day of the
				      // week) as a decimal number [01,53]. If the week containing
				      // 1 January has four or more days in the new year, then it
				      // is considered week 1. Otherwise, it is the last week of
				      // the previous year, and the next week is week 1.
				return _(dojox.date.posix.getIsoWeekOfYear(dateObject));
				
			case "W": // week number of the current year as a decimal number,
				      // starting with the first Monday as the first day of the
				      // first week
				return _(dojo.date.locale._getWeekOfYear(dateObject, 1));
				
			case "w": // day of the week as a decimal, Sunday being 0
				return String(dateObject.getDay());

			case "x": // preferred date representation for the current locale
				      // without the time
				return dojo.date.locale.format(dateObject, {selector:'date', formatLength: 'full', locale:locale});

			case "X": // preferred time representation for the current locale
				      // without the date
				return dojo.date.locale.format(dateObject, {selector:'time', formatLength: 'full', locale:locale});

			case "y": // year as a decimal number without a century (range 00 to
				      // 99)
				return _(dateObject.getFullYear()%100);
				
			case "Y": // year as a decimal number including the century
				return String(dateObject.getFullYear());
			
			case "z": // time zone or name or abbreviation
				var timezoneOffset = dateObject.getTimezoneOffset();
				return (timezoneOffset > 0 ? "-" : "+") +
					_(Math.floor(Math.abs(timezoneOffset)/60)) + ":" +
					_(Math.abs(timezoneOffset)%60);

			case "Z": // time zone or name or abbreviation
				return dojo.date.getTimezoneName(dateObject);
			
			case "%":
				return "%";
		}
	};

	// parse the formatting string and construct the resulting string
	var string = "";
	var i = 0;
	var index = 0;
	var switchCase = null;
	while ((index = format.indexOf("%", i)) != -1){
		string += format.substring(i, index++);
		
		// inspect modifier flag
		switch (format.charAt(index++)) {
			case "_": // Pad a numeric result string with spaces.
				padChar = " "; break;
			case "-": // Do not pad a numeric result string.
				padChar = ""; break;
			case "0": // Pad a numeric result string with zeros.
				padChar = "0"; break;
			case "^": // Convert characters in result string to uppercase.
				switchCase = "upper"; break;
			case "*": // Convert characters in result string to lowercase
				switchCase = "lower"; break;
			case "#": // Swap the case of the result string.
				switchCase = "swap"; break;
			default: // no modifier flag so decrement the index
				padChar = null; index--; break;
		}

		// toggle case if a flag is set
		var property = $(format.charAt(index++));
		switch (switchCase){
			case "upper":
				property = property.toUpperCase();
				break;
			case "lower":
				property = property.toLowerCase();
				break;
			case "swap": // Upper to lower, and versey-vicea
				var compareString = property.toLowerCase();
				var swapString = '';
				var ch = '';
				for (var j = 0; j < property.length; j++){
					ch = property.charAt(j);
					swapString += (ch == compareString.charAt(j)) ?
						ch.toUpperCase() : ch.toLowerCase();
				}
				property = swapString;
				break;
			default:
				break;
		}
		switchCase = null;
		
		string += property;
		i = index;
	}
	string += format.substring(i);
	
	return string; // String
};

dojox.date.posix.getStartOfWeek = function(/*Date*/dateObject, /*Number*/firstDay){
	// summary: Return a date object representing the first day of the given
	//   date's week.
	if(isNaN(firstDay)){
		firstDay = dojo.cldr.supplemental.getFirstDayOfWeek ? dojo.cldr.supplemental.getFirstDayOfWeek() : 0;
	}
	var offset = firstDay;
	if(dateObject.getDay() >= firstDay){
		offset -= dateObject.getDay();
	}else{
		offset -= (7 - dateObject.getDay());
	}
	var date = new Date(dateObject);
	date.setHours(0, 0, 0, 0);
	return dojo.date.add(date, "day", offset); // Date
}

dojox.date.posix.setIsoWeekOfYear = function(/*Date*/dateObject, /*Number*/week){
	// summary: Set the ISO8601 week number of the given date.
	//   The week containing January 4th is the first week of the year.
	// week:
	//   can be positive or negative: -1 is the year's last week.
	if(!week){ return dateObject; }
	var currentWeek = dojox.date.posix.getIsoWeekOfYear(dateObject);
	var offset = week - currentWeek;
	if(week < 0){
		var weeks = dojox.date.posix.getIsoWeeksInYear(dateObject);
		offset = (weeks + week + 1) - currentWeek;
	}
	return dojo.date.add(dateObject, "week", offset); // Date
}

dojox.date.posix.getIsoWeekOfYear = function(/*Date*/dateObject){
	// summary: Get the ISO8601 week number of the given date.
	//   The week containing January 4th is the first week of the year.
	//   See http://en.wikipedia.org/wiki/ISO_week_date
	var weekStart = dojox.date.posix.getStartOfWeek(dateObject, 1);
	var yearStart = new Date(dateObject.getFullYear(), 0, 4); // January 4th
	yearStart = dojox.date.posix.getStartOfWeek(yearStart, 1);
	var diff = weekStart.getTime() - yearStart.getTime();
	if(diff < 0){ return dojox.date.posix.getIsoWeeksInYear(weekStart); } // Integer
	return Math.ceil(diff / 604800000) + 1; // Integer
}

dojox.date.posix.getIsoWeeksInYear = function(/*Date*/dateObject) {
	// summary: Determine the number of ISO8601 weeks in the year of the given
	//   date. Most years have 52 but some have 53.
	//   See http://www.phys.uu.nl/~vgent/calendar/isocalendar_text3.htm
	function p(y) {
		return y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400);
	}
	var y = dateObject.getFullYear();
	return ( p(y) % 7 == 4 || p(y-1) % 7 == 3 ) ? 53 : 52;	//	Integer
}

}

if(!dojo._hasResource['com.realitybuilder.BlockProperties']){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource['com.realitybuilder.BlockProperties'] = true;
// Describes the properties of a block, including shape and dimensions.

// Sometimes the term "full shadow" is used, which refers to the shadow how it
// would look if the all blocks in the layer would form an infinite plane
// without holes.

// Copyright 2011 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('com.realitybuilder.BlockProperties');

dojo.declare('com.realitybuilder.BlockProperties', null, {
    // Version of data last retrieved from the server, or "-1" initially. Is a
    // string in order to be able to contain very large integers.
    _versionOnServer: '-1',

    // If the block is rotated by that angle, then it is congruent with it not
    // being rotated.
    _congruencyA: null,

    // Block dimensions in world space. The side length of a block is
    // approximately two times the grid spacing in the respective direction.
    _blockPositionSpacingXY: null, // mm
    _blockPositionSpacingZ: null, // mm

    // Outline of the block in the xy plane, with coordinates in block space,
    // counterclockwise:
    _outlineBXY: null,

    // Array with the outline rotated by 0°, 90°, ... around the cneter of
    // rotation, in block space:
    //
    // The list has "congruencyA" number of entries, corresponding to rotation
    // about 0°, 90°, ...
    _rotatedOutlinesBXY: null,

    // Two blocks 1 and 2 are defined to collide, iff block 2 is offset against
    // block 1 in the block space x-y-plane by any of the following values. The
    // rotation angles below are those of block 2 relative to block 1. The
    // offsets are stored as JSON arrays.
    //
    // The list has "congruencyA" number of entries, corresponding to rotation
    // about 0°, 90°, ...
    _collisionOffsetsListBXY: null,

    // Array with the list of collision offsets rotated by 0°, 90°, ... CCW
    // (when viewed from above) around the center of rotation of block 1, in
    // block space:
    //
    // The list has "congruencyA" number of entries, corresponding to rotation
    // about 0°, 90°, ...
    _rotatedCollisionOffsetsListsBXY: null,

    // Two blocks 1 and 2 are defined to be attachable, iff block 2 is offset
    // against block 1 in the block space by any of the following values. The
    // rotation angles below are those of block 2 relative to block 1. The
    // offsets are stored as JSON arrays.
    //
    // The list has "congruencyA" number of entries, corresponding to rotation
    // about 0°, 90°, ...
    _attachmentOffsetsListB: null,

    // Array with the list of attachment offsets rotated by 0°, 90°, ... CCW
    // (when viewed from above) around the center of rotation of block 1, in
    // block space:
    //
    // The list has "congruencyA" number of entries, corresponding to rotation
    // about 0°, 90°, ...
    _rotatedAttachmentOffsetsListsB: null,

    // Center of rotation, in the block space x-y-plane, with coordinates
    // relative to the origin of the unrotated block.
    _rotCenterBXY: null,

    // Alpha transparency of the block's background:
    _backgroundAlpha: null,

    versionOnServer: function () {
        return this._versionOnServer;
    },

    // Returns false when the object is new and has not yet been updated with
    // server data.
    isInitializedWithServerData: function () {
        return this._versionOnServer !== '-1';
    },

    congruencyA: function () {
        return this._congruencyA;
    },

    _rotateOutlineBXY: function (a) {
        var that = this;

        return dojo.map(this._outlineBXY, function (pBXY) {
            return com.realitybuilder.util.rotatePointBXY(pBXY,
                                                          that._rotCenterBXY,
                                                          a);
        });
    },

    _updateRotatedOutlinesBXY: function () {
        var a;

        this._rotatedOutlinesBXY = [];
        for (a = 0; a < this._congruencyA; a += 1) { 
            this._rotatedOutlinesBXY.push(this._rotateOutlineBXY(a));
        }
    },

    _rotateCollisionOffsetsBXY: function (collisionOffsetsBXY, a) {
        var util = com.realitybuilder.util;

        return dojo.map(collisionOffsetsBXY, function (collisionOffsetBXY) {
            return util.rotatePointBXY(collisionOffsetBXY, [0, 0], a);
        });
    },

    _rotateCollisionOffsetsListBXY: function (a1) {
        var a2, collisionOffsetsBXY, tmp = [];

        for (a2 = 0; a2 < this._congruencyA; a2 += 1) {
            collisionOffsetsBXY = this._collisionOffsetsListBXY[a2];
            tmp.push(this._rotateCollisionOffsetsBXY(collisionOffsetsBXY, a1));
        }

        return tmp;
    },

    _updateRotatedCollisionOffsetsListsBXY: function () {
        var a1, tmp;

        this._rotatedCollisionOffsetsListsBXY = [];

        for (a1 = 0; a1 < this._congruencyA; a1 += 1) { 
            tmp = this._rotateCollisionOffsetsListBXY(a1);
            this._rotatedCollisionOffsetsListsBXY.push(tmp);
        }
    },

    _rotateAttachmentOffsetB: function (attachmentOffsetB, a) {
        var pBXY, rotatedPBXY, rotatedPB, util;

        util = com.realitybuilder.util;

        // Rotates in the x-y plane, keeping z constant:
        pBXY = [attachmentOffsetB[0], attachmentOffsetB[1]];
        rotatedPBXY = util.rotatePointBXY(pBXY, [0, 0], a);
        return [rotatedPBXY[0], rotatedPBXY[1], attachmentOffsetB[2]];
    },

    _rotateAttachmentOffsetsB: function (attachmentOffsetsB, a) {
        var that = this;

        return dojo.map(attachmentOffsetsB, function (attachmentOffsetB) {
            return that._rotateAttachmentOffsetB(attachmentOffsetB, a);
        });
    },

    _rotateAttachmentOffsetsListB: function (a1) {
        var a2, attachmentOffsetsB, tmp = [];

        for (a2 = 0; a2 < this._congruencyA; a2 += 1) {
            attachmentOffsetsB = this._attachmentOffsetsListB[a2];
            tmp.push(this._rotateAttachmentOffsetsB(attachmentOffsetsB, a1));
        }

        return tmp;
    },

    _updateRotatedAttachmentOffsetsListsB: function () {
        var a1, tmp;

        this._rotatedAttachmentOffsetsListsB = [];
        for (a1 = 0; a1 < this._congruencyA; a1 += 1) { 
            tmp = this._rotateAttachmentOffsetsListB(a1);
            this._rotatedAttachmentOffsetsListsB.push(tmp);
        }
    },

    // Updates the block properties to the version on the server, which is
    // described by "serverData".
    updateWithServerData: function (serverData) {
        this._versionOnServer = serverData.version;
        this._congruencyA = serverData.congruencyA;
        this._positionSpacingXY = serverData.positionSpacingXY;
        this._positionSpacingZ = serverData.positionSpacingZ;
        this._outlineBXY = serverData.outlineBXY;
        this._collisionOffsetsListBXY = serverData.collisionOffsetsListBXY;
        this._attachmentOffsetsListB = serverData.attachmentOffsetsListB;
        this._rotCenterBXY = serverData.rotCenterBXY;
        this._backgroundAlpha = serverData.backgroundAlpha;

        this._updateRotatedOutlinesBXY();
        this._updateRotatedCollisionOffsetsListsBXY();
        this._updateRotatedAttachmentOffsetsListsB();

        dojo.publish('com/realitybuilder/BlockProperties/changed');
    },

    positionSpacingXY: function () {
        return this._positionSpacingXY;
    },

    positionSpacingZ: function () {
        return this._positionSpacingZ;
    },

    // Returns the outline, rotated by angle "a", in multiples of 90° CCW when
    // viewed from above.
    rotatedOutlineBXY: function (a) {
        return this._rotatedOutlinesBXY[a % this._congruencyA];
    },

    // Returns the list of collision offsets, of block 2 relative to block 1.
    rotatedCollisionOffsetsBXY: function (block1, block2) {
        var collisionOffsetsListBXY, relative_a, a1, a2;

        a1 = block1.a() % this._congruencyA;
        a2 = block2.a() % this._congruencyA;

        collisionOffsetsListBXY = 
            this._rotatedCollisionOffsetsListsBXY[a1];

        relative_a = (this._congruencyA + a2 - a1) % this._congruencyA;

        return collisionOffsetsListBXY[relative_a];
    },

    // Returns the list of attachment offsets, of block 2 relative to block 1.
    rotatedAttachmentOffsetsB: function (block1, block2) {
        var attachmentOffsetsListB, relative_a, a1, a2;

        a1 = block1.a() % this._congruencyA;
        a2 = block2.a() % this._congruencyA;

        attachmentOffsetsListB = 
            this._rotatedAttachmentOffsetsListsB[a1];

        relative_a = (this._congruencyA + a2 - a1) % this._congruencyA;

        return attachmentOffsetsListB[relative_a];
    },

    backgroundAlpha: function () {
        return this._backgroundAlpha;
    }
});

}

if(!dojo._hasResource['com.realitybuilder.ConstructionBlockProperties']){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource['com.realitybuilder.ConstructionBlockProperties'] = true;
// Describes the properties of a construction block.

// Sometimes the term "full shadow" is used, which refers to the shadow how it
// would look if the all blocks in the layer would form an infinite plane
// without holes.

// Copyright 2011 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('com.realitybuilder.ConstructionBlockProperties');

dojo.declare('com.realitybuilder.ConstructionBlockProperties', null, {
    // Version of data last retrieved from the server, or "-1" initially. Is a
    // string in order to be able to contain very large integers.
    _versionOnServer: '-1',

    // Color (CSS format) of the block, if pending or real:
    _pendingColor: null,
    _realColor: null,

    versionOnServer: function () {
        return this._versionOnServer;
    },

    // Returns false when the object is new and has not yet been updated with
    // server data.
    isInitializedWithServerData: function () {
        return this._versionOnServer !== '-1';
    },

    // Updates the block properties to the version on the server, which is
    // described by "serverData".
    updateWithServerData: function (serverData) {
        this._versionOnServer = serverData.version;
        this._pendingColor = serverData.pendingColor;
        this._realColor = serverData.realColor;

        dojo.publish('com/realitybuilder/ConstructionBlockProperties/changed');
    },

    pendingColor: function () {
        return this._pendingColor;
    },

    realColor: function () {
        return this._realColor;
    }
});

}

if(!dojo._hasResource['com.realitybuilder.Block']){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource['com.realitybuilder.Block'] = true;
// A building block.

// Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, dojo, dojox, FlashCanvas */

dojo.provide('com.realitybuilder.Block');

dojo.declare('com.realitybuilder.Block', null, {
    // Position of the block in block space. From the position the block
    // extends in positive direction along the x-, y-, and z-axis.
    _positionB: null,

    // Rotation angle, about center of rotation:
    _a: null, // mulitples of 90°, CCW when viewed from above

    // Camera object, used for calculating the projection of the block on the
    // camera sensor.
    _camera: null,

    // Properties (shape, dimensions, etc.) of a block:
    _blockProperties: null,

    // Coordinates of the vertexes in block space, world space, view space, and
    // sensor space.
    _bottomVertexesB: null,
    _bottomVertexes: null,
    _bottomVertexesV: null,
    _bottomVertexesS: null,
    _topVertexesB: null,
    _topVertexes: null,
    _topVertexesV: null,
    _topVertexesS: null,

    // The vertexes of the block projected to the view space x-z-plane.
    // 
    // The vertexes, correspondingly, are x-z pairs.
    //
    // The projection is a parallel projection. It works simply by extending
    // the vertical edges of the block to the x-z-plane.
    //
    // If not all vertexes can be determined, for example due to problems with
    // precision in calculations, the value is null. This should normally not
    // happen.
    _projectedVertexesVXZ: null,

    // The vertexes of the block projected to the view space x-z-plane, in
    // sensor space.
    _projectedVertexesVXZS: null,

    // The sensor space bounding box of the block, i.e. the smallest rectangle,
    // which encloses the block in sensor space.
    _boundingBoxS: null,

    // Ids, data version numbers and block position and angle when last
    // updating coordinates:
    _lastCameraId: null,
    _lastBlockPropertiesVersionOnServer: null,
    _lastPositionB: null,
    _lastA: null,

    // True, if the coordinates changed after the last rendering:
    _coordinatesChangedAfterLastRendering: false,

    // Horizontal extents of the block in sensor space: Indexes of the vertexes
    // that correspond to the leftmost and rightmost edges, as displayed on the
    // sensor.
    //
    // Note: depending on orientation of the block, the leftmost index may be
    // bigger than the rightmost index!
    _indexOfLeftmostVertex: null,
    _indexOfRightmostVertex: null,

    // True, iff only the bottom of the block should be subtracted when using
    // the "subtract" function:
    _onlySubtractBottom: false,

    // Creates a block at the position in block space ("xB", "yB", "zB") =
    // "positionB", and rotated about its center of rotation by "a" (° CCW,
    // when viewed from above). When the block is rendered, it is as seen by
    // the sensor of the camera "camera".
    //
    // The block's properties, such as shape and size, are described by
    // "blockProperties".
    constructor: function (blockProperties, camera, positionB, a) {
        this._positionB = positionB;
        this._a = a;
        this._blockProperties = blockProperties;
        this._camera = camera;
    },

    // Returns the block's position in block space. From the position the block
    // extends in positive direction along the x-, y-, and z-axis.
    positionB: function () {
        return this._positionB;
    },

    xB: function () {
        return this._positionB[0];
    },

    yB: function () {
        return this._positionB[1];
    },

    zB: function () {
        return this._positionB[2];
    },

    a: function () {
        return this._a;
    },

    // Returns the block's vertexes in screen space.
    _vertexesS: function () {
        return this._bottomVertexesS.concat(this._topVertexesS);
    },

    // If not all vertexes could be determined, for example due to problems
    // with precision in calculations, the return value is false. This should
    // normally not happen.
    projectedVertexesVXZ: function () {
        this._updateCoordinates();

        return (this._projectedVertexesVXZ === null) ? 
            false : this._projectedVertexesVXZ;
    },

    // Updates the vertexes of the block projected to the view space x-z-plane.
    //
    // Depends on up to date view space coordinates.
    _updateViewSpaceXZPlaneCoordinates: function () {
        var i, bottomVertexesV, topVertexesV, len, tmp = [], lineV, pointVXZ;

        bottomVertexesV = this._bottomVertexesV;
        topVertexesV = this._topVertexesV;
        len = bottomVertexesV.length;

        for (i = 0; i < len; i += 1) {
            lineV = [bottomVertexesV[i], topVertexesV[i]];
            pointVXZ = com.realitybuilder.util.intersectionLinePlaneVXZ(lineV);
            if (!pointVXZ) {
                tmp = null;
                break;
            } else {
                tmp.push(pointVXZ);
            }
        }

        this._projectedVertexesVXZ = tmp;
    },

    // Returns true, iff the current block collides with the block "block".
    collidesWith: function (block) {
        var testPositionB, collisionOffsetsBXY, collisionOffsetBXY, i;

        collisionOffsetsBXY = 
            this._blockProperties.rotatedCollisionOffsetsBXY(this, block);

        for (i = 0; i < collisionOffsetsBXY.length; i += 1) {
            collisionOffsetBXY = collisionOffsetsBXY[i];
            testPositionB = [this.xB() + collisionOffsetBXY[0],
                             this.yB() + collisionOffsetBXY[1],
                             this.zB()];
            if (com.realitybuilder.util.pointsIdenticalB(block.positionB(),
                                                         testPositionB)) {
                return true;
            }
        }

        return false;
    },

    // Returns true, iff the current block is attachable to the block "block".
    attachableTo: function (block) {
        var testPositionB, attachmentOffsetsB, attachmentOffsetB, i;

        attachmentOffsetsB = 
            this._blockProperties.rotatedAttachmentOffsetsB(this, block);

        for (i = 0; i < attachmentOffsetsB.length; i += 1) {
            attachmentOffsetB = attachmentOffsetsB[i];
            testPositionB = 
                com.realitybuilder.util.addVectorsB(this.positionB(),
                                                    attachmentOffsetB);
            if (com.realitybuilder.util.pointsIdenticalB(block.positionB(),
                                                         testPositionB)) {
                return true;
            }
        }

        return false;
    },

    // Updates the vertexes of the block in block space.
    _updateBlockSpaceCoordinates: function () {
        var 
        xB = this.positionB()[0],
        yB = this.positionB()[1],
        zB = this.positionB()[2],
        blockOutlineBXY = this._blockProperties.rotatedOutlineBXY(this.a()),
        that = this;

        this._bottomVertexesB = [];
        this._topVertexesB = [];

        // top, counterclockwise (when viewed from top in block space):
        dojo.forEach(blockOutlineBXY, function (vertexBXY) {
            that._bottomVertexesB.push([xB + vertexBXY[0], 
                                        yB + vertexBXY[1], 
                                        zB]);
            that._topVertexesB.push([xB + vertexBXY[0], 
                                     yB + vertexBXY[1], 
                                     zB + 1]);
        });
    },

    _blockToWorld: function (pB) {
        return com.realitybuilder.util.blockToWorld(pB,
                                                    this._blockProperties);
    },

    // Updates the vertexes of the block in world space.
    _updateWorldSpaceCoordinates: function () {
        this._bottomVertexes = dojo.map(this._bottomVertexesB, 
                                        dojo.hitch(this, this._blockToWorld));
        this._topVertexes = dojo.map(this._topVertexesB, 
                                     dojo.hitch(this, this._blockToWorld));
    },

    // Calculates the vertexes of the block in view space.
    //
    // Depends on up to date world space coordinates.
    _updateViewSpaceCoordinates: function () {
        this._bottomVertexesV = 
            dojo.map(this._bottomVertexes, 
                     dojo.hitch(this._camera, this._camera.worldToView));
        this._topVertexesV = 
            dojo.map(this._topVertexes, 
                     dojo.hitch(this._camera, this._camera.worldToView));
    },

    // Returns true, iff coordinates need to be updated.
    _coordinatesNeedToBeUpdated: function () {
        var 
        cameraHasChanged, blockPropertiesHaveChanged, positionBHasChanged,
        aHasChanged;

        cameraHasChanged = this._lastCameraId !== this._camera.id();
        blockPropertiesHaveChanged = 
            this._lastBlockPropertiesVersionOnServer !== 
            this._blockProperties.versionOnServer();
        positionBHasChanged = 
            this._lastPositionB === null ||
            !com.realitybuilder.util.pointsIdenticalB(this._lastPositionB,
                                                      this._positionB);
        aHasChanged = this._lastA !== this._a;

        return cameraHasChanged || blockPropertiesHaveChanged ||
            positionBHasChanged || aHasChanged;
    },

    // Called after the coordinates have been updated.
    _onCoordinatesUpdated: function () {
        this._lastBlockPropertiesVersionOnServer = 
            this._blockProperties.versionOnServer();
        this._lastCameraId = this._camera.id();
        this._lastPositionB = [this._positionB[0],
                               this._positionB[1],
                               this._positionB[2]]; // deep copy necessary
        this._lastA = this._a;
        this._coordinatesChangedAfterLastRendering = true;
    },

    // Finds the indexes of the vertexes that correspond to the leftmost and
    // rightmost edges, as displayed on the sensor.
    //
    // Note that these vertexes often, but not always, are identical to the
    // leftmost and rightmost vertex of the top or bottom.
    _updateHorizontalExtentsInSensorSpace: function () {
        var vertexesS, vertexS, leftmostVertexS, rightmostVertexS, i, ilv, irv;

        // Ideas behind the following algorithm, by example for the rightmost
        // edge:
        //
        // * The rightmost edge doesn't change it the block is extended to a
        //   prism with infinite vertical extents.
        //
        // * The rightmost edge goes through the rightmost (as displayed on the
        //   sensor) intersection point between the prism and the view space
        //   x-z-plane.

        vertexesS = this._projectedVertexesVXZS;

        leftmostVertexS = rightmostVertexS = vertexesS[0];
        ilv = irv = 0;

        for (i = 1; i < vertexesS.length; i += 1) {
            vertexS = vertexesS[i];
            if (vertexS[0] < leftmostVertexS[0]) {
                leftmostVertexS = vertexS;
                ilv = i;
            }
            if (vertexS[0] > rightmostVertexS[0]) {
                rightmostVertexS = vertexS;
                irv = i;
            }
        }

        this._indexOfLeftmostVertex = ilv;
        this._indexOfRightmostVertex = irv;
    },

    _updateProjectedVertexesVXZS: function () {
        var cam = this._camera;

        this._projectedVertexesVXZS = 
            dojo.map(this._projectedVertexesVXZ,
                     function (vertexVXZ) {
                         var vertexV = [vertexVXZ[0],
                                        0, // in view space x-z plane!
                                        vertexVXZ[1]];
                         return cam.viewToSensor(vertexV);
                     });
    },

    // Updates the vertices (top left, lower right) defining the bounding box
    // of the block in sensor space. Depends on the vertices of the block in
    // sensor space.
    _updateSensorSpaceBoundingBox: function () {
        var minX, minY, maxX, maxY, vertexesS, vertexS, i;

        vertexesS = this._vertexesS();

        if (vertexesS.length > 0) {
            vertexS = vertexesS[0];
            minX = maxX = vertexS[0];
            minY = maxY = vertexS[1];
            for (i = 1; i < vertexesS.length; i += 1) {
                vertexS = vertexesS[i];
                if (vertexS[0] < minX) {
                    minX = vertexS[0];
                } else if (vertexS[0] > maxX) {
                    maxX = vertexS[0];
                }
                if (vertexS[1] < minY) {
                    minY = vertexS[1];
                } else if (vertexS[1] > maxY) {
                    maxY = vertexS[1];
                }
            }
        }

        this._boundingBoxS = [[minX, minY], [maxX, maxY]];
    },

    // Calculates the vertexes of the block in sensor space. The camera is
    // positioned in the center of the sensor.
    //
    // Depends on up to date view space coordinates.
    _updateSensorSpaceCoordinates: function () {
        var cam = this._camera;

        this._bottomVertexesS = dojo.map(this._bottomVertexesV,
                                         dojo.hitch(cam, cam.viewToSensor));
        this._topVertexesS = dojo.map(this._topVertexesV,
                                      dojo.hitch(cam, cam.viewToSensor));
        this._updateProjectedVertexesVXZS();
        this._updateHorizontalExtentsInSensorSpace();
        this._updateSensorSpaceBoundingBox();
    },

    // Updates coordinates, but only if there have been changes.
    _updateCoordinates: function () {
        if (this._coordinatesNeedToBeUpdated()) {
            this._updateBlockSpaceCoordinates();
            this._updateWorldSpaceCoordinates();
            this._updateViewSpaceCoordinates();
            this._updateViewSpaceXZPlaneCoordinates();
            this._updateSensorSpaceCoordinates();
            this._onCoordinatesUpdated();
        }
    },

    onlySubtractBottom: function () {
        this._onlySubtractBottom = true;
    },

    _subtractDrawBottomPath: function (context) {
        var vertexesS, len, vertexS, i;

        vertexesS = this._bottomVertexesS;

        // counterclockwise (when viewed from top in block space):
        vertexS = vertexesS[0];
        context.moveTo(vertexS[0], vertexS[1]);
        for (i = 1; i < vertexesS.length; i += 1) {
            vertexS = vertexesS[i];
            context.lineTo(vertexS[0], vertexS[1]);
        }
    },

    _subtractDrawPath: function (context) {
        var bottomVertexesS, topVertexesS, len, vertexS, i, ilv, irv;

        bottomVertexesS = this._bottomVertexesS;
        topVertexesS = this._topVertexesS;
        len = topVertexesS.length; // same for top and bottom

        ilv = this._indexOfLeftmostVertex;
        irv = this._indexOfRightmostVertex;

        // top, from rightmost to leftmost vertex, counterclockwise (when
        // viewed from top in block space):
        vertexS = topVertexesS[irv];
        context.moveTo(vertexS[0], vertexS[1]);
        for (i = irv + 1; i <= len + ilv; i += 1) {
            vertexS = topVertexesS[i % len];
            context.lineTo(vertexS[0], vertexS[1]);
        }

        // line from leftmost vertex on top to leftmost vertex on bottom:
        vertexS = bottomVertexesS[ilv];
        context.lineTo(vertexS[0], vertexS[1]);

        // bottom, from leftmost to rightmost vertex, counterclockwise (when
        // viewed from top in block space):
        for (i = ilv + 1; i <= len + irv; i += 1) {
            vertexS = bottomVertexesS[i % len];
            context.lineTo(vertexS[0], vertexS[1]);
        }

        // line from rightmost vertex on bottom to rightmost vertex on top:
        vertexS = bottomVertexesS[irv];
        context.lineTo(vertexS[0], vertexS[1]);
    },

    // Subtracts the shape of the block from the drawing on the canvas with
    // rendering context "context".
    subtract: function (context) {
        var
        bottomVertexesS, topVertexesS,
        len, vertexS, i, ilv, irv;

        this._updateCoordinates();

        context.globalCompositeOperation = "destination-out";
        context.fillStyle = "black";

        context.beginPath();
        if (this._onlySubtractBottom) {
            this._subtractDrawBottomPath(context);
        } else {
            this._subtractDrawPath(context);
        }
        context.closePath();

        context.fill();

        context.globalCompositeOperation = "source-over";
    },

    // Renders the foreground of the block, i.e. the part of that block that
    // was visible were the block solid.
    _renderForeground: function (context) {
        var
        topVertexesS = this._topVertexesS,
        bottomVertexesS = this._bottomVertexesS,
        len = topVertexesS.length, // same for top and bottom
        vertexS, firstVertexS, i, 
        ilv = this._indexOfLeftmostVertex,
        irv = this._indexOfRightmostVertex,
        imax;

        context.globalAlpha = 1;

        // bottom:
        context.beginPath();
        firstVertexS = bottomVertexesS[ilv];
        context.moveTo(firstVertexS[0], firstVertexS[1]);
        imax = (ilv + 1 <= irv) ? irv : irv + len;
        for (i = ilv + 1; i <= imax; i += 1) {
            vertexS = bottomVertexesS[i % len];
            context.lineTo(vertexS[0], vertexS[1]);
        }
        context.stroke();

        // top:
        context.beginPath();
        firstVertexS = topVertexesS[0];
        context.moveTo(firstVertexS[0], firstVertexS[1]);
        for (i = 1; i <= len; i += 1) {
            vertexS = topVertexesS[i % len];
            context.lineTo(vertexS[0], vertexS[1]);
        }
        context.lineTo(firstVertexS[0], firstVertexS[1]);
        context.stroke();

        // vertical lines:
        imax = (ilv <= irv) ? irv : irv + len;
        for (i = ilv; i <= imax; i += 1) {
            context.beginPath();
            vertexS = bottomVertexesS[i % len];
            context.moveTo(vertexS[0], vertexS[1]);
            vertexS = topVertexesS[i % len];
            context.lineTo(vertexS[0], vertexS[1]);
            context.stroke();
        }
    },

    // Renders the background of the block, i.e. the part of that block that
    // was invisible were the block solid.
    _renderBackground: function (context) {
        var
        bottomVertexesS = this._bottomVertexesS,
        topVertexesS = this._topVertexesS,
        len = topVertexesS.length, // same for top and bottom
        vertexS, i, 
        ilv = this._indexOfLeftmostVertex,
        irv = this._indexOfRightmostVertex,
        imax;

        context.globalAlpha = this._blockProperties.backgroundAlpha();

        // bottom:
        context.beginPath();
        vertexS = bottomVertexesS[irv];
        context.moveTo(vertexS[0], vertexS[1]);
        imax = (irv + 1 <= ilv) ? ilv : ilv + len;
        for (i = irv + 1; i <= imax; i += 1) {
            vertexS = bottomVertexesS[i % len];
            context.lineTo(vertexS[0], vertexS[1]);
        }
        context.stroke();

        // vertical lines:
        imax = (irv + 1 <= ilv - 1) ? ilv - 1 : ilv - 1 + len;
        for (i = irv + 1; i <= imax; i += 1) {
            context.beginPath();
            vertexS = bottomVertexesS[i % len];
            context.moveTo(vertexS[0], vertexS[1]);
            vertexS = topVertexesS[i % len];
            context.lineTo(vertexS[0], vertexS[1]);
            context.stroke();
        }

        context.globalAlpha = 1;
    },

    // Draws the block in the color "color" (CSS format) as seen by the sensor,
    // on the canvas with rendering context "context".
    render: function (context, color) {
        this._updateCoordinates();

        context.strokeStyle = color;
        this._renderForeground(context);
        this._renderBackground(context);
    }
});

}

if(!dojo._hasResource['com.realitybuilder.ConstructionBlock']){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource['com.realitybuilder.ConstructionBlock'] = true;
// A block that is permanently part of the construction, though it may be
// marked as deleted or pending.

// Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('com.realitybuilder.ConstructionBlock');



dojo.declare('com.realitybuilder.ConstructionBlock', 
             com.realitybuilder.Block,
{
    // State of the block: 0 = deleted, 1 = pending (= requested to be build),
    // 2 = real
    _state: null,

    // Time stamp - in seconds since the epoch - of the date-time when the
    // bocks status was last changed. Block creation also counts as status
    // change.
    _timeStamp: null,

    // Properties of a construction block:
    _constructionBlockProperties: null,

    // Creates a block at the position in block space ("xB", "yB", "zB") =
    // "positionB", and rotated about its center of rotation by "a" (° CCW,
    // when viewed from above). When the block is rendered, it is as seen by
    // the sensor of the camera "camera". A time stamp - in seconds since the
    // epoch - of the date-time when the bocks status was last changed is
    // "timeStamp".
    //
    // The block's properties, such as shape and size, are described by
    // "blockProperties" and "constructionBlockProperties".
    constructor: function (blockProperties, camera, positionB, a, 
                           constructionBlockProperties, state, timeStamp)
    {
        this._constructionBlockProperties = constructionBlockProperties;
        this._state = state;
        this._timeStamp = timeStamp;
    },

    timeStamp: function () {
        return this._timeStamp;
    },

    isDeleted: function () {
        return this._state === 0;
    },

    isPending: function () {
        return this._state === 1;
    },

    isReal: function () {
        return this._state === 2;
    },

    state: function () {
        return this._state;
    },

    // If not deleted, draws the block as seen by the sensor on the canvas with
    // rendering context "context". Depends on the vertexes in view
    // coordinates.
    render: function (context) {
        var color, properties;

        if (!this.isDeleted()) {
            properties = this._constructionBlockProperties;
            color = this.isReal() ? 
                properties.realColor() : 
                properties.pendingColor();
            this.inherited(arguments, [arguments[0], color]);
        }
    },

    // Draws the top of the block solidly filled, onto the canvas with
    // rendering context "context".
    renderSolidTop: function (context) {
        var topVertexesS, vertexS, i;

        this._updateCoordinates();

        topVertexesS = this._topVertexesS;

        // counterclockwise:
        vertexS = topVertexesS[0];
        context.beginPath();
        context.moveTo(vertexS[0], vertexS[1]);
        for (i = 1; i < topVertexesS.length; i += 1) {
            vertexS = topVertexesS[i];
            context.lineTo(vertexS[0], vertexS[1]);
        }
        context.closePath();
        context.fill();
    }
});

}

if(!dojo._hasResource['com.realitybuilder.util']){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource['com.realitybuilder.util'] = true;
// Various utility functions.

// Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, dojo, dojox, FlashCanvas, logoutUrl, swfobject */

dojo.provide('com.realitybuilder.util');

// Tolerance when comparing coordinates in sensor space.
com.realitybuilder.util.TOLERANCE_S = 0.5;

// Tolerance when comparing coordinates in view space.
com.realitybuilder.util.TOLERANCE_V = 0.00001;

// Tolerance when comparing coordinates in the view space x-z-plane.
com.realitybuilder.util.TOLERANCE_VXZ = 0.00001;

// Returns the coordinates of the block space point "pB" in world space.
com.realitybuilder.util.blockToWorld = function (pB, blockProperties) {
    var 
    factorX = blockProperties.positionSpacingXY(),
    factorY = blockProperties.positionSpacingXY(),
    factorZ = blockProperties.positionSpacingZ();
    return [pB[0] * factorX, pB[1] * factorY, pB[2] * factorZ];
};

// In view space, tries to calculate the interesection point between the
// x-z-plane and the straight line "line", defined by a pair of points. If the
// y coordinates of the points defining the line are identical, then returns
// false. Otherwise returns the x-z-coordinates (2D) of the intersection point.
//
// The tolerance "tolerance" is used for comparison of coordinates.
com.realitybuilder.util.intersectionLinePlaneVXZ = function (lineV) {
    var delta, p1 = lineV[0], p2 = lineV[1];

    delta = com.realitybuilder.util.subtractVectors3D(p2, p1);
    if (Math.abs(delta[1]) < com.realitybuilder.util.TOLERANCE_V) {
        // line in parallel to plane or undefined => no intersection point
        return false;
    } else {
        return [p1[0] - p1[1] * delta[0] / delta[1], 
                p1[2] - p1[1] * delta[2] / delta[1]];
    }
};

// In the view space x-z-plane (2D):
//
// * If there is an intersection between the straight line "lineVXZ" (infinite
//   extension) and the line segment "segmentVXZ", returns the intersection
//   point. Otherwise returns false.
//
// * If the line segment lies on the straight line, they are defined to have no
//   intersection.
// 
// * If the line touches a boundary point of a segment, then this is also
//   regarded as intersection.
com.realitybuilder.util.intersectionSegmentLineVXZ = function (segmentVXZ, 
                                                               lineVXZ)
{
    // As of 2010-Apr, an explanation can be found e.g. at:
    // http://local.wasp.uwa.edu.au/~pbourke/geometry/lineline2d/

    var x1 = segmentVXZ[0][0], z1 = segmentVXZ[0][1],
        x2 = segmentVXZ[1][0], z2 = segmentVXZ[1][1],
        x3 = lineVXZ[0][0], y3 = lineVXZ[0][1],
        x4 = lineVXZ[1][0], y4 = lineVXZ[1][1],
        u1 = (x4 - x3) * (z1 - y3) - (y4 - y3) * (x1 - x3),
        u2 = (y4 - y3) * (x2 - x1) - (x4 - x3) * (z2 - z1),
        epsilon = 0.01, // not the same as for comparing position
        u, x, y;

    if (Math.abs(u2) < epsilon) {
        // The segment line lies on the straight line (|u1| < epsilon) or the
        // lines are parallel (|u1| >= epsilon).
        return false;
    } else {
        u = u1 / u2;
        if (u > -epsilon && u < 1 + epsilon) {
            // u was between 0 and 1. => Intersection point is on segment.
            // Reason for using epsilons: For the hidden lines removal
            // algorithm it is important to not miss any intersections, for
            // example if the line intersects with the join of two segments. If
            // two intersection points are detected, they are later removed by
            // the function "withDuplicatesRemoved".
            x = x1 + u * (x2 - x1);
            y = z1 + u * (z2 - z1);
            return [x, y];
        } else {
            return false;
        }
    }
};

// Investigates the relation between the positions of the point "pointVXZ" and
// the line segment "segmentVXZ", in the view space x-z-plane, when viewed with
// the camera "camera".
//
// Return values:
//
// -1: point is visually in front of line segment
//
// 1: point is visually behind line segment
//
// 0: point neither in front nor behind line segment. This is the case under
//   the following conditions:
//
//   - The point and the line segment don't overlap in screen space.
//
//   - The point is on the line segment in the view space x-z-plane.
//
//   - In the view space x-z-plane, The line segment is on the straight line
//     going through the origin (camera) and the point.
//
// It is assumed that the point and the segment are in front of the camera,
// i.e. in front of the plane defined by the camera's sensor. If that's not the
// case, then the result is undefined.
com.realitybuilder.util.relationPointSegmentVXZ = function (pointVXZ, 
                                                            segmentVXZ)
{
    var camPositionVXZ, lineVXZ, intersectionVXZ, util;

    util = com.realitybuilder.util;

    camPositionVXZ = [0, 0]; // in origin of view space, naturally

    lineVXZ = [camPositionVXZ, pointVXZ];

    intersectionVXZ = util.intersectionSegmentLineVXZ(segmentVXZ, lineVXZ);

    if (intersectionVXZ === false) {
        // no intersection
        return 0;
    } else {
        // intersection
        if (util.pointsIdenticalVXZ(intersectionVXZ, pointVXZ)) {
            return 0; // point on line segment
        } else {
            return util.pointIsBetween2D(pointVXZ, 
                                         camPositionVXZ, 
                                         intersectionVXZ) ? -1 : 1;
        }
    }
};

// In 2D, returns true, iff the point "p" lies somewhere between the points
// "p1" and "p2", horizontally and vertically. If points coincide, the result
// is undefined.
com.realitybuilder.util.pointIsBetween2D = function (p, p1, p2) {
    var horizontally =
        (p[0] >= p1[0] && p[0] <= p2[0]) ||
        (p[0] <= p1[0] && p[0] >= p2[0]),
        vertically =
        (p[1] >= p1[1] && p[1] <= p2[1]) ||
        (p[1] <= p1[1] && p[1] >= p2[1]);
    return horizontally && vertically;
};

// Returns true, iff the points "p1" and "p2" are in the same position, within
// the tolerance "tolerance".
com.realitybuilder.util.pointsIdentical2D = function (p1, p2, tolerance) {
    return (Math.abs(p1[0] - p2[0]) < tolerance &&
            Math.abs(p1[1] - p2[1]) < tolerance);
};

// Returns true, iff the points "p1" and "p2" are in the same position in
// sensor space.
com.realitybuilder.util.pointsIdenticalS = function (p1S, p2S) {
    var tolerance = com.realitybuilder.util.TOLERANCE_S;
    return com.realitybuilder.util.pointsIdentical2D(p1S, p2S, tolerance);
};

// Returns true, iff the points "p1" and "p2" are in the same position in
// the view space x-z-plane.
com.realitybuilder.util.pointsIdenticalVXZ = function (p1VXZ, p2VXZ) {
    var tolerance = com.realitybuilder.util.TOLERANCE_VXZ;
    return com.realitybuilder.util.pointsIdentical2D(p1VXZ, p2VXZ, tolerance);
};

// Returns true, iff the points "p1B" and "p2B" are in the same position in
// block space.
com.realitybuilder.util.pointsIdenticalB = function (p1B, p2B) {
    return (
        (p1B[0] - p2B[0]) === 0 &&
        (p1B[1] - p2B[1]) === 0 &&
        (p1B[2] - p2B[2]) === 0);
};

// Subtracts the vectors "vector2" from the vector "vector1" in 3D and returns
// the result.
com.realitybuilder.util.subtractVectors3D = function (vector1, vector2) {
    return [
        vector1[0] - vector2[0], 
        vector1[1] - vector2[1],
        vector1[2] - vector2[2]];
};

// Adds the vectors "vector1B" and "vector2B" in blocks space and returns the
// result.
com.realitybuilder.util.addVectorsB = function (vector1B, vector2B) {
    return [
        vector1B[0] + vector2B[0], 
        vector1B[1] + vector2B[1],
        vector1B[2] + vector2B[2]];
};

// Subtracts the vectors "vector2B" from the vector "vector1B" in blocks space
// and returns the result.
com.realitybuilder.util.subtractVectorsB = function (vector1B, vector2B) {
    return [
        vector1B[0] - vector2B[0], 
        vector1B[1] - vector2B[1],
        vector1B[2] - vector2B[2]];
};

// Removes duplicate points from the list of points "ps". Returns the resulting
// list. Removes points from the front. Does not change the order.
com.realitybuilder.util.withDuplicatesRemoved = function (ps) {
    var newPs = [], i, j, p1, p2, duplicate;
    for (i = 0; i < ps.length; i += 1) {
        p1 = ps[i];
        duplicate = false;
        for (j = i + 1; j < ps.length; j += 1) {
            p2 = ps[j];
            if (com.realitybuilder.util.pointsIdenticalS(p1, p2)) {
                duplicate = true;
                break;
            }
        }
        if (!duplicate) {
            newPs.push(p1);
        }
    }
    return newPs;
};

// Returns the polar coordinates of the sensor space point "pS".
com.realitybuilder.util.cartesianToPolar = function (pS) {
    var x = pS[0], y = pS[1],
    angle = Math.atan2(y, x),
    distance = Math.sqrt(x * x + y * y);
    return [angle, distance];
};

// Returns the cartesian coordinates of the sensor space point "polarPS", which
// is in polar coordinates.
com.realitybuilder.util.polarToCartesian = function (polarPS) {
    var angle = polarPS[0], distance = polarPS[1],
    x = distance * Math.cos(angle),
    y = distance * Math.sin(angle);
    return [x, y];
};

// Returns a new point, whose coordinates are the sum of the coordinates of the
// points "p1S" and "p2S" in sensor space.
com.realitybuilder.util.addS = function (p1S, p2S) {
    return [p1S[0] + p2S[0], p1S[1] + p2S[1]];
};

// Returns the point "pBXY" in the block space x-z-plane, rotated about the
// center "cBXY" by the angle "a", CCW when viewed from above. The angle is in
// multiples of 90°.
com.realitybuilder.util.rotatePointBXY = function (pBXY, cBXY, a) {
    var tmpXB, tmpYB, cXB, cYB;

    if (a % 4 === 0) {
        return pBXY;
    } else {
        cXB = cBXY[0];
        cYB = cBXY[1];
        tmpXB = pBXY[0] - cXB;
        tmpYB = pBXY[1] - cYB;
        
        if (a % 4 === 1) {
            return [Math.round(cXB - tmpYB), Math.round(cYB + tmpXB)];
        } else if (a % 4 === 2) {
            return [Math.round(cXB - tmpXB), Math.round(cYB - tmpYB)];
        } else { // a % 4 === 3
            return [Math.round(cXB + tmpYB), Math.round(cYB - tmpXB)];
        }
    }
};

// Returns the object "object" with all keys converted to strings and being
// prefixed by "prefix".
com.realitybuilder.util.addPrefix = function (prefix, object) {
    var tmp = [], i;
    for (i in object) {
        if (object.hasOwnProperty(i)) {
            tmp[prefix.toString() + i.toString()] = object[i];
        }
    }
    return tmp;
};

// Returns true, iff FlashCanvas has loaded. FlashCanvas implements HTML canvas
// support for Internet Explorer.
com.realitybuilder.util.isFlashCanvasActive = function () {
    return (typeof FlashCanvas !== 'undefined');
};

com.realitybuilder.util.isFlashReadyForFlashCanvas = function () {
    return swfobject.hasFlashPlayerVersion("9"); // incl. higher versions
};

// Returns true, iff the canvas functionality is somehow supported, either
// natively by the browser, or via some emulation.
com.realitybuilder.util.isCanvasSupported = function () {
    return (document.createElement('canvas').getContext ||  // Native support
            (com.realitybuilder.util.isFlashCanvasActive() &&
             com.realitybuilder.util.isFlashReadyForFlashCanvas()));
};

com.realitybuilder.util.showNoCanvasErrorMessage = function () {
    dojo.attr('noCanvasErrorMessage', 'innerHTML', 
        '<p class="first">The Reality Builder does not work because your ' +
        'browser does not support the <a ' +
        'href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas ' +
        'element</a>.</p>');
};

com.realitybuilder.util.showNoImagesErrorMessage = function () {
    dojo.attr('noImagesErrorMessage', 'innerHTML', 
        '<p class="first">The Reality Builder does not work because your ' +
        'browser does not load images.</p>');
};

// Clears the canvas "canvas".
com.realitybuilder.util.clearCanvas = function (canvas) {
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
};

// Fills the canvas "canvas" with color "color".
com.realitybuilder.util.fillCanvas = function (canvas, color) {
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        context.fillStyle = color;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
};

}

if(!dojo._hasResource['com.realitybuilder.ConstructionBlocks']){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource['com.realitybuilder.ConstructionBlocks'] = true;
// All blocks permanently in the construction, including deleted blocks and
// pending blocks. The new, user positionable block is not part of the
// construction.

// Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('com.realitybuilder.ConstructionBlocks');




dojo.declare('com.realitybuilder.ConstructionBlocks', null, {
    // Version of blocks data last retrieved from the server, or "-1"
    // initially. Is a string in order to be able to contain very large
    // integers.
    _versionOnServer: '-1',

    // Construction that the blocks are associated with.
    _construction: null,

    // Properties (shape, dimensions, etc.) of a block:
    _blockProperties: null,

    // Properties of a construction block:
    _constructionBlockProperties: null,

    // The blocks.
    _blocks: null,

    // All real blocks, sorted by height, from top to bottom.
    _realBlocksSorted: null,

    // All blocks that are pending.
    _pendingBlocks: null,

    // Canvases for drawing real and pending blocks.
    _realBlocksCanvas: null,
    _pendingBlocksCanvas: null,

    // Creates a container for the blocks associated with the construction
    // "construction".
    constructor: function (construction, blockProperties, 
                           constructionBlockProperties) {
        this._blockProperties = blockProperties;
        this._constructionBlockProperties = constructionBlockProperties;
        this._blocks = [];
        this._realBlocksSorted = [];
        this._construction = construction;
        var sensor = construction.camera().sensor();
        this._realBlocksCanvas = sensor.realBlocksCanvas();
        this._pendingBlocksCanvas = sensor.pendingBlocksCanvas();
    },

    blocks: function () {
        return this._blocks;
    },

    pendingBlocks: function () {
        return this._pendingBlocks;
    },

    realBlocksSorted: function () {
        return this._realBlocksSorted;
    },

    // Returns block space z coordinate of the highest real blocks, or -1 if
    // there are no real blocks.
    highestRealBlocksZB: function () {
        if (this._realBlocksSorted.length > 0) {
            return this._realBlocksSorted[0].zB();
        } else {
            return -1;
        }
    },

    // Returns all blocks positioned at z coordinate "zB", in block space.
    realBlocksInLayer: function (zB) {
        var blocks = [], i, realBlocksSorted = this._realBlocksSorted, block;

        for (i = 0; i < realBlocksSorted.length; i += 1) {
            block = realBlocksSorted[i];
            if (block.zB() === zB) {
                blocks.push(block);
            } else if (block.zB() < zB) {
                break; // no further possible blocks in sorted array
            }
        }

        return blocks;
    },

    versionOnServer: function () {
        return this._versionOnServer;
    },

    // Returns false when the object is new and has not yet been updated with
    // server data.
    isInitializedWithServerData: function () {
        return this._versionOnServer !== '-1';
    },

    _createBlockFromServerData: function (serverData) {
        var camera = this._construction.camera(), rb = com.realitybuilder;
        return new rb.ConstructionBlock(this._blockProperties,
                                        camera, 
                                        serverData.positionB, serverData.a,
                                        this._constructionBlockProperties,
                                        serverData.state,
                                        serverData.timeStamp);
    },

    // Sets the data of construction blocks to the version on the server, which
    // is described by "serverData".
    updateWithServerData: function (serverData) {
        this._versionOnServer = serverData.version;

        this._blocks = dojo.map(serverData.blocks, 
                                dojo.hitch(this,
                                           this._createBlockFromServerData));

        this._updateRealBlocksSorted();
        this._updatePendingBlocks();
        dojo.publish('com/realitybuilder/ConstructionBlocks/changed');
    },

    // Sort function, for ordering blocks by height/layer. From top to bottom.
    _sortByHeight: function (block1, block2) {
        if (block1.zB() > block2.zB()) {
            return -1;
        } else if (block1.zB() < block2.zB()) {
            return 1;
        } else {
            return 0;
        }
    },

    // Finds all real blocks and stores them.
    _updateRealBlocksSorted: function (serverData) {
        var tmp = dojo.filter(this._blocks, function (block) {
            return block.isReal();
        });
        tmp.sort(this._sortByHeight);
        this._realBlocksSorted = tmp;
    },

    // Finds all pending blocks and stores them.
    _updatePendingBlocks: function (serverData) {
        this._pendingBlocks = dojo.filter(this._blocks, function (block) {
            return block.isPending();
        });
    },

    // Returns the construction block at the block space position "positionB",
    // or false if there is none.
    blockAt: function (positionB) {
        var blocks = this.blocks(), block, i;
        for (i = 0; i < blocks.length; i += 1) {
            block = blocks[i];
            if (com.realitybuilder.util.pointsIdenticalB(
                positionB, block.positionB())) {
                return block;
            }
        }
        return false;
    },

    // Returns true, iff there is any collision between real blocks and the
    // block "block".
    realBlocksCollideWith: function (block) {
        var 
        realBlocks = this.realBlocksSorted(), 
        realBlock, i;

        for (i = 0; i < realBlocks.length; i += 1) {
            realBlock = realBlocks[i];
            if (realBlock.collidesWith(block)) {
                return true;
            }
        }
        return false;
    },

    // Returns true, iff there are real blocks that are attachable to the block
    // "block".
    realBlocksAreAttachableTo: function (block) {
        var realBlocks = this.realBlocksSorted(), realBlock, i;

        for (i = 0; i < realBlocks.length; i += 1) {
            realBlock = realBlocks[i];
            if (realBlock.attachableTo(block)) {
                return true;
            }
        }
        return false;
    },

    // Called if making the block pending on the server succeeded.
    _makePendingOnServerSucceeded: function () {
        dojo.publish('com/realitybuilder/ConstructionBlocks/changedOnServer');
    },

    // Called if making the block pending on the server failed.
    _makePendingOnServerFailed: function () {
        dojo.publish('com/realitybuilder/ConstructionBlocks/' + 
                     'changeOnServerFailed');
    },

    // Triggers setting the state of the construction block at the position
    // "positionB" and with rotation angle "a" to pending: on the client and on
    // the server. Once the server has completed the request, the list of
    // blocks is updated.
    makePendingOnServer: function (positionB, a) {
        dojo.xhrPost({
            url: "/admin/rpc/make_pending",
            content: {
                "xB": positionB[0],
                "yB": positionB[1],
                "zB": positionB[2],
                "a": a
            },
            load: dojo.hitch(this, this._makePendingOnServerSucceeded),
            error: dojo.hitch(this, this._makePendingOnServerFailed)
        });
    },

    // Called if deleting the block on the server succeeded.
    _deleteOnServerSucceeded: function () {
        dojo.publish('com/realitybuilder/ConstructionBlocks/changedOnServer');
    },

    // Called if deleting the block on the server failed.
    _deleteOnServerFailed: function () {
        dojo.publish('com/realitybuilder/ConstructionBlocks/' + 
                     'changeOnServerFailed');
    },

    // Deletes the block positioned at the block space position "positionB" and
    // rotated by the angle "a", on the client and on the server.
    deleteOnServer: function (positionB, a) {
        dojo.xhrPost({
            url: "/admin/rpc/delete",
            content: {
                "xB": positionB[0],
                "yB": positionB[1],
                "zB": positionB[2],
                "a": a
            },
            load: dojo.hitch(this, this._deleteOnServerSucceeded),
            error: dojo.hitch(this, this._deleteOnServerFailed)
        });
    },

    // Called if making the block real on the server succeeded.
    _makeRealOnServerSucceeded: function () {
        dojo.publish('com/realitybuilder/ConstructionBlocks/changedOnServer');
    },

    // Called if making the block real on the server failed.
    _makeRealOnServerFailed: function () {
        dojo.publish('com/realitybuilder/ConstructionBlocks/' +
                     'changeOnServerFailed');
    },

    // Triggers setting the state of the block at the block space position
    // "positionB" and rotated by the angle "a" to real: on the client and on
    // the server.
    makeRealOnServer: function (positionB, a) {
        dojo.xhrPost({
            url: "/admin/rpc/make_real",
            content: {
                "xB": positionB[0],
                "yB": positionB[1],
                "zB": positionB[2],
                "a": a
            },
            load: dojo.hitch(this, this._makeRealOnServerSucceeded),
            error: dojo.hitch(this, this._makeRealOnServerFailed)
        });
    },

    // Triggers setting of the state of the block at the block space position
    // "positionB" and rotated by the angle "a" to the state "state" on the
    // server.
    setBlockStateOnServer: function (positionB, a, state) {
        switch (state) {
        case 0:
            this.deleteOnServer(positionB, a);
            break;
        case 1:
            this.makePendingOnServer(positionB, a);
            break;
        case 2:
            this.makeRealOnServer(positionB, a);
            break;
        }
    },

    // If available, find the real block whose upper side is below the block
    // space coordinates "xB", "yB", "zB". Returns the block space z coordinate
    // of the upper side of the block. If no such block is available, returns
    // 0.
    zBOfUpperSideOfRealBlockBelow: function (xB, yB, zB) {
        var realBlocks, zBMax, zBOfUpperSide, bXB, bYB, bZB;
        realBlocks = this._realBlocksSorted;
        zBMax = zB - 1;
        zBOfUpperSide = 0;
        dojo.forEach(realBlocks, function (b) {
            bXB = b.xB();
            bYB = b.yB();
            bZB = b.zB();
            if (bZB + 1 <= zBMax && 
                xB >= bXB && xB <= bXB + 1 &&
                yB >= bYB && yB <= bYB + 1 &&
                bZB + 1 > zBOfUpperSide) {
                zBOfUpperSide = bZB + 1;
            }
        });
        return zBOfUpperSide;
    },

    // Renders the blocks "blocks" on the canvas "canvas".
    _renderBlocks: function (canvas, blocks) {
        if (canvas.getContext) {
            var context = canvas.getContext('2d');
            com.realitybuilder.util.clearCanvas(canvas);
            dojo.forEach(blocks, function (b) {
                b.render(context);
            });
        }
    },

    // Renders the construction blocks as seen by the camera's sensor.
    render: function () {
        this._renderBlocks(this._realBlocksCanvas, this._realBlocksSorted);
        this._renderBlocks(this._pendingBlocksCanvas, this._pendingBlocks);
    }
});

}

if(!dojo._hasResource['com.realitybuilder.LayerShadow']){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource['com.realitybuilder.LayerShadow'] = true;
// "Layer shadow": The shadow under the new block, projected onto a layer of
// blocks under the assumption that there are no layers below and above that
// layer.
//
// Instantiating this class causes creation of DOM elements. These elements may
// not be removed from memory upon deletion of an instance. This problem
// happens for example in Firefox 4, thus leading to memory leaks. As a
// solution, it is recommended that an instance is reused wherever possible.

// Sometimes the term "full shadow" is used, which refers to the shadow how it
// would look if the all blocks in the layer would form an infinite plane
// without holes.

// Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('com.realitybuilder.LayerShadow');

dojo.declare('com.realitybuilder.LayerShadow', null, {
    // New block that the shadow is associated with.
    _newBlock: null,

    // Camera object, used for calculating the projection on the camera sensor.
    _camera: null,

    // Properties (shape, dimensions, etc.) of a block:
    _blockProperties: null,

    // Permament blocks in the construction, including real and pending blocks.
    // Needed for hidden lines removal and collision detection.
    _constructionBlocks: null,

    // Coordinates of the full shadow's vertexes in world space, view space,
    // and sensor space.
    _fullVertexes: null,
    _fullVertexesV: null,
    _fullVertexesS: null,

    // Canvas onto which the layer shadow is drawn:
    _canvas: null,

    // Temporary canvas, for constructing the layer shadow (it's safer to
    // create it only once and reuse it, to avoid possible memory leaks with
    // weak garbage collectors).
    _helperCanvas: null,

    constructor: function (newBlock, blockProperties, camera, 
                           constructionBlocks)
    {
        var shadowCanvas;

        this._newBlock = newBlock;
        this._blockProperties = blockProperties;
        this._camera = camera;
        this._constructionBlocks = constructionBlocks;

        shadowCanvas = camera.sensor().shadowCanvas();
        this._canvas = dojo.create('canvas');
        dojo.attr(this._canvas, 'width', shadowCanvas.width);
        dojo.attr(this._canvas, 'height', shadowCanvas.height);
        this._helperCanvas = dojo.create('canvas');
        dojo.attr(this._helperCanvas, 'width', shadowCanvas.width);
        dojo.attr(this._helperCanvas, 'height', shadowCanvas.height);

        if (com.realitybuilder.util.isFlashCanvasActive()) {
            FlashCanvas.initElement(this._canvas);
            FlashCanvas.initElement(this._helperCanvas);
        }
    },

    // Returns the canvas onto which the layer shadow is drawn:
    canvas: function () {
        return this._canvas;
    },

    // Updates the vertexes of the full shadow, projected onto the layer of
    // blocks of elevation "layerZB", in world space.
    _updateWorldSpace: function (layerZB) {
        var 
        xB = this._newBlock.xB(),
        yB = this._newBlock.yB(),
        zB = layerZB + 1,
        vs = [],
        blockOutlineBXY = 
            this._blockProperties.rotatedOutlineBXY(this._newBlock.a()),
        that = this;

        // counterclockwise:
        dojo.forEach(blockOutlineBXY, function (vertexBXY) {
            vs.push(com.realitybuilder.util.
                    blockToWorld([xB + vertexBXY[0], 
                                  yB + vertexBXY[1], 
                                  zB],
                                 that._blockProperties));
        });

        this._fullVertexes = vs;
    },

    // Calculates the vertexes of the full shadow, projected onto the layer of
    // blocks of elevation "layerZB", in view space.
    _updateViewSpaceCoordinates: function (layerZB) {
        this._updateWorldSpace(layerZB);
        this._fullVertexesV = dojo.map(this._fullVertexes, 
                                       dojo.hitch(this._camera, 
                                                  this._camera.worldToView));
    },

    // Calculates the vertexes of the full shadow, projected onto the layer of
    // blocks of elevation "layerZB", in sensor space. The camera is positioned
    // in the center of the sensor.
    //
    // Depends on up to date view space coordinates.
    _updateSensorSpaceCoordinates: function (layerZB) {
        this._fullVertexesS = dojo.map(this._fullVertexesV,
                                   dojo.hitch(this._camera, 
                                              this._camera.viewToSensor));
    },

    // Updates coordinates for the full shadow, projected onto the layer of
    // blocks of elevation "layerZB"
    _updateCoordinates: function (layerZB) {
        this._updateViewSpaceCoordinates(layerZB);
        this._updateSensorSpaceCoordinates(layerZB);
    },

    // Renders the tops of the blocks in the layer "layerZB".
    _renderTops: function (layerZB, context) {
        var 
        realBlocksOnLayer = 
            this._constructionBlocks.realBlocksInLayer(layerZB);

        dojo.forEach(realBlocksOnLayer, function (realBlock) {
            realBlock.renderSolidTop(context);
        });
    },

    // Draws the full shadow, projected onto the layer of blocks of elevation
    // "layerZB", on the canvas with rendering context "context". Uses the
    // color "color" as the color of the shadow.
    _renderFull: function (layerZB, context, color) {
        var fullVertexesS, vertexS, i;

        this._updateCoordinates(layerZB);

        fullVertexesS = this._fullVertexesS;

        context.fillStyle = color;

        // counterclockwise:
        vertexS = fullVertexesS[0];
        context.beginPath();
        context.moveTo(vertexS[0], vertexS[1]);
        for (i = 1; i < fullVertexesS.length; i += 1) {
            vertexS = fullVertexesS[i];
            context.lineTo(vertexS[0], vertexS[1]);
        }
        context.closePath();
        context.fill();
    },

    // Draws the shadow on top of a layer of blocks, or on the ground plane, on
    // the canvas with rendering context "context", as seen by the sensor of
    // the camera.
    //
    // "layerZB" is the elevation of the layer of blocks, on which the shadow
    // is projected (-1 is the ground plane):
    //
    // Draws the shadow in the color "color".
    render: function (layerZB, color) {
        var 
        canvas = this._canvas, helperCanvas = this._helperCanvas, 
        context, helperContext;

        // Draws the layer shadow by drawing the intersection between the tops
        // of the layer's blocks (or the ground plane) and the full shadow. To
        // do this, first xors the tops (ground plane) and the full shadow.
        // Then subtracts that from the combination of the blocks and the full
        // shadow. Rationale for this rather complicated procedure: The easier
        // canvas compositing method "source-in" is not supported by Google
        // Chrome 11.
        if (canvas.getContext) {
            context = canvas.getContext('2d');
            com.realitybuilder.util.clearCanvas(canvas);
            helperContext = helperCanvas.getContext('2d');
            com.realitybuilder.util.clearCanvas(helperCanvas);

            context.globalCompositeOperation = "source-over";
            if (layerZB === -1) {
                com.realitybuilder.util.fillCanvas(canvas, "black");
            } else {
                this._renderTops(layerZB, context); // slow with many blocks
            }

            // xor:
            helperContext.globalCompositeOperation = "source-over";
            helperContext.drawImage(canvas, 0, 0);
            helperContext.globalCompositeOperation = "xor";
            this._renderFull(layerZB, helperContext, color); // fast

            // completes combination:
            this._renderFull(layerZB, context, color); // fast
            
            // subtracts:
            context.globalCompositeOperation = "destination-out";
            context.drawImage(helperCanvas, 0, 0);
        }
    }
});

}

if(!dojo._hasResource['com.realitybuilder.ShadowObscuringBlocks']){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource['com.realitybuilder.ShadowObscuringBlocks'] = true;
// "Shadow obscuring blocks": Blocks that are used for graphically removing
// that parts of a shadow that are not actually visible.
//
// Example 1:
//
// * Real blocks with new block hovering above (NN), and shadow (_) how it
//   should look:
//
//          NN
//          __
//       [][][]
//     [][]  [][]
//     [][]  [][]
//
// * Corresponding shadow obscuring blocks:
//
//          NN
//          __
//       [][][]
//     [][][][][]
//     [][][][][]
//
//   Without the two additional blocks, a shadow would falsely be visible below
//   one of the real blocks:
//
//          NN
//          __
//       [][][]
//       []  []
//     [][] _[][]
//
//   Note that for obscuring the shadow with the two additional blocks, only
//   their bottom is drawn. Otherwise too much would be obscured. This is the
//   case for all additional blocks.
//
// Example 2:
//
// * Same as above, but with different position of new block. How it should
//   look:
//
//       [][][]
//     [][]NN[][]
//     [][]__[][]
//
// * Corresponding shadow obscuring blocks (only blocks whose bounding boxes
//   that overlap with bounding box of shadow are taken into account - depends
//   on camera location):
//
//       [][][]
//     [][]NN[][]
//     [][]__[][]
//
//   This time, no additional blocks are used because otherwise the shadow
//   would not appear at all.
//
// In a nutshell, the shadow obscuring blocks in each layer are comprised of:
//
// * Copies of all real blocks in that layer.
//
// * If the layer is below the new block: Copies of all shadow obscuring blocks
//   from the layer above.

// Sometimes the term "full shadow" is used, which refers to the shadow how it
// would look if the all blocks in the layer would form an infinite plane
// without holes.

// Copyright 2011 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('com.realitybuilder.ShadowObscuringBlocks');

dojo.declare('com.realitybuilder.ShadowObscuringBlocks', null, {
    // The blocks, sorted by height, from top to bottom.
    _blocksSorted: null,

    // New block that the shadow is associated with.
    _newBlock: null,

    // Camera object, used for calculating the projection on the camera sensor.
    _camera: null,

    // Properties (shape, dimensions, etc.) of a block:
    _blockProperties: null,

    // Permament blocks in the construction, including real and pending blocks.
    // Needed for hidden lines removal and collision detection.
    _constructionBlocks: null,

    constructor: function (newBlock, blockProperties, camera, 
                           constructionBlocks)
    {
        this._newBlock = newBlock;
        this._blockProperties = blockProperties;
        this._camera = camera;
        this._constructionBlocks = constructionBlocks;
    },

    _copyBlocksToLayer: function (srcBlocks, dstZB) {
        var blocks = [], camera = this._camera, that = this;

        dojo.forEach(srcBlocks, function (srcBlock) {
            var dstBlock, dstPositionB;

            dstPositionB = [srcBlock.xB(), srcBlock.yB(), dstZB];
            dstBlock = new com.realitybuilder.Block(that._blockProperties,
                                                    camera, dstPositionB,
                                                    srcBlock.a());
            dstBlock.onlySubtractBottom();
            blocks.push(dstBlock);
        });

        return blocks;
    },

    // Updates the list of blocks (see definition of "shadow obscuring
    // blocks").
    update: function () {
        var 
        zB, 
        newBlock = this._newBlock, 
        cbs = this._constructionBlocks,
        blocks = [],
        blocksInLayer, blocksInPrevLayer = [], copiedBlocks;

        for (zB = cbs.highestRealBlocksZB(); zB >= 0; zB -= 1) {
            // Collects shadow obscuring blocks for current layer:
            blocksInLayer = cbs.realBlocksInLayer(zB);

            if (zB < newBlock.zB()) {
                copiedBlocks = this._copyBlocksToLayer(blocksInPrevLayer, zB);
                blocksInLayer = blocksInLayer.concat(blocksInLayer, 
                                                     copiedBlocks);
            }

            blocks = blocks.concat(blocksInLayer);

            blocksInPrevLayer = blocksInLayer;
        }

        this._blocksSorted = blocks;
    },

    // Returns the blocks with the z coordination "zB", in block space.
    _blocksInLayer: function (zB) {
        var blocksSorted, block, i, blocks = [];

        blocksSorted = this._blocksSorted;

        for (i = 0; i < blocksSorted.length; i += 1) {
            block = blocksSorted[i];
            if (block.zB() === zB) {
                blocks.push(block);
            } else if (block.zB() < zB) {
                break; // no further matching blocks in sorted array
            }
        }

        return blocks;
    },

    // Graphically subtract the shadow obscuring blocks with vertical position
    // "zB" from the canvas with the rendering context "context".
    subtract: function (context, zB) {
        var blocksInLayer = this._blocksInLayer(zB);

        dojo.forEach(blocksInLayer, function (block) {
            block.subtract(context);
        });
    }
});

}

if(!dojo._hasResource['com.realitybuilder.Shadow']){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource['com.realitybuilder.Shadow'] = true;
// The shadow under the new block. It is used to indicate where the block is
// hovering.

// Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('com.realitybuilder.Shadow');




dojo.declare('com.realitybuilder.Shadow', null, {
    // New block that the shadow is associated with.
    _newBlock: null,

    // Camera object, used for calculating the projection on the camera sensor.
    _camera: null,

    // Properties (shape, dimensions, etc.) of a block:
    _blockProperties: null,

    // Permament blocks in the construction, including real and pending blocks.
    // Needed for hidden lines removal and collision detection.
    _constructionBlocks: null,

    // Blocks that are used for graphically removing that parts of a shadow
    // that are not actually visible.
    _shadowObscuringBlocks: null,

    // Only one instance of LayerShadow is used, to avoid memory leaks. See the
    // documentation of LayerShadow for more information.
    _layerShadow: null,

    // Creates the shadow of the block "newBlock". When the shadow is rendered,
    // it is as seen by the sensor of the camera "camera". For finding which
    // parts of the shadow have to be obscured, the list of non-new blocks in
    // the construction is used: "constructionBlocks"
    constructor: function (newBlock, blockProperties, camera, 
                           constructionBlocks)
    {
        this._newBlock = newBlock;
        this._blockProperties = blockProperties;
        this._camera = camera;
        this._constructionBlocks = constructionBlocks;

        this._shadowObscuringBlocks =
            new com.realitybuilder.ShadowObscuringBlocks(newBlock, 
                                                         blockProperties,
                                                         camera,
                                                         constructionBlocks);

        this._layerShadow = 
            new com.realitybuilder.LayerShadow(newBlock, blockProperties,
                                               camera, constructionBlocks);
    },

    _renderLayerShadow: function (context, newBlock, camera, 
                                  constructionBlocks, layerZB, color, alpha)
    {
        this._layerShadow.render(layerZB, color);
        context.globalAlpha = alpha;
        context.drawImage(this._layerShadow.canvas(), 0, 0);
        context.globalAlpha = 1;
    },

    // Draws the shadow of the new block as seen by the sensor of the camera.
    //
    // Draws the shadow in the color "color" and with alpha transparency
    // "alpha".
    render: function (color, alpha) {
        var 
        canvas = this._camera.sensor().shadowCanvas(), context, 
        layerZB,
        newBlock = this._newBlock, camera = this._camera,
        constructionBlocks = this._constructionBlocks,
        maxLayerZB = constructionBlocks.highestRealBlocksZB();

        this._shadowObscuringBlocks.update();

        if (canvas.getContext) {
            context = canvas.getContext('2d');
            com.realitybuilder.util.clearCanvas(canvas);

            // draws shadow from bottom up, in each step removing parts that
            // are obscured by blocks in the layer above:
            for (layerZB = -1; layerZB <= maxLayerZB; layerZB += 1) {
                if (layerZB < newBlock.zB()) {
                    this._renderLayerShadow(context, newBlock, camera, 
                                            constructionBlocks, layerZB, 
                                            color, alpha);
                }
                this._shadowObscuringBlocks.subtract(context, layerZB + 1);
            }
            return;
        }
    },

    // Makes sure that the shadow is not shown on the sensor.
    clear: function () {
        var canvas = this._camera.sensor().shadowCanvas();
        com.realitybuilder.util.clearCanvas(canvas);
    }
});

}

if(!dojo._hasResource['com.realitybuilder.NewBlock']){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource['com.realitybuilder.NewBlock'] = true;
// The new block in the construction. It may be positioned by the user.

// Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('com.realitybuilder.NewBlock');




dojo.declare('com.realitybuilder.NewBlock', com.realitybuilder.Block, {
    '-chains-': {
        constructor: 'manual'
    },

    // Version of data last retrieved from the server, or "-1" initially. Is a
    // string in order to be able to contain very large integers.
    _versionOnServer: '-1',

    // Points in move space, defining the rectangle which represents the space
    // in which the block may be moved around.
    _moveSpace1B: null,
    _moveSpace2B: null,

    // Points in block space, defining the rectangle which represents the space
    // in which the block may be built.
    _buildSpace1B: null,
    _buildSpace2B: null,

    // Colors (CSS format) and transparency of the block and its shadow:
    _color: null,
    _stoppedColor: null, // when it is stopped
    _shadowColor: null,
    _shadowAlpha: null,

    // Iff true, then the block is stopped, which means that it can neither be
    // moved nor be rotated.
    _isStopped: null,

    // Permament blocks in the construction, including real and pending blocks.
    // Needed for hidden lines removal and collision detection.
    _constructionBlocks: null,

    // Shadow in south-east direction.
    _shadow: null,

    // Camera object, used for calculating the projection on the camera sensor.
    _camera: null,

    // Block space position used when last calculating the sensor space
    // coordinates.
    _lastPositionB: null,

    // Whether the block was stopped or not when it was last rendered.
    _lastIsStopped: null,

    // Version of the construction blocks when the shadow was last rendered.
    _lastConstructionBlocksVersion: null,

    // Prerender-mode (only relevant if enabled):
    _prerenderMode: null,

    // Creates the new block that the user may position. For collision
    // detection and for calculating hidden lines, the block needs to know
    // about the other blocks in the construction: "constructionBlocks" When
    // the block is rendered, it is as seen by the sensor of the camera
    // "camera".
    //
    // The block's properties, such as shape and size, are described by
    // "blockProperties".
    //
    // Details of data for prerender-mode, if enabled, are contained in
    // "prerenderMode".
    constructor: function (blockProperties, camera, constructionBlocks,
                           prerenderMode)
    {
        this.inherited(arguments, [blockProperties, camera, [0, 0, 0], 0]);
        this._isStopped = false;
        this._constructionBlocks = constructionBlocks;
        this._shadow = new com.realitybuilder.Shadow(this, blockProperties, 
                                                     camera, 
                                                     constructionBlocks);
        this._camera = camera;
        this._prerenderMode = prerenderMode;
    },

    versionOnServer: function () {
        return this._versionOnServer;
    },

    // Returns false when the object is new and has not yet been updated with
    // server data.
    isInitializedWithServerData: function () {
        return this._versionOnServer !== '-1';
    },

    // Updates the block properties to the version on the server, which is
    // described by "serverData".
    updateWithServerData: function (serverData) {
        var positionAngleWereInitialized;

        if (!this.isInitializedWithServerData()) {
            this._positionB = serverData.initPositionB;
            this._a = serverData.initA;
            positionAngleWereInitialized = true;
        } else {
            positionAngleWereInitialized = false;
        }

        this._moveSpace1B = serverData.moveSpace1B;
        this._moveSpace2B = serverData.moveSpace2B;
        this._buildSpace1B = serverData.buildSpace1B;
        this._buildSpace2B = serverData.buildSpace2B;

        this._color = serverData.color;
        this._stoppedColor = serverData.stoppedColor;
        this._shadowColor = serverData.shadowColor;
        this._shadowAlpha = serverData.shadowAlpha;

        this._versionOnServer = serverData.version;

        if (positionAngleWereInitialized) {
            dojo.publish('com/realitybuilder/NewBlock/' + 
                         'positionAngleInitialized');
        }
        dojo.publish('com/realitybuilder/NewBlock/moveOrBuildSpaceChanged');
    },

    // Returns true, iff the current block collides with any real block.
    _collidesWithRealBlock: function () {
        return this._constructionBlocks.realBlocksCollideWith(this);
    },

    // Moves the block in block space, by "delta", unless the move would make
    // it go out of range.
    move: function (deltaB) {
        if (!this.wouldGoOutOfRange(deltaB, 0)) {
            this._positionB = com.realitybuilder.util.addVectorsB(
                this._positionB, deltaB);
            dojo.publish('com/realitybuilder/NewBlock/movedOrRotated');
        }
    },

    // Rotates the block by 90°, CCW when viewed from above, unless the
    // rotation would make it go out of range.
    rotate90: function () {
        var congruencyA = this._blockProperties.congruencyA();
        if (!this.wouldGoOutOfRange([0, 0, 0], 1)) {
            this._a = (this._a + 1) % congruencyA; // multiples of 90°
            dojo.publish('com/realitybuilder/NewBlock/movedOrRotated');
        }
    },

    // Requests that the block be made pending, thereby requesting to
    // eventually have it made real.
    requestMakeReal: function () {
        if (this.canBeMadeReal()) {
            this._stop();
            this._createPendingOnServer();
            dojo.publish('com/realitybuilder/NewBlock/makeRealRequested');
        }
    },

    isRotatable: function () {
        return !this._isStopped;
    },

    isMovable: function () {
        return !this._isStopped;
    },

    isStopped: function () {
        return this._isStopped;
    },

    _stop: function () {
        this._isStopped = true;
        dojo.publish('com/realitybuilder/NewBlock/stopped');
    },

    _makeMovable: function () {
        this._isStopped = false;
        dojo.publish('com/realitybuilder/NewBlock/madeMovable');
    },

    // Updates the position and state of this block to reflect changes in the
    // construction. Depends on up to date lists of blocks and real blocks.
    updatePositionAndMovability: function () {
        var positionB, state, constructionBlock;

        // Makes the block movable again if certain conditions are met:
        if (this.isStopped()) {
            constructionBlock = 
                this._constructionBlocks.blockAt(this.positionB());
            if (constructionBlock) {
                // Construction block in same position as new block.

                if (constructionBlock.isDeleted() ||  
                    constructionBlock.isReal()) {
                    // construction block real = make-real-request accepted,
                    // construction block deleted = request denied

                    this._makeMovable(); // so that user can continue
                } // else: pending or no data from the server
            }
        }

        // Updates the position of the new block so that it doesn't conflict
        // with any real block.
        this._updatePositionB();
    },

    // Makes sure that this block does not intersect with any real block. If it
    // does, it is elevated step by step until it sits on top of another block.
    // Only updates the position of the block in block space. Does not update
    // any of the other coordinates.
    _updatePositionB: function () {
        var 
        testBlock, cbs = this._constructionBlocks, 
        xB = this.xB(), yB = this.yB(), testZB;
        if (this._collidesWithRealBlock()) {
            testZB = this.zB();
            do {
                testZB += 1;
                testBlock = new com.realitybuilder.Block(this._blockProperties,
                                                         this._camera,
                                                         [xB, yB, testZB],
                                                         this.a());
            } while (cbs.realBlocksCollideWith(testBlock));
            this._positionB[2] = testZB;
        }
    },

    // Returns true, if this block would intersect with any real block if:
    //
    // * it was moved in block space by the vector "deltaB", and/or 
    //
    // * rotated CCW (when viewd from above) by the angle "deltaA" (in
    //   multiples of 90°), or 
    //
    // * if it would be outside of the space where it is allowed to be moved.
    wouldGoOutOfRange: function (deltaB, deltaA) {
        var testPositionB, testBlock, testA, congruencyA;

        congruencyA = this._blockProperties.congruencyA();

        testPositionB = com.realitybuilder.util.addVectorsB(this.positionB(), 
                                                            deltaB);
        testA = (this.a() + deltaA) % congruencyA;
        testBlock = new com.realitybuilder.Block(this._blockProperties,
                                                 this._camera, 
                                                 testPositionB, testA);

        return (this._constructionBlocks.realBlocksCollideWith(testBlock) ||
                !this._wouldBeInMoveSpace(testPositionB));
    },

    // Returns true, if this block would be outside the move space, if it was
    // at the position "testB" (block space coordinates). The move space is the
    // space in which the block is allowed to be moved around.
    _wouldBeInMoveSpace: function (testB) {
        var m1B = this._moveSpace1B, m2B = this._moveSpace2B;
        return (testB[0] >= m1B[0] && testB[0] <= m2B[0] &&
                testB[1] >= m1B[1] && testB[1] <= m2B[1] &&
                testB[2] >= 0 && testB[2] <= m2B[2]);
    },

    // Returns true, iff this block is in the space where blocks may be build.
    _isInBuildSpace: function () {
        var xB = this._positionB[0],
            yB = this._positionB[1],
            zB = this._positionB[2],
            b1B = this._buildSpace1B, b2B = this._buildSpace2B;
        return (xB >= b1B[0] && xB <= b2B[0] &&
                yB >= b1B[1] && yB <= b2B[1] &&
                zB >= b1B[2] && zB <= b2B[2]);
    },

    // Returns true, iff this block is attachable to another block or to the
    // ground.
    _isAttachable: function () {
        return (this._constructionBlocks.realBlocksAreAttachableTo(this) || 
                this.zB() === 0);
    },

    _isInPrerenderedBlockConfiguration: function () {
        var realBlocks = this._constructionBlocks.realBlocksSorted();
        return this._prerenderMode.matchingBlockConfiguration(realBlocks, 
                                                              this) !== false;
    },

    // Returns true, iff the new block can be made real in its current
    // position.
    canBeMadeReal: function () {
        return this._isInBuildSpace() && this._isAttachable() && 
            (!this._prerenderMode.isEnabled() ||
             this._isInPrerenderedBlockConfiguration());
    },

    // Returns true, iff the bounding box of the current block overlaps with
    // that of the block "block", in sensor space.
    _boundingBoxesOverlap: function (block) {
        // l = left, r = right, b = bottom, t = top
        var 
        l, r, b, t, blockL, blockR, blockB, blockT, 
        horizontalOverlap, verticalOverlap;

        this._updateCoordinates();
        l = this._boundingBoxS[0][0];
        r = this._boundingBoxS[1][0];
        b = this._boundingBoxS[0][1];
        t = this._boundingBoxS[1][1];
        block._updateCoordinates();
        blockL = block._boundingBoxS[0][0];
        blockR = block._boundingBoxS[1][0];
        blockB = block._boundingBoxS[0][1];
        blockT = block._boundingBoxS[1][1];

        horizontalOverlap = (r >= blockL && l <= blockR);
        verticalOverlap = (t >= blockB && b <= blockT);

        return horizontalOverlap && verticalOverlap;
    },

    // Compares the vertexes "vertexes1VXZ" with the edges defined by
    // "vertexes2VXZ".
    _relationVertexesEdges: function (vertexes1VXZ, vertexes2VXZ) {
        var util, len, i, j, relation, vertexVXZ, vertex1VXZ, edge2VXZ;

        util = com.realitybuilder.util;

        len = vertexes2VXZ.length; // same for all blocks
        for (i = 0; i < len; i += 1) { // iterates edges of this block
            edge2VXZ = [vertexes2VXZ[i], vertexes2VXZ[(i + 1) % len]];
            for (j = 0; j < len; j += 1) { // iterates vertexes of "block"
                vertex1VXZ = vertexes1VXZ[j];
                relation = util.relationPointSegmentVXZ(vertex1VXZ,
                                                        edge2VXZ);

                if (relation < 0 || relation > 0) {
                    return relation;
                } // else continue since no decision can be made yet
            }
        }

        return 0; // undecided
    },

    // If the new block (= the current block) and the block "block" are on the
    // same layer (SL) and they overlap (O) in sensor space, then this has one
    // of the following return values:
    //
    // True: The block "block" obscures the new block visually. In other words:
    //   To get a correct result, the block "block" has to be drawn on top of
    //   the new block.
    //
    // False: The new block obscures the block "block" visually.
    _isObscuredBySLO: function (block) {
        var relation, vertexesVXZ, blockVertexesVXZ;

        // What follows is a comparison of the projection of the blocks on the
        // view space x-z-plane, from the point of view of the camera. The
        // projection is a parallel projection: It works simply by extending
        // the vertical edges of the prismatic blocks to the view space
        // x-z-plane.

        vertexesVXZ = this.projectedVertexesVXZ();
        blockVertexesVXZ = block.projectedVertexesVXZ();

        if (vertexesVXZ === false || blockVertexesVXZ === false) {
            // something went wrong during calculation (extremely unlikely) =>
            // fail silently with an arbitrary return value:
            return false;
        }

        relation = this._relationVertexesEdges(blockVertexesVXZ, vertexesVXZ);
        if (relation === 0) {
            // Still undecided => swap around blocks. May be necessary if this
            // block is very narrow from the perspective of the camera. In that
            // case, the straight lines going through the vertexes of "block"
            // never cut the edges of this block.
            relation = 
                this._relationVertexesEdges(vertexesVXZ, blockVertexesVXZ);
            relation = -relation;
        }

        if (relation < 0) {
            // Vertex of "block" is in front of edge of this block. =>
            // "block" is in front of this block, as both are convex
            // prisms in the same layer.
            return true;
        } else if (relation > 0) {
            // Vertex of "block" is behind edge of this block.
            return false;
        } else {
            return false; // blocks don't overlap in screen space, and so
                          // return value is irrelevant (see description of
                          // function)
        }
    },

    // Subtracts the shape of the the real block "realblock" from the canvas
    // containing the drawing of the new block. The context of that canvas is
    // "context". To speed up things, the block is only subtracted, if its
    // sensor space bounding box overlaps with that of the new block.
    _subtractRealBlock: function (realBlock, context) {
        if (this._boundingBoxesOverlap(realBlock)) {
            realBlock.subtract(context);
        }
    },

    // Subtracts the shapes of the real blocks in front of the block from the
    // drawing on the canvas with rendering context "context".
    _subtractRealBlocks: function (context) {
        var realBlocksSorted = this._constructionBlocks.realBlocksSorted(),
        i, realBlock, zB = this.zB();

        // Idea behind the following loop: the new block may be obscured by
        // blocks in a layer above or the same layer. Due to perspective
        // (camera always above construction), it will never be obscured by
        // blocks on the layer below.
        for (i = 0; i < realBlocksSorted.length; i += 1) {
            realBlock = realBlocksSorted[i];

            if (realBlock.zB() < zB) {
                break; // because all the following blocks are also below the
                       // new block
            } else if (realBlock.zB() === zB) {
                if (this._isObscuredBySLO(realBlock)) {
                    this._subtractRealBlock(realBlock, context);
                }
            } else if (realBlock.zB() > zB) {
                // Real blocks in a layer above always obscure real blocks in
                // the layer below, due to perspective.
                this._subtractRealBlock(realBlock, context);
            }
        }
    },

    // Updates the shadow, i.e. (re-)draws it or removes it.
    _renderShadow: function () {
        if (this.isMovable()) {
            this._shadow.render(this._shadowColor, this._shadowAlpha);
        } else {
            this._shadow.clear();
        }
    },

    // Returns true, iff there have been changes that make it necessary to
    // rerender this block.
    _needsToBeRendered: function () {
        var 
        coordinatesHaveChanged, constructionBlocksHaveChanged, 
        isStoppedStateHasChanged;

        coordinatesHaveChanged = this._coordinatesChangedAfterLastRendering;

        // Rerendering is necessary on construction block change, because they
        // may obscure part of the block and shadow, and are thus part of the
        // rendering:
        constructionBlocksHaveChanged = 
            (this._lastConstructionBlocksVersion !==
             this._constructionBlocks.versionOnServer());

        isStoppedStateHasChanged = (this._lastIsStopped !== this._isStopped);

        return coordinatesHaveChanged || constructionBlocksHaveChanged ||
            isStoppedStateHasChanged;
    },

    _onRendered: function () {
        this._coordinatesChangedAfterLastRendering = false;
        this._lastIsStopped = this._isStopped;
        this._lastConstructionBlocksVersion =
            this._constructionBlocks.versionOnServer();
    },

    // Draws the block with shadow on the sensor of the camera. Depends on the
    // vertexes in view coordinates. Only re-renders the new block when
    // necessary, i.e. when its sensor space projection has changed or when its
    // state has changed. The shadow is updated only when the sensor space
    // projection of the new block has changed, when the state of the new block
    // has changed, or when the construction blocks have changed.
    render: function () {
        var canvas, context, color;

        this._updateCoordinates();

        if (this._needsToBeRendered()) {
            canvas = this._camera.sensor().newBlockCanvas();
            if (canvas.getContext) {
                context = canvas.getContext('2d');
                color = this.isMovable() ? this._color : this._stoppedColor;

                // Shadow does currently not work with FlashCanvas.
                if (!com.realitybuilder.util.isFlashCanvasActive()) {
                    this._renderShadow();
                }

                com.realitybuilder.util.clearCanvas(canvas);
                this.inherited(arguments, [context, color]);

                // removes parts of the real block obscured by other blocks:
                this._subtractRealBlocks(context);
            }
            this._onRendered();
        }
    },

    // Called if storing the block as pending on the server succeeded.
    _createPendingOnServerSucceeded: function () {
        dojo.publish('com/realitybuilder/NewBlock/createdPendingOnServer');

        if (this._prerenderMode.isEnabled()) {
            setTimeout(dojo.hitch(this, this._makeRealPrerenderedOnServer), 
                       this._prerenderMode.makeRealAfter());
        }
    },

    // Adds this block to the list of blocks on the server, with state pending.
    _createPendingOnServer: function () {
        dojo.xhrPost({
            url: "/rpc/create_pending",
            content: {
                "xB": this.xB(),
                "yB": this.yB(),
                "zB": this.zB(),
                "a": this.a()
            },
            load: dojo.hitch(this, this._createPendingOnServerSucceeded)
        });
    },

    _makeRealPrerenderedOnServerSucceeded: function () {
        dojo.publish('com/realitybuilder/NewBlock/' + 
                     'madeRealPrerenderedOnServer');
    },

    // If this block together with the real blocks matches a prerendered block
    // configuration, then:
    //
    // * makes it real,
    //
    // * sets the background image to the prerendered one.
    //
    // Otherwise, just makes the block movable again.
    _makeRealPrerenderedOnServer: function () {
        var i, imageUrl, realBlocks;

        realBlocks = this._constructionBlocks.realBlocksSorted();
        i = this._prerenderMode.matchingBlockConfiguration(realBlocks, this);

        if (i !== false) {
            imageUrl = this._prerenderMode.imageUrl(i);
            dojo.xhrPost({
                url: "/rpc/make_real_prerendered",
                content: {
                    "xB": this.xB(),
                    "yB": this.yB(),
                    "zB": this.zB(),
                    "a": this.a(),
                    "imageUrl": this._prerenderMode.imageUrl(i)
                },
                load: dojo.hitch(this, 
                                 this._makeRealPrerenderedOnServerSucceeded)
            });
        } else {
            // this block and the real block don't match a prerendered
            // configuration
            this._makeMovable();
        }
    }
});

}

if(!dojo._hasResource['com.realitybuilder.Image']){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource['com.realitybuilder.Image'] = true;
// The live image, being updated regularly.

// Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('com.realitybuilder.Image');

dojo.declare('com.realitybuilder.Image', null, {
    // Version of data last retrieved from the server, or "-1" initially. Is a
    // string in order to be able to contain very large integers.
    _versionOnServer: '-1',

    // The URL that the server retrieves the image from (it then caches it):
    _url: '',

    // The duration of the intervals between the server retrieving a new image
    // from the url:
    _updateIntervalServer: 5, // s

    // Node object of the live image.
    _node: null,

    // Handle of the onload event connection.
    _onloadHandle: null,

    // True after the first image has been loaded.
    _imageLoaded: false,

    // Sets the dimensions of the image to those of the sensor of the camera
    // "camera" and starts the update cicle.
    constructor: function (camera) {
        this._node = dojo.byId('live');

        this._node.style.width = camera.sensor().width() + 'px';
        this._node.style.height = camera.sensor().height() + 'px';

        this._onloadHandle = dojo.connect(this._node, 'onload', 
                                          this, this._onFirstImageLoad);
    },

    imageLoaded: function () {
        return this._imageLoaded;
    },

    versionOnServer: function () {
        return this._versionOnServer;
    },

    url: function () {
        return this._url;
    },

    updateIntervalServer: function () {
        return this._updateIntervalServer;
    },

    // Updates the settings of the image to the version on the server, which is
    // described by "serverData".
    updateWithServerData: function (serverData) {
        this._versionOnServer = serverData.version;
        this._updateIntervalServer = serverData.updateIntervalServer;
        this._url = serverData.url;
        dojo.publish('com/realitybuilder/Image/changed');
    },

    // Called when an image has been loaded for the first time. Notes that in a
    // flag and stops listening to the onload event.
    _onFirstImageLoad: function () {
        this._imageLoaded = true;
        dojo.disconnect(this._onloadHandle);
    },

    // Updates the image.
    update: function () {
        this._node.src = 
            '/images/live.jpg?nocache=' + Math.random().toString();
    }
});

}

if(!dojo._hasResource['com.realitybuilder.Sensor']){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource['com.realitybuilder.Sensor'] = true;
// The sensor of the camera, displaying the live image plus objects on top of
// it.

// Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('com.realitybuilder.Sensor');

dojo.declare('com.realitybuilder.Sensor', null, {
    // Canvases for drawing various parts.
    _realBlocksCanvas: null,
    _pendingBlocksCanvas: null,
    _shadowCanvas: null,
    _newBlockCanvas: null,

    // Dimensions in pixels.
    _width: null,
    _height: null,

    // Sets up the sensor of the camera, with width "width" and height
    // "height".
    constructor: function (width, height) {
        this._realBlocksCanvas = dojo.byId('sensorRealBlocksCanvas');
        this._pendingBlocksCanvas = dojo.byId('sensorPendingBlocksCanvas');
        this._shadowCanvas = dojo.byId('sensorShadowCanvas');
        this._newBlockCanvas = dojo.byId('sensorNewBlockCanvas');

        this._width = width;
        this._height = height;

        this._setCanvasesDimensions();

        // Sets the dimensions of the surrounding container so that it can
        // float as desired:
        var viewNode = dojo.byId('view');
        viewNode.style.width = width + 'px';
        viewNode.style.height = height + 'px';
    },

    // Sets the dimensions of the canvases.
    _setCanvasesDimensions: function () {
        var canvases = [
                this._realBlocksCanvas, 
                this._pendingBlocksCanvas, 
                this._shadowCanvas, 
                this._newBlockCanvas],
            width = this._width, height = this._height;
        dojo.forEach(canvases, function (canvas) {
            dojo.attr(canvas, 'width', width);
            dojo.attr(canvas, 'height', height);
            dojo.style(canvas, 'width', width + 'px');
            dojo.style(canvas, 'height', height + 'px');
        });        
    },

    realBlocksCanvas: function () {
        return this._realBlocksCanvas;
    },

    pendingBlocksCanvas: function () {
        return this._pendingBlocksCanvas;
    },

    shadowCanvas: function () {
        return this._shadowCanvas;
    },

    newBlockCanvas: function () {
        return this._newBlockCanvas;
    },

    _setCanvasVisibility: function (canvas, show) {
        dojo.style(canvas, 'visibility', show ? 'visible' : 'hidden');
    },

    // Iff show is true, then shows the real blocks.
    showRealBlocks: function (show) {
        this._setCanvasVisibility(this._realBlocksCanvas, show);
    },

    // Iff show is true, then shows the pending blocks.
    showPendingBlocks: function (show) {
        this._setCanvasVisibility(this._pendingBlocksCanvas, show);
    },

    width: function () {
        return this._width;
    },

    height: function () {
        return this._height;
    }
});

}

if(!dojo._hasResource['com.realitybuilder.Camera']){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource['com.realitybuilder.Camera'] = true;
// A camera at position "x", "y", "z" looking along the direction defined by
// the angles "aZ", "aX". With the angles set to zero, the directions of the
// view space and the block space axes coincide: The camera looks along the
// positive z-direction, with the x-axis extending to the right and the y-axis
// extending to the bottom. Depending on position, the construction is either
// behind the camera, or the camera sees the construction from the bottom
// first.
//
// The camera (and, thus, view space) is rotated, first about the x-axis, then
// about the y-axis, and then about the z-axis, always relative to the current
// view space.
//
// The distance from the focal point to the sensor is the focal length "fl".
//
// The resolution of the camera sensor is 'sensorResolution' (px/mm).

// Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('com.realitybuilder.Camera');






dojo.declare('com.realitybuilder.Camera', null, {
    // Properties (shape, dimensions, etc.) of a block:
    _blockProperties: null,

    // Position of the camera in world space (mm):
    _position: null,

    // Angles defining orientation (rad):
    _aX: 0,
    _aY: 0,
    _aZ: 0,

    // Focal length (mm):
    _fl: 1,

    // Sensor resolution (px/mm) and dimensions (px):
    _sensorResolution: 100,

    // Rotation matrices.
    _rZ: null,
    _rX: null,
    _rZYX: null, // rotation about X, then Y, then Z

    // Sensor of the camera:
    _sensor: null,
    
    // Version of data last retrieved from the server, or "-1" initially. Is a
    // string in order to be able to contain very large integers.
    _versionOnServer: '-1',

    // Identifier of the camera settings. It is a random string that is updated
    // on every change of camera settings, not only on those on the server.
    _id: null,

    constructor: function (blockProperties, sensorWidth, sensorHeight) {
        this._blockProperties = blockProperties;
        this._position = [0, 0, 1];
        this._sensor = 
            new com.realitybuilder.Sensor(sensorWidth, sensorHeight);
        this._updateRotationMatrices();
        
    },

    _updateId: function () {
        this._id = Math.random().toString();
    },

    sensor: function () {
        return this._sensor;
    },

    versionOnServer: function () {
        return this._versionOnServer;
    },

    // Returns false when the object is new and has not yet been updated with
    // server data.
    isInitializedWithServerData: function () {
        return this._versionOnServer !== '-1';
    },

    position: function () {
        return this._position;
    },

    aX: function () {
        return this._aX;
    },

    aY: function () {
        return this._aY;
    },

    aZ: function () {
        return this._aZ;
    },

    fl: function () {
        return this._fl;
    },

    sensorResolution: function () {
        return this._sensorResolution;
    },

    id: function () {
        return this._id;
    },

    // Updates the settings of the camera using the "data" which is a subset of
    // the data that also the server delivers.
    update: function (data) {
        this._position = data.position;
        this._aX = data.aX;
        this._aY = data.aY;
        this._aZ = data.aZ;
        this._fl = data.fl;
        this._sensorResolution = data.sensorResolution;
        this._updateRotationMatrices();
        this._updateId();

        dojo.publish('com/realitybuilder/Camera/changed');
    },

    // Updates the settings of the camera to the version on the server, which
    // is described by "serverData".
    updateWithServerData: function (serverData) {
        this._versionOnServer = serverData.version;
        this.update(serverData);
    },

    // Updates matrices describing the rotation of the camera. Should be called
    // every time the rotation angles have been changed.
    _updateRotationMatrices: function () {
        var rYX;

        // Matrices are for rotating view space points, and that rotation is in
        // the oposite direction as that of the camera, which is rotated
        // counterclockwise. Therefore the matrices rotate clockwise.
        this._rX = [
            [1, 0, 0], 
            [0, Math.cos(-this._aX), Math.sin(-this._aX)], 
            [0, -Math.sin(-this._aX), Math.cos(-this._aX)]];
        this._rY = [
            [Math.cos(-this._aY), 0, Math.sin(-this._aY)], 
            [0, 1, 0], 
            [-Math.sin(-this._aY), 0, Math.cos(-this._aY)]];
        this._rZ = [
            [Math.cos(-this._aZ), Math.sin(-this._aZ), 0],
            [-Math.sin(-this._aZ), Math.cos(-this._aZ), 0],
            [0, 0, 1]];
        rYX = dojox.math.matrix.multiply(this._rY, this._rX);
        this._rZYX = dojox.math.matrix.multiply(this._rZ, rYX);
    },

    // Returns the coordinates of the world space point "point" in view space.
    worldToView: function (point) {
        var tmp = com.realitybuilder.util.subtractVectors3D(point, 
                                                            this._position);

        // Rotation matrices are applied to the vector tmp, from the left side:
        tmp = dojox.math.matrix.transpose([tmp]);
        tmp = dojox.math.matrix.multiply(this._rZYX, tmp);
        tmp = dojox.math.matrix.transpose(tmp)[0];

        return tmp;
    },

    // Scale of distances parallel to the screen at view space position "zV",
    // when projected to the screen.
    scale: function (zV) {
        return this._sensorResolution * this._fl / zV; // px / mm
    }, 

    // Returns the coordinates of the view space point "pointV" in sensor
    // space.
    viewToSensor: function (pointV) {
        var xV = pointV[0], yV = pointV[1], zV = pointV[2], scale;

        // Projection on sensor:
        scale = this.scale(zV);
        xV *= scale; // px
        yV *= scale; // px
    
        // Puts camera position (and, thus, vanishing point) in the center of
        // the sensor:
        xV += this._sensor.width() / 2;
        yV += this._sensor.height() / 2;

        return [xV, yV];
    },

    // Returns the coordinates of the block space point "pointB" in sensor
    // space.
    blockToSensor: function (pointB) {
        return this.viewToSensor(this.worldToView(
            com.realitybuilder.util.blockToWorld(pointB, 
                                                 this._blockProperties)));
    }
});

}

if(!dojo._hasResource['com.realitybuilder.AdminControls']){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource['com.realitybuilder.AdminControls'] = true;
// Admin interface.

// Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('com.realitybuilder.AdminControls');



dojo.declare('com.realitybuilder.AdminControls', null, {
    // The construction that the admin controls are associated with.
    _construction: null,

    // Creates the admin interface associated with the construction
    // "construction".
    constructor: function (construction) {
        this._construction = construction;

        dojo.byId('bottomBar').style.width = 
            construction.camera().sensor().width() + 'px';

        this.updateToggleRealButton();
        this.updateTogglePendingButton();

        dojo.connect(dojo.byId('saveSettingsButton'), 'onclick', 
            this._construction, this._construction.storeSettingsOnServer);
        dojo.connect(dojo.byId('previewCameraButton'), 'onclick', 
            this, this.updateCamera);

        dojo.connect(dojo.byId('toggleRealButton'), 'onclick', 
            this._construction, this._construction.toggleReal);
        dojo.connect(dojo.byId('togglePendingButton'), 'onclick', 
            this._construction, this._construction.togglePending);

        dojo.connect(dojo.byId('logoutButton'), 'onclick', this, this.logOut);
    },

    // Logs the administrator out, sending him back to the login screen.
    logOut: function () {
        location.href = logoutUrl;
    },

    updateToggleRealButton: function () {
        dojo.byId('toggleRealButton').innerHTML = 
            (this._construction.showReal() ? "Hide" : "Show") + " Real Blocks";
    },

    updateTogglePendingButton: function () {
        dojo.byId('togglePendingButton').innerHTML = 
            (this._construction.showPending() ? "Hide" : "Show") + 
            " Pending Blocks";
    },

    // Updates controls defining the camera "camera".
    updateCameraControls: function (camera) {
        var position = camera.position();
        dojo.byId('cameraX').value = position[0];
        dojo.byId('cameraY').value = position[1];
        dojo.byId('cameraZ').value = position[2];
        dojo.byId('cameraAX').value = camera.aX();
        dojo.byId('cameraAY').value = camera.aY();
        dojo.byId('cameraAZ').value = camera.aZ();
        dojo.byId('cameraFl').value = camera.fl();
        dojo.byId('cameraSensorResolution').value = camera.sensorResolution();
    },

    updateImageControls: function (image) {
        dojo.byId('imageURL').value = image.url();
        dojo.byId('imageUpdateIntervalServer').value = 
            image.updateIntervalServer();
    },

    // Returns data describing the image settings in a format that is a subset
    // of that used for exchanging image data with the server.
    readImageControls: function () {
        var data = {
            'url': dojo.byId('imageURL').value || '',
            'updateIntervalServer': 
                parseFloat(dojo.byId('imageUpdateIntervalServer').value) || 5};
        return data;
    },

    // Returns data describing the camera settings in a format that is a subset
    // of that used for exchanging camera data with the server.
    readCameraControls: function () {
        var data = {
            "position": [parseFloat(dojo.byId('cameraX').value) || 0,
                         parseFloat(dojo.byId('cameraY').value) || 0,
                         parseFloat(dojo.byId('cameraZ').value) || 0],
            "aX": parseFloat(dojo.byId('cameraAX').value) || 0,
            "aY": parseFloat(dojo.byId('cameraAY').value) || 0,
            "aZ": parseFloat(dojo.byId('cameraAZ').value) || 0,
            "fl": parseFloat(dojo.byId('cameraFl').value) || 1,
            "sensorResolution": 
                parseFloat(dojo.byId('cameraSensorResolution').value) || 100};
        return data;
    },

    // Updates the camera, reading data from the camera controls.
    updateCamera: function () {
        this._construction.camera().update(this.readCameraControls());
    },

    updateCoordinateDisplays: function () {
        var positionB, a;

        positionB = this._construction.newBlock().positionB();
        a = this._construction.newBlock().a();

        dojo.byId('newBlockXB').innerHTML = positionB[0].toString();
        dojo.byId('newBlockYB').innerHTML = positionB[1].toString();
        dojo.byId('newBlockZB').innerHTML = positionB[2].toString();
        dojo.byId('newBlockA').innerHTML = a.toString();
    },

    // Sorting function for sorting blocks for display in the table.
    _sortForTable: function (x, y) {
        // Sorts first by state (pending < real < deleted), and then by
        // date-time.
        if (x.state() === y.state()) {
            // state the same => sort by date-time
            if (x.timeStamp() > y.timeStamp()) {
                return -1;
            } else if (x.timeStamp() < y.timeStamp()) {
                return 1;
            } else {
                return 0;
            }
        } else if (x.state() === 1) {
            return -1;
        } else if (x.state() === 2) {
            return y.state() === 1 ? 1 : -1;
        } else {
            return 1;
        }
    },

    // Returns the list of all blocks, except the new block, sorted for display
    // in the table.
    _blocksSortedForTable: function () {
        // The blocks array is copied since the original array should not be
        // changed.
        var tmp = dojo.map(this._construction.constructionBlocks().blocks(),
            function (block) {
                return block;
            });
        tmp.sort(this._sortForTable);
        return tmp;
    },

    // Reads the value of the state selector "select" associated with the block
    // "block" and triggers setting of the state.
    _applyStateFromStateSelector: function (select, block) {
        this._construction.constructionBlocks().
            setBlockStateOnServer(block.positionB(), block.a(),
                                  parseInt(select.value, 10));
    },

    // Returns a node representing a select button for the state of the block
    // "block", with the state of that block preselected.
    _stateSelector: function (block) {
        var select = document.createElement('select'),
            stateNames = ['Deleted', 'Pending', 'Real'],
            state, stateName, option;
        dojo.attr(select, 'size', 1);
        for (state = 0; state < 3; state += 1) {
            stateName = stateNames[state];
            option = document.createElement('option');
            dojo.attr(option, 'value', state);
            if (state === block.state()) {
                dojo.attr(option, 'selected', '');
            }
            option.innerHTML = stateName;
            select.appendChild(option);
        }

        dojo.connect(select, 'onchange', this, function (event) {
            this._applyStateFromStateSelector(select, block);
        });
        
        return select;
    },

    // Adds a row for the block "block" to the table body "tableBody"
    // displaying the list of blocks.
    _appendBlocksTableRow: function (block, tableBody) {
        var positionB, row, date, dateTimeFormatted, rowValues, cell;

        positionB = block.positionB();
        row = document.createElement('tr');
        date = new Date(block.timeStamp() * 1000);
        dateTimeFormatted = 
            dojox.date.posix.strftime(date, '%Y-%m-%d %H:%M:%S');
        rowValues = [
            positionB[0], positionB[1], positionB[2], block.a(), 
            dateTimeFormatted, this._stateSelector(block)];

        dojo.forEach(rowValues, function (rowValue, i) {
            cell = document.createElement('td');
            if (i < 5) {
                cell.innerHTML = rowValue;
            } else {
                cell.appendChild(rowValue);
            }
            if (i < 4) {
                dojo.addClass(cell, 'number');
            }
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    },

    // Refreshes the table displaying the list of blocks.
    updateBlocksTable: function () {
        var matches = dojo.query('#blocksTable tbody'),
            tableBody = matches[0],
            blocks = this._blocksSortedForTable(),
            that = this;
        dojo.empty(tableBody);
        dojo.forEach(blocks, function (block) {
            that._appendBlocksTableRow(block, tableBody);
        });
    }
});

}

if(!dojo._hasResource['com.realitybuilder.ControlButton']){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource['com.realitybuilder.ControlButton'] = true;
// Button in the control panel for moving and positioning the new block.

// Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('com.realitybuilder.ControlButton');

dojo.declare('com.realitybuilder.ControlButton', null, {
    // Function that's called when button is clicked:
    _onClicked: null,

    // Function that's called to check whether button should be enabled:
    _shouldBeEnabled: null,

    // Status of the button:
    _isEnabled: false,

    // Node object representing the button.
    _node: null,

    // Creates a control button associated with the ID "id". When the button is
    // clicked, then calls the function "onClicked". To decide whether the
    // button should be enabled, executes the function "shouldBeEnabled".
    constructor: function (id, onClicked, shouldBeEnabled) { 
        this._onClicked = onClicked;
        this._shouldBeEnabled = shouldBeEnabled;

        this._node = dojo.byId(id);

        dojo.connect(this._node, 'onclick', this, this._onClicked2);
        dojo.connect(this._node, 'onmouseover', this, this._onMouseOver);
        dojo.connect(this._node, 'onmouseout', this, this._onMouseOut);
    },

    _onMouseOver: function () {
        if (this._isEnabled) {
            dojo.addClass(this._node, 'hover');
        }
    },

    _onMouseOut: function () {
        dojo.removeClass(this._node, 'hover');
    },

    _onClicked2: function () {
        if (this._isEnabled) {
            this._onClicked();
        }
    },

    // Updates the enabled status of the button.
    update: function () {
        this._isEnabled = this._shouldBeEnabled();

        if (!this._isEnabled) {
            this._onMouseOut(); // necessary if mouse cursor is still over
                                // button
            dojo.addClass(this._node, 'disabled');
        } else {
            dojo.removeClass(this._node, 'disabled');
        }
    }
});

}

if(!dojo._hasResource['com.realitybuilder.ControlPanel']){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource['com.realitybuilder.ControlPanel'] = true;
// Control panel for moving and positioning the new block.

// Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('com.realitybuilder.ControlPanel');



dojo.declare('com.realitybuilder.ControlPanel', null, {
    // New block that the control panel is associated with.
    _newBlock: null,

    // Buttons:
    _buttons: null,

    // Node object representing the panel.
    _node: null,

    // Creates control panel for the block "newBlock".
    constructor: function (newBlock) { 
        var rb, nb, buttons;

        this._newBlock = newBlock;

        this._node = dojo.byId('controlPanel');

        rb = com.realitybuilder;
        nb = newBlock;

        buttons = [];
        buttons.push(this._createCoordinateButton('incX', [1, 0, 0]));
        buttons.push(this._createCoordinateButton('decX', [-1, 0, 0]));
        buttons.push(this._createCoordinateButton('incY', [0, 1, 0]));
        buttons.push(this._createCoordinateButton('decY', [0, -1, 0]));
        buttons.push(this._createCoordinateButton('incZ', [0, 0, 1]));
        buttons.push(this._createCoordinateButton('decZ', [0, 0, -1]));
        buttons.push(this._createRotate90Button());
        buttons.push(this._createRequestRealButton());
        this._buttons = buttons;
    },

    _createCoordinateButton: function (type, deltaB) {
        var newBlock, onClicked, shouldBeEnabled;

        newBlock = this._newBlock;

        onClicked = function () {
            newBlock.move(deltaB);
        };

        shouldBeEnabled = function () {
            return (!newBlock.wouldGoOutOfRange(deltaB, 0) &&
                    newBlock.isMovable());
        };

        return new com.realitybuilder.ControlButton(type + 'Button', 
                                                    onClicked, 
                                                    shouldBeEnabled);
    },

    _createRotate90Button: function () {
        var newBlock, onClicked, shouldBeEnabled;

        newBlock = this._newBlock;

        onClicked = function () {
            newBlock.rotate90();
        };

        shouldBeEnabled = function () {
            return (!newBlock.wouldGoOutOfRange([0, 0, 0], 1) &&
                    newBlock.isRotatable());
        };

        return new com.realitybuilder.ControlButton('rotate90Button', 
                                                    onClicked, 
                                                    shouldBeEnabled);
    },

    _createRequestRealButton: function () {
        var newBlock, onClicked, shouldBeEnabled;

        newBlock = this._newBlock;

        onClicked = function () {
            newBlock.requestMakeReal();
        };

        shouldBeEnabled = function () {
            return newBlock.canBeMadeReal() && !newBlock.isStopped();
        };

        return new com.realitybuilder.ControlButton('requestRealButton', 
                                                    onClicked, 
                                                    shouldBeEnabled);
    },

    // Updates the status of the buttons and that of the panel itself:
    update: function () {
        dojo.forEach(this._buttons, function (button) {
            button.update();
        });

        if (this._newBlock.isStopped()) {
            dojo.addClass(this._node, 'disabled');
        } else {
            dojo.removeClass(this._node, 'disabled');
        }
    }
});

}

if(!dojo._hasResource['com.realitybuilder.PrerenderMode']){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource['com.realitybuilder.PrerenderMode'] = true;
// Configuration for prerender-mode, if enabled.

// Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('com.realitybuilder.PrerenderMode');

dojo.declare('com.realitybuilder.PrerenderMode', null, {
    // Version of data last retrieved from the server, or "-1" initially. Is a
    // string in order to be able to contain very large integers.
    _versionOnServer: '-1',

    // With prerender-mode enabled, a block is automatically made real after
    // "_makeRealAfter" milliseconds, and if the total construction would
    // afterwards match one of the block configurations in the list
    // "_blockConfigurations". Associated with each block configuration is an
    // image, the URL of which is constructed using the template
    // "imageUrlTemplate": %d is substituted with the block configuration
    // number. This number is identical to the corresponding index in the array
    // with the block configurations.
    _isEnabled: null,
    _makeRealAfter: null, // ms
    _blockConfigurations: null, // [[xB, yB, zB, a], [xB, ...
    _imageUrlTemplate: null,

    versionOnServer: function () {
        return this._versionOnServer;
    },

    // Returns false when the object is new and has not yet been updated with
    // server data.
    isInitializedWithServerData: function () {
        return this._versionOnServer !== '-1';
    },

    // Updates the settings of the camera to the version on the server, which
    // is described by "serverData".
    updateWithServerData: function (serverData) {
        this._versionOnServer = serverData.version;
        this._isEnabled = serverData.isEnabled;
        this._makeRealAfter = serverData.makeRealAfter;
        this._blockConfigurations = serverData.blockConfigurations;
        this._imageUrlTemplate = serverData.imageUrlTemplate;

        dojo.publish('com/realitybuilder/PrerenderMode/changed');
    },

    isEnabled: function () {
        return this._isEnabled;
    },

    makeRealAfter: function () {
        return this._makeRealAfter;
    },

    _blockConfigurationSetKey: function (block) {
        return block.xB() + ',' + block.yB() + ',' + block.zB() + ',' +
            block.a();
    },

    // Returns a set describing the block configuration comprised of the real
    // blocks "realBlocks" and the block "newBlock". The keys in the set have
    // the format "xB,yB,zB,a".
    _blockConfigurationSet: function (realBlocks, newBlock) {
        var set = {}, setKey = this._blockConfigurationSetKey;

        dojo.forEach(realBlocks, function (realBlock) {
            set[setKey(realBlock)] = true;
        });

        set[setKey(newBlock)] = true;

        return set;
    },

    _setIsEmpty: function (set) {
        var key;

        for (key in set) {
            if (set.hasOwnProperty(key)) {
                return false;
            }
        }

        return true;
    },

    // Returns true, iff the real blocks "realBlock" plus the block "newBlock"
    // form the same block configuration as described in "blockConfigurations".
    _blockConfigurationMatches: function (blockConfiguration, 
                                          realBlocks, newBlock)
    {
        var blockConfigurationSet, i, item, key;

        blockConfigurationSet = this._blockConfigurationSet(realBlocks, 
                                                            newBlock);

        for (i = 0; i < blockConfiguration.length; i += 1) {
            item = blockConfiguration[i];
            key = item[0] + ',' + item[1] + ',' + item[2] + ',' + item[3];
            if (typeof blockConfigurationSet[key] === 'undefined') {
                return false;
            } else {
                delete blockConfigurationSet[key];
            }
        }

        return this._setIsEmpty(blockConfigurationSet);
    },

    // Iff there is a prerendered block configuration that matches the block
    // configuration described by the real blocks "realBlocks" and the new
    // block "newBlock", then returns the index of that configuration.
    //
    // Otherwise returns false.
    matchingBlockConfiguration: function (realBlocks, newBlock) {
        var i, blockConfiguration;

        for (i = 0; i < this._blockConfigurations.length; i += 1) {
            blockConfiguration = this._blockConfigurations[i];
            if (this._blockConfigurationMatches(blockConfiguration, 
                                                realBlocks, newBlock)) {
                return i;
            }
        }
        return false; // no prerendered configuration matches
    },

    // Returns the image URL of the image for the block configuration with the
    // index "i".
    imageUrl: function (i) {
        return this._imageUrlTemplate.replace('%d', i);
    }
});

}

if(!dojo._hasResource['com.realitybuilder.Construction']){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource['com.realitybuilder.Construction'] = true;
// The construction and the controls.

// Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('com.realitybuilder.Construction');













dojo.declare('com.realitybuilder.Construction', null, {
    // True, iff admin controls should be shown:
    _showAdminControls: null,

    // All blocks, permanently in the construction, including real and pending
    // blocks:
    _constructionBlocks: null,

    // The interval in between checks whether the web page has finished loading
    // can can be shown.
    _CHECK_IF_HAS_LOADED_INTERVAL: 500, // ms

    // True, iff real/pending blocks should be shown. By default, always
    // enabled if the admin controls are shown. With only the user controls
    // shown, by default disabled.
    _showReal: null,
    _showPending: null,

    // Properties (shape, dimensions, etc.) of a block:
    _blockProperties: null,

    // Properties of a construction block:
    _constructionBlockProperties: null,

    // Prerender-mode:
    _prerenderMode: null,

    // The new block that the user is supposed to position. Could move once the
    // real blocks are loaded, if there are any intersections.
    _newBlock: null,

    // The camera, whose sensor is shown.
    _camera: null,

    // The live image.
    _image: null,

    // The control panel for moving around the block and requesting it to be
    // made real:
    _controlPanel: null,

    // Controls for changing and inspecting settings and the construction.
    _adminControls: null,

    // Handle for the timeout between requests to the server for new
    // construction data.
    _updateTimeout: null,

    // Creates a construction. Iff "showAdminControls" is true, then the admin
    // controls are shown, and - in the rendering - the real and pending
    // blocks.
    constructor: function (showAdminControls) {
        var rb = com.realitybuilder;

        this._insertLoadIndicator();

        this._showAdminControls = showAdminControls;
        this._showReal = showAdminControls;
        this._showPending = showAdminControls;

        this._blockProperties = new rb.BlockProperties();
        this._constructionBlockProperties = 
            new rb.ConstructionBlockProperties();
        this._camera = new rb.Camera(this._blockProperties, 640, 480);
        this._image = new rb.Image(this._camera);
        this._constructionBlocks = 
            new rb.ConstructionBlocks(this, 
                                      this._blockProperties,
                                      this._constructionBlockProperties);
        this._prerenderMode = new rb.PrerenderMode();
        this._newBlock = 
            new rb.NewBlock(this._blockProperties,
                                            this._camera,
                                            this._constructionBlocks,
                                            this._prerenderMode);
        this._controlPanel = 
            new rb.ControlPanel(this._newBlock);

        if (this._showAdminControls) {
            this._adminControls = new rb.AdminControls(this);

            // When an attempt to change construction block data on the server
            // failed, then the relavant admin controls may have to be brought
            // back up to date. Reason: They may have been changed before, by
            // user selection.
            dojo.subscribe(
                'com/realitybuilder/ConstructionBlocks/changeOnServerFailed', 
                this._adminControls, this._adminControls.updateBlocksTable);
        }

        dojo.subscribe('com/realitybuilder/ConstructionBlocks/changedOnServer', 
                       this, this._update); // Speeds up responsiveness.
        dojo.subscribe('com/realitybuilder/NewBlock/' + 
                       'madeRealPrerenderedOnServer', 
                       this, this._update); // Speeds up responsiveness.
        dojo.subscribe('com/realitybuilder/NewBlock/createdPendingOnServer', 
                       this, this._update); // Speeds up responsiveness.
        dojo.subscribe('com/realitybuilder/NewBlock/' + 
                       'positionAngleInitialized', 
                       this, this._onNewBlockPositionAngleInitialized);
        dojo.subscribe('com/realitybuilder/NewBlock/buildOrMoveSpaceChanged', 
                       this, this._onMoveOrBuildSpaceChanged);
        dojo.subscribe('com/realitybuilder/NewBlock/stopped', 
                       this, this._onNewBlockStopped);
        dojo.subscribe('com/realitybuilder/NewBlock/madeMovable', 
                       this, this._onNewBlockMadeMovable);
        dojo.subscribe('com/realitybuilder/NewBlock/movedOrRotated',
                       this, this._onNewBlockMovedOrRotated);
        dojo.subscribe('com/realitybuilder/NewBlock/' + 
                       'onNewBlockMakeRealRequested',
                       this, this._onNewBlockMakeRealRequested);
        dojo.subscribe('com/realitybuilder/ConstructionBlocks/changed',
                       this, this._onConstructionBlocksChanged);
        dojo.subscribe('com/realitybuilder/Camera/changed',
                       this, this._onCameraChanged);
        dojo.subscribe('com/realitybuilder/Image/changed',
                       this, this._onImageChanged);
        dojo.subscribe('com/realitybuilder/BlockProperties/changed',
                       this, this._onBlockPropertiesChanged);
        dojo.subscribe('com/realitybuilder/ConstructionBlockProperties/changed',
                       this, this._onConstructionBlockPropertiesChanged);
        dojo.subscribe('com/realitybuilder/PrerenderMode/changed',
                       this, this._onPrerenderModeChanged);

        dojo.connect(null, "onkeypress", dojo.hitch(this, this._onKeyPress));

        this._update();
        this._checkIfHasLoaded();
    },

    newBlock: function () {
        return this._newBlock;
    },

    camera: function () {
        return this._camera;
    },

    showPending: function () {
        return this._showPending;
    },

    showReal: function () {
        return this._showReal;
    },

    constructionBlocks: function () {
        return this._constructionBlocks;
    },

    // Called after the new block has been stopped.
    _onNewBlockStopped: function () {
        this._newBlock.render(); // color changes
        this._controlPanel.update();
    },

    // Called after the new block has been made movable.
    _onNewBlockMadeMovable: function () {
        this._newBlock.render(); // color changes
        this._controlPanel.update();
    },

    // Called after the block was requested to be made real.
    _onNewBlockMakeRealRequested: function () {
        this._controlPanel.update();
    },

    // Toggles display of real blocks.
    toggleReal: function () {
        this._showReal = !this._showReal;
        this._camera.sensor().showRealBlocks(this._showReal);
        this._adminControls.updateToggleRealButton();
    },

    // Toggles display of pending blocks.
    togglePending: function () {
        this._showPending = !this._showPending;
        this._camera.sensor().showPendingBlocks(this._showPending);
        this._adminControls.updateTogglePendingButton();
    },

    // Handles keys events.
    _onKeyPress: function (event) {
        var constructionBlocks, newBlock;

        newBlock = this._newBlock;

        if (event.keyCode === 109) { // m
            // For demoing the Reality Builder:
            //
            // Makes the block at the position of the new block real on the
            // server. This only works if there is a block at that position in
            // the list of construction blocks, and if the user is logged in as
            // administrator.
            constructionBlocks = this._constructionBlocks;
            constructionBlocks.setBlockStateOnServer(newBlock.positionB(), 
                                                     newBlock.a(), 2);
        }
    },

    // Called after the new block has been moved or rotated. Lets it redraw and
    // updates controls.
    _onNewBlockMovedOrRotated: function () {
        this._newBlock.render();
        this._controlPanel.update();
        if (this._showAdminControls) {
            this._adminControls.updateCoordinateDisplays();
        }
    },

    // (Re-)renders blocks, but only if all necessary components have been
    // initialized, which is relevant only in the beginning.
    _renderBlocksIfFullyInitialized: function () {
        if (this._constructionBlocks.isInitializedWithServerData() &&
            this._newBlock.isInitializedWithServerData() &&
            this._camera.isInitializedWithServerData() &&
            this._blockProperties.isInitializedWithServerData() &&
            this._constructionBlockProperties.isInitializedWithServerData()) {
            if (this._showAdminControls) {
                this._constructionBlocks.render();
            }
            this._newBlock.render();
        }
    },

    // Updates the state (including position) of the new block (and related
    // controls), but only if all necessary components have been initialized,
    // which is relevant only in the beginning.
    _updateNewBlockStateIfFullyInitialized: function () {
        if (this._constructionBlocks.isInitializedWithServerData() &&
            this._newBlock.isInitializedWithServerData() &&
            this._blockProperties.isInitializedWithServerData() &&
            this._prerenderMode.isInitializedWithServerData()) {
            this._newBlock.updatePositionAndMovability();
            this._controlPanel.update();

            if (this._showAdminControls) {
                // Necessary after updating the block position:
                this._adminControls.updateCoordinateDisplays();
            }
        }
    },

    // Called after the construction blocks have changed.
    _onConstructionBlocksChanged: function () {
        if (this._showAdminControls) {
            this._adminControls.updateBlocksTable();
        }

        this._updateNewBlockStateIfFullyInitialized();
        this._renderBlocksIfFullyInitialized();
    },

    // Called after the camera settings have changed.
    _onCameraChanged: function () {
        if (this._showAdminControls) {
            this._adminControls.updateCameraControls(this._camera);
        }

        this._renderBlocksIfFullyInitialized();
    },

    // Called after the new block's position, rotation angle have been
    // initialized.
    _onNewBlockPositionAngleInitialized: function () {
        this._updateNewBlockStateIfFullyInitialized();
        this._renderBlocksIfFullyInitialized();
    },

    // Called after the dimensions of the space where the new block may be
    // moved or built have been changed.
    _onMoveOrBuildSpaceChanged: function () {
        this._updateNewBlockStateIfFullyInitialized();
        this._renderBlocksIfFullyInitialized();
    },

    // Called after the block properties have changed.
    _onBlockPropertiesChanged: function () {
        // Updates the state (and related controls) of the new block, because
        // they depend on block properties such as collision settings:
        this._updateNewBlockStateIfFullyInitialized();

        this._renderBlocksIfFullyInitialized();
    },

    // Called after the block properties have changed.
    _onConstructionBlockPropertiesChanged: function () {
        this._renderBlocksIfFullyInitialized();
    },

    _onPrerenderModeChanged: function () {
        this._updateNewBlockStateIfFullyInitialized();
    },

    // Called after settings describing the live image have changed.
    _onImageChanged: function () {
        if (this._showAdminControls) {
            this._adminControls.updateImageControls(this._image);
        }
    },

    _insertLoadIndicator: function () {
        dojo.attr('loadIndicator', 'innerHTML', 'Loading...');
    },

    // Regularly checks if the construction has been loaded, so that the
    // content on the web page can be unhidden.
    _checkIfHasLoaded: function () {
        if (this._constructionBlocks.isInitializedWithServerData() &&
            this._camera.isInitializedWithServerData() &&
            this._blockProperties.isInitializedWithServerData() &&
            this._constructionBlockProperties.isInitializedWithServerData() &&
            this._image.imageLoaded()) {
            // Shows the contents and removes the load indicator.
            dojo.destroy(dojo.byId('loadIndicator'));
            this._unhideContent();
        } else {
            // Schedules the next check.
            setTimeout(dojo.hitch(this, this._checkIfHasLoaded), 
                this._CHECK_IF_HAS_LOADED_INTERVAL);
        }
    },

    // Second step of the construction update process.
    //
    // Updates client data with server data, but only where there have been
    // changes. Note that update of certain client data may trigger a redraw of
    // blocks and/or controls.
    //
    // Finally, sets timeout after which a new check for an update is
    // performed.
    _updateSucceeded: function (data, ioargs) {
        var that = this;

        if (data.blocksData.changed) {
            this._constructionBlocks.updateWithServerData(data.blocksData, 
                                                          this._image);
        }

        if (data.prerenderModeData.changed) {
            this._prerenderMode.updateWithServerData(data.prerenderModeData);
        }

        if (data.cameraData.changed) {
            this._camera.updateWithServerData(data.cameraData);
        }

        if (data.imageData.changed) {
            this._image.updateWithServerData(data.imageData);
        }

        if (data.blockPropertiesData.changed) {
            this._blockProperties.
                updateWithServerData(data.blockPropertiesData);
        }

        if (data.constructionBlockPropertiesData.changed) {
            this._constructionBlockProperties.
                updateWithServerData(data.constructionBlockPropertiesData);
        }

        if (data.newBlockData.changed) {
            this._newBlock.updateWithServerData(data.newBlockData);
        }

        if (this._updateTimeout) {
            // Clears the last timeout. May be necessary if the call to the
            // function has not been triggered by that timeout. Without
            // clearing the timeout, it may happen that two "timeout chains"
            // run concurrently.
            clearTimeout(this._updateTimeout);
        }
        this._updateTimeout = 
            setTimeout(function () {
                that._update();
            }, data.updateIntervalClient);
    },

    // Triggers an update of the construction with the data stored on the
    // server. Only updates data where there is a new version. Fails silently
    // on error.
    //
    // Also updates the background image.
    _update: function () {
        dojo.xhrGet({
            url: "/rpc/construction",
            content: {
                "blocksDataVersion": 
                this._constructionBlocks.versionOnServer(),
                "cameraDataVersion": this._camera.versionOnServer(),
                "imageDataVersion": this._image.versionOnServer(),
                "blockPropertiesDataVersion": 
                this._blockProperties.versionOnServer(),
                "constructionBlockPropertiesDataVersion": 
                this._constructionBlockProperties.versionOnServer(),
                "newBlockDataVersion": this._newBlock.versionOnServer(),
                "prerenderModeDataVersion": 
                this._prerenderMode.versionOnServer()
            },
            handleAs: "json",
            load: dojo.hitch(this, this._updateSucceeded)
        });

        this._image.update();
    },

    // Unhides the content. Fades in the content, unless the browser is Internet
    // Explorer version 8 or earlier.
    _unhideContent: function () {
        var contentNode = dojo.byId('content'),
            doFadeIn = (!dojo.isIE || dojo.isIE > 8),
            fadeSettings;

        if (doFadeIn) {
            dojo.style(contentNode, 'opacity', '0');
        }

        dojo.style(contentNode, 'width', 'auto');
        dojo.style(contentNode, 'height', 'auto');
        if (dojo.isIE && dojo.isIE <= 7) {
            // Necessary since otherwise IE 6 doesn't redraw after updating the
            // dimensions, and IE 7 may otherwise not show the background
            // image.
            dojo.style(contentNode, 'zoom', '1');
        }

        if (doFadeIn) {
            fadeSettings = {node: contentNode, duration: 1000};
            dojo.fadeIn(fadeSettings).play();
        }
    },

    // Called if updating the camera and live image settings on the server
    // succeeded. Triggers retrieval of the latest settings from the server,
    // which would happen anyhow sooner or later, since the version of the
    // settings has changed.
    _storeSettingsOnServerSucceeded: function () {
        this._update(); // Will check for new settings.
    },

    // Updates the camera and live image settings on the server. Fails silently
    // on error.
    storeSettingsOnServer: function () {
        var imageData, cameraData, content, util;

        util = com.realitybuilder.util;

        imageData = util.addPrefix('image.', 
                                   this._adminControls.readImageControls());
        cameraData = util.addPrefix('camera.', 
                                    this._adminControls.readCameraControls());
        cameraData['camera.x'] = cameraData['camera.position'][0];
        cameraData['camera.y'] = cameraData['camera.position'][1];
        cameraData['camera.z'] = cameraData['camera.position'][2];
        content = {};

        dojo.mixin(content, imageData, cameraData);
        dojo.xhrPost({
            url: "/admin/rpc/update_settings",
            content: content,
            load: dojo.hitch(this, this._storeSettingsOnServerSucceeded)
        });
    }
});

}


dojo.i18n._preloadLocalizations("dojo.nls.realitybuilder", ["ROOT","ar","ca","cs","da","de","de-de","el","en","en-gb","en-us","es","es-es","fi","fi-fi","fr","fr-fr","he","he-il","hu","it","it-it","ja","ja-jp","ko","ko-kr","nb","nl","nl-nl","pl","pt","pt-br","pt-pt","ru","sk","sl","sv","th","tr","xx","zh","zh-cn","zh-tw"]);
