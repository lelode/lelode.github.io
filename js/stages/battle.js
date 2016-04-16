var battleInterface;

function battle(){
    battleInterface = new BattleInterface();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    createjs.Sound.stop();

    var beatCount = 1;
    var timer1 = setInterval(function(){
        ventureManager.frisk.beep();
        if (beatCount < 3) beatCount++;
        else clearInterval(timer1);
    }, 150);
    setTimeout(function(){ ventureManager.frisk.movesSoul() }, 600);
    setTimeout(function(){ ventureManager.frisk.soul.heartBeat() }, 2 * k);
    setTimeout(function(){ ventureManager.frisk.soul.draw() }, 5 * k);

    // flowey, box, interface fades in
    setTimeout(function(){
        var op = 0;
        var timer2 = setInterval(function(){
            ctx.save();
            ctx.globalAlpha = op;
            battleInterface.flowey.floweyPortrait.draw("smile");
            ctx.restore();
            battleInterface.box.draw(op);
            battleInterface.soul.draw();

            if (op < 1) op += 0.1;
            else clearInterval(timer2);
        }, 150);
    }, 5 * k);

    setTimeout(function(){ floweyScriptBattle() }, 7 * k);

    //for test
    /*
    battleInterface.box.draw();
    battleInterface.soul.draw();
    curStage = "battle";
    scriptBattleCtr = 56;
    floweyScriptBattle();
    */

}

var scriptBattleCtr = 0;
var struggleCtr = 0;

