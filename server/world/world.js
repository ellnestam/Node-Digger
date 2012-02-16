var fs = require('fs');

var world = function world() {};

world.prototype = {
    parse : function(string) {
	var rows = string.split("\n");
	return {
	    width: rows[0].length, 
	    height: rows.length
	};
    },

    fileToString : function(filename) {
	return fs.readFileSync(filename).toString();
    }

};

module.exports = new world();