var introImage, introScriptCanvas, ctxImage, ctxScript;
var canvas = document.getElementById("game");
var ctx;
var introIdx = 0;

var canvasWidth = 635, canvasHeight = 480;

var introImages = new Array();
var testImg = new Image();
testImg.src = "img/intro/1.png";

var bgmIntro;

function initBGM(){
	bgmIntro = new Audio();
	bgmIntro.src = "sounds/BGM/01_OnceUponATime.ogg"
	bgmIntro.loop = true;
	bgmIntro.play();
}

function initImages () {
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
}

//canvas.addEventListener("click", processIntro);
window.addEventListener("load", initImages);

function processIntro() {
	ctxScript.fillStyle = "black";
	ctxScript.fillRect(0, 0, 470, 110);
	ctxImage.fillStyle = "black";
	ctxImage.fillRect(0, 0, 398, 214);
	introIdx++;

	showIntroImg();
	showIntroScript();
}

window.onload= function(){
	//initBGM();
	Intro();
}

function Intro() {
	introImage = document.createElement("canvas");
	introScriptCanvas = document.createElement("canvas");

	introImage.width = 398;
	introImage.height = 214;
	introScriptCanvas.width = 470;
	introScriptCanvas.height = 110;

	ctx = canvas.getContext("2d");

	ctxImage = introImage.getContext("2d");
	ctxScript = introScriptCanvas.getContext("2d");
	//document.getElementById("game_container").appendChild(introImage);
	//document.getElementById("game_container").appendChild(introScriptCanvas);

	ctx.fillStyle = "white";
	ctx.fillRect(0,0, canvasWidth,canvasHeight);
	ctx.drawImage(testImg,100,70);
	//ctx.drawImage(testImg, 0, 0, 398, 211, 45, 20, 210, 110);
	ctx.fillStyle = "black";
	ctx.fillText("테스트 메시지", 100, 300);
	//ctx.clearRect(0, 0);
	//ctx.restore();

	/*
	introImage.style.position = "relative";
	introImage.style.top = "65px";
	introImage.style.left = "115px";

	introScriptCanvas.style.position = "relative";
	introScriptCanvas.style.top = "325px";
	introScriptCanvas.style.left = "115px";

	ctxScript.fillStyle = "white";
	ctxScript.font = "25px Arial";
	*/
	//showIntroImg();
}

function showIntroScript(){
	ctxScript.fillStyle = "white";

	switch (introIdx){
		case 1:
			ctxScript.fillText("먼 옛날, ", 0, 20);
			ctxScript.fillText("두 종족이 지구를 지배하고 있었다.", 0, 60);
			ctxScript.fillText("바로 인간과 괴물이었다.", 0, 100);
			break;
		case 2:
			ctxScript.fillText("어느 날, 두 종족 사이에 전쟁이", 0, 20);
			ctxScript.fillText("벌어졌다.", 0, 60);
			break;
		case 3:
			ctxScript.fillText("기나긴 싸움 끝에, 인간들은", 0, 20);
			ctxScript.fillText("승기를 잡았다.", 0, 60);
			break;
		case 4:
			ctxScript.fillText("인간들은 마법 주문을 사용하여", 0, 20);
			ctxScript.fillText("괴물들을 지하세계에 봉인하였다.", 0, 60);
			break;
		case 5:
			ctxScript.fillText("그 후로 오랜 시간이 흘렀다...", 0, 20);
			break;
		case 6:
			ctxScript.fillText("에봇 산", 170, 20);
			ctxScript.fillText("201X년", 170, 60);
			break;
		case 7:
			ctxScript.fillText("전설에 의하면, 에봇 산에 한번 오르면", 0, 20);
			ctxScript.fillText("다시는 돌아오지 못한다고 한다.", 0, 60);
			break;
		default: break;
	}
	
}

function showIntroImg(){
	introImage.style.opacity = 0;
	ctxImage.drawImage(introImages[introIdx], 0, 0);
	unfade(introImage);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

function typewrite() {

}

