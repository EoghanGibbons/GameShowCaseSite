Brick = function(xPos, yPos, health){
	this.x = xPos;
	this.y = yPos;
	this.health = health;
	this.width = 80;
	this.height = 20;

	var x = Math.floor((Math.random() * 10) + 1);
	if (x >= 7)
		this.hasPrize = true;
	else
		this.hasPrize = false;
}

Brick.prototype.render = function(col){
	switch(col){
		case 0:
			ctx.fillStyle = "red";
			break;
		case 1:
			ctx.fillStyle = "orange";
			break;
		case 2:
			ctx.fillStyle = "yellow";
			break;
		case 3:
			ctx.fillStyle = "green";
			break;
		case 4:
			ctx.fillStyle = "blue";
			break;
		case 5:
			ctx.fillStyle = "indigo";
			break;
		case 6:
			ctx.fillStyle = "violet";
			break;
	}
	ctx.fillRect(this.x, this.y, this.width, this.height);
}