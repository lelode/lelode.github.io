var curStage = "loading";
var scriptVentureCtr;

window.onload = function(){
	initCanvas();
	initIntroImages();
	initIngameImages();
	initSounds();

	scriptVentureCtr = 0;
	console.log("onload");
};

var canvas = document.getElementById("game");
var ctx;
var canvasWidth = 640, canvasHeight = 480;

function initCanvas(){
	ctx = canvas.getContext("2d");
	ctx.save();
	ctx.fillStyle = "#fff";
	ctx.font = "30px tbyt";
	ctx.fillText("LOADING...", 230, 300);
	ctx.restore();
}

document.addEventListener("touchstart", function(event){
	if (ableUserInput){
		if (event.keyCode === 90){ // pressed z key
			if (curStage == "venture") { // process venture stage
				floweyScriptVenture();
			}
		}
		//if (event.keyCode >= 37 && event.keyCode <= 40) // arrows
	}
})

document.addEventListener("keydown", function(event){
	if (ableUserInput){
		if (event.keyCode === 90){ // z key
			if (curStage == "venture") 	floweyScriptVenture();
			else if (curStage == "battle") floweyScriptBattle();
		}
		//if (event.keyCode >= 37 && event.keyCode <= 40) // arrows
	}
});

var ableUserInput = false;
canvas.addEventListener("click", processStage);

function processStage(){
	if (ableUserInput) {
		switch (curStage) {
			case "title": intro(); break;
			case "venture": floweyScriptVenture(); break;
			case "battle": floweyScriptBattle(); break;
			default: break;
		}
	}
}

function title() {
	//venture();

	curStage = "title";

	setTimeout(function() {
		ctx.drawImage(images.title, 0, 0);
		createjs.Sound.play("title");
	}, 5000);

	setTimeout(function() {
		ctx.save();
		ctx.fillStyle = "gray";
		ctx.font = "20px Lucida Console";
		ctx.fillText("[TOUCH OR CLICK]", 230, 350);
		ctx.restore();
	 	ableUserInput = true;
	}, 8000);
}