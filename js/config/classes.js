function BackgroundImage(){
    var self = this;
    self.x = 0; self.y = 0;
    self.draw = function(){ ctx.drawImage(images.ruin, self.x, self.y) };
}

function FloweyPortrait(xVal, yVal) {
    var self = this;
    self.x = xVal;
    self.y = yVal;
    self.width = 90;
    self.height = 90;
    self.emotion = 0;
    self.speakingRate = 3;
    self.frameCounter = 1;
    self.frameIdx = 0;
    self.opacity = 1;

    self.playVoice = function(){
        switch(self.emotion){
            case 12: createjs.Sound.play ("floweyDeepVoice"); break; // sorrowful
            case 13: createjs.Sound.play ("floweyDeeperVoice"); break;   // painful
            default: createjs.Sound.play ("floweyVoice"); break;
        }
    };

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
            case "sorrowful": self.emotion = 12; break;
            case "painful": self.emotion = 13; break;
            case "tearful": self.emotion = 14; break;
            case "crying": self.emotion = 15; break;
            default: console.log("floweyTalk/setEmotion wrong emote value"); idx = 1; break;
        }
        self.opacity = 1;
    };

    self.draw = function(word, _x, _y){
        if (word) self.setEmotion(word);
        if (_x) _x = self.x + _x; else _x = self.x;
        if (_y) _y = self.y + _y; else _y = self.y;
        ctx.drawImage(images.flowey_portrait,
            0, self.emotion * self.height,
            self.width, self.height,
            _x, _y, self.width, self.height);
    };

    self.talk = function(){
        if (self.frameCounter % self.speakingRate == 0) {
            self.frameIdx = (self.frameIdx == 1) ? 0 : 1;
            self.frameCounter = 1;
        }
        else self.frameCounter++;

        ctx.save();
        ctx.globalAlpha = self.opacity;
        ctx.drawImage(images.flowey_portrait,
            self.frameIdx * self.width, self.emotion * self.height,
            self.width, self.height,
            self.x, self.y, self.width, self.height
        );
        if (self.opacity = 1) self.opacity = 0.5;
        ctx.restore();
    };

    self.cry = function(){
        var counter = 0;
        self.setEmotion("tearful");
        var timer = setInterval(function(){
            ctx.save();
            ctx.globalAlpha = 0.5;
            self.draw();
            ctx.restore();
            if (counter < 10) counter++;
            else clearInterval(timer);
        }, 300);

        setTimeout(function(){
            self.setEmotion("crying");
            counter = 0;
            var timer = setInterval(function(){
                ctx.save();
                ctx.globalAlpha = 0.5;
                self.draw();
                ctx.restore();
                if (counter < 10) counter++;
                else clearInterval(timer);
            }, 300);
        },5*k);
    }
}


function SoulPiece(_dir, angle, _x, _y){
    var self = this;
    self.x = _x;
    self.y = _y;
    self.dir = _dir;
    self.size = 10;

    self.xVel = 3 + Math.cos(angle);
    self.yVeL = -10 * Math.sin(angle);
    self.rotation = 0;

    self.update = function(){
        self.yVeL += 0.5;
        self.x += self.dir * self.xVel;
        self.y += self.yVeL;
        self.rotation = (self.rotation + 0.2) % 12.5;
    };

    self.draw = function(){
        ctx.save();
        ctx.translate(self.x, self.y);
        ctx.translate(self.size/2, self.size/2);
        ctx.rotate(self.rotation);
        ctx.drawImage(images.soulPiece, -(self.size/2), -(self.size/2));
        ctx.restore();
        self.update();
    }
}

