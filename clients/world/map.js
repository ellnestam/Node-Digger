var client = new Faye.Client('http://localhost:8000/nodedigger');

var boards = {};
var sb;

function initMap() {

    $().ready(function(){ 
	var url = 'http://localhost:1338';
	$.get(url, function(data) {
	    var players = data.split(',');
	    var i = 1;
	    for (var p in players) {
		var player = players[p];
		boards[player] = new Board(createContexts('#p' + i), 300, 150);
		i++;
	    }
	});
    });
    
    sb = createContext(10, 10, 0, 'a_name', '#score_board');

    sb.fillText('Current score: keso', 0, 0);

    subscribe();
}

function createContexts(divName) {
    return {
	world : createContext(30, 40, 0, 'land', divName),
	gold : createContext(30, 40, 1, 'gold', divName),
	digger : createContext(30, 40, 2, 'player', divName),
	fog : createContext(30, 40, 1, 'fog', divName),
    };
}

function createContext(x, y, zIndex, name, div) {
    var ctx = $( '<canvas />', 
		 {id: name})
	.css('position', 'absolute')
	.css('z-index', zIndex)
	.css('left', x)
	.css('top', y);
    
    $(div).append(ctx[0]);
    return ctx[0].getContext('2d');
}

function handleScore(message, context) {
    context.save();
    context.clearRect(0, 0, this.width, this.height);

    var height = 0;
    context.fillText('Current score: ', 10, height);
    for (p in message) {
	height += 10;
	var player = message[p];
	context.fillText(p + ': ' + player, 10, height);
    }

    context.restore();
}

function subscribe() {

    var subscription = client.subscribe('/events', function(message) {
	var w = message.world;
	var b = boardFor(message);
	var bank = message.world.bank;
	b.drawMap(field.parse(w.map), w.gold, w.discovered, message.to, bank);
	b.handleMove(message);
    });

    var subscription = client.subscribe('/score', function(message) {
	// var b = boardFor('Diggah');
	handleScore(message, sb);
    });

    subscription.callback(function() {
	alert('Connected successfully');
    });

    subscription.errback(function(error) {
	alert(error.message);
    });
}

function boardFor(message) {
    return boards[message.playerName];
}

