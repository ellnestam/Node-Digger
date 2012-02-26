function World() {
}

World.prototype.visualize = function(board) {
    board.drawBorder(this.width, this.height);
    board.drawMatrices(this.gold);
    board.drawObstacles(this.obstacles);
    board.drawBank(this.bank);
}

World.prototype.updateMap = function(message) {
    this.width = message.width;
    this.height = message.height;
    this.obstacles = message.obstacles;
    this.gold = message.gold;
    this.bank = message.bank;
}