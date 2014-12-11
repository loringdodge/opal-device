var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment/production');
var path = require('path');
var bodyParser = require('body-parser'); 
var Q = require('q'); 
var instagramRouter = require("./api/instagram");
var jsonParser = bodyParser.json();
var crontab = require('node-crontab');

mongoose.connect(config.mongo.uri, config.mongo.options);

if (config.seedDB){
 require('./config/seed'); 
}

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))    //QUESTION: is this in the right place?
   .use('/api/instagram', instagramRouter)  
   .use(express.static(path.resolve(__dirname + '/../client/')))
   .use('*', function (req, res) {
     res.status(404).end();
   })
   .listen(config.port);
console.log("server listening on port " + config.port);


var placeholderCronJob = crontab.scheduleJob("0 0 * * *", function(){
   console.log("It's midnight!")
});



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


