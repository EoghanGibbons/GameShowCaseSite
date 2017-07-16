import BaseState from ""

class LocalGameState extends BaseState {
    preload()
    {
        console.log("Local Game State base class preload has not been overriden, you will perform any pre Game actions");
    }

    create()
    {
        
    }

    update()
    {
        console.log("Calling Base local game update, updating all entities");
    }
}

export default LocalGameState