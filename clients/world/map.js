var client = new Faye.Client('http://localhost:8000/nodedigger');

function drawMap() {
    var world = new World();
    world.visualize(new Board());
}

function subscribe() {

    var subscription = client.subscribe('/move', function(message) {
	dispatch(message);
    });

    subscription.callback(function() {
	alert('Connected successfully');
    });

    subscription.errback(function(error) {
	alert(error.message);
    });

}

function dispatch(message) {
    alert("Message was: " + message.direction);
    if (message.direction == 'north') {
	north();
    } else if (message.direction == 'south') {
	south();
    } else if (message.direction == 'east') {
	east();
    } else if (message.direction == 'west') {
	west();
    }
}

function north() {
    alert('Hej');
    drawBlackRectangle(0, 0);
}


function handleMove(message) {
    alert(message);
}

function drawBlackRectangle(x, y) {
    var canvas = document.getElementById('myWorld');
    var context = canvas.getContext('2d');
    context.fillStyle="#000000";
    context.fillRect(x,y,10,10);
}

function placePlayerAt(canvas, x, y) {
    drawBlackRectangle(canvas, x, y);
}