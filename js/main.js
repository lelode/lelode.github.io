var canvas = document.getElementById("game");
var ctxIntroImg, ctxIntroScript;

var canvasWidth = 635, canvasHeight = 480;
var introScriptX = 120, introScriptY = 300;
var introImgWidth = 398, introImgHeight = 214;
var introImgX = 125, introImgY = 60;

var k = 1000;
var curStage = -1;
var introImages = {};




window.onload= function(){
	// intro image init
	for (var i=0; i<12; i++) {
		introImages[i] = new Image();
		introImages[i].src = "img/intro/" + i + ".png";
	}


	createjs.Sound.registerSound("sounds/BGM/01_OnceUponATime.ogg", "intro");

	//$(document).trigger('initAudio');

	ctxIntroImg = canvas.getContext("2d");
	ctxIntroScript = canvas.getContext("2d");
	ctx = canvas.getContext("2d");

 	main();
}

canvas.addEventListener("click", processStage);

function processStage(){
	switch (curStage) {
		case 0:
			curStage++;
			intro();
			break;
		default: break;
	}
}

function main() {
	timeoutSlideshow();

	//$.mbAudio.play('backgroundSprite',"intro");
	// title();
	//intro();
	// venture();
	// battle();
}

function title() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);

	setTimeout(function() {
		ctx.drawImage(introImages[0], 0, 0);
		$.mbAudio.play('effectSprite',"title");
	}, 3000);

	setTimeout(function() {
		$.mbAudio.pause('effectSprite', audioIsReady);

		ctx.save();
		ctx.fillStyle = "gray";
		ctx.font = "20px Lucida Console";
		ctx.fillText("[TOUCH OR CLICK]", 230, 350);
		ctx.restore();
		curStage = 0;
	}, 6000);
}

function intro() {;
	var idx = 0;

	// Erase screen
	ctx.save();
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	ctx.restore();


	idx++;
	processIntro(idx);
}

//window.addEventListener("load", initImages);


function processIntro(idx) {
	var op = 0.1;
	var curImg = introImages[idx];

	var timer = setInterval(function () {
		ctxIntroImg.save();
		ctxIntroScript.globalAlpha = op;
		ctxIntroImg.drawImage(curImg, 0, 0, introImgWidth, introImgHeight,
			introImgX, introImgY, introImgWidth, introImgHeight);
		ctxIntroImg.restore();

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
		ctxIntroImg.save();
		ctxIntroImg.drawImage(curImg, 0, sy, introImgWidth, introImgHeight,
			introImgX, introImgY, introImgWidth, introImgHeight);
		ctxIntroImg.restore();

		if (sy < 677 - introImgHeight) {
			sy += 2;
		}
		else clearInterval(timer);
	}, 15);
}

function timeoutSlideshow() {

	//$.mbAudio.play('backgroundSprite',"intro");
	createjs.Sound.play("intro");

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
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
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
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	}, 15 * k);

	// 3
	setTimeout(function () {
		processIntro(3);
		printIntroScript("기나긴 싸움 끝에", 1);
	}, 16 * k);
	setTimeout(function() {
		printIntroScript("승기를 잡은 것은 인간들이었다.", 2);
	}, 18 * k);
	setTimeout(function () {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	}, 21 * k);

	// 4
	setTimeout(function () {
		processIntro(4);
		printIntroScript("인간들은 마법 주문을 사용하여", 1);
	}, 22 * k);
	setTimeout(function () {
		printIntroScript("괴물들을 지하세계에 봉인하였다.", 2);
	}, 25 * k);
	setTimeout(function () {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	}, 28 * k);

	// 5
	setTimeout(function () {
		printIntroScript("그 후로부터 오랜 시간이 지났다", 1);
	}, 30 * k);
	setTimeout(function () {
		printIntroScript("...", 1, k, 550);
	}, 31.5 * k);
	setTimeout(function () {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	}, 35 * k);

	// 6
	setTimeout(function () {
		processIntro(6);
		printIntroScript("에봇 산", 1, 100, 250);
	}, 36 * k);
	setTimeout(function () {
		printIntroScript("201X년", 2, 100, 230);
	}, 37 * k);
	setTimeout(function () {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	}, 40 * k);

	// 7
	setTimeout(function () {
		processIntro(7);
		printIntroScript("전설에 의하면,", 1);
	}, 41 * k);
	setTimeout(function () {
		printIntroScript("에봇 산에 한번 오르면", 2);
	}, 43 * k);
	setTimeout(function () {
		printIntroScript("다시는 돌아오지 못한다고 한다.", 3);
	}, 45 * k);
	setTimeout(function () {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	}, 48 * k);

	// 8
	setTimeout(function () {
		processIntro(8);
	}, 48 * k);
	setTimeout(function () {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	}, 51 * k);

	// 9
	setTimeout(function() {
		processIntro(9);
	}, 52 * k);
	setTimeout(function () {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	}, 55 * k);

	// 10
	setTimeout(function () {
		processIntro(10);
	}, 56 * k);
	setTimeout(function () {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	}, 59 * k);

	// 11
	setTimeout(function () {
		processIntro(11);
	}, 60 * k);
	setTimeout(function() {
		scrollImg(11);
	}, 63 * k)

}

var printIntroScript = function (scriptString, line, speed, x){
	if (typeof(speed)==='undefined') speed = 100;
	if (typeof(x)==='undefined') x = introScriptX;
	var y = introScriptY + (line * 40);

	var scriptStringSplit = scriptString.split("");
	var curString = "";
	var sly = 0;

	var timer = setInterval(function () {
		if (scriptStringSplit.length > 0) {
			curString = scriptStringSplit.shift();

			ctxIntroScript.save();
			ctxIntroScript.globalAlpha = 1;
			ctxIntroScript.fillStyle = "white";
			ctxIntroScript.font = "25px soyanon8";
			ctxIntroScript.fillText(curString, x, y);
			ctxIntroScript.restore();
			sly++;

			if (curString == "."){
				x += 10;
				$.mbAudio.play('effectSprite',"typeWriting");
			}
			else if (curString !== " "){
				x += 30;
				$.mbAudio.play('effectSprite',"typeWriting");
			}
			else{
				x += 10;
			}
		}
		else {
			clearInterval(timer);
		}
	},speed);
}