var client = new Faye.Client('http://localhost:8000/nodedigger');

function publish() {
    var publication = client.publish('/move', {text: 'Hi there'});

    publication.callback(function() {
	alert('Message received by server!');
    });

    publication.errback(function(error) {
	alert('There was a problem: ' + error.message);
    });
}

function north() {
    move('north');
}

function move(direction) {
    var publication = client.publish('/move', {direction: direction});
}