function floweyScriptBattle(){
    ableUserInput = false;
    scriptBattleCtr++;
    console.log("scriptBattleCtr: "+ scriptBattleCtr);
    switch (scriptBattleCtr){
        case 1:
            curStage = "battle";
            var instance = createjs.Sound.play("flowey", {loop:-1});
            battleInterface.flowey.talk({s1: "저 하트 모양 보이지?"});
            break;
        case 2: battleInterface.flowey.talk({s1: "저건 바로 네 영혼이야."}); break;
        case 3:
            var op = 0;
            // fade status bar in
            var timer = setInterval(function() {
                battleInterface.statusBar.draw(op);
                if (op < 1) op += 0.1;
                else clearInterval(timer);
            }, 100);

            setTimeout(function() {
                battleInterface.flowey.talk({emote: "calm",
                    s1:"지금의 네 영혼은 엄청 약해.",
                    s2:"만약 어떤 괴물이 너한테 해코지라도 했다간,",
                    s3:"바로 죽어버릴지도 몰라."});
            }, 2 * k);
            break;
        case 4:
            battleInterface.flowey.talk({emote: "smile", s1:"하지만 LV를 올리면", s2:"더 강해질 수 있어!"}); break;
        case 5: battleInterface.flowey.talk({pauseInterval: 1.5 * k, s1:"LV가 뭔지는 알지?", s2:"바로 LOVE의 준말이야."}); break;
        case 6: battleInterface.flowey.talk({s1:"네가 더 강해지고 싶다면,", s2:"LOVE를 많이 모으도록 해"}); break;
        case 7:
            battleInterface.flowey.talk({ableInput:false, pauseInterval: 100, s1:"널 위해서 내가 LOVE를", s2:"조금 나눠줄게."});
            setTimeout(function() {
                battleInterface.flowey.speechBubble.clear();
                battleInterface.drawPellets();
            }, 3 * k);

            setTimeout(function(){
                battleInterface.flowey.talk({pauseInterval: 100, s1:"이 하얀 조각들이 바로", s2:"LOVE야."});
            }, 6 * k);
            break;
        case 8:
            battleInterface.flowey.talk({ableInput:false, pauseInterval: 100, s1:"네 영혼을 움직여서 최대한", s2:"많이 모아봐!"});
            setTimeout(function(){
                battleInterface.flowey.talk({ableInput: false, s1:"자, 어서 움직여!"});
                battleInterface.drawArrows();
            }, 4 * k);
            setTimeout(function(){
                battleInterface.flowey.talk({s1: "뭐하고 있어?", s2:"어서 움직여보라니까?"});
                curStage = "struggling";
            }, 8 * k);
            break;
        case 9:
            curStage = "battle";
            battleInterface.flowey.talk({emote:"doubtful", pauseInterval:900,
                s1:"...??", s2:"잠깐만.", s3:"뭔가 이상한데."});
            break;
        case 10:
            battleInterface.flowey.talk({ableInput:false, emote:"unpleasant", talkSpeed:400, s1:"너..."});
            setTimeout(function(){
                battleInterface.flowey.talk({appending: true, s2:"움직이질 못하잖아?"});
            }, 3.5 * k);
            break;
        case 11:
            createjs.Sound.stop();
            createjs.Sound.play("suspense");
            battleInterface.flowey.talk({ableInput:false, s1:"그렇다는 건..."});
            setTimeout(function(){
                battleInterface.flowey.talk({ableInput:false, emote:"lookLeft", appending: true, s2:"여긴..."});
            }, 2 * k);
            setTimeout(function(){
                battleInterface.flowey.talk({ableInput:false, emote:"lookFront", appending: true, s3:"이건..."});
            }, 4 * k);
            setTimeout(function(){
                battleInterface.flowey.speechBubble.clear();
                battleInterface.dropPellets();
            }, 6 * k);
            setTimeout(function(){
                battleInterface.turnPage();
            }, 9 * k)
            setTimeout(function(){
                createjs.Sound.play("dramatic");
                battleInterface.flowey.talk({emote:"unpleasant", talkSpeed: 40, delay:3*k, s1:"이건 게임이 아니야!!"});
            }, 11 * k);
            break;
        case 12: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"vain", s1:"......"}) },1.5*k); break;
        case 13: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({pauseInterval:1, s1: "뭐가 어떻게 된 건지", s2:"모르겠다는 표정이네."}) },1.5*k); break;
        case 14: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"calm", s1:"내가 확실하게 말해줄게."}) },1.5*k); break;
        case 15: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"vain", pauseInterval: 600,
                s1:"너는 속았어.", s2:"지금 네가 하고 있는 이건", s3:"게임이 아니야."}) },1.5*k); break;
        case 16: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({pauseInterval:1, s1:"그냥 클릭하기만 하면 다음", s2:"장면으로 넘어가는 그림의", s3:"모음집이야."}) },2*k);
            break;
        case 17: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"그래서 네 마음대로 움직일 수 없는거지."}) },1.5*k); break;
        case 18: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"calm", pauseInterval: 800,
                s1:"더 알기 쉽게 말해줄까?", s2:"너 지금 그냥 만화 보고 있는 거야."}) },1.5*k); break;
        case 19: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"twisted", s1:"게임 하는 줄 알고 기대 많이 했을 텐데, 아쉽게 됐네."}) },1.5*k); break;
        case 20: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"그래도 뭐,", s2:"너도 뭔가 이상하다고 생각하긴 하지 않았어?"}) },1.5*k); break;
        case 21: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"mock", delay:1*k,
                s1:"원래 돈주고 사야하는 게임을 인터넷에서 공짜로 본다는 게 말이 되니?"}) },1.5*k); break;
        case 22: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"smile", s1:"자, 이 만화는 얼른 꺼버려."}) },1.5*k); break;
        case 23: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"twisted",
                s1:"여기서는 이야기가 그냥 일직선으로 진행돼버릴텐데,", s2: "그런게 대체 뭐가 재미있겠어?"}) },1.5*k); break;
        case 24: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"smile", s1:"가서 진짜 언더테일을 해봐.", s2:"알겠지?"}) },1.5*k); break;
        case 25: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"그럼 잘 가!"}) },1.5*k); break;
        case 26: battleInterface.turnPage(); ableUserInput = true; break;
        case 27: case 28: case 29: ableUserInput = true; break;
        case 30: battleInterface.flowey.talk({delay: 2*k, s1:"..."}); break;
        case 31: battleInterface.flowey.talk({delay: 2*k, appending:true, emote:"calm", s2:"......"}); break;
        case 32: battleInterface.flowey.talk({delay: 2*k, appending:true, emote:"doubtful", s3:"......?"}); break;
        case 33: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"lookFront", s1:"안 끄고 뭐하는 거야?"}) },1.5*k); break;
        case 34: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"내 말 안 들었어?", s2:"이건 진짜 게임이 아니라니까?"}) },1.5*k); break;
        case 35: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"unpleasant",
                s1:"...너 설마... "})},1.5*k); break;
        case 36:battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"unpleasant", pauseInterval: 900,
                s1:"언더테일을 이 만화로 보려고 하는 거야?", s2:"게임을 직접 해보는게 아니라?"})},1.5*k); break;
        case 37: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"sad", talkSpeed:100, delay: 1*k,
                s1:"...난 네가 그러지 않았으면 좋겠어."})}, 1.5*k); break;
        case 38: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"serious",
                s1:"진짜 언더테일에서는", s2:"네 선택에 따라서", s3:"이야기가 달라져."})}, 1.5*k); break; break;
        case 39: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({
                s1:"네가 하기에 따라 이 지하세계를 완전히 다른 곳으로 바꿀 수도 있다구."})}, 1.5*k); break;
        case 40: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"calm", pauseInterval: 1, s1:"바로 네 스스로가 이야기를", s2:"완성하는 존재가 되는 거야!"})}, 1.5*k); break;
        case 41: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"serious", s1: "하지만 네가 그냥 이 만화로 언더테일을 봐 버리기로 하면,",
                s2:"너는 이야기에 전혀 관여하지 못해."})}, 1.5*k); break;
        case 42: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({
                s1:"이 만화는 네가 원하는 바와는 상관없는 방향으로 멋대로 진행이 돼 버릴 거고"})}, 1.5*k); break;
        case 43:battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({
                s1:"네 언더테일에 대한 경험은", s2:"그렇게 단방향적으로 끝나버리겠지."})}, 1.5*k); break;
        case 44: battleInterface.turnPage();
                setTimeout(function(){ battleInterface.flowey.talk({emote:"sad", s1:"너는 그래도 괜찮은 거야?"})}, 1.5*k); break;
        case 45: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({
                s1:"어차피 도달하게 되는 곳이 같다면, 네가 직접 해보는 것과 그냥 지켜보는 것에 차이가 없다고 생각해?" })}, 1.5*k); break;
        case 46: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"serious", delay:2 * k,
                s1:"마지막 순간에 네가 느끼게 될 책임의 무게는 같지 않을걸?"})}, 1.5*k); break;
        case 47: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"calm",
            s1:"그런게 아니라면,", s2:"게임을 직접 해보기로 결정하기 전에 언더테일이 어떤 게임인지 알아두고 싶은 거야?"})}, 1.5*k); break;
        case 48: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({
                s1:"뭐, 그래.", s2:"대체 언더테일이란게 얼마나 대단한 게임이길래 이리도 야단법석인지" })}, 1.5*k); break;
        case 49: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"네가 시간을 투자할만한 가치가 있는 게임인지 확인해 보고 싶을 수야 있겠지."})}, 1.5*k); break;
        case 50: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"플레이를 하게 되면 어느 구간에서 어떻게 하는 게 유리한지 미리 알아두고 싶을 수도 있고"})}, 1.5*k); break;
        case 51: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({pauseInterval: 1*k,
                s1:"하지만 말이야.", s2:"네가 나중에라도 이 게임을 직접 해보고 싶은 마음이 조금이라도 있다면..." })}, 1.5*k); break;
        case 52: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"sad", s1:"지금이라도 이 만화를 꺼줬으면 좋겠어." })}, 1.5*k); break;
        case 53: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({
                s1:"게임에 대해서 아무것도 모르는 채로 게임을 시작하고 싶지 않은 기분은 이해해."})}, 1.5*k); break;
        case 54: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"게임이 별로 맘에 들지 않을 수도 있을 거고, 플레이하는 내내 실수도 많이 하게 될테니까" })}, 1.5*k); break;
        case 55: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"네가 잘못된 선택을 하는 바람에 원하지 않았던 결과가 나오게 된다면"})}, 1.5*k); break;
        case 56: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"미리 알아보지 않은 바람에 괜히 고생만 하고 시간낭비를 했다는 생각이 들지도 몰라."})}, 1.5*k); break;
        case 57: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"calm", s1:"하지만 게임의 가장 좋은 점이 뭔지 알아?" })}, 1.5*k); break;
        case 58: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"smile", s1:"바로 환불이 가능하다는 거야!" })}, 1.5*k); break;
        case 59: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({ableInput:false, emote:"twisted", pauseInterval: 1*k, s1:"...농담이고."})}, 1.5*k);
            setTimeout(function(){
                battleInterface.flowey.talk({emote:"calm", appending:true,
                s2:"게임의 가장 좋은 점은,", s3:"바로 다시 시작할 수 있다는 거야."})}, 3.5 * k); break;
        case 60: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"네가 포기하지 않고,", s2:"다시 도전하기로 한다면"})}, 1.5*k); break;
        case 61: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({pauseInterval: 1, 
                s1:"더 나은 방법을 찾겠다는", s2:"의지를 다진다면"})}, 1.5*k); break;
        case 62: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"너는 반드시,", s2:"지난번보다 더 좋은 결과를 이끌어 낼 수 있어."})}, 1.5*k); break;
        case 63: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"이건 언더테일이 전하는 가장 중요한 메세지고"})}, 1.5*k); break;
        case 64: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({delay:2*k,
                    s1:"네가 직접 게임에서 시행착오를 해보지 않으면 그 의미를 깨달을 수 없어."})}, 1.5*k); break;
        //case 65: battleInterface.turnPage();
            //setTimeout(function(){ battleInterface.flowey.talk({s1:""})}, 1.5*k); break;
        default:  battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"현재 여기까지 완성했단다." })}, 1.5*k); break;
    }
}

