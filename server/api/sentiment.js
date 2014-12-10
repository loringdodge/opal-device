//sentiment.js

'use strict'; 

var express = require('express');
var sentimentRouter = express.Router();
var sentiment = require('sentiment');

sentimentRouter.get('/', function(req,res){
  var messages = JSON.parse(req.query.messages);
  console.log("messages:",messages);
  var sentiments = messages.map(function(message){
    return sentiment(message);
  });
  console.log("sentiments:", sentiments)
  res.json(sentiments)
} );


module.exports = sentimentRouter;