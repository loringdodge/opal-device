//sentiment.js

'use strict'; 

var express = require('express');
var sentimentRouter = express.Router();
var analyzeSentiment = require('sentiment');

sentimentRouter.get('/', function(req,res){
  var messages = JSON.parse(req.query.messages);
  
  // option A: return object, where keys are input strings and values are their sentiment score
  // var sentiments = {};
  // messages.forEach(function(message){
  //   sentiments[message] = analyzeSentiment(message).score;
  // });

  //option B: return array of tuples, where: [[inputString, sentimentScore], [inputString, sentimentScore], ...]
  // var sentiments = messages.map(function(message){
  //   return [message,analyzeSentiment(message).score];
  // })

  //option C: return array of objects, where [{string: inputString, score: sentimentScore}...]
  var sentiments = messages.map(function(message){
    return {
      message: message,
      score: analyzeSentiment(message).score
    };
  })

  res.json(sentiments)
} );


module.exports = sentimentRouter;