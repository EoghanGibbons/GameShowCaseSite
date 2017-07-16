ProjBel.Preload = function () {
    'use strict';
    //this.IntroVideo = null;
    this.loadBar = null;
    this.text = "";
};

ProjBel.Preload.prototype = {
    create: function () {
        'use strict';
        //Loading bar
        this.loadBar = this.add.sprite(600, 375, "loading");
        this.loadBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.loadBar);

        //this.IntroVideo = this.game.add.video("intro");
        //this.IntroVideo.play(true);
        //this.IntroVideo.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 2, 2);

        this.load.onFileComplete.add(this.fileComplete, this);
        this.load.onLoadComplete.add(this.goToMenu, this);

        //	Progress report
        this.text = this.add.text(32, 32, '', { fill: '#ffffff' });

        this.start();
    },

	start: function () {
        'use strict';
        //images
        //Menus
        this.load.image("menuBackGround", "assets/PLACEHOLDERmenuBackGround.png");
        this.load.image('button', 'assets/Button.png');
        //SpriteSheets
        this.load.image('blank', "assets/Spritesheets/blank.png");
        this.load.image('sword', "assets/items/sword.png");
        this.load.spritesheet('eyeball', "assets/Spritesheets/eyeball.png", 32, 38, 12);
        this.load.spritesheet('slime', "assets/Spritesheets/slime.png", 32, 32, 12);
        this.load.spritesheet("player", "assets/Spritesheets/player.png", 32, 32, 12);

        //Gui Elements
        this.load.spritesheet('hearts', "assets/Spritesheets/hearts.png", 27, 25, 3);

        //audio
        //Menus
        //Game
        this.load.audio('Dungeon', 'assets/hyrule_castle.mp3', true);
        this.load.audio('hurt', 'assets/sfx/hurt.wav');
        this.load.audio("Menu", 'assets/sounds/');

        //json
        this.load.json('mainMenu', 'assets/menus/mainMenu.json');
        this.load.json('optionsMenu', 'assets/menus/optionsMenu.json');
        this.load.json('loadGameMenu', 'assets/menus/loadGameMenu.json');
        this.load.json('gameOverMenu', 'assets/menus/gameOverMenu.json');

        //Level Tilemapslemap.TILED_JSON);
        this.load.tilemap('overWorld', 'assets/levels/Overworld/overworld.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('dungeon-1-room-1', 'assets/levels/VickysDungeon/room-1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('dungeon-1-room-2', 'assets/levels/VickysDungeon/room-2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('dungeon-1-room-3', 'assets/levels/VickysDungeon/room-3.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('dungeon-1-room-4', 'assets/levels/VickysDungeon/room-4.json', null, Phaser.Tilemap.TILED_JSON);
        //this.load.tilemap('dungeon-1-room-5', 'assets/levels/VickysDungeon/room-5.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('dungeon-1-room-6', 'assets/levels/VickysDungeon/room-6.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('dungeon-1-room-7', 'assets/levels/VickysDungeon/room-7.json', null, Phaser.Tilemap.TILED_JSON);
        //this.load.tilemap('dungeon-1-room-8', 'assets/levels/VickysDungeon/room-8.json', null, Phaser.Tilemap.TILED_JSON);
        //this.load.tilemap('dungeon-1-room-9', 'assets/levels/VickysDungeon/room-9.json', null, Phaser.Tilemap.TILED_JSON);
        //this.load.tilemap('dungeon-1-room-10', 'assets/levels/VickysDungeon/room-10.json', null, Phaser.Tilemap.TILED_JSON);
        //this.load.tilemap('dungeon-1-room-11', 'assets/levels/VickysDungeon/room-11.json', null, Phaser.Tilemap.TILED_JSON);
        //this.load.tilemap('dungeon-1-room-12', 'assets/levels/VickysDungeon/room-12.json', null, Phaser.Tilemap.TILED_JSON);

        //Load Tilesets
        this.load.image('world_spriteSheet', 'assets/Tilesets/world_spriteSheet.png');
        this.load.image('forest_tiles', 'assets/Tilesets/forest_tiles.png');
        this.load.image('caves', 'assets/Tilesets/caves.png');

        //fonts

        //Videos
        //this.load.video("intro", "assets/video/intro.wemb")
        this.load.start();
    },

	goToMenu: function () {
        'use strict';
        ProjBel.stateManager.GoTo('Menu');
    },

    fileComplete: function (progress, cacheKey, success, totalLoaded, totalFiles) {
        'use strict';
        //this.text.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
        this.text.setText(Phaser.Device.getUserMedia);

        if (totalLoaded === totalFiles) {
            //this.text.setText("Decoding Sounds....");
        }


        //progress is the total % loaded, use this to draw loadbar
        this.loadBar.scale.setTo(progress / 10, 1);
    }
};
