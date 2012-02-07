var buster = require("buster");
var world = require("../lib/world");

buster.testCase("Parse world-files", {

    setUp: function () {
        this.world = world;
    },

    "Can split string on line break": function () {
        buster.assert.equals([1, 2, 3],
			     this.world.parse("1\n2\n3"));
    }
})