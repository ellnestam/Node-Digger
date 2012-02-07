function Board() {
    this.canvas = document.getElementById('myWorld');
}

Board.prototype.putPlayers = function (players) {
    for (var i = 0; i < players.length; i++) {
	placePlayerAt(this.canvas, 10, 10);
    }
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


Board.prototype.world = function() {
    var map "";
    map += "wwwwwwwwwwwwwwwwwww\n";
    map += "wb.............w..w\n";
    map += "w....5............w\n";
    map += "w..7..............w\n";
    map += "w.............w.4.w\n";
    map += "w.................w\n";
    map += "w....87.....w....ww\n";
    map += "w....9.......5....w\n";
    map += "w.....7..7..3....ww\n";
    map += "w..4...........2w.w\n";
    map += "w.9...............w\n";
    map += "w.................w\n";
    map += "w.2.....6.......21w\n";
    map += "w...............3.w\n";
    map += "w..7........4..71.w\n";
    map += "w.......6.........w\n";
    map += "w.........6...ww..w\n";
    map += "ww.9.97..w..3.....w\n";
    map += "w..3......1..48..ww\n";
    map += "w.........5.9...w.w\n";
    map += "w....3............w\n";
    map += "wwwwwwwwwwwwwwwwwww\n";

    return map;
}