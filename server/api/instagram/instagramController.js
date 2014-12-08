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
