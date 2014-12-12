var mongoose = require('mongoose');
var config = require('./config/environment/production');

mongoose.connect(config.mongo.uri, config.mongo.options);

var Schema = mongoose.Schema;

var Cities = new Schema({
	placeId : String,
	city : String,
	latitude : String,
	longitude : String,
	total_positives : Number,
  total_negatives : Number,
	total_neutrals : Number,
	total_searched : Number,
  photo_urls : Array,
  common_words : Array,
  timestamp : Date
});

mongoose.model('Cities', Cities);
