var canvas = document.getElementById("game");
var ctxintroImg, ctxIntroScript;

var canvasWidth = 635, canvasHeight = 480;
var introScriptX = 120, introScriptY = 300;
var introImgWidth = 398, introImgHeight = 214;
var introImgX = 125, introImgY = 60;

var k = 1000;
var curStage = -1;
var introImages = {};
var assetNum = 4;

var soundLoaded = false;
var imgLoaded = false;

window.onload= function(){

	/*
	var bgmPath = "./sounds/BGM/";
	var sfxPath = "./sounds/SFX/";
	var bgm = [
		{src:"01_OnceUponATime.mp3", id:"intro"}
	];

	var sfx = [
		{src:"title.mp3", id:"title"},
		{src:"typeWriting.mp3", id:"typeWriting"},
		{src:"awakening.mp3", id:"awakening"}
	];


	createjs.Sound.registerSound(bgm, bgmPath);
	//createjs.Sound.registerSound(sfx, sfxPath);
	*/

	ctxintroImg = canvas.getContext("2d");
	ctxIntroScript = canvas.getContext("2d");
	ctx = canvas.getContext("2d");

	ctx.save();
	ctx.fillStyle = "#fff";
	ctx.font = "30px Lucida Console";
	ctx.fillText("LOADING...", 230, 300);
	ctx.restore();

	createjs.Sound.alternateExtensions = ["ogg"];
	createjs.Sound.on("fileload", handleLoad);

	createjs.Sound.registerSound("sounds/BGM/01_OnceUponATime.mp3", "intro");
	createjs.Sound.registerSound("sounds/SFX/title.mp3", "title");
	createjs.Sound.registerSound("sounds/SFX/typeWriting.mp3", "typeWriting")
	createjs.Sound.registerSound("sounds/SFX/awakening.mp3", "awakening")

	for (var i = 0; i< 12 ; i++) {
		introImages[i] = new Image();
		introImages[i].src = "img/intro/" + i + ".png";
		console.log("loading " + i + "th img");


		if ( i == 11 ){
			imgLoaded = true;
			console.log("introImages.length: " + introImages.length);
			console.log("img load complete");
		}

		if (imgLoaded && soundLoaded && curStage < 0) {
			console.log("img initer start title");
			title();
		}
	}

	function handleLoad(event) {
		assetNum--;
		if ( assetNum <= 0 ){
			soundLoaded = true;
			console.log("sound load complete");
		}


		if (imgLoaded && soundLoaded && curStage < 0){
			console.log("sound initer start title");
			title();
		}
	}
}

canvas.addEventListener("click", processStage);

function processStage(){
	switch (curStage) {
		case 1:
			curStage = 2;
			intro();
			break;
		default: break;
	}
}

function title() {
	curStage = 0;
	setTimeout(function() {
		ctx.drawImage(introImages[0], 0, 0);
		createjs.Sound.play("title");
	}, 5000);

	setTimeout(function() {
		ctx.save();
		ctx.fillStyle = "gray";
		ctx.font = "20px Lucida Console";
		ctx.fillText("[TOUCH OR CLICK]", 230, 350);
		ctx.restore();
		curStage = 1;
	}, 8000);
}

function intro() {;
	// Erase screen
	ctx.save();
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	ctx.restore();

	createjs.Sound.play("intro");
	timeoutSlideshow();
}

//window.addEventListener("load", initImages);


function processIntro(idx) {
	var op = 0.1;
	var curImg = introImages[idx];

	var timer = setInterval(function () {
		ctxIntroScript.save();
		ctxIntroScript.globalAlpha = op;
		ctxintroImg.drawImage(curImg, 0, 0, introImgWidth, introImgHeight,
			introImgX, introImgY, introImgWidth, introImgHeight);
		ctxintroImg.restore();

		if (op < 1) {
			op += op * 0.1;
		}
		else clearInterval(timer);
	}, 100);
}

function scrollImg(idx, speed) {
	if (typeof(speed)==='undefined') speed = 15;
	var sy = 0;
	var curImg = introImages[idx];

	var timer = setInterval(function () {
		ctxintroImg.save();
		ctxintroImg.drawImage(curImg, 0, sy, introImgWidth, introImgHeight,
			introImgX, introImgY, introImgWidth, introImgHeight);
		ctxintroImg.restore();

		if (sy < 677 - introImgHeight) {
			sy += 2;
		}
		else clearInterval(timer);
	}, speed);
}

