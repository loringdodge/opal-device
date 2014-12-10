var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Cities = new Schema({
	id : String,
	city : String,
	latitude : String,
	longitude : String,
	total_positives : Number,
	total_negatives : Number,
	total_searched : Number,
  photo_urls : Array,
  common_words : Array,
  timestamp : Date
});

mongoose.model({"Cities", Cities});