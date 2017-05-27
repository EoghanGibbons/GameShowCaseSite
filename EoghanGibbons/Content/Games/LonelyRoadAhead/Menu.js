var backGroundIMG;
var playIMG;
var optionsIMG;

function Menu (){
	this.loopSound = new Audio("assets/mainMenuMusic.mp3");
	this.loopSound.volume = .2;
}

Menu.prototype.initCanvas=function () { 
	var canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	if (touchable) {
		canvas.addEventListener( 'touchstart', onTouchStart, false );
	} else {
		console.log("not touchable");
		canvas.addEventListener("click", clickHandler, false);
	};

	backGroundIMG = new Image();
	backGroundIMG.src = "assets/menu_background_temp.png"

	playIMG = new Image();
	playIMG.src = "assets/play.png"

	optionsIMG = new Image();
	optionsIMG.src = "assets/options.png"

	this.loopSound.addEventListener('ended',function()
	{
		game.loopSound.currentTime=0;
		game.loopSound.play();
	},false);
	
	this.loopSound.play();
}

function clickHandler(e) {
	//console.log(e.clientX, e.clientY);
	if ((e.clientX > canvas.getAttribute("width")/2 - playIMG.width/2) && 
		(e.clientX < (canvas.getAttribute("width")/2 - playIMG.width/2 + playIMG.width)) && 
		(e.clientY > canvas.getAttribute("height")/2 - playIMG.height/2 - 60) && 
		(e.clientY < (canvas.getAttribute("height")/2 - playIMG.height/2 - 60 + playIMG.height))){
		//console.log("play clicked"); //THIS WORKS

		//Play click response code goes here
	}

	if ((e.clientX > canvas.getAttribute("width")/2 - optionsIMG.width/2) && 
		(e.clientX < (canvas.getAttribute("width")/2 - optionsIMG.width/2 + optionsIMG.width)) && 
		(e.clientY > canvas.getAttribute("height")/2 - optionsIMG.height/2 + 60) && 
		(e.clientY < (canvas.getAttribute("height")/2 - optionsIMG.height/2 + 60 + optionsIMG.height))){
		//console.log("options clicked"); //THIS WORKS

		//Options click response code goes here
	}
}

Menu.prototype.update = function (){
	menu.draw();
}

function onTouchDown(e){
	touches = e.touches;
}

Menu.prototype.draw =function (){
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.getAttribute("width"), canvas.getAttribute("height"));
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, canvas.getAttribute("width"), canvas.getAttribute("height"));
	ctx.drawImage(backGroundIMG,0,0);
	ctx.drawImage(playIMG, canvas.getAttribute("width")/2 - playIMG.width/2, canvas.getAttribute("height")/2 - playIMG.height/2 - 60)
	ctx.drawImage(optionsIMG, canvas.getAttribute("width")/2 - optionsIMG.width/2, canvas.getAttribute("height")/2 - optionsIMG.height/2 + 60)
}