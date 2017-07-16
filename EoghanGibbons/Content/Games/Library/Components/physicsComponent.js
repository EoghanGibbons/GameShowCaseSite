class PhysicsComponent extends Component {
    constructor(body, moveAble) {
        body.game.physics.p2.enable(body);//, true);
        if (moveAble) {
            body.static = true;
        }

        this.MIN_VELOCITY = 25;
        body.fixedRotation = true;
    }

    Update(actor)
    {
        actor.body.applyDamping(1 / 2.5);
        if (Math.abs(actor.body.velocity.x) < this.MIN_VELOCITY) {
            actor.body.velocity.x = 0;
        } else if (Math.abs(actor.body.velocity.x) > this.MAX_VELOCITY) {
            if (actor.body.velocity.x > 0) {
                actor.body.velocity.x = this.MAX_VELOCITY;
            } else {
                actor.body.velocity.x = this.MAX_VELOCITY * -1;
            }
        }

        if (Math.abs(actor.body.velocity.y) < this.MIN_VELOCITY) {
            actor.body.velocity.y = 0;
        } else if (Math.abs(actor.body.velocity.x) > this.MAX_VELOCITY) {
            if (actor.body.velocity.y > 0) {
                actor.body.velocity.y = this.MAX_VELOCITY;
            } else {
                actor.body.velocity.y = this.MAX_VELOCITY * -1;
            }
        }
    }
}
