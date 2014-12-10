var express = require('express');
var mongoose = require('mongoose');
var sentiment = require('./server/api/router');
var config = require('./server/config/environment/production');
var path = require('path');
var bodyParser = require('body-parser'); 
var Q = require('q'); 
var Instagram = require("./server/api/instagram/instagramModel");
var newSentiment = require('sentiment');



var app = express();

mongoose.connect(config.mongo.uri, config.mongo.options);

if (config.seedDB) { require('./config/seed'); }

app.use(bodyParser.urlencoded({ extended: false }))

var jsonParser = bodyParser.json()

console.log(newSentiment("I love everyone"));
console.log(newSentiment("love love love amazing yes yes happy happy"));
console.log(newSentiment("meh"));
console.log(newSentiment("rocks trees elephant hippo"));
console.log(newSentiment(""));
console.log(newSentiment("crap stupid angry bad yuck poop stupid"));

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

//require('./server/routes')(app);

app.use('/api/instagram', require('./server/api/instagram'));
app.use('/api/user', require('./server/api/user')); 

app.use(express.static(path.join(__dirname, '/client')));

// sentiment.getSentiment("I HATE YOU");

//require models

app.listen(config.port);
console.log(config); 


exports = module.exports = app;