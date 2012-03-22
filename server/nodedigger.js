var http = require('http');
var faye = require('faye');
var url = require('url');

var port = 8000;

var wd = require('./world/world.js');
var ground = require('./world/ground.js');
var player = require('./player/player.js');

var bayeux = new faye.NodeAdapter({mount: '/nodedigger', timeout: 45}).listen(port);

var client = new faye.Client('http://localhost:' + port + '/nodedigger');

var score = {};
var players = addPlayers();

var carryLimit = 3;

var subscription = client.subscribe('/act', function(message) {
    dispatch(message);
});


var commands = {
    next : function(message) {
	console.log(message);
	if (validPlayer(message)) {
	    var p = fetchPlayer(message, players);
	    updateWorld(wd, p);
	    return message.playerName + ' found';
	}
    },
};

function updateWorld(wd, player) {
    var no =  determineMap(player);
    player.world = wd.parse(wd.fileToString('fields/' + no + '.field'));
    player.load = 0;
    player.x = 1;
    player.y = 1;
    player.fieldNo = no;
}

function determineMap(player) {
    current = player.fieldNo;
    if (current > 30) {
	return 1;
    }
    return current + 1;
}


var srv = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var path = url.parse(req.url).path;
    
    var args = path.split("/");
    var message = {playerName : args[1],
		   password: args[2],
		   command: args[3],
		  };
    
    var c = commands[message.command];
    res.end(c.call(this, message));
    

}).listen(1337);

function addPlayers() {
    var p = new Array();
    var _w1 = wd.parse(wd.fileToString('fields/1.field'));
    var _w2 = wd.parse(wd.fileToString('fields/1.field'));
    p.push(createPlayer('Diggah', '1234', 1, 1, _w1, 0));
    p.push(createPlayer('Bot 1', '4321', 1, 1, _w2, 0));

    return p;
}

function createPlayer(player, pwd, x, y, _world, load) {
    score[player] = 0;
    return {playerName: player,
	    fieldNo : 1,
	    password: pwd,
	    x: x,
	    y: y,
	    world: _world,
	    load : load};
}

function dispatch(message) {
    if (validPlayer(message)) {
	var p = fetchPlayer(message, players);
	var event = createPlayerEvent(p, message);
	client.publish('/map', p.world);
	client.publish('/events', event);
	players = updatePlayers(players, event, message);
    }
}

function updatePlayers(players, event, message) {
    var p = players.slice();
    for (var i = 0; i < p.length; i++) {
	if (p[i].playerName === message.playerName) {
	    p[i] = {playerName: message.playerName,
		    world: p[i].world,
		    x: event.to.x,
		    y: event.to.y,
		    fieldNo : p[i].fieldNo,
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

function createPlayerEvent(player, message) {
    var playerAt = {x: player.x, y: player.y};
    var futurePosition = {x: player.x, y: player.y};
    var world = player.world;

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