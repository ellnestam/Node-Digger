var http = require('http'),
    faye = require('faye');

var bayeux = new faye.NodeAdapter({mount: '/nodedigger', timeout: 45});
bayeux.listen(8000);