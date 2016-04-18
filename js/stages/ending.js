
var endingManager;
var scriptEndingCtr = 0;

function scriptEnding(){
    ableUserInput = false;
    scriptEndingCtr++;
    switch (scriptEndingCtr){
        case 1: endingManager.talk("...", "너의 의지가 없으면, 이야기는 나아가지 않아."); break;
        case 2: endingManager.talk("우리들은, 네가 있지 않으면 존재할 수 없어."); break;
        case 3: endingManager.talk("내가 하는 말의 의미가 무엇인지..."); break;
        case 4: endingManager.talk("언더테일이, 네게 무슨 메세지를 전하고 싶어 한다는 건지..."); break;
        case 5: endingManager.talk("...한번 잘 생각해줬으면 좋겠어."); break;
        case 6: endingManager.talk("그래도 상관하지 않겠다면...", "어쩔 수 없지."); break;
        case 7: endingManager.talk("다시 유튜브나 트위터를 뒤적거리러 가라고."); break;
        case 8: endingManager.talk("이젠 정말로 끝이야.","잘 가."); break;
        case 9: endingManager.talk("여기가 아닌 다른 곳에서 만날 수 있길 바래."); break;
        case 10: ctx.clearRect(0, 0, canvasWidth, canvasHeight); ableUserInput = true; break;
        case 11: setTimeout(function(){ ableUserInput = true; nothing();  }, 5*k);break;
        default: console.log("Error: inappropriate scriptEndingCtr value.");  break;
    }
}

var none = new NothingHappened();

function nothing(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    curStage = "nothing";
    ableUserInput = true;
    var instance = createjs.Sound.play("wind", {loop:-1});
}

function NothingHappened(){
    var self = this;
    self.x = 30;
    self.y = 300;
    self.clickCounter = 1;
    self.on = false;

    self.box = new TalkBox(self.x, self.y);

    self.message = function(){
        if (self.box.on) self.box.clear();
        else{ self.nothingHappened(); }
    };

    self.nothingHappened = function(){
        ableUserInput = false;
        var _x = self.x + 40;
        var _y = self.y + 50;
        var scriptString;
        var scriptStringSplit;

        if (self.clickCounter % 5 == 0) scriptString = "* 당신의 고집이 보답 받는 일은 여기에선 일어나지 않을 것이다.";
        else scriptString = "* ...하지만 아무 일도 일어나지 않았다.";

        scriptStringSplit = scriptString.split("");

        var scriptArea = 540;
        var nlFlag = false;
        var closeBox = false;
        var closeBoxInterval = 50;
        var closeBoxCounter = 0;
        var delay = false;
        var delayInterval = 50;
        var delayCounter = 0;
        var stringIdxChange = true;
        self.box.draw();
        var timer = setInterval(function(){
            if (closeBox){
                if (closeBoxCounter > closeBoxInterval){
                    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                    closeBox = false;
                    delay = true;
                }
                else closeBoxCounter++;
            }
            else if (delay) {
                if (delayCounter > delayInterval) {
                    clearInterval(timer);
                    delay = false;
                    ableUserInput = true;
                }
                else delayCounter++;
            }
            else {
                var char = scriptStringSplit.shift();
                if (char == ".") _x += 3;
                ctx.save();
                ctx.fillStyle = "#fff";
                if (_x > ( self.x + scriptArea)){
                    _y += 35;
                    _x = self.x + 75;
                    nlFlag = true;
                }

                ctx.font = "25px tbyt";
                ctx.fillText(char, _x, _y);
                ctx.restore();

                if (char == ",") { _x += 10; pause = true; }
                else if (char == "."){ _x += 10;
                    createjs.Sound.play("text"); }
                else if (char == " " && !nlFlag) _x += 10;
                else if (char !== " ") {
                    createjs.Sound.play("text");
                    _x += 23;
                }
                if (nlFlag) nlFlag = false;
                if (scriptStringSplit <= 0) {
                    closeBox = true;
                    _y += 35;
                    _x = self.x + 40;
                }
            }
        }, 50);
        self.clickCounter++;
    };
}

function ending(){
    setCookie();
    console.log("ending");
    curStage = "ending";
    endingManager = new Ending();
    createjs.Sound.play("ending");
    scriptEnding();
}

function Ending(){
    var self = this;
    self.x = 30;
    self.y = 300;
    self.box = new TalkBox(self.x, self.y);

    self.talk = function(){
        ableUserInput = false;
        var _x = self.x + 40;
        var _y = self.y + 50;
        var scriptString = {};
        var stringNum = 0;
        var scriptArea = 545;
        var curStringIdx = 0;
        var _talkSpeed = 70;

        for (var i = 0; i < arguments.length; i++){
            stringNum++; scriptString[i] = arguments[i];
        }

        var scriptStringSplit;
        var nlFlag = false;
        var pause = true;
        var pauseInterval = 10;
        var lingering = true;
        var lingeringInterval = 4;
        var lingeringCounter = 0;
        var pauseCounter = pauseInterval;
        var delay = false;
        var delayInterval = 10;
        var delayCounter = 0;
        var stringIdxChange = true;
        self.box.draw();
        var timer = setInterval(function(){
            // pauses for about (talkspeed times 8) secs when there's comma or line changes
            if (lingering){
                if (lingeringCounter > lingeringInterval){
                    lingering = false; lingeringCounter = 0;
                }
                else lingeringCounter++;
            }
            else if (delay){
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
                } else pauseCounter++;
            }
            else {
                var char = scriptStringSplit.shift();
                if (char == "."){
                    _x += 3; lingering = true;
                }
                ctx.save();
                ctx.fillStyle = "#fff";
                if (_x > ( self.x + scriptArea)){
                    _y += 35;
                    _x = self.x + 65;
                    nlFlag = true;
                }

                ctx.font = "25px tbyt";
                ctx.fillText(char, _x, _y);
                ctx.restore();

                if (char == ",") { _x += 10; pause = true; }
                else if (char == "."){ _x += 10;
                    createjs.Sound.play("hisVoice"); }
                else if (char == " " && !nlFlag) _x += 10;
                else if (char !== " ") {
                    createjs.Sound.play("hisVoice");
                    _x += 23;
                }
                if (nlFlag) nlFlag = false;
                if (scriptStringSplit <= 0) {
                    curStringIdx++;
                    stringIdxChange = true;
                    pause = true;
                    _y += 35;
                    _x = self.x + 40;
                }
            }
        }, _talkSpeed);
    };
}

function setCookie(){
    var expires = "Fri, 31 Dec 9999 23:59:59 GMT";
    document.cookie = "killed=true;path=/;expires="+expires+";";
}