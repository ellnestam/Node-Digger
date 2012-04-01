var client = new Faye.Client('http://localhost:8000/nodedigger');

var boards = {};

function initMap() {

    var contexts = {
	world : createContext(30, 40, 0, 'land', '#p1'),
	gold : createContext(30, 40, 1, 'gold', '#p1'),
	digger : createContext(30, 40, 2, 'player', '#p1'),
	score : createContext(30, 40, 1, 'score', '#p1'),
	fog : createContext(30, 40, 1, 'fog', '#p1'),
    };

    var board = new Board(contexts, 800, 600);
    boards[p1] = board;


    subscribe();
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

function subscribe() {

    var subscription = client.subscribe('/events', function(message) {
	var w = message.world;
	var b = boardFor(message);
	b.drawMap(field.parse(w.map), w.gold, w.discovered, message.to);
	b.handleMove(message);
    });

    var subscription = client.subscribe('/score', function(message) {
	var b = boardFor(message);
	b.handleScore(message);
    });

    subscription.callback(function() {
	alert('Connected successfully');
    });

    subscription.errback(function(error) {
	alert(error.message);
    });
}

function boardFor(message) {
    return boards[p1];
}

