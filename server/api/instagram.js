'use strict'; 

var express = require('express');
var instagramRouter = express.Router();

instagramRouter.get('/', function(req,res){
  //controller.findAll (OLD CODE)

  // serve up top 30 cities
} );


instagramRouter.get('/:placeId', function(req, res){
  //get instagrams by a specific placeId
  
  // controller.findInstagramByLocation
}); 



/* **************** instagramController.JS



var Instagram = require("./instagramModel");

module.exports = {
  //Grab single instagram
  findInstagram: function(req, res) {
    console.log('in findInstagram');
    Instagram.findById(req.params.id, function(err, instagram){
      if (err) return handleError(res, err);
      if (!instagram) return res.send(404);
      return res.json(instagram);
    });
  },
  //Grab all instagrams
  findAll: function(req, res) {
    console.log(req.body); 
    
    Instagram.find(function(err, instagrams) {
      console.log('in find alasdfs');
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(instagrams);
    });
  },
  findInstagramByLocation: function(req, res){
    console.log(req.params.latlng); 

    Instagram.find({location: 
      { $near: 
        { $geometry: 
          {type: "Point", coordinates: [-122.052116389, 37.404273872]}, $minDistance: 0, $maxDistance: 100}
        }
      }, function(err, instagrams){
        if(err){
          return err
        }
        return res.json(200,instagrams); 
      })
  }
}


****************** instagramModel

var mongoose = require("mongoose");

var InstagramSchema = new mongoose.Schema({
         "attribution": String,
         "tags":{ type : Array , "default" : [] },
         "type":String,
         "location":{ 'type': {type: String, enum: "Point", default: "Point"}, coordinates: { type: [Number], default: [0,0]} },
         "comments":Object,
         "filter":String,
         "created_time":String, //unix time stamp. have fun! stack overflow_id: 12612110. 
         "link":String,
         "likes":Object,
         "images":Object,
         "users_in_photo": { type: Array, "default": []}, 
         "caption":Object,
         "user_has_liked":Boolean,
         "id":String,
         "user":Object, 
         "sentiment": Object
        
});

InstagramSchema.index({location: '2dsphere'}); 

module.exports = mongoose.model("Instagram", InstagramSchema);


***************************** from server.js


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

*/

