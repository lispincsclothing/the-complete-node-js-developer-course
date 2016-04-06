var request = require('request');

// function doWork(data, callback) {
//     callback('done');
// }
//
// function doWorkPromise(data) {
//     return new Promise(function(resolve, reject) {
//         reject('everything broken!');
//         // reject({
//         //   error: 'something bad happened'
//         // });
//     });
// }
//
// doWorkPromise('some data').then(function(data) {
//     console.log(data);
// }, function(error) {
//     console.log(error);
// });

function getWeather(location) {
    return new Promise(function(resolve, reject) {
        var encodedLocation = encodeURIComponent(location);

        var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + encodedLocation + '&units=imperial&appid=PUT_APPID_HERE'

        if (!location) {
            return reject('No location provided');
        }

        request({
            url: url,
            json: true
        }, function(error, response, body) {
            if (error) {
                reject('Unable to fetch weather');
            } else {
                resolve('It\'s ' + body.main.temp + ' in ' + body.name);
            }
        });
    });
}

getWeather('stockholm').then(function(currentWeather) {
    console.log(currentWeather)
}, function(error) {
    console.log(error);
})
