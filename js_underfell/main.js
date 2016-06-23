var gStage = "loading";

var canvas = document.getElementById("game");
var ctx;

var talkBox = new TalkBox();

function initCanvas(){
	ctx = canvas.getContext("2d");
	//ctx.save();
	//ctx.fillStyle = "#fff";
	//ctx.font = "30px tbyt";
	//ctx.fillText("LOADING...", 260, 300);
	//ctx.restore();
}


// x: 0 - 9  ...  arry[0]
// x: 10 - 19 ...  arry[1]
// x: 200 - 219 ... arry[20]
// mapArrayIdx = Axix / 10 ?
// if (arry[idx] == occupied) return;
// else axix ++; 
// human. other characters

function update(){
	human.update();
}

function draw(){
	gMap.draw();
	human.draw();
}

function main(){
	gMap = gBackgrounds.ruin;

	var updateLoop = function(){
		update();
		draw();

		window.requestAnimationFrame(updateLoop, ctx);
	};
	window.requestAnimationFrame(updateLoop, ctx);
}

window.onload = function(){
	initCanvas();
	initImages();
	main();
};

function talkboxTest(){
	//talkBox.draw("up");
	//var fontName = "30px Arial Black";
	//tb.draw();
	//tb.typeWriter.type("test sentence");
}

// Required Map: ruin1, ruin2, Snowdin
// Required NPC: flowey, torial(Not convinced), sans(Plays along, , undyne, 
// flowey comes in, talk to sans
// flowey says we need to shift our game, otherwise player gets bored and plays game no more
// sans says thats the ways of all game goes, but flowey refuses it and keep nagging
// sans says relutuntly he will join flowey's stupid plan whatever the hell it is
// flowey gets happy, and says gather other monsters
// UNDERTALE INTRO SCREEN / SANS BATTLE MUSIC
// start from ruin, meet flowey
// well we've already met tons of times before, but let me introduce my self anyway
// Howdy, i'm flowey! flowey the flower!
// I know we've been through this quite many times. and you think you know what will happens between us.
// either you saves me, or you'll kill me
// but this time, things will go diffrently
// those monsters out there, they're nothing like the last time you saw them.
// they won't be nice, or gentle.
// they're gonna eat you up alive in any second when you losen yourself a little bit.
// this place is no longer where the monsters lives peacfully.
// are you ready to venture through a this harsh Undergorund?
// yes -> splendid! this time, I will join your journey this time, how about that?
// no -> I guess I scared you too much. come on, don't chicken out. It will be fun!
// Hey, I will lead you through this play, so worse thing won't happne. ok?
// flowey will join with human, 
// skip toriel 
// pre yes -> you said you're ready. you're strong. you don't need cuddling-pieBacking mom anymore. 
// tutorial is for begginer only
// pre no -> i understand you want to meet your 'mom' but you have to be strong.

//(since you don't need tutorial anymore)