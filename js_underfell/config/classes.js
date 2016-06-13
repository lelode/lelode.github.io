function BackgroundImage(_x, _y){
    var self = this;

    if (_x === undefined) _x = 0;
    if (_y === undefined) _y = 0;

    self.x = 0; 
    self.y = 0;
    self.draw = function(){ 
    	ctx.drawImage(images.ruin, self.x, self.y) 
    };
}

function TypeWriter(_x, _y){
    var self = this;
    self.x = _x + 50;
    self.y = _y + 30;
    self.width = 480;
    self.height = 140;

    self.font = "Ariel";
    // self.voice = "NULL";

    //self.portrait

    self.type = function(scriptString){
        var _x = self.x;
        var _y = self.y;

        var scriptStringSplit = scriptString.split("");

        var compareWord = {};
        var stringNum = 0;
        var scriptArea = 420;
        var curStringIdx = 0;

        var scriptStringSplit;
        var nlFlag = false;

        var pause = false;
        var pauseInterval = 10;
        var pauseCounter = pauseInterval;

        var delay = false;
        var delayInterval = 10;
        var delayCounter = 0;

        var stringIdxChange = true;

        //self.floweyPortrait.draw();


        var timer = setInterval(function(){
            
            if (delay){
                if (delayCounter > delayInterval){
                    clearInterval(timer);
                    delay = false;
                    ableUserInput = true;
                }
                else delayCounter++;
            }

            // pauses for about (talkspeed times 10) secs when there's comma or line changes
            else if (pause){
                if (pauseCounter > pauseInterval){
                    pause = false;
                    pauseCounter = 0;
                }
                else pauseCounter++;
            }

            else {
                var char = scriptStringSplit.shift();
                ctx.save();
                ctx.fillStyle = "#fff";

                // change line if sentence gets long
                if (_x > ( self.x + scriptArea-30 )){
                    _y += 35;
                    _x = self.x + 25;
                    nlFlag = true;
                }

                ctx.font = "25px tbyt"; // need to change font
                ctx.fillText(char, _x, _y);
                ctx.restore();

                if (char == ",") { _x += 10; pause = true; }    // if there's comma, pauses
                // if line has not changed, don't make too much space
                else if (char == "." || (char == " " && !nlFlag)) _x += 10; 
                else if (char !== " ") {
                    //self.floweyPortrait.talk();
                    //self.floweyOverworld.talk();
                    //self.floweyPortrait.playVoice();
                    _x += 23;
                }
                if (nlFlag) nlFlag = false;
                if (scriptStringSplit <= 0) {
                    delay = true;
                }
            }
        }, 55);
    }
}

function TalkBox(_x, _y){
    var self = this;
    self.x = _x;
    self.y = _y;
    self.width = 580;
    self.height = 154;
    self.on = false;

    self.typeWriter = new TypeWriter(_x, _y);

    self.draw = function(){
        if (self.on){
            ctx.clearRect(self.x+40, self.y+10, self.width-60, self.height-20);
        }
        else {
            console.log("TalkBox draw called");
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


function Human(){
}

function Flowey(){
    var self = this;

    self.x = 300;
    self.y = 145;
    self.size = 48;

    self.darw = function(){
    	ctx.drawImage(image.flowey, 0, 0, self.x, self.y);
    }
}

function Sans(){
}

function Undyne(){

}

function Alphys(){
	
}
