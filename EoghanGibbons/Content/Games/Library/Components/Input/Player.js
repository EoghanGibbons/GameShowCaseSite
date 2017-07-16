class PlayerInputComponent extends Component {
    constructor(actor)
    {
        super();
        this.cursors = null;
    }

    init(player, keyboard)
    {
        this.cursors = keyboard.createCursorKeys();

        this.cursors.basicAttack = keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.cursors.basicAttack.onDown.add(Commands.melle_attack, player.sword);

        this.cursors.pause = keyboard.addKey(Phaser.Keyboard.P);
        this.cursors.pause.onDown.add(Commands.Usercommands.Pause, player.game);

        player.body.onBeginContact.add(this.collisionResponse, player);

        player.game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);
    }

    Update(player, game)
    {
        if (this.cursors.left.isDown) {
            //  Apply velocity to the left
            player.body.moveLeft(150);
        } else if (this.cursors.right.isDown) {
            //  Apply velcity to the right
            player.body.moveRight(150);
        }

        if (this.cursors.up.isDown) {
            player.body.moveUp(150);
        } else if (this.cursors.down.isDown) {
            player.body.moveDown(150);
        }

        game.playerPos = player.position;
    }
}
