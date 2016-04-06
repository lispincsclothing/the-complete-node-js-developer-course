var express = require('express');
var app = express();
const PORT = 3000;

var middleware = {
  requireAuthentication: function (req, res, next) {
    console.log('Private route hit');
    next();
  },
  logger: function (req, res, next) {
    date = new Date().toString()
    console.log('Request: ' + req.method + ' ' + req.originalUrl + ' ' + date);
    next();
  }
};

// app.use(middleware.requireAuthentication);
app.use(middleware.logger);

app.get('/about', middleware.requireAuthentication, function (req, res) {
  res.send('about us');
});

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function () {
  console.log('Server started at port ' + PORT + '!');
});
