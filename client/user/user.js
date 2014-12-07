angular.module('omnigrahm.user', [])
.controller('userController', function($scope, $http) {
  //noice
  $scope.getUserFeed = function(userId) {
  		OAuth.initialize('mjBY4FTkZ4yHocgHANa2ix7-m5w');
  		var provider = 'instagram';
  		userId = 217257560;

  		OAuth.popup(provider)
  		.done(function(result) {
  			console.log(result.user.id);
          //post to api/instagram -fix so only queries for user
          $http.get('/api/instagram') //, {params: { user_id: result.user.id } }
				  .success(function(data, status, headers, config) {
            //gets stuff back from the user
				  	console.log('gets objects back');
				  	console.log(data);
				  })
          //error on /api/instagram query
				  .error(function(data, status, headers, config) {
            //query instagram for user stuff
            result.get('https://api.instagram.com/v1/users/' + userId + '/media/recent/?client_id=0818d423f4be4da084f5e4b446457044&count=5')
            .done(function(userObjects) {
              //go through sentiment api
              // console.log(userObjects.data); //array of objects returned
                /*
                    for each object returned. getSentiment() returns string. getPosNeg() returns sentiment object.
                    push to the userObjects[i]. post to /api/instagram the whole object
                */
                // var objectToSave;
                // for (var i = 0; i < userObjects.data.length; i++) {
                  userObjects.data.forEach(function(obj) {
                  // objectToSave = userObjects.data[i];
                  // objectToSave = obj;
                  console.log(obj);
                  var caption = getCaptionString(obj);

                  //api call 
                  var string = caption.replace(' ', '%20');
                  $http.get('https://twinword-sentiment-analysis.p.mashape.com/analyze/?text=' + string, {
                    headers: { 'X-Mashape-Key': 'bZKtaWEZMmmshwTi4qO4XJhxvNfCp13uY3yjsnYweDF3s3S2Bw'}
                  })
                  .success(function(data) {
                    obj['sentiment'] = data;

                    //post to /api/instagram individual objects
                    $http.post('/api/instagram', JSON.stringify(obj))
                    .success(function(data, status, headers, config) {
                      console.log('posted!!!');
                      console.log(data);
                      // this callback will be called asynchronously
                      // when the response is available
                    })
                    .error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    })
                  })                  
                }); //end of forEach loop
            });
				  	console.log('not found');
				    // log error
				  });
          //end of error
			}).fail(function(err) {
			  //fail of Oauth
			});
  };
  var getCaptionString = function(instaObj) {
    return instaObj.caption.text;
  };

});


