var fs = require('fs');

var world = {
    gold : [],

    pointPresent : function (point) {
	for (g in this.gold) {
	    a = this.gold[g];
	    if (this.samePoint(point, a[0])) {
		return true;
	    }
	}
	
	return false;
    },
    
    putGoldAt : function(point, amount) {
	if (this.pointPresent(point)) {
	    this.addTo(point, amount);
	} else {
	    this.gold.push([point, amount]);
	}

	return this;
    },

    removeGoldFrom : function(point, amount) {
	if (this.pointPresent(point)) {
	    for (g in this.gold) {
		a = this.gold[g];
		if (this.samePoint(point, a[0])) {
		    this.gold[g][1] -= amount;
		    return this;
		}
	    }
	}
	return this;
    },

    addTo : function(point, amount) {
	for (g in this.gold) {
	    a = this.gold[g];
	    if (this.samePoint(point, a[0])) {
		this.gold[g][1] = a[1] + amount;
	    }
	}
    },

    samePoint : function(p1, p2) {
	return (p1.x == p2.x) && (p1.y == p2.y);
    },

    goldAt : function (point) {
	for (g in this.gold) {
	    a = this.gold[g];
	    if (this.samePoint(point, a[0])) {
		return a[1];
	    }
	}
	return 0;
    }

};


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
    },
};

module.exports = world;