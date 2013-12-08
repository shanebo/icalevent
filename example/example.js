
var iCalEvent = require('icalevent');
var tzone = require('tzone');
var http = require('http');


var event = new iCalEvent({
	offset: new Date().getTimezoneOffset(),
	start: '2014-07-01T02:00:00-05:00',
	end: '2014-07-01T02:30:00-05:00',
	summary: 'Priestly Duties',
	description: 'Home flu visit.',
	location: 'Casa',
	organizer: {
		name: 'Nacho Libre',
		email: 'luchador@monastery.org'
	},
	url: 'http://google.com/search?q=nacho+libre'
});


// or


var e = new iCalEvent();
e.set('offset', new Date().getTimezoneOffset());
e.set('start', '2014-07-01T02:00:00-05:00');
e.set('end', '2014-07-01T02:30:00-05:00');
e.set('summary', 'Priestly Duties.');
e.set('description', 'Home flu visit.');
e.set('location', 'Casa');
e.set('organizer', { name: 'Nacho Libre', email: 'luchador@monastery.org' });
e.set('url', 'http://google.com/search?q=nacho+libre');


console.log('\n');
console.log(e.toFile());


http.createServer(function(request, response){
	response.writeHead(200, {'Content-Type': 'text/calendar'});
	var file = event.toFile();
	response.end(file);
}).listen(9999, '127.0.0.1');


console.log('Server running at http://127.0.0.1:9999/');