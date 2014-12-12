var cities = require('../../cities.json');
var instagram = require('./instagram');
var sentiment = require('./sentiment');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var request = Promise.promisify(require('request'));
var Cities = Promise.promisifyAll(mongoose.model("Cities"));

var utils = {

  sendResponse : function(response, obj, status){
    status = status || 200;
    response.writeHead(status, headers);
    response.end(obj);
  },

  collectData : function(request, callback){
    var data = "";
    request.on("data", function(chunk){
      data += chunk;
    });
    request.on("end", function(){
      callback(data);
    });
  },

  send404 : function(response){
    utils.sendResponse(response, '404: Page not found', 404);
  },

  sendRedirect : function(response, location, status){
    status = status || 302;
    response.writeHead(status, {Location: location});
    response.end();
  },

  getTop30 : function(){
    console.log("getting top 30!")
    var i = 0;

    var getNextCity = function(){
      var city = cities.cities[i++];
      console.log("sending req for " + city.city);
        utils.getMassInstagrams(city,1000);
        // utils.pullInstagramDataIntoDb(
        //  city.placeId,
        //  city.lng,
        //  city.lat,
        //  city.city);
      // if(i<cities.cities.length){
      //  setTimeout(getNextCity,1000);
      // }
    }

    getNextCity();

  },

  AddInstagramDataToDb: function(city, messages){
    var cityRecord;    
    var query  = Cities.where({ placeId: city.placeId });
    
    query.findOne().exec()
      .then(function (city) {
        if (city) {
          console.log("city exists in DB");
          cityRecord = city;
        } else {
          console.log("city doesn't yet exist in DB... creating new record now.")
          cityRecord = new Cities({
            city: city.name,
            lat: city.lat,
            lng: city.lng,
            placeId: city.placeId,
            total_positives : 0,
            total_negatives : 0,
            total_neutrals  : 0,
            percent_positive: 0,
            percent_negative: 0,
            total_searched : parsedMessages.length,
            photo_urls : []
          });
      }
      return cityRecord;
    })
    .then(function (cityRecord) {
      //iterate through messages to further populate city record
      messages.forEach(function(message){
        cityRecord.photo_urls.push(message.url);
        if(message.sentiment>0) cityRecord.total_positives ++;
        else if(message.sentiment<0) cityRecord.total_negatives ++;
        else cityRecord.total_neutrals ++;
      })
      cityRecord.percent_positive = cityRecord.total_positives / cityRecord.total_searched;
      cityRecord.percent_negative = cityRecord.total_negatives / cityRecord.total_searched;

      var cityDB = new Cities(cityRecord);
      
      // this might not work
      return cityDB.save().exec()
    })
    .catch(function (err) {
      console.log('ERROR: ');
      console.log(err);
    });
  },

  getInstagrams: function(city,number){
    console.log("getting mass instagrams");
    var storage = {};
    storage.size = 0;

    var recursiveFetch = function(){
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
          addInstagramDataToDb(city,storage);
        }

      })
      .catch(function (err) {
        console.log("Error: " + err);
      });

    }
    recursiveFetch();
  }

};

module.exports = utils;
