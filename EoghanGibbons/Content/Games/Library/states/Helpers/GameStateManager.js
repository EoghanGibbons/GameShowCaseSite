import BootState from ""
import MainMenu from ""
import SinglePlayer from ""

class GameStateManager {
    constructor()
    {
    }

    CreateStates(manager)
    {
        manager.add("boot", BootState);
        manager.add("MainMenu", MainMenu);
        manager.add("game", SinglePlayer);

        manager.start("boot");
    }

    StartState(state)
    {
        //this.Manager.start(state);
        console.log(this.current);
    }
}