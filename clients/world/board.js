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

Board.prototype.drawMap = function(field, gold, fog, p) {
    var cameraX = p.x - 1;
    var cameraY = p.y - 1;
    var x = 0;
    this.restoreTile(this.context);
    this.restoreTile(this.gContext);
    this.restoreTile(this.fog);
    for (var i = cameraX; i < cameraX + 10; i++) {
	var y = 0;
	for (var j = cameraY; j < cameraY + 10; j++) {
	    var view = field.look(i, j);
	    var image = wall.determineFrom(view);
	    var tile = {x: x, y: y};
	    var position = {x: i, y: j};
	    this.drawImageAt(this.gContext, tile, this.goldAt(position, gold));
	    this.drawImageAt(this.context, tile, image);
	    this.drawImageAt(this.fog, tile, this.fogAt(position, fog));
	    y++;
	}
	x++;
    }
}

Board.prototype.fogAt = function(point, fog) {
    return this.pointPresent(point, fog) ? '' : 'shade';
}

Board.prototype.goldAt = function(point, gold) {
    for (var i = 0; i < gold.length; i++) {
	if (this.samePoint(gold[i][0], point)) {
	    return 'gold' + gold[i][1];
	}
    }
    return '';
}

Board.prototype.samePoint = function(p1, p2) {
    return (p1.x == p2.x && p1.y == p2.y);
}

Board.prototype.pointPresent = function(point, points) {
    for (var p in points) {
	if (this.samePoint(points[p], point)) {
	    return true;
	}
    }
    return false;
}

Board.prototype.scale = function(point) {
    return {x : point.x * this.scaleFactor, y : point.y * this.scaleFactor};
}

Board.prototype.drawImageAt = function(context, point, imageName) {
    if (imageName.length > 0) {
	var base_image = new Image();
	var p = this.scale(point);
	base_image.src = 'images/' + imageName + '.png';
	base_image.onload = function() {
	    context.drawImage(base_image, p.x, p.y);
	}
    }
}

Board.prototype.handleScore = function(message) {
    this.sContext.save();
    this.sContext.clearRect(0, 0, this.width, this.height);
    this.sContext.fillText('Current score: ' + message['Diggah'], 240, 45);
    this.sContext.restore();
}

Board.prototype.handleMove = function(message) {
    this.restoreTile(this.pContext);
    this.placeDiggerAt(this.pContext, {x: 1, y: 1});
}

Board.prototype.placeDiggerAt = function(context, point) {
    this.drawImageAt(context, point, 'digger');
}

Board.prototype.restoreTile = function(context) {
    context.clearRect(0, 0, this.width, this.height);
}

Board.prototype.drawBank = function(bank) {
    this.drawImageAt(this.gContext, {x: bank.x, y: bank.y}, 'bank');
}