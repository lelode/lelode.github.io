
function BackgroundImage(){
    var self = this;
    self.x = 0; self.y = 0;
    self.draw = function(){ ctx.drawImage(images.ruin, self.x, self.y) };
}

function VentureManager(){
    var self = this;

    self.floweyOverworld = new FloweyOverworldAnim();
    self.floweyTalk = new TalkingFlowey();
    self.frisk = new Frisk();
    self.bgImg = new BackgroundImage();

    self.friskTurnAround = function(){
        var counter = 0;

        var timer = setInterval(function(){
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            self.bgImg.draw();
            self.floweyOverworld.playAnim("excited");
            self.frisk.turn(counter);
            if (counter < 4) counter++;
            else clearInterval(timer);
        }, 300);
    };

    self.fadeIn = function(){
        var op = 1;
        var timer = setInterval(function(){
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            self.bgImg.draw();
            ventureManager.bgImg.draw();
            ventureManager.frisk.playAnim("lyingdown");
            ctx.save();
            ctx.globalAlpha = op;
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            ctx.restore();
            if (op > 0) op -= 0.1;
            else{
                clearInterval(timer);
                self.bgImg.draw();
                ventureManager.bgImg.draw();
                ventureManager.frisk.playAnim("lyingdown");
            }
        }, 70);

    };
    self.friskGetUp = function(){
        var angle = 1.5;
        var _x = self.frisk.x;
        var _y = self.frisk.y;
        var counter = 0;
        var counter2 = 0;

        var timer = setInterval(function(){
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            self.bgImg.draw();
            self.frisk.getUp(angle, _x, _y);
            self.floweyOverworld.excited(counter2);
            counter++;

            if (angle > 0){
                if (angle < 1.2 && counter % 3 == 0 && counter2 < 3) counter2++;
                angle -= 0.1;
                _x -= 3.3;
                _y -= 1.5;
            }
            else clearInterval(timer);
        }, 40);
    };
    self.adjustOrigin = function(){
        var diff = 60;
        var timer = setInterval(function() {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            self.bgImg.draw();
            self.floweyOverworld.playAnim("excited");
            self.frisk.playAnim("front");

            if (self.bgImg.y < diff) {
                self.bgImg.y += 1;
                self.floweyOverworld.y += 1;
                self.frisk.y += 1;
            }
            else clearInterval(timer);
        }, 10);

        self.floweyTalk.floweyOverworld.y += diff;
    }
}

function FloweyOverworldTalk(){
    var self = this;

    self.x = 300;
    self.y = 145;
    self.size = 48;

    self.frameCounter = 1;
    self.frameIdx = 0;
    self.speakingRate = 5;
    self.emotion = 0;

    self.setEmotion = function(word) {
        switch (word){
            case "smile": self.emotion = 0; break;
            case "calm": self.emotion = 1; break;
            default: console.log("FloweyOverworldTalk/setEmotion method wrong argument"); break;
        }
    };

    self.talk = function(){
        if (self.frameCounter % self.speakingRate == 0) {
            if (self.emotion == 0) self.frameIdx = (self.frameIdx == 1) ? 0 : 1;
            else if (self.emotion == 1) self.frameIdx = (self.frameIdx == 2) ? 3: 2;
            self.frameCounter = 1;
        }
        else self.frameCounter++;
        ctx.save();
        ctx.drawImage(images.flowey_overworld,
            self.frameIdx * self.size, 0,
            self.size, self.size,
            self.x, self.y, self.size, self.size);
        ctx.restore();
    };
}

function FloweyOverworldAnim(){
    var self = this;

    self.x = 300;
    self.y = 145;
    self.size = 48;
    self.frameNum = 4;

    self.excited = function(counter){
        if (counter >= 0 && counter < 4){
            ctx.save();
            ctx.drawImage(images.flowey_overworld,
                counter * self.size, 3 * self.size,
                self.size, self.size, self.x, self.y, self.size, self.size);
            ctx.restore();
        }
    };
    self.playAnim = function(word) {
        var row, col;
        var dir = 1;
        var speed = 100;
        var stopAnim = false;

        switch (word){
            case "sprout": row = 1; break;
            case "glare": row = 2; stopAnim = true; break;
            case "lookup": row = 2; break;
            case "lookdown": row = 2; dir = -1; break;
            case "excited": row = 3; stopAnim = true; break;
            default: console.log("FloweyOverworldAnim/playAnim() incorrect emote argument"); break;
        }

        if (dir > 0) col = 0;
        else col = self.frameNum;  // if dir is negative num, play anim backwords

        if (stopAnim) {
            ctx.save();
            ctx.drawImage(images.flowey_overworld,
                col * self.size, row * self.size,
                self.size, self.size, self.x, self.y, self.size, self.size);
            ctx.restore();
        }
        else {
            var timer = setInterval(function(){
                ctx.save();
                ctx.drawImage(images.flowey_overworld,
                    col * self.size, row * self.size,
                    self.size, self.size,
                    self.x, self.y, self.size, self.size);
                ctx.restore();
                if (dir > 0 && col < self.frameNum -1 ) col++;
                else if (dir < 0 && col > 0) col--;
                else clearInterval(timer);
            }, speed);
        }
    };
}

