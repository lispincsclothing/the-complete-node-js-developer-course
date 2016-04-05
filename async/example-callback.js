var request = require('request');
var url = "http://api.openweathermap.org/data/2.5/weather?zip=90210,us&units=imperial"

request({
  url: url,
  json: true
}, function (error, response, body) {
  if (error) {
    console.log('Unable to fetch weather');
  } else {
    console.log('It\'s ' + body.main.temp + ' in '+ body.name);
  }
});

console.log('After request');
