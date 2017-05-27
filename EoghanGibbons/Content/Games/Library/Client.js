//Object that handles WebSocket connections and sending messages.
function Client()
{
  //For testing... change the ip (the host) when you are running on a device
  var host='149.153.102.21';
  var port=8080;

  this.messageHandler = new MessageHandler();
  
  //Creates a websocket and sets up the handlers
  this.ws = new WebSocket("ws://" + host + ":" + port +'/wstest');
 
          this.ws.onmessage = function(evt) {game.net.messageHandler.handleMessage(evt); };
 
          this.ws.onclose = function(evt) { console.log("Connection close"); };
 
          this.ws.onopen = function(evt) { console.log('open connection');
                                      game.net.join(game.playerName) ;  };
}

//To join the game
Client.prototype.join = function(name)
{
  data={};    
  data.type="join";
  data.pid=name;
  this.ws.send(JSON.stringify(data));
}


//To send an object to the server
Client.prototype.send = function(movedPositions)
{
  console.log("game.net was sent something")
  var data={};    
  data.type="updateLogic";
  data.xPos = movedPositions[0];
  data.yPos = movedPositions[1];
  
  game.net.ws.send(JSON.stringify(data));
}

