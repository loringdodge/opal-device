
angular.module('omnigrahm.location', [])

.controller('locationController', function($scope, $http) {
  //noice
  $scope.images = {
  	positive: [],
  	negative: []
  }
  $scope.data = {};
  $scope.chartData = {
    x: ['x'],
    positive: ['positive']
  };
  $scope.redirect = function(link) {
    window.open(link);
  };
  var showGraph = function() {
  	c3.generate({
	    bindto: '#locationChart',
	    data: {
	      x: 'x',
	      columns: [
	      	//Labels for x-axis (date strings)
	      	$scope.chartData.x,
	      	$scope.chartData.positive
	      ],
	      type: 'line',
	      colors: {
	      	'positive': '#00FF00'
	      }
	    },
	    axis: {
            x: {
            	label: {
            		text: 'Date',
            		position: 'outer-center'
            	},
                type: 'timeseries',
                tick: {
                    format: '%Y-%m-%d'
                }
            },
            y: {
            	max: 1,
            	min: 0,
            	padding: {
            		top: 0,
            		bottom:0
            	}
            }
        }
	});
  };
  var parseData = function(cityName) {
  	var dataSet = $scope.data[cityName];
  	console.log(dataSet);
  	var dates = [];
  	var posSum = [0];
  	var posPercent = [];
  	var total = [0];
  	var syncIndex = 0;
  	var currDate = null;
  	var posImages = [];
  	var negImages = [];
  	for (var i = 0; i < dataSet.length; i++) {
  	  var instagram = dataSet[i];
      var date = new Date(dataSet[i].created_time * 1000);
      var month = date.getMonth() + 1;
      var instagramDate = date.getFullYear() + '-' + month + '-' + date.getDate();
      var sentiment = instagram.sentiment.type;
      if (sentiment === 'neutral') continue;
      if (!currDate) {
        currDate = instagramDate;
        dates.push(currDate);
      }
      if (instagramDate !== currDate) {
        currDate = instagramDate;
        dates.push(currDate);
        syncIndex++;
        posSum[syncIndex] = 0;
      }
      if (sentiment === 'positive') {
      	posSum[syncIndex]++;
      	posImages.push(getImages(instagram));
      }
      else {
      	//add imageURL to negImages
      	negImages.push(getImages(instagram));
      }
      total[syncIndex]++;
  	}
  	for (var i = 0; i < posSum.length; i++) {
  		posPercent.push(posSum[i]/total[i]);
  	}

  	//Update data in chart
  	$scope.chartData.x = ['x'].concat(dates);
  	$scope.chartData.positive = ['positive'].concat(posPercent);
  	if ($scope.chartData.x.length === $scope.chartData.positive.length) {
	  	showGraph();
	  	$scope.images.positive = [];
	  	$scope.images.negative = [];

	  	$scope.images.positive = posImages;
	  	$scope.images.negative = negImages;
  	}
  };

  $scope.getLocFeed = function(cityName) {
  	console.log("Called getLocFeed");
  	cityName = cityName || 'San Francisco';
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
					console.log(locObjects);
					locObjects.data.forEach(function(obj) {
			    	  // objectToSave = userObjects.data[i];
			    	  // objectToSave = obj;
			    	  // console.log(obj);
			    	  //Only run this if instagram has a caption
			    	  if (obj.caption) {
				    	  var caption = getCaptionString(obj);
				    	  //api call 
				    	  var string = caption.replace('#', ' ');
				    	  $http.get('https://twinword-sentiment-analysis.p.mashape.com/analyze/?text=' + string, {
				    	  	headers: { 'X-Mashape-Key': 'bZKtaWEZMmmshwTi4qO4XJhxvNfCp13uY3yjsnYweDF3s3S2Bw'}

				    	  })
				    	  .success(function(data) {
				    	  	obj['sentiment'] = data;

				    	  	var coord = [lng,lat];
				    	  	obj['location'] =  { "type": "Point", "coordinates": coord };
				    	  	console.log(obj);

				    	    //Hacky way of putting instagrams into local scope dataset
				    	    $scope.data[cityName] = $scope.data[cityName] || [];
				    	    if (!containsLink($scope.data[cityName], obj.link)){
					    	    $scope.data[cityName].push(obj);
				    	    }

				    	    if (locObjects.data.length - 1 === locObjects.data.indexOf(obj)) {
					    	    parseData(cityName);
				    	    }
				    	    

				    	    $http.post('/api/instagram', JSON.stringify(obj))
				    	    .success(function(data, status, headers, config) {
				    	    	// console.log(data, status, headers, config); 		
				    	    	// console.log('posted!!!');
				    	      // this callback will be called asynchronously
				    	      // when the response is available
					    	  })
					    	    .error(function(data, status, headers, config) {
					    	        // called asynchronously if an error occurs
					    	        // or server returns response with an error status.
					    	    })
						    });
				      //       $http.get('/api/instagram') //, {params: { user_id: result.user.id } }
				    		// 	  .success(function(data, status, headers, config) {
				      //         		//gets stuff back from the user
				      //         		$scope.data = data;
				    		// 	  	console.log('gets objects back');
				    		// 	  	console.log([$scope.data]);
				    		// });              
			    	  	
			    	  };
			    	}); //end of forEach loop

				}).fail(function(err) {
					    	//error
	    		});
			});
		});
		// parseData(cityName);
	};
	var getCaptionString = function(instaObj){
		return instaObj.caption.text;
	};
	var getImages = function(data){
	    var result = [];
	    result[0] = data.images.thumbnail.url;
	    result[1] = data.link;
	    return result;
  	};
  	var containsLink = function(arr, targetLink) {
  		for (var i = 0; i < arr.length; i++) {
  			if (arr[i].link === targetLink) return true;
  		}
  		return false;
  	};


}); //end of .controller
