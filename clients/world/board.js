function Board(contexts, world, width, height) {
    this.context = contexts.world;
    this.pContext = contexts.digger;
    this.gContext = contexts.gold;
    this.sContext = contexts.score;
    this.fog = contexts.fog;
    this.world = world;
    this.scaleFactor = 32;
    this.width = width;
    this.height = height;
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

Board.prototype.drawFog = function(field, discovered) {
    this.restoreTile(this.fog);
    for (var i = 0; i < field.width; i++) {
	for (var j = 0; j < field.height; j++) {
	    var point = {x: i, y: j};
	    if (!this.pointPresent(point, discovered)) {
		var image = 'shade';
		this.drawImageAt(this.fog, point, image);
	    }
	}
    }
}

Board.prototype.pointPresent = function(point, points) {
    for (var p in points) {
	var aPoint = points[p];
	if (point.x === aPoint.x && point.y === aPoint.y) {
	    return true;
	}
    }
    return false;
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

Board.prototype.drawGoldMatrices = function(matrices) {
    for (var m in matrices) {
	var matrix = matrices[m];
	this.drawMatrix(matrices[m]);
    }
}

Board.prototype.drawMatrix = function(goldMatrix) {
    var nuggets = goldMatrix[1];
    var point = goldMatrix[0];
    this.drawImageNugget(this.gContext, point, nuggets);
}

Board.prototype.drawImageNugget = function(context, point, amount) {
    this.drawImageAt(context, point, 'empty');
    if (amount > 0) {
	this.drawImageAt(context, point, 'gold' + amount);
    }
}

Board.prototype.handleScore = function(message) {
    this.sContext.save();
    this.sContext.clearRect(0, 0, this.width, this.height);
    this.sContext.fillText('Current score: ' + message['Diggah'], 500, 45);
    this.sContext.restore();
}

Board.prototype.handleMove = function(message) {
    this.restoreTile(this.pContext, message.from);
    this.placeDiggerAt(this.pContext, message.to);
}

Board.prototype.placeDiggerAt = function(context, point) {
    this.drawImageAt(context, point, 'digger');
}

Board.prototype.removeDiggerFrom = function(context, point) {
    this.drawImageAt(context, point, 'empty');
}

Board.prototype.restoreTile = function(context, point) {
    context.clearRect(0, 0, this.width, this.height);
}

Board.prototype.drawBank = function(bank) {
    this.drawImageAt(this.gContext, {x: bank.x, y: bank.y}, 'bank');
}