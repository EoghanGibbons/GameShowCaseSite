//GameStateManager = function(sender){

//  sender.state.add('Boot', ProjBel.Boot);
//  sender.state.add('Preload', ProjBel.Preload);
//  sender.state.add('Menu', ProjBel.Menu);
//  sender.state.add('Game', ProjBel.Game);

//  this.manager = sender.state;
//  this.currentState = 'Boot'

//  this.GoTo(this.currentState);
//};

//GameStateManager.prototype = {
//  GoTo: function(state){
//    try {
//      this.manager.start(state);
//      this.currentState = state;
//    }
//    catch(error) {
//      console.log("State: " + state + "is not a valid state to switch to");
//    }
//  }
//};
