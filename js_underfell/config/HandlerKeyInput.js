(function(exports) {
	
	// Make key as a singleton
	var key = {};
	exports.key = key;

	// Virtual Keycodes mapping
	var KEY_CODES = {
		37:"left", 38:"up", 39:"right", 40:"down",
		65:"left", 87:"up", 68:"right", 83:"down",
		// status, inventory, save?
		32:"action", 13:"action",
		27:"pause", 80:"pause"
	};

	var onKeyDown = function(event){
		var code = KEY_CODES[event.keyCode];
	    key[code] = true;
	    event.stopPropagation();
	    event.preventDefault(); // default action of the event will not be triggered
	}

	var onKeyUp = function(event){
		var code = KEY_CODES[event.keyCode];
	    key[code] = false;
	    event.stopPropagation();
	    event.preventDefault();
	}

	window.addEventListener("keydown",onKeyDown,false);
	window.addEventListener("keyup",onKeyUp,false);
}