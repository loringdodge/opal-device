var mongoose = require("mongoose");

var InstagramSchema = new mongoose.Schema({
  "tags":{ any: {} },
  "type":String,
  "location": { any: {} },
  "filter":String,
  "created_time": String,
  "link": String ,
  "likes":{ any: {} },
  "images":{ any: {} },
  "users_in_photo":{ any: {} },
  "caption":{ any: {} },
  "user_has_liked": Boolean,
  "sentiment": {any: {}}
});

module.exports = mongoose.model("Instagram", InstagramSchema);
