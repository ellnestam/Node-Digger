function World() {
}

World.prototype.visualize = function(board) {
    board.drawGoldMatrices(this.gold);
    board.drawBank(this.bank);
    board.drawMap(this.map);
    board.drawFog(this.map, this.discovered);
}

World.prototype.updateMap = function(message, map) {
    this.map = map;
    this.width = map.width;
    this.height = map.height;
    this.obstacles = message.obstacles;
    this.gold = message.gold;
    this.bank = message.bank;
    this.discovered = message.discovered;
}