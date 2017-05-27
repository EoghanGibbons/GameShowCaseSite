//Object for handling different types of messages
function MessageHandler()
{
	
}


MessageHandler.prototype.handleMessage = function(evt)
{

	message = JSON.parse(evt.data);
	type = message.type;
	data = message.data;
	console.log(type);
	console.log(data);

	if(type=="state")
	{
		//convert data into an int
		data = parseInt(data);
		//console.log("data: "+data);

		if(data=="WAITING_FOR_PLAYERS")
		{
			console.log("WAITING_FOR_PLAYERS");
		}
		if(data=="SETTING_UP_GAME")
		{
			console.log("STARTING_GAME");
			game.init();
		}		

		game.gameState.updateGameState(data);
	}

	//handles a custom message
	if(type=="paddleUpdate"){
		console.log("accepting other players move");
		//data = parse[](data);
		xPos = data.xPos;
		game.updateOtherPlayer(xPos); 		//Updates the other players postion on screen
	}

	if(type =="ballUpdate"){
		console.log("updating ball position");
		xPos = data.xPos;
		yPos = data.yPos;
		game.updateBallPosition(xPos,yPos);	//I allow the android version of the game to handle the balls physics
	}
}

