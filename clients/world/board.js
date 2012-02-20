function Board(context, world) {
    this.context = context;
    this.world = world;
}

Board.prototype.drawBorder = function (width, height) {
    var point = {x: 10, y: 10};
    var size = {width: width, height: height};
    this.context.moveTo(point.x, point.y);
    this.context.lineTo(point.x + size.width, point.y);
    this.context.lineTo(point.x + size.width, point.y + size.height);
    this.context.lineTo(point.x, point.y + size.height);
    this.context.lineTo(point.x, point.y);
    this.context.stroke();
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
    drawImageNugget(this.context, point, nuggets);
    // for (i = 0; i < nuggets; i++) {
    // drawNugget(this.context, position.x + i, position.y + i);
    // }
}

// function drawNugget(context, x, y) {
//    context.fillStyle='#FF0000';
//    context.fillRect(x,y,1,1);
//}

function drawImageNugget(context, point, amount) {
    var base_image = new Image();
    base_image.src = 'images/gold' + amount + '.png';
    base_image.onload = function() {
	context.drawImage(base_image, point.x, point.y);
    }
}


Board.prototype.removePlayerFrom = function(x, y) {
    drawRectangle(this.context, '#FFFFFF', x, y);
}

Board.prototype.placePlayerAt = function(x, y) {
    drawRectangle(this.context, '#ffff00', x, y);
}

/* Board.prototype.placePlayerAt = function(context, point) {
    var base_image = new Image();
    base_image.src = 'images/digger.png';
    base_image.onload = function() {
	context.drawImage(base_image, point.x, point.y);
    }
} */


Board.prototype.drawObstacle = function(o) {
    drawBlackRectangle(this.context, o[0], o[1]);
}


function drawBlackRectangle(context, x, y) {
    drawRectangle(context, '#000000', x, y);
}

function drawRectangle(context, color, x, y) {
    context.fillStyle=color;
    context.fillRect(x,y,10,10);
}