
function initCanvas(){
	gCtx = gCanvas.getContext("2d");
	//ctx.save();
	//ctx.fillStyle = "#fff";
	//ctx.font = "30px tbyt";
	//ctx.fillText("LOADING...", 260, 300);
	//ctx.restore();
}

function update(){
	human.update();
}

function draw(){
	gMap.draw();
	human.draw();
	displayVersion();
}

function displayVersion(){
	var ver = 0.03;
	gCtx.save();
	gCtx.fillStyle = "#fff";
	gCtx.font = "28px Arial";
	gCtx.fillText("ver: " + ver, 20, 100);
	gCtx.restore();
}

function main(){
	screenWidth = gCanvas.width;
	screenHeight = gCanvas.height;
	gMap = gBackgrounds.ruin;


	var updateLoop = function(){
		getCanvasSize();
		update();
		draw();
		window.requestAnimationFrame(updateLoop, gCtx);
	};
	window.requestAnimationFrame(updateLoop, gCtx);
}

function getTouchPosCtx(){
	var ratio = gCtxWidth / gCanvasWidth;
	gTouchXCtx = ratio * gTouchXScreen;
	gTouchYCtx = ratio * gTouchYScreen;
}

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