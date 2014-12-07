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
