/**
 * Game manages the main loop of the game
 * @constructor
 * @extends Phaser.State
 * @this Phaser.Game
 * @author Eoghan Gibbons <eoghanMG@live.com>
 * @param {Phaser.Game} game - provides quick access to common functions
 * @param {string}    currentLevel - Key of level to load initially
 */
ProjBel.Game = function () {
    'use strict';
    /** array of layers in TiledMap map */
    this.layers = [];
    /** Container for all current game Entities */
    this.entities = [];

    this.pathfinding = null;

    this.playerPos = null;
};

ProjBel.Game.prototype = {
    /**
     * Function called when states are started with parameters
     * @example
     * // Starts Menu, clears world, clears cache (must clear world to do this), passes parameter of 2
     * this.state.start('Menu', true, true, 2);
     */
    init: function (level) {
        'use strict';
        /** Key of current level tilemap */
        this.currentLevel = level || "overWorld";

        ProjBel.Events.changeLevel.add(this.goTo, this);
        ProjBel.Events.playerDead.add(this.gameOver, this);
        ProjBel.Events.entityDead.add(this.removeEntity, this);
    },

    /**
	 * Called when this state is started, calls loadLevel
	 */
	create: function () {
        'use strict';
		this.loadLevel();
    },

    /**
     * Automatically called once a frame
     */
    update: function () {
        'use strict';
        var i;
        for (i = 0; i < this.entities.length; i += 1) {
            this.entities[i].update(this);
        }
    },

	/**
	 *
	 */
	gameOver: function () {
        'use strict';
        this.resetEntities();
        this.stage.destroy();
        this.state.start('Menu', true, false, 'gameOverMenu');
	},

    /**
     * Loads the level the tilemap saved as this.currentlevel
     */
    loadLevel: function () {
        'use strict';
        var i, collision_tiles = [], object_layer, tile_dimensions;
        this.map = this.add.tilemap(this.currentLevel);

        this.physics.startSystem(Phaser.Physics.P2JS);

        this.map.tilesets.forEach(function (tileset) {
            this.map.addTilesetImage(tileset.name);
        }, this);

        // create map layers
        this.map.layers.forEach(function (layer) {
            this.layers[layer.name] = this.map.createLayer(layer.name);
            if (layer.properties.collision) { // collision layer
                layer.data.forEach(function (data_row) { // find tiles used in the layer
                    data_row.forEach(function (tile) {
                    // check if it's a valid tile index and isn't already in the list
                        if (tile.index > 0 && collision_tiles.indexOf(tile.index) === -1) {
                            collision_tiles.push(tile.index);
                        }
                    }, this);
                }, this);
                //map.setCollision takes an array of tile indexes, weather to collide with those tiles, and the layer name
                this.map.setCollision(collision_tiles, true, layer.name);
                //convertTilemap converts tiles with either collides bool set to true to bodies, it takes the map, the layer to act on, if it should automatically add the bodies
                //to the world, and if it should optimize the collisions, if true (like here), it combines all adjacent tile bodies into the same body.
                this.physics.p2.convertTilemap(this.map, layer.name, true, true);
            }
        }, this);

        // resize the world to be the size of the current layer
        this.layers[this.map.layer.name].resizeWorld();

        this.pathfinding = this.game.plugins.add(ProjBel.Plugins.Pathfinding, this.map.layers[0].data, [-1], new Phaser.Point(this.map.tileWidth, this.map.tileHeight));
        for (object_layer in this.map.objects) {
            if (this.map.objects.hasOwnProperty(object_layer)) {
                // create layer objects
                this.map.objects[object_layer].forEach(this.create_object, this);
            }
        }

        for (i = 0; i < this.entities.length; i += 1) {
            try {
                this.entities[i].init();
            } catch (err) {
                console.log(this.entities[i], err);
            }
        }

        if (ProjBel.music === null || ProjBel.music.key !== this.map.properties.music) {
            ProjBel.music = this.add.audio(this.map.properties.music);
            ProjBel.music.play();
        }
    },

    /**
     * Creates an Object
     * @param {object} object - Describes how to create an object, comes from Object layer of Tiled Map
     */
    create_object: function (object) {
        "use strict";
        var entity = null, i, components = [], commands = [], entityBox = [], createAmount = 1;
        entityBox = {x : object.x, y : object.y, width : object.width, height : object.height};
        if (object.type === "spawn_area") {
            entityBox.width = object.properties.create_width;
            entityBox.height = object.properties.create_height;
            createAmount = Math.floor((Math.random(object.properties.create_min) * object.properties.create_max) + 1);
        }

        for (i = 0; i < createAmount; i += 1) {
            if (object.type === "spawn_area") {
                entityBox.x = Math.floor((Math.random() * object.width) + object.x);
                entityBox.y = Math.floor((Math.random() * object.height) + object.y);
            }

            entity = new ProjBel.Entity(this, entityBox, object.properties.spriteKey, object.properties);

            if (object.properties.components) {
                object.properties.components.split(",").forEach(entity.addComponent, entity);
            }

            if (object.properties.soundEffects) {
                try {
                    object.properties.soundEffects.split(",").forEach(entity.components.SoundsComponent.addSound);
                } catch (err) {
                    console.log(object.properties.soundEffects, err);
                }
            }

            if (entity.components.AiInputComponent) {
                entity.components.AiInputComponent.addPathfinding(this.pathfinding);
            }

            this.entities.push(entity);
        }

    },

    /**
     * Resets all the game entities
     */
    resetEntities: function () {
        'use strict';
        this.camera.reset();
        this.physics.p2.clear();
        this.entities.forEach(function (entity) {
            entity.removeComponents();
            entity.kill();
            entity.destroy();
        }, this);
        this.time.events.removeAll();
        this.input.onDown.removeAll();
        ProjBel.music.stop();
        ProjBel.music = null;
    },

    /**
     * toggles this.pause
     */
    togglePause: function () {
        'use strict';
    },

    goTo : function (destination) {
        'use strict';
        this.currentLevel = destination;

        this.resetEntities();
        this.loadLevel();
    },

    /**
     * @param {ProjBel.Entity}
     * @listens ProjBel.Events.entityDead
     */
    removeEntity : function (entity) {
        'use strict';
        entity.kill();
        entity.destroy();
    }
};
