class Entity extends Phaser.Sprite {
    constructor(game, container, spriteKey, properties) {
        /** Call Sprites constructor as Entity extends the Phaser.Sprite class */
        //Phaser.Sprite.call(this, game.game, container.x, container.y, spriteKey);
        super();

        // ReSharper disable once UseOfImplicitGlobalInFunctionScope
        this.Components = new [];
    }
    Update() {
        for (let component of this.Components) {
            try
            {
                component.Update();
            } catch (err)
            {
                console.log(err);
            }
        }
    }

    addComponent(comp)
    {
        this.Components.push(comp);
    }

    removeCompoents() {
        this.components = [];
    }

    removeComponent(component)
    {
        let comp = this.Components.find(component);

        this.Components.remove(comp);
    }
}
