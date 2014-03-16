# iCalEvent

Create an iCalEvent instance by setting limited properties and event.toFile() to get an ics formatted string back.

## Install

With [npm](http://npmjs.org):

	npm install icalevent


## Examples

``` js
var iCalEvent = require('icalevent');

var event = new iCalEvent({
	offset: new Date().getTimezoneOffset(),
	method: 'request',
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
	summary: 'Priestly Duties',
	description: 'Home flu visit.',
	location: 'Casa',
	organizer: {
		name: 'Nacho Libre',
		email: 'luchador@monastery.org'
	},
	url: 'http://google.com/search?q=nacho+libre'
});
```

Or:

``` js
var iCalEvent = require('icalevent');

var event = new iCalEvent();

event.set('offset', new Date().getTimezoneOffset());
event.set('method', 'request');
event.set('status', 'confirmed');
event.set('attendees', [
	{
		name: 'Johnny Boy',
		email: 'johnny@numberfive.com'
	},
	{
		name: 'Homer Simpson',
		email: 'homer@powerplant.com'
	}
]);
event.set('start', '2014-07-01T02:00:00-05:00');
event.set('end', '2014-07-01T02:30:00-05:00');
event.set('summary', 'Priestly Duties.');
event.set('description', 'Home flu visit.');
event.set('location', 'Casa');
event.set('organizer', { name: 'Nacho Libre', email: 'luchador@monastery.org' });
event.set('url', 'http://google.com/search?q=nacho+libre');
```

To ics string:

``` js
event.toFile();
```

Returns:

```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//iCalEvent.js v0.3//EN
BEGIN:VEVENT
UID:0617eadc-dcd5-4095-bf2f-7500bea29eaf
DTSTAMP:20140316T003036
METHOD:REQUEST
STATUS:CONFIRMED
DTSTART;TZID=US/Central:20140701T020000
DTEND;TZID=US/Central:20140701T023000
SUMMARY:Priestly Duties.
DESCRIPTION:Home flu visit.
ORGANIZER;CN=Nacho Libre:mailto:luchador@monastery.org
LOCATION:Casa
URL;VALUE=URI:http://google.com/search?q=nacho+libre
ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=Johnny Boy:MAILTO:johnny@numberfive.com
ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=Homer Simpson:MAILTO:homer@powerplant.com
END:VEVENT
END:VCALENDAR
```

## API

### Properties

#### Required

* **offset** (Integer) _The Date.getTimezoneOffset() of the timezone the event is set in. Important: the offset has to be set before start and end times_
* **start** (Date Object) _The start date object of the event_
* **end** (Date Object) _The end date object of the event_

#### Optional

* **method** (String) _The event method. For example, publish, request, reply, add, cancel, refresh, counter, and decline-counter_
* **status** (String) _The event status. For example, cancelled, confirmed, tentative_
* **location** (String) _The event location of the event. For example, monastery_
* **url** (String) _A url corresponding to the event_
* **summary** (String) _A summary of the event_
* **description** (String) _A description of the event_
* **organizer** (Object) _The organizer object in the following format:_

``` js
{
	name: 'Nacho Libre',
	email: 'luchador@monastery.org'
}
```
* **attendees** (Array) _The attendees array in the following format:_

``` js
[
	{
		name: 'Johnny Boy',
		email: 'johnny@numberfive.com'
	},
	{
		name: 'Homer Simpson',
		email: 'homer@powerplant.com'
	}
]
```

### Methods

#### .set(property, value)
``` js
event.set('url', 'http://google.com/search?q=nacho+libre');
```

#### .get(property)
``` js
event.get('url');
```

Returns:

```
http://google.com/search?q=nacho+libre
```

#### .toFile()
``` js
event.toFile();
```

Returns:

```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//iCalEvent.js v0.3//EN
BEGIN:VEVENT
UID:0617eadc-dcd5-4095-bf2f-7500bea29eaf
DTSTAMP:20140316T003036
METHOD:REQUEST
STATUS:CONFIRMED
DTSTART;TZID=US/Central:20140701T020000
DTEND;TZID=US/Central:20140701T023000
SUMMARY:Priestly Duties.
DESCRIPTION:Home flu visit.
ORGANIZER;CN=Nacho Libre:mailto:luchador@monastery.org
LOCATION:Casa
URL;VALUE=URI:http://google.com/search?q=nacho+libre
ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=Johnny Boy:MAILTO:johnny@numberfive.com
ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=Homer Simpson:MAILTO:homer@powerplant.com
END:VEVENT
END:VCALENDAR
```


## License

MIT

## Todos

* tests