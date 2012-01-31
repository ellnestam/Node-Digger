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

function east() {
    move('east');
}

function south() {
    move('south');
}

function west() {
    move('west');
}

function move(direction) {
    var publication = client.publish('/move', {direction: direction});
}

$(document).bind('keydown', 'ctrl+up', function() {north()});
$(document).bind('keydown', 'ctrl+down', function() {south()});

$(document).bind('keydown', 'ctrl+left', function() {west()});
$(document).bind('keydown', 'ctrl+right', function() {east()});