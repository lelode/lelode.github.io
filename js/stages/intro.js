var k = 1000;

function IntroSlider() {
	var self = this;
	self.xScript = 120;
	self.yScript = 300;
	self.widthScript = 40;
	self.heightScript = 40;
	self.speedScript = 100;
	self.pauseInterval = 10;

	self.xImage = 125;
	self.yImage = 60;
	self.widthImage = 398;
	self.heightImage = 214;

	self.fadeSpriteIn = function(img, speed){
		if (speed === undefined) speed = 10;
		var op = 0.1;
		var ratio = 0.2;

		var timer = setInterval(function () {
			ctx.save();
			ctx.globalAlpha = op;
			ctx.drawImage(img, self.xImage, self.yImage);
			ctx.restore();

			if (op < 1) op += op * ratio;
			else clearInterval(timer);
		}, speed);
	};

	self.fadeBGIn = function (img, speed, cx, cy) {
		if (cx === undefined) cx = 0;
		if (cy === undefined) cy = 0;
		if (speed === undefined) speed = 100;
		var op = 0.1;

		var timer = setInterval(function () {
			ctx.save();
			ctx.globalAlpha = op;
			ctx.drawImage(img,
				cx, cy, self.widthImage, self.heightImage,
				self.xImage, self.yImage, self.widthImage, self.heightImage);
			ctx.restore();

			if (op < 1)	op += op * 0.1;
			else clearInterval(timer);
		}, speed);
	};

	self.scrollImg = function(img, cy) {
		var speed = 30;
		var ratio = 2;

		var timer = setInterval(function () {
			ctx.save();
			ctx.drawImage(img,
				0, cy, self.widthImage, self.heightImage,
				self.xImage, self.yImage, self.widthImage, self.heightImage);
			ctx.restore();

			if (cy > 0) cy -= ratio;
			else clearInterval(timer);
		}, speed);
	};

	self.fadeWhiteOut = function(){
		var speed = 200;
		var op = 0.1;

		createjs.Sound.play("whiteout");
		var timer = setInterval(function () {
			ctx.save();
			ctx.globalAlpha = op;
			ctx.fillStyle = "#fff";
			ctx.fillRect(self.xImage, self.yImage, self.widthImage, self.heightImage);
			ctx.restore();

			if (op < 0.5) op += op * 0.1;
			else clearInterval(timer);
		}, speed);
	};

	self.printScript = function () {
		var _x = self.xScript;
		var _y = self.yScript;
		var speed = self.speedScript;

		var stringNum = 0;
		var scriptString = {};
		var scriptStringSplit;
		var compareWord = {};

		for (var i =0; i< arguments.length; i++){
			if (i < 3) {
				stringNum++;
				scriptString[i] = arguments[i];
			}
			else compareWord += arguments[i].split("");
		}

		var curStringIdx = 0;
		var pause = true;
		var pauseInterval = self.pauseInterval;
		var pauseCounter = pauseInterval;
		var lineChange = true;

		var timer = setInterval(function () {
			if (pause){
				if (curStringIdx >= stringNum) clearInterval(timer);
				else if (pauseCounter > pauseInterval) {
					if (lineChange){
						lineChange = false;
						scriptStringSplit = scriptString[curStringIdx].split("");
						_y += 35;
						_x = self.xScript;
					}
					pause = false;
					pauseCounter = 0;
				}
				else pauseCounter++;
			}

			else {
				var char = scriptStringSplit.shift();
				ctx.save();
				ctx.fillStyle = "#fff";
				ctx.font = "25px tbyt";

				if (compareWord[0]) {
					for (var i = 0; i< compareWord.length; i++) {
						if (char == compareWord[i]) ctx.font = "25px tbytB";
					}
				}

				ctx.fillText(char, _x, _y);
				ctx.restore();

				if (char == " ") _x += 10; // if it just printed empty space, move 10 pixel
				else { // if it didn't just printed empty space
					createjs.Sound.play("typeWriting"); // play typeWriter sound
					if (char == "," || char == ".") { // if it just printed , or .
						pause = true; _x += 10;
					}
					else if ( char.match(/\d+/) || char == 'X') _x += 20; // if char is number or alphabet
					else _x += 27;
				}

				if (scriptStringSplit <= 0){
					pause = true;
					lineChange = true;
					curStringIdx++;
				}
			}
		}, speed);
	};

	self.play = function(idx) {
		switch(idx){
			case 1:
				self.printScript("먼 옛날,", "지상 위엔 두 종족이 살고 있었다.", "바로 인간과 괴물이었다.", "인간","괴물");
				self.fadeBGIn(images.introBG);
				setTimeout(function(){ self.fadeSpriteIn(images.intro1_human) }, 5 * k);
				setTimeout(function(){ self.fadeSpriteIn(images.intro1_monster) }, 5.5 * k);
				setTimeout(function(){ ctx.clearRect(0, 0, canvasWidth, canvasHeight) }, 8 * k);
				break;
			case 2:
				self.printScript("그러던 어느 날,", "두 종족 사이에 전쟁이 벌어졌다.");
				self.fadeBGIn(images.introBG, 50);
				setTimeout(function(){ self.fadeSpriteIn(images.intro2_humans) }, 1.5 * k);
				setTimeout(function(){	self.fadeSpriteIn(images.intro2_monsters) }, 2.5 * k);
				setTimeout(function(){	self.fadeSpriteIn(images.intro2_humanLeader) }, 3 * k);
				setTimeout(function(){	self.fadeSpriteIn(images.intro2_asgore) }, 3.5 * k);
				setTimeout(function(){ ctx.clearRect(0, 0, canvasWidth, canvasHeight) }, 6 * k);
				break;
			case 3:
				self.printScript("기나긴 싸움 끝에", "승기를 잡은 것은 인간들이었다.");
				self.fadeBGIn(images.intro3_ground, 50);
				setTimeout(function(){ self.fadeSpriteIn(images.intro3_humans) }, 1.5 * k);
				setTimeout(function(){ self.fadeSpriteIn(images.intro3_monsters) }, 2 * k);
				setTimeout(function(){ self.fadeSpriteIn(images.intro3_humanLeaders) }, 2.5 * k);
				setTimeout(function(){ ctx.clearRect(self.xScript, self.yScript, 600, 300) }, 6 * k);
				break;
			case 4:
				self.printScript("인간들은 마법 주문을 사용하여", "괴물들을 지하세계에 봉인하였다.");
				self.fadeBGIn(images.intro4);
				setTimeout(function(){ ctx.clearRect(0, 0, canvasWidth, canvasHeight) }, 7 * k);
				break;
			case 5:
				self.pauseInterval = (800 / self.speedScript);
				self.printScript("그 후로부터 오랜 시간이 지났다...");
				setTimeout(function(){ ctx.clearRect(0, 0, canvasWidth, canvasHeight) }, 6 * k);
				break;
			case 6:
				self.pauseInterval = 10;
				self.xScript += 150;
				self.fadeBGIn(images.intro6);
				setTimeout(function(){ self.printScript(" 에봇 산","201X년") }, k);
				setTimeout(function(){ ctx.clearRect(0, 0, canvasWidth, canvasHeight) }, 6 * k);
				break;
			case 7:
				self.xScript -= 150;
				self.printScript("전설에 의하면,", "에봇 산에 한번 오르면", "다시는 돌아오지 못한다고 한다.");
				self.fadeBGIn(images.intro7, 50);
				setTimeout(function(){ self.fadeSpriteIn(images.intro7_human1) }, 1.5 * k);
				setTimeout(function(){ self.fadeBGIn(images.intro7, 10) }, 2 * k);
				setTimeout(function(){ self.fadeSpriteIn(images.intro7_human2) }, 3 * k);
				setTimeout(function(){ self.fadeBGIn(images.intro7, 10) }, 3.5 * k);
				setTimeout(function(){ self.fadeSpriteIn(images.intro7_human3) }, 4.5 * k);
				setTimeout(function(){ ctx.clearRect(0, 0, canvasWidth, canvasHeight) }, 8 * k);
				break;
			case 8:
				self.fadeBGIn(images.intro8, 50);
				setTimeout(function(){ self.fadeSpriteIn(images.intro8_human1)}, 1.5 * k);
				setTimeout(function(){
					ctx.clearRect(self.xImage, self.yImage, self.widthImage, self.heightImage);
					ctx.drawImage(images.intro8, self.xImage, self.yImage)
					ctx.drawImage(images.intro8_human2, self.xImage, self.yImage);
				}, 3 * k);
				setTimeout(function(){
					ctx.clearRect(self.xImage, self.yImage, self.widthImage, self.heightImage);
					ctx.drawImage(images.intro8, self.xImage, self.yImage);
					ctx.drawImage(images.intro8_human1, self.xImage, self.yImage);
				}, 4.5 * k);
				setTimeout(function() { ctx.clearRect(0, 0, canvasWidth, canvasHeight) }, 6.5 * k);
				break;
			case 9:
				self.fadeBGIn(images.intro9, 50);
				setTimeout(function(){ self.fadeSpriteIn(images.intro9_foot1)}, 1.5 * k);
				setTimeout(function(){ self.fadeBGIn(images.intro9, 10)}, 2.5 * k);
				setTimeout(function(){ self.fadeSpriteIn(images.intro9_foot2)}, 3.2 * k);
				setTimeout(function(){ ctx.clearRect(0, 0, canvasWidth, canvasHeight) }, 5 * k);
				break;
			case 10:
				self.fadeBGIn(images.intro10, 10);
				setTimeout(function(){ self.fadeSpriteIn(images.intro10_human1)}, 0.7 * k);
				setTimeout(function(){ self.fadeBGIn(images.intro10, 10)}, 2 * k);
				setTimeout(function(){ self.fadeSpriteIn(images.intro10_human2)}, 2.7 * k);
				setTimeout(function(){ self.fadeBGIn(images.intro10, 10)}, 4 * k);
				setTimeout(function(){ ctx.clearRect(0, 0, canvasWidth, canvasHeight) }, 5 * k);
				break;
			case 11:
				self.fadeBGIn(images.intro11, 100, 0, 677-self.heightImage);
				setTimeout(function(){ self.scrollImg(images.intro11, 677-self.heightImage)}, 3 * k);
				break;
			default: console.log("Error: introImageSlide unexpected index argument"); break;
		}
	};
}

function intro() {
	curStage = "intro";
	ableUserInput = false;

	ctx.save();
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	ctx.restore();

	var slider = new IntroSlider();
	createjs.Sound.play("onceUponATime");
	slider.play(1);
	setTimeout(function() { slider.play(2) }, 9 * k);
	setTimeout(function() { slider.play(3) }, 16 * k);
	setTimeout(function() { slider.play(4) }, 23 * k);
	setTimeout(function() { slider.play(5) }, 31 * k);
	setTimeout(function() { slider.play(6) }, 39 * k);
	setTimeout(function() { slider.play(7) }, 46 * k);
	setTimeout(function() { slider.play(8) }, 56 * k);
	setTimeout(function() { slider.play(9) }, 63.5 * k);
	setTimeout(function() { slider.play(10) }, 70 * k);
	setTimeout(function() { slider.play(11) }, 76 * k);
	setTimeout(function() { slider.fadeWhiteOut() }, 88 * k);
	setTimeout(function() { venture(); }, 92.5 * k);
}
