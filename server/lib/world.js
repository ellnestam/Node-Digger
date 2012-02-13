var world = function world() {};

world.prototype = {
    parse : function(string) {
	// return string.split("\n");
	var rows = string.split("\n");
	return function() {
	    width : 2; // rows[0].length;
	    height : rows.size;
	};
    }
};

module.exports = new world();