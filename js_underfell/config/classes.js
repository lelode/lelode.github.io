function extend(base, sub) {
  // Avoid instantiating the base class just to setup inheritance
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
  // for a polyfill
  // Also, do a recursive merge of two prototypes, so we don't overwrite 
  // the existing prototype, but still maintain the inheritance chain
  // Thanks to @ccnokes
  var origProto = sub.prototype;
  sub.prototype = Object.create(base.prototype);
  for (var key in origProto)  {
     sub.prototype[key] = origProto[key];
  }
  // Remember the constructor property was set wrong, let's fix it
  sub.prototype.constructor = sub;
  // In ECMAScript5+ (all modern browsers), you can make the constructor property
  // non-enumerable if you define it like this instead
  Object.defineProperty(sub.prototype, 'constructor', { 
    enumerable: false, 
    value: sub 
  });
}

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

function TalkBox(){
    var self = this;

    self.x = 30;
    self.yUp = 10;
    self.yDown = 250;

    self.width = 580;
    self.height = 154;
    self.on = false;

    // self.typeWriter = new TypeWriter();

    self.draw = function(axisY){
        var _y;

        switch (axisY){
            case "up": _y = self.yUp; break;
            case "down": _y = self.yDown; break;
            default: 
            console.log("Error: TalkBox.draw() argument value is empty.");
            _y = self.yUp;
            break;
        }

        // If box is already drawn, just clear the black area
        if (self.on){
            ctx.clearRect(self.x+40, _y+10, self.width-60, self.height-20);
        }
        else {
            ctx.save();
            ctx.fillStyle = "#fff";
            ctx.fillRect(self.x, _y, self.width, self.height);
            ctx.fillStyle = "#000";
            ctx.fillRect(self.x+5, _y+5, self.width-10, self.height-10);
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

function TypeWriter(_font, _voice){
    var self = this;
    self.x = _x + 50;
    self.y = _y + 30;
    self.width = 480;
    self.height = 140;

    self.font = _font;
    self.voice = _voice;

    //self.portrait

    self.type = function(scriptString){
        var _x = self.x;
        var _y = self.y;
        var _font = self.font;

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
                ctx.font = _font;
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

function Portrait(){
    self.x = 300;
    self.y = 145;
    self.size = 48;

    self.draw = function(){
        //ctx.drawImage(image., 0, 0, self.x, self.y);
    }
}

function Unit(_width, _height, _font, _voice){

var DIRECTION = {
        "FRONT": 0, "LEFT": 1, "RIGHT": 2, "BACK": 3
    };    

    this.x = 0;
    this.y = 0;
    this.width = _width;
    this.height = _height;

    this.font = _font;
    this.voice = _voice;
    this.spriteFrame = 0;
    this.dir = DIRECTION.FRONT; //
}

Unit.prototype = {
    draw: function() {
        console.log("unit draw called");
    },

    placeHolder: function() {
        // ...
    }
}

function Human(_width, _height, _font, _voice){
    Unit.call(this, _width, _height, _font, _voice);
    this.x = 300;
    this.y = 300;
    //var state = { "IDLE", "WALK" };
}

Human.prototype = {
    draw: function(){
        console.log("human draw called");
        
        ctx.drawImage(images.human, 0, 0,
            this.width, this.height, 
            this.x, this.y, 
            this.width, this.height);
            
        /*
        ctx.drawImage(images.human, DIRECTION * self.width, col * self.height, // idx = 0 (still), 1 (moving)
                    self.width, self.height, self.x, self.y, self.width, self.height);
                    */
    }

    update: function(){
        if (key.up) console.log("key up");
    }
}

extend(Unit, Human);

var human = new Human(40, 62, "default", "Arial");

function Flowey()
{
}

function Sans(){
}

function Undyne(){

}

function Alphys(){
	
}
