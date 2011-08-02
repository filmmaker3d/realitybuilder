/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.form.uploader.plugins.Flash"],["require","dojox.form.uploader.plugins.HTML5"],["require","dojox.embed.flashVars"],["require","dojox.embed.Flash"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.form.uploader.plugins.Flash"]){_4._hasResource["dojox.form.uploader.plugins.Flash"]=true;_4.provide("dojox.form.uploader.plugins.Flash");_4.require("dojox.form.uploader.plugins.HTML5");_4.require("dojox.embed.flashVars");_4.require("dojox.embed.Flash");_4.declare("dojox.form.uploader.plugins.Flash",[],{swfPath:_4.config.uploaderPath||_4.moduleUrl("dojox.form","resources/uploader.swf"),skipServerCheck:true,serverTimeout:2000,isDebug:false,devMode:false,deferredUploading:0,force:"",postMixInProperties:function(){if(!this.supports("multiple")){this.uploadType="flash";this._files=[];this._fileMap={};this._createInput=this._createFlashUploader;this.getFileList=this.getFlashFileList;this.reset=this.flashReset;this.upload=this.uploadFlash;this.submit=this.submitFlash;this.fieldname="flashUploadFiles";}this.inherited(arguments);},onReady:function(_7){},onLoad:function(_8){},onFileChange:function(_9){},onFileProgress:function(_a){},getFlashFileList:function(){return this._files;},flashReset:function(){this.flashMovie.reset();this._files=[];},uploadFlash:function(){this.onBegin(this.getFileList());this.flashMovie.doUpload();},submitFlash:function(_b){this.onBegin(this.getFileList());this.flashMovie.doUpload(_b);},_change:function(_c){this._files=this._files.concat(_c);_4.forEach(_c,function(f){f.bytesLoaded=0;f.bytesTotal=f.size;this._fileMap[f.name+"_"+f.size]=f;},this);this.onChange(this._files);this.onFileChange(_c);},_complete:function(_d){var o=this._getCustomEvent();o.type="load";this.onComplete(_d);},_progress:function(f){this._fileMap[f.name+"_"+f.bytesTotal].bytesLoaded=f.bytesLoaded;var o=this._getCustomEvent();this.onFileProgress(f);this.onProgress(o);},_error:function(_e){this.onError(_e);},_onFlashBlur:function(_f){},_getCustomEvent:function(){var o={bytesLoaded:0,bytesTotal:0,type:"progress",timeStamp:new Date().getTime()};for(var nm in this._fileMap){o.bytesTotal+=this._fileMap[nm].bytesTotal;o.bytesLoaded+=this._fileMap[nm].bytesLoaded;}o.decimal=o.bytesLoaded/o.bytesTotal;o.percent=Math.ceil((o.bytesLoaded/o.bytesTotal)*100)+"%";return o;},_connectFlash:function(){this._subs=[];this._cons=[];var _10=_4.hitch(this,function(s,_11){this._subs.push(_4.subscribe(this.id+s,this,_11));});_10("/filesSelected","_change");_10("/filesUploaded","_complete");_10("/filesProgress","_progress");_10("/filesError","_error");_10("/filesCanceled","onCancel");_10("/stageBlur","_onFlashBlur");var cs=_4.hitch(this,function(s,nm){this._cons.push(_4.subscribe(this.id+s,this,function(evt){this.button._cssMouseEvent({type:nm});}));});cs("/up","mouseup");cs("/down","mousedown");cs("/over","mouseover");cs("/out","mouseout");this.connect(this.domNode,"focus",function(){this.flashMovie.focus();this.flashMovie.doFocus();});if(this.tabIndex>=0){_4.attr(this.domNode,"tabIndex",this.tabIndex);}},_createFlashUploader:function(){var url=this.getUrl();if(url){if(url.toLowerCase().indexOf("http")<0&&url.indexOf("/")!=0){var loc=window.location.href.split("/");loc.pop();loc=loc.join("/")+"/";url=loc+url;}}else{console.warn("Warning: no uploadUrl provided.");}this.inputNode=_4.create("div",{className:"dojoxFlashNode"},this.domNode,"first");_4.style(this.inputNode,{position:"absolute",top:"-2px",width:this.btnSize.w+"px",height:this.btnSize.h+"px",opacity:0});var w=this.btnSize.w;var h=this.btnSize.h;var _12={expressInstall:true,path:(this.swfPath.uri||this.swfPath)+"?cb_"+(new Date().getTime()),width:w,height:h,allowScriptAccess:"always",allowNetworking:"all",vars:{uploadDataFieldName:this.flashFieldName||this.name+"Flash",uploadUrl:url,uploadOnSelect:this.uploadOnSelect,deferredUploading:this.deferredUploading||0,selectMultipleFiles:this.multiple,id:this.id,isDebug:this.isDebug,noReturnCheck:this.skipServerCheck,serverTimeout:this.serverTimeout},params:{scale:"noscale",wmode:"transparent",wmode:"opaque",allowScriptAccess:"always",allowNetworking:"all"}};this.flashObject=new _6.embed.Flash(_12,this.inputNode);this.flashObject.onError=_4.hitch(function(msg){console.error("Flash Error: "+msg);});this.flashObject.onReady=_4.hitch(this,function(){this.onReady(this);});this.flashObject.onLoad=_4.hitch(this,function(mov){this.flashMovie=mov;this.flashReady=true;this.onLoad(this);});this._connectFlash();}});_6.form.addUploaderPlugin(_6.form.uploader.plugins.Flash);}}};});