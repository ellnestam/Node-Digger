var client = new Faye.Client('http://localhost:8000/pandemic');

function drawMap() {
    var canvas = document.getElementById('myWorld');
    var world = new World();
    world.visualize(new Board());
}

function subscribe() {

    var subscription = client.subscribe('/move', function(message) {
	alert("Message was: " + message.text);
    });

    subscription.callback(function() {
	alert('Subscription is now active!');
    });

    subscription.errback(function(error) {
	alert(error.message);
    });

}

function publish() {
    var publication = client.publish('/move', {text: 'Hi there'});

    publication.callback(function() {
	alert('Message received by server!');
    });

    publication.errback(function(error) {
	alert('There was a problem: ' + error.message);
    });
}

function Board() {
    this.canvas = document.getElementById('myWorld');
}

Board.prototype.putPlayers = function (players) {
    for (var i = 0; i < players.length; i++) {
	placePlayerAt(this.canvas, 10, 10);
    }
}


function handleMove(message) {
    alert(message);
}

function drawBlackRectangle(canvas, x, y) {
    var context = canvas.getContext('2d');
    context.fillStyle="#000000";
    context.fillRect(x,y,10,10);
}

function placePlayerAt(canvas, x, y) {
    drawBlackRectangle(canvas, x, y);
}