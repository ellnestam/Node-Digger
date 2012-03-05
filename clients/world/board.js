function Board(context, playerContext, world) {
    this.context = context;
    this.pContext = playerContext;
    this.world = world;
    this.scaleFactor = 32;
}

Board.prototype.drawMap = function(field) {
    for (var i = 0; i < field.width; i++) {
	for (var j = 0; j < field.height; j++) {
	    var view = field.look(i, j);
	    var bits = wall.toBits(view);
	    var image = wall.typeFrom(bits);
	    this.drawImageAt(this.context, {x: i, y: j}, image);
	}
    }
}

Board.prototype.drawBorder = function(width, height) {
}

Board.prototype.scale = function(point) {
    return {x : point.x * this.scaleFactor, y : point.y * this.scaleFactor};
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
    for (var o in obstacles) {
	this.drawObstacle(obstacles[o]);
    }
}

Board.prototype.drawMatrices = function(matrices) {
    for (var m in matrices) {
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
    this.drawImageAt(context, point, 'empty');
    if (amount > 0) {
	this.drawImageAt(context, point, 'gold' + amount);
    }
}

Board.prototype.handleScore = function(message) {
    // console.log(message.score);    
}

Board.prototype.handleMove = function(message) {
    this.removeDiggerFrom(this.pContext, message.from);
    this.placeDiggerAt(this.pContext, message.to);
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

Board.prototype.drawBank = function(bank) {
    this.drawImageAt(this.context, {x: bank.x, y: bank.y}, 'bank');
}