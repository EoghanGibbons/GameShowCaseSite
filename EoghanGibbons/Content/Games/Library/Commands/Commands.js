Action = function(command){
  "use strict";
  this.command = Commands.General[command];
};

Action.prototype = {
  execute: function(context){
    this.command(context);
  }
}

Commands = {
  Usercommands : {
      Pause : function(game){
        game.paused = !game.paused;
      }
  },

  General : {
  /**
      * Command for executing a melle attack
      * @param {ProjBel.Entity} weapon - Reference to weapon that executes a melle attack
  */
    melle_attack : function (weapon) {
      'use strict';
      console.log("attacking with", weapon);
    },

  /**
      * Command for executing a ranged attack
      * @param {ProjBel.Entity} weapon - Reference to weapon that executes a ranged attack
  */
  ranged_attack : function (weapon) {
      'use strict';
  },

  /**
      * Command for executing a magic attack
      * @param {ProjBel.Entity} weapon - Reference to weapon that executes a magic attack
  */
  magic_attack : function (weapon) {
      'use strict';
      this.checkConidtion = this.magic_attack_condition;
  },

  /**
      * Command for executing a ray casting (this will probably be removed and the logic used as part of aiInputComponent)
  */
  ray_cast : function (context) {
      'use strict';
      this.checkConidtion = true;
      var ray;
      // Ray casting!
      // Test if each enmy can see the player by casting a ray (a line) towards the player.
      //ray = new Phaser.Line(this.player.x, this.player.y, this.enemies[i].x, this.enemies[i].y);
  },

  /**
      * Command for moving to a new room/level
      * @param {string} destination - key for room to go to
  */
  goToLevel : function (destination) {
      'use strict';
      ProjBel.Events.changeLevel.dispatch(destination);
  },

  /**
   * Command for toggling spikes between up and down
   * @param {ProjBel.Entity} spike - Reference to the spikes
   */
  spike_toggle : function (spike) {
      'use strict';
      if (spike.components.HarmfulComponent) {
          spike.removeComponent("HarmfulComponent");
          spike.removeComponent("PhysicsComponent");
          spike.body.destroy();
      } else {
          spike.addComponent("HarmfulComponent");
          spike.addComponent("PhysicsComponent");
      }
  },

  /**
   * Starts the Game state with a specified tilemap to load
   * @param {String} location - Tilemap to load when we start the game
   */
  start_game : function (context) {
      'use strict';
      try {
          context.game.state.start('Game', true, false);
      } catch (err) {
          console.log(err);
      }
  },

  /**
   * Starts the Menu state with a specified menu to load
   * @param {String} menu - key of the menu to load
   */
  go_to_menu : function (context) {
      'use strict';
      try {
          game.state.start('Menu', true, false, menu);
      } catch (err) {
          console.log(err);
      }
    }
  }
};
