var backgroundImg = {
    x: 0, y: 0,
    draw: function(){ ctx.drawImage(images.ruin, this.x, this.y) }
};

var talkBox = {
    width: 580,
    height: 154,
    x: 30, y: 10,
    scriptX: 30 + 150,
    scriptY: 10 + 50,
    talkboxOn: false,

    drawTalkBox: function(){
        ctx.fillStyle = "#fff";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#000";
        ctx.fillRect(this.x+5, this.y+5, this.width-10, this.height-10);
    },

    floweyTalk: function(){
        ableUserInput = false;
        var scriptString = {};
        var compareWord = {};
        var stringNum = 0;
        var _scriptX = this.scriptX, _scriptY = this.scriptY;
        var _x = _scriptX;
        var _y = _scriptY;
        var scriptArea = 420;
        var curStringIdx = 0;

        for (var i = 0; i < arguments.length; i++){
            if ( i < 3 ) { // first 3 strings are for prints
                stringNum++;
                scriptString[i] = arguments[i];
            }
            else { // rest strings are for compare
                compareWord += arguments[i].split("");
            }
        }

        var scriptStringSplit;
        var nlFlag = false;
        var pause = true;
        var pauseCounter = 10;
        var stringIdxChange = true;

        // if conversation box is already drawn, don't draw it again
        if (this.talkboxOn) {
            ctx.clearRect(this.scriptX, this.scriptY-20, scriptArea, 110);
        }
        else {
            this.drawTalkBox();
            this.talkboxOn = true;
        }

        var timer = setInterval(function(){
            // pauses for about (talkspeed times 8) secs when there's comma or line changes
            if (pause){
                if (curStringIdx == stringNum) { // if all 3 lines printed, end repeat
                    clearInterval(timer);
                    ableUserInput = true;
                }
                pauseCounter++;

                if (pauseCounter > 10){
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
            }
            else {
                var char = scriptStringSplit.shift();
                ctx.save();
                ctx.fillStyle = "#fff";

                // print color with yellow
                if (compareWord[0]) {
                    for (var i = 0; i < compareWord.length; i++){
                        if (char == compareWord[i])
                            ctx.fillStyle = "#ffff00";
                    }
                }

                // change line if sentence gets long
                if (_x > ( _scriptX + scriptArea-80)){
                    _y += 35;
                    _x = _scriptX + 25;
                    nlFlag = true;
                }

                ctx.font = "25px tbyt";
                ctx.fillText(char, _x, _y);
                ctx.restore();
                floweyVenture.playAnim("talk");
                floweyTalk.talkInBox(); // face in box moves

                if (char == ",") pause = true;
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
                    _x = _scriptX;
                }
            }
        }, 55);
    }
};

var floweyTalk = {
    xBox: 30 + 30,
    yBox: 10 + 25,
    xBattle: 275, yBattle: 100,
    width: 90,    height: 90,
    currentEmotion: 0,
    speakingRate: 5,
    frameCounter: 1,
    frameIdx: 0,

    drawFace: function(emote){
        var idx;
        switch(emote){
            case "smile": idx = 0; break;
        }
        ctx.drawImage(images.flowey_talk,
            0, idx, this.width, this.height,
            this.xBattle, this.yBattle, this.width, this.height
        );
    },

    talkInBattle: function(){
        if (this.frameCounter % this.speakingRate == 0) {
            this.frameIdx = (this.frameIdx == 1) ? 0 : 1;
            this.frameCounter = 1;
        }
        else this.frameCounter++;

        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.drawImage(images.flowey_talk,
            this.frameIdx * this.width, this.currentEmotion * this.height,
            this.width, this.height,
            this.xBattle, this.yBattle, this.width, this.height
        );
        ctx.restore();
    },

    talkInBox: function() {
        if (this.frameCounter % this.speakingRate == 0) {
            this.frameIdx = (this.frameIdx == 1) ? 0 : 1;
            this.frameCounter = 1;
        }
        else this.frameCounter++;

        ctx.save();
        ctx.drawImage(images.flowey_talk,
            this.frameIdx * this.width, this.currentEmotion * this.height,
            this.width, this.height,
            this.xBox, this.yBox, this.width, this.height
        );
        ctx.restore();
    }
};

