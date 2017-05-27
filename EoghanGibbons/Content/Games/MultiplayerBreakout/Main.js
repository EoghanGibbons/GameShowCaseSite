// Global vars
fps = null; 
canvas = null;
ctx = null;
// ----------------------------------------

var game;
var menu;
var splash;
var bounceEffect;

function main()
{
    canvas = document.getElementById("screen");
    ctx = canvas.getContext("2d");

    ctx.scale(1, 1);

	if( sessionStorage.score ){
		sessionStorage.score = Number(sessionStorage.score);
	}
	else{
		sessionStorage.score = 1;
	}
	fps = new FPSMeter("fpsmeter", document.getElementById("fpscontainer"));
	InputManager.connect(document, canvas);
	//this.music = new Audio("assets/mainMenuMusic.mp3");
	//this.music.volume = .3;
	//this.music.addEventListener('ended',function(){
	//	game.loopSound.currentTime = 0;
	//	game.loopSound.play();
	//},false);

	startSplashScreen();
}

function startGame(){
	GameLoopManager.stop();
	menu = null;
	//this.music.pause();
	//this.music.currentTime = 0;
	//this.bounceEffect = new Audio("assets/boing.wav")
	//this.bounceEffect.volume = .3;
	game = new Game();
	InputManager.reset();
	GameLoopManager.run(function(elapsed) { game.tick(elapsed); });
}

function startMainMenu(){
	//this.music.play();
	GameLoopManager.stop();
	game = null;
    InputManager.reset();
	menu = new Menu("MULTIPLAYER BREAKOUT",	
					[ "Singleplayer", "Multiplayer"],
					"",
					70, 50, 400,
					function(numItem) {
						if (numItem == 0) startGame(); 
						else if (numItem == 1) startMultiPlayerGame();
					},
				null);
	GameLoopManager.run(function(elapsed) { menu.tick(elapsed); });
}

function startSplashScreen(){
	//splashIMG = new Image();
	//splashIMG.src = "assets/splash.png"
	//ctx.drawImage(splashIMG,0,0);
	//console.log("Drawing splash");

	setTimeout(startMainMenu(), 3000);
}

function startMultiPlayerGame(){
	//console.log("starting multiPlayerGame");
	GameLoopManager.stop();
	menu = null;
	game = new MultiPlayerGame();
	InputManager.reset();
	game.joinMultiplayerGame();
	GameLoopManager.run(function(elapsed) { game.tick(elapsed); });
}