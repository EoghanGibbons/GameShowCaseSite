var game;
function main()
{
	//change version number if you suspect a problem with caching
	console.log("version 1");

	//assetManager = new AssetManager();
	//assetManager.queueDownload("img/SnakeCreeping.png");
	
	//assetManager.downloadAll(function() {
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
		game_loop = setInterval(game.gameLoop, 60);


}
