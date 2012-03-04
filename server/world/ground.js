

var ground = {

    withinBorders : function (point, world) {
	if (point.x < 1 || point.y < 1) {
	    return false;
	}

	if (point.x > world.width - 1 || point.y > world.height - 1) {
	    return false;
	}
	
	return true;
    },

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
	return this.withinBorders(point, world) && this.treadable(point, world);
    },

};

module.exports = ground;