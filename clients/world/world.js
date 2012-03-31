function World() {
}

World.prototype.visualize = function(board, point, world) {
    var playerMap = field.parse(world.map);
    board.drawMap(playerMap, world.gold, world.discovered, point);
}

World.prototype.updateMap = function(message, map, board) {
    // this.map = map;
    this.width = map.width;
    this.height = map.height;
    this.obstacles = message.obstacles;
    this.gold = message.gold;
    this.bank = message.bank;
    this.discovered = message.discovered;
    // this.visualize(
}