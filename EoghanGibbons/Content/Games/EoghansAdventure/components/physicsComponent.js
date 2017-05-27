/**
 * Physics component
 * @constructor
 * @param   {ProjBel.Entity}   actor - Reference to Entity that has this component
 * @returns {ProjBel.PhysicsComponent}
 */
Components.PhysicsComponent = function (actor) {
    'use strict';
    //actor.anchor.setTo(1.0, 1.0);
    actor.game.physics.p2.enable(actor);//, true);
    if (actor.properties.static) {
        actor.body.static = true;
    }

    this.MIN_VELOCITY = 25;
    actor.body.fixedRotation = true;
    return this;
};

/**
 * Applys damping to physics bodies and ensures they do not exceed min/max velocities
 * @param {ProjBel.Entity} actor - Entity this component belongs to
 */
Components.PhysicsComponent.prototype = {
  update : function (actor) {
      'use strict';
      actor.body.applyDamping(1 / 2.5);
      if (Math.abs(actor.body.velocity.x) < this.MIN_VELOCITY) {
          actor.body.velocity.x = 0;
      } else if (Math.abs(actor.body.velocity.x) > this.MAX_VELOCITY) {
          if (actor.body.velocity.x > 0) {
              actor.body.velocity.x = this.MAX_VELOCITY;
          } else {
              actor.body.velocity.x = this.MAX_VELOCITY * -1;
          }
      }

      if (Math.abs(actor.body.velocity.y) < this.MIN_VELOCITY) {
          actor.body.velocity.y = 0;
      } else if (Math.abs(actor.body.velocity.x) > this.MAX_VELOCITY) {
          if (actor.body.velocity.y > 0) {
              actor.body.velocity.y = this.MAX_VELOCITY;
          } else {
              actor.body.velocity.y = this.MAX_VELOCITY * -1;
          }
      }
  }
};
