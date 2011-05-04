// This code was taken from <url:http://www.mawhorter.net/projects/facelift-pro
// jects/detecting-if-images-are-disabled-css-on-images-off-scenario>, on
// 2010-Jul-23 CET. And a modification has been made - see below - because:
//
// * The original image tag is XHTML instead of HTML.
//
// * Adding the code directly to the body interferes with Firebug Lite, 
//   included in the Dojo Toolkit 1.4.3.

// Felix E. Klee <felix.klee@inka.de>

var DetectImageState = {
	 version: '1.0'
	,imagesDisabled: true
	,inserted_id: 'detectimagestate-test-img'
	,callback: function() { }
	,ie_detectionComplete: false
	,img: null
	,ie_Timeout: 100

	,init: function(testerimg, cb) {
		this.callback = cb;

        // Modification as mentioned above:
        dojo.attr('DetectImageState', 'innerHTML', '<img id="'+this.inserted_id+'" style="visibility:hidden; position:absolute;left:-1000px;" src="'+testerimg+'?'+Math.random()+'" alt="">');
//		document.body.innerHTML += '<img id="'+this.inserted_id+'" style="visibility:hidden; position:absolute;left:-1000px;" src="'+testerimg+'?'+Math.random()+'" alt="" />';

		this.img = document.getElementById(this.inserted_id);

		if(window.opera || navigator.userAgent.toLowerCase().indexOf('opera')>-1) {
			var pre = this.img.complete;
			this.img.src = 'about:blank';
			this.imagesDisabled = (!pre && this.img.complete) ? false : true;
			DetectImageState.callback(this.imagesDisabled);
			return;
		}else if(typeof this.img.readyState != 'undefined') {
			this.img.src = this.img.src+'?'+Math.random();
			this.img.onabort = function() {
				DetectImageState.ie_detectionComplete = true;
				DetectImageState.imagesDisabled = false;
				DetectImageState.callback(DetectImageState.imagesDisabled);
			};

			setTimeout('if(!DetectImageState.ie_detectionComplete) DetectImageState.callback(DetectImageState.imagesDisabled);', this.ie_Timeout);
			return;
		}else {
			this.imagesDisabled = this.img.complete;
			DetectImageState.callback(this.imagesDisabled);
			return;
		}
	}
};
