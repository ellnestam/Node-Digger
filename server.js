var http = require ('http')
var url = require('url')

var doingNothing = function(response) {
    response.write("No0p\n");
}


var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-type': "text/plain"});
    var query = url.parse(req.url, true);
    var method = query.pathname;
    if (method == '/events') {
	res.write("Listing events\n");
    } else if (method == '/report') {
	res.write("Adding to events\n");
    } else {
	doingNothing(res);
    }
    
    res.end("This is the end\n");
});

server.listen("8337");
