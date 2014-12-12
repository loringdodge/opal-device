var express = require('express');
var utils = require('./utils');
var mongoose = require('mongoose');
var Promise = require('bluebird');

var Cities = Promise.promisifyAll(mongoose.model("Cities"));
var InstagramRouter = express.Router();

//caution: this line clears out the entire DB!
//Cities.remove({},function(){});


//print out size and city list for current DB
Cities.count({}).exec()
  .then(function(count){
    console.log( "Entries in DB: ", count );
  })

Cities.find({}).exec()
  .then(function(cities){
    cities.forEach(function(city){
      console.log(city.name, ": ", city.photo_urls.length, " messages in db.");
    })
  })



//this route is for returning the top 30 cities
//TODO: refactor so it returns top 30, not just ALL cities in db.
InstagramRouter.get('/', function (req, res) {
  console.log("request received at api/instagram/")

  Cities.findAsync({})
    .then(function (cities) {
      if(!cities) throw new Error('City Not Found');
      return res.json(cities);
    }).catch(function (err) {
      console.log("Error: " + err);
      res.status(404).end()
    });
});



//id is a placename
//look up placename in db
//if placename not found in DB, return 404 or similiar
//which will cause client to send a post request with city name, latlong, id, etc.
//server will then fetch instagram data and store it all in db
//return db's info about this city
InstagramRouter.get('/:id', function (req, res) {
  console.log("get request received at api/instagram/:id")
  Cities.findAsync({
      placeId: req.params.id
    })
    .then(function (city) {
      if(!city || (Array.isArray(city) && city.length===0)) {
        throw new Error('City Not Found');
      }
      return res.json(city);
    })
    .catch(function (err) {
      console.log("Error: " + err);
      res.status(404).end();
    });
});



InstagramRouter.post('/:id', function (req, res) {
  console.log("post request received at api/instagram/:id");

  var city = {
    placeId: req.body.placeId || req.param('placeId'),
    lng: req.body.lng,
    lat: req.body.lat,
    name: req.body.name
  }

  utils.getInstagrams(city,100,res);

});

  // })
  // .catch(function (err) {
  //   console.log("Error: " + err);
  //   // return utils.send404(res);
  // });


// EXAMPLE CODE for pagination / looping requests.
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

module.exports = InstagramRouter;
