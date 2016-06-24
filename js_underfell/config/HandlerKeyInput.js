(function(exports) {
	// Make key as a singleton
	var gKey = {};
	var gTouchX = 0;
	var gTouchY = 0;
	var gTouching = false;
	exports.gKey = gKey;
	exports.gTouchX = gTouchX;
	exports.gTouchY = gTouchY;
	exports.gTouching = gTouching;

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

	function disableRightClick(event){
	  if(event.button==2) return false;
	}

	var onTouchDown = function(event){
		gTouching = true;
		gTouchX = event.originalEvent.touches[0].pageX;
		gTouchY = event.originalEvent.touches[0].pageY;
		event.stopPropagation();
		event.preventDefault();
	}

	var onTouchUp = function(event){
		gTouching = false;
	}

	window.addEventListener("keydown", onKeyDown, false);
	window.addEventListener("keyup", onKeyUp, false);
	document.onmousedown = disableRightClick;
	//document.addEventListener("touchstart", onTouchDown, false);
	//document.addEventListener("touchcancel", onTouchUp, false);

})(window);