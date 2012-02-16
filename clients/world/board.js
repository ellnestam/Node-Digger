function Board() {
    // this.canvas = document.getElementById('myWorld');
}

Board.prototype.drawBorder = function (ctx) {
    var point = {x: 10, y: 10};
    var size = {width: 640, height: 480};
    ctx.moveTo(point.x, point.y);
    ctx.lineTo(point.x + size.width, point.y);
    ctx.lineTo(point.x + size.width, point.y + size.height);
    ctx.lineTo(point.x, point.y + size.height);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
}