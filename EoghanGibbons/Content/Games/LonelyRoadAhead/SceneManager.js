var sceneArray;
var currentScene;

function SceneManager(){
	this.sceneArray = [];

	this.sceneArray.push( new SplashScene());
	this.sceneArray.push( new MenuScene() );
	this.sceneArray.push( new GameScene() );
	//this.sceneArray.push( new SplashScene() );
	currentScene = this.sceneArray[0];
	//this.i = 0;
}

SceneManager.prototype.goToNextScene = function(e){
	this.i = (this.i + 1) % this.sceneArray.length;
}

SceneManager.prototype.addScene = function(title){
	if (title == "GameScene"){
		this.sceneArray.push( new GameScene() );
	}

	if (title == "MenuScene"){
		this.sceneArray.push( new MenuScene() );
	}

	if (title == "SplashScene"){
		this.sceneArray.push( new SplashScene() );
		currentScene = this.sceneArray[0];
	}
}

SceneManager.prototype.goToScene = function(title){
	if (title == "SplashScene"){
		this.sceneArray[0].setCurrentScene(true);
	} 
	if (title == "MenuScene"){
		this.sceneArray[1].setCurrentScene(true);
	}
	if (title == "GameScene"){
		this.sceneArray[2].setCurrentScene(true);
	}
}

SceneManager.prototype.getCurrentScene = function(){
	return currentScene;
}


function main()
{
	//change version number if you suspect a problem with caching
	console.log("version 1");
	sceneM = new SceneManager();
	sceneM.goToScene("GameScene");
	//currentScene = sceneM.sceneArray[0];
}