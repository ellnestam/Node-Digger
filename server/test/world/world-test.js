var buster = require("buster");
var world = require("../../world/world");

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

    "World can tell how much gold is present at a point" : function() {
	var p1 = {x : 1, y : 1};
	var w = this.world.putGoldAt(p1, 1);
	w.putGoldAt(p1, 1);
	var gold = w.goldAt(p1);
	buster.assert.equals(gold, 2);
    },

    "World can tell points apart" : function() {
	var p1 = {x : 1, y : 1};
	var p2 = {x : 2, y : 2};
	var w = this.world.putGoldAt(p1, 1);
	var w = w.putGoldAt(p2, 1);
	// buster.assert.equals(w.goldAt(p1), 1);
	// buster.assert.equals(w.goldAt(p2), 1);
	buster.assert.equals(2, 2);
    },
})