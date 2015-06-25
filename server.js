/* eslint-disable no-var, strict */
'use strict';
var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var proxy = require('proxy-middleware');
var url = require('url');
var wss = expressWs.getWss('/');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

/*
  start my proxy
*/
app.use('/assets', proxy(url.parse('http://localhost:8081/assets')));
app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    var broadcastObj=JSON.parse(msg)
    //start from here
    broadcastObj.$type="broadcasted";
    //wss.broadcast( JSON.stringify(broadcastObj) );
    wss.clients.forEach(function (client) {
      console.log(broadcastObj);
      client.send(JSON.stringify(broadcastObj));
    });
  });
});
/*
  start webpack-dev-server
*/
var server = new WebpackDevServer(webpack(config), {
  contentBase : __dirname+ "/public",
  publicPath: config.output.publicPath,
  hot: true,
  quiet: false,
  noInfo: false
});

server.listen(8081, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
/*
start express
*/
app.use('/', express.static(__dirname + '/public'));
var wss = expressWs.getWss('/');
app.listen(3000);
