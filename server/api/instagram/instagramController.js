var Instagram = require("./instagramModel");
// var Q = require('q');

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
    Instagram.find(function(err, instagrams) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, instagrams);
    });
  },
  //Add new instagram to DB
  createInstagram: function(req, res) {
    Instagram.create(req.body, function (err, instagram) {
      if (err) return handleError(res, err);
      return res.json(201, instagram);
    });
  }
};

function handleError(res, err) {
  return res.send (500, err);
}
