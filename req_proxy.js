var url      = require('url');
var fs       = require('fs');
var zlib     = require('zlib');
var app_http = require('./app_http');

var html, ghtml, etag;
var config;

exports.init = function(cb) {
};

function getConfig(cb){
  fs.readFile('config.json', 'utf8', function(err, file){
    if (err) throw err;
    config = JSON.parse(file);
    cb(config); 
  }); 
}

exports.handle = function(req, res) {
  //var config= getConfig();
  var uri = req.url;
  console.log(uri);
  if (req.headers['if-none-match'] === etag) {
    return app_http.replyNotModified(res);
  }
  if (req.headers['accept-encoding'] !== undefined && 
      req.headers['accept-encoding'].indexOf('gzip') !== -1) {
    return app_http.replyCached(res, ghtml, 'text/html', etag, 'gzip');
  } 
  app_http.replyCached(res, html, 'text/html', etag); 
};