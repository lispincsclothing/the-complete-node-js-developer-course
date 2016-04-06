var request = require('request');
var url = 'http://ipinfo.io';

// module exports to create function
//     make request to url for json
//     if error callback()
//     else callback(body)

module.exports = function (callback) {
	request({
		url: url,
		json: true
	}, function (error, response, body) {
		if (error) {
			callback();
		} else {
			callback(body);
		}
	});
};