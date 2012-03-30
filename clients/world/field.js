var field = {
    parse : function(string) {

	var rows = string.split('\n');

	var extraRow = '';
	for (var i = 0; i < rows[0].length; i++) {
	    extraRow += 'w';
	}

	return {
	    rows : rows,
	    width : rows[0].length,
	    height : rows.length,
	    
	    look : function(x, y) {
		var row_1 = rows[y-1];
		var row_2 = rows[y];
		var row_3 = rows[y+1];

		if (y < 1) {
		    row_1 = extraRow;
		}

		if (y + 1 >= this.height) {
		    row_3 = extraRow;
		}

		if (x + 1 >= this.width) {
		    row_1 = row_1 + 'w';
		    row_2 = row_2 + 'w';
		    row_3 = row_3 + 'w';
		}

		if (x < 1) {
		    row_1 = 'w' + row_1;
		    row_2 = 'w' + row_2;
		    row_3 = 'w' + row_3;
		}

		if (x == 0) {
		    x++;
		}

		if (row_3.length < 1) {
		    row_3 = extraRow;
		}

		var view = [row_1.substr(x-1, 3).split(''),
			    row_2.substr(x-1, 3).split(''),
			    row_3.substr(x-1, 3).split('')];
		
		return view;
	    }
	};
    },
};


module.exports = field;