var express = require('express');
var mongoose = require('mongoose');
var sentiment = require('./server/api/router');
var config = require('./server/config/environment/production');
var path = require('path');
var bodyParser = require('body-parser'); 
var Q = require('q'); 
var Instagram = require("./server/api/instagram/instagramModel");
var instagramRouter = require("./server/api/instagram");
var sentimentRouter = require("./server/api/sentiment");

var app = express();

mongoose.connect(config.mongo.uri, config.mongo.options);

if (config.seedDB) { require('./config/seed'); }

app.use(bodyParser.urlencoded({ extended: false }))

var jsonParser = bodyParser.json()


app.use('/api/instagram', instagramRouter));
app.use('/api/sentiment', sentimentRouter));
app.use(express.static(path.join(__dirname, '/client')));



app.listen(config.port);

exports = module.exports = app; //is this needed?


/**
 * Main application routes - formerly housed somewhere else
 *

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {
  // Insert routes here, guys!
  app.use('/api/instagram', require('./server/api/instagram'));
  app.use('/api/user', require('/server/api/user')); 

};


ERROR HANDLING - copy pasted from elsewhere


'use strict';

module.exports[404] = function pageNotFound(req, res) {
  var viewFilePath = '404';
  var statusCode = 404;
  var result = {
    status: statusCode
  };

  res.status(result.status);
  res.render(viewFilePath, function (err) {
    if (err) { return res.json(result, result.status); }

    res.render(viewFilePath);
  });
};


*/


