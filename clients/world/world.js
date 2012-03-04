function World() {
}

World.prototype.visualize = function(board) {
    board.drawBorder(this.width, this.height);
    board.drawMatrices(this.gold);
    board.drawObstacles(this.obstacles);
    board.drawBank(this.bank);
    board.drawMap(this.map);
}

World.prototype.updateMap = function(message) {
    this.map = message.map;
    this.width = this.map.width;
    this.height = this.map.height;
    this.obstacles = message.obstacles;
    this.gold = message.gold;
    this.bank = message.bank;
}