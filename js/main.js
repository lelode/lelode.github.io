var canvas = document.getElementById("game");
var canvas1, canvas2;
var ctx1, ctx2;
var ctx;
var canvasWidth = 635, canvasHeight = 480;

var introScriptX = 120, introScriptY = 300;

var curStage = -1;
var introImages = {};
var introScripts = {};

introImages[0] = new Image();
introImages[0].src = "img/intro/0.png";
introImages[1] = new Image();
introImages[1].src = "img/intro/1.png";
introImages[2] = new Image();
introImages[2].src = "img/intro/2.png";
introImages[3] = new Image();
introImages[3].src = "img/intro/3.png";
introImages[4] = new Image();
introImages[4].src = "img/intro/4.png";
introImages[5] = new Image();
introImages[5].src = "img/intro/5.png";
introImages[6] = new Image();
introImages[6].src = "img/intro/6.png";
introImages[7] = new Image();
introImages[7].src = "img/intro/7.png";
introImages[8] = new Image();
introImages[8].src = "img/intro/8.png";
introImages[9] = new Image();
introImages[9].src = "img/intro/9.png";
introImages[10] = new Image();
introImages[10].src = "img/intro/10.png";

introScripts[1] = "먼 옛날, 두 종족이 지구를 지배하고 있었다.";

var bgmIntro;

introImgScreen = {
	x: 125,
	y:  60,

	draw: function() {

	}
}

window.onload= function(){
	//initBGM();

	$(document).trigger('initAudio');

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

	canvas1 = document.createElement("canvas");
	canvas1.width = canvasWidth;
	canvas1.height = canvasHeight;
	ctx1 = canvas1.getContext("2d");
	document.getElementById("game_container").appendChild(canvas1);

	ctx1.fillStyle = "black";
	ctx1.fillRect(0, 0, canvasWidth, canvasHeight);


	canvas2 = document.createElement("canvas");
	canvas2.width = 100;
	canvas2.height = 100;
	ctx2 = canvas1.getContext("2d");
	document.body.appendChild(canvas2);

	ctx1.fillStyle = "red";
	ctx1.fillRect(100, 100, 100, 100);


	//title();
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
	//ctx.fillStyle = "white";
	//ctx.fillRect(0,0, canvasWidth,canvasHeight);
	//ctx.drawImage(img,100,70);
	//ctx.drawImage(testImg, 0, 0, 398, 211, 45, 20, 210, 110);
	//ctx.clearRect(0, 0);

	// Erase screen
	ctx.save();
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	ctx.restore();

	$.mbAudio.play('backgroundSprite',"intro");

	idx++;
	processIntro(idx);
}



//window.addEventListener("load", initImages);

function processIntro(idx) {

	var op = 0.1;
	var curImg = introImages[idx];

	var timer = setInterval(function () {
		DrawIntroImg(op, idx);

		introScript(idx, function() {
			ctx.save();
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, canvasWidth, canvasHeight);
			ctx.restore();

			idx++;
		});
	}, 100);
}

function DrawIntroImg (op, idx){
	ctx.save();
	ctx.globalAlpha = op;
	ctx.drawImage(introImages[idx], introImgX, introImgY);
	if (op < 1) {
		op += op * 0.1;
	}
	ctx.restore();
}

function introScript(idx, callback){
	switch (idx){
		case 1:
			printIntroScript("먼 옛날,", 1);
			setTimeout(function() {
			printIntroScript("지상 위엔 두 종족이 살고 있었다.", 2);
			}, 2000);
			setTimeout(function() {
				printIntroScript("바로 인간과 괴물이었다.", 3);
			}, 6000);
			setTimeout(function() {
				callback();
			},9000);
			break;
		case 2:
			//ctxScript.fillText("그러던 어느 날, 두 종족 사이에 전쟁이", 0, 20);
			//ctxScript.fillText("벌어졌다.", 0, 60);
			break;
		case 3:
			//ctxScript.fillText("기나긴 싸움 끝에 승기를 잡은 것은", 0, 20);
			//ctxScript.fillText("인간들이었다.", 0, 60);
			break;
		case 4:
			//ctxScript.fillText("인간들은 마법 주문을 사용하여", 0, 20);
			//ctxScript.fillText("괴물들을 지하세계에 봉인하였다.", 0, 60);
			break;
		case 5:
			//ctxScript.fillText("그리고 그 후로부터 오랜 시간이 흘렀다...", 0, 20);
			break;
		case 6:
			//ctxScript.fillText("에봇 산", 170, 20);
			//ctxScript.fillText("201X년", 170, 60);
			break;
		case 7:
			//ctxScript.fillText("전설에 의하면, 에봇 산에 한번 오르면", 0, 20);
			//ctxScript.fillText("다시는 돌아오지 못한다고 한다.", 0, 60);
			break;
		default:
	}
}

var printIntroScript = function (scriptString, line){
	var x = introScriptX;
	var y = introScriptY + (line * 40);

	var scriptStringSplit = scriptString.split("");
	var curString = "";
	var sly = 0;

	var timer = setInterval(function () {
		if (scriptStringSplit.length > 0) {
			//console.log(scriptStringSplit.length);
			curString = scriptStringSplit.shift();

			ctx.save();
			ctx.fillStyle = "white";
			ctx.font = "30px 굴림";
			ctx.fillText(curString, x, y);
			ctx.restore();
			sly++;

			if (curString !== " "){
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
	},100);
}


function initBGM(){
	bgmIntro = new Audio();
	bgmIntro.src = "sounds/BGM/01_OnceUponATime.ogg";
	bgmIntro.loop = true;
	bgmIntro.play();
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
}