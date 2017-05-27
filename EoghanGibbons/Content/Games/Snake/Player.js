var snake_array;
var direction;
var food;
var score = 0;
var dead = false;


var Player=function ()
{
	var length = 5; //Length of the snake
		snake_array = []; //Empty array to start with
		for(var i = length-1; i>=0; i--)
		{
			//Snake is created horizontally
			snake_array.push({x: i, y:0});
		}
	direction = "right"; //default direction
};

Player.prototype.update = function()
{
	//each update move the tail of the snake to the head

	var nx = snake_array[0].x;
	var ny = snake_array[0].y;
	//These were the position of the head cell.
	//We will increment it to get the new head position
	//Lets add proper direction based movement now
	if(direction == "right") nx++;
	else if(direction == "left") nx--;
	else if(direction == "up") ny--;
	else if(direction == "down") ny++;


	if(nx == food.x && ny == food.y)
	{
		var tail = {x: nx, y: ny};
		score++;
		//Create new food
		var snd = new Audio("eat.wav");
		snd.play();

		this.create_food();
	}
	else
	{
		var tail = snake_array.pop(); //pops out the last cell
		tail.x = nx; 
		tail.y = ny;
	}

	if((nx == -1) || (nx == width/cellWidth) || (ny == -1) || (ny == height/cellWidth) || (this.check_collision(nx, ny, snake_array)))
	{
		var snd = new Audio("dead.mp3"); // buffers automatically when created
		snd.play();
		dead = true;
	}

	snake_array.unshift(tail); //puts back the tail as the first cell

	for(var i = 0; i < snake_array.length; i++)
		{
			var c = snake_array[i];
			//Lets paint 10px wide cells
			this.drawCell(c.x, c.y, "blue");
		}

	this.drawCell(food.x, food.y, "red");


	var score_text = "Score: " + score;
	ctx.fillStyle = "blue"
	ctx.fillText(score_text, 5, 445); //Prints the current score in the bottom left corner

	if (dead == true){
		this.restart();
	}
};

Player.prototype.restart = function(){
	length = 5; //Length of the snake
	snake_array = []; //Empty array to start with
	for(var i = length-1; i>=0; i--)
	{
		//Snake is created horizontally
		snake_array.push({x: i, y:0});
	}
	direction = "right"; //default direction
	dead = false;
	score = 0;
}

Player.prototype.setDirection = function(x){
	direction = x;
}

Player.prototype.getDirection = function(){
	return direction;
}

Player.prototype.drawCell = function(x,y, color)
{
	ctx.fillStyle = color;
	ctx.fillRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
	ctx.strokeStyle = "white";
	ctx.strokeRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
};

Player.prototype.create_food = function()
{
	food = {
		x: Math.round(Math.random()*(width-cellWidth)/cellWidth), 
		y: Math.round(Math.random()*(height-cellWidth)/cellWidth), 
	};
}


Player.prototype.check_collision = function(x, y, array)
{
	//This function will check if the provided x/y coordinates exist
	//in an array of cells or not
	for(var i = 0; i < array.length; i++)
	{
		if(array[i].x == x && array[i].y == y)
		 return true;
	}
	return false;
}