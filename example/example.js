
var iCalEvent = require('icalevent');
var tzone = require('tzone');
var http = require('http');


var event = new iCalEvent();
event.set('summary', 'Priestly Duties');
event.set('offset', new Date().getTimezoneOffset());
event.set('start', '2014-07-01T02:00:00-05:00');
event.set('end', '2014-07-01T02:30:00-05:00');
event.set('url', 'http://google.com/search?q=nacho+libre');
event.set('organizer', {name: 'Nacho Libre', email: 'luchador@monastery.org'});


console.log(event.toFile());


var secondEvent = new iCalEvent({
	summary: 'Priestly Duties',
	offset: new Date().getTimezoneOffset(),
	start: '2014-07-01T02:00:00-05:00',
	end: '2014-07-01T02:30:00-05:00',
	url: 'http://google.com/search?q=nacho+libre',
	organizer: {
		name: 'Nacho Libre',
		email: 'luchador@monastery.org'
	}
});


console.log(secondEvent.toFile());


http.createServer(function(request, response){
	response.writeHead(200, {'Content-Type': 'text/calendar'});
	response.end(file);
}).listen(9999, '127.0.0.1');


console.log('Server running at http://127.0.0.1:9999/');