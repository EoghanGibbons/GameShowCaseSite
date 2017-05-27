/**
 * TimerComponent constructor, executes a given command for an entity every set number of seconds
 * @requires actor.properties.timeCount&&actor.properties.command
 * @constructor
 * @param   {ProjBel.Entity}   actor - Reference to Entity that has this component.
 */
Components.TimerComponent = function (actor) {
    'use strict';
    actor.game.time.events.loop(Phaser.Timer.SECOND * parseInt(actor.properties.timeCount, 10), ProjBel.Commands[actor.properties.command], this, actor);
    return this;
};
