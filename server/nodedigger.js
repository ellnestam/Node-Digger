var http = require('http'),
    faye = require('faye');

var port = 8000;

var world = require('./world/world.js');
var player = require('./player/player.js');
var world = require('./world/world.js');

var bayeux = new faye.NodeAdapter({mount: '/nodedigger', timeout: 45});
bayeux.listen(port);

var client = new faye.Client('http://localhost:' + port + '/nodedigger');

var players = new Array();

var subscription = client.subscribe('/move', function(message) {
    dispatch(message);
});

var world = {width : 640, 
	     height : 480,
	     obstacles : [[50, 50], [200, 300]],
	     gold : [[350, 350, 3],
		     [400, 100, 2],
		     [150, 130, 6],
		    ],
	    };

function dispatch(message) {
    if (!playerExists(message)) {
	players.push(
	    {playerName: message.playerName,
	     x: 10,
	     y: 10}
	);
    }

    var p = players[0];
    var event = createPlayerEvent(p, message, world);
    client.publish('/events', event);
    client.publish('/map', mapEvent());

    players[0] = {x: event.to.x, y: event.to.y, playerName: message.playerName};
}

function playerExists(message) {
    for (p in players) {
	if (players[p].name === message.playerName) {
	    return true;
	}
    }
    return false;
}

function mapEvent() {
    return world;
}

function createPlayerEvent(player, message, world) {
    var point = {x: player.x, y: player.y};

    if (message.direction == 'north') {
	point.y = point.y - 10;
    }

    if (message.direction == 'south') {
	point.y = point.y + 10;
    }

    if (message.direction == 'east') {
	point.x = point.x + 10;
    }

    if (message.direction == 'west') {
	point.x = point.x - 10;
    }

    if (validMove(point, world)) {
	return {playerName: player.playerName, 
		from: {x: player.x, y: player.y},
		to: point};
    } 

    return {playerName: player.playerName, 
	    from: {x: player.x, y: player.y},
	    to: {x: player.x, y: player.y}};
}

function validMove(point, world) {
    return withinBorders(point, world) && treadableGround(point, world);
}

function treadableGround(point, world) {
    var obstacles = world.obstacles;
    
    for (o in obstacles) {
	var obstacle = obstacles[o];
	if (point.x === obstacle[0] && point.y === obstacle[1]) {
	    return false;
	}
    }
    return true;
}

function withinBorders(point, world) {
    if (point.x < 10 || point.y < 10) {
	return false;
    }
    
    if (point.x > world.width || point.y > world.height) {
	return false;
    }
    
    return true;
}