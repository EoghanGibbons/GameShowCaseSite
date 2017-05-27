/**
 * SoundComponent for Entities
 * @constructor
 * @param   {ProjBel.Entity} actor - The Entity that has this component
 * @returns {ProjBel.SoundsComponent}
 */
Components.SoundsComponent = function (actor) {
    'use strict';

    /**
    * @property {function} add - reference to Phaser.Game.add.audio function for quick sound effects adding
    */
    this.add = actor.game.add.audio;
    this.sounds = [];

    return this;
};

/**
 * Adds a new sound effect to our sounds array
 * @param {string} soundKey - string with the key of the sound effect we wish to add
 */
Components.SoundsComponent.prototype = {
  addSound : function (soundKey) {
      'use strict';
      try {
          this.sounds[soundKey] = this.add(soundKey);
      } catch (err) {
          console.log(soundKey, "does not exist in cache");
      }
  },

  /**
   * Plays an Entity's sound effect
   * @param {string} soundKey - key of the sound to be played
   */
  play : function (soundKey) {
      'use strict';
      if (this.sounds.soundKey) {
          this.sounds.soundKey.play();
      }
  }
};
