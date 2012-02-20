var client = new Faye.Client('http://localhost:8000/nodedigger');

var world;
var board;

function initMap() {
    var canvas = document.getElementById('myWorld');
    var context = canvas.getContext('2d');
    world = new World();
    board = new Board(context, world);
    subscribe();
}

function handleMove(message) {
    var from = message.from;
    var to = message.to;
    board.removePlayerFrom(from.x, from.y);
    board.placePlayerAt(to.x, to.y);
}

function subscribe() {

    var mapSubscription = client.subscribe('/map', function(message) {
	world.updateMap(message);
	world.visualize(board);
    });

    var subscription = client.subscribe('/events', function(message) {
	handleMove(message);
    });

    subscription.callback(function() {
	alert('Connected successfully');
    });

    subscription.errback(function(error) {
	alert(error.message);
    });
}