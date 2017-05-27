/**
    * Game Entity, can be anything based on the components used to make it
    * @constructor
    * @author Eoghan Gibbons <EoghanMG@live.com>
    * @returns {ProjBel.Entity}
    * @param {ProjBel.Game} game - Reference to the Game state
    * @param {number[]} container - Rectangle that contains the entity, has x, y, width and height parameters
    * @param {string} spriteKey - Key of the image for this entity, can be blank if entity should be invisable
    * @param {Object} properties - The object's properties from it's Tilemap Object source
*/
ProjBel.Entity = function (game, container, spriteKey, properties) {
	'use strict';
    /** Call Sprites constructor as Entity extends the Phaser.Sprite class */
    Phaser.Sprite.call(this, game.game, container.x, container.y, spriteKey);
    //this.anchor.setTo(0.5, 0.5);

    this.width = container.width;
    this.height = container.height;

    /**
    * @type {ProjBel.Components}
    */
    this.components = [];

    this.x += this.width / 2;
    this.y += this.height / 2;

    /**
     * @type {Object}
     */
    this.properties = properties;

    game.add.existing(this);

    return this;
};

ProjBel.Entity.prototype = Object.create(Phaser.Sprite.prototype);

ProjBel.Entity.prototype.init = function () {
    'use strict';
    var component;
    for (component in this.components) {
        if (this.components.hasOwnProperty(component)) {
            try {
                this.components[component].init(this);
            } catch (err) {
                //console.log(component, err);
            }
        }
    }
};

/**
    * Update function, called each frame from ProjBel.Game.update, updates each of the Entities components
*/
ProjBel.Entity.prototype.update = function (game) {
	'use strict';
    var component;
    for (component in this.components) {
        if (this.components.hasOwnProperty(component)) {
            try {
                this.components[component].update(this, game);
                if (component === "PlayerComponent") {
                    game.playerPos = this.position;
                }
            } catch (err) {
                //console.log(component, err);
            }
        }
    }

    //If we have a physics body update Entity position
    if (this.body) {
        this.x = this.body.x;
        this.y = this.body.y;
    }
};

/**
 * Adds a new component to this.components
 * @param {string} componentName - Name of the component to add to the entity
 */
ProjBel.Entity.prototype.addComponent = function (componentName) {
    'use strict';
    try {
			//this.components.push(new ProjBel[componentName](this.game))
			console.log(componentName);
        this.components[componentName] = eval("new Components." + componentName + "(this)");
    } catch (err) {
        console.log(componentName, err);
    }
    return this;
};

/**
    * Remove a component from the Entity
*/
ProjBel.Entity.prototype.removeComponents = function () {
    'use strict';
    this.components = [];
};

ProjBel.Entity.prototype.removeComponent = function (component) {
    'use strict';
     // Remove component data by removing the reference to it.
    // Allows either a component function or a string of a component name to be
    // passed in
    var name;
    if (typeof component === 'function') {
        // get the name from the prototype of the passed component function
        name = component.prototype.name;
    } else {
        name = component;
    }

    // Remove component data by removing the reference to it
    delete this.components[name];
    return this;
};
