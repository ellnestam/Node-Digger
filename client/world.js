function Player(name) {
    this.name = name;
}

function World()
{
    this.players = new Array(new Player("Mad Hat"));
}
 
World.prototype.advance = function(event) {
    new World();
}

World.prototype.visualize = function(board) {

    board.putPlayers(this.players);

}