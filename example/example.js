
var icalevent = require('icalevent');
var tzone = require('tzone');
var http = require('http');


var event = new icalevent();

event.set('summary', 'Pointless meeting');
event.set('offset', new Date().getTimezoneOffset());
event.set('start', '2014-07-01T02:00:00-05:00');
event.set('end', '2014-07-01T02:30:00-05:00');
event.set('url', 'http://google.com');
event.set('organizer', {name: 'shanebo', email: 'foo@email.com'});

var file = event.toFile();
console.log(file);


http.createServer(function(request, response){

	response.writeHead(200, {'Content-Type': 'text/calendar'});
	response.end(file);

}).listen(9999, '127.0.0.1');


console.log('Server running at http://127.0.0.1:9999/');