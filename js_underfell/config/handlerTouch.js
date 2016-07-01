
var gTouchDown = false;

var gTouchXScreen = 0;
var gTouchYScreen = 0;
var gTouchXCtx = 0;
var gTouchYCtx = 0;
var gTouchDown = false;

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
