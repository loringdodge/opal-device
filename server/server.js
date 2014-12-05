var express = require('express');
var mongoose = require('mongoose');
var sentiment = require('./api/router');
var app = express();
var config = require('./config/environment/development');

mongoose.connect(config.mongo.uri, config.mongo.options);

if (config.seedDB) { require('./config/seed'); }

require('./api/instagram/instagramModel.js');

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.route('/')
  .get(function(req, res) {
    res.sendFile("../client/index.html");
  });

  sentiment.getSentiment("I love turtles!");

//require models

app.listen(3000);
