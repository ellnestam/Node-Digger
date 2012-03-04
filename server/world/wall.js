
var wallTypes = ['empty', '', '',  '',
		 'south', '', '', '',
		 '', '', '', '',
		 'northeast', '', '', 'solid'];

var wall = {
    typeFrom : function(matrix) {
	var x = 0;
	for (r in matrix) {
	    var row = matrix[r];
	    for (col in row) {
		x += row[col];
	    }
	}
	return wallTypes[x];
    },

    toBits : function(map) {
	var bits = [[0, 0, 0],
		    [0, 0, 0],
		    [0, 0, 0]];

	if (map[0][1] == 'w') {
	    bits[0][1] = 1;
	}

	if (map[1][2] == 'w') {
	    bits[1][2] = 2;
	}

	if (map[2][1] == 'w') {
	    bits[2][1] = 4;
	}

	if (map[1][0] == 'w') {
	    bits[1][0] = 8;
	}

	return bits;
    },
}

module.exports = wall;