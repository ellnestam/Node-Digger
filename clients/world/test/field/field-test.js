var buster = require("buster");
var field = require("../../field");

buster.testCase("Field behaviour", {

    setUp: function () {
        this.field = field;

	var f = "wwwwwwww\n";
	f +=    "wbwwwwww\n";
	f +=    "w.wwwwww\n";
	f +=    "w1...96w\n";
	f +=    "wwwwwwww";

	this.world = field.parse(f); 
    },

    "Field can be converted to map" : function() {
	var view = [['w', 'w', 'w'],
		    ['w', 'b', 'w'],
		    ['w', '.', 'w']];

	buster.assert.equals(this.world.look(1, 1), view); 
    },

    "Outside upper and left gets are padded with walls" : function() {
	var view = [['w', 'w', 'w'],
		    ['w', 'w', 'w'],
		    ['w', 'w', 'b']];

	buster.assert.equals(this.world.look(0, 0), view); 
    },

    "Outside lower and right are padded with walls" : function() {
	var view = [['6', 'w', 'w'],
		    ['w', 'w', 'w'],
		    ['w', 'w', 'w']];

	buster.assert.equals(this.world.look(7, 4), view); 
    },

    "South wall" : function() {

	var f = "wwwwwwwwwwwww\n";
	f += "wbww3333...1w\n";
	f += "w.ww5wwwwww.w\n";
	f += "w.ww77899ww.w\n";
	f += "w.wwwwwwwww.w\n";
	f += "w1.........1w\n";
	f += "wwwwwwwwwwwww\n";

	var w = field.parse(f); 

	var view = [['.', '1', 'w'],
		    ['w', 'w', 'w'],
		    ['w', 'w', 'w']];
	
	buster.assert.equals(w.look(11, 6), view); 
    }


});