function Soul(){
    var self = this;
    self.x = 310;
    self.y = 300;
    self.op = 1;
    self.blinkCtr = 0;
    self.pieces = new Array();

    self.initPieces = function(){
        var p1 = new SoulPiece(-1, 60, self.x-2, self.y);
        var p2 = new SoulPiece(-1, 45, self.x-2, self.y+1);
        var p3 = new SoulPiece(-1, 15, self.x-2, self.y+2);
        var p4 = new SoulPiece(-1, 0, self.x-2, self.y);
        var p5 = new SoulPiece(1, 15, self.x+2, self.y+1);
        var p6 = new SoulPiece(1, 40, self.x+2, self.y+2);
        self.pieces.push(p1, p2, p3, p4, p5, p6);
    };

    self.hit = function(_x, _y){
        if (_x) _x = self.x + _x; else _x = self.x;
        if (_y) _y = self.y + _y; else _y = self.y;
        if (self.blinkCtr % 2 == 0){
            self.op = (self.op == 1) ? 0.5 : 1;
            self.blinkCtr = 0;
        }
        ctx.save();
        ctx.globalAlpha = self.op;
        ctx.drawImage(images.soul, _x, _y);
        ctx.restore();
        self.blinkCtr++;
    };

    self.splited = function(){
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        createjs.Sound.play("soulSplit");
        ctx.drawImage(images.soulSplited, self.x, self.y);
    };

    self.shatter = function(){
        self.initPieces();
        createjs.Sound.play("soulShatter");
        var counter = 0;
        var timer = setInterval(function () {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            for (var p in self.pieces){
                self.pieces[p].draw();
            }
            if (counter < 60) counter++;
            else clearInterval(timer);
        },40);
    }

    self.draw = function(_x, _y){
        if (_x === undefined) _x = self.x;
        if (_y === undefined) _y = self.y;
        ctx.drawImage(images.soul, _x, _y);
    };

    self.heartBeat = function(){
        createjs.Sound.play("heartBeat");
        var _xe = self.x;
        var _ye = self.y;
        var effWidth = images.soul.width;
        var effHeight = images.soul.height;
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
                    ctx.drawImage(images.soul,
                        0, 0, images.soul.width, images.soul.height,
                        self.x-5, self.y-5, images.soul.width+10, images.soul.height+10);
                }
                else if (op < 0.5){
                    op -= 0.1;
                    ctx.drawImage(images.soul, self.x, self.y);
                }
                ctx.restore();
            }
            else{
                clearInterval(timer);
                ctx.save();
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                ctx.drawImage(images.soul, self.x, self.y);
                ctx.restore();
            }
        },50);
    };
}


