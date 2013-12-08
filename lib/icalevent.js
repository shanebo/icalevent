var tzone = require('tzone');


var iCalEvent = function(event){
	this.id = '-//iCalEvent.js v0.3//EN';
	this.uid = this.uid();
	this.event = {};
	if (event) this.create(event);
}

iCalEvent.prototype = {

	create: function(event){
		for (var key in event) {
			if (event.hasOwnProperty(key)) this.set(key, event[key]);
		}
	},

	uid: function(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	},

	format: function(datetime){
		function pad(n){
			return (n < 10 ? '0' : '') + n;
		}

		var d = new Date(datetime);
		d.setUTCMinutes(d.getUTCMinutes() - this.event.offset);

		padded = (d.getUTCFullYear()
			+ pad(d.getUTCMonth() + 1)
			+ pad(d.getUTCDate()) + 'T'
			+ pad(d.getUTCHours())
			+ pad(d.getUTCMinutes())
			+ pad(d.getUTCSeconds()));

		return padded;
	},

	get: function(key){
		if (this.event[key]) return this.event[key];
	},

	set: function(key, value){
		if (this[key]) this[key](value)
		else this.event[key] = value;
	},

	start: function(datetime){
		var d = new Date(datetime);
		d.setUTCMinutes(d.getUTCMinutes() - this.event.offset);
		this.event.timezone = tzone.getLocation(d);
		this.event.start = this.format(datetime);
	},

	end: function(datetime){
		this.event.end = this.format(datetime);
	},

	toFile: function(){
		var result = '';

		result += 'BEGIN:VCALENDAR\r\n';
		result += 'VERSION:2.0\r\n';
		result += 'PRODID:' + this.id + '\r\n';
		result += 'BEGIN:VEVENT\r\n';
		result += 'UID:' + this.uid + '\r\n';
		result += 'DTSTAMP:' + this.format(new Date()) + '\r\n';

		if (this.event.start)			result += 'DTSTART;TZID=' + this.event.timezone + ':' + this.event.start + '\r\n';
		if (this.event.end)				result += 'DTEND;TZID=' + this.event.timezone + ':' + this.event.end + '\r\n';
		if (this.event.summary)			result += 'SUMMARY:' + this.event.summary + '\r\n';
		if (this.event.description)		result += 'DESCRIPTION:' + this.event.description + '\r\n';
		if (this.event.organizer)		result += 'ORGANIZER;CN=' + this.event.organizer.name + ':mailto:' + this.event.organizer.email + '\r\n';
		if (this.event.location)		result += 'LOCATION:' + this.event.location + '\r\n';
		if (this.event.url)				result += 'URL;VALUE=URI:' + this.event.url + '\r\n';

		result += 'END:VEVENT\r\n';
		result += 'END:VCALENDAR\r\n';

		return result;
	}

}


module.exports = iCalEvent;