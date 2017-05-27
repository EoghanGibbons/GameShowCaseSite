/**
    * Animation Component for game Entites
    * @constructor
    * @param {ProjBel.Entity} actor - Reference to the Entity that this component belongs to
    * @returns {ProjBel.AnimationComponent}
*/
Components.AnimationComponent = function (actor) {
    'use strict';
    actor.animations.add('up', [0, 1, 2], 10, true);
    actor.animations.add('left', [3, 4, 5], 10, true);
    actor.animations.add('down', [6, 7, 8], 10, true);
    actor.animations.add('right', [9, 10, 11], 10, true);

    actor.play('left');
};

/**
    * This function initializes the component
    * @param {ProjBel.Entity} actor - Reference to the Entity that this component belongs to
*/
Components.AnimationComponent.prototype = {
  initialize : function (actor) {
      'use strict';

      /*this.up = this.animationManager.add('up', [1, 2, 3]);
      this.left = this.animationManager.add('left', [4, 5, 6]);
      this.down = this.animationManager.add('down', [7, 8, 9]);
      this.right = this.animationManager.add('right', [10, 11, 12]);

      actor.animations.play('left', 30, true);*/
  },

  /**
      * Update function, called each frame in Entity.update();
      * @param {ProjBel.Entity} actor - Reference to the Entity that this component belongs to
  */
  update : function (actor) {
      'use strict';

      if (Math.abs(actor.body.velocity.x) > Math.abs(actor.body.velocity.y)) {
          if (actor.body.velocity.x > 0) {
              actor.play('right');
          } else {
              actor.play('left');
          }
      } else if (Math.abs(actor.body.velocity.y) > 0) {
          if (actor.body.velocity.y < 0) {
              actor.play('up');
          } else {
              actor.play('down');
          }
      } else {
          actor.animations.stop();
      }
  }
};
