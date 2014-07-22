var tzone = require('tzone');
var moment = require('moment');

var iCalendar = function(calendar, events) {
	this.calendar = {}
	this.calendar.id = '-//iCalEvent.js v0.3//EN';
	this.events = [];
	if(calendar) {
		this.create(calendar);
	}
	if(events) {
		for(var i = 0; i < events.length; i++) {
			this.addEvent(events[i]);
		}
	}
}

iCalendar.prototype = {
	create: function(calendar){
		for (var key in calendar) {
			if (calendar.hasOwnProperty(key)) this.set(key, calendar[key]);
		}
	},

	get: function(key){
		if (this.calendar[key]) return this.calendar[key];
	},

	set: function(key, value){
		if (this[key]) this[key](value)
		else this.calendar[key] = value;
	},

	addEvent: function(event) {
		newEvent = new iCalEvent(event);
		this.events.push(newEvent);
		return newEvent;
	},

	toFile: function() {
		var result = '';

		result += 'BEGIN:VCALENDAR\r\n';
		result += 'VERSION:2.0\r\n';
		result += 'PRODID:' + this.calendar.id + '\r\n';
		if (this.calendar.method) result += 'METHOD:' + this.calendar.method.toUpperCase() + '\r\n';
		
		for(var i = 0; i < this.events.length; i++) {
			result += this.events[i].toFile();
		}
		
		result += 'END:VCALENDAR\r\n';

		return result;
	}
}

var iCalEvent = function(event){
	this.event = {};
	if (event) this.create(event);
	if (!this.event.uid) this.event.uid = this.createUID();
}

iCalEvent.prototype = {

	create: function(event){
		for (var key in event) {
			if (event.hasOwnProperty(key)) this.set(key, event[key]);
		}
	},

	createUID: function(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	},

	format: function(datetime){
		return moment(datetime).format('YYYYMMDD[T]HHmmss');
	},

	get: function(key){
		if (this.event[key]) return this.event[key];
	},

	set: function(key, value){
		if (this[key]) this[key](value)
		else this.event[key] = value;
	},

	start: function(datetime){
		if (!this.event.timezone) {
			this.event.timezone = tzone.getLocation(moment(datetime).toDate());
		}
		this.event.start = this.format(datetime);
	},

	end: function(datetime){
		this.event.end = this.format(datetime);
	},

	toFile: function(){
		var result = '';

		result += 'BEGIN:VEVENT\r\n';
		result += 'UID:' + this.event.uid + '\r\n';
		result += 'DTSTAMP:' + this.format(new Date()) + '\r\n';

		if (this.event.status)			result += 'STATUS:' + this.event.status.toUpperCase() + '\r\n';
		if (this.event.start)			result += 'DTSTART;TZID=' + this.event.timezone + ':' + this.event.start + '\r\n';
		if (this.event.end)				result += 'DTEND;TZID=' + this.event.timezone + ':' + this.event.end + '\r\n';
		if (this.event.summary)			result += 'SUMMARY:' + this.event.summary + '\r\n';
		if (this.event.description)		result += 'DESCRIPTION:' + this.event.description + '\r\n';
		if (this.event.organizer) {
			result += 'ORGANIZER'
			if (this.event.organizer.name) {
				result += ';CN="' + this.event.organizer.name; + '"';
			}
			result += ':'
			if (this.event.organizer.email) {
				result += 'mailto:' + this.event.organizer.email
			}
			result += '\r\n';
		}
		if (this.event.location)		result += 'LOCATION:' + this.event.location + '\r\n';
		if (this.event.url)				result += 'URL;VALUE=URI:' + this.event.url + '\r\n';
		if (this.event.attendees) {
			this.event.attendees.forEach(function(attendee){
				result += 'ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=' + attendee.name + ':MAILTO:' + attendee.email + '\r\n';
			});
		}

		result += 'END:VEVENT\r\n';

		return result;
	}

}


module.exports = iCalendar;