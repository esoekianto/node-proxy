var url      = require('url');
var fs       = require('fs');
var zlib     = require('zlib');
var app_http = require('./app_http');

var html, ghtml, etag;

var refererNotValid = new Buffer('<html>Referer Not Valid</html>', 'utf8');
var uriIsNull = new Buffer('<html>Uri is null</html>', 'utf8');
var uriIsMisMatch = new Buffer('<html>Uri is mismatch</html>', 'utf8');
var ok = new Buffer('<html>Everything is AWESOME!!</html>', 'utf8');

exports.init = function() {
    
};

function getConfig(cb){
  fs.readFile('config.json', 'utf8', function(err, file){
    if (err) throw err;
    var config = JSON.parse(file);
    console.log("got config success");
    cb(config); 
  }); 
}

function cleanUri(uri){
  return true; 
}

function validateReferer(referer, allowedReferers){
  console.log("allowedReferers = " + allowedReferers);
  if (allowedReferers[0] === "*") return true;
  //TODO, implement checking referer
  //allowedReferers.foreach(function(allowed){
  //  if (referer === allowed) return true;
  //});
  return false;
}

function validateUri(uri, allowedUris, mustMatch){
  // allowedUris.forEach(function(allowed){
  //   if (url.parse(uri).host === url.parse(allowed).host) // check path later 
  //     return true
  // });
  if(allowedUris.some(function(value){
    return uri.indexOf(value) > -1;
  })){
    console.log('found one.');
    return true;
  }
  if (mustMatch) return false; else return true;
}

exports.handle = function(req, res) {
  var uri = url.parse(req.url).query;
  console.log("req proxy uri query = " + uri);
  if (cleanUri(uri))
  {
    console.log("uri is valid, continue..");
    getConfig(function(config){
      
      console.log("config allowedReferers= " + config.allowedReferers);
      if (!validateReferer(req.headers['referer'], config.allowedReferers)){
        console.log("refererNotValid");
        return app_http.replyNotCached(res, refererNotValid);
      } 

      console.log("config allowedReferers= " + config.allowedUris);
      if (!validateUri(uri, config.allowedUris, config.mustMatch)){
        console.log("uriIsMisMatch");
        return app_http.replyNotCached(res, uriIsMisMatch);
      }



      return app_http.replyNotCached(res, ok); 
    });
    

  }else{
    console.log("uriIsNull");
    return app_http.replyNotCached(res, uriIsNull);
  }



  //if (req.headers['if-none-match'] === etag) {
  //return app_http.replyNotCached(res, ok);
  //}
  //if (req.headers['accept-encoding'] !== undefined && 
  //    req.headers['accept-encoding'].indexOf('gzip') !== -1) {
  //  return app_http.replyCached(res, ghtml, 'text/html', etag, 'gzip');
  //} 
  //app_http.replyCached(res, html, 'text/html', etag); 
};