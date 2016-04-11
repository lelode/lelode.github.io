var k = 1000;

var introScriptX = 120, introScriptY = 300;
var introImgWidth = 398, introImgHeight = 214;
var introImgX = 125, introImgY = 60;

function intro() {;
	// Erase screen
	curStage = "intro";
	ableUserInput = false;
	ctx.save();
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	ctx.restore();

	createjs.Sound.play("intro");
	timeoutSlideshow();
}

function introSlider(idx) {
	switch(idx){
		case 1:
			fadeBGIn(images.introBG);
			printIntroScript("먼 옛날,", 1);
			setTimeout(function() {printIntroScript("지상 위엔 두 종족이 살고 있었다.", 2)}, 1.3 * k);
			setTimeout(function() {printIntroScript("바로 ", 3)}, 4.5 * k);
			setTimeout(function() {fadeSpriteIn(images.intro1_human)}, 5 * k);
			setTimeout(function() {printIntroScript("인간", 3, 100, 2.5, true)}, 5 * k);
			setTimeout(function() {printIntroScript("과", 3, 100, 4.5)}, 5.3 * k);
			setTimeout(function() {fadeSpriteIn(images.intro1_monster)	}, 5.8 * k);
			setTimeout(function() {printIntroScript("괴물", 3, 100, 6, true)}, 5.8 * k);
			setTimeout(function() {printIntroScript("이었다.", 3, 100, 8)}, 6.1 * k);
			setTimeout(function() {clearCanvas()}, 8 * k);
			break;
		case 2:
			fadeBGIn(images.introBG, 50);
			printIntroScript("그러던 어느 날,", 1);
			setTimeout(function() {
				fadeSpriteIn(images.intro2_humans);
				printIntroScript("두 종족 사이에 전쟁이 벌어졌다.", 2)
			}, 2 * k);
			setTimeout(function(){	fadeSpriteIn(images.intro2_monsters)}, 2.5 * k);
			setTimeout(function(){	fadeSpriteIn(images.intro2_humanLeader)}, 3 * k);
			setTimeout(function(){	fadeSpriteIn(images.intro2_asgore)}, 3.5 * k);
			setTimeout(function() {clearCanvas()}, 6 * k);
			break;
		case 3:
			fadeBGIn(images.intro3_ground, 50);
			printIntroScript("기나긴 싸움 끝에", 1);
			setTimeout(function(){	fadeSpriteIn(images.intro3_monsters)}, 1.5 * k);
			setTimeout(function(){	fadeSpriteIn(images.intro3_humans)}, 2 * k);
			setTimeout(function(){	fadeSpriteIn(images.intro3_humanLeaders)}, 2.5 * k);
			setTimeout(function() {printIntroScript("승기를 잡은 것은 인간들이었다.", 2)}, 2 * k);
			setTimeout(function() {ctx.clearRect(introScriptX, introScriptY, 600, 300)}, 5 * k);
			break;
		case 4:
			fadeBGIn(images.intro4);
			printIntroScript("인간들은 마법 주문을 사용하여", 1);
			setTimeout(function() {printIntroScript("괴물들을 지하세계에 봉인하였다.", 2)}, 3 * k);
			setTimeout(function() {clearCanvas()}, 7 * k);
			break;
		case 5:
			printIntroScript("그 후로부터 오랜 시간이 지났다", 1);
			setTimeout(function() {printIntroScript("...", 1, k, 14.3)}, 1.5 * k);
			setTimeout(function() {clearCanvas()}, 6 * k);
			break;
		case 6:
			fadeBGIn(images.intro6);
			setTimeout(function() {printIntroScript("에봇 산", 1, 100, 5.1)}, 2 * k);
			setTimeout(function() {printIntroScript("201X년", 2, 100, 5)}, 3 * k);
			setTimeout(function() {clearCanvas()}, 5 * k);
			break;
		case 7:
			fadeBGIn(images.intro7, 50);
			printIntroScript("전설에 의하면,", 1);
			setTimeout(function () {printIntroScript("에봇 산에 한번 오르면", 2)}, 1.5 * k);
			setTimeout(function () {printIntroScript("다시는 돌아오지 못한다고 한다.", 3)}, 3.5 * k);
			setTimeout(function(){ fadeSpriteIn(images.intro7_chara1)}, 1.5 * k);
			setTimeout(function(){ fadeBGIn(images.intro7, 10)}, 2 * k);
			setTimeout(function(){ fadeSpriteIn(images.intro7_chara2)}, 3 * k);
			setTimeout(function(){ fadeBGIn(images.intro7, 10)}, 3.5 * k);
			setTimeout(function(){ fadeSpriteIn(images.intro7_chara3)}, 4.5 * k);
			setTimeout(function () { clearCanvas() }, 8 * k);
			break;
		case 8:
			fadeBGIn(images.intro8, 50);
			setTimeout(function(){ fadeSpriteIn(images.intro8_chara1)}, 1.5 * k);
			setTimeout(function(){
				ctx.clearRect(introImgX, introImgY, introImgWidth, introImgHeight);
				ctx.drawImage(images.intro8, introImgX, introImgY)
				ctx.drawImage(images.intro8_chara2, introImgX, introImgY);
			}, 3 * k);
			setTimeout(function(){
				ctx.clearRect(introImgX, introImgY, introImgWidth, introImgHeight);
				ctx.drawImage(images.intro8, introImgX, introImgY)
				ctx.drawImage(images.intro8_chara1, introImgX, introImgY);
			}, 4.5 * k);
			setTimeout(function () { clearCanvas() }, 6 * k);
			break;
		case 9:
			fadeBGIn(images.intro9, 50);
			setTimeout(function(){ fadeSpriteIn(images.intro9_foot1)}, 1.5 * k);
			setTimeout(function(){ fadeBGIn(images.intro9, 10)}, 2.5 * k);
			setTimeout(function(){ fadeSpriteIn(images.intro9_foot2)}, 3.2 * k);
			setTimeout(function () { clearCanvas() }, 5 * k);
			break;
		case 10:
			fadeBGIn(images.intro10, 10);
			setTimeout(function(){ fadeSpriteIn(images.intro10_chara1)}, 0.7 * k);
			setTimeout(function(){ fadeBGIn(images.intro10, 10)}, 2 * k);
			setTimeout(function(){ fadeSpriteIn(images.intro10_chara2)}, 2.7 * k);
			setTimeout(function(){ fadeBGIn(images.intro10, 10)}, 4 * k);
			setTimeout(function () { clearCanvas()}, 5 * k);
			break;
		case 11:
			fadeBGIn(images.intro11, 100, 0, 677-introImgHeight);
			setTimeout(function() { scrollImg(images.intro11, 677-introImgHeight)}, 3 * k);
			break;
		default: console.log("Error: introImageSlide unexpected index argument"); break;
	}
}

