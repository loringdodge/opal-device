var Instagram = require("./instagramModel");
var bodyParser = require('body-parser')
var Q = require('q');

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
    console.log('in find all');
    Instagram.find(function(err, instagrams) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(instagrams);

      // return res.json(200, instagrams);
    });
  },
  //Add new instagram to DB
  // createInstagram: function(req, res) {
  //   var jsonParser = bodyParser.json(); 

  //   if (!req.body) return res.sendStatus(400)
  // // create user in req.body
  //   console.log('---------here');
  //   console.log("request", req.body);

  //   var createObj = Q.nbind(Instagram.create, Instagram);
  //   var theObj = createObj(req.body);
  //   console.log(JSON.stringify(theObj));
  //   if (theObj) {
  //     console.log('testing');
  //         res.json(theObj);
  //   }
  //   //need to parse the body
  //   Instagram.create(res.json(createObj(req.body)), function (err, instagram) {
  //     if (err) return handleError(res, err);
  //     console.log("SUCCESS");
  //     //can't set these headers 
  //     // return res.status(201).json(theObj)
  //     // return res.json(201, instagram);
  //   }); 
  // }, 
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
