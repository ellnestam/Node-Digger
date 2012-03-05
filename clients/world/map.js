var client = new Faye.Client('http://localhost:8000/nodedigger');

var world;
var board;

function initMap() {
    var canvas = document.getElementById('myWorld');
    var context = canvas.getContext('2d');

    var playerCanvas = document.getElementById('player');
    var playerContext = playerCanvas.getContext('2d');

    world = new World();
    board = new Board(context, playerContext, world);
    subscribe();
}

function subscribe() {

    var subscription = client.subscribe('/events', function(message) {
	board.handleMove(message);
    });

    var mapSubscription = client.subscribe('/map', function(message) {
	var myMap = field.parse(message.map);
	world.updateMap(message, myMap);
	world.visualize(board);
    });

    var subscription = client.subscribe('/events', function(message) {
	board.handleScore(message);
    });

    subscription.callback(function() {
	alert('Connected successfully');
    });

    subscription.errback(function(error) {
	alert(error.message);
    });
}