(function(exports) {
	// Make key as a singleton
	var gKey = {};

	var gTouchXScreen = 0;
	var gTouchYScreen = 0;
	var gTouchXCtx = 0;
	var gTouchYCtx = 0;
	var gTouchDown = false;

	exports.gTouchXCtx = gTouchXCtx;
	exports.gTouchYCtx = gTouchYCtx;
	exports.gKey = gKey;

	// Virtual Keycodes mapping
	var KEY_CODES = {
		37:"left", 38:"up", 39:"right", 40:"down", // arrow keys
		// status, inventory, save?
		90:"action" // z
	};

	var onKeyDown = function(event){
		var code = KEY_CODES[event.keyCode];
	    gKey[code] = true;
	    event.stopPropagation();
	    event.preventDefault(); // default action of the event will not be triggered
	}

	var onKeyUp = function(event){
		var code = KEY_CODES[event.keyCode];
	    gKey[code] = false;
	    event.stopPropagation();
	    event.preventDefault();
	}

	var disableRightClick = function(event){
	  if(2 == event.button) return false;
	}

	window.addEventListener("keydown", onKeyDown, false);
	window.addEventListener("keyup", onKeyUp, false);


	var onTouchDown = function(event){
		gTouchXScreen = event.changedTouches[0].clientX;
		gTouchYScreen = event.changedTouches[0].clientY - gCanvas.offsetTop;
		event.stopPropagation();
		event.preventDefault();
		getTouchPosCtx();

		gTouchDown = true;
	}

	var onTouchUp = function(event){
		gTouchXScreen = 0;
		gTouchYScreen = 0;
		gTouchXCtx = 0;
		gTouchYCtx = 0;
		gTouchDown = false;
	}

	gCanvas.addEventListener("touchstart", onTouchDown, false);
	gCanvas.addEventListener("touchmove", onTouchDown, false);
	gCanvas.addEventListener("touchend", onTouchUp, false);

	document.onmousedown = disableRightClick;

})(window);