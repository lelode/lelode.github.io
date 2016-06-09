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

function TypeWrite(_x, _y){
    self.x = _x;
    self.y = _y;
    self.width = 480;
    self.height = 140;
}

function TalkBox(_x, _y){
    var self = this;
    self.x = _x;
    self.y = _y;
    self.width = 580;
    self.height = 154;
    self.on = false;

    self.draw = function(){
        if (self.on){
            ctx.clearRect(self.x+40, self.y+10, self.width-60, self.height-20);
        }
        else {
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
