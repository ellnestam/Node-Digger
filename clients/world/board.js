function Board(context, world) {
    this.context = context;
    this.world = world;
    this.scaleFactor = 32;
}

Board.prototype.drawBorder = function (width, height) {
    this.drawVerticalAt(width, height, 'east');
    this.drawHorizontalAt(width, 0, 'w_north');
    this.drawHorizontalAt(width, height, 'w_south');
    this.drawVerticalAt(0, height, 'west');
}

Board.prototype.scale = function(point) {
    return {x : point.x * this.scaleFactor, y : point.y * this.scaleFactor};
}

Board.prototype.drawHorizontalAt = function(width, y, image) {
    for (var i = 0; i < width; i++) {
	this.drawImageAt(this.context, {x: i, y: y}, image);
    }
}

Board.prototype.drawVerticalAt = function(x, height, orientation) {
    this.drawImageAt(this.context, {x: x, y: 0}, 'w_north' + orientation);    
    for (var i = 1; i < height; i++) {
	this.drawImageAt(this.context, {x: x, y: i}, 'w_' + orientation);
    }
    this.drawImageAt(this.context, {x: x, y: height}, 'w_south' + orientation);
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
    var nuggets = goldMatrix[1];
    var point = goldMatrix[0];
    this.drawImageNugget(this.context, point, nuggets);
}

Board.prototype.drawImageNugget = function(context, point, amount) {
    this.drawImageAt(context, point, 'gold' + amount);
}

Board.prototype.handleMove = function(message) {
    var from = message.from;
    var to = message.to;
    this.removeDiggerFrom(this.context, from);
    this.placeDiggerAt(this.context, to);
}

Board.prototype.placeDiggerAt = function(context, point) {
    this.drawImageAt(context, point, 'digger');
}

Board.prototype.removeDiggerFrom = function(context, point) {
    this.drawImageAt(context, point, 'empty');
}

Board.prototype.drawObstacle = function(obstacle) {
    this.drawImageAt(this.context, {x: obstacle[0], y: obstacle[1]}, 'center');
}
