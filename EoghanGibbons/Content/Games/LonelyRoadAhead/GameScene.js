GameScene.prototype = new Scene("GameScene");  	// Here's where the inheritance occurs 

var game;
var title;

function GameScene(){
	title = "gameScene";
}

GameScene.prototype.setCurrentScene = function(pCurrentScene){
	if (pCurrentScene){
		var fps = 60;
		game= new Game();

		game.initCanvas();
	
		//ctx the drawing context, which lets you draw onto the canvas
		//Most people call it ctx for short	
		ctx.clearRect(0,0,canvas.width, canvas.height);

		//var img = assetManager.getAsset("img/SnakeCreeping.png")
		//ctx.drawImage(img, 100, 100);

		game.initWorld();			

		//start game loop
		game.gameLoop();
		if(typeof game_loop != "undefined") clearInterval(game_loop);
			game_loop = setInterval(game.gameLoop, 1000/fps);
	}

	this.isCurrentScene = pCurrentScene;
}

GameScene.prototype.update = function(){
	if (this.getCurrentScene()){
		
	}
}