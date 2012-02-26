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
    var publication = client.publish('/act', {action: action, playerName: 'Diggah'});
}

$(document).bind('keydown', 'ctrl+up', function() {north()});
$(document).bind('keydown', 'ctrl+down', function() {south()});

$(document).bind('keydown', 'ctrl+left', function() {west()});
$(document).bind('keydown', 'ctrl+right', function() {east()});

$(document).bind('keydown', 'ctrl+shift+l', function() {look()});
$(document).bind('keydown', 'ctrl+shift+k', function() {grab()});
$(document).bind('keydown', 'ctrl+shift+m', function() {drop()});