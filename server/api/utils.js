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

}