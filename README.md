# iCalEvent

Create an iCalEvent instance by setting limited properties and event.toFile() to get an ics formatted string back.

## Install

With [npm](http://npmjs.org):

	npm install icalevent


## Examples

``` js
var iCalendar = require('./icalevent');

var calendar = new iCalendar({
	method: 'request',
	name: 'Personal calendar',
	description: 'Personal calendar of Johnny Boy'
}, [{
	uid: 9873647,
	status: 'confirmed',
	attendees: [
		{
			name: 'Johnny Boy',
			email: 'johnny@numberfivevent.com'
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
	url: 'http://googlevent.com/search?q=nacho+libre'
}, {
	status: 'confirmed',
	attendees: [
		{
			name: 'Johnny Boy',
			email: 'johnny@numberfivevent.com'
		}
	],
	start: '2014-07-02T10:00:00-05:00',
	end: '2014-07-02T11:30:00-05:00',
	timezone: 'US/Central',
	summary: 'Meet with Jane, bring cake',
	location: 'Somwhere',
	organizer: {
		name: 'Doe, Jane',
		email: 'jane@doevent.com'
	}
}]);
```

Or:

``` js
var iCalendar = require('./icalevent');

var calendar = new iCalendar();

calendar.set('method', 'request');
calendar.set('name', 'Personal calendar');
calendar.set('description', 'Personal calendar of Johnny Boy');

var event = calendar.addEvent();

event.set('uid', 9873647);
event.set('status', 'confirmed');
event.set('attendees', [
	{
		name: 'Johnny Boy',
		email: 'johnny@numberfivevent.com'
	},
	{
		name: 'Homer Simpson',
		email: 'homer@powerplant.com'
	}
]);
event.set('start', '2014-07-01T02:00:00-05:00');
event.set('end', '2014-07-01T02:30:00-05:00');
event.set('timezone', 'US/Central');
event.set('summary', 'Priestly Duties.');
event.set('description', 'Home flu visit.');
event.set('location', 'Casa');
event.set('organizer', { name: 'Libre, Nacho', email: 'luchador@monastery.org' });
event.set('url', 'http://googlevent.com/search?q=nacho+libre');

var event2 = calendar.addEvent();

event2.set('status', 'confirmed');
event2.set('attendees', [
	{
		name: 'Johnny Boy',
		email: 'johnny@numberfivevent.com'
	}
]);
event2.set('start', '2014-07-02T10:00:00-05:00');
event2.set('end', '2014-07-02T11:30:00-05:00');
event2.set('timezone', 'US/Central');
event2.set('summary', 'Meet with Jane, bring cake');
event2.set('location', 'Somwhere');
event2.set('organizer', {name: 'Doe, Jane', email: 'jane@doevent.com'});
```

To ics string:

``` js
calendar.toFile();
```

Returns:

```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//iCalEvent.js v0.3//EN
METHOD:REQUEST
NAME:Personal calendar
X-WR-CALNAME:Personal calendar
DESCRIPTION:Personal calendar of Johnny Boy
X-WR-CALDESC:Personal calendar of Johnny Boy
BEGIN:VEVENT
UID:9873647
DTSTAMP:20140729T115736
STATUS:CONFIRMED
DTSTART;TZID=US/Central:20140701T090000
DTEND;TZID=US/Central:20140701T093000
SUMMARY:Priestly Duties
DESCRIPTION:Home flu visit.
ORGANIZER;CN=Libre\, Nacho:mailto:luchador@monastery.org
LOCATION:Casa
URL;VALUE=URI:http://google.com/search?q=nacho+libre
ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=Johnny Boy:MAILTO:johnny@numberfive.com
ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=Homer Simpson:MAILTO:homer@powerplant.com
END:VEVENT
BEGIN:VEVENT
UID:104a0a1f-2b0b-4fcb-9a36-83d868e67a08
DTSTAMP:20140729T115736
STATUS:CONFIRMED
DTSTART;TZID=US/Central:20140702T170000
DTEND;TZID=US/Central:20140702T183000
SUMMARY:Meet with Jane\, bring cake
ORGANIZER;CN=Doe\, Jane:mailto:jane@doe.com
LOCATION:Somewhere
ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=Johnny Boy:MAILTO:johnny@numberfive.com
END:VEVENT
END:VCALENDAR
```

## Calendar-API

### Properties

* **method** (String) _The calendar method. For example, publish, request, reply, add, cancel, refresh, counter, and decline-counter_
* **id** (String) _The identifier of the product, that created this calendar. Defaults to "-//iCalEvent.js v0.3//EN"._
* **name** (String) _A name, that describes the events in this calendar in short._
* **description** (String) _A full description of the kind of events in this calendar._

### Methods

#### iCalendar(calendar, events)

The constructor for a new iCalendar. Initializes the calendar properties with the values provided by the `calendar` hash and adds all events from the `events` array to the calendar.

#### .addEvent(event)

Creates a new event in this calendar and initializes it with the values provided by the `event` hash. Returns the newly created iCalEvent object. (see [Event-API](#event-api))

``` js
event = calendar.addEvent({
	status: 'confirmed',
	attendees: [
		{
			name: 'Johnny Boy',
			email: 'johnny@numberfivevent.com'
		}
	],
	start: '2014-07-02T10:00:00-05:00',
	end: '2014-07-02T11:30:00-05:00',
	timezone: 'US/Central',
	summary: 'Meet with Jane, bring cake',
	location: 'Somwhere',
	organizer: {
		name: 'Doe, Jane',
		email: 'jane@doevent.com'
	}
});
```

#### .set(property, value)
``` js
calendar.set('method', 'publish');
```

#### .get(property)
``` js
calendar.get('method');
```

Returns:

```
publish
```

#### .toFile()
``` js
calendar.toFile();
```

Returns:

```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//iCalEvent.js v0.3//EN
METHOD:REQUEST
NAME:Personal calendar
X-WR-CALNAME:Personal calendar
DESCRIPTION:Personal calendar of Johnny Boy
X-WR-CALDESC:Personal calendar of Johnny Boy
BEGIN:VEVENT
UID:9873647
DTSTAMP:20140729T115736
STATUS:CONFIRMED
DTSTART;TZID=US/Central:20140701T090000
DTEND;TZID=US/Central:20140701T093000
SUMMARY:Priestly Duties
DESCRIPTION:Home flu visit.
ORGANIZER;CN=Libre\, Nacho:mailto:luchador@monastery.org
LOCATION:Casa
URL;VALUE=URI:http://google.com/search?q=nacho+libre
ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=Johnny Boy:MAILTO:johnny@numberfive.com
ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=Homer Simpson:MAILTO:homer@powerplant.com
END:VEVENT
BEGIN:VEVENT
UID:104a0a1f-2b0b-4fcb-9a36-83d868e67a08
DTSTAMP:20140729T115736
STATUS:CONFIRMED
DTSTART;TZID=US/Central:20140702T170000
DTEND;TZID=US/Central:20140702T183000
SUMMARY:Meet with Jane\, bring cake
ORGANIZER;CN=Doe\, Jane:mailto:jane@doe.com
LOCATION:Somewhere
ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=Johnny Boy:MAILTO:johnny@numberfive.com
END:VEVENT
END:VCALENDAR
```

## Event-API

### Properties

#### Required

* **start** (Date Object) _The start date object of the event_
* **end** (Date Object) _The end date object of the event_

#### Optional

* **uid** (String or Integer) _The event uid. If you don't set the uid it will be set for you._
* **status** (String) _The event status. For example, cancelled, confirmed, tentative_
* **timezone** (String) _The event's timezone in [ICS timezone format](https://github.com/shanebo/tzone/blob/master/lib/tzonevent.js). If you don't set the timezone it will be set for you._
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
		email: 'johnny@numberfivevent.com'
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
event.set('url', 'http://googlevent.com/search?q=nacho+libre');
```

#### .get(property)
``` js
event.get('url');
```

Returns:

```
http://googlevent.com/search?q=nacho+libre
```

#### .toFile()
``` js
event.toFile();
```

Returns:

```
BEGIN:VEVENT
UID:9873647
DTSTAMP:20140729T115736
STATUS:CONFIRMED
DTSTART;TZID=US/Central:20140701T090000
DTEND;TZID=US/Central:20140701T093000
SUMMARY:Priestly Duties
DESCRIPTION:Home flu visit.
ORGANIZER;CN=Libre\, Nacho:mailto:luchador@monastery.org
LOCATION:Casa
URL;VALUE=URI:http://google.com/search?q=nacho+libre
ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=Johnny Boy:MAILTO:johnny@numberfive.com
ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=Homer Simpson:MAILTO:homer@powerplant.com
END:VEVENT
```


## License

MIT

## Todos

* tests