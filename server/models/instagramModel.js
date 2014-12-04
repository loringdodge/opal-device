var mongoose = require('mongoose');

var InstagramSchema = new mongoose.Schema({
  //username
  username: String,
  //location
  longitude: Number,
  latitude: Number,
  //text
  text: String,
  //sentiment
  sentiment: String,
  //date
  createdAt: Date,
  //image
  image: String
});

mongoose.model('Instagram', InstagramSchema);
