var curStage = "loading";

var canvasWidth = 640, canvasHeight = 480;
var canvas = document.getElementById("game");
var ctx;

function initCanvas(){
	ctx = canvas.getContext("2d");
	ctx.save();
	ctx.fillStyle = "#fff";
	ctx.font = "30px tbyt";
	ctx.fillText("LOADING...", 260, 300);
	ctx.restore();
}

window.onload = function(){
	initCanvas();
};