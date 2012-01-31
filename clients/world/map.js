var client = new Faye.Client('http://localhost:8000/nodedigger');

function drawMap() {
    var world = new World();
    world.visualize(new Board());
}

function subscribe() {

    var subscription = client.subscribe('/events', function(message) {
	var from = message.from;
	var to = message.to;
	var canvas = document.getElementById('myWorld');
	var context = canvas.getContext('2d');
	// alert("From " + from.x + ":" + from.y);
	removePlayerFrom(context, from.x, from.y);
	placePlayerAt(context, to.x, to.y);
    });

    subscription.callback(function() {
	alert('Connected successfully');
    });

    subscription.errback(function(error) {
	alert(error.message);
    });

}

function dispatch(message) {
    alert("Message was: " + message.from);
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