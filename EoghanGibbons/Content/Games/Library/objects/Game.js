class BaseGame extends Phaser.Game {
    constructor(width, height)
    {
        super(width, height, Phaser.AUTO, "screen");

        this.StateManager = new GameStateManager();

    }

    Start()
    {
        this.StateManager.CreateStates(this.state);
    }

    update()
    {
    }
}