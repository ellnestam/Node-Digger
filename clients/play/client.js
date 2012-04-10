var client = new Faye.Client('http://localhost:8000/nodedigger');

function look() {
    act('look');
}

function grab() {
    act('grab');
}

function drop() {
    act('drop');
}

function north() {
    act('north');
}

function east() {
    act('east');
}

function south() {
    act('south');
}

function west() {
    act('west');
}

function act(action) {
    var publication = client.publish('/act', {action    : action, 
					      playerName: 'ElRodeo',
					      password  : '1111'});
}

$(document).bind('keydown', 'ctrl+up', function() {north()});
$(document).bind('keydown', 'ctrl+down', function() {south()});

$(document).bind('keydown', 'ctrl+left', function() {west()});
$(document).bind('keydown', 'ctrl+right', function() {east()});

$(document).bind('keydown', 'ctrl+shift+up', function() {grab()});
$(document).bind('keydown', 'ctrl+shift+down', function() {drop()});
$(document).bind('keydown', 'ctrl+shift+right', function() {look()});
$(document).bind('keydown', 'ctrl+shift+left', function() {look()});