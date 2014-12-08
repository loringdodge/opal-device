
angular.module('omnigrahm.location', [])

.controller('locationController', function($scope, $http) {
  //noice

  $scope.getLocFeed = function(cityName) {
  	OAuth.initialize('mjBY4FTkZ4yHocgHANa2ix7-m5w');
  	var city = cityName.replace(' ', '%20');
  	var provider = 'instagram';
  	OAuth.popup(provider, {cache: true})
  	.done(function(result) {
			//get lat long from cityName
			result.get('http://maps.googleapis.com/maps/api/geocode/json?address='+ city+'&sensor=false')
			.done(function(data) {
				var lat = data.results[0].geometry.location.lat;
				var lng = data.results[0].geometry.location.lng;

				//get media from city
				result.get('https://api.instagram.com/v1/media/search?lat=' + lat + '&lng=' + lng + '&client_id=0818d423f4be4da084f5e4b446457044&count=20')
				.done(function(locObjects) {

					locObjects.data.forEach(function(obj) {
			    	  // objectToSave = userObjects.data[i];
			    	  // objectToSave = obj;
			    	  // console.log(obj);
			    	  var caption = getCaptionString(obj);
			    	  //api call 
			    	  var caption = getCaptionString(obj);
			    	  if (caption) {
			    	    var string = caption.replace('#', ' ');
			    	  } else {
			    	    string = '';
			    	  }
			    	  $http.get('https://twinword-sentiment-analysis.p.mashape.com/analyze/?text=' + string, {
			    	  	headers: { 'X-Mashape-Key': 'bZKtaWEZMmmshwTi4qO4XJhxvNfCp13uY3yjsnYweDF3s3S2Bw'}
			    	  })
			    	  .success(function(data) {
			    	  	obj['sentiment'] = data;

			    	  	var coord = [lng,lat];
			    	  	obj['location'] =  { "type": "Point", "coordinates": coord };
			    	  	console.log(obj);
			    	    //post to /api/instagram individual objects
			    	    $http.post('/api/instagram', JSON.stringify(obj))
			    	    .success(function(data, status, headers, config) {
				    	  })
				    	    .error(function(data, status, headers, config) {
				    	        // called asynchronously if an error occurs
				    	        // or server returns response with an error status.
				    	    })
					    })                  
			    	}); //end of forEach loop

				}).fail(function(err) {
					    	//error
	    		});
			});
		});
	};
	var getCaptionString = function(instaObj) {
		return instaObj.caption.text;
	};
}); //end of .controller
