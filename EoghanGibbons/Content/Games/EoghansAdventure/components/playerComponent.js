/**
 * Player Component
 * @constructor
 * @param   {ProjBel.Entity}   actor - Reference to Entity that has this component, in this case the Player
 * @returns {ProjBel.PlayerComponent}
 */
Components.PlayerComponent = function (actor) {
    'use strict';

    /**
     * @type {object}
     */
    this.cursors = null;

    return this;
};

Components.PlayerComponent.prototype = {
  init : function (player, keyboard) {
      'use strict';
      this.cursors = keyboard.createCursorKeys();

      this.cursors.basicAttack = keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      this.cursors.basicAttack.onDown.add(Commands.melle_attack, player.sword);

      this.cursors.pause = keyboard.addKey(Phaser.Keyboard.P);
      this.cursors.pause.onDown.add(Commands.Usercommands.Pause, player.game);

      player.body.onBeginContact.add(this.collisionResponse, player);

      player.game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);
  },

  /**
   * Update function called each frame, used to move the player
   * @param {ProjBel.Entity} player - Player who has this component
   */
  update : function (player, game) {
      'use strict';
    if (this.cursors.left.isDown) {
          //  Apply velocity to the left
          player.body.moveLeft(150);
      } else if (this.cursors.right.isDown) {
          //  Apply velcity to the right
          player.body.moveRight(150);
      }

      if (this.cursors.up.isDown) {
      player.body.moveUp(150);
      } else if (this.cursors.down.isDown) {
      player.body.moveDown(150);
      }

      game.playerPos = player.position;
  },

  /*
      * Function called when player's body collides with another body
      * @this <ProjBel.Entity>
      * @param {Phaser.Sprite.Body} body - The body of the object that collided with our Player Entity.
      * @listens ProjBel.Entity.PhysicsComponent~event:ProjBel.Entity.body
  */
  collisionResponse : function (body) {
      'use strict';
      if (body) {
          if (body.sprite) {
              if (body.sprite.components.HarmfulComponent) {
                  try {
                      this.components.StatComponent.changeHealth(body.sprite.components.HarmfulComponent.damage);
                      console.log(this.components.StatComponent.currentHealth);
                  } catch (err) {
                      console.log(this.components, err);
                  }
                  this.body.velocity.x = ((this.body.mass * this.body.velocity.x) + (body.mass * body.velocity.x)) / this.body.mass * 3;
                  this.body.velocity.y = ((this.body.mass * this.body.velocity.y) + (body.mass * body.velocity.y)) / this.body.mass * 3;
              } else if (body.sprite.components.DoorComponent) {
                  try {
                      ProjBel.Commands.goToLevel(body.sprite.properties.destination);
                  } catch (err) {
                      console.log(err);
                  }
              }
          } else {
              if (this.components.SoundsComponent) {
                  this.components.SoundsComponent.play('wallbump');
              }
          }
      }
      ProjBel.Events.playerMoved.dispatch(this.position);
  }
};
