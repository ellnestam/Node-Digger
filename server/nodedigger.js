var http = require('http'),
    faye = require('faye');

var port = 8000;

var wd = require('./world/world.js');
var player = require('./player/player.js');

var bayeux = new faye.NodeAdapter({mount: '/nodedigger', timeout: 45});
bayeux.listen(port);

var client = new faye.Client('http://localhost:' + port + '/nodedigger');

var players = new Array();

var subscription = client.subscribe('/act', function(message) {
    dispatch(message);
});

var world = {width : 20, 
	     height : 15,
	     obstacles : [[5, 5], [10, 14]],
	     gold : [[3, 3, 3],
		     [9, 12, 2],
		     [7, 13, 6],
		    ],
	    };

wd.putGoldAt({x:3, y:3}, 3); 


function dispatch(message) {
    if (!playerExists(message)) {
	players.push(
	    {playerName: message.playerName,
	     x: 1,
	     y: 1}
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
    return {width : 20, 
	    height : 15,
	    obstacles : [[5, 5], [10, 14]],
	    gold : wd.gold,
	   };
}

function createPlayerEvent(player, message, world) {
    var point = {x: player.x, y: player.y};

    if (message.action == 'north') {
	point.y = point.y - 1;
    }

    if (message.action == 'south') {
	point.y = point.y + 1;
    }

    if (message.action == 'east') {
	point.x = point.x + 1;
    }

    if (message.action == 'west') {
	point.x = point.x - 1;
    }

    if (message.action == 'look') {
	console.log(message.action);
    }

    if (message.action == 'grab') {
	grab(point, world);
    }

    if (message.action == 'drop') {
	console.log(message.action);
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

function grab(point, w) {
    if (wd.goldAt(point) > 0) {
	wd.removeGoldFrom(point, 1);
    }
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
    if (point.x < 1 || point.y < 1) {
	return false;
    }
    
    if (point.x > world.width - 1 || point.y > world.height - 1) {
	return false;
    }
    
    return true;
}