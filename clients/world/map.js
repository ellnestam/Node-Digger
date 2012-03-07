var client = new Faye.Client('http://localhost:8000/nodedigger');

var world;
var board;

function initMap() {
    var context = getContext('myWorld');
    var playerContext = getContext('player');
    var goldContext = getContext('gold');
    var scoreContext = getContext('score');
    var fogContext = getContext('fog');

    var contexts = {
	world : getContext('myWorld'),
	digger : playerContext = getContext('player'),
	gold : getContext('gold'),
	score : getContext('score'),
	fog : getContext('fog'),
    }

    world = new World();
    board = new Board(contexts,	world, 800, 600);

    subscribe();
}

function getContext(name) {
    var playerCanvas = document.getElementById(name);
    return playerCanvas.getContext('2d');
}

function subscribe() {

    var subscription = client.subscribe('/events', function(message) {
	board.handleMove(message);
    });

    var mapSubscription = client.subscribe('/map', function(message) {
	var playerMap = field.parse(message.map);
	world.updateMap(message, playerMap);
	world.visualize(board);
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