var app_http = require('./app_http');
var fs       = require('fs');

var html = new Buffer('<html>erwin here</html>', 'utf8');

exports.handle = function(req, res) {
  app_http.replyNotCached(res, html);
};