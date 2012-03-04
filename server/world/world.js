var fs = require('fs');

var world = {
    gold : [],

    pointPresent : function (point) {
	for (var g in this.gold) {
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
	    for (var g in this.gold) {
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
	for (var g in this.gold) {
	    a = this.gold[g];
	    if (this.samePoint(point, a[0])) {
		this.gold[g][1] = a[1] + amount;
	    }
	}
    },

    samePoint : function(p1, p2) {
	return (p1.x == p2.x) && (p1.y == p2.y);
    },

    parse : function(string) {
	var r = string.split("\n");
	return {
	    rows: r,
	    width: r[0].length, 
	    height: r.length
	};
    },

    fileToString : function(filename) {
	return fs.readFileSync(filename).toString();
    },

    goldAt : function (point) {
	for (var g in this.gold) {
	    a = this.gold[g];
	    if (this.samePoint(point, a[0])) {
		return a[1];
	    }
	}
	return 0;
    }

};


world.prototype = {

};

module.exports = world;