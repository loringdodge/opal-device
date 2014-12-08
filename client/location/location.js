angular.module('omnigrahm.location', [])
.controller('locController', function($scope, $http) {

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
			    result.get('https://api.instagram.com/v1/media/search?lat=' + lat + '&lng=' + lng + '&client_id=0818d423f4be4da084f5e4b446457044&count=1')
			    .done(function(locObjects) {

			    	  locObjects.data.forEach(function(obj) {
			    	  // objectToSave = userObjects.data[i];
			    	  // objectToSave = obj;
			    	  // console.log(obj);
			    	  var caption = getCaptionString(obj);

			    	  //api call 
			    	  var string = caption.replace(' ', '%20');
			    	  $http.get('https://twinword-sentiment-analysis.p.mashape.com/analyze/?text=' + string, {
			    	    headers: { 'X-Mashape-Key': 'bZKtaWEZMmmshwTi4qO4XJhxvNfCp13uY3yjsnYweDF3s3S2Bw'}
			    	  })
			    	  .success(function(data) {
			    	    obj['sentiment'] = data;
			    	   
			    	    var coord = [lng,lat];
			    	   	obj['location'] =  { "type": "Point", "coordinates": coord };
			    	    console.log(obj);
			    	    //var stringifiedObj = JSON.stringify(obj);
			    	    // console.log(stringifiedObj);
			    	    // var instagramObj = new InstagramSchema(stringifiedObj);
			    	    //post to /api/instagram individual objects
			    	    $http.post('/api/instagram', obj)
			    	    .success(function(data, status, headers, config) {
			    	      console.log(data, status, headers, config); 		
			    	      console.log('posted!!!');
			    	      // console.log(data);
			    	      // this callback will be called asynchronously
			    	      // when the response is available
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

  	 var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

}); //end of .controller