function clearCanvas() {

	/*
	ctx.save();
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	ctx.restore();
	*/

	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function timeoutSlideshow() {
	// 1
	processIntro(1);
	printIntroScript("먼 옛날,", 1);
	setTimeout(function () {
		printIntroScript("지상 위엔 두 종족이 살고 있었다.", 2);
	}, 2 * k);
	setTimeout(function () {
		printIntroScript("바로 인간과 괴물이었다.", 3);
	}, 6 * k);
	setTimeout(function () {
		clearCanvas();
	}, 9 * k);
	// 2
	setTimeout(function () {
		processIntro(2);
		printIntroScript("그러던 어느 날,", 1);
	}, 10 * k);
	setTimeout(function () {
		printIntroScript("두 종족 사이에 전쟁이 벌어졌다.", 2);
	}, 12 * k);
	setTimeout(function () {
		clearCanvas();
	}, 16 * k);

	// 3
	setTimeout(function () {
		processIntro(3);
		printIntroScript("기나긴 싸움 끝에", 1);
	}, 17 * k);
	setTimeout(function() {
		printIntroScript("승기를 잡은 것은 인간들이었다.", 2);
	}, 20 * k);
	setTimeout(function () {
		clearCanvas();
	}, 24 * k);

	// 4
	setTimeout(function () {
		processIntro(4);
		printIntroScript("인간들은 마법 주문을 사용하여", 1);
	}, 25 * k);
	setTimeout(function () {
		printIntroScript("괴물들을 지하세계에 봉인하였다.", 2);
	}, 28 * k);
	setTimeout(function () {
		clearCanvas();
	}, 33 * k);

	// 5
	setTimeout(function () {
		printIntroScript("그 후로부터 오랜 시간이 지났다", 1);
	}, 34.5 * k);
	setTimeout(function () {
		printIntroScript("...", 1, k, 550);
	}, 36 * k);
	setTimeout(function () {
		clearCanvas();
	}, 41 * k);

	// 6
	setTimeout(function () {
		processIntro(6);
	}, 42 * k);
	setTimeout(function() {
		printIntroScript("에봇 산", 1, 100, 270);
	}, 43 * k);

	setTimeout(function () {
		printIntroScript("201X년", 2, 100, 250);
	}, 44 * k);
	setTimeout(function () {
		clearCanvas();
	}, 49 * k);

	// 7
	setTimeout(function () {
		processIntro(7);
		printIntroScript("전설에 의하면,", 1);
	}, 50 * k);
	setTimeout(function () {
		printIntroScript("에봇 산에 한번 오르면", 2);
	}, 52 * k);
	setTimeout(function () {
		printIntroScript("다시는 돌아오지 못한다고 한다.", 3);
	}, 54 * k);
	setTimeout(function () {
		clearCanvas();
	}, 59 * k);

	// 8
	setTimeout(function () {
		processIntro(8);
	}, 61 * k);
	setTimeout(function () {
		clearCanvas();
	}, 64 * k);

	// 9
	setTimeout(function() {
		processIntro(9);
	}, 65 * k);
	setTimeout(function () {
		clearCanvas();
	}, 68 * k);

	// 10
	setTimeout(function () {
		processIntro(10);
	}, 69 * k);
	setTimeout(function () {
		clearCanvas();
	}, 72 * k);

	// 11
	setTimeout(function () {
		processIntro(11);
	}, 73 * k);
	setTimeout(function() {
		scrollImg(11);
	}, 76 * k);

	// fade
	setTimeout(function() {
		whiteFade();
	}, 86 * k);
	setTimeout(function() {
		Unfinished();
	}, 91 * k);
}

function Unfinished() {
	ctx.save();
	ctx.globalAlpha = 1;
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	ctx.fillStyle = "#fff";
	ctx.font = "30px soyanon8";
	ctx.fillText("TO BE CONTINUE", 190, 230);
	ctx.restore();
	createjs.Sound.play("title");
}


function whiteFade(){
	var op = 0.1;
	createjs.Sound.play("awakening");

	var timer = setInterval(function () {

		ctxintroImg.save();
		ctxintroImg.globalAlpha = op;
		ctxintroImg.fillStyle = "#fff";
		ctxintroImg.fillRect(introImgX, introImgY, introImgWidth, introImgHeight);

		ctxintroImg.restore();

		if (op < 0.5) {
			op += op * 0.1;
		}
		else clearInterval(timer);
	}, 200);
}

var printIntroScript = function (scriptString, line, speed, x) {
	if (typeof(speed) === 'undefined') speed = 100;
	if (typeof(x) === 'undefined') x = introScriptX;
	var y = introScriptY + (line * 40);

	var scriptStringSplit = scriptString.split("");
	var curString = "";
	var sly = 0;

	var timer = setInterval(function () {
		if (scriptStringSplit.length > 0) {
			curString = scriptStringSplit.shift();

			ctxIntroScript.save();
			ctxIntroScript.globalAlpha = 1;
			ctxIntroScript.fillStyle = "#fff";
			ctxIntroScript.font = "25px soyanon8";
			ctxIntroScript.fillText(curString, x, y);
			ctxIntroScript.restore();
			sly++;

			if (curString == ".") {
				x += 10;
				createjs.Sound.play("typeWriting");
			}
			else if (curString !== " ") {
				x += 30;
				createjs.Sound.play("typeWriting");
			}
			else {
				x += 10;
			}
		}
		else {
			clearInterval(timer);
		}
	}, speed);
}