function BattleBox(){
    var self = this;
    self.x = 210;
    self.y = 220;
    self.width = 220;
    self.height = 180;

    self.draw =function(op) {
        if (op === undefined) op = 1;
        ctx.save();
        ctx.globalAlpha = op;
        ctx.fillStyle = "#fff";
        ctx.fillRect(self.x, self.y, self.width, self.height);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#000";
        ctx.fillRect(self.x+5, self.y+5, self.width-10, self.height-10);
        ctx.restore();
    };
}

function StatusBar(){
    var self = this;
    self.x = 160;
    self.y = 435,
    self.hpMax = 20;
    self.hp = 20;

    self.draw = function(op){
        if (op === undefined) op = 1;
        ctx.save();
        ctx.globalAlpha = op;
        ctx.fillStyle = "#fff";
        ctx.font = "25px persuasionBRK";
        ctx.fillText("LV 1", self.x, self.y);
        ctx.fillText(self.hp + " / " + self.hpMax, self.x + 200, self.y);
        ctx.font = "17px persuasionBRK";
        ctx.fillText("HP", self.x + 105, self.y - 4);

        // hp bar
        if (self.hp < self.hpMax) { // if hp is not reduced, don't draw red part
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(self.x + 150, self.y - 20, 1.5 * self.hpMax , 20);
        }
        ctx.fillStyle = "#ffff00";
        ctx.fillRect(self.x + 150, self.y - 20, 1.5 * self.hp, 20);
        ctx.restore();
    };
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
            ctx.fillRect(self.x + 45, self.y + 25, 190, 90);
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

function FloweyBattle(){
    var self = this;
    self.x = 360 + 50;
    self.y = 70 + 45;
    self.talkSpeed = 55;
    self.pauseInterval = 10;
    self.delayInterval = 12;
    self.yCumulation = 0;

    self.floweyPortrait = new FloweyProtrait(275, 100);
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
        if (args.appending == true) { _appending = true }

        var scriptStringSplit;
        var nlFlag = false;
        var pause = true;
        var pauseCounter = _pauseInterval;
        var stringIdxChange = true;
        var delay = false;
        var delayCounter = 0;

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
                if (curStringIdx >= stringNum) { // if all lines printed, end repeat
                    delay = true;
                    stringIdxChange = false;
                }
                pauseCounter++;

                if (pauseCounter > _pauseInterval){
                    if (stringIdxChange){
                        scriptStringSplit = scriptString[curStringIdx].split(""); // prepare for the next line
                        stringIdxChange = false;

                        _y = self.y + ( curStringIdx * yGap) + self.yCumulation;
                    }
                    pause = false;
                    pauseCounter = 0;
                }
            }
            else {
                var char = scriptStringSplit.shift();
                if (char == ".") _x += 3;
                // change line if sentence gets long
                if (_x > ( self.x + scriptArea-80)){
                    _y += yGap; self.yCumulation += yGap;
                    _x = self.x;
                    nlFlag = true;
                }

                ctx.save();
                ctx.fillStyle = "#000";
                ctx.font = "15px tbyt";
                ctx.fillText(char, _x, _y);
                ctx.restore();
                self.floweyPortrait.talk();

                if (char == ",") pause = true;
                else if (char == "!") _x += 8;
                else if (char == " " && !nlFlag) _x += 8;
                else if (char == "."){
                    _x += 7;
                    createjs.Sound.play ("floweyVoiceCham");
                }
                else if (char !== " " ){
                    _x += 12;
                    createjs.Sound.play ("floweyVoiceCham");
                }
                if (nlFlag) nlFlag = false;
                if (scriptStringSplit <= 0) {
                    curStringIdx++;
                    stringIdxChange = true;
                    pause = true;
                    _x = self.x;
                }
            }
        }, _talkSpeed);
    }
}

