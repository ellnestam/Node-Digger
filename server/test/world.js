var buster = require("buster");
var world = require("../world/world");

buster.testCase("World behaviour", {

    setUp: function () {
        this.world = world;
    },

    "Parse returns width and height": function () {
	var field = this.world.parse("ww\nww");
        buster.assert.equals(field.width, 2);
        buster.assert.equals(field.height, 2);
    },

    "": function () {
	var text = this.world.fileToString('../world/test.field');
	buster.assert.equals(text, "wwwwww\nwwwwww");
    },

    "Grabbing gold reduces the gold in the world" : function() {
	buster.assert.equals(2, 2);
    },
    
    "World can tell how much gold is present at a point" : function() {
	var p1 = {x : 1, y : 1};
	// var initialWorld = {gold : [[p1, 3], [p2, 4]]};

	var w = this.world.putGoldAt(p1, 1);
	buster.assert.equals(1, w.goldAt(p1));
    }

})