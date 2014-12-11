//sentiment.js

'use strict'; 

var express = require('express');
var sentimentRouter = express.Router();
var analyzeSentiment = require('sentiment');


//this route expects an array of strings, and returns an array with an object for 
//each input string.
// REQ: ["love","hate"]
// RES: [{"message": "love", "score": 3 }, {"message": "hate", "score": -3 }]

sentimentRouter.get('/', function(req,res){
  var messages = JSON.parse(req.query.messages);
  var sentiments = messages.map(function(message){
    return { message: message, score: analyzeSentiment(message).score };
  })
  res.json(sentiments);
} );


module.exports = sentimentRouter;




  // option B: return object, where keys are input strings and values are their sentiment score
  // var sentiments = {};
  // messages.forEach(function(message){
  //   sentiments[message] = analyzeSentiment(message).score;
  // });

  //option C: return array of tuples, where: [[inputString, sentimentScore], [inputString, sentimentScore], ...]
  // var sentiments = messages.map(function(message){
  //   return [message,analyzeSentiment(message).score];
  // })