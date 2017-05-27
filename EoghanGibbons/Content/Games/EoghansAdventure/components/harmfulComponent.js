/**
 * Component for objects and Enemies that can hurt the player
 * @constructor
 * @param {ProjBel.Entity} actor - Entity who has this component
 * @returns {HarmfulComponent}
 */
Components.HarmfulComponent = function (actor) {
    'use strict';
    this.damage = parseFloat(actor.properties.damage) || -0.5;
    return this;
};
