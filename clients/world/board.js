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


Board.prototype.removePlayerFrom = function(x, y) {
    drawRectangle(this.context, '#FFFFFF', x, y);
}

Board.prototype.placePlayerAt = function(x, y) {
    drawBlackRectangle(this.context, x, y);
}


function drawBlackRectangle(context, x, y) {
    drawRectangle(context, '#000000', x, y);
}

function drawRectangle(context, color, x, y) {
    context.fillStyle=color;
    context.fillRect(x,y,10,10);
}