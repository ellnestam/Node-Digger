var buster = require("buster");
var wall = require("../../world/wall");

buster.testCase("Wall Types", {

    setUp: function () {
        this.wall = wall;
    },

    "Solid" : function() {
	var surroundings = [[0, 1, 0 ],
			    [8, 0, 2 ],
			    [0, 4, 0 ],   
			   ];
	buster.assert.equals(wall.typeFrom(surroundings), 'solid');
    },

    "North" : function() {
	var surroundings = [[0, 0, 0 ],
			    [0, 0, 0 ],
			    [0, 4, 0 ],   
			   ];
	buster.assert.equals(wall.typeFrom(surroundings), 'south');
    },


    "Descriptions to Bits" : function() {
	var bits = [[0, 1, 0 ],
		    [8, 0, 2 ],
		    [0, 4, 0 ],   
		   ];

	var map = [['.', 'w', '.'],
		   ['w', '.', 'w'],
		   ['.', 'w', '.']];
		   
	
	buster.assert.equals(wall.toBits(map), bits);
    },
});