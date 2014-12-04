var express = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/omnitweet');

require('./models/instagramModel')

app.get('/', function (req, res) {
  res.send('Hello World');
});

//require models

app.listen(3000);
