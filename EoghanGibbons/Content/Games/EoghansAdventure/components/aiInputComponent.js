/**
    * Input Component for Ai controlled Entities
    * @constructor
    * @param {ProjBel.Entity} actor - Reference to the Entity that this component belongs to
    * @returns {ProjBel.AiInputComponent}
*/
Components.AiInputComponent = function (actor) {
    'use strict';

    this.path = [];
    this.path_step = -1;

    this.pathfinding = null;
    this.walkingSpeed = 1;

    this.counter = 0;

    return this;
};

/**
    * Update function, called each frame in Entity.update();
    * @param {ProjBel.Entity} actor - Reference to the Entity that this component belongs to
*/
Components.AiInputComponent.prototype = {
  update : function (actor, game) {
      'use strict';
      var next_position, velocity;
      if (this.path.length > 0) {
          next_position = this.path[this.path_step];
          if (!this.reached_target_position(actor.position, next_position)) {
              velocity = new Phaser.Point(next_position.x - actor.position.x,
                                     next_position.y - actor.position.y);
              velocity.normalize();
              actor.body.velocity.x = velocity.x * this.walking_speed;
              actor.body.velocity.y = velocity.y * this.walking_speed;
          } else {
              //actor.position.x = next_position.x;
              //actor.position.y = next_position.y;
              if (this.path_step < this.path.length - 1) {
                  this.path_step += 1;
              } else {
                  this.path = [];
                  this.path_step = -1;
                  actor.body.velocity.x = 0;
                  actor.body.velocity.y = 0;
              }
          }
      } else {
          this.move(actor.position, game.playerPos);
      }
  },

  addPathfinding : function (pathfinding) {
      'use strict';
      this.pathfinding = pathfinding;
  },

  reached_target_position : function (actor_position, target_position) {
      "use strict";
      var distance;
      distance = Phaser.Point.distance(actor_position, target_position);
      return distance < 1;
  },

  move : function (start_pos, target_position) {
      "use strict";
      this.pathfinding.find_path(start_pos, target_position, this.move_through_path, this);
  },

  move_through_path : function (path) {
      "use strict";
      if (path !== null) {
          this.path = path;
          this.path_step = 0;
      } else {
          this.path = [];
      }
  }
};
