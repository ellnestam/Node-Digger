function Board(contexts, width, height) {
    this.ground = contexts.world;
    this.digger = contexts.digger;
    this.gold = contexts.gold;
    this.scoreBoard = contexts.score;
    this.fog = contexts.fog;
    
    this.scaleFactor = 20;
    this.width = width;
    this.height = height;
    
    this.imgs = {};
}

Board.prototype.determine = function(p, max) {
    var x = p - 5;
    if (x < 1) {
	return 0;
    }

    if (p + 5 > max && max > 10) {
	return max - 10;
    }

    return x;
}


Board.prototype.drawMap = function(field, gold, fog, p, bank) {
    var cameraX = this.determine(p.x, field.width);
    var cameraY = this.determine(p.y, field.height + 1);

    this.restoreTile(this.ground);
    this.restoreTile(this.gold);
    this.restoreTile(this.fog);

    var fWidth = field.width;
    var fHeight = field.height;

    var x = 0;
    for (var i = cameraX; i < cameraX + 10; i++) {
	var y = 0;
	for (var j = cameraY; j < cameraY + 10; j++) {
	    var position = {x: i, y: j};
	 
	    if (position.x > field.width - 1 || position.y > field.height - 1) {
		this.drawImageAt(this.ground, tile, 'solid');
	    } else {
		var view = field.look(i, j);
		var image = wall.determineFrom(view);
		var tile = {x: x, y: y};
		this.drawImageAt(this.gold, tile, this.goldAt(position, gold));
		this.drawImageAt(this.ground, tile, image);
		this.drawImageAt(this.fog, tile, this.fogAt(position, fog));
	    }
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
    return p1.x == p2.x && p1.y == p2.y;
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
	if (this.imgs[imageName] === undefined) {
	    var base_image = new Image();
	    base_image.src = 'images/' + imageName + '.png';
	    this.imgs[imageName] = base_image;
	}
	
	var p = this.scale(point);
	context.drawImage(this.imgs[imageName], p.x, p.y);
    }
}

Board.prototype.handleScore = function(message) {
    this.scoreBoard.save();
    this.scoreBoard.clearRect(0, 0, this.width, this.height);
    this.scoreBoard.fillText('Current score: ' + message['Diggah'], 140, 25);
    this.scoreBoard.restore();
}

Board.prototype.handleMove = function(message) {
    this.restoreTile(this.digger);

    var p = {x: message.to.x,
	     y: message.to.y};
    if (message.to.x > 5) {
	p.x = 5;
    }

    var w = message.world.width;
    if (w - 5 < message.to.x && w > 10) {
	p.x = (10 + message.to.x - w)
    }
    
    if (message.to.y > 5) {
	p.y = 5;
    }

    var h = message.world.height;
    if (h - 5 < message.to.y && h > 10) {
	p.y = (10 + message.to.y - h - 1);
    }


    this.placeDiggerAt(this.digger, p);
}

Board.prototype.placeDiggerAt = function(context, point) {
    this.drawImageAt(context, point, 'digger');
}

Board.prototype.restoreTile = function(context) {
    context.save();
    context.clearRect(0, 0, this.width, this.height);
    context.restore();
}

Board.prototype.drawBank = function(p) {
    this.drawImageAt(this.gold, {x: p.x, y: p.y}, 'bank');
}