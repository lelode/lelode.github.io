(function(exports) {
	// Make key as a singleton
	var gKey = {};
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

	document.onmousedown = disableRightClick;

})(window);