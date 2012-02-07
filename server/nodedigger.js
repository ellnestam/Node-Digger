var http = require('http'),
    faye = require('faye');

var port = 8000;

var world = require('./world/world.js');
var player = require('./player/player.js');

var bayeux = new faye.NodeAdapter({mount: '/nodedigger', timeout: 45});
bayeux.listen(port);

var client = new faye.Client('http://localhost:' + port + '/nodedigger');

var players = new Array();

var subscription = client.subscribe('/move', function(message) {
    dispatch(message);
});

function dispatch(message) {
    if (players.length < 1) {
	players.push({
	    name: 'Black',
	    x: 10,
	    y: 10
	});
    }

    var p = players[0];

    var event = createEvent(p, message);

    var publication = client.publish('/events', event);

    players[0] = {x: event.to.x, y: event.to.y, name: 'Black'};

}

function createEvent(player, message) {
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

    return {move: 'black',
	    from: {x: player.x, y: player.y},
	    to: point
    };
}