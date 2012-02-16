var buster = require("buster");
var world = require("../world/world");

buster.testCase("Parse world-files", {

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
    }

})