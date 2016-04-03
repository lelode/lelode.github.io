var canvas = document.getElementById("game");
var ctxintroImg, ctxIntroScript;

var canvasWidth = 635, canvasHeight = 480;
var introScriptX = 120, introScriptY = 300;
var introImgWidth = 398, introImgHeight = 214;
var introImgX = 125, introImgY = 60;

var k = 1000;
var curStage = -1;

var assetNum = 4;
var soundLoaded = false;
var assetLoaded = false;

var images = {};
var assetsLeft = 0;

function addAsset(name,src){
	assetsLeft++;
	images[name] = new Image();
	images[name].src = src;
	images[name].onload = onAssetLoaded;
}

var onAssetLoaded = function(){
	assetsLeft--;
	if(assetsLeft==0){
		assetLoaded = true;

		if (soundLoaded && curStage < 0){
			title();
		}
	}
};

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
	ctx.font = "30px tbyt";
	ctx.fillText("LOADING...", 230, 300);
	ctx.restore();

	createjs.Sound.alternateExtensions = ["ogg"];
	createjs.Sound.on("fileload", handleLoad);

	createjs.Sound.registerSound("sounds/BGM/01_OnceUponATime.mp3", "intro");
	createjs.Sound.registerSound("sounds/SFX/title.mp3", "title");
	createjs.Sound.registerSound("sounds/SFX/typeWriting.mp3", "typeWriting")
	createjs.Sound.registerSound("sounds/SFX/awakening.mp3", "awakening")

	addAsset("title", "img/intro/title.png");
	addAsset("introBG", "img/intro/0.png");
	addAsset("intro1_human", "img/intro/1_human.png");
	addAsset("intro1_monster", "img/intro/1_monster.png");
	addAsset("intro2_humans", "img/intro/2_humans.png");
	addAsset("intro2_monsters", "img/intro/2_monsters.png");
	addAsset("intro2_humanLeader", "img/intro/2_humanLeader.png");
	addAsset("intro2_asgore", "img/intro/2_asgore.png");
	addAsset("intro3_ground", "img/intro/3_ground.png");
	addAsset("intro3_monsters", "img/intro/3_monsters.png");
	addAsset("intro3_humans", "img/intro/3_humans.png");
	addAsset("intro3_humanLeaders", "img/intro/3_humanLeaders.png");
	addAsset("intro4", "img/intro/4.png");
	addAsset("intro6", "img/intro/6.png");
	addAsset("intro7", "img/intro/7.png");
	addAsset("intro7_chara1", "img/intro/7_chara1.png");
	addAsset("intro7_chara2", "img/intro/7_chara2.png");
	addAsset("intro7_chara3", "img/intro/7_chara3.png");
	addAsset("intro8", "img/intro/8.png");
	addAsset("intro8_chara1", "img/intro/8_chara1.png");
	addAsset("intro8_chara2", "img/intro/8_chara2.png");
	addAsset("intro9", "img/intro/9.png");
	addAsset("intro9_foot1", "img/intro/9_foot1.png");
	addAsset("intro9_foot2", "img/intro/9_foot2.png");
	addAsset("intro10", "img/intro/10.png");
	addAsset("intro10_chara1", "img/intro/10_chara1.png");
	addAsset("intro10_chara2", "img/intro/10_chara2.png");
	addAsset("intro11", "img/intro/11.png");


	function handleLoad(event) {
		assetNum--;
		if ( assetNum <= 0 ){
			soundLoaded = true;
			console.log("sound load complete");
		}

		if (assetLoaded && soundLoaded && curStage < 0){
			console.log("sound initer start title");
			title();
		}
	}
};

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
		ctx.drawImage(images.title, 0, 0);
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
			setTimeout(function() {printIntroScript("이었다.", 3, 100, 8)}, 6.3 * k);
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
			setTimeout(function() {ctxIntroScript.clearRect(introScriptX, introScriptY, 600, 300)}, 5 * k);
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
			setTimeout(function() {printIntroScript("에봇 산", 1, 100, 5)}, 2 * k);
			setTimeout(function() {printIntroScript("201X년", 2, 100, 4.2)}, 3 * k);
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
				ctxintroImg.clearRect(introImgX, introImgY, introImgWidth, introImgHeight);
				ctxintroImg.drawImage(images.intro8, introImgX, introImgY)
				ctxintroImg.drawImage(images.intro8_chara2, introImgX, introImgY);
			}, 3 * k);
			setTimeout(function(){
				ctxintroImg.clearRect(introImgX, introImgY, introImgWidth, introImgHeight);
				ctxintroImg.drawImage(images.intro8, introImgX, introImgY)
				ctxintroImg.drawImage(images.intro8_chara1, introImgX, introImgY);
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
		ctxintroImg.save();
		ctxintroImg.globalAlpha = op;
		ctxintroImg.drawImage(img, x, y);
		ctxintroImg.restore();

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
		ctxintroImg.save();
		ctxintroImg.globalAlpha = op;
		ctxintroImg.drawImage(img, x, y, introImgWidth, introImgHeight,
			introImgX, introImgY, introImgWidth, introImgHeight);
		ctxintroImg.restore();

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
		ctxintroImg.save();
		ctxintroImg.drawImage(img, 0, sy, introImgWidth, introImgHeight,
			introImgX, introImgY, introImgWidth, introImgHeight);
		ctxintroImg.restore();

		if (sy > 0) {
			sy -= 2;
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

	introSlider(1);
	setTimeout(function() { introSlider(2) }, 9 * k);
	setTimeout(function() { introSlider(3) }, 16 * k);
	setTimeout(function() { introSlider(4) }, 23 * k);
	setTimeout(function() { introSlider(5) }, 31 * k);
	setTimeout(function() { introSlider(6) }, 38 * k);
	setTimeout(function() { introSlider(7) }, 45 * k);
	setTimeout(function() { introSlider(8) }, 55 * k);
	setTimeout(function() { introSlider(9) }, 61 * k);
	setTimeout(function() { introSlider(10) }, 67 * k);
	setTimeout(function() { introSlider(11) }, 73 * k); 	// DON'T MESS WITH THE NUMBERS.
	setTimeout(function() { whiteFade() }, 86 * k);
	setTimeout(function() { Unfinished() }, 91 * k);
}

function Unfinished() {
	ctx.save();
	ctx.globalAlpha = 1;
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	ctx.fillStyle = "#fff";
	ctx.font = "30px tbyt";
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

function printIntroScript (scriptString, line, speed, indent, bold) {
	if (typeof(speed) === 'undefined') speed = 100;
	if (typeof(indent) === 'undefined') indent = introScriptX;
	else indent = (30*indent) + introScriptX;
	if (typeof(bold) === 'undefined') bold = false;

	var elapsed = -speed;
	var y = introScriptY + (line * 40);
	var scriptStringSplit = scriptString.split("");
	var curString = "";
	var sly = 0;

	//ctxIntroScript.globalAlpha = 1;
	ctxIntroScript.fillStyle = "#fff";
	if (bold) ctxIntroScript.font = "25px tbytB";
	else ctxIntroScript.font = "25px tbyt";

	var timer = setInterval(function () {
		if (scriptStringSplit.length > 0) {
			curString = scriptStringSplit.shift();

			ctxIntroScript.save();
			ctxIntroScript.fillText(curString, indent, y);
			ctxIntroScript.restore();
			sly++;

			if (curString == "." || (typeof (curString) === 'number')) {
				indent += 10;
				createjs.Sound.play("typeWriting");
			}
			else if (curString !== " ") {
				indent += 30;
				createjs.Sound.play("typeWriting");
			}
			else {
				indent += 10;
			}
			elapsed += speed;
		}
		else {
			clearInterval(timer);
		}
	}, speed);
}