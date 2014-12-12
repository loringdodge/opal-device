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
			utils.pullInstagramDataIntoDb(
				city.placeId,
				city.lng,
				city.lat,
				city.city);
			if (i < cities.cities.length) {
				setTimeout(getNextCity, 250)
			}
		}

		getNextCity();

	},

	pullInstagramDataIntoDb: function (placeId, lng, lat, name) {
		var clientId = '0818d423f4be4da084f5e4b446457044';
		var apiUrl = 'https://api.instagram.com/v1/media/search?lat=' + lat;
		apiUrl += '&lng=' + lng + '&client_id=' + clientId + '&count=20';
		console.log(apiUrl);
		request(apiUrl)
			.then(function (res, body) {
				console.log("response recieved for " + name);
				if (res.statusCode == 400) throw new Error('400 error on request');
				var messages = JSON.parse(res[0].body).data;

				var parsedMessages = messages.map(function (message) {
					var text = message.caption ? message.caption.text : "";
					return {
						text: text,
						url: message.link,
						sentiment: sentiment(text)
					}
				})

				//create new city record
				var cityRecord = {
					city: name,
					lat: lat,
					lng: lng,
					placeId: placeId,
					total_positives: 0,
					total_negatives: 0,
					total_neutrals: 0,
					total_searched: parsedMessages.length,
					photo_urls: []
				}

				//iterate through messages to further populate city record
				parsedMessages.forEach(function (message) {
					sentiment = message.sentiment;
					cityRecord.photo_urls.push(message.url);
					if (sentiment > 0) cityRecord.total_positives++;
					else if (sentiment < 0) cityRecord.total_negatives++;
					else cityRecord.total_neutrals++;
				})

				console.log(cityRecord);
				console.log('***********************************')

				//add city record to DB.
				var cityDB = new Cities(cityRecord);
				cityDB.save(function (error, data) {
					if (error) {
						console.log('Error: ' + err);
					} else {
						res.json('Success: Got it');
					}
				});

			})
			.catch(function (err) {

				console.log("Error on: " + err);
				//return utils.send404(res);
			});
	},

	getMassInstagrams: function (city, storage) {
		var storage = storage || {};

		if (storage.length > 5000) {
			return storage;
		}

		var clientId = '0818d423f4be4da084f5e4b446457044';
		var apiUrl = 'https://api.instagram.com/v1/media/search?lat=' + city.lat;
		apiUrl += '&lng=' + city.lng + '&client_id=' + clientId + '&count=300';

		request(apiUrl)
			.then(function (res, body) {
				if (res.statusCode == 400) {
					throw new Error('400 error on request');
				}

				var messages = JSON.parse(res[0].body).data;

				var parsedMessages = messages.forEach(function (message) {
					if (storage[message.id] === undefined) {
						var text = message.caption ? message.caption.text : "";
						var newMessage = {
							text: text,
							url: message.link,
							sentiment: sentiment(text)
						}
						storage[message.id] = newMessage;
					}
				})

			})
			.catch(function (err) {
				console.log("Error: " + err);
				// return utils.send404(res);
			});

		getMassInstagrams(city, storage);

	}

};

module.exports = utils;