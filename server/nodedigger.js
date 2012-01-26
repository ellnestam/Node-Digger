var http = require('http'),
    faye = require('faye');
// var world = require('world');

var port = 8000;

var bayeux = new faye.NodeAdapter({mount: '/nodedigger', timeout: 45});
bayeux.listen(port);

var client = new faye.Client('http://localhost:' + port + '/nodedigger');

var subscription = client.subscribe('/move', function(message) {
    dispatch(message);
});

// var world = new World();

function dispatch(message) {
    console.log(message.direction);
}
