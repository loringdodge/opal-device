var mongoose = require('mongoose');
var Instagram = mongoose.model('Instagram');
var instagramController = require('./InstagramController.js');


router.get('/instagramModel', function(req, res, next) {
  Instagram.find(function(err, instagrams) {
    if(err) return next(err);

    res.json(instagrams);
  });
});

router.post('/instagramModel', function(req, res, next){
  var instagram = new Instagram(req.body);

  instagram.save(function(err, instagram) {
    if (err) return next(err);

    res.json(instagram);
  });
});
