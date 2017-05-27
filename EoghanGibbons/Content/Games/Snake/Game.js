var ctx;
var player;
var cellWidth = 10;
var score;
var width;var height;

function Game ()
{
	this.loopSound = new Audio("music.mp3");
	this.loopSound.volume = .1;
}

Game.prototype.initWorld = function()
{
   	player = new Player();
   	player.create_food();
}

Game.prototype.initCanvas=function () { 
	
	var canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	width = canvas.getAttribute("width");
	height = canvas.getAttribute("height");


	if (touchable) {
		canvas.addEventListener( 'touchstart', onTouchStart, false );
	} else {
		console.log("not touchable");
		canvas.addEventListener("click", false);
	};

	this.loopSound.addEventListener('ended',function()
	{
		game.loopSound.currentTime=0;
		game.loopSound.play();
	},false);
	
	this.loopSound.play();
}

Game.prototype.update = function ()
{
	if(KeyController.isKeyDown(Key.LEFT))
	{
		if (player.getDirection() != "right")
		{
			player.setDirection("left");
		}       
	}
	if(KeyController.isKeyDown(Key.RIGHT))
	{
		if (player.getDirection() != "left")
		{
			player.setDirection("right");
		}   
	}
	if(KeyController.isKeyDown(Key.UP))
	{
		if (player.getDirection() != "down")
		{
			player.setDirection("up");
		}   
	}
	if(KeyController.isKeyDown(Key.DOWN))
	{
		if (player.getDirection() != "up")
		{
			player.setDirection("down");
		}
	}	
}

function onTouchDown(e){
	touches = e.touches;
}

Game.prototype.collisionResponse=function (e)
{
	
	
}

Game.prototype.gameLoop = function () 
{
	game.update();
	game.draw();
	player.update();
}

Game.prototype.draw =function ()
{
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, width, height);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, width, height);
}

Game.prototype.drawCell = function(x,y)
{
	ctx.fillStyle = "blue";
	ctx.fillRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
	ctx.strokeStyle = "white";
	ctx.strokeRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
};

