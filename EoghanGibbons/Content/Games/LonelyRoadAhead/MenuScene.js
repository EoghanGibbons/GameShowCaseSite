MenuScene.prototype = new Scene("MenuScene");       			// Here's where the inheritance occurs 

var title;
var menu;

function MenuScene()
{
	title = "menuScene";
}

MenuScene.prototype.setCurrentScene = function(pCurrentScene){
	if (pCurrentScene){
		var fps = 20;
		menu= new Menu();

		menu.initCanvas();
		ctx.clearRect(0,0,canvas.width, canvas.height);

		setInterval(onTimerTick, 1000/fps); 

		function onTimerTick() {
			menu.update();
		}
	}

	this.isCurrentScene = pCurrentScene;
}

