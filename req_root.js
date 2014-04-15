var app_http = require('./app_http');
var fs       = require('fs');

var html = new Buffer('<html>Welcome to node proxy. You are in root, please use servername/proxy?http://google.com</html>', 'utf8');

exports.handle = function(req, res) {	
  app_http.replyNotCached(res, html);
};