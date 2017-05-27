'use strict';
function Ball(radius, x, y, xVelocity, yVelocity) {
	this.radius = radius;
	this.x = x;
	this.y = y;
	this.velX = xVelocity;
	this.velY = yVelocity;
	this.outOfBounds = false;
    this.bouncedThisFrame = false;
    this.framesSinceLastBounce = 0;
}

Ball.prototype = {
    logic: function (elapsed) {
        this.x += this.velX * elapsed;
        this.y += this.velY * elapsed;

        if ((((this.x + this.radius) >= 800) && (this.velX > 0)) || (((this.x - this.radius) <= 0) && (this.velX < 0))) {
            this.bounce(true);
        }
        if (((this.y - this.radius) <= 0)) {
            this.bounce(false);
        }
        else if ((this.y + this.radius) >= 500) {
            this.outOfBounds = true;
        }
        if (this.bouncedThisFrame == true) {
            this.framesSinceLastBounce = 0;
        } else {
            this.framesSinceLastBounce++;
        }
    },
    render: function() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0 * Math.PI, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    },
    bounce:function(axis) {
        if (this.framesSinceLastBounce > 1) {
            if (axis) { //true is x, false is y, this way we're only passing a bool (1 bit)
                this.velX = this.velX * -1;
            } else {
                this.velY = this.velY * -1;
            }
            this.bouncedThisFrame = true;
        } else {
            this.bouncedThisFrame = false;
        }
    },
    setPosition : function(xPos, yPos){
        this.x = xPos;
        this.y = yPos;
    },

    setVelocity : function(xVel, yVel){
        this.velX = xVel;
        this.velY = yVel; 
    }

}