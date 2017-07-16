import MenuState from ""

class MainMenu extends MenuState {
    preload()
    {
        console.log("Loading menu");
    }

    create()
    {
        console.log("Creating menu");
    }

    update()
    {
        console.log("Updating main menu");
    }
}

export default MainMenu