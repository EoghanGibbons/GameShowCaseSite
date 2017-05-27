/**
 * @namespace ProjBel
 * @author Eoghan Gibbons <eoghanMG@live.com>
 */
ProjBel = {
    /* ProjBel.music  Reference to music so it can persist through-out state swaps */
    music: null,
    stateManager: null
};

Components = {

};

Commands = {

};

GameStates = {

};
/**
 * @constructor
 */
ProjBel.Boot = function () {
	'use strict';
};

ProjBel.Boot.prototype = {
	preload: function () {
		'use strict';
    //this.game.load.video("intro", "assets/Videos/intro.webm");
		this.game.load.image("loading", "assets/loading.png");
	},

	/**
	 *
	 */
	create: function () {
		'use strict';
		this.input.maxPointers = 1;
		// this.stage.disableVisibilityChange = true;

		if (this.game.device.desktop) {
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.minWidth = 256;
			this.scale.minHeight = 196;
			this.scale.maxWidth = 1200;
			this.scale.maxHeight = 750;
			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;
		} else {
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.minWidth = 480;
			this.scale.minHeight = 260;
			this.scale.maxWidth = 1024;
			this.scale.maxHeight = 768;
			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;
			this.scale.forceOrientation(true, false);
			this.scale.setResizeCallback(this.gameResized, this);
			this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
			this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
		}
		ProjBel.stateManager.GoTo('Preload');
	},

	/**
	 *
	 */
	enterIncorrectOrientation: function () {
		'use strict';
		ProjBel.orientated = false;
		document.getElementById('orientation').style.display = 'block';
	},

	/**
	 *
	 */
	leaveIncorrectOrientation: function () {
		'use strict';
		ProjBel.orientated = true;
		document.getElementById('orientation').style.display = 'none';
	}
};
