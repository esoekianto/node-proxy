var http         = require('http');
var url          = require('url');
var app_http     = require('./app_http');
var req_root     = require('./req_root');
var req_proxy    = require('./req_proxy');
var req_file     = require('./req_file');

var req_rootdir  = req_file.create('public_root', 1);

exports.init = function() {

};

function route(req, res) {
  var pathname = url.parse(req.url).pathname;
  console.log("route pathname = " + pathname);
  if      (pathname === '/')             req_root.handle(req, res)
  else if (pathname === '/proxy')        req_proxy.handle(req, res)
  else                                   req_rootdir.handle(req, res);        
}

function requestHandler(req, res) {
  // Make sure messages are sent over https when deployed through Heroku.
  // See https://devcenter.heroku.com/articles/http-routing
  //if (req.headers['x-forwarded-proto'] === 'https' ||    // common case
  //    req.headers['x-forwarded-proto'] === undefined) {  // local deployment
    route(req, res);
  //} else {
  //  res.writeHead(302, { 'Location': "https://" + req.headers.host + req.url });
  //  res.end();
  //}
}

exports.start = function() {
  http.createServer(requestHandler).listen(8123, function(err) {
    if (err) console.log(err);
    else console.log("listening on http://localhost:" + 8123);
  });
};