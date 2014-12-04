var express = require('express');  
var sentiment = require('./api/router')
var app = express(); 

sentiment.getSentiment("i like turtles!"); 

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000); 