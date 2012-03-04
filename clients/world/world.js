function World() {
}

World.prototype.visualize = function(board) {
    board.drawBorder(this.width, this.height);
    board.drawMatrices(this.gold);
    board.drawObstacles(this.obstacles);
    board.drawBank(this.bank);
    board.drawMap(this.map);
}

World.prototype.updateMap = function(message, m) {
    this.map = m;
    this.width = m.width;
    this.height = m.height;
    this.obstacles = message.obstacles;
    this.gold = message.gold;
    this.bank = message.bank;
}