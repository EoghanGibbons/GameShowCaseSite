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

		if(data==GameState.WAITING_FOR_PLAYERS)
		{
			console.log("WAITING_FOR_PLAYERS");
		}
		if(data==GameState.SETTING_UP_GAME)
		{
			console.log("SETTING_UP_GAME");
			game.init();
		}		

		game.gameState.updateGameState(data);
	}
}