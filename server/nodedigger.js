var http = require('http'),
    faye = require('faye');

var port = 8000;

var wd = require('./world/world.js');
var ground = require('./world/ground.js');
var player = require('./player/player.js');

var bayeux = new faye.NodeAdapter({mount: '/nodedigger', timeout: 45});
bayeux.listen(port);

var client = new faye.Client('http://localhost:' + port + '/nodedigger');

var players = new Array();

var carryLimit = 3;

var subscription = client.subscribe('/act', function(message) {
    dispatch(message);
});

wd.putGoldAt({x:3, y:3}, 3); 
wd.putGoldAt({x:15, y:8}, 8); 
wd.width = 18;
wd.height = 15;
wd.obstacles = [[5, 5], [10, 14]];
wd.bank = {x: 8, y : 9};

var score = {};

function dispatch(message) {
    if (!playerExists(message)) {
	players.push(
	    {playerName: message.playerName,
	     x: 1,
	     y: 1,
	     load : 0}
	);
    }

    var p = players[0];
    var event = createPlayerEvent(p, message, wd);
    client.publish('/events', event);
    client.publish('/map', wd);

    players[0] = {x: event.to.x, 
		  y: event.to.y, 
		  playerName: message.playerName,
		  load: event.load
		 };
}

function playerExists(message) {
    for (p in players) {
	if (players[p].name === message.playerName) {
	    return true;
	}
    }
    return false;
}

function createPlayerEvent(player, message, world) {
    var playerAt = {x: player.x, y: player.y};
    var futurePosition = {x: player.x, y: player.y};

    if (message.action == 'north') {
	futurePosition.y -= 1;
    }

    if (message.action == 'south') {
	futurePosition.y += 1;
    }

    if (message.action == 'east') {
	futurePosition.x += 1;
    }

    if (message.action == 'west') {
	futurePosition.x -= 1;
    }

    if (message.action == 'look') {
	console.log(message.action);
    }

    if (message.action == 'grab') {
	grab(playerAt, world, player);
    }

    if (message.action == 'drop') {
	drop(playerAt, world, player);
    }

    var p = {
	playerName: player.playerName, 
	load: player.load,
	from: playerAt,
	to: playerAt,
    }

    if (ground.validMove(futurePosition, world)) {
	p.to = futurePosition;
    } 

    return p;
}

function grab(point, w, player) {
    if (w.goldAt(point) > 0 && canCarryMore(player)) {
	w.removeGoldFrom(point, 1);
	player.load += 1;
    }
}

function canCarryMore(player) {
    return player.load < carryLimit;
}

function drop(point, w, player) {
    if (w.goldAt(point) < 9 && player.load > 0) {

	if (atBank(point, w)) {
	    console.log('Katching');
	    updateScore(score, player.playerName, 1);
	    client.publish('/score', score);
	} else {
	    w.putGoldAt(point, 1);
	}

	player.load -= 1;
    }
}

function updateScore(score, player, amount) {
    if (score[player]) {
	score[player] += amount;
    } else {
	score[player] = amount;
    }
    console.dir(score);
}

function atBank(point, world) {
    return (world.bank.x == point.x && world.bank.y == point.y);
}