/*
 * Extending BaseGame <see cref="../Library/Objects/Game.js"> allows us not to worry about Phaser specific game related things
 */
import BaseGame from ""

class MultiplayerBreakout extends BaseGame {
    constructor(width, height, userData)
    {
        console.log(userData);

        super(width, height);
    }
}