function FloweyProtrait(xVal, yVal) {
    var self = this;
    self.x = xVal;
    self.y = yVal;
    self.width = 90;
    self.height = 90;
    self.emotion = 0;
    self.speakingRate = 5;
    self.frameCounter = 1;
    self.frameIdx = 0;

    self.setEmotion = function(word){
        switch (word){
            case "smile": self.emotion = 0; break;
            case "calm": self.emotion = 1; break;
            case "doubtful": self.emotion = 2; break;
            case "unpleasant": self.emotion = 3; break;
            case "lookLeft": self.emotion = 4;  break;
            case "lookFront": self.emotion = 5; break;
            case "vain": self.emotion = 6; break;
            case "uneasy": self.emotion = 7; break;
            case "twisted": self.emotion = 8; break;
            case "mock": self.emotion = 9; break;
            case "sad": self.emotion = 10; break;
            case "serious": self.emotion = 11; break;
            default: console.log("floweyTalk/setEmotion wrong emote value"); idx = 1; break;
        }
    };

    self.draw = function(word){
        if (word) self.setEmotion(word);
        ctx.drawImage(images.flowey_portrait,
            0, self.emotion * self.height,
            self.width, self.height,
            self.x, self.y, self.width, self.height);
    };

    self.talk = function(){
        if (self.frameCounter % self.speakingRate == 0) {
            self.frameIdx = (self.frameIdx == 1) ? 0 : 1;
            self.frameCounter = 1;
        }
        else self.frameCounter++;

        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.drawImage(images.flowey_portrait,
            self.frameIdx * self.width, self.emotion * self.height,
            self.width, self.height,
            self.x, self.y, self.width, self.height
        );
        ctx.restore();
    };
}

