var gCanvas = document.getElementById("game");
var gCtx;

var gStage = "loading";

var gCanvasWidth;
var gCanvasHeight

var gTouchXCtx;
var gTouchYCtx;
var gTouchXScreen;
var gTouchYScreen;

function initCanvas(){
	gCtx = gCanvas.getContext("2d");
	//ctx.save();
	//ctx.fillStyle = "#fff";
	//ctx.font = "30px tbyt";
	//ctx.fillText("LOADING...", 260, 300);
	//ctx.restore();
}

var onTouchDown = function(event){
	gTouchXScreen = event.changedTouches[0].clientX;
	gTouchYScreen = event.changedTouches[0].clientY;
	event.stopPropagation();
	event.preventDefault();
	getTouchPosCtx();
}

var onTouchUp = function(event){
	gTouchXScreen = 0;
	gTouchYScreen = 0;
	gTouchXCtx = 0;
	gTouchYCtx = 0;
}

gCanvas.addEventListener("touchstart", onTouchDown, false);
gCanvas.addEventListener("touchend", onTouchUp, false);

function update(){
	human.update();
}

function draw(){
	gMap.draw();
	human.draw();
}

function displayTouchAxis(){
	var ver = 0.27;
	gCtx.save();
	gCtx.fillStyle = "gray";
	gCtx.fillRect(0, 0, gCtxWidth, gCtxHeight);
	gCtx.fillStyle = "#fff";
	gCtx.font = "30px Arial";	
	gCtx.fillText("screen Width: " + gCanvasWidth, 320, 250);
	gCtx.fillText("screen Height: " + gCanvasHeight, 320, 290);
	gCtx.fillText("offsetTop: " + gCanvas.offsetTop, 320, 340);
	gCtx.font = "30px Arial";
	gCtx.fillText("ver: " + ver, 20, 100);
	gCtx.fillText("Canvas X: " + gTouchXScreen, 20, 250);
	gCtx.fillText("Canvas Y: " + (gTouchYScreen - gCanvas.offsetTop), 20, 300);
	gCtx.fillText("Ctx X: " + gTouchXCtx, 20, 350);
	gCtx.fillText("Ctx Y: " + (gTouchYCtx - gCanvas.offsetTop), 20, 400);
	gCtx.restore();
}

function main(){
	screenWidth = gCanvas.width;
	screenHeight = gCanvas.height;
	gMap = gBackgrounds.ruin;1

	var updateLoop = function(){
		//update();
		//draw();
		gCtx.clearRect(0, 0, gCtxWidth, gCtxHeight);
		getCanvasSize();
		displayTouchAxis();
		window.requestAnimationFrame(updateLoop, gCtx);
	};
	window.requestAnimationFrame(updateLoop, gCtx);
}

function getTouchPosCtx(){
	var ratio = gCtxWidth / gCanvasWidth;
	gTouchXCtx = ratio * gTouchXScreen;
	gTouchYCtx = ratio * gTouchYScreen;
}

// ctx 635
// canvas 400
// getRatioDiff = ctx / canvas

function getCanvasSize(){
	gCanvasWidth = Math.min(window.innerWidth, gCanvas.clientWidth);
	gCanvasHeight = Math.min(window.innerHeight, gCanvas.clientHeight);
}

window.onload = function(){
	initCanvas();
	initImages();
	main();
};

function getTouchedDir(){
	return DIRECTION.RIGHT;
	return DIRECTION.LEFT;
}