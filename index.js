var app = require('express')();
var http = require('http').createServer(app);
var server = require('ws').Server;
var s = new server({server: http});
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

s.on('connection', function(ws) {
	ws.on('message', function(message) {
		console.log("Received: " + message);

		s.clients.forEach(function(client) {
			client.send(message + ' : ' + new Date());
		});
	});

	ws.on('close', function() {
		console.log('I lost a client');
	});
});

http.listen(port, function() {
	console.log('listening on *:' + port);
});
