function World(context) {
    this.context = context;
}

World.prototype.visualize = function(board) {
    board.drawBorder(this.context);
}