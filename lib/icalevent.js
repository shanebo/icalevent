var tzone = require('tzone');


var iCalEvent = function(event){
	this.version = '2.0';
	this.id = '-//shanebo//iCalEvent.js v0.2//EN';
	this.uid = this.uuid();
	this.event = {};
	if (event) this.create(event);
}

iCalEvent.prototype = {

	create: function(event){
		for (var key in event) {
			if (event.hasOwnProperty(key)) this.set(key, event[key]);
		}
	},

	uuid: function(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	},

	format: function(datetime){
		function pad(n){
			n = parseInt(n);
			return n < 10 ? '0' + n : '' + n;
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

	organizer: function(obj){
		this.event.organizer = obj;
	},

	start: function(datetime){
		var d = new Date(datetime);
		d.setUTCMinutes(d.getUTCMinutes() - this.event.offset);
		this.event.location = tzone.getLocation(d);
		this.event.starts = this.format(datetime);
	},

	end: function(datetime){
		this.event.ends = this.format(datetime);
	},

	summary: function(summary){
		this.event.summary = summary;
	},
	
	description: function(description){
		this.event.description = description;
	},

	toFile: function(){
		var result = '';
		result += 'BEGIN:VCALENDAR\n';
		result += 'METHOD:REQUEST\n';
		result += 'BEGIN:VEVENT\n';
		result += 'UID:' + this.uid + '\n';
		result += 'DTSTAMP:' + this.format(new Date()) + '\n';
		
		if (this.event.organizer) 	result += 'ORGANIZER;CN="' + this.event.organizer.name + '":mailto:' + this.event.organizer.email + '\n';
		if (this.event.starts) 		result += 'DTSTART:' + this.event.starts + '\n';
		if (this.event.ends) 		result += 'DTEND:' + this.event.ends + '\n';
		if (this.event.url) 		result += 'URL;VALUE=URI:' + this.event.url + '\n';
		if (this.event.summary) 	result += 'SUMMARY:' + this.event.summary + '\n';
		if (this.event.description) 	result += 'DESCRIPTION:' + this.event.description + '\n';

		result += 'END:VEVENT\n';
		result += 'END:VCALENDAR\n';
		
		return result;
	}

}


module.exports = iCalEvent;
