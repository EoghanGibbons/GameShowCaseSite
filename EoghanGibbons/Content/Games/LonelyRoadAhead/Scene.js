var scene;
var title;
var isCurrentScene;

function Scene(){
	this.isCurrentScene = false;
}

function Scene(sceneName){
	this.title = sceneName;
	this.nextScene;
	this.isCurrentScene = false;
}

Scene.prototype.nextScene = function(nextScene)
{	
}

Scene.prototype.getFinished = function(){
}

Scene.prototype.setFinished = function(pFinished){
}

Scene.prototype.getCurrentScene = function(){
	return this.isCurrentScene;
}

Scene.prototype.setCurrentScene = function(pCurrentScene){
	this.isCurrentScene = pCurrentScene;
}