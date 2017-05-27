/**
 * Container component for an Entities stats
 * @constructor
 * @returns {ProjBel.StatComponent}
 */
Components.StatComponent = function (actor) {
    'use strict';
    this.totalHealth = parseFloat(actor.properties.health) || 5.0;
    this.currentHealth = this.totalHealth;
    this.energy = parseFloat(actor.properties.energy) || 10.0;
    return this;
};

Components.StatComponent.prototype = {
  /**
   * Checks if health falls below 0, fires dead event if it has
   * @param {object} actor [[Description]]
   */
  update : function (actor) {
      'use strict';
      if (this.currentHealth <= 0) {
          this.currentHealth = this.totalHealth;
          if (actor.components.PlayerComponent) {
              ProjBel.Events.playerDead.dispatch(actor);
          } else {
              ProjBel.Events.entityDead.dispatch(actor);
          }
      }
  },

  /**
   * Changes health by the amount passed, should be negative for damage
   * @param {[[Type]]} changeValue [[Description]]
   */
  changeHealth : function (changeValue) {
      'use strict';
      this.currentHealth += changeValue;

  	//TODO Changehealth should use a command
  }
};
