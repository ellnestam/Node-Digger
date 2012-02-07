function Player(name) {
    this.name = name;
}

function World(context) {
    this.context = context;
}
 
World.prototype.advance = function(event) {
    new World();
}

World.prototype.visualize = function(board) {
    board.drawBorder(this.context);
}