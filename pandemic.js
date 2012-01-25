var http = require('http'),
    faye = require('faye');

var bayeux = new faye.NodeAdapter({mount: '/pandemic', timeout: 45});
bayeux.listen(8000);