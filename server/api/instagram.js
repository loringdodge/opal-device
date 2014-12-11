var express = require('express');
var utils = require('./utils');
var mongoose = require('mongoose');
var sentiment = require('./sentiment');
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var Cities = Promise.promisifyAll(mongoose.model("Cities"));

var InstagramRouter = express.Router();


//this route is for returning the top 30 cities
InstagramRouter.get('/', function(req, res){
  Cities.findAsync({})
    .then(function (cities) {
      if(!cities) throw new Error('City Not Found');
      return res.json(cities);
    }).catch(function (err) {
      console.log("Error: " + err);
      return utils.send404(res);
    });
});

//id is a placename
//look up placename in db
//if placename not found in DB, return 404 or similiar
  //which will cause client to send a post request with city name, latlong, id, etc.
  //server will then fetch instagram data and store it all in db
//return db's info about this city

InstagramRouter.get('/:id', function(req, res){
  Cities.findAsync({placeId: req.params.id})
    .then(function (city) {
      if(!city) throw new Error('City Not Found');
      return res.json(city);
    }).catch(function (err) {
      console.log("Error: " + err);
      return utils.send404(res);
    });
});

// {place:Id,
  //   lat:
  //   long:
  //   name: 
  // }



InstagramRouter.post('/:id', function(req, res){

  var placeId = req.body.placeId;
  var lng = req.body.lng;
  var lat = req.body.lat;
  var name = req.body.name;

  // make a request to instagram api
  var clientId = '0818d423f4be4da084f5e4b446457044';
  var apiUrl = 'https://api.instagram.com/v1/media/search?lat=' + lat;
      apiUrl += '&lng=' + lng + '&client_id=' + clientId + '&count=20';
  requestAsync(apiUrl)
    .then(function (res, body) {
      if(res.statusCode == 400) throw new Error('400 error on request');
      console.log(body);
    })
    .catch(function (err) {
      console.log("Error: " + err);
      return utils.send404(res);
    });
});

module.exports = InstagramRouter;




    //   var sentiments = body.map(body, function(photo){
    //     var caption = photo.get('caption');
    //     return sentiment(caption);
    //   });
    //   return requestAsync('http://google.com');
    // })
    // .then(function () {
    //   return requestAsync('http://twitter.com');
    // })
    // .then(function () {
      
    // })
