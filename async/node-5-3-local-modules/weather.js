var request = require('request');
var url = 'http://api.openweathermap.org/data/2.5/weather?q=Philadelphia&units=imperial';

module.exports = function (callback) {
	request({
		url: url,
		json: true
	}, function (error, response, body) {
		if (error) {
			callback('Unable to fetch weather.');
		} else {
			// console.log(JSON.stringify(body, null, 4));
			// It's 77.77 in Philadelphia!
			callback('It\'s ' + body.main.temp + ' in ' + body.name + '!');
		}
	});
}