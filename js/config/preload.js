var images = {};
var assetsLeft = 0;

var loadingBarX = 120, loadingBarY = 350;

function drawLoadingBar(){
	ctx.save();
	ctx.fillStyle = "#fff";
	ctx.fillRect(loadingBarX, loadingBarY, 6, 10);
	ctx.restore();
	loadingBarX += 6;
}

var soundLoaded = false;
var assetLoaded = false;

var queue = new createjs.LoadQueue();

function soundloadHandler(event){
	drawLoadingBar();
};

function handleComplete1(){
	soundLoaded = true;
	drawLoadingBar();

	if (assetLoaded && soundLoaded && curStage == "loading") title();
}

function handleComplete2(){
	nothing();
}

function addAsset(name,src){
	assetsLeft++;
	images[name] = new Image();
	images[name].src = src;
	images[name].onload = onAssetLoaded(name);
}

var onAssetLoaded = function(){
	assetsLeft--;
	drawLoadingBar();
	if(assetsLeft==0){
		assetLoaded = true;

		if (soundLoaded && curStage == "loading") title();
	}
};

function initNothingSounds(){
	createjs.Sound.alternateExtensions = ["mp3"];
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("complete", handleComplete2);
	queue.loadManifest([
		{id:"wind",			src:"sounds/BGM/wind.ogg"},
		{id:"text",			src:"sounds/SFX/text.ogg"}
	]);
}

function initSounds(){
	createjs.Sound.alternateExtensions = ["mp3"];
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("fileload", soundloadHandler);
	queue.addEventListener("complete", handleComplete1);
	queue.loadManifest([
		{id:"onceUponATime", 		src:"sounds/BGM/OnceUponATime.ogg"},
		{id:"yourBestFriend", 		src:"sounds/BGM/YourBestFriend.ogg"},
		{id:"dangerMystery", 		src:"sounds/BGM/DangerMystery.ogg"},
		{id:"dogsong",				src:"sounds/BGM/Dogsong.ogg"},
		{id:"respite",				src:"sounds/BGM/Respite.ogg"},
		{id:"raining",				src:"sounds/BGM/RainingSomewhereElse.ogg"},	
		{id:"ending",				src:"sounds/BGM/AnEnding.ogg"},
		{id:"wind",					src:"sounds/BGM/wind.ogg"},

		{id:"title", 				src:"sounds/SFX/title.ogg"},
		{id:"typeWriting", 			src:"sounds/SFX/typeWriting.ogg"},
		{id:"whiteout", 			src:"sounds/SFX/whiteout.ogg"},
		{id:"pop", 					src:"sounds/SFX/pop.ogg"},
		{id:"beep", 				src:"sounds/SFX/beep.ogg"},
		{id:"heartBeat", 			src:"sounds/SFX/heartBeat.ogg"},
		{id:"battleStart", 			src:"sounds/SFX/battleStart.ogg"},
		{id:"pageTurning",			src:"sounds/SFX/pageTurning.ogg"},
		{id:"dramatic",				src:"sounds/SFX/dramatic.ogg"},
		{id:"floweyVoice", 			src:"sounds/SFX/floweyVoice.ogg"},
		{id:"floweyDeepVoice", 		src:"sounds/SFX/floweyDeepVoice.ogg"},
		{id:"floweyDeeperVoice",	src:"sounds/SFX/floweyDeeperVoice.ogg"},
		{id:"swipe",				src:"sounds/SFX/swipe.ogg"},
		{id:"hit",					src:"sounds/SFX/hit.ogg"},
		{id:"soulSplit",			src:"sounds/SFX/soulSplit.ogg"},
		{id:"soulShatter",			src:"sounds/SFX/soulShatter.ogg"},				
		{id:"hisVoice",				src:"sounds/SFX/voiceUnvrHeardB4.ogg"},
		{id:"text",					src:"sounds/SFX/text.ogg"}
	]);
}

function initIntroImages() {
	addAsset("title", "img/intro/title.png");
	addAsset("introBG", "img/intro/0.png");
	addAsset("intro1_human", "img/intro/1_human.png");
	addAsset("intro1_monster", "img/intro/1_monster.png");
	addAsset("intro2_humans", "img/intro/2_humans.png");
	addAsset("intro2_monsters", "img/intro/2_monsters.png");
	addAsset("intro2_humanLeader", "img/intro/2_humanLeader.png");
	addAsset("intro2_asgore", "img/intro/2_asgore.png");
	addAsset("intro3_ground", "img/intro/3_ground.png");
	addAsset("intro3_monsters", "img/intro/3_monsters.png");
	addAsset("intro3_humans", "img/intro/3_humans.png");
	addAsset("intro3_humanLeaders", "img/intro/3_humanLeaders.png");
	addAsset("intro4", "img/intro/4.png");
	addAsset("intro6", "img/intro/6.png");
	addAsset("intro7", "img/intro/7.png");
	addAsset("intro7_human1", "img/intro/7_human1.png");
	addAsset("intro7_human2", "img/intro/7_human2.png");
	addAsset("intro7_human3", "img/intro/7_human3.png");
	addAsset("intro8", "img/intro/8.png");
	addAsset("intro8_human1", "img/intro/8_human1.png");
	addAsset("intro8_human2", "img/intro/8_human2.png");
	addAsset("intro9", "img/intro/9.png");
	addAsset("intro9_foot1", "img/intro/9_foot1.png");
	addAsset("intro9_foot2", "img/intro/9_foot2.png");
	addAsset("intro10", "img/intro/10.png");
	addAsset("intro10_human1", "img/intro/10_human1.png");
	addAsset("intro10_human2", "img/intro/10_human2.png");
	addAsset("intro11", "img/intro/11.png");
}

function initIngameImages(){
	addAsset("ruin", 				"img/background/ruin.png");
	addAsset("pageTurn", 			"img/background/pageTurn.png");
	addAsset("speechBubble", 		"img/sprites/speechBubble.png");
	addAsset("human", 				"img/sprites/human.png");
	addAsset("soul", 				"img/sprites/soul.png");
	addAsset("soulSplited",			"img/sprites/soulSplited.png");
	addAsset("soulPiece",			"img/sprites/soulPiece.png");
	addAsset("flowey_overworld", 	"img/sprites/flowey_overworld.png");
	addAsset("flowey_portrait", 	"img/sprites/flowey_portrait.png");
	addAsset("heartBeatEffect", 	"img/sprites/heartBeat.png");
	addAsset("pellet", 				"img/sprites/pellet.png");
	addAsset("arrows",				"img/sprites/arrows.png");
	addAsset("swiping",				"img/sprites/swiping.png");
}

