var express = require('express');
var mongoose = require('mongoose');
var sentiment = require('./api/router');
var config = require('./config/environment/development');
var path = require('path');

var app = express();

mongoose.connect(config.mongo.uri, config.mongo.options);

if (config.seedDB) { require('./config/seed'); }

require('./routes')(app);

app.use(express.static(path.join(__dirname, '/../client')));

// sentiment.getSentiment("I HATE YOU");

//require models

app.listen(3000);


exports = module.exports = app;