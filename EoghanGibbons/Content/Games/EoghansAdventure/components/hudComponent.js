/**
 * Describes a HUD component for an Entity
 * @constructor
 * @param   {ProjBel.Entity} actor - reference to Entity that has this component
 * @returns {ProjBel.HudComponent}
 */
Components.HudComponent = function (actor) {
    'use strict';

    this.fixedToCamera = true;

    return this;
};

/**
 * Called each frame by Entity.update
 * @param {ProjBel.Entity} actor - Entity this component belongs to
 */
Components.HudComponent.prototype = {
  update : function (actor) {
      'use strict';
  }
};
