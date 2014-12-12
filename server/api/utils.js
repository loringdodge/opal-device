var cities = require('../../cities.json');
var instagram = require('./instagram');
var sentiment = require('./sentiment');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var request = Promise.promisify(require('request'));
var Cities = Promise.promisifyAll(mongoose.model("Cities"));

var utils = {

	sendResponse: function (response, obj, status) {
		status = status || 200;
		response.writeHead(status, headers);
		response.end(obj);
	},

	collectData: function (request, callback) {
		var data = "";
		request.on("data", function (chunk) {
			data += chunk;
		});
		request.on("end", function () {
			callback(data);
		});
	},

	send404: function (response) {
		utils.sendResponse(response, '404: Page not found', 404);
	},

	sendRedirect: function (response, location, status) {
		status = status || 302;
		response.writeHead(status, {
			Location: location
		});
		response.end();
	},

	getTop30: function () {
		console.log("getting top 30!")
		var i = 0;

		var getNextCity = function () {
			var city = cities.cities[i++];
			console.log("sending req for " + city.city);
				utils.getInstagrams(city,1000);
				// utils.pullInstagramDataIntoDb(
				// 	city.placeId,
				// 	city.lng,
				// 	city.lat,
				// 	city.city);
			// if(i<cities.cities.length){
			// 	setTimeout(getNextCity,1000);
			// }
		}

		getNextCity();

	},


	pullInstagramDataIntoDb: function(placeId,lng,lat,name){
	 var clientId = '0818d423f4be4da084f5e4b446457044';
	  var apiUrl = 'https://api.instagram.com/v1/media/search?lat=' + lat;
	      apiUrl += '&lng=' + lng + '&client_id=' + clientId + '&count=20';
	  console.log(apiUrl);
	  request(apiUrl)
	    .then(function (res, body) {
	    	console.log("response recieved for " + name + " with status " + res.statusCode);
	      if(res.statusCode == 400) throw new Error('400 error on request');
	      var messages = JSON.parse(res[0].body).data;
	      
	     // console.log(messages);

	      var parsedMessages = messages.map(function(message){
	        var text = message.caption ? message.caption.text : "";
	        return {
	          text: text,
	          url: message.link,
	          sentiment: sentiment(text)
	        }
	      })
	     //console.log(parsedMessages);

	      // create new city record
	      var cityRecord = {
	        city: name,
	        lat: lat,
	        lng: lng,
	        placeId: placeId,
	        total_positives : 0,
	        total_negatives : 0,
	        total_neutrals  : 0,
	        percent_positive: 0,
	        percent_negative: 0,
	        total_searched : parsedMessages.length,
	        photo_urls : []
	      }

	      //iterate through messages to further populate city record
	      parsedMessages.forEach(function(message){
	        var sentiment = message.sentiment;
	        cityRecord.photo_urls.push(message.url);
	        if(sentiment>0) cityRecord.total_positives ++;
	        else if(sentiment<0) cityRecord.total_negatives ++;
	        else cityRecord.total_neutrals ++;
	      })
	      cityRecord.percent_positive = cityRecord.total_positives / cityRecord.total_searched;
	      cityRecord.percent_negative = cityRecord.total_negatives / cityRecord.total_searched;

	      var cityDB = new Cities(cityRecord);
	      cityDB.save(function(error, data){
	        if(error){
	            console.log('Error: ' + err);
	        }
	        else{
	            console.log('Success: Got it');
	            console.log(cityDB);
	        }
	      });

	    })
	    .catch(function (err) {

	      console.log("Error on: "+ err);
	       //return utils.send404(res);
	    });
	},

	getMassInstagrams: function(city,number){
		console.log("getting mass instagrams");
	  var storage = {};
	  var arrStorage = [];
	  storage.size = 0;

	  var getInstagrams = function(){
		  console.log("fetching more instagrams... size is " + storage.size + "and arr size is " + arrStorage.length);
		  var clientId = '0818d423f4be4da084f5e4b446457044';
		  var apiUrl = 'https://api.instagram.com/v1/media/search?lat=' + city.lat;
		      apiUrl += '&lng=' + city.lng + '&client_id=' + clientId + '&count=300';

		  request(apiUrl)
		    .then(function (res, body) {
		      if(res.statusCode == 400) {
		      	throw new Error('400 error on request');
		      }

		      var messages = JSON.parse(res[0].body).data;
		      
		      var parsedMessages = messages.forEach(function(message){
		      	arrStorage.push(message);
		      	if(storage[message.id] === undefined) {
			        var text = message.caption ? message.caption.text : "";
			        var newMessage = {
			          text: text,
			          url: message.link,
			          sentiment: sentiment(text)
			        }
			        storage[message.id] = newMessage;
			        storage.size++;
			      }
		      })
			  if(storage.size<number){
			  	setTimeout(getInstagrams,250);
			  }  else {
			  	console.log("all done fetching! " + storage.size);
			  }

	    })
	    .catch(function (err) {
	      console.log("Error: " + err);
	    });

		}
		getInstagrams();
	}

};

module.exports = utils;
