
function encounter(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    var beatCount = 1;
    var timer1 = setInterval(function(){
        frisk.beep();
        if (beatCount < 3) beatCount++;
        else clearInterval(timer1);
    }, 150);
    setTimeout(function(){ frisk.movesSoul() }, 600);
    setTimeout(function(){ frisk.heartBeat() }, 2 * k);
    setTimeout(function(){
        frisk.drawSoul();
    }, 5 * k);

    // flowey, box, interface fades in
    setTimeout(function(){
        var op = 0;
        var timer2 = setInterval(function(){
            ctx.save();
            ctx.globalAlpha = op;
            floweyTalk.drawFace("smile");
            ctx.restore();
            battleInterface.drawBattleBox(op);
            frisk.drawSoul();

            if (op < 1) op += 0.1;
            else clearInterval(timer2);
        }, 150);
    }, 5 * k);

    setTimeout(function(){ floweyScriptBattle() }, 7 * k);
}


var scriptBattleCtr = 0;

function floweyScriptBattle(){
    scriptBattleCtr++;
    switch (scriptBattleCtr){
        case 1:
            curStage = "battle";
            var myInstance = createjs.Sound.play("flowey", {loop:-1});
            battleInterface.floweyTalk("저 하트 모양 보이지?", "저건 바로 네 영혼이야.");
            break;
        case 2:
            var op = 0;
            // fade status bar in
            var timer = setInterval(function() {
                battleInterface.drawStatus(op);
                if (op < 1) op += 0.1;
                else clearInterval(timer);
            }, 100);

            setTimeout(function() {
                floweyTalk.currentEmotion = 1;
                battleInterface.floweyTalk("지금의 네 영혼은 엄청 약해.");
            }, 2*k);
            break;
        case 3:
            
    }
}


var battleInterface = {
    xbox: 210,  ybox: 220,
    xMessage: 160, yMessage: 435,
    xBubble: 360, yBubble: 70,
    xScript: 360 + 50, yScript: 70 + 45,
    width: 220, height: 180,
    hpMax: 20, hp: 20,
    bubbleOn: false,

    drawBattleBox: function(opacity) {
        if (typeof(opacity) === 'undefined') opacity = 1;
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = "#fff";
        ctx.fillRect(this.xbox, this.ybox, this.width, this.height);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#000";
        ctx.fillRect(this.xbox+5, this.ybox+5, this.width-10, this.height-10);
        ctx.restore();
    },

    drawStatus: function(op){
        if (typeof(op) === 'undefined') op = 1;
        console.log("op: " + op);
        ctx.save();
        ctx.globalAlpha = op;
        ctx.fillStyle = "#fff";
        ctx.font = "25px persuasionBRK";
        ctx.fillText("LV 1", this.xMessage, this.yMessage);
        ctx.fillText(this.hp + " / " + this.hpMax, this.xMessage+200, this.yMessage);
        ctx.font = "17px persuasionBRK";
        ctx.fillText("HP", this.xMessage + 105, this.yMessage-4);

        // hp bar
        if (this.hp < this.hpMax) { // if hp is not reduced, don't draw red part
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(this.xMessage + 150, this.yMessage-20, 1.5 * this.hpMax , 20);
        }
        ctx.fillStyle = "#ffff00";
        ctx.fillRect(this.xMessage + 150, this.yMessage-20, 1.5 * this.hp, 20);
        ctx.restore();
    },

    drawSpeechBubble: function(){
        ctx.drawImage(images.speechBubble, this.xBubble, this.yBubble);
    },

    floweyTalk: function(){
        ableUserInput = false;
        var scriptString = {};
        var compareWord = {};
        var stringNum = 0;
        var _xScript = this.xScript, _yScript = this.yScript;
        var _x = _xScript;
        var _y = _yScript;
        var scriptArea = 250;
        var curStringIdx = 0;
        var yGap = 20;

        for (var i = 0; i < arguments.length; i++){
            stringNum++;
            scriptString[i] = arguments[i];
        }

        var scriptStringSplit;
        var nlFlag = false;
        var pause = true;
        var pauseCounter = 20;
        var stringIdxChange = true;

        // if speech bubble is already drawn, just paint area with white
        if (this.bubbleOn) {
            ctx.save();
            ctx.fillStyle = "#fff";
            ctx.fillRect(this.xScript, this.yScript-20, scriptArea-100, 70);
            ctx.restore();
        }
        else {
            this.drawSpeechBubble();
            this.bubbleOn = true;
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
                    }
                    pause = false;
                    pauseCounter = 0;
                }
            }
            else {
                var char = scriptStringSplit.shift();

                // change line if sentence gets long
                if (_x > ( _xScript + scriptArea-80)){
                    _y += yGap;
                    _x = _xScript + 25;
                    nlFlag = true;
                }

                ctx.save();
                ctx.fillStyle = "#000";
                ctx.font = "15px tbyt";
                ctx.fillText(char, _x, _y);
                ctx.restore();
                floweyTalk.talkInBattle();

                if (char == ",") pause = true;
                else if (char == "." || (char == " " && !nlFlag)) _x += 11;
                else if (char !== " ") {
                    createjs.Sound.play("floweyVoiceCham");
                    _x += 11;
                }
                if (nlFlag) nlFlag = false;
                if (scriptStringSplit <= 0) {
                    curStringIdx++;
                    stringIdxChange = true;
                    pause = true;
                    _y += yGap;
                    _x = _xScript;
                }
            }
        }, 55);
    }
};
