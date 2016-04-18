var ventureManager;

function VentureManager(){
    var self = this;

    self.floweyOverworld = new FloweyOverworldAnim();
    self.floweyTalk = new TalkingFlowey();
    self.human = new Human();
    self.bgImg = new BackgroundImage();

    self.humanTurnAround = function(){
        var counter = 0;

        var timer = setInterval(function(){
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            self.bgImg.draw();
            self.floweyOverworld.playAnim("excited");
            self.human.turn(counter);
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
            ventureManager.human.playAnim("lyingdown");
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
                ventureManager.human.playAnim("lyingdown");
            }
        }, 70);

    };
    self.humanGetUp = function(){
        var angle = 1.5;
        var _x = self.human.x;
        var _y = self.human.y;
        var counter = 0;
        var counter2 = 0;

        var timer = setInterval(function(){
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            self.bgImg.draw();
            self.human.getUp(angle, _x, _y);
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
            self.human.playAnim("front");

            if (self.bgImg.y < diff) {
                self.bgImg.y += 1;
                self.floweyOverworld.y += 1;
                self.human.y += 1;
            }
            else clearInterval(timer);
        }, 10);

        self.floweyTalk.floweyOverworld.y += diff;
    }
}

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
    setTimeout(function(){ ventureManager.humanGetUp() }, 12 * k);
    setTimeout(function(){ ventureManager.adjustOrigin() }, 14 * k);
    setTimeout(function(){
        ventureManager.floweyTalk.talk("너, 지상에서 온 인간이구나!");
    }, 15 * k);
    setTimeout(function(){
        ventureManager.floweyTalk.box.on = false;
        ventureManager.humanTurnAround();
    }, 19 * k);
    setTimeout(function(){
        curStage = "venture";
        var instance = createjs.Sound.play("yourBestFriend", {loop:-1});
        floweyScriptVenture();
    }, 22 * k);

    /*
    curStage = "venture";
    scriptVentureCtr = 6;
    var instance = createjs.Sound.play("yourBestFriend", {loop:-1});
    floweyScriptVenture();
    */
}

function floweyScriptVenture(){
    ableUserInput = false;
    scriptVentureCtr++;

    switch (scriptVentureCtr){
        case 1: ventureManager.floweyTalk.talk("안녕!", "나는 노란 꽃 플라위야.", "만나서 반가워!", "노란", "플라위"); break;
        case 2: ventureManager.floweyTalk.talk("여기는 지하세계야.", "괴물들이 살고 있는 곳이지."); break;
        case 3:
            ventureManager.floweyTalk.setEmotion("calm");
            ventureManager.floweyTalk.talk("네가 어쩌다가 이런 곳으로 떨어지게 된 건진 모르겠지만..."); break;
        case 4: ventureManager.floweyTalk.talk("여긴 아주 위험한 곳이니까,        빨리 이곳에서 나가는 게 좋아."); break;
        case 5: ventureManager.floweyTalk.talk("네가 출구를 찾으러 가기 전에"); break;
        case 6: ventureManager.floweyTalk.talk("아무 것도 모르는 채로 지하세계를 돌아다녔다간 위험한 일을 당할 수도 있으니까"); break;
        case 7:
            ventureManager.floweyTalk.setEmotion("smile");
            ventureManager.floweyTalk.talk("여기선 어떻게 해야 하는지          내가 알려줄게."); break;
        case 8:
            ventureManager.floweyTalk.talk("준비됐어?", "시작한다!");
            ableUserInput = false;
            ventureManager.floweyTalk.box.On = false;
            setTimeout(function(){ battle() }, 2.5 * k);
            break;
        default: console.log("Error: inappropriate ScriptVentureCtr value."); break;
    }
}