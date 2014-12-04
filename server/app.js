var express = require('express');  
var sentiment = require('./api/router')
var app = express(); 

sentiment.getSentiment("i like turtles!"); 

  
	//all nondefined paths will go to index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile("/Users/Dphung/HackReactor/opalDevice/client/index.html");
    });

app.listen(3000); 