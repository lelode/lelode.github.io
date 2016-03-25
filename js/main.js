var canvas, ctx;
var canvasWidth = 635, canvasHeight = 480;
var introImgX = 100, introImgY = 60;
var introScriptX = 100, introScriptY = 300;

var introImages = {};
var introScripts = {};

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

window.onload= function(){
	//initBGM();

	canvas = document.getElementById("game");
	ctx = canvas.getContext("2d");

	main();
}

function main() {
	intro();
	// venture();
	// battle();
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

	idx++;
	processIntro(idx);
}


//canvas.addEventListener("click", processIntro);
//window.addEventListener("load", initImages);

function processIntro(idx) {

	var op = 0.1;
	var curImg = introImages[idx];
	// fade image in
	var timerImg = setInterval(function () {
		if (op >= 1) {
			clearInterval(timerImg);
		}

		ctx.save();
		ctx.globalAlpha = op;
		ctx.drawImage(curImg, introImgX, introImgY);
		op += op * 0.1;
		ctx.restore();
	}, 100);

	introScript(idx);
}

function introScript(idx){
	switch (idx){
		case 1:
			printIntroScript("먼 옛날,", 1);
			setTimeout(function() {
			printIntroScript("지구 위엔 두 종족이 살고 있었다.", 2);
			}, 2000);
			setTimeout(function() {
				printIntroScript("바로 인간과 괴물이었다.", 3);
			}, 6000);

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
		default: break;
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
			}
			else{
				x += 10;
			}
		}
		else {
			clearInterval(timer);
		}
	},150);
}

var bgmHandle = document.getElementById("bgmHandle");
bgmHandle.src = "sounds/BGM/01_OnceUponATime.ogg";
bgmHandle.play();

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