function Human(){
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
            default: console.log("Human/playAnim() incorrect emote argument"); break;
        }

        ctx.save();
        if (angle){ // moves the origin
            ctx.translate(self.x, self.y);
            ctx.translate(self.width+10, self.height/3);
            ctx.rotate(1.5);
            ctx.drawImage(images.human, col * self.width, 0,
                self.width, self.height, 0, 0, self.width, self.height);
        }
        else {
            ctx.drawImage(images.human, col * self.width, 0,
                self.width, self.height, self.x, self.y, self.width, self.height);
        }
        ctx.restore();
    };

    self.getUp = function(angle, _x, _y) {
        ctx.save();
        ctx.translate(_x, _y);  // moves the origin
        ctx.translate(self.width+10, self.height/3);
        ctx.rotate(angle);
        ctx.drawImage(images.human,
            0, 0, self.width, self.height,
            0, 0, self.width, self.height
        );
        ctx.restore();
    };

    self.turn = function(counter){
        if (counter >= 0 && counter < 5){
            ctx.save();
            ctx.drawImage(images.human,
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
            ctx.clearRect(_x, _y, images.soul.width, images.soul.height);
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

function TalkBox(_x, _y){
    var self = this;
    self.x = _x;
    self.y = _y;
    self.width = 580;
    self.height = 154;
    self.on = false;

    self.draw = function(){
        if (self.on){
            ctx.clearRect(self.x+40, self.y+10, self.width-60, self.height-20);
        }
        else {
            ctx.save();
            ctx.fillStyle = "#fff";
            ctx.fillRect(self.x, self.y, self.width, self.height);
            ctx.fillStyle = "#000";
            ctx.fillRect(self.x+5, self.y+5, self.width-10, self.height-10);
            ctx.restore();
            self.on = true;
        }
    }

    self.clear = function(){
        if (self.on){
            ctx.clearRect(self.x, self.y, self.width, self.height);
            self.on = false;
        } 
    }
}

function TalkingFlowey() {
    var self = this;

    self.x = 30;
    self.y = 10;
    self.xScript = self.x + 150;
    self.yScript = self.y + 50;
    self.talkboxOn = false;

    self.box = new TalkBox(self.x, self.y);
    self.floweyPortrait = new FloweyPortrait(self.x + 30, self.y + 25);
    self.floweyOverworld = new FloweyOverworldTalk();

    self.setEmotion = function(word){
        self.floweyPortrait.setEmotion(word);
        self.floweyOverworld.setEmotion(word);
    };

    self.talk = function(){
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
        var delay = false;
        var delayInterval = 10;
        var delayCounter = 0;

        var stringIdxChange = true;

        self.box.draw();
        self.floweyPortrait.draw();

        var timer = setInterval(function(){
            // pauses for about (talkspeed times 8) secs when there's comma or line changes
            if (delay){
                if (delayCounter > delayInterval){
                    clearInterval(timer);
                    delay = false;
                    ableUserInput = true;
                }
                else delayCounter++;
            }

            else if (pause){
                if (curStringIdx >= stringNum) delay = true;
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


                if (char == ",") { _x += 10; pause = true; }
                else if (char == "." || (char == " " && !nlFlag)) _x += 10;
                else if (char !== " ") {
                    self.floweyPortrait.talk();
                    self.floweyOverworld.talk();
                    self.floweyPortrait.playVoice();
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

function BattleBox(){
    var self = this;
    self.x = 210;
    self.y = 220;
    self.width = 220;
    self.height = 180;

    self.draw =function(op, _x, _y) {
        if (op === undefined) op = 1;
        if (_x) _x = self.x + _x; else _x = self.x;
        if (_y) _y = self.y + _y; else _y = self.y;

        ctx.save();
        ctx.globalAlpha = op;
        ctx.fillStyle = "#fff";
        ctx.fillRect(_x, _y, self.width, self.height);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#000";
        ctx.fillRect(_x+5, _y+5, self.width-10, self.height-10);
        ctx.restore();
    };
}

function StatusBar(){
    var self = this;
    self.x = 160;
    self.y = 435,
    self.hpMax = 20;
    self.hp = 20;

    self.draw = function(op, _x, _y){
        if (op === undefined) op = 1;
        if (_x) _x = self.x + _x; else _x = self.x;
        if (_y) _y = self.y + _y; else _y = self.y;

        ctx.save();
        ctx.globalAlpha = op;
        ctx.fillStyle = "#fff";
        ctx.font = "25px persuasionBRK";
        ctx.fillText("LV 1", _x, _y);
        ctx.fillText(self.hp + " / " + self.hpMax, _x + 200, _y);
        ctx.font = "17px persuasionBRK";
        ctx.fillText("HP", _x + 105, _y - 4);

        // hp bar
        if (self.hp < self.hpMax) { // if hp is not reduced, don't draw red part
            ctx.fillStyle = "#B40404";
            ctx.fillRect(_x + 150, _y - 20, 1.5 * self.hpMax , 20);
        }
        ctx.fillStyle = "#ffff00";
        ctx.fillRect(_x + 150, _y - 20, 1.5 * self.hp, 20);
        ctx.restore();
    };

    self.damaged = function(damage){ self.hp -= damage; };
}

function SpeechBubble(){
    var self = this;
    self.x = 360;
    self.y = 70;
    self.on = false;
    self.draw = function(){
        if (self.on) { // if speech bubble is already drawn, just paint area with white
            ctx.save();
            ctx.fillStyle = "#fff";
            ctx.fillRect(self.x + 45, self.y + 25, 195, 90);
            ctx.restore();
        }
        else {
            ctx.drawImage(images.speechBubble, self.x, self.y)
            self.on = true;
        }
    };

    self.clear = function(){
        if (self.on){
            ctx.clearRect(self.x+5, self.y, images.speechBubble.width, images.speechBubble.height);
            self.on = false;
        }
    };
}

function Pellet(_x, _y){
    var self = this;
    self.xt = _x;
    self.yt = _y;
    self.x = 310;
    self.y = 160;
    self.size = 10;
    self.angle = 0;
    self.accel = 2;

    self.spreadOut = function(){
        self.accel *= 1.1;
        self.accelCtr++;
        if (self.x < self.xt){
            var diff = self.xt - self.x;
            if (self.accel < diff) self.x += self.accel;
            else self.x += self.accel % diff;
        }
        else if (self.x > self.xt){
            var diff = self.xt - self.x;
            if (self.accel < diff) self.x -= self.accel;
            else self.x -= self.accel % diff;
        }
        if (self.y < self.yt){
            var diff = self.yt - self.y;
            if (self.accel < diff) self.y += self.accel+4;
            else self.y += self.accel % diff;
        }
    };

    self.rotating = function(){
        ctx.clearRect(self.x-self.size-2, self.y-self.size-2, self.size*2+5, self.size*2+5);
        self.draw();
    };

    self.draw = function(){
        self.angle = (self.angle + 1.0) % 12.5;
        ctx.save();
        ctx.translate(self.x, self.y);
        ctx.translate(self.size/2, self.size/2);
        ctx.rotate(self.angle);
        ctx.drawImage(images.pellet, -(self.size/2), -(self.size/2));
        ctx.restore();
    };

    self.fallDown = function(){
        if (self.y < canvasHeight) self.y += self.accel;
        self.draw();
        self.accel *= 1.1;
    };
}

function FloweyBattle(){
    var self = this;
    self.x = 360 + 50;
    self.y = 70 + 45;
    self.talkSpeed = 55;
    self.pauseInterval = 10;
    self.delayInterval = 12;
    self.yCumulation = 0;

    self.floweyPortrait = new FloweyPortrait(275, 100);
    self.speechBubble = new SpeechBubble();

    self.talk = function (args){
        var scriptString = {};
        var stringNum = 0;
        var _x = self.x;
        var _y = self.y;
        var scriptArea = 250;
        var curStringIdx = 0;
        var yGap = 20;
        var _ableUserInput = true;
        var _appending = false;
        var _lingering = false; // pause for ellipsis

        var _talkSpeed;
        var _pauseInterval;
        var _delayInterval;

        if (args.talkSpeed === undefined) _talkSpeed = self.talkSpeed;
        else _talkSpeed = args.talkSpeed;
        if (args.pauseInterval === undefined) _pauseInterval = self.pauseInterval;
        else _pauseInterval = args.pauseInterval / _talkSpeed;
        if (args.delay === undefined) _delayInterval = self.delayInterval;
        else _delayInterval = args.delay / _talkSpeed;

        if (args.s1) { scriptString[0] = args.s1; stringNum++; }
        if (args.s2) { scriptString[1] = args.s2; stringNum++; }
        if (args.s3) { scriptString[2] = args.s3; stringNum++; }
        if (args.s4) { scriptString[3] = args.s4; stringNum++; }
        if (args.emote) { self.floweyPortrait.setEmotion(args.emote); }
        if (args.ableInput == false) { _ableUserInput = false }
        if (args.lingering) { _lingering = true }
        if (args.appending == true) { _appending = true }

        var scriptStringSplit;
        var nlFlag = false;
        var pause = true;
        var pauseCounter = _pauseInterval;
        var stringIdxChange = true;
        var delay = false;
        var delayCounter = 0;
        var ellipsis = false;

        while (!scriptString[curStringIdx]){
            curStringIdx++; stringNum++;
        }

        if (scriptString[0]) self.yCumulation = 0;
        if (!_appending) self.speechBubble.draw();// if it's appending, don't draw bubble again

        var timer = setInterval(function(){
            if (delay){ // if print job is done, wait for a moment then able Users Input
                if (delayCounter > _delayInterval){
                    clearInterval(timer);
                    delay = false;
                    if (_ableUserInput) ableUserInput = true;
                }
                else delayCounter++;
            }
            // pauses for about (talkspeed times 8) secs when there's comma or line changes
            else if (pause){
                if (curStringIdx >= stringNum) delay = true; // if all lines printed, end repeat
                else if (pauseCounter > _pauseInterval){
                    if (stringIdxChange){
                        scriptStringSplit = scriptString[curStringIdx].split(""); // prepare for the next line
                        stringIdxChange = false;

                        _y = self.y + ( curStringIdx * yGap) + self.yCumulation;
                    }
                    pause = false;
                    pauseCounter = 0;
                }
                else pauseCounter++;
            }
            else {
                var char = scriptStringSplit.shift();
                if (char == "."){
                    _x += 3;
                    if (_lingering) pause = true;
                }

                // change line if sentence gets long
                if (_x > ( self.x + scriptArea-73)){
                    _y += yGap; self.yCumulation += yGap;
                    _x = self.x;
                    nlFlag = true;
                }

                ctx.save();
                ctx.fillStyle = "#000";
                ctx.font = "15px tbyt";
                ctx.fillText(char, _x, _y);
                ctx.restore();

                if (char == ",") pause = true;
                else if (char == "!") _x += 8;
                else if (char == " " && !nlFlag) _x += 8;
                else if (char == "."){
                    _x += 7;
                    self.floweyPortrait.playVoice();
                    self.floweyPortrait.draw();
                }
                else if (char !== " " ){
                    ellipsis = false;
                    _x += 12;
                    self.floweyPortrait.playVoice();
                    self.floweyPortrait.talk();
                }
                if (nlFlag) nlFlag = false;
                if (scriptStringSplit <= 0) {
                    self.floweyPortrait.draw();
                    curStringIdx++;
                    stringIdxChange = true;
                    pause = true;
                    _x = self.x;
                }
            }
        }, _talkSpeed);
    }
}