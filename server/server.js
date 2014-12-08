var express = require('express');
var mongoose = require('mongoose');
var sentiment = require('./api/router');
var config = require('./config/environment/development');
var path = require('path');
var bodyParser = require('body-parser'); 
var Q = require('q'); 
var Instagram = require("./api/instagram/instagramModel");

var app = express();

mongoose.connect(config.mongo.uri, config.mongo.options);

if (config.seedDB) { require('./config/seed'); }

app.use(bodyParser.urlencoded({ extended: false }))

var jsonParser = bodyParser.json()

app.post('/api/instagram', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  // create user in req.body
    console.log('---------here');
    console.log("request", req);
    console.log("res", res);

    var createObj = Q.nbind(Instagram.create, Instagram);
    var theObj = createObj(req.body);
    console.log(JSON.stringify(theObj));
    if (theObj) {
      console.log('testing');
          res.json(theObj);
    }
    //need to parse the body
    Instagram.create(res.json(createObj(req.body)), function (err, instagram) {
      if (err) return handleError(res, err);
      console.log("SUCCESS");
      //can't set these headers 
      // return res.status(201).json(theObj)
      // return res.json(201, instagram);
    });	
})

require('./routes')(app);

app.use(express.static(path.join(__dirname, '/../client')));

// sentiment.getSentiment("I HATE YOU");

//require models

app.listen(3000);


exports = module.exports = app;