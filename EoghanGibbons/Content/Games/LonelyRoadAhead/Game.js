var ctx;
var player;
var androidPlayer;
var prettynessOffset; // A slight offset to not have the lines of the player overlap with the boundry lines of the game
var score;

function Game(multiplayer){
	this.loopSound = new Audio("assets/music.mp3");
	this.loopSound.volume = .2;
	prettynessOffset = 2;
	if(multiplayer){
		joinMultiplayerGame();
	}
}

Game.prototype.initWorld = function(){
   	//Here is where we will have to read in the starting position of the android player	
   	androidPlayer = new Player(720,420);
   	player = new Player(20, 20);
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
		//canvas.addEventListener("click", false);
	};

	this.loopSound.addEventListener('ended',function(){
		game.loopSound.currentTime = 0;
		game.loopSound.play();
	},false);
	
	this.loopSound.play();
}

Game.prototype.update = function (){
	//Here is where we will recieve a message from the server about the Javaplayers input

	//androidPlayer.setXPos(recievedXPosition);
	//androidPlayer.setYPos(recievedYPosition);

	if(KeyController.isKeyDown(Key.UP)){
		if (androidPlayer.getOnSurface()){
			androidPlayer.setXVelocity(-10);
		}
	}
	if(KeyController.isKeyDown(Key.DOWN)){
		if (androidPlayer.getOnSurface()){
			androidPlayer.setXVelocity(10);
		}
	}

	if(KeyController.isKeyDown(Key.SPACE)){
		if (player.getOnSurface()){
			var jumpSoundEffect = new Audio("assets/jump.mp3");
			jumpSoundEffect.play();
			player.setOnSurface(false);
			player.setYVelocity(-5);
		}
	}
	
	if(!player.getCollidingLeft() ){
		if(KeyController.isKeyDown(Key.LEFT)){
			if(player.getOnSurface()){
				player.setXVelocity(-10);
			}
			else{
				player.setXVelocity(-5);
			}
		}
	}
	
	if(!player.getCollidingRight()){
		if(KeyController.isKeyDown(Key.RIGHT)){
			if(player.getOnSurface()){
				player.setXVelocity(10);
			}
			else{
				player.setXVelocity(5);
			}
		}
	}

	playerInfo = player.getInfo();
	//game.net.send(playerInfo);
}

function onTouchDown(e){
	touches = e.touches;
}

Game.prototype.checkCollisions=function (){
	//Check player collisions
	if ((player.getYPos() + player.getWidth()) > (canvas.height - 5)){ //If the player is touching the ground
		player.setOnSurface(true);
		player.setPosition(player.getXPos(), canvas.height - prettynessOffset - player.getWidth());
	} else{
		player.setOnSurface(false);
	}

	if ((player.getXPos() + player.getWidth()) > (canvas.width-5)){ // if the player is touching the rightmost edge
		player.setCollidingRight(true);
		player.setPosition(canvas.width - prettynessOffset - player.getWidth(), player.getYPos());
	}else if ( 	(androidPlayer.getXPos() - (player.getXPos() + player.getWidth()) < 5) &&
				((player.getYPos() + player.getWidth()) - (androidPlayer.getYPos())>2) ){ // if the player is colliding with the other player from the left
		player.setCollidingRight(true);
	}else{
		player.setCollidingRight(false);
	}

	if (player.getXPos() < 5){//if the player is colliding with the left wall
		player.setCollidingLeft(true);
		player.setPosition(prettynessOffset, player.getYPos());
	}else if ( 	(player.getXPos() - (androidPlayer.getXPos() + androidPlayer.getWidth()) > 5) &&
				((player.getYPos() + player.getWidth()) - (androidPlayer.getYPos())>2) ){ // if the player is colliding with the other player from the left
		player.setCollidingLeft(true);
	}else{
		player.setCollidingLeft(false);
	}

	if ((Math.abs(player.getYPos() - (androidPlayer.getYPos() + androidPlayer.getWidth())) < 5) && 
		((androidPlayer.getXPos() + androidPlayer.getWidth()) > player.getXPos())					 &&
		(androidPlayer.getXPos() < (player.getXPos() + player.getWidth() )) ){ //The Android Player is on top of the javascript player
		player.setCollidingTop(true);
	}else{
		player.setCollidingTop(false);
	}

	//checkAndroidPlayer collisions
	if ((androidPlayer.getYPos() + androidPlayer.getWidth()) > (canvas.height - 5)){
		androidPlayer.setOnSurface(true);
		androidPlayer.setPosition(androidPlayer.getXPos(), canvas.height - prettynessOffset - androidPlayer.getWidth());
	} else{
		androidPlayer.setOnSurface(false);
	}

	/*
	if ((androidPlayer.getXPos() + androidPlayer.getWidth()) > (canvas.width-5)){
		androidPlayer.setCollidingRight(true);
		androidPlayer.setPosition(canvas.width - prettynessOffset - androidPlayer.getWidth(), androidPlayer.getYPos());
	} else{
		androidPlayer.setCollidingRight(false);
	}

	if (androidPlayer.getXPos() < 5){
		androidPlayer.setCollidingLeft(true);
	} else{
		androidPlayer.setCollidingLeft(false);
	}
	*/

	if ((Math.abs(androidPlayer.getYPos() - (player.getYPos() + player.getWidth())) < 5) && 
		((player.getXPos() + player.getWidth()) > androidPlayer.getXPos())					 &&
		(player.getXPos() < (androidPlayer.getXPos() + androidPlayer.getWidth() )) ){ //The javascript Player is on top of the android player
		androidPlayer.setCollidingTop(true);
		player.setOnSurface(true);
		player.setPosition(player.getXPos(), (androidPlayer.getYPos() - prettynessOffset - player.getWidth()) ); 
	}else{
		androidPlayer.setCollidingTop(false);
	}


	//androidPlayer.setPosition(recievedXFromServer, recievedYFromServer);
}

Game.prototype.gameLoop = function () {
	game.checkCollisions();
	game.update();
	game.draw();
	player.update("red");
	androidPlayer.update("blue");
}

Game.prototype.draw =function (){
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, width, height);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, width, height);
}

Game.prototype.joinMultiplayerGame = function(){
	net = new Client();
}