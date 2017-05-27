var splashImg;
var ctx;
var aspectRatioWidth;
var aspectRatioHeight;
var finished;

function Splash(){
	this.aspectRatioHeight = 0;
	this.aspectRatioWidth = 0;
	this.finished = false;
	
	var snd = new Audio("assets/splashSound.mp3");
	snd.play();
}

Splash.prototype.initCanvas = function(){
	var canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	splashImg = new Image();
	splashImg.src = "assets/splash.png"

	splashImg.onload = function() {
        ctx.drawImage(splashImg, 287, 127);
	};

	aspectRatioWidth = this.screenWidth/canvas.getAttribute("width");
	aspectRatioHeight = this.screenHeight/canvas.getAttribute("height");
}

Splash.prototype.draw = function(){
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.getAttribute("width") , canvas.getAttribute("height") );
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, canvas.getAttribute("width")  , canvas.getAttribute("height")  );
	ctx.drawImage(splashImg, 287 , 127  );

	console.log("drawing splash");
}

Splash.prototype.getFinished = function(){
	return this.finished;
}

Splash.prototype.setFinished = function(pFinished){
	this.finished = pFinished;
}