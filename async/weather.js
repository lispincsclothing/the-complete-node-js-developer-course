var request = require('request');
var url = 'http://api.openweathermap.org/data/2.5/weather?zip=90210,us&units=imperial&appid=239fe7b91b52663184a96317f945d01e'

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
