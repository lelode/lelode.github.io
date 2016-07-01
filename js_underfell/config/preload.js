var gImages = {};
var assetsLeft = 0;

var totalAssetNum = 8;

var loadingBarX = 120, loadingBarY = 350;

function drawLoadingBar(){
	gCtx.save();
	gCtx.fillStyle = "#fff";
	gCtx.fillRect(loadingBarX, loadingBarY, 6, 10);
	gCtx.restore();
	loadingBarX += 6;
}

var soundLoaded = false;
var assetLoaded = false;

var queue = new createjs.LoadQueue();

function soundloadHandler(event){
	drawLoadingBar();
};

function handleComplete(){
	soundLoaded = true;
	//drawLoadingBar();

	//if (assetLoaded && soundLoaded && curStage == "loading") title();
}

function addAsset(name,src){
	assetsLeft++;
	gImages[name] = new Image();
	gImages[name].src = src;
	gImages[name].onload = onAssetLoaded(name);
}

var onAssetLoaded = function(name){
	assetsLeft--;
	// console.log(name + " loaded");
	// drawLoadingBar();
	if(assetsLeft==0){
		//assetLoaded = true;
		//if (soundLoaded && curStage == "loading") title();
	}
};

function initSounds(){
	createjs.Sound.alternateExtensions = ["mp3"];
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("fileload", soundloadHandler);
	queue.addEventListener("complete", handleComplete);
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

function initImages(){
	addAsset("ruin", 				"img/background/ruin.png");
	addAsset("human", 				"img/sprites/human2.png");
	addAsset("speechBubble", 		"img/sprites/speechBubble.png");
	addAsset("soul", 				"img/sprites/soul.png");
	addAsset("soulSplited",			"img/sprites/soulSplited.png");
	addAsset("soulPiece",			"img/sprites/soulPiece.png");
	addAsset("flowey_overworld", 	"img/sprites/flowey_overworld.png");
	addAsset("flowey_portrait", 	"img/sprites/flowey_portrait.png");
	addAsset("heartBeatEffect", 	"img/sprites/heartBeat.png");
	addAsset("pellet", 				"img/sprites/pellet.png");
	addAsset("swiping",				"img/sprites/swiping.png");
}