function fadeSpriteIn(img, x, y, speed){
	if (typeof(x)==='undefined') x = introImgX;
	if (typeof(y)==='undefined') y = introImgY;
	if (typeof(speed)==='undefined') speed = 10;

	var op = 0.1;

	var timer = setInterval(function () {
		ctx.save();
		ctx.globalAlpha = op;
		ctx.drawImage(img, x, y);
		ctx.restore();

		if (op < 1) {
			op += op * 0.20;
		}
		else clearInterval(timer);
	}, speed);
}

function fadeBGIn(img, speed, x, y){
	if (typeof(speed)==='undefined') speed = 100;
	if (typeof(x)==='undefined') x = 0;
	if (typeof(y)==='undefined') y = 0;

	var op = 0.1;

	var timer = setInterval(function () {
		ctx.save();
		ctx.globalAlpha = op;
		ctx.drawImage(img, x, y, introImgWidth, introImgHeight,
			introImgX, introImgY, introImgWidth, introImgHeight);
		ctx.restore();

		if (op < 1) {
			op += op * 0.1;
		}
		else clearInterval(timer);
	}, speed);
}

function scrollImg(img, y, speed) {
	if (typeof(speed)==='undefined') speed = 30;
	var sy = y;

	var timer = setInterval(function () {
		ctx.save();
		ctx.drawImage(img, 0, sy, introImgWidth, introImgHeight,
			introImgX, introImgY, introImgWidth, introImgHeight);
		ctx.restore();

		if (sy > 0) {
			sy -= 2;
		}
		else clearInterval(timer);
	}, speed);
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function timeoutSlideshow() {
	introSlider(1);
	setTimeout(function() { introSlider(2) }, 9 * k);
	setTimeout(function() { introSlider(3) }, 16 * k);
	setTimeout(function() { introSlider(4) }, 23 * k);
	setTimeout(function() { introSlider(5) }, 31 * k);
	setTimeout(function() { introSlider(6) }, 39 * k);
	setTimeout(function() { introSlider(7) }, 45 * k);
	setTimeout(function() { introSlider(8) }, 53 * k);
	setTimeout(function() { introSlider(9) }, 60 * k);
	setTimeout(function() { introSlider(10) }, 67 * k);
	setTimeout(function() { introSlider(11) }, 73 * k);
	setTimeout(function() { whiteFade() }, 86 * k);
	setTimeout(function() { venture(); }, 91 * k);
}

function whiteFade(){
	var op = 0.1;
	createjs.Sound.play("whiteout");

	var timer = setInterval(function () {

		ctx.save();
		ctx.globalAlpha = op;
		ctx.fillStyle = "#fff";
		ctx.fillRect(introImgX, introImgY, introImgWidth, introImgHeight);
		ctx.restore();

		if (op < 0.5) {
			op += op * 0.1;
		}
		else clearInterval(timer);
	}, 200);
}

function printIntroScript (scriptString, line, speed, indent, bold) {
	if (typeof(speed) === 'undefined') speed = 100;
	if (typeof(indent) === 'undefined') indent = introScriptX;
	else indent = (30*indent) + introScriptX;
	if (typeof(bold) === 'undefined') bold = false;

	var y = introScriptY + (line * 40);
	var scriptStringSplit = scriptString.split("");
	var curString = "";
	var sly = 0;
	var r = /\d+/;

	ctx.fillStyle = "#fff";
	if (bold) ctx.font = "25px tbytB";
	else ctx.font = "25px tbyt";

	var timer = setInterval(function () {
		if (scriptStringSplit.length > 0) {
			curString = scriptStringSplit.shift();

			ctx.save();
			ctx.fillText(curString, indent, y);
			ctx.restore();
			sly++;

			if (curString == ".") {
				indent += 10;
				createjs.Sound.play("typeWriting");
			}
			else if ( curString.match(r) || curString == 'X'){ // number or alphabet
				indent += 20;
				createjs.Sound.play("typeWriting");
			}
			else if (curString !== " ") {
				indent += 30;
				createjs.Sound.play("typeWriting");
			}
			else {
				indent += 10;
			}
		}
		else {
			clearInterval(timer);
		}
	}, speed);
}



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