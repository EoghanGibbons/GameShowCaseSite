class AnimationComponent extends Component {
    constructor(actor)
    {
        actor.animations.add("up", [0, 1, 2], 10, true);
        actor.animations.add("left", [3, 4, 5], 10, true);
        actor.animations.add("down", [6, 7, 8], 10, true);
        actor.animations.add("right", [9, 10, 11], 10, true);

        actor.play("left");

        super();
    }

    Update(actor)
    {
        if (Math.abs(actor.body.velocity.x) > Math.abs(actor.body.velocity.y)) {
            if (actor.body.velocity.x > 0) {
                actor.play("right");
            } else {
                actor.play("left");
            }
        } else if (Math.abs(actor.body.velocity.y) > 0) {
            if (actor.body.velocity.y < 0) {
                actor.play("up");
            } else {
                actor.play("down");
            }
        } else {
            actor.animations.stop();
        }
    }
}