function TalkingFlowey() {
    var self = this;

    self.width = 580;
    self.height = 154;
    self.x = 30;
    self.y = 10;
    self.xScript = self.x + 150;
    self.yScript = self.y + 50;
    self.talkboxOn = false;

    self.floweyPortrait = new FloweyProtrait(self.x + 30, self.y + 25);
    self.floweyOverworld = new FloweyOverworldTalk();

    self.setEmotion = function(word){
        self.floweyPortrait.setEmotion(word);
        self.floweyOverworld.setEmotion(word);
    };

    self.drawBox = function(){
        ctx.fillStyle = "#fff";
        ctx.fillRect(self.x, self.y, self.width, self.height);
        ctx.fillStyle = "#000";
        ctx.fillRect(self.x+5, self.y+5, self.width-10, self.height-10);
    };

    self.talk = function(){
        ableUserInput = false;
        var _x = self.xScript;
        var _y = self.yScript;
        var scriptString = {};
        var compareWord = {};
        var stringNum = 0;
        var scriptArea = 420;
        var curStringIdx = 0;

        for (var i = 0; i < arguments.length; i++){
            if ( i < 3 ) { // first 3 strings are for prints
                stringNum++;
                scriptString[i] = arguments[i];
            }
            else compareWord += arguments[i].split("");
        }

        var scriptStringSplit;
        var nlFlag = false;
        var pause = true;
        var pauseInterval = 10;
        var pauseCounter = pauseInterval;
        var stringIdxChange = true;

        // if conversation box is already drawn, don't draw it again
        if (self.talkboxOn) ctx.clearRect( self.xScript, self.yScript-20, scriptArea, 110);
        else {
            self.drawBox();
            self.talkboxOn = true;
            self.floweyPortrait.draw();
        }

        var timer = setInterval(function(){
            // pauses for about (talkspeed times 8) secs when there's comma or line changes
            if (pause){
                if (curStringIdx >= stringNum) { // if all 3 lines printed, end repeat
                    clearInterval(timer);
                    ableUserInput = true;
                }
                else if (pauseCounter > pauseInterval){
                    if (stringIdxChange){
                        scriptStringSplit = scriptString[curStringIdx].split(""); // prepare for the next line
                        stringIdxChange = false;
                        ctx.save();
                        ctx.fillStyle = "#fff";
                        ctx.font = "25px tbyt";
                        ctx.fillText("* ", _x, _y);
                        ctx.restore();
                        _x += 25;
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

                if (compareWord[0]) { // print color with yellow
                    for (var i = 0; i < compareWord.length; i++){
                        if (char == compareWord[i]) ctx.fillStyle = "#ffff00";
                    }
                }

                // change line if sentence gets long
                if (_x > ( self.xScript + scriptArea-30)){
                    _y += 35;
                    _x = self.xScript + 25;
                    nlFlag = true;
                }

                ctx.font = "25px tbyt";
                ctx.fillText(char, _x, _y);
                ctx.restore();
                self.floweyPortrait.talk();
                self.floweyOverworld.talk();

                if (char == ",") { _x += 10; pause = true; }
                else if (char == "." || (char == " " && !nlFlag)) _x += 10;
                else if (char !== " ") {
                    createjs.Sound.play("floweyVoiceCham");
                    _x += 23;
                }
                if (nlFlag) nlFlag = false;
                if (scriptStringSplit <= 0) {
                    curStringIdx++;
                    stringIdxChange = true;
                    pause = true;
                    _y += 35;
                    _x = self.xScript;
                }
            }
        }, 55);
    }
}

function Soul(){
    var self = this;
    self.x = 310;
    self.y = 300;

    self.draw = function(_x, _y){
        if (_x === undefined) _x = self.x;
        if (_y === undefined) _y = self.y;
        ctx.save();
        ctx.drawImage(images.friskSoul, _x, _y);
        ctx.restore();
    };

    self.heartBeat = function(){
        createjs.Sound.play("heartBeat");
        var _xe = self.x;
        var _ye = self.y;
        var effWidth = images.friskSoul.width;
        var effHeight = images.friskSoul.height;
        var op = 0.9;

        var timer = setInterval(function(){
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.save();
            ctx.globalAlpha = op;
            ctx.drawImage(images.heartBeatEffect,
                0, 0, images.heartBeatEffect.width, images.heartBeatEffect.height,
                _xe, _ye, effWidth, effHeight);
            ctx.restore();
            if (op > 0) {
                _xe -= 55; _ye -= 55;
                effWidth += 110; effHeight += 110;
                ctx.save();
                ctx.globalAlpha = 1;
                if (op > 0.5){
                    op -= 0.2;
                    ctx.drawImage(images.friskSoul,
                        0, 0, images.friskSoul.width, images.friskSoul.height,
                        self.x-5, self.y-5, images.friskSoul.width+10, images.friskSoul.height+10);
                }
                else if (op < 0.5){
                    op -= 0.1;
                    ctx.drawImage(images.friskSoul, self.x, self.y);
                }
                ctx.restore();
            }
            else{
                clearInterval(timer);
                ctx.save();
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                ctx.drawImage(images.friskSoul, self.x, self.y);
                ctx.restore();
            }
        },50);
    };
}

function Frisk(){
    var self = this;

    self.x = 303;
    self.y = 195;
    self.width = 40;
    self.height = 62;
    self.frame = 0;

    self.soul = new Soul();

    self.playAnim = function(word){
        var angle;
        var col;
        switch (word){
            case "lyingdown": col = 0; angle = 1.5; break;
            case "front": col = 0; break;
            case "back": col = 4; break;
            default: console.log("frisk/playAnim() incorrect emote argument"); break;
        }

        ctx.save();
        if (angle){ // moves the origin
            ctx.translate(self.x, self.y);
            ctx.translate(self.width+10, self.height/3);
            ctx.rotate(1.5);
            ctx.drawImage(images.frisk, col * self.width, 0,
                self.width, self.height, 0, 0, self.width, self.height);
        }
        else {
            ctx.drawImage(images.frisk, col * self.width, 0,
                self.width, self.height, self.x, self.y, self.width, self.height);
        }
        ctx.restore();
    };

    self.getUp = function(angle, _x, _y) {
        ctx.save();
        ctx.translate(_x, _y);  // moves the origin
        ctx.translate(self.width+10, self.height/3);
        ctx.rotate(angle);
        ctx.drawImage(images.frisk,
            0, 0, self.width, self.height,
            0, 0, self.width, self.height
        );
        ctx.restore();
    };

    self.turn = function(counter){
        if (counter >= 0 && counter < 5){
            ctx.save();
            ctx.drawImage(images.frisk,
                counter * self.width, 0, self.width, self.height,
                self.x, self.y, self.width, self.height
            );
            ctx.restore();
        }
    };

    self.movesSoul = function(){
        createjs.Sound.play("battleStart");
        var _x = self.x + 5;
        var _y = self.y + 30;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        var timer = setInterval(function(){
            ctx.clearRect(_x, _y, images.friskSoul.width, images.friskSoul.height);
            self.soul.draw(_x, _y);
            if ( _x < self.soul.x || _y < self.soul.y ){
                if ( _x < self.soul.x ) _x++;
                if ( _y < self.soul.y ) _y += 2;
            }
            else clearInterval(timer);
        }, 50);
    };

    self.beep = function(){
        self.playAnim("back");
        var _x = self.x + 5;
        var _y = self.y + 30;
        self.soul.draw(_x, _y);
        createjs.Sound.play("beep");

        setTimeout(function(){
            ctx.clearRect(self.x, self.y, self.width, self.height);
            self.playAnim("back");
        }, 100);
    };
}
var ventureManager;

function venture(){
    ventureManager = new VentureManager();
    ventureManager.fadeIn();

    setTimeout(function(){
        ventureManager.floweyOverworld.playAnim("sprout");
        createjs.Sound.play("pop");
     }, 5 * k);
    setTimeout(function(){ ventureManager.floweyOverworld.playAnim("glare") }, 6 * k );
    setTimeout(function(){ ventureManager.floweyOverworld.playAnim("lookup") }, 8 * k);
    setTimeout(function(){ ventureManager.floweyOverworld.playAnim("lookdown") }, 10 * k);
    setTimeout(function(){ ventureManager.friskGetUp() }, 12 * k);
    setTimeout(function(){ ventureManager.adjustOrigin() }, 14 * k);
    setTimeout(function(){
        ventureManager.floweyTalk.talk("너, 지상에서 온 인간이구나!");
    }, 15 * k);
    setTimeout(function(){
        ventureManager.floweyTalk.talkboxOn = false;
        ventureManager.friskTurnAround();
    }, 19 * k);
    setTimeout(function(){
        curStage = "venture";
        createjs.Sound.play("flowey");
        floweyScriptVenture();
    }, 22 * k);

    // for test
    //ventureManager.adjustOrigin()
    //setTimeout(function(){ battle()}, 1 * k);
}

function floweyScriptVenture(){
    scriptVentureCtr++;

    switch (scriptVentureCtr){
        case 1: ventureManager.floweyTalk.talk("안녕!", "나는 노란 꽃 플라위야.", "만나서 반가워!", "노란", "플라위"); break;
        case 2: ventureManager.floweyTalk.talk("여기는 지하세계야.", "괴물들이 살고 있는 곳이지."); break;
        case 3:
            ventureManager.floweyTalk.setEmotion("calm");
            ventureManager.floweyTalk.talk("네가 어쩌다가 이런 곳으로 떨어지게 된 건진 모르겠지만"); break;
        case 4: ventureManager.floweyTalk.talk("여긴 아주 위험한 곳이니까 되도록이면 빨리 이곳에서 나가는 게 좋아."); break;
        case 5: ventureManager.floweyTalk.talk("네가 출구를 찾으러 가기 전에"); break;
        case 6: ventureManager.floweyTalk.talk("아무 것도 모르는 채로 지하세계를 돌아다녔다간 위험한 일을 당할 수도 있으니까"); break;
        case 7:
            ventureManager.floweyTalk.setEmotion("smile");
            ventureManager.floweyTalk.talk("여기선 어떻게 해야 하는지 내가    알려줄게."); break;
        case 8:
            ventureManager.floweyTalk.talk("준비됐어?", "시작한다!");
            ableUserInput = false;
            ventureManager.floweyTalk.talkboxOn = false;
            setTimeout(function(){ battle() }, 2.5 * k);
            break;
        default: break;
    }
}