function Board(context, playerContext, goldContext, scoreContext, world) {
    this.context = context;
    this.pContext = playerContext;
    this.gContext = goldContext;
    this.sContext = scoreContext;
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
    this.sContext.clearRect(0, 0, 800, 600);
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
    var p = this.scale(point);
    context.clearRect(p.x, p.y, this.scaleFactor, this.scaleFactor);
}

Board.prototype.drawBank = function(bank) {
    this.drawImageAt(this.gContext, {x: bank.x, y: bank.y}, 'bank');
}