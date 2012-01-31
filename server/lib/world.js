define(function() {
        return {
            players: new Array(),
            visualize: function(board) {
		board.putPlayers(this.players);
            },
	    advance: function(event) {
		new World(event);
	    }
        }
    }
);
