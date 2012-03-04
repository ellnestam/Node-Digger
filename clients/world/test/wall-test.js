var buster = require("buster");
var wall = require("../wall");

buster.testCase("Wall Types", {

    setUp: function () {
        this.wall = wall;
    },

    "Northwest" : function() {
	var surroundings = this.wall.toBits([['w', 'w', 'w' ],
					     ['w', 'w', 'w' ],
					     ['w', 'w', '' ],
					    ]);
	buster.assert.equals(wall.typeFrom(surroundings), 'w_northwest');
    },

    "Northeast" : function() {
	var surroundings = this.wall.toBits([['w', 'w', 'w' ],
					     ['w', 'w', 'w' ],
					     ['', 'w', 'w' ],
					    ]);
	buster.assert.equals(wall.typeFrom(surroundings), 'w_northwest');
    },


    "North" : function() {
	var surroundings = this.wall.toBits([['', '', '' ],
					     ['w', 'w', 'w' ],
					     ['w', 'w', 'w' ],
					    ]);
	buster.assert.equals(wall.typeFrom(surroundings), 'w_north');
    },

    "Descriptions to Bits" : function() {
	var bits = [[0, 2, 0 ],
		    [8, 0, 32 ],
		    [0, 128, 0 ],   
		   ];

	var map = [['.', 'w', '.'],
		   ['w', '.', 'w'],
		   ['.', 'w', '.']];
		   
	
	buster.assert.equals(wall.toBits(map), bits);
    },
});