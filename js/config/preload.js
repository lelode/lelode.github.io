var images = {};
var assetsLeft = 0;

var soundLoaded = false;
var assetLoaded = false;

var queue = new createjs.LoadQueue();

function handleComplete(){
	soundLoaded = true;

	if (assetLoaded && soundLoaded && curStage == "loading"){
		title();
	}
}

function addAsset(name,src){
	assetsLeft++;
	images[name] = new Image();
	images[name].src = src;
	images[name].onload = onAssetLoaded;
}

var onAssetLoaded = function(){
	assetsLeft--;
	if(assetsLeft==0){
		assetLoaded = true;

		if (soundLoaded && curStage == "loading"){
			title();
		}
	}
};

function initSounds(){
	createjs.Sound.alternateExtensions = ["mp3"];
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("complete", handleComplete);
	queue.loadManifest([
		{id:"intro", 			src:"sounds/BGM/OnceUponATime.ogg"},
		{id:"flowey", 			src:"sounds/BGM/YourBestFriend.ogg"},
		{id:"suspense", 		src:"sounds/BGM/suspense.ogg"},
		{id:"title", 			src:"sounds/SFX/title.ogg"},
		{id:"typeWriting", 		src:"sounds/SFX/typeWriting.ogg"},
		{id:"whiteout", 		src:"sounds/SFX/whiteout.ogg"},
		{id:"pop", 				src:"sounds/SFX/pop.ogg"},
		{id:"beep", 			src:"sounds/SFX/beep.ogg"},
		{id:"heartBeat", 		src:"sounds/SFX/heartBeat.ogg"},
		{id:"battleStart", 		src:"sounds/SFX/battleStart.ogg"},
		{id:"dramatic", 		src:"sounds/SFX/dramatic.ogg"},
		{id:"pageTurning",		src:"sounds/SFX/pageTurning.ogg"},
		{id:"floweyVoiceCham", 	src:"sounds/SFX/floweyVoiceCharm.ogg"}
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
	addAsset("intro7_chara1", "img/intro/7_chara1.png");
	addAsset("intro7_chara2", "img/intro/7_chara2.png");
	addAsset("intro7_chara3", "img/intro/7_chara3.png");
	addAsset("intro8", "img/intro/8.png");
	addAsset("intro8_chara1", "img/intro/8_chara1.png");
	addAsset("intro8_chara2", "img/intro/8_chara2.png");
	addAsset("intro9", "img/intro/9.png");
	addAsset("intro9_foot1", "img/intro/9_foot1.png");
	addAsset("intro9_foot2", "img/intro/9_foot2.png");
	addAsset("intro10", "img/intro/10.png");
	addAsset("intro10_chara1", "img/intro/10_chara1.png");
	addAsset("intro10_chara2", "img/intro/10_chara2.png");
	addAsset("intro11", "img/intro/11.png");
}

function initIngameImages(){
	addAsset("ruin", 				"img/background/ruin.png");
	addAsset("pageTurn", 			"img/background/pageTurn.png");
	addAsset("speechBubble", 		"img/sprites/speechBubble.png");
	addAsset("frisk", 				"img/sprites/frisk.png");
	addAsset("friskSoul", 			"img/sprites/friskSoul.png");
	addAsset("flowey_overworld", 	"img/sprites/flowey_overworld.png");
	addAsset("flowey_portrait", 	"img/sprites/flowey_portrait.png");
	addAsset("heartBeatEffect", 	"img/sprites/heartBeat.png");
	addAsset("pellet", 				"img/sprites/pellet.png");
	addAsset("arrows",				"img/sprites/arrows.png");
}

