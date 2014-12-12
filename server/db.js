var mongoose = require('mongoose');
var config = require('./config/environment/production');

mongoose.connect(config.mongo.uri, config.mongo.options);

var Schema = mongoose.Schema;

var Cities = new Schema({
  name : String,
  lat : String,
  lng : String,
  placeId : String,
  total_positives : Number,
  total_negatives : Number,
  total_neutrals  : Number,
  total_searched : Number,
  percent_positive: Number,
  percent_negative: Number,
  photo_urls : Array
});

mongoose.model('Cities', Cities);
