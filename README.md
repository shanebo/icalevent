# iCalEvent

Create an iCalEvent instance by setting limited properties and event.toFile() to get an ics formatted string back.

## Install

With [npm](http://npmjs.org):

	npm install icalevent


## Examples

``` js
var iCalEvent = require('icalevent');

var event = new iCalEvent({
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
```

Or:

``` js
var iCalEvent = require('icalevent');

var event = new iCalEvent();

event.set('summary', 'Priestly Duties');
event.set('offset', new Date().getTimezoneOffset());
event.set('start', '2014-07-01T02:00:00-05:00');
event.set('end', '2014-07-01T02:30:00-05:00');
event.set('url', 'http://google.com/search?q=nacho+libre');
event.set('organizer', {name: 'Nacho Libre', email: 'luchador@monastery.org'});
```

To ics string:

``` js
event.toFile();
```

Returns:

```
BEGIN:VCALENDAR
METHOD:REQUEST
BEGIN:VEVENT
UID:373fda4f-08ed-485a-b083-3c26cfa010a1
DTSTAMP:20130723T015802
ORGANIZER;CN="Nacho Libre":mailto:luchador@monastery.org
DTSTART:20140701T020000
DTEND:20140701T023000
URL;VALUE=URI:http://google.com/search?q=nacho+libre
SUMMARY:Priestly Duties
END:VEVENT
END:VCALENDAR
```

## Methods

### .set(property, value)
``` js
event.set('url', 'http://google.com/search?q=nacho+libre');
```

### .get(property)
``` js
event.get('url');
```

Returns:

```
http://google.com/search?q=nacho+libre
```

### .toFile()
``` js
event.toFile();
```

Returns:

```
BEGIN:VCALENDAR
METHOD:REQUEST
BEGIN:VEVENT
UID:373fda4f-08ed-485a-b083-3c26cfa010a1
DTSTAMP:20130723T015802
ORGANIZER;CN="Nacho Libre":mailto:luchador@monastery.org
DTSTART:20140701T020000
DTEND:20140701T023000
URL;VALUE=URI:http://google.com/search?q=nacho+libre
SUMMARY:Priestly Duties
END:VEVENT
END:VCALENDAR
```


## License

MIT

## Todos

* tests