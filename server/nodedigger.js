var http = require('http');
var faye = require('faye');
var url = require('url');

var port = 8000;

var wd = require('./world/world.js');
var ground = require('./world/ground.js');
var player = require('./player/player.js');

var bayeux = new faye.NodeAdapter({mount: '/nodedigger', timeout: 45}).listen(port);

var client = new faye.Client('http://localhost:' + port + '/nodedigger');
var _world = wd.parse(wd.fileToString('fields/16.field'));
var score = {};
var players = addPlayers();

var carryLimit = 3;

var subscription = client.subscribe('/act', function(message) {
    dispatch(message);
});

var srv = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('okay');
    var path = url.parse(req.url).path;
    
    var commands = path.split("/");
    console.log(commands);
    var message = {playerName : commands[1],
		   password: commands[2],
		   
};

}).listen(1337);

function addPlayers() {
    var p = new Array();
    p.push(createPlayer('Diggah', '1234', 1, 1, 0));
    p.push(createPlayer('Bot 1', '4321', 1, 1, 0));

    return p;
}

function createPlayer(player, pwd, x, y, load) {
    score[player] = 0;
    return {playerName: player,
	    password: pwd,
	    x: x,
	    y: y,
	    load : load};
}

function dispatch(message) {
    if (validPlayer(message)) {
	var p = fetchPlayer(message, players);
	var event = createPlayerEvent(p, message, _world);
	client.publish('/map', _world);
	client.publish('/events', event);
	players = updatePlayers(players, event, message);
    }
}

function updatePlayers(players, event, message) {
    var p = players.slice();
    for (var i = 0; i < p.length; i++) {
	if (p[i].playerName === message.playerName) {
	    p[i] = {playerName: message.playerName,
		    x: event.to.x,
		    y: event.to.y,
		    load: event.load};
	}
    }

    return p;
}

function fetchPlayer(message, players) {
    for (var i = 0; i < players.length; i++) {
	if (players[i].playerName === message.playerName) {
	    return players[i];
	}
    }
}
    
function validPlayer(message) {
    for (var p in players) {
	if (players[p].playerName === message.playerName) {
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
	look(playerAt, world, player);
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

function look(point, w, player) {
    w.peekAt(point, w, player);
}

function canCarryMore(player) {
    return player.load < carryLimit;
}

function drop(point, w, player) {
    if (w.goldAt(point) < 9 && player.load > 0) {

	if (atBank(point, w)) {
	    updateScore(score, player.playerName, 1);
	    client.publish('/score', score);
	} else {
	    w.putGoldAt(point, 1);
	}

	player.load -= 1;
    }
}

function updateScore(score, player, amount) {
    score[player] += amount;
}

function atBank(point, world) {
    return (world.bank.x == point.x && world.bank.y == point.y);
}