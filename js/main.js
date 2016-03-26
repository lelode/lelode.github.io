var canvas = document.getElementById("game");
var ctxIntroImg, ctxIntroScript;

var canvasWidth = 635, canvasHeight = 480;
var introScriptX = 120, introScriptY = 300;
var introImgX = 125, introImgY = 60;

var curStage = -1;
var introImages = {};

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

var bgmIntro;
/*
introScriptScreen = {
	x: 120,
	y: 300,
	_x: 120,
	_y: 300,
	width: 40,
	height: 40,
	ctx: canvas.getContext("2d"),
	scriptStringSplit: "",
	curString: "",
	sly: 0,

	type: function(scriptString, line) {
		this._x = this.x;
		this._y = this.y + (line * this.height);

		this.scriptStringSplit = scriptString.split("");

		var timer = setInterval(function () {
			if (this.scriptStringSplit.length > 0) {
				//console.log(scriptStringSplit.length);
				this.curString = this.scriptStringSplit.shift();

				ctx.save();
				ctx.fillStyle = "white";
				ctx.font = "30px 굴림";
				ctx.fillText(curString, this._x, this._y);
				ctx.restore();
				this.sly++;

				if (curString !== " "){
					this._x += 30;
					$.mbAudio.play('effectSprite',"typeWriting");
				}
				else{
					this._x += 10;
				}
			}
			else {
				clearInterval(timer);
			}
		},100);
	},
}

introImgScreen = {
	x: 125,
	y:  60,
	width:398,
	height: 214,
	idx: 1,
	op: 0.1,
	img: new Image(),
	ctx: canvas.getContext("2d"),

	setImg: function() {
		this.img.src = "img/intro/" + this.idx + ".png";
	},

	draw: function() {
		ctx.globalAlpha = this.op;
		ctx.drawImage(this.img, this.x, this.y);

		if (this.op < 1) {
			this.op += this.op * 0.1;
		}
	},

	next: function() {
		ctx.save();
		ctx.fillStyle = "black";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.restore();
		this.idx++;
		this.op = 0.1;
		this.setImg();
	}
}
*/

window.onload= function(){
	//initBGM();

	$(document).trigger('initAudio');

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

	/*
	introImgScreen.setImg();
	var timer = setInterval(function () {
		introImgScreen.draw();
	},100);
	*/
	timeoutSlideshow();
	timeoutTypewrite();

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

function clearIntroImg() {
	ctxIntroImg.save();
	ctxIntroImg.fillStyle = "black";
	ctxIntroImg.fillRect(introImgX, introImgY, 400, 400);
	ctxIntroImg.restore();
}

function processIntro(idx) {
	var op = 0.1;
	var curImg = introImages[idx];

	var timer = setInterval(function () {
		DrawIntroImg(op, idx);
		if (op < 1) {
			op += op * 0.1;
		}
		else clearInterval(timer);
	}, 100);
}

function DrawIntroImg (op, idx){
	ctxIntroImg.save();
	ctxIntroImg.globalAlpha = op;
	ctxIntroImg.drawImage(introImages[idx], introImgX, introImgY);
	ctxIntroImg.restore();
}

function timeoutSlideshow(){
	processIntro(1);
	setTimeout(function() {
		clearIntroImg();
	},9000);

	setTimeout(function() {
		processIntro(2);
	},12000);
}

function timeoutTypewrite(){
	printIntroScript("먼 옛날,", 1);
	setTimeout(function() {
		printIntroScript("지상 위엔 두 종족이 살고 있었다.", 2);
	}, 2000);

	setTimeout(function() {
		printIntroScript("바로 인간과 괴물이었다.", 3);
	}, 6000);

	setTimeout(function() {
		clearIntroScript();
	}, 9000);

	setTimeout(function() {
		printIntroScript("그러던 어느 날,", 1);
	}, 12000);
	setTimeout(function() {
		printIntroScript("두 종족 사이에 전쟁이 벌어졌다.", 2);
	}, 15000);

	setTimeout(function() {
		clearIntroScript();
	}, 19000);
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

function clearIntroScript(){
	ctxIntroScript.save();
	ctxIntroScript.fillStyle = "black";
	ctxIntroScript.fillRect(introScriptX, introScriptY, 600, 400);
	ctxIntroScript.restore();
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

			ctxIntroScript.save();
			ctxIntroScript.fillStyle = "white";
			ctxIntroScript.font = "30px 굴림";
			ctxIntroScript.fillText(curString, x, y);
			ctxIntroScript.restore();
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