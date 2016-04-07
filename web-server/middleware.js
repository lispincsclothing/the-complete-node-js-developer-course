// use module exports for middleware

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

module.exports = middleware;
