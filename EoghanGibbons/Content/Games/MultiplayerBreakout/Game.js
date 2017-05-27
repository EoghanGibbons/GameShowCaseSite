//Code for SinglePlayer Game goes here
function Game(){
	this.paused = false;
	this.inGameMenu = null;
	this.gameOverMenu = null;
	this.bricks;
	this.level = 1;
    this.score = 0;
	this.NROWS = 9;
	this.NCOLS = 5;
	this.levelComplete;

	//Player
	this.player = new Player(360, 450, 80, 20, 3);
	this.ball = new Ball(10, 400, 300, 0, 200);
	this.initBricks();
}

Game.prototype.tick = function(elapsed){
	fps.update(elapsed);	//Shows a fps meter
	this.logic(elapsed);
	this.render();
}

Game.prototype.logic = function(elapsed){
	// --- Input
	InputManager.padUpdate();

	//Game Logic
	if (this.player.lives == 0){
		this.gameOver = true;
        if (this.score > sessionStorage.score){
            this.startGameOverMenu("New Highscore: " + this.score);
            sessionStorage.score = this.score;
        }
        else{
            this.startGameOverMenu("Game Over");
        }
		
	}

	this.levelComplete=true;
	for (i=0; i < this.NROWS; i++) {
    	for (j=0; j < this.NCOLS; j++) {
    		if (this.bricks[i][j].health > 0){
    			this.levelComplete = false;
    		}
    	}
    }
    if (this.levelComplete){
    	this.level += 1;
    	this.NCOLS += 1;
    	this.initBricks(this.level);
		this.ball.setPosition(400,300);
		this.ball.setVelocity(0,200);
    	this.player.lives += 1;
    }

	else{
		if (InputManager.padPressed & InputManager.PAD.CANCEL){
        	this.paused = true;
			this.startInGameMenu();
    	}

    	if (!this.paused){
    		if (this.ball.outOfBounds){
    			this.player.lives += -1;
    			this.ball.setPosition(400,300);
    			this.ball.setVelocity(0,200);
    			this.ball.outOfBounds = false;
    		}

    		this.checkCollisions();

    		this.ball.logic(elapsed);
    		this.player.logic(elapsed);
    	}
    }
}

Game.prototype.render = function(){
	//Rendering
    // Clear the screen
    //ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Render objects
    if(!this.gameOver){
    	this.player.render();
    	this.ball.render();
    }
    for (i=0; i < this.NROWS; i++) { //iterate through the bricks array and call their render functions
    	for (j=0; j < this.NCOLS; j++) {
    		if (this.bricks[i][j].health > 0){
      			this.bricks[i][j].render(j);
      		}
    	}
  	}
    
    this.drawHUD();
}

Game.prototype.drawHUD = function(){
	ctx.textAlign = "left";
	ctx.fillStyle = "white";
	ctx.font = "20px sans-serif";
	ctx.fillText(" Lives: " + this.player.lives, 3, 460);
	ctx.fillText(" Score: " + this.score, 700, 460);
    if (this.gameOver){
        //ctx.fillText("#1: " sessionStorage.score, 370, 400);
    }
}

Game.prototype.startInGameMenu = function(){
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

Game.prototype.initBricks = function(){  //Creates a 2D array of Brick objects and stores them by their row and collumn
	this.bricks = new Array(this.NROWS);
	for (i=0; i < this.NROWS; i++) {
    	this.bricks[i] = new Array(this.NCOLS);
    	for (j=0; j < this.NCOLS; j++) {
    		if ((j<this.level) && (this.level >1)){
      			this.bricks[i][j] = new Brick( (i) * (10 +80) , (1+j) * (10 + 20), this.level);
      		}
      		else{
      			this.bricks[i][j] = new Brick( (i) * (10 +80) , (1+j) * (10 + 20), 1);
      		}
    	}
  	}
}

Game.prototype.startGameOverMenu = function(title){
    inGameMenu = null;
	//InputManager.reset();
	var bindThis = this;
	this.gameOverMenu = new Menu(title, [ "Menu" ], "", 150, 50, 400,
			function(numItem) {
				if (numItem == 0)
					startMainMenu()
			},
			function(elapsed) { bindThis.render(elapsed); });
	GameLoopManager.run(function(elapsed) { bindThis.gameOverMenu.tick(elapsed); });
}

Game.prototype.checkCollisions = function(){
	//First check to see if the ball is colliding with the player
	if ((this.ball.x + this.ball.radius >= this.player.x) && (this.ball.x - this.ball.radius <= this.player.x + this.player.width) && (this.ball.y + this.ball.radius >= this.player.y)){
		this.ball.bounce(false);
		this.ball.setVelocity( (this.ball.x - (this.player.x + this.player.width/2)) * 10,this.ball.velY)
	}
	
	//Next check to see if the ball is colliding with any of the blocks
	for (i=0; i < this.NROWS; i++) {
    	for (j=0; j < this.NCOLS; j++) {
    		if (this.bricks[i][j].health > 0){//To avoid checking collisions with Bricks that are no longer there
    			if ((this.ball.x + this.ball.radius >= this.bricks[i][j].x) && 
    				(this.ball.x - this.ball.radius <= this.bricks[i][j].x + this.bricks[i][j].width) && 
    				(this.ball.y + this.ball.radius >= this.bricks[i][j].y)&&
    				(this.ball.y - this.ball.radius <= this.bricks[i][j].y + this.bricks[i][j].height))
    			{//opening bracket is here for easy reading purposes
    				//this.ball.bounce(true);
    				if((this.ball.x < this.bricks[i][j].x) || (this.ball.x > this.bricks[i][j].x + this.bricks[i][j].width)){//the ball has hit the side of one of the blocks
    					this.ball.bounce(true);
    				}
    				else{
    					this.ball.bounce(false);
    				}
    				this.bricks[i][j].health += -1;
                    this.score++;
    				//console.log(this.bricks[i][j].hasPrize);
    			}
    		}
    	}
  	}
}