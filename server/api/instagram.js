/*jshint node:true */
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
  .then(function (count) {
    console.log("Entries in DB: ", count);
  });

Cities.find({}).exec()
  .then(function (cities) {
    cities.forEach(function (city) {
      console.log(city.name, ": ", city.total_searched, " messages in db.");
    });
  });


//this route is for returning the top 30 cities
//TODO: refactor so it returns top 30, not just ALL cities in db.
InstagramRouter.get('/', function (req, res) {
  console.log("request received at api/instagram/");

  Cities.findAsync({})
    .then(function (cities) {
      if (!cities) throw new Error('City Not Found');
      return res.json(cities);
    }).catch(function (err) {
      console.log("Error: " + err);
      res.status(404).end();
    });
});



InstagramRouter.get('/:id', function (req, res) {
  console.log("get request received at api/instagram/:id");
  Cities.findAsync({
      placeId: req.params.id
    })
    .then(function (city) {
      if (!city || (Array.isArray(city) && city.length === 0)) {
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
    city: req.body.city
  };
  utils.getInstagrams(city, 100, res);
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
var citiesJSON = {
  "cities": [{
    "lat": 40.712783700000003,
    "lon": -74.005941300000018,
    "id": "ChIJOwg_06VPwokRYv534QaPC8g",
    "name": "New York, NY, USA"
  }, {
    "lat": 34.052234200000001,
    "lon": -118.24368490000001,
    "id": "ChIJE9on3F3HwoAR9AhGJW_fL-I",
    "name": "Los Angeles, CA, USA"
  }, {
    "lat": 41.878113599999999,
    "lon": -87.629798199999982,
    "id": "ChIJ7cv00DwsDogRAMDACa2m4K8",
    "name": "Chicago, IL, USA"
  }, {
    "lat": 29.7604267,
    "lon": -95.369802800000002,
    "id": "ChIJAYWNSLS4QIYROwVl894CDco",
    "name": "Houston, TX, USA"
  }, {
    "lat": 39.9525839,
    "lon": -75.16522150000003,
    "id": "ChIJ60u11Ni3xokRwVg-jNgU9Yk",
    "name": "Philadelphia, PA, USA"
  }, {
    "lat": 33.448377100000002,
    "lon": -112.07403729999999,
    "id": "ChIJy3mhUO0SK4cRrBtKNfjHaYw",
    "name": "Phoenix, AZ, USA"
  }, {
    "lat": 29.424121899999999,
    "lon": -98.493628199999989,
    "id": "ChIJrw7QBK9YXIYRvBagEDvhVgg",
    "name": "San Antonio, TX, USA"
  }, {
    "lat": 32.715738000000002,
    "lon": -117.16108380000003,
    "id": "ChIJSx6SrQ9T2YARed8V_f0hOg0",
    "name": "San Diego, CA, USA"
  }, {
    "lon": -96.800978100000009,
    "id": "ChIJS5dFe_cZTIYRj2dH9qSb7Lk",
    "lat": 32.780261799999998,
    "name": "Dallas,TX,USA"
  }, {
    "lon": -121.89070379999998,
    "name": "San Jose,CA,USA",
    "lat": 37.333595699999996,
    "id": "ChIJ9T_5iuTKj4ARe3GfygqMnbk"
  }, {
    "lon": -97.743060799999967,
    "name": "Austin,TX,USA",
    "lat": 30.267153,
    "id": "ChIJLwPMoJm1RIYRetVp1EtGm10"
  }, {
    "lon": -86.158068000000014,
    "name": "Indianapolis,IN,USA",
    "lat": 39.768402999999999,
    "id": "ChIJA2p5p_9Qa4gRfOq5QPadjtY"
  }, {
    "lon": -81.655650999999978,
    "name": "Jacksonville,FL,USA",
    "lat": 30.332183799999999,
    "id": "ChIJ66_O8Ra35YgR4sf8ljh9zcQ"
  }, {
    "lon": -122.41941550000001,
    "name": "San Francisco,CA,USA",
    "lat": 37.774929499999999,
    "id": "ChIJIQBpAG2ahYAR_6128GcTUEo"
  }, {
    "lon": -82.99879420000002,
    "name": "Columbus,OH,USA",
    "lat": 39.961175500000003,
    "id": "ChIJcd6QucGJOIgRM7Wxz_hmMuQ"
  }, {
    "lon": -80.843126699999971,
    "name": "Charlotte,NC,USA",
    "lat": 35.227086900000003,
    "id": "ChIJgRo4_MQfVIgRZNFDv-ZQRog"
  }, {
    "lon": -97.330765799999995,
    "name": "Fort Worth,TX,USA",
    "lat": 32.755488300000003,
    "id": "ChIJrQfILRJuToYRvaxp3fiLr6Q"
  }, {
    "lon": -83.0457538,
    "name": "Detroit,MI,USA",
    "lat": 42.331426999999998,
    "id": "ChIJdR3LEAHKJIgR0sS5NU6Gdlc"
  }, {
    "lon": -106.44245590000003,
    "name": "El Paso,TX,USA",
    "lat": 31.7775757,
    "id": "ChIJaTv-xYs_54YRIgKdq-OEkeM"
  }, {
    "lon": -90.048980099999994,
    "name": "Memphis,TN,USA",
    "lat": 35.149534299999999,
    "id": "ChIJRZdD6h5-1YcR_rYaYBXzk9E"
  }, {
    "lon": -122.3320708,
    "name": "Seattle,WA,USA",
    "lat": 47.606209499999999,
    "id": "ChIJVTPokywQkFQRmtVEaUZlJRA"
  }, {
    "lon": -94.591584099999977,
    "name": "Devers,TX,USA",
    "lat": 30.0274371,
    "id": "ChIJf3IkFlwyP4YREwKBdv391Bs"
  }, {
    "lon": -77.036870700000009,
    "name": "Washington,DC,USA",
    "lat": 38.907192299999998,
    "id": "ChIJW-T2Wt7Gt4kRKl2I1CJFUsI"
  }, {
    "lon": -71.060096999999985,
    "name": "Boston,MA,USA",
    "lat": 42.358486499999998,
    "id": "ChIJGzE9DS1l44kRoOhiASS_fHg"
  }, {
    "lon": -86.781601599999988,
    "name": "Nashville,TN,USA",
    "lat": 36.162663799999997,
    "id": "ChIJPZDrEzLsZIgRoNrpodC5P30"
  }, {
    "lon": -76.612189300000011,
    "name": "Baltimore,MD,USA",
    "lat": 39.290384799999998,
    "id": "ChIJt4P01q4DyIkRWOcjQqiWSAQ"
  }, {
    "lon": -97.516427599999986,
    "name": "Oklahoma City,OK,USA",
    "lat": 35.467560200000001,
    "id": "ChIJgdL4flSKrYcRnTpP0XQSojM"
  }, {
    "lon": -85.758455700000013,
    "name": "Louisville,KY,USA",
    "lat": 38.252664699999997,
    "id": "ChIJEdVbsxoLaYgRMv1xICi009Q"
  }, {
    "lon": -122.67648159999999,
    "name": "Portland,OR,USA",
    "lat": 45.523062199999998,
    "id": "ChIJJ3SpfQsLlVQRkYXR9ua5Nhw"
  }, {
    "lon": -115.13982959999998,
    "name": "Las Vegas,NV,USA",
    "lat": 36.169941199999997,
    "id": "ChIJ0X31pIK3voARo3mz1ebVzDo"
  }]
};

module.exports = InstagramRouter;