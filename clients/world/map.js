var client = new Faye.Client('http://localhost:8000/nodedigger');

var world;
var board;

function initMap() {
    var canvas = document.getElementById('myWorld');
    var context = canvas.getContext('2d');
    world = new World(context);
    board = new Board();
}

function drawMap() {
    world.visualize(board);
}

function handleMove(message) {
    var from = message.from;
    var to = message.to;
    var canvas = document.getElementById('myWorld');
    var context = canvas.getContext('2d');
    removePlayerFrom(context, from.x, from.y);
    placePlayerAt(context, to.x, to.y);
}

function updateMap() {
    world.visualize(board);
}

function subscribe() {

    var mapSubscription = client.subscribe('/map', function(message) {
	updateMap(message);
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

function drawBlackRectangle(context, x, y) {
    drawRectangle(context, '#000000', x, y);
}

function removePlayerFrom(context, x, y) {
    drawRectangle(context, '#FFFFFF', x, y);
}

function drawRectangle(context, color, x, y) {
    context.fillStyle=color;
    context.fillRect(x,y,10,10);
}

function placePlayerAt(context, x, y) {
    drawBlackRectangle(context, x, y);
}