module.exports = {

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
	  exports.sendResponse(response, '404: Page not found', 404);
	},

	sendRedirect : function(response, location, status){
	  status = status || 302;
	  response.writeHead(status, {Location: location});
	  response.end();
	}

	getMassInstagrams : function(city, storage){
	  var storage = storage || {};

	  if(storage.length > 5000){
	  	return storage;
	  }

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
		      }
	      })

    })
    .catch(function (err) {
      console.log("Error: " + err);
       // return utils.send404(res);
    });

    getMassInstagrams(city, storage);

	}




}