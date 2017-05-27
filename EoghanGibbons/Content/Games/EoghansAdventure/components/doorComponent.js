/**
 * Component that makes a door a door
 * @constructor
 * @returns {ProjBel.DoorComponent}
 */
Components.DoorComponent = function (actor) {
    'use strict';
    this.destination = actor.properties.destination || "";
    return this;
};
