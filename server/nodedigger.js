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

function dispatch(message) {
    if (!playerExists(message)) {
	players.push(
	    {playerName: message.playerName,
	     x: 10,
	     y: 10}
	);
    }

    var p = players[0];
    var event = createPlayerEvent(p, message);
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
    return {width : 640, height : 480};
}

function createPlayerEvent(player, message) {
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

    return {move: 'Black',
	    playerName: 'Black',
	    from: {x: player.x, y: player.y},
	    to: point
    };
}