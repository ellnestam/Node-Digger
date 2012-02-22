function Board(context, world) {
    this.context = context;
    this.world = world;
    this.scaleFactor = 32;
}

Board.prototype.drawBorder = function (width, height) {
    this.drawNorth(width);
    this.drawEast(width, height);
    this.drawSouth(width, height);
    this.drawWest(width, height);
}

Board.prototype.scale = function(point) {
    return {x : point.x * this.scaleFactor, y : point.y * this.scaleFactor};
}

Board.prototype.drawNorth = function(width) {
    for (var i = 0; i < width; i++) {
	var x = i;
	this.drawImageAt(this.context, {x: x, y: 0}, 'w_north');
    }
}

Board.prototype.drawEast = function(width, height) {
    this.drawImageAt(this.context, {x: width, y: 0}, 'w_northeast');    
    for (var i = 1; i < height; i++) {
	var x = i;
	this.drawImageAt(this.context, {x: width, y: x}, 'w_east');
    }
    this.drawImageAt(this.context, {x: width, y: height}, 'w_southeast');
}

Board.prototype.drawWest = function(width, height) {
    this.drawImageAt(this.context, {x: 0, y: 0}, 'w_northwest');    
    for (var i = 1; i < height; i++) {
	var x = i;
	this.drawImageAt(this.context, {x: 0, y: x}, 'w_west');
    }
    this.drawImageAt(this.context, {x: 0, y: height}, 'w_southwest');
}


Board.prototype.drawSouth = function(width, height) {
    for (var i = 0; i < width; i++) {
	var x = i;
	this.drawImageAt(this.context, {x: x, y: height}, 'w_south');
    }
}

Board.prototype.drawImageAt = function(context, point, imageName) {
    var base_image = new Image();
    var p = this.scale(point);
    base_image.src = 'images/' + imageName + '.png';
    base_image.onload = function() {
	context.drawImage(base_image, p.x, p.y);
    }
}


Board.prototype.drawObstacles = function(obstacles) {
    for (o in obstacles) {
	this.drawObstacle(obstacles[o]);
    }
}

Board.prototype.drawMatrices = function(matrices) {
    for (m in matrices) {
	var matrix = matrices[m];
	this.drawMatrix(matrices[m]);
    }
}

Board.prototype.drawMatrix = function(goldMatrix) {
    var nuggets = goldMatrix[2];
    var point = {x: goldMatrix[0], y : goldMatrix[1]};
    this.drawImageNugget(this.context, point, nuggets);
}

Board.prototype.drawImageNugget = function(context, point, amount) {
    this.drawImageAt(context, point, 'gold' + amount);
}

Board.prototype.handleMove = function(message) {
    var from = message.from;
    var to = message.to;
    this.removeDiggerFrom(this.context, from);
    console.log(from);
    this.placeDiggerAt(this.context, to);
}

Board.prototype.placeDiggerAt = function(context, point) {
    this.drawImageAt(context, point, 'digger');
}

Board.prototype.removeDiggerFrom = function(context, point) {
    this.drawImageAt(context, point, 'empty');
}

Board.prototype.drawObstacle = function(o) {
    this.drawImageAt(this.context, {x: o[0], y: o[1]}, 'center');
}
