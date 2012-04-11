var http = require('http');
var faye = require('faye');
var url = require('url');

var port = 8000;
var clientPort = 1337;

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
	if (validPlayer(message)) {
	    var p = fetchPlayer(message, players);
	    updateWorld(wd, p);
	    return 'OK\n';
	}
	return 'Not OK\n';
    },

    grab : function(message) {
	return act('grab', message, players);
    },

    drop : function(message) {
	return act('drop', message, players);
    },  

    east : function(message) {
	return act('east', message, players);
    },

    west : function(message) {
	return act('west', message, players);
    },

    north : function(message) {
	return act('north', message, players);
    },

    south : function(message) {
	return act('south', message, players);
    },

    look : function(message) {
	if (validPlayer(message)) {
	    act('look', message, players);
	    var p = fetchPlayer(message, players);
	    var x = p.x;
	    var y = p.y;
	    return p.world.rows[y -1].substring(x - 1, x + 2) + '\n' 
		+ p.world.rows[y].substring(x - 1, x)
		+ maybeGoldAt(x, y, p.world)
		+ p.world.rows[y].substring(x + 1, x + 2) + '\n'
		+ p.world.rows[y+1].substring(x - 1, x + 2) + '\n';
	}
	return "Not OK\n";
    }
};

function maybeGoldAt(x, y, w) {
    var p = {x: x, y: y};
    if (w.goldAt(p)) {
	return w.goldAt(p);
    } else {
	return w.rows[y].substring(x, x + 1);
    }
}


function act(direction, message, players) {
    if (validPlayer(message)) {
	var p = fetchPlayer(message, players);
	var event = {
	    action : direction,
	    playerName : p.playerName,
	    password : p.password,
	};
	return dispatch(event);
    }
    return 'Not OK\n';
}


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
    if (current >= 110) {
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
    if (typeof c != 'undefined') {
	res.end(c.call(this, message));	
    }
    res.end('Unrecognized command\n');
}).listen(clientPort);

var admin = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type' : 'text/plain',
			'Access-Control-Allow-Origin' : '*'});

    var path = url.parse(req.url).path;
    
    var playerNames = new Array();
    for (var p in players) {
	var player = players[p];
	playerNames.push(player.playerName);
    }
    res.end('' + playerNames);
}).listen(1338);


function addPlayers() {
    var p = new Array();

    var rows = wd.fileToString('players').split('\n');
    for (var r in rows) {
	var playerAndPwd = rows[r].split(':');
	p.push(createPlayer(playerAndPwd[0], playerAndPwd[1], 1, 1));	
    }

    return p;
}

function createPlayer(player, pwd, x, y) {
    score[player] = 0;
    var _w = wd.parse(wd.fileToString('fields/1.field'));
    return {playerName: player,
	    fieldNo : 1,
	    password: pwd,
	    x: x,
	    y: y,
	    world: _w,
	    load : 0};
}

function dispatch(message) {
    if (validPlayer(message)) {
	var p = fetchPlayer(message, players);
	var event = createPlayerEvent(p, message);
	client.publish('/map', p.world);
	client.publish('/events', event);
	players = updatePlayers(players, event, message);
	return 'OK\n';
    }
    return 'Not OK\n';
}

function updatePlayers(players, event, message) {
    var p = players.slice();
    for (var i = 0; i < p.length; i++) {
	if (p[i].playerName === message.playerName) {
	    p[i] = {playerName: message.playerName,
		    password: message.password,
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
    for (var i in players) {
	var p = players[i];
	if (p.playerName === message.playerName 
	    && p.password === message.password
	   ) {
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
	password: player.password,
	to: playerAt,
	world: world,
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
	return 'OK';
    }
    return 'Not OK';
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