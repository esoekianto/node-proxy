var url      = require('url');
var fs       = require('fs');
var zlib     = require('zlib');
var app_http = require('./app_http');

var html, ghtml, etag;


exports.init = function() {
    
};

function getConfig(){
  fs.readFile('config.json', 'utf8', function(err, file){
    if (err) throw err;
    var config = JSON.parse(file);
    console.log("got config success");
    return config; 
  }); 
}

function validateUri(uri){
  return true; 
}

function validateReferer(referer, allowedReferers){
  if (allowedReferers === "*") return true;
  foreach(allowedReferers: allowed){
    if (referer === allowed) return true;
  }
  return false;
}

exports.handle = function(req, res) {
  var uri = url.parse(req.url).query;
  console.log("req proxy uri query = " + uri);
  if (validateUri(uri))
  {
    console.log("uri is valid, continue..");
    getConfig();

  }else{
    console.log("url is not valid");
  }



  //if (req.headers['if-none-match'] === etag) {
  app_http.replyNotModified(res, config);
  //}
  //if (req.headers['accept-encoding'] !== undefined && 
  //    req.headers['accept-encoding'].indexOf('gzip') !== -1) {
  //  return app_http.replyCached(res, ghtml, 'text/html', etag, 'gzip');
  //} 
  //app_http.replyCached(res, html, 'text/html', etag); 
};