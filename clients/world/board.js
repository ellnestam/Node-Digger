function Board() {
    this.canvas = document.getElementById('myWorld');
}

Board.prototype.putPlayers = function (players) {
    for (var i = 0; i < players.length; i++) {
	placePlayerAt(this.canvas, 10, 10);
    }
}