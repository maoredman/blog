var express = require('express');
var app = express();
var util = require('util');
var path = require('path');
var fs = require('fs');
var request = require('request');
var api = require('./routes/api')

app.use(express.static(path.join(__dirname, '/build')));
app.use('/api', api);

app.get('/', function(req, res){
  res.render('index.html');
  // send GET request to db and put data into map
});

var server = app.listen(3006, function(){
  console.log('Server listening on port 3006');
});
