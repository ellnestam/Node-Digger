function World() {
}

World.prototype.visualize = function(board) {
    board.drawBorder(this.width, this.height);
}

World.prototype.updateMap = function(message) {
    this.width = message.width;
    this.height = message.height;
}