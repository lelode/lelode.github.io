var curStage = "loading";
var scriptVentureCtr = 0;

var canvas = document.getElementById("game");
var ctx;
var canvasWidth = 640, canvasHeight = 480;

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
	getCookie();
};

function getCookie(){
    var name = "killed";
	var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
  	var result = regexp.exec(document.cookie);

  	if (result === null){
        initIntroImages();
        initIngameImages();
        initSounds();
  	}
  	else{
  		initNothingSounds();
  	} 
}

var ableUserInput = false;

document.addEventListener("touchstart", function(event){
	if (ableUserInput) {
		switch (curStage) {
			case "title": intro(); break;
			case "venture": floweyScriptVenture(); break;
			case "battle": floweyScriptBattle(); break;
			case "struggling":
				if (struggleCtr < 5) struggleCtr++;
				else floweyScriptBattle();
				break;
			default: break;
			case "ending": scriptEnding(); break;
			case "nothing": none.message(); break;
		}
	}
})

document.addEventListener("keydown", function(event){
	if (ableUserInput){
		if (curStage == "title") intro();
		if (event.keyCode === 90){ // z key
			switch(curStage){
				case "venture": floweyScriptVenture(); break;
				case "battle": floweyScriptBattle(); break;
				case "ending": scriptEnding(); break;
				case "nothing": none.message(); break;
				default: break;
			}
		}
		// arrows
		else if (event.keyCode >= 37 && event.keyCode <= 40 && curStage == "struggling") {
			if (struggleCtr < 5) struggleCtr++;
			else floweyScriptBattle();
		}
	}
})

document.onmousedown=disableRightClick;
function disableRightClick(event)
{
  if(event.button==2) return false;
}

canvas.addEventListener("click", function(event){
		if (ableUserInput) {
		switch (curStage) {
			case "title": intro(); break;
			case "venture": floweyScriptVenture(); break;
			case "battle": floweyScriptBattle(); break;
			case "ending": scriptEnding(); break;
			case "nothing": none.message(); break;
			default: break;
		}
	}
})

function title() {
	//venture();
	//battle();
	//ending();
	//nothing();

	curStage = "title";

	setTimeout(function() {
		ctx.drawImage(images.title, 0, 0);
		createjs.Sound.play("title");
	}, 5000);

	setTimeout(function() {
		ctx.save();
		ctx.fillStyle = "gray";
		ctx.font = "20px Lucida Console";
		ctx.fillText("[PRESS KEY OR TOUCH OR CLICK]", 145, 350);
		ctx.restore();
	 	ableUserInput = true;
	}, 8000);
}