function BattleInterface() {
    var self = this;
    self.stopRotatePellets = false;

    self.flowey = new FloweyBattle();
    self.box = new BattleBox();
    self.statusBar = new StatusBar();
    self.soul = new Soul();

    self.pellets = new Array();


    self.initPellets = function(){
        var p1 = new Pellet(self.soul.x - 70, self.soul.y - 10);
        var p2 = new Pellet(self.soul.x - 40, self.soul.y - 35);
        var p3 = new Pellet(self.soul.x + 10, self.soul.y - 50);
        var p4 = new Pellet(self.soul.x + 55, self.soul.y - 35);
        var p5 = new Pellet(self.soul.x + 80, self.soul.y - 10);

        self.pellets.push(p1,p2,p3,p4,p5);
    };

    self.drawPellets = function(){
        self.initPellets();

        var counter = 0;
        var timer = setInterval(function(){
            if (counter < 25){
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                self.flowey.floweyPortrait.draw();
                self.box.draw();
                self.soul.draw();
                self.statusBar.draw();
                for (var p in self.pellets) {
                    self.pellets[p].spreadOut();
                    self.pellets[p].draw();
                }
                counter++;
            }
            else {
                for (var p in self.pellets)
                    self.pellets[p].rotating();
            }

            if (self.stopRotatePellets) clearInterval(timer);
        }, 50);
    };

    self.dropPellets = function(){
        self.stopRotatePellets = true;
        var counter = 0;
        for (var p in self.pellets) self.pellets[p].accel = 2;

        var timer = setInterval(function () {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            self.flowey.floweyPortrait.draw();
            self.box.draw();
            self.soul.draw();
            self.statusBar.draw();
            for (var p in self.pellets) self.pellets[p].fallDown();
            counter++;
            if (counter > 30) clearInterval(timer);
        }, 50);
    };

    self.drawArrows = function(){
        ctx.drawImage(images.arrows, self.soul.x-3, self.soul.y+40);
    };

    self.turnPage = function(){
        var counter = 0;
        createjs.Sound.play("pageTurning");
        var timer = setInterval(function(){
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            self.flowey.floweyPortrait.draw();
            self.box.draw();
            self.soul.draw();
            self.statusBar.draw();
            ctx.drawImage(images.pageTurn,
                0, counter * canvasHeight, canvasWidth, canvasHeight,
                0, 0, canvasWidth, canvasHeight);
            counter++;
            if (counter > 5) clearInterval(timer);
        }, 30);
        self.flowey.speechBubble.clear();
    }
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
        //var timer = setInterval(function(){
        self.angle = (self.angle + 1.0) % 12.5;
        ctx.save();
        ctx.translate(self.x, self.y);
        ctx.translate(self.size/2, self.size/2);
        ctx.rotate(self.angle);
        ctx.drawImage(images.pellet, -(self.size/2), -(self.size/2));
        ctx.restore();
        //}, 50);
    };

    self.fallDown = function(){
        if (self.y < canvasHeight) self.y += self.accel;
        self.draw();
        self.accel *= 1.1;
    };
}
