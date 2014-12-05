var express = require('express');
var mongoose = require('mongoose');
var sentiment = require('./api/router');
var config = require('./config/environment/development');

var app = express();

mongoose.connect(config.mongo.uri, config.mongo.options);

if (config.seedDB) { require('./config/seed'); }

//require('./api/instagram/instagramModel.js');


app.get('/', function (req, res) {
  res.send('Hello World');
});

require('./routes')(app);


sentiment.getSentiment("I love turtles!");

//require models

app.listen(3000);


exports = module.exports = app;