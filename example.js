
var iCalEvent = require('icalevent');
var tzone = require('tzone');
var http = require('http');

var calendar = new iCalendar({
	method: 'request',
	name: 'Personal calendar',
	description: 'Personal calendar of Johnny Boy'
}, [{
	uid: 9873647,
	offset: new Date().getTimezoneOffset(),
	status: 'confirmed',
	attendees: [
		{
			name: 'Johnny Boy',
			email: 'johnny@numberfive.com'
		},
		{
			name: 'Homer Simpson',
			email: 'homer@powerplant.com'
		}
	],
	start: '2014-07-01T02:00:00-05:00',
	end: '2014-07-01T02:30:00-05:00',
	timezone: 'US/Central',
	summary: 'Priestly Duties',
	description: 'Home flu visit.',
	location: 'Casa',
	organizer: {
		name: 'Libre, Nacho',
		email: 'luchador@monastery.org'
	},
	url: 'http://google.com/search?q=nacho+libre'
}, {
	offset: new Date().getTimezoneOffset(),
	status: 'confirmed',
	attendees: [
		{
			name: 'Johnny Boy',
			email: 'johnny@numberfive.com'
		}
	],
	start: '2014-07-02T10:00:00-05:00',
	end: '2014-07-02T11:30:00-05:00',
	timezone: 'US/Central',
	summary: 'Meet with Jane, bring cake',
	location: 'Somewhere',
	organizer: {
		name: 'Doe, Jane',
		email: 'jane@doe.com'
	}
}]);


// or


var c = new iCalendar();

c.set('method', 'request');
c.set('name', 'Personal calendar');
c.set('description', 'Personal calendar of Johnny Boy');

var e = c.addEvent();

e.set('uid', 9873647);
e.set('offset', new Date().getTimezoneOffset());
e.set('status', 'confirmed');
e.set('attendees', [
	{
		name: 'Johnny Boy',
		email: 'johnny@numberfive.com'
	},
	{
		name: 'Homer Simpson',
		email: 'homer@powerplant.com'
	}
]);
e.set('start', '2014-07-01T02:00:00-05:00');
e.set('end', '2014-07-01T02:30:00-05:00');
e.set('timezone', 'US/Central');
e.set('summary', 'Priestly Duties.');
e.set('description', 'Home flu visit.');
e.set('location', 'Casa');
e.set('organizer', { name: 'Libre, Nacho', email: 'luchador@monastery.org' });
e.set('url', 'http://google.com/search?q=nacho+libre');

var e2 = c.addEvent();

e2.set('offset', new Date().getTimezoneOffset());
e2.set('status', 'confirmed');
e2.set('attendees', [
	{
		name: 'Johnny Boy',
		email: 'johnny@numberfive.com'
	}
]);
e2.set('start', '2014-07-02T10:00:00-05:00');
e2.set('end', '2014-07-02T11:30:00-05:00');
e2.set('timezone', 'US/Central');
e2.set('summary', 'Meet with Jane, bring cake');
e2.set('location', 'Somewhere');
e2.set('organizer', {name: 'Doe, Jane', email: 'jane@doe.com'});


console.log('\n');
console.log(c.toFile());

console.log('\n');
console.log(calendar.toFile());


http.createServer(function(request, response){
	response.writeHead(200, {'Content-Type': 'text/calendar'});
	var file = calendar.toFile();
	response.end(file);
}).listen(9999, '127.0.0.1');


console.log('Server running at http://127.0.0.1:9999/');