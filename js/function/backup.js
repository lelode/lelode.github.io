
/*
introScriptScreen = {
	x: 120,
	y: 300,
	_x: 120,
	_y: 300,
	width: 40,
	height: 40,
	ctx: canvas.getContext("2d"),
	scriptStringSplit: "",
	curString: "",
	sly: 0,

	type: function(scriptString, line) {
		this._x = this.x;
		this._y = this.y + (line * this.height);

		this.scriptStringSplit = scriptString.split("");

		var timer = setInterval(function () {
			if (this.scriptStringSplit.length > 0) {
				//console.log(scriptStringSplit.length);
				this.curString = this.scriptStringSplit.shift();

				ctx.save();
				ctx.fillStyle = "white";
				ctx.font = "30px 굴림";
				ctx.fillText(curString, this._x, this._y);
				ctx.restore();
				this.sly++;

				if (curString !== " "){
					this._x += 30;
					$.mbAudio.play('effectSprite',"typeWriting");
				}
				else{
					this._x += 10;
				}
			}
			else {
				clearInterval(timer);
			}
		},100);
	},
}

introImgScreen = {
	x: 125,
	y:  60,
	width:398,
	height: 214,
	idx: 1,
	op: 0.1,
	img: new Image(),
	ctx: canvas.getContext("2d"),

	setImg: function() {
		this.img.src = "img/intro/" + this.idx + ".png";
	},

	draw: function() {
		ctx.globalAlpha = this.op;
		ctx.drawImage(this.img, this.x, this.y);

		if (this.op < 1) {
			this.op += this.op * 0.1;
		}
	},

	next: function() {
		ctx.save();
		ctx.fillStyle = "black";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.restore();
		this.idx++;
		this.op = 0.1;
		this.setImg();
	}
}
*/