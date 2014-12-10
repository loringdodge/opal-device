var express = require('express');
var utils = require('utils');
var mongoose = require('mongoose');
var sentiment = require('sentiment');
var Promise = require('bluebird');
var request = require('request');
var Cities = Promise.promisifyAll(mongoose.model("Cities"));

var InstagramRouter = express.Router();

InstagramRouter.get('/', function(req, res){
  Cities.findAsync({})
    .then(function (city) {
      if(!city) throw new Error('City Not Found');
      return res.json(city);
    }).catch(function (err) {
      console.log("Error: " + err);
      return utils.send404(res);
    });
});

InstagramRouter.get('/:id', function(req, res){
  // parse lat/long
  var latlng = req.params.id;
  var coor = latlong.split('&');
  var lat = coor[0];
  var lng = coor[1];

  // make a request to instagram api
  var clientId = '0818d423f4be4da084f5e4b446457044';
  var apiUrl = 'https://api.instagram.com/v1/media/search?lat=' + lat;
      apiUrl += '&lng=' + lng + '&client_id=' + clientId + '&count=20';
  request(apiUrl, function(err, res, body){
    if(err) {
      console.log("Error: " err);
    }
    if(res.statusCode == 400){
      return utils.send404(res);
    }
    body.forEach(body, function(photo){
      var caption = photo.get('caption');
      return sentiment.score(caption);
    });
    return res.json(body);
  })

});

module.exports = InstagramRouter;