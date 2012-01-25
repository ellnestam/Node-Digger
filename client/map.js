function drawMap() {
    var canvas = document.getElementById('myWorld');
    var world = new World();
    world.visualize(new Board());
}

function Board() {
    this.canvas = document.getElementById('myWorld');
}

Board.prototype.putPlayers = function (players) {
    for (var i = 0; i < players.length; i++) {
	placePlayerAt(this.canvas, 10, 10);
    }
}

function drawBlackRectangle(canvas, x, y) {
    var context = canvas.getContext('2d');
    context.fillStyle="#000000";
    context.fillRect(x,y,10,10);
}

function placePlayerAt(canvas, x, y) {
    drawBlackRectangle(canvas, x, y);
}