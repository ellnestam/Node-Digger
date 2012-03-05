

var ground = {

    treadable : function (point, world) {
	var obstacles = world.obstacles;
	
	for (var o in obstacles) {
	    var obstacle = obstacles[o];
	    if (point.x === obstacle[0] && point.y === obstacle[1]) {
		return false;
	    }
	}
	return true;
    },
    
    validMove : function (point, world) {
	return this.treadable(point, world);
    },

};

module.exports = ground;