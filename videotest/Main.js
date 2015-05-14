(function (console) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	iterator: function() {
		return new _List.ListIterator(this.h);
	}
	,__class__: List
};
var _List = {};
_List.ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
_List.ListIterator.__name__ = true;
_List.ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _List.ListIterator
};
Math.__name__ = true;
var VideoTest = function() {
	this.loader = window.document;
	this.gpu = glee.GPU.init({ viewportType : glee.ViewportType.KeepRatioUsingBorder(1200,400), viewportPosition : glee.ViewportPosition.Center, maxHDPI : 1});
	this._camera = new korrigan.OrthoCamera(this.gpu,1200,400);
	this.program = tri.SimpleTexturedProgram.upload(this.gpu);
	this.buffer = new glee.buffer.Buffer_texCoordsTPath_28_7B_20name_20_3D_3E_20Vec2_2C_20pack_20_3D_3E_20_5Bglmat_5D_20_7D_29positionTPath_28_7B_20name_20_3D_3E_20Vec3_2C_20pack_20_3D_3E_20_5Bglmat_5D_20_7D_29(this.gpu,35048);
	this.initialised();
};
VideoTest.__name__ = true;
VideoTest.main = function() {
	console.log("video test");
	new VideoTest();
};
VideoTest.prototype = {
	initialised: function() {
		var _g = this;
		this._texture = glee.GPUTexture.create(this.gpu);
		this._video = window.document.createElement("video");
		if(this._video.canPlayType("video/mp4").length > 0) {
			this._video.src = "loop1.mp4";
			this._video.autoPlay = true;
			this._video.loop = true;
			this._video.oncanplay = $bind(this,this.ready);
			this._video.onloadedmetadata = function() {
				console.log("loadedmetadat");
			};
			this._video.play();
		} else console.log("cannot play the video (mp4 not supported)");
		window.document.addEventListener("mousemove",function(e) {
			if(e.clientX == null) _g.mouseX = e.clientX; else _g.mouseX = e.pageX;
			if(e.clientY == null) _g.mouseY = e.clientX; else _g.mouseY = e.pageY;
		},false);
	}
	,ready: function() {
		this.gpu.setRenderFunction($bind(this,this.render));
	}
	,render: function(now) {
		var centerX = this._video.videoWidth / 2 + (this.mouseX - this.gpu.windowWidth / 2) * (this._video.videoWidth / this.gpu.windowWidth);
		var centerY = this._video.videoHeight / 2 + (this.mouseY - this.gpu.windowHeight / 2) * (this._video.videoHeight / this.gpu.windowHeight);
		if(centerX < -1200) centerX += this._video.videoWidth;
		if(centerX > this._video.videoWidth - 1200) centerX -= this._video.videoWidth;
		if(centerY > this._video.videoHeight - 200.) centerY = this._video.videoHeight - 200.;
		if(centerY < 200.) centerY = 200.;
		this._camera.centerOn(centerX,centerY);
		this.gpu.clearWith(0,0,0,1);
		try {
			this._texture.uploadVideo(this._video);
		} catch( e ) {
		}
		this.buffer.rewind();
		this.buffer.write_position(-this._video.videoWidth,this._video.videoHeight,0);
		this.buffer.write_texCoords(0,1);
		this.buffer.write_position(-this._video.videoWidth,0,0);
		this.buffer.write_texCoords(0,0);
		this.buffer.write_position(0,0,0);
		this.buffer.write_texCoords(1,0);
		this.buffer.write_position(0,0,0);
		this.buffer.write_texCoords(1,0);
		this.buffer.write_position(0,this._video.videoHeight,0);
		this.buffer.write_texCoords(1,1);
		this.buffer.write_position(-this._video.videoWidth,this._video.videoHeight,0);
		this.buffer.write_texCoords(0,1);
		this.buffer.write_position(0,this._video.videoHeight,0);
		this.buffer.write_texCoords(0,1);
		this.buffer.write_position(0,0,0);
		this.buffer.write_texCoords(0,0);
		this.buffer.write_position(this._video.videoWidth,0,0);
		this.buffer.write_texCoords(1,0);
		this.buffer.write_position(this._video.videoWidth,0,0);
		this.buffer.write_texCoords(1,0);
		this.buffer.write_position(this._video.videoWidth,this._video.videoHeight,0);
		this.buffer.write_texCoords(1,1);
		this.buffer.write_position(0,this._video.videoHeight,0);
		this.buffer.write_texCoords(0,1);
		this.buffer.upload();
		this.program.set_viewproj(this._camera.viewproj);
		this.program.set_tex(this._texture);
		this.program.draw(this.buffer);
	}
	,__class__: VideoTest
};
var boot = {};
boot.AssetLoader = function() { };
boot.AssetLoader.__name__ = true;
boot.AssetLoader.prototype = {
	__class__: boot.AssetLoader
};
boot.AssetStore = function() { };
boot.AssetStore.__name__ = true;
boot.AssetStore.prototype = {
	__class__: boot.AssetStore
};
boot.ImageLoader = function() {
	this.futures = new haxe.ds.StringMap();
};
boot.ImageLoader.__name__ = true;
boot.ImageLoader.__interfaces__ = [boot.AssetLoader];
boot.ImageLoader.prototype = {
	load: function(assetId,path) {
		if(path == null) path = assetId;
		var future = this.futures.get(assetId);
		if(future != null) return future;
		future = tink.core._Future.Future_Impl_.async(function(handler) {
			var loader = window.document;
			var url = path;
			var success = function(data) {
				handler(tink.core.Outcome.Success(data));
			};
			var error1 = function(error) {
				handler(tink.core.Outcome.Failure(error));
			};
			var image = new Image();
			image.onload = function(_) {
				success(image);
			};
			image.onerror = function(_1) {
				error1("failed to load " + url);
			};
			image.src = url;
		});
		return future;
	}
	,__class__: boot.ImageLoader
};
boot.TextLoader = function() {
	this.futures = new haxe.ds.StringMap();
};
boot.TextLoader.__name__ = true;
boot.TextLoader.__interfaces__ = [boot.AssetLoader];
boot.TextLoader.prototype = {
	load: function(assetId,path) {
		if(path == null) path = assetId;
		var future = this.futures.get(assetId);
		if(future != null) return future;
		future = tink.core._Future.Future_Impl_.async(function(handler) {
			var loader = window.document;
			var http = new haxe.Http(path);
			http.onData = function(data) {
				handler(tink.core.Outcome.Success(data));
			};
			http.onError = function(error) {
				handler(tink.core.Outcome.Failure(error));
			};
			http.request();
		});
		return future;
	}
	,__class__: boot.TextLoader
};
boot.Assets = function(texts,images) {
	this.texts = texts;
	this.images = images;
};
boot.Assets.__name__ = true;
boot.Assets.load = function(texts,images) {
	var textsFuture = boot.Batch.load(boot.Assets.textLoader,texts,null);
	var imagesFuture = boot.Batch.load(boot.Assets.imageLoader,images,null);
	return tink.core._Future.Future_Impl_.merge(textsFuture,imagesFuture,function(textBatch,imageBatch) {
		var resultingTexts = null;
		var textError = null;
		switch(textBatch[1]) {
		case 0:
			var texts1 = textBatch[2];
			resultingTexts = texts1;
			break;
		case 1:
			var outcomes = textBatch[2];
			textError = outcomes;
			break;
		}
		var resultingImages = null;
		var imageError = null;
		switch(imageBatch[1]) {
		case 0:
			var images1 = imageBatch[2];
			resultingImages = images1;
			break;
		case 1:
			var outcomes1 = imageBatch[2];
			imageError = outcomes1;
			break;
		}
		if(resultingImages != null && resultingTexts != null) return tink.core.Outcome.Success(new boot.Assets(resultingTexts,resultingImages)); else return tink.core.Outcome.Failure({ textOutcomes : textError, imageOutcomes : imageError});
	});
};
boot.Assets.prototype = {
	__class__: boot.Assets
};
boot.Batch = function(items) {
	this.dict = new haxe.ds.StringMap();
	var $it0 = items.keys();
	while( $it0.hasNext() ) {
		var itemId = $it0.next();
		var value;
		value = __map_reserved[itemId] != null?items.getReserved(itemId):items.h[itemId];
		this.dict.set(itemId,value);
	}
};
boot.Batch.__name__ = true;
boot.Batch.__interfaces__ = [boot.AssetStore];
boot.Batch.load = function(assetLoader,ids,paths) {
	if(paths == null) paths = ids;
	while(paths.length < ids.length) paths.push(ids[paths.length]);
	var allFutures = [];
	var _g1 = 0;
	var _g = paths.length;
	while(_g1 < _g) {
		var i = _g1++;
		var path = paths[i];
		var id = [ids[i]];
		var future = tink.core._Future.Future_Impl_.map(assetLoader.load(path),(function(id) {
			return function(o) {
				switch(o[1]) {
				case 0:
					var d = o[2];
					return tink.core.Outcome.Success({ data : d, id : id[0]});
				case 1:
					var e = o[2];
					return tink.core.Outcome.Failure(e);
				}
			};
		})(id));
		allFutures.push(future);
	}
	var futureForAll = tink.core._Future.Future_Impl_.fromMany(allFutures);
	var futureTrigger = new tink.core.FutureTrigger();
	futureForAll(function(outcomes) {
		var data = new haxe.ds.StringMap();
		var originalOutcomes = [];
		var atleastOneFailed = false;
		var _g2 = 0;
		while(_g2 < outcomes.length) {
			var outcome = outcomes[_g2];
			++_g2;
			switch(outcome[1]) {
			case 0:
				var d1 = outcome[2];
				data.set(d1.id,d1.data);
				originalOutcomes.push(tink.core.Outcome.Success(d1.data));
				break;
			case 1:
				var error = outcome[2];
				atleastOneFailed = true;
				originalOutcomes.push(tink.core.Outcome.Failure(error));
				break;
			}
		}
		if(atleastOneFailed) futureTrigger.trigger(tink.core.Outcome.Failure(originalOutcomes)); else futureTrigger.trigger(tink.core.Outcome.Success(new boot.Batch(data)));
	});
	return futureTrigger.future;
};
boot.Batch.prototype = {
	get: function(assetId) {
		return this.dict.get(assetId);
	}
	,all: function() {
		var all = [];
		var $it0 = this.dict.iterator();
		while( $it0.hasNext() ) {
			var t = $it0.next();
			all.push(t);
		}
		return all;
	}
	,__class__: boot.Batch
};
boot.Runnable = function() { };
boot.Runnable.__name__ = true;
boot.Runnable.prototype = {
	__class__: boot.Runnable
};
boot.Runner = function(runnable) {
	this.runnable = runnable;
};
boot.Runner.__name__ = true;
boot.Runner.prototype = {
	start: function(fps) {
		if(fps == null) fps = 30;
		this.lastNow = haxe.Timer.stamp();
		this.runnable.start(this.lastNow);
		this.timer = new haxe.Timer(1000 / fps | 0);
		this.timer.run = $bind(this,this.update);
	}
	,update: function() {
		var now = haxe.Timer.stamp();
		var delta = now - this.lastNow;
		this.lastNow = now;
		this.runnable.update(now,delta);
	}
	,__class__: boot.Runner
};
var glee = {};
glee.ViewportType = { __ename__ : true, __constructs__ : ["Manual","Fixed","Fill","FillUpToRatios","KeepRatioUsingBorder","KeepRatioUsingCropping","KeepRatioUsingBorderWithoutScalingUp","KeepRatioUsingCroppingWithoutScalingUp"] };
glee.ViewportType.Manual = ["Manual",0];
glee.ViewportType.Manual.__enum__ = glee.ViewportType;
glee.ViewportType.Fixed = function(width,height) { var $x = ["Fixed",1,width,height]; $x.__enum__ = glee.ViewportType; return $x; };
glee.ViewportType.Fill = ["Fill",2];
glee.ViewportType.Fill.__enum__ = glee.ViewportType;
glee.ViewportType.FillUpToRatios = function(minRatio,maxRatio) { var $x = ["FillUpToRatios",3,minRatio,maxRatio]; $x.__enum__ = glee.ViewportType; return $x; };
glee.ViewportType.KeepRatioUsingBorder = function(width,height) { var $x = ["KeepRatioUsingBorder",4,width,height]; $x.__enum__ = glee.ViewportType; return $x; };
glee.ViewportType.KeepRatioUsingCropping = function(width,height) { var $x = ["KeepRatioUsingCropping",5,width,height]; $x.__enum__ = glee.ViewportType; return $x; };
glee.ViewportType.KeepRatioUsingBorderWithoutScalingUp = function(width,height) { var $x = ["KeepRatioUsingBorderWithoutScalingUp",6,width,height]; $x.__enum__ = glee.ViewportType; return $x; };
glee.ViewportType.KeepRatioUsingCroppingWithoutScalingUp = function(width,height) { var $x = ["KeepRatioUsingCroppingWithoutScalingUp",7,width,height]; $x.__enum__ = glee.ViewportType; return $x; };
glee.ViewportPosition = { __ename__ : true, __constructs__ : ["TopLeft","Top","TopRight","Right","BottomRight","Bottom","BottomLeft","Left","Center"] };
glee.ViewportPosition.TopLeft = ["TopLeft",0];
glee.ViewportPosition.TopLeft.__enum__ = glee.ViewportPosition;
glee.ViewportPosition.Top = ["Top",1];
glee.ViewportPosition.Top.__enum__ = glee.ViewportPosition;
glee.ViewportPosition.TopRight = ["TopRight",2];
glee.ViewportPosition.TopRight.__enum__ = glee.ViewportPosition;
glee.ViewportPosition.Right = ["Right",3];
glee.ViewportPosition.Right.__enum__ = glee.ViewportPosition;
glee.ViewportPosition.BottomRight = ["BottomRight",4];
glee.ViewportPosition.BottomRight.__enum__ = glee.ViewportPosition;
glee.ViewportPosition.Bottom = ["Bottom",5];
glee.ViewportPosition.Bottom.__enum__ = glee.ViewportPosition;
glee.ViewportPosition.BottomLeft = ["BottomLeft",6];
glee.ViewportPosition.BottomLeft.__enum__ = glee.ViewportPosition;
glee.ViewportPosition.Left = ["Left",7];
glee.ViewportPosition.Left.__enum__ = glee.ViewportPosition;
glee.ViewportPosition.Center = ["Center",8];
glee.ViewportPosition.Center.__enum__ = glee.ViewportPosition;
glee.GPU = function(window,option) {
	this.viewportHeight = 0;
	this.viewportWidth = 0;
	this.viewportY = 0;
	this.viewportX = 0;
	this.windowHeight = 0;
	this.windowWidth = 0;
	this._window = window;
	this.gl = this._window.getGL();
	var defaultOption = { viewportType : glee.ViewportType.Fill, viewportPosition : glee.ViewportPosition.Center, maxHDPI : 1};
	if(option != null) {
		if(option.viewportType == null) option.viewportType = defaultOption.viewportType; else option.viewportType = option.viewportType;
		if(option.viewportPosition == null) option.viewportPosition = defaultOption.viewportPosition; else option.viewportPosition = option.viewportPosition;
		if(option.maxHDPI == null) option.maxHDPI = defaultOption.maxHDPI; else option.maxHDPI = option.maxHDPI;
	} else option = defaultOption;
	this._option = option;
	window.setOnResizeCallback($bind(this,this.onWindowResized));
	this.onWindowResized(window.width,window.height);
};
glee.GPU.__name__ = true;
glee.GPU.init = function(option) {
	if(glee.GPU._gpu != null) {
		console.log("ERROR : GPU already initialised");
		return null;
	}
	var $window = jsloka.App.initWindow();
	if($window == null) {
		console.log("the window has already been initialised via App.initWindow, GPU cannot take control of the GL rendering");
		return null;
	}
	return new glee.GPU($window,option);
};
glee.GPU.prototype = {
	setWindowResizeCallback: function(callback) {
		this._windowResizeCallback = callback;
	}
	,onWindowResized: function(width,height) {
		this.windowWidth = width;
		this.windowHeight = height;
		if(this._windowResizeCallback != null) this._windowResizeCallback(width,height);
		this.setViewportAutomatically();
	}
	,setRenderFunction: function(render) {
		this._window.setRenderFunction(render);
	}
	,setViewportAutomatically: function() {
		var width = this.windowWidth;
		var height = this.windowHeight;
		{
			var _g = this._option.viewportType;
			if(_g != null) switch(_g[1]) {
			case 0:
				return;
			case 2:
				width = this.gl.drawingBufferWidth;
				height = this.gl.drawingBufferHeight;
				break;
			case 3:
				var maxRatio = _g[3];
				var minRatio = _g[2];
				var drawingBufferWidth = this.gl.drawingBufferWidth;
				var drawingBufferHeight = this.gl.drawingBufferHeight;
				if(drawingBufferWidth / drawingBufferHeight > maxRatio) {
					width = drawingBufferHeight * maxRatio;
					height = drawingBufferHeight;
				} else if(drawingBufferWidth / drawingBufferHeight < minRatio) {
					width = drawingBufferHeight;
					height = drawingBufferHeight * minRatio;
				} else {
					width = drawingBufferWidth;
					height = drawingBufferHeight;
				}
				break;
			case 1:
				var h = _g[3];
				var w = _g[2];
				width = w;
				height = h;
				break;
			case 4:
				var h1 = _g[3];
				var w1 = _g[2];
				var widthRatio = width / w1;
				var heightRatio = height / h1;
				if(widthRatio > heightRatio) width = w1 * heightRatio; else height = h1 * widthRatio;
				break;
			case 6:
				var h2 = _g[3];
				var w2 = _g[2];
				var widthRatio1 = width / w2;
				var heightRatio1 = height / h2;
				if(widthRatio1 > 1 || heightRatio1 > 1) {
					width = w2;
					height = h2;
				} else if(widthRatio1 > heightRatio1) width = w2 * heightRatio1; else height = h2 * widthRatio1;
				break;
			case 5:
				var h3 = _g[3];
				var w3 = _g[2];
				var widthRatio2 = width / w3;
				var heightRatio2 = height / h3;
				if(widthRatio2 < heightRatio2) width = w3 * heightRatio2; else height = h3 * widthRatio2;
				break;
			case 7:
				var h4 = _g[3];
				var w4 = _g[2];
				var widthRatio3 = width / w4;
				var heightRatio3 = height / h4;
				if(widthRatio3 > 1 || heightRatio3 > 1) {
					width = w4;
					height = h4;
				} else if(widthRatio3 < heightRatio3) width = w4 * heightRatio3; else height = h4 * widthRatio3;
				break;
			}
		}
		var x = 0;
		var y = 0;
		var _g1 = this._option.viewportPosition;
		if(_g1 != null) switch(_g1[1]) {
		case 8:
			x = (this.windowWidth - width) / 2;
			y = (this.windowHeight - height) / 2;
			break;
		case 0:
			y = this.windowHeight - height;
			break;
		case 1:
			x = (this.windowWidth - width) / 2;
			y = this.windowHeight - height;
			break;
		case 2:
			x = this.windowWidth - width;
			y = this.windowHeight - height;
			break;
		case 3:
			x = this.windowWidth - width;
			y = (this.windowHeight - height) / 2;
			break;
		case 4:
			x = this.windowWidth - width;
			break;
		case 5:
			x = (this.windowWidth - width) / 2;
			break;
		case 6:
			break;
		case 7:
			y = (this.windowHeight - height) / 2;
			break;
		}
		if(width != this.viewportWidth || height != this.viewportHeight || x != this.viewportX || y != this.viewportY) {
			this.viewportX = x | 0;
			this.viewportY = y | 0;
			this.viewportWidth = width | 0;
			this.viewportHeight = height | 0;
			this.gl.viewport(this.viewportX,this.viewportY,this.viewportWidth,this.viewportHeight);
			if(this._viewportChangeCallback != null) this._viewportChangeCallback(this.viewportX,this.viewportY,this.viewportWidth,this.viewportHeight);
		}
	}
	,setViewPort: function(x,y,width,height) {
		this._option.viewportType = glee.ViewportType.Manual;
		if(width != this.viewportWidth || height != this.viewportHeight || x != this.viewportX || y != this.viewportY) {
			this.viewportX = x | 0;
			this.viewportY = y | 0;
			this.viewportWidth = width | 0;
			this.viewportHeight = height | 0;
			this.gl.viewport(this.viewportX,this.viewportY,this.viewportWidth,this.viewportHeight);
			if(this._viewportChangeCallback != null) this._viewportChangeCallback(this.viewportX,this.viewportY,this.viewportWidth,this.viewportHeight);
		}
	}
	,setViewportChangeCallback: function(callback) {
		this._viewportChangeCallback = callback;
	}
	,_setViewPort: function(x,y,width,height) {
		if(width != this.viewportWidth || height != this.viewportHeight || x != this.viewportX || y != this.viewportY) {
			this.viewportX = x | 0;
			this.viewportY = y | 0;
			this.viewportWidth = width | 0;
			this.viewportHeight = height | 0;
			this.gl.viewport(this.viewportX,this.viewportY,this.viewportWidth,this.viewportHeight);
			if(this._viewportChangeCallback != null) this._viewportChangeCallback(this.viewportX,this.viewportY,this.viewportWidth,this.viewportHeight);
		}
	}
	,clearWith: function(r,g,b,a) {
		this.gl.clearColor(r,g,b,a);
		this.gl.clear(16384);
	}
	,uploadTexture: function(image) {
		return glee.GPUTexture.upload(this,image);
	}
	,uploadCubeTexture: function(negx,negy,negz,posx,posy,posz) {
		return glee.GPUCubeTexture.upload(this,negx,negy,negz,posx,posy,posz);
	}
	,enableBlending: function() {
		this.gl.enable(3042);
	}
	,disableBlending: function() {
		this.gl.disable(3042);
	}
	,setBlendingFunc: function(sfactor,dfactor) {
		this.gl.blendFunc(sfactor,dfactor);
	}
	,__class__: glee.GPU
};
glee.GPUBuffer = function() { };
glee.GPUBuffer.__name__ = true;
glee.GPUBufferBase = function(gpu,usage) {
	this._gl = gpu.gl;
	this._usage = usage;
	this.nativeBuffer = this._gl.createBuffer();
};
glee.GPUBufferBase.__name__ = true;
glee.GPUBufferBase.prototype = {
	upload: function() {
		var offset = 0;
		this._gl.bindBuffer(34962,this.nativeBuffer);
		if(offset != 0) this._gl.bufferSubData(34962,offset,this._float32Array); else this._gl.bufferData(34962,this._float32Array,this._usage);
		this._gl.bindBuffer(34962,null);
		this.uploaded = true;
	}
	,__class__: glee.GPUBufferBase
};
glee.GPUCubeTexture = function(gl,nativeTexture) {
	this._gl = gl;
	this.nativeTexture = nativeTexture;
};
glee.GPUCubeTexture.__name__ = true;
glee.GPUCubeTexture.upload = function(gpu,negx,negy,negz,posx,posy,posz) {
	var gl = gpu.gl;
	var nativeTexture = gl.createTexture();
	gl.bindTexture(34067,nativeTexture);
	gl.texImage2D(34070,0,6408,6408,5121,negx);
	gl.texImage2D(34072,0,6408,6408,5121,negy);
	gl.texImage2D(34074,0,6408,6408,5121,negz);
	gl.texImage2D(34069,0,6408,6408,5121,posx);
	gl.texImage2D(34071,0,6408,6408,5121,posy);
	gl.texImage2D(34073,0,6408,6408,5121,posz);
	gl.texParameteri(34067,10242,33071);
	gl.texParameteri(34067,10243,33071);
	gl.texParameteri(34067,10241,9729);
	gl.texParameteri(34067,10240,9729);
	return new glee.GPUCubeTexture(gl,nativeTexture);
};
glee.GPUCubeTexture.prototype = {
	__class__: glee.GPUCubeTexture
};
glee.GPUProgramUtil = function() { };
glee.GPUProgramUtil.__name__ = true;
glee.GPUProgramUtil.setupShader = function(gl,shaderSrc,shaderType) {
	var shader = gl.createShader(shaderType);
	gl.shaderSource(shader,shaderSrc);
	gl.compileShader(shader);
	var success = gl.getShaderParameter(shader,35713);
	if(success == 0) throw "could not compile shader:" + gl.getShaderInfoLog(shader);
	return shader;
};
glee.GPUProgramUtil.upload = function(gl,vertexShaderSrc,fragmentShaderSrc) {
	var vertexShader = glee.GPUProgramUtil.setupShader(gl,vertexShaderSrc,35633);
	var fragmentShader = glee.GPUProgramUtil.setupShader(gl,fragmentShaderSrc,35632);
	var nativeProgram = gl.createProgram();
	gl.attachShader(nativeProgram,vertexShader);
	gl.attachShader(nativeProgram,fragmentShader);
	gl.linkProgram(nativeProgram);
	var success = gl.getProgramParameter(nativeProgram,35714);
	if(success == 0) throw "program filed to link:" + gl.getProgramInfoLog(nativeProgram);
	return nativeProgram;
};
glee.GPUProgramUtil.unload = function(gl,nativeProgram) {
	gl.deleteProgram(nativeProgram);
};
glee.GPUProgram = function() { };
glee.GPUProgram.__name__ = true;
glee.GPUTexture = function(gl,nativeTexture) {
	this._gl = gl;
	this.nativeTexture = nativeTexture;
};
glee.GPUTexture.__name__ = true;
glee.GPUTexture.upload = function(gpu,image) {
	var gl = gpu.gl;
	var nativeTexture = gl.createTexture();
	gl.bindTexture(3553,nativeTexture);
	gl.texImage2D(3553,0,6408,6408,5121,image);
	gl.texParameteri(3553,10240,9728);
	gl.texParameteri(3553,10241,9728);
	gl.texParameteri(3553,10242,33071);
	gl.texParameteri(3553,10243,33071);
	gl.bindTexture(3553,null);
	return new glee.GPUTexture(gl,nativeTexture);
};
glee.GPUTexture.create = function(gpu) {
	var gl = gpu.gl;
	var nativeTexture = gl.createTexture();
	gl.bindTexture(3553,nativeTexture);
	gl.texParameteri(3553,10240,9728);
	gl.texParameteri(3553,10241,9728);
	gl.texParameteri(3553,10242,33071);
	gl.texParameteri(3553,10243,33071);
	return new glee.GPUTexture(gl,nativeTexture);
};
glee.GPUTexture.prototype = {
	uploadVideo: function(video) {
		this._gl.bindTexture(3553,this.nativeTexture);
		this._gl.texImage2D(3553,0,6407,6407,5121,video);
	}
	,__class__: glee.GPUTexture
};
glee.buffer = {};
glee.buffer.Buffer_texCoordsTPath_28_7B_20name_20_3D_3E_20Vec2_2C_20pack_20_3D_3E_20_5Bglmat_5D_20_7D_29positionTPath_28_7B_20name_20_3D_3E_20Vec3_2C_20pack_20_3D_3E_20_5Bglmat_5D_20_7D_29 = function(gpu,usage) {
	this._position_bufferPosition = 0;
	this._texCoords_bufferPosition = 0;
	glee.GPUBufferBase.call(this,gpu,usage);
};
glee.buffer.Buffer_texCoordsTPath_28_7B_20name_20_3D_3E_20Vec2_2C_20pack_20_3D_3E_20_5Bglmat_5D_20_7D_29positionTPath_28_7B_20name_20_3D_3E_20Vec3_2C_20pack_20_3D_3E_20_5Bglmat_5D_20_7D_29.__name__ = true;
glee.buffer.Buffer_texCoordsTPath_28_7B_20name_20_3D_3E_20Vec2_2C_20pack_20_3D_3E_20_5Bglmat_5D_20_7D_29positionTPath_28_7B_20name_20_3D_3E_20Vec3_2C_20pack_20_3D_3E_20_5Bglmat_5D_20_7D_29.__super__ = glee.GPUBufferBase;
glee.buffer.Buffer_texCoordsTPath_28_7B_20name_20_3D_3E_20Vec2_2C_20pack_20_3D_3E_20_5Bglmat_5D_20_7D_29positionTPath_28_7B_20name_20_3D_3E_20Vec3_2C_20pack_20_3D_3E_20_5Bglmat_5D_20_7D_29.prototype = $extend(glee.GPUBufferBase.prototype,{
	write_texCoords: function(v0,v1) {
		this.uploaded = false;
		if(this._float32Array == null) this._float32Array = new Float32Array(512);
		if(this._float32Array.length <= this._texCoords_bufferPosition * 5 + 2) {
			var newArray = new Float32Array(this._float32Array.length * 2);
			this._float32Array = newArray;
		}
		var pos = this._texCoords_bufferPosition * 5;
		this._texCoords_bufferPosition++;
		this._float32Array[pos] = v0;
		return this._float32Array[pos + 1] = v1;
	}
	,write_position: function(v0,v1,v2) {
		this.uploaded = false;
		if(this._float32Array == null) this._float32Array = new Float32Array(512);
		if(this._float32Array.length <= this._position_bufferPosition * 5 + 3) {
			var newArray = new Float32Array(this._float32Array.length * 2);
			this._float32Array = newArray;
		}
		var pos = this._position_bufferPosition * 5 + 2;
		this._position_bufferPosition++;
		this._float32Array[pos] = v0;
		this._float32Array[pos + 1] = v1;
		return this._float32Array[pos + 2] = v2;
	}
	,getNumVerticesWritten: function() {
		var max = 0;
		max = Math.max(max,this._texCoords_bufferPosition);
		max = Math.max(max,this._position_bufferPosition);
		return max | 0;
	}
	,rewind: function() {
		this._texCoords_bufferPosition = 0;
		return this._position_bufferPosition = 0;
	}
	,__class__: glee.buffer.Buffer_texCoordsTPath_28_7B_20name_20_3D_3E_20Vec2_2C_20pack_20_3D_3E_20_5Bglmat_5D_20_7D_29positionTPath_28_7B_20name_20_3D_3E_20Vec3_2C_20pack_20_3D_3E_20_5Bglmat_5D_20_7D_29
});
var glmat = {};
glmat._Mat4 = {};
glmat._Mat4.Mat4_Impl_ = {};
glmat._Mat4.Mat4_Impl_.__name__ = true;
glmat._Mat4.Mat4_Impl_._new = function() {
	var this1;
	this1 = new Float32Array(16);
	this1[0] = 1;
	this1[1] = 0;
	this1[2] = 0;
	this1[3] = 0;
	this1[4] = 0;
	this1[5] = 1;
	this1[6] = 0;
	this1[7] = 0;
	this1[8] = 0;
	this1[9] = 0;
	this1[10] = 1;
	this1[11] = 0;
	this1[12] = 0;
	this1[13] = 0;
	this1[14] = 0;
	this1[15] = 1;
	return this1;
};
glmat._Mat4.Mat4_Impl_.get = function(this1,index) {
	return this1[index];
};
glmat._Mat4.Mat4_Impl_.arrayWrite = function(this1,index,v) {
	this1[index] = v;
	return v;
};
glmat._Mat4.Mat4_Impl_.identity = function(out) {
	out[0] = 1;
	1;
	out[1] = 0;
	0;
	out[2] = 0;
	0;
	out[3] = 0;
	0;
	out[4] = 0;
	0;
	out[5] = 1;
	1;
	out[6] = 0;
	0;
	out[7] = 0;
	0;
	out[8] = 0;
	0;
	out[9] = 0;
	0;
	out[10] = 1;
	1;
	out[11] = 0;
	0;
	out[12] = 0;
	0;
	out[13] = 0;
	0;
	out[14] = 0;
	0;
	out[15] = 1;
	1;
	return out;
};
glmat._Mat4.Mat4_Impl_.copyFrom = function(out,a) {
	var v = a[0];
	out[0] = v;
	v;
	var v1 = a[1];
	out[1] = v1;
	v1;
	var v2 = a[2];
	out[2] = v2;
	v2;
	var v3 = a[3];
	out[3] = v3;
	v3;
	var v4 = a[4];
	out[4] = v4;
	v4;
	var v5 = a[5];
	out[5] = v5;
	v5;
	var v6 = a[6];
	out[6] = v6;
	v6;
	var v7 = a[7];
	out[7] = v7;
	v7;
	var v8 = a[8];
	out[8] = v8;
	v8;
	var v9 = a[9];
	out[9] = v9;
	v9;
	var v10 = a[10];
	out[10] = v10;
	v10;
	var v11 = a[11];
	out[11] = v11;
	v11;
	var v12 = a[12];
	out[12] = v12;
	v12;
	var v13 = a[13];
	out[13] = v13;
	v13;
	var v14 = a[14];
	out[14] = v14;
	v14;
	var v15 = a[15];
	out[15] = v15;
	v15;
	return out;
};
glmat._Mat4.Mat4_Impl_.multiply = function(out,a,b) {
	var a00 = a[0];
	var a01 = a[1];
	var a02 = a[2];
	var a03 = a[3];
	var a10 = a[4];
	var a11 = a[5];
	var a12 = a[6];
	var a13 = a[7];
	var a20 = a[8];
	var a21 = a[9];
	var a22 = a[10];
	var a23 = a[11];
	var a30 = a[12];
	var a31 = a[13];
	var a32 = a[14];
	var a33 = a[15];
	var b0 = b[0];
	var b1 = b[1];
	var b2 = b[2];
	var b3 = b[3];
	var v = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	out[0] = v;
	v;
	var v1 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	out[1] = v1;
	v1;
	var v2 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	out[2] = v2;
	v2;
	var v3 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	out[3] = v3;
	v3;
	b0 = b[4];
	b1 = b[5];
	b2 = b[6];
	b3 = b[7];
	var v4 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	out[4] = v4;
	v4;
	var v5 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	out[5] = v5;
	v5;
	var v6 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	out[6] = v6;
	v6;
	var v7 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	out[7] = v7;
	v7;
	b0 = b[8];
	b1 = b[9];
	b2 = b[10];
	b3 = b[11];
	var v8 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	out[8] = v8;
	v8;
	var v9 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	out[9] = v9;
	v9;
	var v10 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	out[10] = v10;
	v10;
	var v11 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	out[11] = v11;
	v11;
	b0 = b[12];
	b1 = b[13];
	b2 = b[14];
	b3 = b[15];
	var v12 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	out[12] = v12;
	v12;
	var v13 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	out[13] = v13;
	v13;
	var v14 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	out[14] = v14;
	v14;
	var v15 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	out[15] = v15;
	v15;
	return out;
};
glmat._Mat4.Mat4_Impl_.translate = function(out,a,x,y,z) {
	var a00;
	var a01;
	var a02;
	var a03;
	var a10;
	var a11;
	var a12;
	var a13;
	var a20;
	var a21;
	var a22;
	var a23;
	if(a == out) {
		var v = a[0] * x + a[4] * y + a[8] * z + a[12];
		out[12] = v;
		v;
		var v1 = a[1] * x + a[5] * y + a[9] * z + a[13];
		out[13] = v1;
		v1;
		var v2 = a[2] * x + a[6] * y + a[10] * z + a[14];
		out[14] = v2;
		v2;
		var v3 = a[3] * x + a[7] * y + a[11] * z + a[15];
		out[15] = v3;
		v3;
	} else {
		a00 = a[0];
		a01 = a[1];
		a02 = a[2];
		a03 = a[3];
		a10 = a[4];
		a11 = a[5];
		a12 = a[6];
		a13 = a[7];
		a20 = a[8];
		a21 = a[9];
		a22 = a[10];
		a23 = a[11];
		out[0] = a00;
		a00;
		out[1] = a01;
		a01;
		out[2] = a02;
		a02;
		out[3] = a03;
		a03;
		out[4] = a10;
		a10;
		out[5] = a11;
		a11;
		out[6] = a12;
		a12;
		out[7] = a13;
		a13;
		out[8] = a20;
		a20;
		out[9] = a21;
		a21;
		out[10] = a22;
		a22;
		out[11] = a23;
		a23;
		var v4 = a00 * x + a10 * y + a20 * z + a[12];
		out[12] = v4;
		v4;
		var v5 = a01 * x + a11 * y + a21 * z + a[13];
		out[13] = v5;
		v5;
		var v6 = a02 * x + a12 * y + a22 * z + a[14];
		out[14] = v6;
		v6;
		var v7 = a03 * x + a13 * y + a23 * z + a[15];
		out[15] = v7;
		v7;
	}
	return out;
};
glmat._Mat4.Mat4_Impl_.scale = function(out,a,x,y,z) {
	var v = a[0] * x;
	out[0] = v;
	v;
	var v1 = a[1] * x;
	out[1] = v1;
	v1;
	var v2 = a[2] * x;
	out[2] = v2;
	v2;
	var v3 = a[3] * x;
	out[3] = v3;
	v3;
	var v4 = a[4] * y;
	out[4] = v4;
	v4;
	var v5 = a[5] * y;
	out[5] = v5;
	v5;
	var v6 = a[6] * y;
	out[6] = v6;
	v6;
	var v7 = a[7] * y;
	out[7] = v7;
	v7;
	var v8 = a[8] * z;
	out[8] = v8;
	v8;
	var v9 = a[9] * z;
	out[9] = v9;
	v9;
	var v10 = a[10] * z;
	out[10] = v10;
	v10;
	var v11 = a[11] * z;
	out[11] = v11;
	v11;
	var v12 = a[12];
	out[12] = v12;
	v12;
	var v13 = a[13];
	out[13] = v13;
	v13;
	var v14 = a[14];
	out[14] = v14;
	v14;
	var v15 = a[15];
	out[15] = v15;
	v15;
	return out;
};
glmat._Mat4.Mat4_Impl_.ortho = function(out,left,right,bottom,top,near,far) {
	var lr = 1 / (left - right);
	var bt = 1 / (bottom - top);
	var nf = 1 / (near - far);
	var v = -2 * lr;
	out[0] = v;
	v;
	out[1] = 0;
	0;
	out[2] = 0;
	0;
	out[3] = 0;
	0;
	out[4] = 0;
	0;
	var v1 = -2 * bt;
	out[5] = v1;
	v1;
	out[6] = 0;
	0;
	out[7] = 0;
	0;
	out[8] = 0;
	0;
	out[9] = 0;
	0;
	var v2 = 2 * nf;
	out[10] = v2;
	v2;
	out[11] = 0;
	0;
	var v3 = (left + right) * lr;
	out[12] = v3;
	v3;
	var v4 = (top + bottom) * bt;
	out[13] = v4;
	v4;
	var v5 = (far + near) * nf;
	out[14] = v5;
	v5;
	out[15] = 1;
	1;
	return out;
};
glmat._Mat4.Mat4_Impl_.frustum = function(out,left,right,bottom,top,near,far) {
	var rl = 1 / (right - left);
	var tb = 1 / (top - bottom);
	var nf = 1 / (near - far);
	var v = near * 2 * rl;
	out[0] = v;
	v;
	out[1] = 0;
	0;
	out[2] = 0;
	0;
	out[3] = 0;
	0;
	out[4] = 0;
	0;
	var v1 = near * 2 * tb;
	out[5] = v1;
	v1;
	out[6] = 0;
	0;
	out[7] = 0;
	0;
	var v2 = (right + left) * rl;
	out[8] = v2;
	v2;
	var v3 = (top + bottom) * tb;
	out[9] = v3;
	v3;
	var v4 = (far + near) * nf;
	out[10] = v4;
	v4;
	out[11] = -1;
	-1;
	out[12] = 0;
	0;
	out[13] = 0;
	0;
	var v5 = far * near * 2 * nf;
	out[14] = v5;
	v5;
	out[15] = 0;
	0;
	return out;
};
glmat._Mat4.Mat4_Impl_.rotateX = function(out,a,angle_x) {
	var cosX = Math.cos(angle_x);
	var sinX = Math.sin(angle_x);
	var v = a[0];
	out[0] = v;
	v;
	var v1 = a[1];
	out[1] = v1;
	v1;
	var v2 = a[2];
	out[2] = v2;
	v2;
	var v3 = a[3];
	out[3] = v3;
	v3;
	var v4 = a[4] * cosX + a[8] * -sinX;
	out[4] = v4;
	v4;
	var v5 = a[5] * cosX + a[9] * -sinX;
	out[5] = v5;
	v5;
	var v6 = a[6] * cosX + a[10] * -sinX;
	out[6] = v6;
	v6;
	var v7 = a[7] * cosX + a[11] * -sinX;
	out[7] = v7;
	v7;
	var v8 = a[8] * cosX + a[4] * sinX;
	out[8] = v8;
	v8;
	var v9 = a[9] * cosX + a[5] * sinX;
	out[9] = v9;
	v9;
	var v10 = a[10] * cosX + a[6] * sinX;
	out[10] = v10;
	v10;
	var v11 = a[11] * cosX + a[7] * sinX;
	out[11] = v11;
	v11;
	var v12 = a[12];
	out[12] = v12;
	v12;
	var v13 = a[13];
	out[13] = v13;
	v13;
	var v14 = a[14];
	out[14] = v14;
	v14;
	var v15 = a[15];
	out[15] = v15;
	v15;
	return out;
};
glmat._Mat4.Mat4_Impl_.rotateY = function(out,a,angle_y) {
	var cosY = Math.cos(angle_y);
	var sinY = Math.sin(angle_y);
	var v = a[0] * cosY + a[8] * sinY;
	out[0] = v;
	v;
	var v1 = a[1] * cosY + a[9] * sinY;
	out[1] = v1;
	v1;
	var v2 = a[2] * cosY + a[10] * sinY;
	out[2] = v2;
	v2;
	var v3 = a[3] * cosY + a[11] * sinY;
	out[3] = v3;
	v3;
	var v4 = a[4];
	out[4] = v4;
	v4;
	var v5 = a[5];
	out[5] = v5;
	v5;
	var v6 = a[6];
	out[6] = v6;
	v6;
	var v7 = a[7];
	out[7] = v7;
	v7;
	var v8 = a[8] * cosY + a[0] * -sinY;
	out[8] = v8;
	v8;
	var v9 = a[9] * cosY + a[1] * -sinY;
	out[9] = v9;
	v9;
	var v10 = a[10] * cosY + a[2] * -sinY;
	out[10] = v10;
	v10;
	var v11 = a[11] * cosY + a[3] * -sinY;
	out[11] = v11;
	v11;
	var v12 = a[12];
	out[12] = v12;
	v12;
	var v13 = a[13];
	out[13] = v13;
	v13;
	var v14 = a[14];
	out[14] = v14;
	v14;
	var v15 = a[15];
	out[15] = v15;
	v15;
	return out;
};
glmat._Mat4.Mat4_Impl_.rotateZ = function(out,a,angle_z) {
	var s = Math.sin(angle_z);
	var c = Math.cos(angle_z);
	var a00 = a[0];
	var a01 = a[1];
	var a02 = a[2];
	var a03 = a[3];
	var a10 = a[4];
	var a11 = a[5];
	var a12 = a[6];
	var a13 = a[7];
	if(a != out) {
		var v = a[8];
		out[8] = v;
		v;
		var v1 = a[9];
		out[9] = v1;
		v1;
		var v2 = a[10];
		out[10] = v2;
		v2;
		var v3 = a[11];
		out[11] = v3;
		v3;
		var v4 = a[12];
		out[12] = v4;
		v4;
		var v5 = a[13];
		out[13] = v5;
		v5;
		var v6 = a[14];
		out[14] = v6;
		v6;
		var v7 = a[15];
		out[15] = v7;
		v7;
	}
	var v8 = a00 * c + a10 * s;
	out[0] = v8;
	v8;
	var v9 = a01 * c + a11 * s;
	out[1] = v9;
	v9;
	var v10 = a02 * c + a12 * s;
	out[2] = v10;
	v10;
	var v11 = a03 * c + a13 * s;
	out[3] = v11;
	v11;
	var v12 = a10 * c - a00 * s;
	out[4] = v12;
	v12;
	var v13 = a11 * c - a01 * s;
	out[5] = v13;
	v13;
	var v14 = a12 * c - a02 * s;
	out[6] = v14;
	v14;
	var v15 = a13 * c - a03 * s;
	out[7] = v15;
	v15;
	return out;
};
glmat._Mat4.Mat4_Impl_.rotateXY = function(out,angle_x,angle_y) {
	var cosX = Math.cos(angle_x);
	var sinX = Math.sin(angle_x);
	var cosY = Math.cos(angle_y);
	var sinY = Math.sin(angle_y);
	out[0] = cosY;
	cosY;
	out[1] = 0;
	0;
	var v = -sinY;
	out[2] = v;
	v;
	out[3] = 0;
	0;
	var v1 = -sinX * sinY;
	out[4] = v1;
	v1;
	out[5] = cosX;
	cosX;
	var v2 = -sinY * cosY;
	out[6] = v2;
	v2;
	out[7] = 0;
	0;
	var v3 = cosX * sinY;
	out[8] = v3;
	v3;
	out[9] = sinX;
	sinX;
	var v4 = cosX * cosY;
	out[10] = v4;
	v4;
	out[11] = 0;
	0;
	out[12] = 0;
	0;
	out[13] = 0;
	0;
	out[14] = 0;
	0;
	out[15] = 1;
	1;
	return out;
};
glmat._Mat4.Mat4_Impl_.perspective = function(out,fovy,aspect,near,far) {
	var f = 1.0 / Math.tan(fovy / 2);
	var nf = 1 / (near - far);
	var v = f / aspect;
	out[0] = v;
	v;
	out[1] = 0;
	0;
	out[2] = 0;
	0;
	out[3] = 0;
	0;
	out[4] = 0;
	0;
	out[5] = f;
	f;
	out[6] = 0;
	0;
	out[7] = 0;
	0;
	out[8] = 0;
	0;
	out[9] = 0;
	0;
	var v1 = (far + near) * nf;
	out[10] = v1;
	v1;
	out[11] = -1;
	-1;
	out[12] = 0;
	0;
	out[13] = 0;
	0;
	var v2 = 2 * far * near * nf;
	out[14] = v2;
	v2;
	out[15] = 0;
	0;
	return out;
};
glmat._Mat4.Mat4_Impl_.lookAt = function(out,eye,center,up) {
	var x0;
	var x1;
	var x2;
	var y0;
	var y1;
	var y2;
	var z0;
	var z1;
	var z2;
	var len;
	if(Math.abs(eye[0] - center[0]) < 0.1 && Math.abs(eye[1] - center[1]) < 0.1 && Math.abs(eye[2] - center[2]) < 0.1) return glmat._Mat4.Mat4_Impl_.identity(out);
	z0 = eye[0] - center[0];
	z1 = eye[1] - center[1];
	z2 = eye[2] - center[2];
	len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
	z0 *= len;
	z1 *= len;
	z2 *= len;
	x0 = up[1] * z2 - up[2] * z1;
	x1 = up[2] * z0 - up[0] * z2;
	x2 = up[0] * z1 - up[1] * z0;
	len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
	if(len == 0) {
		x0 = 0;
		x1 = 0;
		x2 = 0;
	} else {
		len = 1 / len;
		x0 *= len;
		x1 *= len;
		x2 *= len;
	}
	y0 = z1 * x2 - z2 * x1;
	y1 = z2 * x0 - z0 * x2;
	y2 = z0 * x1 - z1 * x0;
	len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
	if(len == 0) {
		y0 = 0;
		y1 = 0;
		y2 = 0;
	} else {
		len = 1 / len;
		y0 *= len;
		y1 *= len;
		y2 *= len;
	}
	out[0] = x0;
	x0;
	out[1] = y0;
	y0;
	out[2] = z0;
	z0;
	out[3] = 0;
	0;
	out[4] = x1;
	x1;
	out[5] = y1;
	y1;
	out[6] = z1;
	z1;
	out[7] = 0;
	0;
	out[8] = x2;
	x2;
	out[9] = y2;
	y2;
	out[10] = z2;
	z2;
	out[11] = 0;
	0;
	var v = -(x0 * eye[0] + x1 * eye[1] + x2 * eye[2]);
	out[12] = v;
	v;
	var v1 = -(y0 * eye[0] + y1 * eye[1] + y2 * eye[2]);
	out[13] = v1;
	v1;
	var v2 = -(z0 * eye[0] + z1 * eye[1] + z2 * eye[2]);
	out[14] = v2;
	v2;
	out[15] = 1;
	1;
	return out;
};
glmat._Mat4.Mat4_Impl_.invert = function(out,a) {
	var a00 = a[0];
	var a01 = a[1];
	var a02 = a[2];
	var a03 = a[3];
	var a10 = a[4];
	var a11 = a[5];
	var a12 = a[6];
	var a13 = a[7];
	var a20 = a[8];
	var a21 = a[9];
	var a22 = a[10];
	var a23 = a[11];
	var a30 = a[12];
	var a31 = a[13];
	var a32 = a[14];
	var a33 = a[15];
	var b00 = a00 * a11 - a01 * a10;
	var b01 = a00 * a12 - a02 * a10;
	var b02 = a00 * a13 - a03 * a10;
	var b03 = a01 * a12 - a02 * a11;
	var b04 = a01 * a13 - a03 * a11;
	var b05 = a02 * a13 - a03 * a12;
	var b06 = a20 * a31 - a21 * a30;
	var b07 = a20 * a32 - a22 * a30;
	var b08 = a20 * a33 - a23 * a30;
	var b09 = a21 * a32 - a22 * a31;
	var b10 = a21 * a33 - a23 * a31;
	var b11 = a22 * a33 - a23 * a32;
	var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
	if(det == 0) return null;
	det = 1.0 / det;
	var v = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	out[0] = v;
	v;
	var v1 = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	out[1] = v1;
	v1;
	var v2 = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	out[2] = v2;
	v2;
	var v3 = (a22 * b04 - a21 * b05 - a23 * b03) * det;
	out[3] = v3;
	v3;
	var v4 = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	out[4] = v4;
	v4;
	var v5 = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	out[5] = v5;
	v5;
	var v6 = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	out[6] = v6;
	v6;
	var v7 = (a20 * b05 - a22 * b02 + a23 * b01) * det;
	out[7] = v7;
	v7;
	var v8 = (a10 * b10 - a11 * b08 + a13 * b06) * det;
	out[8] = v8;
	v8;
	var v9 = (a01 * b08 - a00 * b10 - a03 * b06) * det;
	out[9] = v9;
	v9;
	var v10 = (a30 * b04 - a31 * b02 + a33 * b00) * det;
	out[10] = v10;
	v10;
	var v11 = (a21 * b02 - a20 * b04 - a23 * b00) * det;
	out[11] = v11;
	v11;
	var v12 = (a11 * b07 - a10 * b09 - a12 * b06) * det;
	out[12] = v12;
	v12;
	var v13 = (a00 * b09 - a01 * b07 + a02 * b06) * det;
	out[13] = v13;
	v13;
	var v14 = (a31 * b01 - a30 * b03 - a32 * b00) * det;
	out[14] = v14;
	v14;
	var v15 = (a20 * b03 - a21 * b01 + a22 * b00) * det;
	out[15] = v15;
	v15;
	return out;
};
glmat._Vec2 = {};
glmat._Vec2.Vec2_Impl_ = {};
glmat._Vec2.Vec2_Impl_.__name__ = true;
glmat._Vec2.Vec2_Impl_._new = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	var this1;
	this1 = new Float32Array(2);
	this1[0] = x;
	this1[1] = y;
	return this1;
};
glmat._Vec2.Vec2_Impl_.get_x = function(this1) {
	return this1[0];
};
glmat._Vec2.Vec2_Impl_.set_x = function(this1,v) {
	return this1[0] = v;
};
glmat._Vec2.Vec2_Impl_.get_y = function(this1) {
	return this1[1];
};
glmat._Vec2.Vec2_Impl_.set_y = function(this1,v) {
	return this1[1] = v;
};
glmat._Vec3 = {};
glmat._Vec3.Vec3_Impl_ = {};
glmat._Vec3.Vec3_Impl_.__name__ = true;
glmat._Vec3.Vec3_Impl_._new = function(x,y,z) {
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	var this1;
	this1 = new Float32Array(3);
	this1[0] = x;
	this1[1] = y;
	this1[2] = z;
	return this1;
};
glmat._Vec3.Vec3_Impl_.set = function(this1,x,y,z) {
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this1[0] = x;
	this1[1] = y;
	this1[2] = z;
};
glmat._Vec3.Vec3_Impl_.get_x = function(this1) {
	return this1[0];
};
glmat._Vec3.Vec3_Impl_.set_x = function(this1,v) {
	return this1[0] = v;
};
glmat._Vec3.Vec3_Impl_.get_y = function(this1) {
	return this1[1];
};
glmat._Vec3.Vec3_Impl_.set_y = function(this1,v) {
	return this1[1] = v;
};
glmat._Vec3.Vec3_Impl_.get_z = function(this1) {
	return this1[2];
};
glmat._Vec3.Vec3_Impl_.set_z = function(this1,v) {
	return this1[2] = v;
};
glmat._Vec3.Vec3_Impl_.transformMat4 = function(this1,out,m) {
	var x = this1[0];
	var y = this1[1];
	var z = this1[2];
	out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
	out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
	out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
	return out;
};
glmat._Vec4 = {};
glmat._Vec4.Vec4_Impl_ = {};
glmat._Vec4.Vec4_Impl_.__name__ = true;
glmat._Vec4.Vec4_Impl_._new = function(x,y,z,w) {
	if(w == null) w = 0;
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	var this1;
	this1 = new Float32Array(4);
	this1[0] = x;
	this1[1] = y;
	this1[2] = z;
	this1[3] = w;
	return this1;
};
glmat._Vec4.Vec4_Impl_.get_x = function(this1) {
	return this1[0];
};
glmat._Vec4.Vec4_Impl_.set_x = function(this1,v) {
	return this1[0] = v;
};
glmat._Vec4.Vec4_Impl_.get_y = function(this1) {
	return this1[1];
};
glmat._Vec4.Vec4_Impl_.set_y = function(this1,v) {
	return this1[1] = v;
};
glmat._Vec4.Vec4_Impl_.get_z = function(this1) {
	return this1[2];
};
glmat._Vec4.Vec4_Impl_.set_z = function(this1,v) {
	return this1[2] = v;
};
glmat._Vec4.Vec4_Impl_.get_w = function(this1) {
	return this1[3];
};
glmat._Vec4.Vec4_Impl_.set_w = function(this1,v) {
	return this1[3] = v;
};
glmat._Vec4.Vec4_Impl_.transformMat4 = function(this1,out,m) {
	var x = this1[0];
	var y = this1[1];
	var z = this1[2];
	var w = this1[3];
	out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
	out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
	out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
	out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
	return out;
};
var haxe = {};
haxe.IMap = function() { };
haxe.IMap.__name__ = true;
haxe.Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
haxe.Http.__name__ = true;
haxe.Http.prototype = {
	request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js.Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				s = null;
			}
			if(s != null) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) if(r.responseText != null) s = 200; else s = 404;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var _g_head = this.params.h;
			var _g_val = null;
			while(_g_head != null) {
				var p;
				p = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var _g_head1 = this.headers.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var h1;
			h1 = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe.Http
};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = true;
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe.Timer.prototype = {
	run: function() {
	}
	,__class__: haxe.Timer
};
haxe.ds = {};
haxe.ds.Option = { __ename__ : true, __constructs__ : ["Some","None"] };
haxe.ds.Option.Some = function(v) { var $x = ["Some",0,v]; $x.__enum__ = haxe.ds.Option; return $x; };
haxe.ds.Option.None = ["None",1];
haxe.ds.Option.None.__enum__ = haxe.ds.Option;
haxe.ds._StringMap = {};
haxe.ds._StringMap.StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
haxe.ds._StringMap.StringMapIterator.__name__ = true;
haxe.ds._StringMap.StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe.ds._StringMap.StringMapIterator
};
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [haxe.IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe.ds._StringMap.StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe.ds.StringMap
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js.Boot.__nativeClassName(o);
		if(name != null) return js.Boot.__resolveNativeClass(name);
		return null;
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js.Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__nativeClassName = function(o) {
	var name = js.Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js.Boot.__isNativeObj = function(o) {
	return js.Boot.__nativeClassName(o) != null;
};
js.Boot.__resolveNativeClass = function(name) {
	if(typeof window != "undefined") return window[name]; else return global[name];
};
js.Browser = function() { };
js.Browser.__name__ = true;
js.Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw "Unable to create XMLHttpRequest object.";
};
js.html = {};
js.html._CanvasElement = {};
js.html._CanvasElement.CanvasUtil = function() { };
js.html._CanvasElement.CanvasUtil.__name__ = true;
js.html._CanvasElement.CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0;
	var _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
};
var jsloka = {};
jsloka.App = function() { };
jsloka.App.__name__ = true;
jsloka.App.initWindow = function() {
	if(jsloka.App._window != null) {
		console.log("ERROR : window already initialised");
		return null;
	}
	var canvas = window.document.getElementById("canvas");
	if(canvas == null) {
		var _this = window.document;
		canvas = _this.createElement("canvas");
		canvas.style.display = "block";
		canvas.style.position = "relative";
		canvas.style.margin = "0 auto 0 auto";
		canvas.style.background = "#000";
		canvas.style.width = "100%";
		canvas.style.height = "100%";
		window.document.body.appendChild(canvas);
	}
	var webGlContext = js.html._CanvasElement.CanvasUtil.getContextWebGL(canvas,{ });
	if(webGlContext != null) jsloka.App._window = new jsloka.Window(canvas,webGlContext);
	return jsloka.App._window;
};
jsloka.Window = function(canvas,gl) {
	this._canvas = canvas;
	this._gl = gl;
	this.width = this._canvas.clientWidth;
	this.height = this._canvas.clientHeight;
	this.resizeCanvas();
	if(this._resizeCallback != null) this._resizeCallback(this.width,this.height);
};
jsloka.Window.__name__ = true;
jsloka.Window.prototype = {
	setOnResizeCallback: function(callback) {
		this._resizeCallback = callback;
	}
	,onResized: function() {
		this.width = this._canvas.clientWidth;
		this.height = this._canvas.clientHeight;
		this.resizeCanvas();
		if(this._resizeCallback != null) this._resizeCallback(this.width,this.height);
	}
	,resizeCanvas: function() {
		var realToCSSPixels;
		if(window.devicePixelRatio != null) realToCSSPixels = window.devicePixelRatio; else realToCSSPixels = 1;
		var displayWidth = Math.floor(this.width * realToCSSPixels);
		var displayHeight = Math.floor(this.height * realToCSSPixels);
		if(this._canvas.width != displayWidth || this._canvas.height != displayHeight) {
			this._canvas.width = displayWidth;
			this._canvas.height = displayHeight;
		}
	}
	,getGL: function() {
		return this._gl;
	}
	,setRenderFunction: function(render) {
		if(this._render == null) window.requestAnimationFrame($bind(this,this.internalRender));
		this._render = render;
	}
	,internalRender: function(t) {
		if(this.width != this._canvas.clientWidth || this.height != this._canvas.clientHeight) {
			this.width = this._canvas.clientWidth;
			this.height = this._canvas.clientHeight;
			this.resizeCanvas();
			if(this._resizeCallback != null) this._resizeCallback(this.width,this.height);
		}
		var now = haxe.Timer.stamp();
		this._render(now);
		window.requestAnimationFrame($bind(this,this.internalRender));
	}
	,__class__: jsloka.Window
};
jsloka.asset = {};
jsloka.asset._Loader = {};
jsloka.asset._Loader.Loader_Impl_ = {};
jsloka.asset._Loader.Loader_Impl_.__name__ = true;
jsloka.asset._Loader.Loader_Impl_._new = function() {
	return window.document;
};
jsloka.asset._Loader.Loader_Impl_.loadImage = function(this1,url,success,error) {
	var image = new Image();
	image.onload = function(_) {
		success(image);
	};
	image.onerror = function(_1) {
		error("failed to load " + url);
	};
	image.src = url;
};
jsloka.asset._Loader.Loader_Impl_.loadText = function(this1,url,success,error) {
	var http = new haxe.Http(url);
	http.onData = success;
	http.onError = error;
	http.request();
};
jsloka.gl = {};
jsloka.gl._GL = {};
jsloka.gl._GL.GL_Impl_ = {};
jsloka.gl._GL.GL_Impl_.__name__ = true;
jsloka.gl._GL.GL_Impl_._new = function(webglCtx) {
	return webglCtx;
};
jsloka.gl._GL.GL_Impl_.get_version = function() {
	return 7938;
};
jsloka.gl._GL.GL_Impl_.versionString = function(this1) {
	var ver = this1.getParameter(7938);
	var slver = this1.getParameter(35724);
	var ren = this1.getParameter(7937);
	var ven = this1.getParameter(7936);
	return "/ " + ver + " / " + slver + " / " + ren + " / " + ven + " /";
};
jsloka.gl._GL.GL_Impl_.activeTexture = function(this1,texture) {
	this1.activeTexture(texture);
};
jsloka.gl._GL.GL_Impl_.attachShader = function(this1,program,shader) {
	this1.attachShader(program,shader);
};
jsloka.gl._GL.GL_Impl_.bindAttribLocation = function(this1,program,index,name) {
	this1.bindAttribLocation(program,index,name);
};
jsloka.gl._GL.GL_Impl_.bindBuffer = function(this1,target,buffer) {
	this1.bindBuffer(target,buffer);
};
jsloka.gl._GL.GL_Impl_.bindFramebuffer = function(this1,target,framebuffer) {
	this1.bindFramebuffer(target,framebuffer);
};
jsloka.gl._GL.GL_Impl_.bindRenderbuffer = function(this1,target,renderbuffer) {
	this1.bindRenderbuffer(target,renderbuffer);
};
jsloka.gl._GL.GL_Impl_.bindTexture = function(this1,target,texture) {
	this1.bindTexture(target,texture);
};
jsloka.gl._GL.GL_Impl_.blendColor = function(this1,red,green,blue,alpha) {
	this1.blendColor(red,green,blue,alpha);
};
jsloka.gl._GL.GL_Impl_.blendEquation = function(this1,mode) {
	this1.blendEquation(mode);
};
jsloka.gl._GL.GL_Impl_.blendEquationSeparate = function(this1,modeRGB,modeAlpha) {
	this1.blendEquationSeparate(modeRGB,modeAlpha);
};
jsloka.gl._GL.GL_Impl_.blendFunc = function(this1,sfactor,dfactor) {
	this1.blendFunc(sfactor,dfactor);
};
jsloka.gl._GL.GL_Impl_.blendFuncSeparate = function(this1,srcRGB,dstRGB,srcAlpha,dstAlpha) {
	this1.blendFuncSeparate(srcRGB,dstRGB,srcAlpha,dstAlpha);
};
jsloka.gl._GL.GL_Impl_.bufferData = function(this1,target,data,usage) {
	this1.bufferData(target,data,usage);
};
jsloka.gl._GL.GL_Impl_.bufferSubData = function(this1,target,offset,data) {
	this1.bufferSubData(target,offset,data);
};
jsloka.gl._GL.GL_Impl_.checkFramebufferStatus = function(this1,target) {
	return this1.checkFramebufferStatus(target);
};
jsloka.gl._GL.GL_Impl_.clear = function(this1,mask) {
	this1.clear(mask);
};
jsloka.gl._GL.GL_Impl_.clearColor = function(this1,red,green,blue,alpha) {
	this1.clearColor(red,green,blue,alpha);
};
jsloka.gl._GL.GL_Impl_.clearDepth = function(this1,depth) {
	this1.clearDepth(depth);
};
jsloka.gl._GL.GL_Impl_.clearStencil = function(this1,s) {
	this1.clearStencil(s);
};
jsloka.gl._GL.GL_Impl_.colorMask = function(this1,red,green,blue,alpha) {
	this1.colorMask(red,green,blue,alpha);
};
jsloka.gl._GL.GL_Impl_.compileShader = function(this1,shader) {
	this1.compileShader(shader);
};
jsloka.gl._GL.GL_Impl_.compressedTexImage2D = function(this1,target,level,internalformat,width,height,border,data) {
	this1.compressedTexImage2D(target,level,internalformat,width,height,border,data);
};
jsloka.gl._GL.GL_Impl_.compressedTexSubImage2D = function(this1,target,level,xoffset,yoffset,width,height,format,data) {
	this1.compressedTexSubImage2D(target,level,xoffset,yoffset,width,height,format,data);
};
jsloka.gl._GL.GL_Impl_.copyTexImage2D = function(this1,target,level,internalformat,x,y,width,height,border) {
	this1.copyTexImage2D(target,level,internalformat,x,y,width,height,border);
};
jsloka.gl._GL.GL_Impl_.copyTexSubImage2D = function(this1,target,level,xoffset,yoffset,x,y,width,height) {
	this1.copyTexSubImage2D(target,level,xoffset,yoffset,x,y,width,height);
};
jsloka.gl._GL.GL_Impl_.createBuffer = function(this1) {
	return this1.createBuffer();
};
jsloka.gl._GL.GL_Impl_.createFramebuffer = function(this1) {
	return this1.createFramebuffer();
};
jsloka.gl._GL.GL_Impl_.createProgram = function(this1) {
	return this1.createProgram();
};
jsloka.gl._GL.GL_Impl_.createRenderbuffer = function(this1) {
	return this1.createRenderbuffer();
};
jsloka.gl._GL.GL_Impl_.createShader = function(this1,type) {
	return this1.createShader(type);
};
jsloka.gl._GL.GL_Impl_.createTexture = function(this1) {
	return this1.createTexture();
};
jsloka.gl._GL.GL_Impl_.cullFace = function(this1,mode) {
	this1.cullFace(mode);
};
jsloka.gl._GL.GL_Impl_.deleteBuffer = function(this1,buffer) {
	this1.deleteBuffer(buffer);
};
jsloka.gl._GL.GL_Impl_.deleteFramebuffer = function(this1,framebuffer) {
	this1.deleteFramebuffer(framebuffer);
};
jsloka.gl._GL.GL_Impl_.deleteProgram = function(this1,program) {
	this1.deleteProgram(program);
};
jsloka.gl._GL.GL_Impl_.deleteRenderbuffer = function(this1,renderbuffer) {
	this1.deleteRenderbuffer(renderbuffer);
};
jsloka.gl._GL.GL_Impl_.deleteShader = function(this1,shader) {
	this1.deleteShader(shader);
};
jsloka.gl._GL.GL_Impl_.deleteTexture = function(this1,texture) {
	this1.deleteTexture(texture);
};
jsloka.gl._GL.GL_Impl_.depthFunc = function(this1,func) {
	this1.depthFunc(func);
};
jsloka.gl._GL.GL_Impl_.depthMask = function(this1,flag) {
	this1.depthMask(flag);
};
jsloka.gl._GL.GL_Impl_.depthRange = function(this1,zNear,zFar) {
	this1.depthRange(zNear,zFar);
};
jsloka.gl._GL.GL_Impl_.detachShader = function(this1,program,shader) {
	this1.detachShader(program,shader);
};
jsloka.gl._GL.GL_Impl_.disable = function(this1,cap) {
	this1.disable(cap);
};
jsloka.gl._GL.GL_Impl_.disableVertexAttribArray = function(this1,index) {
	this1.disableVertexAttribArray(index);
};
jsloka.gl._GL.GL_Impl_.drawArrays = function(this1,mode,first,count) {
	this1.drawArrays(mode,first,count);
};
jsloka.gl._GL.GL_Impl_.drawElements = function(this1,mode,count,type,offset) {
	this1.drawElements(mode,count,type,offset);
};
jsloka.gl._GL.GL_Impl_.enable = function(this1,cap) {
	this1.enable(cap);
};
jsloka.gl._GL.GL_Impl_.enableVertexAttribArray = function(this1,index) {
	this1.enableVertexAttribArray(index);
};
jsloka.gl._GL.GL_Impl_.finish = function(this1) {
	this1.finish();
};
jsloka.gl._GL.GL_Impl_.flush = function(this1) {
	this1.flush();
};
jsloka.gl._GL.GL_Impl_.framebufferRenderbuffer = function(this1,target,attachment,renderbuffertarget,renderbuffer) {
	this1.framebufferRenderbuffer(target,attachment,renderbuffertarget,renderbuffer);
};
jsloka.gl._GL.GL_Impl_.framebufferTexture2D = function(this1,target,attachment,textarget,texture,level) {
	this1.framebufferTexture2D(target,attachment,textarget,texture,level);
};
jsloka.gl._GL.GL_Impl_.frontFace = function(this1,mode) {
	this1.frontFace(mode);
};
jsloka.gl._GL.GL_Impl_.generateMipmap = function(this1,target) {
	this1.generateMipmap(target);
};
jsloka.gl._GL.GL_Impl_.getActiveAttrib = function(this1,program,index) {
	return this1.getActiveAttrib(program,index);
};
jsloka.gl._GL.GL_Impl_.getActiveUniform = function(this1,program,index) {
	return this1.getActiveUniform(program,index);
};
jsloka.gl._GL.GL_Impl_.getAttachedShaders = function(this1,program) {
	return this1.getAttachedShaders(program);
};
jsloka.gl._GL.GL_Impl_.getAttribLocation = function(this1,program,name) {
	return this1.getAttribLocation(program,name);
};
jsloka.gl._GL.GL_Impl_.getBufferParameter = function(this1,target,pname) {
	return this1.getBufferParameter(target,pname);
};
jsloka.gl._GL.GL_Impl_.getContextAttributes = function(this1) {
	return this1.getContextAttributes();
};
jsloka.gl._GL.GL_Impl_.getError = function(this1) {
	return this1.getError();
};
jsloka.gl._GL.GL_Impl_.getExtension = function(this1,name) {
	return this1.getExtension(name);
};
jsloka.gl._GL.GL_Impl_.getFramebufferAttachmentParameter = function(this1,target,attachment,pname) {
	return this1.getFramebufferAttachmentParameter(target,attachment,pname);
};
jsloka.gl._GL.GL_Impl_.getParameter = function(this1,pname) {
	return this1.getParameter(pname);
};
jsloka.gl._GL.GL_Impl_.getProgramInfoLog = function(this1,program) {
	return this1.getProgramInfoLog(program);
};
jsloka.gl._GL.GL_Impl_.getProgramParameter = function(this1,program,pname) {
	return this1.getProgramParameter(program,pname);
};
jsloka.gl._GL.GL_Impl_.getRenderbufferParameter = function(this1,target,pname) {
	return this1.getRenderbufferParameter(target,pname);
};
jsloka.gl._GL.GL_Impl_.getShaderInfoLog = function(this1,shader) {
	return this1.getShaderInfoLog(shader);
};
jsloka.gl._GL.GL_Impl_.getShaderParameter = function(this1,shader,pname) {
	return this1.getShaderParameter(shader,pname);
};
jsloka.gl._GL.GL_Impl_.getShaderPrecisionFormat = function(this1,shadertype,precisiontype) {
	return this1.getShaderPrecisionFormat(shadertype,precisiontype);
};
jsloka.gl._GL.GL_Impl_.getShaderSource = function(this1,shader) {
	return this1.getShaderSource(shader);
};
jsloka.gl._GL.GL_Impl_.getSupportedExtensions = function(this1) {
	return this1.getSupportedExtensions();
};
jsloka.gl._GL.GL_Impl_.getTexParameter = function(this1,target,pname) {
	return this1.getTexParameter(target,pname);
};
jsloka.gl._GL.GL_Impl_.getUniform = function(this1,program,location) {
	return this1.getUniform(program,location);
};
jsloka.gl._GL.GL_Impl_.getUniformLocation = function(this1,program,name) {
	return this1.getUniformLocation(program,name);
};
jsloka.gl._GL.GL_Impl_.getVertexAttrib = function(this1,index,pname) {
	return this1.getVertexAttrib(index,pname);
};
jsloka.gl._GL.GL_Impl_.getVertexAttribOffset = function(this1,index,pname) {
	return this1.getVertexAttribOffset(index,pname);
};
jsloka.gl._GL.GL_Impl_.hint = function(this1,target,mode) {
	this1.hint(target,mode);
};
jsloka.gl._GL.GL_Impl_.isBuffer = function(this1,buffer) {
	return this1.isBuffer(buffer);
};
jsloka.gl._GL.GL_Impl_.isEnabled = function(this1,cap) {
	return this1.isEnabled(cap);
};
jsloka.gl._GL.GL_Impl_.isFramebuffer = function(this1,framebuffer) {
	return this1.isFramebuffer(framebuffer);
};
jsloka.gl._GL.GL_Impl_.isProgram = function(this1,program) {
	return this1.isProgram(program);
};
jsloka.gl._GL.GL_Impl_.isRenderbuffer = function(this1,renderbuffer) {
	return this1.isRenderbuffer(renderbuffer);
};
jsloka.gl._GL.GL_Impl_.isShader = function(this1,shader) {
	return this1.isShader(shader);
};
jsloka.gl._GL.GL_Impl_.isTexture = function(this1,texture) {
	return this1.isTexture(texture);
};
jsloka.gl._GL.GL_Impl_.lineWidth = function(this1,width) {
	this1.lineWidth(width);
};
jsloka.gl._GL.GL_Impl_.linkProgram = function(this1,program) {
	this1.linkProgram(program);
};
jsloka.gl._GL.GL_Impl_.pixelStorei = function(this1,pname,param) {
	this1.pixelStorei(pname,param);
};
jsloka.gl._GL.GL_Impl_.polygonOffset = function(this1,factor,units) {
	this1.polygonOffset(factor,units);
};
jsloka.gl._GL.GL_Impl_.readPixels = function(this1,x,y,width,height,format,type,pixels) {
	this1.readPixels(x,y,width,height,format,type,pixels);
};
jsloka.gl._GL.GL_Impl_.renderbufferStorage = function(this1,target,internalformat,width,height) {
	this1.renderbufferStorage(target,internalformat,width,height);
};
jsloka.gl._GL.GL_Impl_.sampleCoverage = function(this1,value,invert) {
	this1.sampleCoverage(value,invert);
};
jsloka.gl._GL.GL_Impl_.scissor = function(this1,x,y,width,height) {
	this1.scissor(x,y,width,height);
};
jsloka.gl._GL.GL_Impl_.shaderSource = function(this1,shader,source) {
	this1.shaderSource(shader,source);
};
jsloka.gl._GL.GL_Impl_.stencilFunc = function(this1,func,ref,mask) {
	this1.stencilFunc(func,ref,mask);
};
jsloka.gl._GL.GL_Impl_.stencilFuncSeparate = function(this1,face,func,ref,mask) {
	this1.stencilFuncSeparate(face,func,ref,mask);
};
jsloka.gl._GL.GL_Impl_.stencilMask = function(this1,mask) {
	this1.stencilMask(mask);
};
jsloka.gl._GL.GL_Impl_.stencilMaskSeparate = function(this1,face,mask) {
	this1.stencilMaskSeparate(face,mask);
};
jsloka.gl._GL.GL_Impl_.stencilOp = function(this1,fail,zfail,zpass) {
	this1.stencilOp(fail,zfail,zpass);
};
jsloka.gl._GL.GL_Impl_.stencilOpSeparate = function(this1,face,fail,zfail,zpass) {
	this1.stencilOpSeparate(face,fail,zfail,zpass);
};
jsloka.gl._GL.GL_Impl_.texImage2D = function(this1,target,level,internalformat,width,height,border,format,type,pixels) {
	this1.texImage2D(target,level,internalformat,width,height,border,format,type,pixels);
};
jsloka.gl._GL.GL_Impl_.texImage2DViaImage = function(this1,target,level,internalformat,format,type,image) {
	this1.texImage2D(target,level,internalformat,format,type,image);
};
jsloka.gl._GL.GL_Impl_.texImage2DViaVideo = function(this1,target,level,internalformat,format,type,video) {
	this1.texImage2D(target,level,internalformat,format,type,video);
};
jsloka.gl._GL.GL_Impl_.texParameterf = function(this1,target,pname,param) {
	this1.texParameterf(target,pname,param);
};
jsloka.gl._GL.GL_Impl_.texParameteri = function(this1,target,pname,param) {
	this1.texParameteri(target,pname,param);
};
jsloka.gl._GL.GL_Impl_.texSubImage2D = function(this1,target,level,xoffset,yoffset,width,height,format,type,pixels) {
	this1.texSubImage2D(target,level,xoffset,yoffset,width,height,format,type,pixels);
};
jsloka.gl._GL.GL_Impl_.uniform1f = function(this1,location,x) {
	this1.uniform1f(location,x);
};
jsloka.gl._GL.GL_Impl_.uniform1fv = function(this1,location,x) {
	this1.uniform1fv(location,x);
};
jsloka.gl._GL.GL_Impl_.uniform1i = function(this1,location,x) {
	this1.uniform1i(location,x);
};
jsloka.gl._GL.GL_Impl_.uniform1iv = function(this1,location,v) {
	this1.uniform1iv(location,v);
};
jsloka.gl._GL.GL_Impl_.uniform2f = function(this1,location,x,y) {
	this1.uniform2f(location,x,y);
};
jsloka.gl._GL.GL_Impl_.uniform2fv = function(this1,location,v) {
	this1.uniform2fv(location,v);
};
jsloka.gl._GL.GL_Impl_.uniform2i = function(this1,location,x,y) {
	this1.uniform2i(location,x,y);
};
jsloka.gl._GL.GL_Impl_.uniform2iv = function(this1,location,v) {
	this1.uniform2iv(location,v);
};
jsloka.gl._GL.GL_Impl_.uniform3f = function(this1,location,x,y,z) {
	this1.uniform3f(location,x,y,z);
};
jsloka.gl._GL.GL_Impl_.uniform3fv = function(this1,location,v) {
	this1.uniform3fv(location,v);
};
jsloka.gl._GL.GL_Impl_.uniform3i = function(this1,location,x,y,z) {
	this1.uniform3i(location,x,y,z);
};
jsloka.gl._GL.GL_Impl_.uniform3iv = function(this1,location,v) {
	this1.uniform3iv(location,v);
};
jsloka.gl._GL.GL_Impl_.uniform4f = function(this1,location,x,y,z,w) {
	this1.uniform4f(location,x,y,z,w);
};
jsloka.gl._GL.GL_Impl_.uniform4fv = function(this1,location,v) {
	this1.uniform4fv(location,v);
};
jsloka.gl._GL.GL_Impl_.uniform4i = function(this1,location,x,y,z,w) {
	this1.uniform4i(location,x,y,z,w);
};
jsloka.gl._GL.GL_Impl_.uniform4iv = function(this1,location,v) {
	this1.uniform4iv(location,v);
};
jsloka.gl._GL.GL_Impl_.uniformMatrix2fv = function(this1,location,transpose,v) {
	this1.uniformMatrix2fv(location,transpose,v);
};
jsloka.gl._GL.GL_Impl_.uniformMatrix3fv = function(this1,location,transpose,v) {
	this1.uniformMatrix3fv(location,transpose,v);
};
jsloka.gl._GL.GL_Impl_.uniformMatrix4fv = function(this1,location,transpose,v) {
	this1.uniformMatrix4fv(location,transpose,v);
};
jsloka.gl._GL.GL_Impl_.useProgram = function(this1,program) {
	this1.useProgram(program);
};
jsloka.gl._GL.GL_Impl_.validateProgram = function(this1,program) {
	this1.validateProgram(program);
};
jsloka.gl._GL.GL_Impl_.vertexAttrib1f = function(this1,indx,x) {
	this1.vertexAttrib1f(indx,x);
};
jsloka.gl._GL.GL_Impl_.vertexAttrib1fv = function(this1,indx,values) {
	this1.vertexAttrib1fv(indx,values);
};
jsloka.gl._GL.GL_Impl_.vertexAttrib2f = function(this1,indx,x,y) {
	this1.vertexAttrib2f(indx,x,y);
};
jsloka.gl._GL.GL_Impl_.vertexAttrib2fv = function(this1,indx,values) {
	this1.vertexAttrib2fv(indx,values);
};
jsloka.gl._GL.GL_Impl_.vertexAttrib3f = function(this1,indx,x,y,z) {
	this1.vertexAttrib3f(indx,x,y,z);
};
jsloka.gl._GL.GL_Impl_.vertexAttrib3fv = function(this1,indx,values) {
	this1.vertexAttrib3fv(indx,values);
};
jsloka.gl._GL.GL_Impl_.vertexAttrib4f = function(this1,indx,x,y,z,w) {
	this1.vertexAttrib4f(indx,x,y,z,w);
};
jsloka.gl._GL.GL_Impl_.vertexAttrib4fv = function(this1,indx,values) {
	this1.vertexAttrib4fv(indx,values);
};
jsloka.gl._GL.GL_Impl_.vertexAttribPointer = function(this1,indx,size,type,normalized,stride,offset) {
	this1.vertexAttribPointer(indx,size,type,normalized,stride,offset);
};
jsloka.gl._GL.GL_Impl_.viewport = function(this1,x,y,width,height) {
	this1.viewport(x,y,width,height);
};
var korrigan = {};
korrigan.OrthoCamera = function(gpu,width,height,option) {
	this._focusHeight = 400;
	this._focusWidth = 600;
	this._scale = 1;
	this._gpu = gpu;
	this._focusWidth = width;
	this._focusHeight = height;
	this._proj = (function($this) {
		var $r;
		var this1;
		this1 = new Float32Array(16);
		this1[0] = 1;
		this1[1] = 0;
		this1[2] = 0;
		this1[3] = 0;
		this1[4] = 0;
		this1[5] = 1;
		this1[6] = 0;
		this1[7] = 0;
		this1[8] = 0;
		this1[9] = 0;
		this1[10] = 1;
		this1[11] = 0;
		this1[12] = 0;
		this1[13] = 0;
		this1[14] = 0;
		this1[15] = 1;
		$r = this1;
		return $r;
	}(this));
	this._view = (function($this) {
		var $r;
		var this2;
		this2 = new Float32Array(16);
		this2[0] = 1;
		this2[1] = 0;
		this2[2] = 0;
		this2[3] = 0;
		this2[4] = 0;
		this2[5] = 1;
		this2[6] = 0;
		this2[7] = 0;
		this2[8] = 0;
		this2[9] = 0;
		this2[10] = 1;
		this2[11] = 0;
		this2[12] = 0;
		this2[13] = 0;
		this2[14] = 0;
		this2[15] = 1;
		$r = this2;
		return $r;
	}(this));
	this.viewproj = (function($this) {
		var $r;
		var this3;
		this3 = new Float32Array(16);
		this3[0] = 1;
		this3[1] = 0;
		this3[2] = 0;
		this3[3] = 0;
		this3[4] = 0;
		this3[5] = 1;
		this3[6] = 0;
		this3[7] = 0;
		this3[8] = 0;
		this3[9] = 0;
		this3[10] = 1;
		this3[11] = 0;
		this3[12] = 0;
		this3[13] = 0;
		this3[14] = 0;
		this3[15] = 1;
		$r = this3;
		return $r;
	}(this));
	var defaultOption = { scale : true};
	if(option != null) if(option.scale == null) option.scale = defaultOption.scale; else option.scale = option.scale; else option = defaultOption;
	this._option = option;
	this._gpu.setViewportChangeCallback($bind(this,this.onViewportChanged));
	this.onViewportChanged(this._gpu.viewportX,this._gpu.viewportY,this._gpu.viewportWidth,this._gpu.viewportHeight);
};
korrigan.OrthoCamera.__name__ = true;
korrigan.OrthoCamera.prototype = {
	onViewportChanged: function(x,y,width,height) {
		glmat._Mat4.Mat4_Impl_.ortho(this._proj,0,width,height,0,-1,1);
		var widthRatio = width / this._focusWidth;
		var heightRatio = height / this._focusHeight;
		if(this._option.scale) {
			if(widthRatio > heightRatio) this._scale = heightRatio; else this._scale = widthRatio;
		} else this._scale = 1;
		this._visibleWidth = width / this._scale;
		this._visibleHeight = height / this._scale;
	}
	,centerOn: function(x,y) {
		glmat._Mat4.Mat4_Impl_.identity(this._view);
		glmat._Mat4.Mat4_Impl_.scale(this._view,this._view,this._scale,this._scale,1);
		glmat._Mat4.Mat4_Impl_.translate(this._view,this._view,this._visibleWidth / 2 - x,this._visibleHeight / 2 - y,0);
		glmat._Mat4.Mat4_Impl_.multiply(this.viewproj,this._proj,this._view);
	}
	,toBufferCoordinates: function(vec3,out) {
		var m = this._view;
		var x = out[0];
		var y = out[1];
		var z = out[2];
		vec3[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
		vec3[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
		vec3[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
		out = vec3;
		out[0] + this._gpu.viewportX;
		out[1] + this._gpu.viewportY;
		return out;
	}
	,__class__: korrigan.OrthoCamera
};
var tink = {};
tink.core = {};
tink.core._Callback = {};
tink.core._Callback.Callback_Impl_ = {};
tink.core._Callback.Callback_Impl_.__name__ = true;
tink.core._Callback.Callback_Impl_._new = function(f) {
	return f;
};
tink.core._Callback.Callback_Impl_.invoke = function(this1,data) {
	this1(data);
};
tink.core._Callback.Callback_Impl_.fromNiladic = function(f) {
	return function(r) {
		f();
	};
};
tink.core._Callback.Callback_Impl_.fromMany = function(callbacks) {
	return function(v) {
		var _g = 0;
		while(_g < callbacks.length) {
			var callback = callbacks[_g];
			++_g;
			callback(v);
		}
	};
};
tink.core._Callback.CallbackLink_Impl_ = {};
tink.core._Callback.CallbackLink_Impl_.__name__ = true;
tink.core._Callback.CallbackLink_Impl_._new = function(link) {
	return link;
};
tink.core._Callback.CallbackLink_Impl_.dissolve = function(this1) {
	if(this1 != null) this1();
};
tink.core._Callback.CallbackLink_Impl_.toCallback = function(this1) {
	var f = this1;
	return function(r) {
		f();
	};
};
tink.core._Callback.CallbackLink_Impl_.fromFunction = function(f) {
	return f;
};
tink.core._Callback.CallbackLink_Impl_.fromMany = function(callbacks) {
	return function() {
		var _g = 0;
		while(_g < callbacks.length) {
			var cb = callbacks[_g];
			++_g;
			if(cb != null) cb();
		}
	};
};
tink.core._Callback.Cell = function() {
};
tink.core._Callback.Cell.__name__ = true;
tink.core._Callback.Cell.get = function() {
	if(tink.core._Callback.Cell.pool.length > 0) return tink.core._Callback.Cell.pool.pop(); else return new tink.core._Callback.Cell();
};
tink.core._Callback.Cell.prototype = {
	free: function() {
		this.cb = null;
		tink.core._Callback.Cell.pool.push(this);
	}
	,__class__: tink.core._Callback.Cell
};
tink.core._Callback.CallbackList_Impl_ = {};
tink.core._Callback.CallbackList_Impl_.__name__ = true;
tink.core._Callback.CallbackList_Impl_._new = function() {
	return [];
};
tink.core._Callback.CallbackList_Impl_.get_length = function(this1) {
	return this1.length;
};
tink.core._Callback.CallbackList_Impl_.add = function(this1,cb) {
	var cell;
	if(tink.core._Callback.Cell.pool.length > 0) cell = tink.core._Callback.Cell.pool.pop(); else cell = new tink.core._Callback.Cell();
	cell.cb = cb;
	this1.push(cell);
	return function() {
		if(HxOverrides.remove(this1,cell)) {
			cell.cb = null;
			tink.core._Callback.Cell.pool.push(cell);
		}
		cell = null;
	};
};
tink.core._Callback.CallbackList_Impl_.invoke = function(this1,data) {
	var _g = 0;
	var _g1 = this1.slice();
	while(_g < _g1.length) {
		var cell = _g1[_g];
		++_g;
		if(cell.cb != null) cell.cb(data);
	}
};
tink.core._Callback.CallbackList_Impl_.clear = function(this1) {
	var _g = 0;
	var _g1 = this1.splice(0,this1.length);
	while(_g < _g1.length) {
		var cell = _g1[_g];
		++_g;
		cell.cb = null;
		tink.core._Callback.Cell.pool.push(cell);
	}
};
tink.core.Either = { __ename__ : true, __constructs__ : ["Left","Right"] };
tink.core.Either.Left = function(a) { var $x = ["Left",0,a]; $x.__enum__ = tink.core.Either; return $x; };
tink.core.Either.Right = function(b) { var $x = ["Right",1,b]; $x.__enum__ = tink.core.Either; return $x; };
tink.core.TypedError = function(code,message,pos) {
	if(code == null) code = 500;
	this.code = code;
	this.message = message;
	this.pos = pos;
};
tink.core.TypedError.__name__ = true;
tink.core.TypedError.withData = function(code,message,data,pos) {
	if(code == null) code = 500;
	var ret = new tink.core.TypedError(code,message,pos);
	ret.data = data;
	return ret;
};
tink.core.TypedError.prototype = {
	printPos: function() {
		return this.pos.className + "." + this.pos.methodName + ":" + this.pos.lineNumber;
	}
	,toString: function() {
		var ret = "Error: " + this.message;
		if(this.pos != null) ret += " " + this.printPos();
		return ret;
	}
	,throwSelf: function() {
		throw this;
	}
	,__class__: tink.core.TypedError
};
tink.core._Future = {};
tink.core._Future.Future_Impl_ = {};
tink.core._Future.Future_Impl_.__name__ = true;
tink.core._Future.Future_Impl_._new = function(f) {
	return f;
};
tink.core._Future.Future_Impl_.handle = function(this1,callback) {
	return this1(callback);
};
tink.core._Future.Future_Impl_.gather = function(this1) {
	var op = new tink.core.FutureTrigger();
	var self = this1;
	return tink.core._Future.Future_Impl_._new(function(cb) {
		if(self != null) {
			this1($bind(op,op.trigger));
			self = null;
		}
		return op.future(cb);
	});
};
tink.core._Future.Future_Impl_.first = function(this1,other) {
	return tink.core._Future.Future_Impl_.async(function(cb) {
		this1(cb);
		other(cb);
	});
};
tink.core._Future.Future_Impl_.map = function(this1,f,gather) {
	if(gather == null) gather = true;
	var ret = tink.core._Future.Future_Impl_._new(function(callback) {
		return this1(function(result) {
			var data = f(result);
			callback(data);
		});
	});
	if(gather) return tink.core._Future.Future_Impl_.gather(ret); else return ret;
};
tink.core._Future.Future_Impl_.flatMap = function(this1,next,gather) {
	if(gather == null) gather = true;
	var ret = tink.core._Future.Future_Impl_.flatten(tink.core._Future.Future_Impl_.map(this1,next,gather));
	if(gather) return tink.core._Future.Future_Impl_.gather(ret); else return ret;
};
tink.core._Future.Future_Impl_.merge = function(this1,other,merger,gather) {
	if(gather == null) gather = true;
	return tink.core._Future.Future_Impl_.flatMap(this1,function(t) {
		return tink.core._Future.Future_Impl_.map(other,function(a) {
			return merger(t,a);
		},false);
	},gather);
};
tink.core._Future.Future_Impl_.flatten = function(f) {
	return tink.core._Future.Future_Impl_._new(function(callback) {
		var ret = null;
		ret = f(function(next) {
			ret = next(function(result) {
				callback(result);
			});
		});
		return ret;
	});
};
tink.core._Future.Future_Impl_.fromTrigger = function(trigger) {
	return trigger.future;
};
tink.core._Future.Future_Impl_.ofMany = function(futures,gather) {
	if(gather == null) gather = true;
	var ret = tink.core._Future.Future_Impl_.sync([]);
	var _g = 0;
	while(_g < futures.length) {
		var f = [futures[_g]];
		++_g;
		ret = tink.core._Future.Future_Impl_.flatMap(ret,(function(f) {
			return function(results) {
				return tink.core._Future.Future_Impl_.map(f[0],(function() {
					return function(result) {
						return results.concat([result]);
					};
				})(),false);
			};
		})(f),false);
	}
	if(gather) return tink.core._Future.Future_Impl_.gather(ret); else return ret;
};
tink.core._Future.Future_Impl_.fromMany = function(futures) {
	return tink.core._Future.Future_Impl_.ofMany(futures);
};
tink.core._Future.Future_Impl_.lazy = function(l) {
	return tink.core._Future.Future_Impl_._new(function(cb) {
		var data = l();
		cb(data);
		return null;
	});
};
tink.core._Future.Future_Impl_.sync = function(v) {
	return tink.core._Future.Future_Impl_._new(function(callback) {
		callback(v);
		return null;
	});
};
tink.core._Future.Future_Impl_.async = function(f,lazy) {
	if(lazy == null) lazy = false;
	if(lazy) return tink.core._Future.Future_Impl_.flatten(tink.core._Future.Future_Impl_.lazy(tink.core._Lazy.Lazy_Impl_.ofFunc((function(f1,f2,a1) {
		return function() {
			return f1(f2,a1);
		};
	})(tink.core._Future.Future_Impl_.async,f,false)))); else {
		var op = new tink.core.FutureTrigger();
		f($bind(op,op.trigger));
		return op.future;
	}
};
tink.core._Future.Future_Impl_.or = function(a,b) {
	return tink.core._Future.Future_Impl_.first(a,b);
};
tink.core._Future.Future_Impl_.either = function(a,b) {
	return tink.core._Future.Future_Impl_.first(tink.core._Future.Future_Impl_.map(a,tink.core.Either.Left,false),tink.core._Future.Future_Impl_.map(b,tink.core.Either.Right,false));
};
tink.core._Future.Future_Impl_.and = function(a,b) {
	return tink.core._Future.Future_Impl_.merge(a,b,function(a1,b1) {
		return { a : a1, b : b1};
	});
};
tink.core._Future.Future_Impl_._tryFailingFlatMap = function(f,map) {
	return tink.core._Future.Future_Impl_.flatMap(f,function(o) {
		switch(o[1]) {
		case 0:
			var d = o[2];
			return map(d);
		case 1:
			var f1 = o[2];
			return tink.core._Future.Future_Impl_.sync(tink.core.Outcome.Failure(f1));
		}
	});
};
tink.core._Future.Future_Impl_._tryFlatMap = function(f,map) {
	return tink.core._Future.Future_Impl_.flatMap(f,function(o) {
		switch(o[1]) {
		case 0:
			var d = o[2];
			return tink.core._Future.Future_Impl_.map(map(d),tink.core.Outcome.Success);
		case 1:
			var f1 = o[2];
			return tink.core._Future.Future_Impl_.sync(tink.core.Outcome.Failure(f1));
		}
	});
};
tink.core._Future.Future_Impl_._tryFailingMap = function(f,map) {
	return tink.core._Future.Future_Impl_.map(f,function(o) {
		return tink.core.OutcomeTools.flatMap(o,tink.core._Outcome.OutcomeMapper_Impl_.withSameError(map));
	});
};
tink.core._Future.Future_Impl_._tryMap = function(f,map) {
	return tink.core._Future.Future_Impl_.map(f,function(o) {
		return tink.core.OutcomeTools.map(o,map);
	});
};
tink.core._Future.Future_Impl_._flatMap = function(f,map) {
	return tink.core._Future.Future_Impl_.flatMap(f,map);
};
tink.core._Future.Future_Impl_._map = function(f,map) {
	return tink.core._Future.Future_Impl_.map(f,map);
};
tink.core._Future.Future_Impl_.trigger = function() {
	return new tink.core.FutureTrigger();
};
tink.core.FutureTrigger = function() {
	var _g = this;
	this.list = [];
	this.future = tink.core._Future.Future_Impl_._new(function(callback) {
		if(_g.list == null) {
			callback(_g.result);
			return null;
		} else return tink.core._Callback.CallbackList_Impl_.add(_g.list,callback);
	});
};
tink.core.FutureTrigger.__name__ = true;
tink.core.FutureTrigger.prototype = {
	asFuture: function() {
		return this.future;
	}
	,trigger: function(result) {
		if(this.list == null) return false; else {
			var list = this.list;
			this.list = null;
			this.result = result;
			tink.core._Callback.CallbackList_Impl_.invoke(list,result);
			tink.core._Callback.CallbackList_Impl_.clear(list);
			return true;
		}
	}
	,__class__: tink.core.FutureTrigger
};
tink.core._Lazy = {};
tink.core._Lazy.Lazy_Impl_ = {};
tink.core._Lazy.Lazy_Impl_.__name__ = true;
tink.core._Lazy.Lazy_Impl_._new = function(r) {
	return r;
};
tink.core._Lazy.Lazy_Impl_.get = function(this1) {
	return this1();
};
tink.core._Lazy.Lazy_Impl_.ofFunc = function(f) {
	var result = null;
	var busy = false;
	return function() {
		if(busy) throw new tink.core.TypedError(null,"circular lazyness",{ fileName : "Lazy.hx", lineNumber : 14, className : "tink.core._Lazy.Lazy_Impl_", methodName : "ofFunc"});
		if(f != null) {
			busy = true;
			result = f();
			f = null;
			busy = false;
		}
		return result;
	};
};
tink.core._Lazy.Lazy_Impl_.map = function(this1,f) {
	return tink.core._Lazy.Lazy_Impl_.ofFunc(function() {
		return f(this1());
	});
};
tink.core._Lazy.Lazy_Impl_.flatMap = function(this1,f) {
	return tink.core._Lazy.Lazy_Impl_.ofFunc(function() {
		var this2 = f(this1());
		return this2();
	});
};
tink.core._Lazy.Lazy_Impl_.ofConst = function(c) {
	return function() {
		return c;
	};
};
tink.core.Outcome = { __ename__ : true, __constructs__ : ["Success","Failure"] };
tink.core.Outcome.Success = function(data) { var $x = ["Success",0,data]; $x.__enum__ = tink.core.Outcome; return $x; };
tink.core.Outcome.Failure = function(failure) { var $x = ["Failure",1,failure]; $x.__enum__ = tink.core.Outcome; return $x; };
tink.core.OutcomeTools = function() { };
tink.core.OutcomeTools.__name__ = true;
tink.core.OutcomeTools.sure = function(outcome) {
	switch(outcome[1]) {
	case 0:
		var data = outcome[2];
		return data;
	case 1:
		var failure = outcome[2];
		if(js.Boot.__instanceof(failure,tink.core.TypedError)) return failure.throwSelf(); else throw failure;
		break;
	}
};
tink.core.OutcomeTools.toOption = function(outcome) {
	switch(outcome[1]) {
	case 0:
		var data = outcome[2];
		return haxe.ds.Option.Some(data);
	case 1:
		return haxe.ds.Option.None;
	}
};
tink.core.OutcomeTools.toOutcome = function(option,pos) {
	switch(option[1]) {
	case 0:
		var value = option[2];
		return tink.core.Outcome.Success(value);
	case 1:
		return tink.core.Outcome.Failure(new tink.core.TypedError(404,"Some value expected but none found in " + pos.fileName + "@line " + pos.lineNumber,{ fileName : "Outcome.hx", lineNumber : 37, className : "tink.core.OutcomeTools", methodName : "toOutcome"}));
	}
};
tink.core.OutcomeTools.orUse = function(outcome,fallback) {
	switch(outcome[1]) {
	case 0:
		var data = outcome[2];
		return data;
	case 1:
		return fallback();
	}
};
tink.core.OutcomeTools.orTry = function(outcome,fallback) {
	switch(outcome[1]) {
	case 0:
		return outcome;
	case 1:
		return fallback();
	}
};
tink.core.OutcomeTools.equals = function(outcome,to) {
	switch(outcome[1]) {
	case 0:
		var data = outcome[2];
		return data == to;
	case 1:
		return false;
	}
};
tink.core.OutcomeTools.map = function(outcome,transform) {
	switch(outcome[1]) {
	case 0:
		var a = outcome[2];
		return tink.core.Outcome.Success(transform(a));
	case 1:
		var f = outcome[2];
		return tink.core.Outcome.Failure(f);
	}
};
tink.core.OutcomeTools.isSuccess = function(outcome) {
	switch(outcome[1]) {
	case 0:
		return true;
	default:
		return false;
	}
};
tink.core.OutcomeTools.flatMap = function(o,mapper) {
	return tink.core._Outcome.OutcomeMapper_Impl_.apply(mapper,o);
};
tink.core._Outcome = {};
tink.core._Outcome.OutcomeMapper_Impl_ = {};
tink.core._Outcome.OutcomeMapper_Impl_.__name__ = true;
tink.core._Outcome.OutcomeMapper_Impl_._new = function(f) {
	return { f : f};
};
tink.core._Outcome.OutcomeMapper_Impl_.apply = function(this1,o) {
	return this1.f(o);
};
tink.core._Outcome.OutcomeMapper_Impl_.withSameError = function(f) {
	return tink.core._Outcome.OutcomeMapper_Impl_._new(function(o) {
		switch(o[1]) {
		case 0:
			var d = o[2];
			return f(d);
		case 1:
			var f1 = o[2];
			return tink.core.Outcome.Failure(f1);
		}
	});
};
tink.core._Outcome.OutcomeMapper_Impl_.withEitherError = function(f) {
	return tink.core._Outcome.OutcomeMapper_Impl_._new(function(o) {
		switch(o[1]) {
		case 0:
			var d = o[2];
			{
				var _g = f(d);
				switch(_g[1]) {
				case 0:
					var d1 = _g[2];
					return tink.core.Outcome.Success(d1);
				case 1:
					var f1 = _g[2];
					return tink.core.Outcome.Failure(tink.core.Either.Right(f1));
				}
			}
			break;
		case 1:
			var f2 = o[2];
			return tink.core.Outcome.Failure(tink.core.Either.Left(f2));
		}
	});
};
tink.core._Pair = {};
tink.core._Pair.Pair_Impl_ = {};
tink.core._Pair.Pair_Impl_.__name__ = true;
tink.core._Pair.Pair_Impl_._new = function(a,b) {
	return { a : a, b : b};
};
tink.core._Pair.Pair_Impl_.get_a = function(this1) {
	return this1.a;
};
tink.core._Pair.Pair_Impl_.get_b = function(this1) {
	return this1.b;
};
tink.core._Pair.Pair_Impl_.toBool = function(this1) {
	return this1 != null;
};
tink.core._Pair.Pair_Impl_.isNil = function(this1) {
	return this1 == null;
};
tink.core._Pair.Pair_Impl_.nil = function() {
	return null;
};
tink.core._Pair.MPair_Impl_ = {};
tink.core._Pair.MPair_Impl_.__name__ = true;
tink.core._Pair.MPair_Impl_._new = function(a,b) {
	return { a : a, b : b};
};
tink.core._Pair.MPair_Impl_.get_a = function(this1) {
	return this1.a;
};
tink.core._Pair.MPair_Impl_.get_b = function(this1) {
	return this1.b;
};
tink.core._Pair.MPair_Impl_.set_a = function(this1,v) {
	return this1.a = v;
};
tink.core._Pair.MPair_Impl_.set_b = function(this1,v) {
	return this1.b = v;
};
var tri = {};
tri.SimpleTexturedProgram = function(gl,nativeProgram) {
	this._position_shaderLocation = 0;
	this._texCoords_shaderLocation = 0;
	this._tex_shaderLocation = null;
	this._viewproj_shaderLocation = null;
	this._nativeProgram = null;
	this._gl = null;
	this._nativeProgram = nativeProgram;
	this._gl = gl;
	this._viewproj_shaderLocation = this._gl.getUniformLocation(this._nativeProgram,"viewproj");
	this._tex_shaderLocation = this._gl.getUniformLocation(this._nativeProgram,"tex");
	this._texCoords_shaderLocation = this._gl.getAttribLocation(this._nativeProgram,"texCoords");
	this._position_shaderLocation = this._gl.getAttribLocation(this._nativeProgram,"position");
};
tri.SimpleTexturedProgram.__name__ = true;
tri.SimpleTexturedProgram.__interfaces__ = [glee.GPUProgram];
tri.SimpleTexturedProgram.upload = function(gpu) {
	var program = glee.GPUProgramUtil.upload(gpu.gl,"uniform mat4 viewproj;\r\nattribute vec3 position;\r\nattribute vec2 texCoords;\r\nvarying vec2 vTextureCoord;\r\n\r\nvoid main(void) {\r\n\tvTextureCoord = texCoords;\r\n    gl_Position = viewproj * vec4(position,1.0);\r\n}","precision mediump float;\r\nuniform sampler2D tex;\r\nvarying vec2 vTextureCoord;\r\n\r\nvoid main(void)\r\n{\r\n   gl_FragColor = texture2D (tex, vTextureCoord).rgba;\r\n}\r\n");
	return new tri.SimpleTexturedProgram(gpu.gl,program);
};
tri.SimpleTexturedProgram.prototype = {
	set_viewproj: function(mat) {
		this._gl.useProgram(this._nativeProgram);
		this._gl.uniformMatrix4fv(this._viewproj_shaderLocation,false,mat);
	}
	,set_tex: function(texture) {
		this._gl.useProgram(this._nativeProgram);
		this._gl.activeTexture(33984);
		this._gl.bindTexture(3553,texture.nativeTexture);
		this._gl.uniform1i(this._tex_shaderLocation,0);
	}
	,draw: function(buffer) {
		this._gl.useProgram(this._nativeProgram);
		this._gl.bindBuffer(34962,buffer.nativeBuffer);
		this._gl.enableVertexAttribArray(this._texCoords_shaderLocation);
		this._gl.vertexAttribPointer(this._texCoords_shaderLocation,2,5126,false,20,0);
		this._gl.enableVertexAttribArray(this._position_shaderLocation);
		this._gl.vertexAttribPointer(this._position_shaderLocation,3,5126,false,20,8);
		if(!buffer.uploaded) buffer.upload();
		this._gl.bindBuffer(34962,buffer.nativeBuffer);
		var count = buffer.getNumVerticesWritten();
		this._gl.drawArrays(4,0,count);
		this._gl.useProgram(null);
	}
	,__class__: tri.SimpleTexturedProgram
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
VideoTest.FOCUS_WIDTH = 1200;
VideoTest.FOCUS_HEIGHT = 400;
boot.Assets.textLoader = new boot.TextLoader();
boot.Assets.imageLoader = new boot.ImageLoader();
glmat._Mat4.Mat4_Impl_.GLMAT_EPSILON = 0.1;
js.Boot.__toStr = {}.toString;
jsloka.gl._GL.GL_Impl_.DEPTH_BUFFER_BIT = 256;
jsloka.gl._GL.GL_Impl_.STENCIL_BUFFER_BIT = 1024;
jsloka.gl._GL.GL_Impl_.COLOR_BUFFER_BIT = 16384;
jsloka.gl._GL.GL_Impl_.POINTS = 0;
jsloka.gl._GL.GL_Impl_.LINES = 1;
jsloka.gl._GL.GL_Impl_.LINE_LOOP = 2;
jsloka.gl._GL.GL_Impl_.LINE_STRIP = 3;
jsloka.gl._GL.GL_Impl_.TRIANGLES = 4;
jsloka.gl._GL.GL_Impl_.TRIANGLE_STRIP = 5;
jsloka.gl._GL.GL_Impl_.TRIANGLE_FAN = 6;
jsloka.gl._GL.GL_Impl_.ZERO = 0;
jsloka.gl._GL.GL_Impl_.ONE = 1;
jsloka.gl._GL.GL_Impl_.SRC_COLOR = 768;
jsloka.gl._GL.GL_Impl_.ONE_MINUS_SRC_COLOR = 769;
jsloka.gl._GL.GL_Impl_.SRC_ALPHA = 770;
jsloka.gl._GL.GL_Impl_.ONE_MINUS_SRC_ALPHA = 771;
jsloka.gl._GL.GL_Impl_.DST_ALPHA = 772;
jsloka.gl._GL.GL_Impl_.ONE_MINUS_DST_ALPHA = 773;
jsloka.gl._GL.GL_Impl_.DST_COLOR = 774;
jsloka.gl._GL.GL_Impl_.ONE_MINUS_DST_COLOR = 775;
jsloka.gl._GL.GL_Impl_.SRC_ALPHA_SATURATE = 776;
jsloka.gl._GL.GL_Impl_.FUNC_ADD = 32774;
jsloka.gl._GL.GL_Impl_.BLEND_EQUATION = 32777;
jsloka.gl._GL.GL_Impl_.BLEND_EQUATION_RGB = 32777;
jsloka.gl._GL.GL_Impl_.BLEND_EQUATION_ALPHA = 34877;
jsloka.gl._GL.GL_Impl_.FUNC_SUBTRACT = 32778;
jsloka.gl._GL.GL_Impl_.FUNC_REVERSE_SUBTRACT = 32779;
jsloka.gl._GL.GL_Impl_.BLEND_DST_RGB = 32968;
jsloka.gl._GL.GL_Impl_.BLEND_SRC_RGB = 32969;
jsloka.gl._GL.GL_Impl_.BLEND_DST_ALPHA = 32970;
jsloka.gl._GL.GL_Impl_.BLEND_SRC_ALPHA = 32971;
jsloka.gl._GL.GL_Impl_.CONSTANT_COLOR = 32769;
jsloka.gl._GL.GL_Impl_.ONE_MINUS_CONSTANT_COLOR = 32770;
jsloka.gl._GL.GL_Impl_.CONSTANT_ALPHA = 32771;
jsloka.gl._GL.GL_Impl_.ONE_MINUS_CONSTANT_ALPHA = 32772;
jsloka.gl._GL.GL_Impl_.BLEND_COLOR = 32773;
jsloka.gl._GL.GL_Impl_.ARRAY_BUFFER = 34962;
jsloka.gl._GL.GL_Impl_.ELEMENT_ARRAY_BUFFER = 34963;
jsloka.gl._GL.GL_Impl_.ARRAY_BUFFER_BINDING = 34964;
jsloka.gl._GL.GL_Impl_.ELEMENT_ARRAY_BUFFER_BINDING = 34965;
jsloka.gl._GL.GL_Impl_.STREAM_DRAW = 35040;
jsloka.gl._GL.GL_Impl_.STATIC_DRAW = 35044;
jsloka.gl._GL.GL_Impl_.DYNAMIC_DRAW = 35048;
jsloka.gl._GL.GL_Impl_.BUFFER_SIZE = 34660;
jsloka.gl._GL.GL_Impl_.BUFFER_USAGE = 34661;
jsloka.gl._GL.GL_Impl_.CURRENT_VERTEX_ATTRIB = 34342;
jsloka.gl._GL.GL_Impl_.FRONT = 1028;
jsloka.gl._GL.GL_Impl_.BACK = 1029;
jsloka.gl._GL.GL_Impl_.FRONT_AND_BACK = 1032;
jsloka.gl._GL.GL_Impl_.CULL_FACE = 2884;
jsloka.gl._GL.GL_Impl_.BLEND = 3042;
jsloka.gl._GL.GL_Impl_.DITHER = 3024;
jsloka.gl._GL.GL_Impl_.STENCIL_TEST = 2960;
jsloka.gl._GL.GL_Impl_.DEPTH_TEST = 2929;
jsloka.gl._GL.GL_Impl_.SCISSOR_TEST = 3089;
jsloka.gl._GL.GL_Impl_.POLYGON_OFFSET_FILL = 32823;
jsloka.gl._GL.GL_Impl_.SAMPLE_ALPHA_TO_COVERAGE = 32926;
jsloka.gl._GL.GL_Impl_.SAMPLE_COVERAGE = 32928;
jsloka.gl._GL.GL_Impl_.NO_ERROR = 0;
jsloka.gl._GL.GL_Impl_.INVALID_ENUM = 1280;
jsloka.gl._GL.GL_Impl_.INVALID_VALUE = 1281;
jsloka.gl._GL.GL_Impl_.INVALID_OPERATION = 1282;
jsloka.gl._GL.GL_Impl_.OUT_OF_MEMORY = 1285;
jsloka.gl._GL.GL_Impl_.CW = 2304;
jsloka.gl._GL.GL_Impl_.CCW = 2305;
jsloka.gl._GL.GL_Impl_.LINE_WIDTH = 2849;
jsloka.gl._GL.GL_Impl_.ALIASED_POINT_SIZE_RANGE = 33901;
jsloka.gl._GL.GL_Impl_.ALIASED_LINE_WIDTH_RANGE = 33902;
jsloka.gl._GL.GL_Impl_.CULL_FACE_MODE = 2885;
jsloka.gl._GL.GL_Impl_.FRONT_FACE = 2886;
jsloka.gl._GL.GL_Impl_.DEPTH_RANGE = 2928;
jsloka.gl._GL.GL_Impl_.DEPTH_WRITEMASK = 2930;
jsloka.gl._GL.GL_Impl_.DEPTH_CLEAR_VALUE = 2931;
jsloka.gl._GL.GL_Impl_.DEPTH_FUNC = 2932;
jsloka.gl._GL.GL_Impl_.STENCIL_CLEAR_VALUE = 2961;
jsloka.gl._GL.GL_Impl_.STENCIL_FUNC = 2962;
jsloka.gl._GL.GL_Impl_.STENCIL_FAIL = 2964;
jsloka.gl._GL.GL_Impl_.STENCIL_PASS_DEPTH_FAIL = 2965;
jsloka.gl._GL.GL_Impl_.STENCIL_PASS_DEPTH_PASS = 2966;
jsloka.gl._GL.GL_Impl_.STENCIL_REF = 2967;
jsloka.gl._GL.GL_Impl_.STENCIL_VALUE_MASK = 2963;
jsloka.gl._GL.GL_Impl_.STENCIL_WRITEMASK = 2968;
jsloka.gl._GL.GL_Impl_.STENCIL_BACK_FUNC = 34816;
jsloka.gl._GL.GL_Impl_.STENCIL_BACK_FAIL = 34817;
jsloka.gl._GL.GL_Impl_.STENCIL_BACK_PASS_DEPTH_FAIL = 34818;
jsloka.gl._GL.GL_Impl_.STENCIL_BACK_PASS_DEPTH_PASS = 34819;
jsloka.gl._GL.GL_Impl_.STENCIL_BACK_REF = 36003;
jsloka.gl._GL.GL_Impl_.STENCIL_BACK_VALUE_MASK = 36004;
jsloka.gl._GL.GL_Impl_.STENCIL_BACK_WRITEMASK = 36005;
jsloka.gl._GL.GL_Impl_.VIEWPORT = 2978;
jsloka.gl._GL.GL_Impl_.SCISSOR_loka = 3088;
jsloka.gl._GL.GL_Impl_.COLOR_CLEAR_VALUE = 3106;
jsloka.gl._GL.GL_Impl_.COLOR_WRITEMASK = 3107;
jsloka.gl._GL.GL_Impl_.UNPACK_ALIGNMENT = 3317;
jsloka.gl._GL.GL_Impl_.PACK_ALIGNMENT = 3333;
jsloka.gl._GL.GL_Impl_.MAX_TEXTURE_SIZE = 3379;
jsloka.gl._GL.GL_Impl_.MAX_VIEWPORT_DIMS = 3386;
jsloka.gl._GL.GL_Impl_.SUBPIXEL_BITS = 3408;
jsloka.gl._GL.GL_Impl_.RED_BITS = 3410;
jsloka.gl._GL.GL_Impl_.GREEN_BITS = 3411;
jsloka.gl._GL.GL_Impl_.BLUE_BITS = 3412;
jsloka.gl._GL.GL_Impl_.ALPHA_BITS = 3413;
jsloka.gl._GL.GL_Impl_.DEPTH_BITS = 3414;
jsloka.gl._GL.GL_Impl_.STENCIL_BITS = 3415;
jsloka.gl._GL.GL_Impl_.POLYGON_OFFSET_UNITS = 10752;
jsloka.gl._GL.GL_Impl_.POLYGON_OFFSET_FACTOR = 32824;
jsloka.gl._GL.GL_Impl_.TEXTURE_BINDING_2D = 32873;
jsloka.gl._GL.GL_Impl_.SAMPLE_BUFFERS = 32936;
jsloka.gl._GL.GL_Impl_.SAMPLES = 32937;
jsloka.gl._GL.GL_Impl_.SAMPLE_COVERAGE_VALUE = 32938;
jsloka.gl._GL.GL_Impl_.SAMPLE_COVERAGE_INVERT = 32939;
jsloka.gl._GL.GL_Impl_.COMPRESSED_TEXTURE_FORMATS = 34467;
jsloka.gl._GL.GL_Impl_.DONT_CARE = 4352;
jsloka.gl._GL.GL_Impl_.FASTEST = 4353;
jsloka.gl._GL.GL_Impl_.NICEST = 4354;
jsloka.gl._GL.GL_Impl_.GENERATE_MIPMAP_HINT = 33170;
jsloka.gl._GL.GL_Impl_.BYTE = 5120;
jsloka.gl._GL.GL_Impl_.UNSIGNED_BYTE = 5121;
jsloka.gl._GL.GL_Impl_.SHORT = 5122;
jsloka.gl._GL.GL_Impl_.UNSIGNED_SHORT = 5123;
jsloka.gl._GL.GL_Impl_.INT = 5124;
jsloka.gl._GL.GL_Impl_.UNSIGNED_INT = 5125;
jsloka.gl._GL.GL_Impl_.FLOAT = 5126;
jsloka.gl._GL.GL_Impl_.DEPTH_COMPONENT = 6402;
jsloka.gl._GL.GL_Impl_.ALPHA = 6406;
jsloka.gl._GL.GL_Impl_.RGB = 6407;
jsloka.gl._GL.GL_Impl_.RGBA = 6408;
jsloka.gl._GL.GL_Impl_.LUMINANCE = 6409;
jsloka.gl._GL.GL_Impl_.LUMINANCE_ALPHA = 6410;
jsloka.gl._GL.GL_Impl_.UNSIGNED_SHORT_4_4_4_4 = 32819;
jsloka.gl._GL.GL_Impl_.UNSIGNED_SHORT_5_5_5_1 = 32820;
jsloka.gl._GL.GL_Impl_.UNSIGNED_SHORT_5_6_5 = 33635;
jsloka.gl._GL.GL_Impl_.FRAGMENT_SHADER = 35632;
jsloka.gl._GL.GL_Impl_.VERTEX_SHADER = 35633;
jsloka.gl._GL.GL_Impl_.MAX_VERTEX_ATTRIBS = 34921;
jsloka.gl._GL.GL_Impl_.MAX_VERTEX_UNIFORM_VECTORS = 36347;
jsloka.gl._GL.GL_Impl_.MAX_VARYING_VECTORS = 36348;
jsloka.gl._GL.GL_Impl_.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661;
jsloka.gl._GL.GL_Impl_.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660;
jsloka.gl._GL.GL_Impl_.MAX_TEXTURE_IMAGE_UNITS = 34930;
jsloka.gl._GL.GL_Impl_.MAX_FRAGMENT_UNIFORM_VECTORS = 36349;
jsloka.gl._GL.GL_Impl_.SHADER_TYPE = 35663;
jsloka.gl._GL.GL_Impl_.DELETE_STATUS = 35712;
jsloka.gl._GL.GL_Impl_.LINK_STATUS = 35714;
jsloka.gl._GL.GL_Impl_.VALIDATE_STATUS = 35715;
jsloka.gl._GL.GL_Impl_.ATTACHED_SHADERS = 35717;
jsloka.gl._GL.GL_Impl_.ACTIVE_UNIFORMS = 35718;
jsloka.gl._GL.GL_Impl_.ACTIVE_ATTRIBUTES = 35721;
jsloka.gl._GL.GL_Impl_.SHADING_LANGUAGE_VERSION = 35724;
jsloka.gl._GL.GL_Impl_.CURRENT_PROGRAM = 35725;
jsloka.gl._GL.GL_Impl_.NEVER = 512;
jsloka.gl._GL.GL_Impl_.LESS = 513;
jsloka.gl._GL.GL_Impl_.EQUAL = 514;
jsloka.gl._GL.GL_Impl_.LEQUAL = 515;
jsloka.gl._GL.GL_Impl_.GREATER = 516;
jsloka.gl._GL.GL_Impl_.NOTEQUAL = 517;
jsloka.gl._GL.GL_Impl_.GEQUAL = 518;
jsloka.gl._GL.GL_Impl_.ALWAYS = 519;
jsloka.gl._GL.GL_Impl_.KEEP = 7680;
jsloka.gl._GL.GL_Impl_.REPLACE = 7681;
jsloka.gl._GL.GL_Impl_.INCR = 7682;
jsloka.gl._GL.GL_Impl_.DECR = 7683;
jsloka.gl._GL.GL_Impl_.INVERT = 5386;
jsloka.gl._GL.GL_Impl_.INCR_WRAP = 34055;
jsloka.gl._GL.GL_Impl_.DECR_WRAP = 34056;
jsloka.gl._GL.GL_Impl_.VENDOR = 7936;
jsloka.gl._GL.GL_Impl_.RENDERER = 7937;
jsloka.gl._GL.GL_Impl_.VERSION = 7938;
jsloka.gl._GL.GL_Impl_.NEAREST = 9728;
jsloka.gl._GL.GL_Impl_.LINEAR = 9729;
jsloka.gl._GL.GL_Impl_.NEAREST_MIPMAP_NEAREST = 9984;
jsloka.gl._GL.GL_Impl_.LINEAR_MIPMAP_NEAREST = 9985;
jsloka.gl._GL.GL_Impl_.NEAREST_MIPMAP_LINEAR = 9986;
jsloka.gl._GL.GL_Impl_.LINEAR_MIPMAP_LINEAR = 9987;
jsloka.gl._GL.GL_Impl_.TEXTURE_MAG_FILTER = 10240;
jsloka.gl._GL.GL_Impl_.TEXTURE_MIN_FILTER = 10241;
jsloka.gl._GL.GL_Impl_.TEXTURE_WRAP_S = 10242;
jsloka.gl._GL.GL_Impl_.TEXTURE_WRAP_T = 10243;
jsloka.gl._GL.GL_Impl_.TEXTURE_2D = 3553;
jsloka.gl._GL.GL_Impl_.TEXTURE = 5890;
jsloka.gl._GL.GL_Impl_.TEXTURE_CUBE_MAP = 34067;
jsloka.gl._GL.GL_Impl_.TEXTURE_BINDING_CUBE_MAP = 34068;
jsloka.gl._GL.GL_Impl_.TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
jsloka.gl._GL.GL_Impl_.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
jsloka.gl._GL.GL_Impl_.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
jsloka.gl._GL.GL_Impl_.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
jsloka.gl._GL.GL_Impl_.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
jsloka.gl._GL.GL_Impl_.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
jsloka.gl._GL.GL_Impl_.MAX_CUBE_MAP_TEXTURE_SIZE = 34076;
jsloka.gl._GL.GL_Impl_.TEXTURE0 = 33984;
jsloka.gl._GL.GL_Impl_.TEXTURE1 = 33985;
jsloka.gl._GL.GL_Impl_.TEXTURE2 = 33986;
jsloka.gl._GL.GL_Impl_.TEXTURE3 = 33987;
jsloka.gl._GL.GL_Impl_.TEXTURE4 = 33988;
jsloka.gl._GL.GL_Impl_.TEXTURE5 = 33989;
jsloka.gl._GL.GL_Impl_.TEXTURE6 = 33990;
jsloka.gl._GL.GL_Impl_.TEXTURE7 = 33991;
jsloka.gl._GL.GL_Impl_.TEXTURE8 = 33992;
jsloka.gl._GL.GL_Impl_.TEXTURE9 = 33993;
jsloka.gl._GL.GL_Impl_.TEXTURE10 = 33994;
jsloka.gl._GL.GL_Impl_.TEXTURE11 = 33995;
jsloka.gl._GL.GL_Impl_.TEXTURE12 = 33996;
jsloka.gl._GL.GL_Impl_.TEXTURE13 = 33997;
jsloka.gl._GL.GL_Impl_.TEXTURE14 = 33998;
jsloka.gl._GL.GL_Impl_.TEXTURE15 = 33999;
jsloka.gl._GL.GL_Impl_.TEXTURE16 = 34000;
jsloka.gl._GL.GL_Impl_.TEXTURE17 = 34001;
jsloka.gl._GL.GL_Impl_.TEXTURE18 = 34002;
jsloka.gl._GL.GL_Impl_.TEXTURE19 = 34003;
jsloka.gl._GL.GL_Impl_.TEXTURE20 = 34004;
jsloka.gl._GL.GL_Impl_.TEXTURE21 = 34005;
jsloka.gl._GL.GL_Impl_.TEXTURE22 = 34006;
jsloka.gl._GL.GL_Impl_.TEXTURE23 = 34007;
jsloka.gl._GL.GL_Impl_.TEXTURE24 = 34008;
jsloka.gl._GL.GL_Impl_.TEXTURE25 = 34009;
jsloka.gl._GL.GL_Impl_.TEXTURE26 = 34010;
jsloka.gl._GL.GL_Impl_.TEXTURE27 = 34011;
jsloka.gl._GL.GL_Impl_.TEXTURE28 = 34012;
jsloka.gl._GL.GL_Impl_.TEXTURE29 = 34013;
jsloka.gl._GL.GL_Impl_.TEXTURE30 = 34014;
jsloka.gl._GL.GL_Impl_.TEXTURE31 = 34015;
jsloka.gl._GL.GL_Impl_.ACTIVE_TEXTURE = 34016;
jsloka.gl._GL.GL_Impl_.REPEAT = 10497;
jsloka.gl._GL.GL_Impl_.CLAMP_TO_EDGE = 33071;
jsloka.gl._GL.GL_Impl_.MIRRORED_REPEAT = 33648;
jsloka.gl._GL.GL_Impl_.FLOAT_VEC2 = 35664;
jsloka.gl._GL.GL_Impl_.FLOAT_VEC3 = 35665;
jsloka.gl._GL.GL_Impl_.FLOAT_VEC4 = 35666;
jsloka.gl._GL.GL_Impl_.INT_VEC2 = 35667;
jsloka.gl._GL.GL_Impl_.INT_VEC3 = 35668;
jsloka.gl._GL.GL_Impl_.INT_VEC4 = 35669;
jsloka.gl._GL.GL_Impl_.BOOL = 35670;
jsloka.gl._GL.GL_Impl_.BOOL_VEC2 = 35671;
jsloka.gl._GL.GL_Impl_.BOOL_VEC3 = 35672;
jsloka.gl._GL.GL_Impl_.BOOL_VEC4 = 35673;
jsloka.gl._GL.GL_Impl_.FLOAT_MAT2 = 35674;
jsloka.gl._GL.GL_Impl_.FLOAT_MAT3 = 35675;
jsloka.gl._GL.GL_Impl_.FLOAT_MAT4 = 35676;
jsloka.gl._GL.GL_Impl_.SAMPLER_2D = 35678;
jsloka.gl._GL.GL_Impl_.SAMPLER_CUBE = 35680;
jsloka.gl._GL.GL_Impl_.VERTEX_ATTRIB_ARRAY_ENABLED = 34338;
jsloka.gl._GL.GL_Impl_.VERTEX_ATTRIB_ARRAY_SIZE = 34339;
jsloka.gl._GL.GL_Impl_.VERTEX_ATTRIB_ARRAY_STRIDE = 34340;
jsloka.gl._GL.GL_Impl_.VERTEX_ATTRIB_ARRAY_TYPE = 34341;
jsloka.gl._GL.GL_Impl_.VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922;
jsloka.gl._GL.GL_Impl_.VERTEX_ATTRIB_ARRAY_POINTER = 34373;
jsloka.gl._GL.GL_Impl_.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975;
jsloka.gl._GL.GL_Impl_.VERTEX_PROGRAM_POINT_SIZE = 34370;
jsloka.gl._GL.GL_Impl_.POINT_SPRITE = 34913;
jsloka.gl._GL.GL_Impl_.COMPILE_STATUS = 35713;
jsloka.gl._GL.GL_Impl_.LOW_FLOAT = 36336;
jsloka.gl._GL.GL_Impl_.MEDIUM_FLOAT = 36337;
jsloka.gl._GL.GL_Impl_.HIGH_FLOAT = 36338;
jsloka.gl._GL.GL_Impl_.LOW_INT = 36339;
jsloka.gl._GL.GL_Impl_.MEDIUM_INT = 36340;
jsloka.gl._GL.GL_Impl_.HIGH_INT = 36341;
jsloka.gl._GL.GL_Impl_.FRAMEBUFFER = 36160;
jsloka.gl._GL.GL_Impl_.RENDERBUFFER = 36161;
jsloka.gl._GL.GL_Impl_.RGBA4 = 32854;
jsloka.gl._GL.GL_Impl_.RGB5_A1 = 32855;
jsloka.gl._GL.GL_Impl_.RGB565 = 36194;
jsloka.gl._GL.GL_Impl_.DEPTH_COMPONENT16 = 33189;
jsloka.gl._GL.GL_Impl_.STENCIL_INDEX = 6401;
jsloka.gl._GL.GL_Impl_.STENCIL_INDEX8 = 36168;
jsloka.gl._GL.GL_Impl_.DEPTH_STENCIL = 34041;
jsloka.gl._GL.GL_Impl_.RENDERBUFFER_WIDTH = 36162;
jsloka.gl._GL.GL_Impl_.RENDERBUFFER_HEIGHT = 36163;
jsloka.gl._GL.GL_Impl_.RENDERBUFFER_INTERNAL_FORMAT = 36164;
jsloka.gl._GL.GL_Impl_.RENDERBUFFER_RED_SIZE = 36176;
jsloka.gl._GL.GL_Impl_.RENDERBUFFER_GREEN_SIZE = 36177;
jsloka.gl._GL.GL_Impl_.RENDERBUFFER_BLUE_SIZE = 36178;
jsloka.gl._GL.GL_Impl_.RENDERBUFFER_ALPHA_SIZE = 36179;
jsloka.gl._GL.GL_Impl_.RENDERBUFFER_DEPTH_SIZE = 36180;
jsloka.gl._GL.GL_Impl_.RENDERBUFFER_STENCIL_SIZE = 36181;
jsloka.gl._GL.GL_Impl_.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048;
jsloka.gl._GL.GL_Impl_.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049;
jsloka.gl._GL.GL_Impl_.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050;
jsloka.gl._GL.GL_Impl_.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051;
jsloka.gl._GL.GL_Impl_.COLOR_ATTACHMENT0 = 36064;
jsloka.gl._GL.GL_Impl_.DEPTH_ATTACHMENT = 36096;
jsloka.gl._GL.GL_Impl_.STENCIL_ATTACHMENT = 36128;
jsloka.gl._GL.GL_Impl_.DEPTH_STENCIL_ATTACHMENT = 33306;
jsloka.gl._GL.GL_Impl_.NONE = 0;
jsloka.gl._GL.GL_Impl_.FRAMEBUFFER_COMPLETE = 36053;
jsloka.gl._GL.GL_Impl_.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054;
jsloka.gl._GL.GL_Impl_.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055;
jsloka.gl._GL.GL_Impl_.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057;
jsloka.gl._GL.GL_Impl_.FRAMEBUFFER_UNSUPPORTED = 36061;
jsloka.gl._GL.GL_Impl_.FRAMEBUFFER_BINDING = 36006;
jsloka.gl._GL.GL_Impl_.RENDERBUFFER_BINDING = 36007;
jsloka.gl._GL.GL_Impl_.MAX_RENDERBUFFER_SIZE = 34024;
jsloka.gl._GL.GL_Impl_.INVALID_FRAMEBUFFER_OPERATION = 1286;
jsloka.gl._GL.GL_Impl_.UNPACK_FLIP_Y_WEBGL = 37440;
jsloka.gl._GL.GL_Impl_.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
jsloka.gl._GL.GL_Impl_.CONTEXT_LOST_WEBGL = 37442;
jsloka.gl._GL.GL_Impl_.UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
jsloka.gl._GL.GL_Impl_.BROWSER_DEFAULT_WEBGL = 37444;
tink.core._Callback.Cell.pool = [];
tri.SimpleTexturedProgram.__meta__ = { obj : { shaders : [{ vertex : "tri/shaders/simple_texture.v.glsl", fragment : "tri/shaders/simple_texture.f.glsl"}]}};
VideoTest.main();
})(typeof console != "undefined" ? console : {log:function(){}});

//# sourceMappingURL=Main.js.map