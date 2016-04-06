var express = require('express');
var app = express();
const PORT = 3000;

app.get('/about', function (req, res) {
  res.send('about us');
});

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function () {
  console.log('Server started at port ' + PORT + '!');
});
