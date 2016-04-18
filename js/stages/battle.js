var battleInterface;

function battle(){
    battleInterface = new BattleInterface();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    createjs.Sound.stop();

    var beatCount = 1;
    var timer1 = setInterval(function(){
        ventureManager.human.beep();
        if (beatCount < 3) beatCount++;
        else clearInterval(timer1);
    }, 150);
    setTimeout(function(){ ventureManager.human.movesSoul() }, 600);
    setTimeout(function(){ ventureManager.human.soul.heartBeat() }, 2 * k);
    setTimeout(function(){ ventureManager.human.soul.draw() }, 5 * k);

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

    /*
    //for test
    battleInterface.box.draw();
    battleInterface.soul.draw();
    curStage = "battle";
    scriptBattleCtr = 102;
    floweyScriptBattle();
    */
}

var scriptBattleCtr = 0;
var struggleCtr = 0;

function floweyScriptBattle(){
    ableUserInput = false;
    scriptBattleCtr++;
    switch (scriptBattleCtr){
        case 1:
            curStage = "battle";
            var instance = createjs.Sound.play("yourBestFriend", {loop:-1});
            battleInterface.flowey.talk({s1: "저 하트 모양 보이지?"});
            break;
        case 2: battleInterface.flowey.talk({s1: "저건 바로 네 영혼이야."}); break;
        case 3:
            var op = 0;
            var timer = setInterval(function() {
                battleInterface.statusBar.draw(op);
                if (op < 1) op += 0.1;
                else clearInterval(timer);
            }, 100);
            setTimeout(function() {
                battleInterface.flowey.talk({emote: "calm",
                    s1:"지금의 네 영혼은 엄청 약해.", s2:"만약 어떤 괴물이 너한테 해코지라도 했다간,", s3:"바로 죽어버릴지도 몰라."})}, 2 * k); break;
        case 4:
            battleInterface.flowey.talk({emote: "smile", s1:"하지만 LV를 올리면", s2:"더 강해질 수 있어!"}); break;
        case 5: battleInterface.flowey.talk({pauseInterval: 1.5 * k, s1:"LV가 뭔지는 알지?", s2:"바로 LOVE의 준말이야."}); break;
        case 6: battleInterface.flowey.talk({s1:"네가 더 강해지고 싶다면,", s2:"LOVE를 많이 모으도록 해."}); break;
        case 7:
            battleInterface.flowey.talk({ableInput:false, pauseInterval: 100, s1:"널 위해서 내가 LOVE를", s2:"조금 나눠줄게."});
            setTimeout(function() {
                battleInterface.flowey.speechBubble.clear();
                battleInterface.drawPellets();
            }, 3 * k);
            setTimeout(function(){
                battleInterface.flowey.talk({pauseInterval: 100, s1:"이 하얀 조각들이 바로", s2:"LOVE야."})}, 6 * k); break;
        case 8:
            battleInterface.flowey.talk({ableInput:false, pauseInterval: 100, s1:"네 영혼을 움직여서 최대한", s2:"많이 모아봐!"});
            setTimeout(function(){
                battleInterface.flowey.talk({ableInput: false, s1:"자, 어서 움직여!"});
                battleInterface.drawArrows();}, 4 * k);
            setTimeout(function(){
                battleInterface.flowey.talk({s1: "뭐하고 있어?", s2:"어서 움직여보라니까?"});
                curStage = "struggling"; }, 8 * k); break;
        case 9:
            createjs.Sound.stop();
            curStage = "battle";
            battleInterface.flowey.talk({emote:"doubtful", pauseInterval:900, s1:"...??", s2:"잠깐만.", s3:"뭔가 이상한데."}); break;
        case 10:
            battleInterface.flowey.talk({ableInput:false, emote:"unpleasant", talkSpeed:400, s1:"너..."});
            setTimeout(function(){battleInterface.flowey.talk({appending: true, s2:"움직이질 못하잖아?"})}, 3.5 * k); break;
        case 11:
            createjs.Sound.play("dangerMystery");
            battleInterface.flowey.talk({ableInput:false, pauseInterval:120, lingering:true, s1:"그렇다는 건..."});
            setTimeout(function(){
                battleInterface.flowey.talk({ableInput:false, pauseInterval:120, lingering:true, emote:"lookLeft", appending: true, s2:"여긴..."})}, 2 * k);
            setTimeout(function(){battleInterface.flowey.talk({ableInput:false, pauseInterval:120, lingering:true, emote:"lookFront", appending: true,
                s3:"이건..."})}, 4 * k);
            setTimeout(function(){battleInterface.flowey.speechBubble.clear();
                battleInterface.dropPellets()}, 6 * k);
            setTimeout(function(){battleInterface.turnPage();}, 9 * k);
            setTimeout(function(){createjs.Sound.play("dramatic");
                battleInterface.flowey.talk({emote:"unpleasant", talkSpeed: 40, delay:5*k, s1:"이건 게임이 아니야!!"})}, 11 * k); break;
        case 12: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"vain", s1:"......"}) },1.5*k); break;
        case 13: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({pauseInterval:1, s1: "뭐가 어떻게 된 건지", s2:"모르겠다는 표정이네."}) },1.5*k); break;
        case 14: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"calm", s1:"내가 확실하게 말해줄게."}) },1.5*k); break;
        case 15: battleInterface.turnPage();
            setTimeout(function(){
                var instance = createjs.Sound.play("dogsong", {loop:-1});
                battleInterface.flowey.talk({emote:"vain", pauseInterval: 600,
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
                s1:"원래 돈주고 사야하는 게임을  인터넷에서 공짜로 본다는 게  말이 되니?"}) },1.5*k); break;
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
        case 27: case 28: case 29: setTimeout(function(){ableUserInput = true;}, 500); break;
        case 30: battleInterface.flowey.talk({delay: 2*k, s1:"..."}); break;
        case 31: battleInterface.flowey.talk({delay: 2*k, appending:true, emote:"calm", s2:"......"}); break;
        case 32: battleInterface.flowey.talk({delay: 2*k, appending:true, emote:"doubtful", s3:"......?"}); break;
        case 33: battleInterface.turnPage();
            createjs.Sound.stop();
            setTimeout(function(){
                battleInterface.flowey.talk({emote:"lookFront", s1:"안 끄고 뭐하는 거야?"}) },1.5*k); break;
        case 34: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"내 말 안 들었어?", s2:"이건 진짜 게임이 아니라니까?"}) },1.5*k); break;
        case 35: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"unpleasant", lingering:true, pauseInterval:150,
                s1:"...너 설마... "})},1.5*k); break;
        case 36:battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"unpleasant", pauseInterval: 900,
                s1:"언더테일을 이 만화로 보려고  하는 거야?", s2:"게임을 직접 해보는게 아니라?"})},1.5*k); break;
        case 37: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"sad", talkSpeed:100, delay: 1*k,
                s1:"...난,", s2:"네가 그러지 않았으면 좋겠어."})}, 1.5*k); break;
        case 38: battleInterface.turnPage();
            createjs.Sound.play("respite");
            setTimeout(function(){ battleInterface.flowey.talk({emote:"serious",
                s1:"진짜 언더테일에서는,", s2:"네 선택에 따라서 이야기가    달라져."})}, 1.5*k); break; break;
        case 39: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({
                s1:"네가 하기에 따라, 지하세계가  완전히 다른 곳으로 바뀔 수도 있는 거야."})}, 1.5*k); break;
        case 40: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"calm", pauseInterval: 1, s1:"네 스스로가 이야기를", s2:"완성하는 존재가 되는 거지."})}, 1.5*k); break;
        case 41: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({ableInput:false, emote:"serious", lingering:true, pauseInterval:120,
                s1: "하지만 여기에선..."})}, 1.5*k);
            setTimeout(function(){ battleInterface.flowey.talk({appending:true,
                s2 :"너는 이야기에 전혀 관여하지  못해."})}, 4*k); break;
        case 42: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({
                s1:"이 만화는 네가 원하는 바와는 상관없는 방향으로 멋대로 진행 돼 버릴 거고"})}, 1.5*k); break;
        case 43:battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({
                s1:"네 언더테일에 대한 경험은", s2:"그렇게 단방향적으로 끝나겠지."})}, 1.5*k); break;
        case 44: battleInterface.turnPage();
                setTimeout(function(){ battleInterface.flowey.talk({emote:"sad", s1:"너는 그래도 괜찮은 거야?"})}, 1.5*k); break;
        case 45: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({
                s1:"어차피 도달하게 되는 곳이   같다면, 네가 직접 해보는 것과 그냥 지켜보는 것에 차이가   없다고 생각해?" })}, 1.5*k); break;
        case 46: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"serious", delay:2 * k,
                s1:"마지막 순간에 네가 느끼게 될 책임의 무게는 같지 않을걸?"})}, 1.5*k); break;
        case 47: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"calm",
                s1:"그게 아니면,", s2:"게임을 직접 해보기로 정하기   전에 언더테일이 어떤 게임인지 알아두고 싶은 거야?"})}, 1.5*k); break;
        case 48: battleInterface.turnPage();
            setTimeout(function () { battleInterface.flowey.talk({ableInput:false, s1:"뭐, 그래."})}, 1.5*k);
            setTimeout(function(){
                battleInterface.flowey.talk({appending:true, lingering:true, pauseInterval:120,
                s2:"언더테일이란게 도대체 얼마나 대단한 게임이길래 이렇게 유명한지..." })}, 4*k); break;
        case 49: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"네가 시간을 투자할만한 가치가 있는 게임인지 확인해 보고   싶을 수야 있겠지."})}, 1.5*k); break;
        case 50: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"나중에 어느 구간에서 어떻게  하는 게 유리한지 알아두고 싶을 수도 있고"})}, 1.5*k); break;
        case 51: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({ableInput:false, s1:"하지만 말이야."})}, 1.5*k);
            setTimeout(function(){ battleInterface.flowey.talk({appending:true, lingering:true, pauseInterval:120,
                s2:"네가 나중에라도 이 게임을 직접 해보고 싶은 마음이 조금이라도 있다면..."})}, 3*k); break;
        case 52: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"sad", s1:"지금이라도 이 만화를 꺼줬으면 좋겠어." })}, 1.5*k); break;
        case 53: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({
                s1:"게임에 대해서 아무것도 모르는 채로 게임을 시작하고 싶지 않은 기분은 이해해."})}, 1.5*k); break;
        case 54: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"게임이 별로 맘에 들지 않을 수도 있을 거고, 플레이하는 내내 실수도 많이 하게 될테니까." })}, 1.5*k); break;
        case 55: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({lingering:true, pauseInterval:120,
                s1:"네가 잘못된 선택을 하는 바람에 원하지 않았던 결과가 나오게  된다면..."})}, 1.5*k); break;
        case 56: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"미리 알아보지 않은 바람에 괜히 시간낭비 했다는 생각이 들지도 몰라."})}, 1.5*k); break;
        case 57: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"calm", s1:"하지만 게임의 가장 좋은 점이 뭔지 알아?" })}, 1.5*k); break;
        case 58: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"다시 시작할 수 있다는 거야." })}, 1.5*k); break;
        case 59: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({lingering:true, pauseInterval:200,
                s1:"네가 포기하지 않고", s2:"다시 도전하기로 한다면..."})}, 1.5*k); break;
        case 60: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({lingering:true, pauseInterval:120,
                s1:"더 나은 방법을 찾겠다는", s2:"의지를 다진다면..."})}, 1.5*k); break;
        case 61: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"너는 반드시,", s2:"지난번보다 더 좋은 결과를   이끌어 낼 수 있어."})}, 1.5*k); break;
        case 62: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"이건 언더테일이 전하는 가장  중요한 메세지고"})}, 1.5*k); break;
        case 63: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({s1:"네가 게임에서 직접 시행착오를 해보지 않으면 그 의미를 깨달을 수 없어."})}, 1.5*k); break;
        case 64: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({lingering:true, pauseInterval:150,
                s1:"더 나은 방법을 찾을 때까지  시간이 많이 걸릴지도 모르지만..."})}, 1.5*k); break;
        case 65: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({ableInput:false, s1:"네가 의지를 잃지 않는다면,", s2:"그 시간은 보상받을 거야."})}, 1.5*k);
            setTimeout(function(){ battleInterface.flowey.talk({appending:true, s3:"내가 약속할게."})}, 5*k); break;
        case 66: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({ableInput: false, emote:"sad", pauseInterval:1,
                s1:"그러니 실수하는걸", s2:"두려워하지마."})}, 1.5*k);
            setTimeout(function() {battleInterface.flowey.talk({appending:true, pauseInterval:1, s3:"잘못된 선택을 내릴까봐", s4:"겁내지마."})}, 3.6*k); break;
        case 67: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({emote:"calm", delay:2*k, pauseInterval: 1, s1:"네 의지가 어떤 결과를", s2:"가져오는지 지켜봐."})}, 1.5*k); break;
        case 68: battleInterface.turnPage();
            setTimeout(function(){ battleInterface.flowey.talk({
                s1:"내 말을 이해한다면,", s2:"지금이라도 이 만화를 끄고   게임을 직접 해보길 바래."})}, 1.5*k); break;
        case 69: battleInterface.turnPage(); ableUserInput = true; break;
        case 70: case 71: case 72: case 73: case 74: setTimeout(function(){ableUserInput = true;}, 500); break;
        case 75: battleInterface.flowey.talk({delay: 2*k, pauseInterval: 50, s1:"..."}); break;
        case 76: battleInterface.flowey.talk({delay: 2*k, pauseInterval: 50, appending:true, emote:"calm", s2:"......"}); break;
        case 77: battleInterface.flowey.talk({delay: 2*k, pauseInterval: 50, appending:true, emote:"serious", s3:"........."}); break;
        case 78:
            createjs.Sound.stop();
            var ins = createjs.Sound.play("raining", {loop:-1});
            battleInterface.flowey.talk({pauseInterval:120, delay: 1.5 * k, lingering:true, s1:"...아직도 이걸 보고 있네."}); break;
        case 79: battleInterface.flowey.talk({emote:"vain", delay: 1.5 * k, s1:"그렇게나 힘 안들이고 게임을   해 본 기분을 내고 싶어?"}); break;
        case 80: battleInterface.flowey.talk({emote:"doubtful", delay: 1.5 * k, s1:"의지니 뭐니 그런건", s2:"알 바 아니란 거지?"}); break;
        case 81: battleInterface.flowey.talk({emote:"twisted", s1:"하긴, 게임을 만화처럼 볼 수  있다는데, 그런 편리한걸 그냥  포기하고 싶겠어?"}); break;
        case 82: battleInterface.flowey.talk({s1:"그냥 앉아서 보고만 있으면    저절로 진행이 되는데 말이야."}); break;
        case 83: battleInterface.flowey.talk({s1:"네가 게임을 잘 못한다고 해도 게임오버 당할 걱정 같은 거   안해도 되고.", s2:"돈도 안 들고."}); break;
        case 84: battleInterface.flowey.talk({emote:"serious",
            s1:"아니면 게임에서 어떻게 되는지 이미 알고 있으니, 여기선 어떤 일이 일어나는지 궁금한가봐?"}); break;
        case 85: battleInterface.flowey.talk({
                s1:"그게 그렇게 알고 싶으면 내가 말해줄까?", s2:"여기에서 네가 어떻게 되는지?"}); break;
        case 86: battleInterface.flowey.talk({emote:"sad", lingering:true, pauseInterval:150, s1:"...여기에서의 너는..."}); break;
        case 87: battleInterface.flowey.talk({lingering:true, pauseInterval:150, s1:"네 스스로의 의지를 갖는 것을 포기한 너는..."}); break;
        case 88: battleInterface.flowey.talk({ableInput:false, talkSpeed: 70,
                s1:"공격을 당해도 반격할 수 없고,",s2:"다른 곳으로 도망칠 수도 없고,"});
            setTimeout(function(){ battleInterface.flowey.talk({appending:true, talkSpeed: 70, lingering:true, pauseInterval: 200,
                s3:"친구에게 도움을 요청할 수도   없어..."})}, 4*k); break;
        case 89: battleInterface.flowey.talk({lingering:true, pauseInterval:200, s1:"저 괴물들이 있는 곳에 발을  내딛는 순간..."}); break;
        case 90: battleInterface.flowey.talk({ableInput:false, lingering:true, pauseInterval:200, s1:"넌... "});
            setTimeout(function(){ battleInterface.flowey.talk({ableInput:false, appending:true, lingering:true, pauseInterval:200,
                s2:"아무 것도 하지 못하고... "})},2*k);
            setTimeout(function(){ battleInterface.flowey.talk({appending:true, lingering:true, pauseInterval:200,
                s3:"죽을 거야... "})},5*k); break;
        case 91: battleInterface.flowey.talk({ableInput:false, lingering:true, pauseInterval:200, s1:"그리고..."});
            setTimeout(function(){ battleInterface.flowey.talk(({emote:"sorrowful", appending: true, lingering:true, talkSpeed:80, pauseInterval:250, delay: 3*k,
            s2:"다시는 돌아오지 못할거야..."}))}, 3.5*k); break;
        case 92: battleInterface.flowey.talk({lingering:true, talkSpeed:80, pauseInterval:150, s1:"........."}); break;
        case 93: battleInterface.flowey.talk({lingering:true, talkSpeed:80, pauseInterval:200, s1:"나는..."}); break;
        case 94: battleInterface.flowey.talk({lingering:true, talkSpeed:80, pauseInterval:250, s1:"나는 너한테 그런 일이 일어나는 걸 보고 싶지 않아..."}); break;
        case 95: battleInterface.flowey.talk({lingering:true, talkSpeed:80, pauseInterval:250, s1:"그러니 제발..."}); break;
        case 96: battleInterface.flowey.talk({lingering:true, talkSpeed:80, pauseInterval:250, s1:"제발 돌아가...", s2:"지금이라도..."}); break;
        case 97: battleInterface.flowey.talk({lingering:true, talkSpeed:80, pauseInterval:250, s1:"그러지 않는다면..."}); break;
        case 98: battleInterface.flowey.talk({lingering:true, talkSpeed:80, pauseInterval:250, s1:"차라리...", s2:"차라리 내가..."}); break;
        case 99: createjs.Sound.stop();
            battleInterface.flowey.talk({emote:"painful", lingering:true, talkSpeed:100, pauseInterval:250, s1:"내가 이 자리에서 너를..."}); break;
        case 100: battleInterface.flowey.talk({delay: 2*k, lingering:true, pauseInterval: 100, s1:"......"}); break;
        case 101: battleInterface.flowey.talk({delay: 2*k, lingering:true, pauseInterval: 100, appending:true, s2:"......"}); break;
        case 102: battleInterface.flowey.talk({delay: 4*k, lingering:true, pauseInterval: 200, appending:true, s3:"........."}); break;
        case 103:
            ableUserInput = false;
            battleInterface.flowey.speechBubble.clear();
            setTimeout(function(){ battleInterface.flowey.floweyPortrait.cry()}, 2*k);
            setTimeout(function(){ battleInterface.killed() }, 10*k);
            setTimeout(function(){ ending() }, 23 * k); break;
        default: break;
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
                } counter++;
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

    self.drawArrows = function(){ ctx.drawImage(images.arrows, self.soul.x-3, self.soul.y+40) };

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
    };

    self.swipe = function(){
        var counter = 0;
        createjs.Sound.play("swipe");
        var timer = setInterval(function(){
            self.box.draw();
            self.soul.draw();
            ctx.drawImage(images.swiping,
                counter * 40, 0, 40, 120,
                self.soul.x, self.soul.y-50, 40, 120);
            if (counter < 5) counter++;
            else{
                self.box.draw();
                self.soul.draw();
                clearInterval(timer);
            }
        }, 180);
    };

    self.attacked = function(){
        var shakeCtr = 0;
        var moveDis = 30;
        var elasticity = 10;

        createjs.Sound.play("hit");
        self.statusBar.damaged(20);
        var timer = setInterval(function(){
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            if (shakeCtr % 2 == 0){
                self.flowey.floweyPortrait.draw("crying", moveDis);
                self.box.draw(1, moveDis);
                self.statusBar.draw(1, moveDis);
                self.soul.hit(moveDis);
            }
            else {
                self.flowey.floweyPortrait.draw();
                self.box.draw();
                self.statusBar.draw();
                self.soul.hit();
            }
            if (shakeCtr < 15){
                shakeCtr++;
                elasticity = Math.pow(elasticity, 0.8);
                moveDis -= elasticity;
            }
            else clearInterval(timer);
        }, 100);
    };

    self.killed = function(){
        self.swipe();
        setTimeout(function(){self.attacked()}, 1.7*k);
        setTimeout(function(){self.soul.splited()}, 4*k);
        setTimeout(function(){self.soul.shatter()}, 6*k);
    }
}