var floweyVenture = {
    x: 300, y: 145,
    width: 48, height: 48,
    frameNum: 4,
    currentEmotion: 0,
    speakingRate: 5,
    frameCounter: 1,
    frameIdx: 0,

    playAnim: function(emote) {
        var row, col;
        var _x = this.x, _y = this.y;
        var _width = this.width, _height = this.height;
        var dir = 1;
        var _frameCounter = null;
        var speed = 100;
        var stopAnim = false;

        switch (emote){
            case "talk": row = 0; stopAnim = true; _frameCounter = this.frameCounter; break;
            case "sprout": row = 1; break;
            case "glare": row = 2; stopAnim = true; break;
            case "lookup": row = 2; break;
            case "lookdown": row = 2; dir = -1; break;
            case "excited": row = 3; stopAnim = true; break;
            default: console.log("floweyVenture/playAnim() incorrect emote argument"); break;
        }

        if (dir > 0) col = 0;
        else col = this.frameNum;  // if dir is negative num, play anim backwords

        if (stopAnim) {
            if (_frameCounter) { // for talking animation
                if (_frameCounter % this.speakingRate == 0) {
                    if (this.currentEmotion == 0) this.frameIdx = (this.frameIdx == 1) ? 0 : 1;
                    else if (this.currentEmotion == 1) this.frameIdx = (this.frameIdx == 2) ? 3: 2;
                    this.frameCounter = 1;
                }
                else this.frameCounter++;
                col = this.frameIdx;
            }

            ctx.save();
            ctx.drawImage(images.flowey_venture,
                col * _width, row * _height,
                _width, _height,
                _x, _y, _width, _height);
            ctx.restore();
        }
        else {
            var timer = setInterval(function(){
                ctx.save();
                ctx.drawImage(images.flowey_venture,
                    col * _width, row * _height,
                    _width, _height,
                    _x, _y, _width, _height);

                ctx.restore();
                if (dir > 0 && col < 3) col++;
                else if (dir < 0 && col > 0) col--;
                else clearInterval(timer);
            }, speed);
        }
    },

    excited: function(counter){
        if (counter >= 0 && counter < 4){
            ctx.save();
            ctx.drawImage(images.flowey_venture,
                counter * this.width, 3 * this.height,
                this.width, this.height,
                this.x, this.y,
                this.width, this.height);
            ctx.restore();
        }
    }
};

var frisk = {
    x: 303, y: 195,
    xSoul: null, ySoul: null,
    xSoulTarget: 310, ySoulTarget: 300,
    width: 40, height: 62,
    spriteFrame: 0,

    playAnim: function(emote){
        var angle;
        var col;
        switch (emote){
            case "lyingdown": col = 0; angle = 1.5; break;
            case "front": col = 0; break;
            case "back": col = 4; break;
            default: console.log("frisk/playAnim() incorrect emote argument"); break;
        }

        ctx.save();
        if (angle){
            ctx.translate(this.x, this.y);  // moves the origin
            ctx.translate(this.width+10, this.height/3);
            ctx.rotate(1.5);
            ctx.drawImage(images.frisk,
                col * this.width, 0,
                this.width, this.height,
                0, 0, this.width, this.height);
        }
        else {
            ctx.drawImage(images.frisk,
            col * this.width, 0,
            this.width, this.height,
            this.x, this.y, this.width, this.height);
        }

        ctx.restore();
    },

    drawSoul: function(){
        this.xSoul = this.xSoulTarget;
        this.ySoul = this.ySoulTarget;

        ctx.save();
        //ctx.clearRect(this.xSoul, this.ySoulTarget, images.friskSoul.width, images.friskSoul.height);
        ctx.drawImage(images.friskSoul, this.xSoul, this.ySoul);
        ctx.restore();
    },

    movesSoul: function(){
        createjs.Sound.play("battleStart");
        var _x = this.xSoul;
        var _y = this.ySoul;
        var xT = this.xSoulTarget;
        var yT = this.ySoulTarget;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        var timer = setInterval(function(){
            ctx.clearRect(_x, _y, images.friskSoul.width, images.friskSoul.height);
            ctx.drawImage(images.friskSoul, _x, _y);

            if ( _x < xT || _y < yT ){
                if ( _x < 310) _x++;
                if (_y < 300) _y += 2;
            }
            else clearInterval(timer);
        }, 50);
    },

    heartBeat: function(){
        createjs.Sound.play("heartBeat");
        var _x = this.xSoulTarget;
        var _y = this.ySoulTarget;
        var _xe = _x;
        var _ye = _y;
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

            if (op > 0) {
                _xe -= 55; _ye -= 55;
                effWidth += 110; effHeight += 110;
                ctx.save();
                ctx.globalAlpha = 1;
                if (op > 0.5){
                    op -= 0.2;
                    ctx.drawImage(images.friskSoul,
                        0, 0, images.friskSoul.width, images.friskSoul.height,
                        _x-5, _y-5, images.friskSoul.width+10, images.friskSoul.height+10);
                }
                else if (op < 0.5){
                    op -= 0.1;
                    ctx.drawImage(images.friskSoul, _x, _y);
                }
                ctx.restore();
            }
            else{
                clearInterval(timer);
                ctx.save();
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                ctx.drawImage(images.friskSoul, _x, _y);
                ctx.restore();
            }
            ctx.restore();
        },50);

    },

    beep: function(){
        frisk.playAnim("back");
        this.xSoul = this.x+5;
        this.ySoul = this.y+30;
        ctx.drawImage(images.friskSoul, this.xSoul, this.ySoul);
        createjs.Sound.play("beep");

        setTimeout(function(){
            ctx.clearRect(this.x, this.y, this.width, this.height);
            frisk.playAnim("back");
        }, 100);
    },

    getUp: function(angle, _x, _y) {
        ctx.save();
        ctx.translate(_x, _y);  // moves the origin
        ctx.translate(this.width+10, this.height/3);
        ctx.rotate(angle);
        ctx.drawImage(images.frisk,
            0, 0, this.width, this.height,
            0, 0, this.width, this.height
        );
        ctx.restore();
    },

    turn: function(counter){
        if (counter >= 0){
            ctx.save();
            ctx.drawImage(images.frisk,
                counter * this.width, 0, this.width, this.height,
                this.x, this.y, this.width, this.height
            )
            ctx.restore();
            if (counter >= 4) this.animCounter = 4;
        }
    }
};

