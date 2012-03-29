var client = new Faye.Client('http://localhost:8000/nodedigger');

var world;
var board;

function initMap() {

    var contexts = {
	world : createContext(30, 40, 0, 'land', '#p1'),
	gold : createContext(30, 40, 1, 'gold', '#p1'),
	digger : createContext(30, 40, 2, 'player', '#p1'),
	score : createContext(30, 40, 1, 'score', '#p1'),
	fog : createContext(30, 40, 1, 'fog', '#p1'),
    };

    world = new World();
    board = new Board(contexts,	world, 800, 600);

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

    var mapSubscription = client.subscribe('/map', function(message) {
	var playerMap = field.parse(message.map);
	world.updateMap(message, playerMap);
    });

    var subscription = client.subscribe('/events', function(message) {
	world.visualize(board, message.to);
	board.handleMove(message);
    });

    var subscription = client.subscribe('/score', function(message) {
	board.handleScore(message);
    });

    subscription.callback(function() {
	alert('Connected successfully');
    });

    subscription.errback(function(error) {
	alert(error.message);
    });
}