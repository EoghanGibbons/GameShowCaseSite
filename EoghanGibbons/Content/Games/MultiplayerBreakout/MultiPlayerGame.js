//Code for Multiplayer Game goes here

function MultiPlayerGame(){
	this.player = new Player(360, 450, 80, 20, 3);
	this.androidPlayer = new Player(360, 10, 80, 20, 3);
	this.ball = new Ball(10, 400, 300, 0, 200);
	this.playerName = "IOSPlayer"
}

MultiPlayerGame.prototype.joinMultiplayerGame = function(){
	this.net = new Client();
}

MultiPlayerGame.prototype.tick = function(elapsed){
	fps.update(elapsed);	//Shows a fps meter
	this.logic(elapsed);
	this.render();

	this.net.send(this.player.x, this.player.y);
}

MultiPlayerGame.prototype.updateBallPosition = function(xPos, yPos){
	this.ball.setPosition(xPos, yPos);
}

MultiPlayerGame.prototype.startInGameMenu = function(){
	InputManager.reset();
	var bindThis = this;
	this.InGameMenu = new Menu("In-game Menu", [ "Continue", "Quit" ], "", 70, 50, 400,
			function(numItem) {
				if (numItem == 0) { GameLoopManager.run(function(elapsed) { bindThis.tick(elapsed); }); bindThis.paused = false; bindThis.inGameMenu = null;  }
				else if (numItem == 1) startMainMenu();
			},
			function(elapsed) { bindThis.render(elapsed); });
	GameLoopManager.run(function(elapsed) { bindThis.InGameMenu.tick(elapsed); });
}

MultiPlayerGame.prototype.logic = function(elapsed){
	// --- Input
	InputManager.padUpdate();

	this.player.logic(elapsed);
}

MultiPlayerGame.prototype.render = function(){
	//Rendering
    // Clear the screen
    //ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Render objects
    this.player.render();
    this.androidPlayer.render();
    this.ball.render();
}

MultiPlayerGame.prototype.updateOtherPlayer = function(xPos){
	androidPlayer.setXpos(xPos);
}