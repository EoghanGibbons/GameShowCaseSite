SplashScene.prototype = new Scene("SplashScene");       			// Here's where the inheritance occurs 

var splash;
var title;

function SplashScene()
{
	title = "splashScene";
}

SplashScene.prototype.setCurrentScene = function(pCurrentScene){
	if (pCurrentScene){
		var fps = 1;
		splash= new Splash();

		splash.initCanvas();
		ctx.clearRect(0,0,canvas.width, canvas.height);
		var x = 0;

		var loopID = setInterval(onTimerTick, 1000/fps); 

		function onTimerTick() {
			if(x<1){
				this.update;
    			x+= 1/(fps*2);
    		}else{
    			splash.setFinished(true);
    			console.log("setting splash finished to true");
    			clearInterval(loopID);
    		}
		}
	}

	this.isCurrentScene = pCurrentScene;
}

SplashScene.prototype.getFinished = function(){
	return splash.getFinished();
}

SplashScene.prototype.update = function(){
	if(this.getCurrentScene()){
    	splash.draw();
	}
}