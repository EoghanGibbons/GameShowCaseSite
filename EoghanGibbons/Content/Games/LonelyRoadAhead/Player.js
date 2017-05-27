var playerWidth; //Since the player is a square it doesn't need two values for width and height, playerWidth represents both height and width
var xPos;
var yPos;
var xVelocity;
var yVelocity;
var onSurfuce;
var collidingLeft;
var collidingRight;
var collidingTop;
var score = 0;

var Player=function (x, y){
	this.playerWidth = 40;
	this.xPos = x;
	this.yPos = y;
	this.xVelocity = 0;
	this.yVelocity = 0;
	this.onSurfuce = false;
	this.collidingLeft = false;
	this.collidingRight = false;
	this.collidingTop = false;
};

Player.prototype.update = function(drawColour){
	if(this.onSurfuce){
		this.yVelocity = 0;
		this.xVelocity = this.xVelocity *(0.5);//friction of brass and steel
	} else {
		this.yVelocity = this.yVelocity + (9.81*(1/60));
	}

	if ((this.xVelocity < 0) && (this.collidingLeft == true)){
		this.xVelocity = 0;
	}

	else if ((this.xVelocity > 0) && (this.collidingRight == true)){
		this.xVelocity = 0;
	}

	this.xPos += this.xVelocity;
	this.yPos += this.yVelocity;

	this.drawPlayer(this.xPos, this.yPos, drawColour)
};

//Getter Methods
Player.prototype.getXPos = function(){
	return this.xPos;
}

Player.prototype.getYPos = function(){
	return this.yPos;
}

Player.prototype.getWidth = function(){
	return this.playerWidth;
}

Player.prototype.getOnSurface = function(){
	return this.onSurfuce;
}

Player.prototype.getCollidingLeft = function(){
	return this.collidingLeft;
}

Player.prototype.getCollidingRight = function(){
	return this.collidingRight;
}

Player.prototype.getCollidingTop = function(){
	return this.collidingTop;
}

//Setter Methods
Player.prototype.setPosition = function(x,y){
	this.xPos = x;
	this.yPos = y;
}

Player.prototype.setOnSurface = function(onTop){
	this.onSurfuce = onTop;
}

Player.prototype.setXVelocity = function(x){
	this.xVelocity = x;
}

Player.prototype.setYVelocity = function(y){
	this.yVelocity = y;
}

Player.prototype.setCollidingLeft = function(x){
	this.collidingLeft = x;
}

Player.prototype.setCollidingRight = function(x){
	this.collidingRight = x;
}

Player.prototype.setCollidingTop = function(x){
	this.collidingTop = x;
}

//Draw method for player
Player.prototype.drawPlayer = function(x,y, color){ //Draw method for the player class
	ctx.fillStyle = color;
	ctx.fillRect(x, y, this.playerWidth, this.playerWidth);
	ctx.strokeStyle = "white";
	ctx.strokeRect(x, y, this.playerWidth, this.playerWidth);
};

Player.prototype.getInfo = function(){
	this.sendInfo = [];
	sendInfo = [xPos, yPos];
	return sendInfo;
}