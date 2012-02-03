
var icalevent = require('icalevent');
var tzone = require('tzone');
//var info = new Date().tzinfo();


var loc = tzone.getLocation(new Date());
console.log(loc);


var event = new icalevent();
event.set('summary', 'Listen to Renewing Your Mind on REFNET');
event.set('offset', new Date().getTimezoneOffset());
event.set('start', '2012-02-01T02:00:00-05:00');
event.set('end', '2012-02-01T02:26:25-05:00');
event.set('url', 'http://localhost:3100/');
event.set('organizer', {name: 'REFNET', email: 'help@refnet.fm'});

console.log(event.toFile());


var http = require('http');

http.createServer(function(request, response){

	var event = new icalevent();
	event.set('summary', 'Listen to Renewing Your Mind on REFNET');
	event.set('offset', new Date().getTimezoneOffset());
	event.set('start', '2012-02-01T02:00:00-05:00');
	event.set('end', '2012-02-01T02:26:25-05:00');
	event.set('url', 'http://localhost:3100/');
	event.set('organizer', {name: 'REFNET', email: 'help@refnet.fm'});
	
	response.writeHead(200, {'Content-Type': 'text/calendar'});
	console.log(event.toFile());
	response.end(event.toFile());

}).listen(9999, '127.0.0.1');


console.log('Server running at http://127.0.0.1:9999/');

