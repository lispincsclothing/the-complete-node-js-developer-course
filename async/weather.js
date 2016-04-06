var request = require('request');
var url = "http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=90210,us&appid=DELETED

module.exports = function (callback) {
  request({
    url: url,
    json: true
  }, function (error, response, body) {
    if (error) {
      callback('Unable to fetch weather');
    } else {
      callback('It\'s ' + body.main.temp + ' in '+ body.name);
    }
  });
}
