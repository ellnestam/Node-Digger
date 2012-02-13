var buster = require("buster");
var world = require("../lib/world");

buster.testCase("Parse world-files", {

    setUp: function () {
        this.world = world;
    },

    "Can split string on line break": function () {
        buster.assert.equals(
	    this.world.parse("ww\nww"),
	    ["ww", "ww"]
	);
    },

    "Test": function () {
	var field = this.world.parse("ww\nww");
        buster.assert.equals(field.width, 2);
        // buster.assert.equals(field.height, 2);
    }

})