// call this after intro
function venture(){

    backgroundImg.draw();
    frisk.playAnim("lyingdown");
    setTimeout(function(){
        floweyVenture.playAnim("sprout");
        createjs.Sound.play("pop");
     }, 1 * k);
    setTimeout(function(){ floweyVenture.playAnim("glare") }, 2 * k );
    setTimeout(function(){ floweyVenture.playAnim("lookup") }, 4 * k);
    setTimeout(function(){ floweyVenture.playAnim("lookdown") }, 6 * k);
    setTimeout(function(){ friskGetUp() }, 8 * k);
    setTimeout(function(){ adjustOrigin() }, 10 * k);
    setTimeout(function(){
        talkBox.floweyTalk("너, 지상에서 온 인간이구나!");
    }, 11 * k);
    setTimeout(function(){
        talkBox.talkboxOn = false;
        friskTurnAround();
    }, 15 * k);
    setTimeout(function(){
        curStage = "venture";
        createjs.Sound.play("flowey");
        floweyScriptVenture();
    }, 18 * k);

    /*
    // for test
    adjustOrigin();
    setTimeout(function(){ encounter()}, 1 * k);
    */
}


function floweyScriptVenture(){
    scriptVentureCtr++;
    switch (scriptVentureCtr){
        case 1: talkBox.floweyTalk("안녕!", "나는 노란 꽃 플라위야.", "만나서 반가워!", "노란", "플라위"); break;
        case 2: talkBox.floweyTalk("여기는 지하세계야.", "괴물들이 살고 있는 곳이지."); break;
        case 3:
            floweyTalk.currentEmotion = 1;
            floweyVenture.currentEmotion = 1;
            talkBox.floweyTalk("네가 어쩌다가 이런 곳으로 떨어지게 된 건진 모르겠지만..."); break;
        case 4: talkBox.floweyTalk("여긴 아주 위험한 곳이니까 되도록이면 빨리 이곳에서 나가는 게 좋아."); break;
        case 5: talkBox.floweyTalk("네가 출구를 찾으러 가기 전에"); break;
        case 6: talkBox.floweyTalk("아무 것도 모르는 채로 지하세계를 돌아다녔다간 위험한 일을 당할 수도 있으니까"); break;
        case 7:
            floweyTalk.currentEmotion = 0;
            floweyVenture.currentEmotion = 0;
            talkBox.floweyTalk("여기선 어떻게 해야 하는지 내가 알려줄게."); break;
        case 8: talkBox.floweyTalk("준비됐어?", "시작한다!"); break;
        case 9:
            ableUserInput = false;
            talkBox.talkboxOn = false;
            createjs.Sound.stop();
            encounter();
            break;
    }
}

function friskTurnAround(){
    var counter = 0;

    var timer = setInterval(function(){
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        backgroundImg.draw();
        floweyVenture.playAnim("excited");
        frisk.turn(counter);

        if (counter < 4) counter++;
        else clearInterval(timer);
    }, 300);
}

function friskGetUp() {
    var angle = 1.5;
    var x = frisk.x;
    var y = frisk.y;
    var counter = 0;
    var counter2 = 0;

    var timer = setInterval(function(){
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        backgroundImg.draw();
        frisk.getUp(angle, x, y);
        floweyVenture.excited(counter2);
        counter++;

        if (angle > 0){
            if (angle < 1.2 && counter % 3 == 0 && counter2 < 3){
                counter2++;
            }
            angle -= 0.1;
            x -= 3.3;
            y -= 1.5;
        }
        else clearInterval(timer);
    }, 40);
}

function adjustOrigin(){
    var timer = setInterval(function() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        backgroundImg.draw();
        floweyVenture.playAnim("excited");
        frisk.playAnim("front");

        if (backgroundImg.y < 60) {
            backgroundImg.y += 1;
            floweyVenture.y += 1;
            frisk.y += 1;
        }
        else clearInterval(timer);
    }, 10);
}