var iCalEvent = function(){
	this.version = '2.0';
	this.id = '-//shanebo//iCalEvent.js v0.2//EN';
	this.event = {};
}

iCalEvent.prototype = {

	uuid: function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	},

	format: function(datetime){
		var d = new Date(datetime);

		function pad(n){
			return n < 10 ? '0' + n : n
		}

		return d.getUTCFullYear()
			+ pad(d.getUTCMonth() + 1)
			+ pad(d.getUTCDate()) + 'T'
			+ pad(d.getUTCHours())
			+ pad(d.getUTCMinutes())
			+ pad(d.getUTCSeconds()) + 'Z';
	},

	set: function(key, value){
		if (this[key]) this[key](value)
		else this.event[key] = value;
	},

	organizer: function(obj){
		this.event.organizer = obj;
	},

	start: function(datetime){
		this.event.starts = this.format(datetime);
	},

	end: function(datetime){
		this.event.ends = this.format(datetime);
	},

	summary: function(summary){
		this.event.summary = summary;
	},

	toFile: function(){
		var result = ''
		result += 'BEGIN:VCALENDAR\r\n';
		result += 'VERSION:' + this.version + '\r\n';
		result += 'PRODID:' + this.id + '\r\n';
		result += 'CALSCALE:GREGORIAN\r\n';

		result += 'BEGIN:VEVENT\r\n';
//		result += 'UID:' + '\r\n';
		result += 'UID:iCalEvent ' + this.uuid() + '\r\n';
		result += 'DTSTAMP:' + this.format(new Date()) + '\r\n';
		
		if (this.event.organizer) 	result += 'ORGANIZER;CN="' + this.event.organizer.name + '":mailto:' + this.event.organizer.email + '\r\n';
		if (this.event.starts) 		result += 'DTSTART;TZID=America/New_York:' + this.event.starts + '\r\n';
		if (this.event.ends) 		result += 'DTEND;TZID=America/New_York:' + this.event.ends + '\r\n';
		if (this.event.url) 		result += 'URL;VALUE=URI:' + this.event.url + '\r\n';
		if (this.event.summary) 	result += 'SUMMARY:' + this.event.summary + '\r\n';
		
		result += 'END:VEVENT\r\n';
		result += 'END:VCALENDAR\r\n';
		
		return result;
	}
	
}


module.exports = iCalEvent;