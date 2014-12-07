angular.module('omnigrahm.user', [])
.controller('userController', function($scope, $http) {
  //noice
  $scope.getUserFeed = function(userId) {
  		OAuth.initialize('mjBY4FTkZ4yHocgHANa2ix7-m5w');
  		var provider = 'instagram';
  		userId = 217257560;

      $http.get('https://twinword-sentiment-analysis.p.mashape.com/analyze/?text=ok%20good%20bad', {
        headers: { 'X-Mashape-Key': 'bZKtaWEZMmmshwTi4qO4XJhxvNfCp13uY3yjsnYweDF3s3S2Bw'}
      })
      .success(function(data) {
        console.log(data);
      })

  		OAuth.popup(provider)
  		.done(function(result) {
  			console.log(result.user.id);
          //post to api/instagram -fix so only queries for user
          $http.get('/api/instagram', {params: { user_id: result.user.id } })
				  .success(function(data, status, headers, config) {
            //gets stuff back from the user
				  	console.log('gets objects back');
				  	console.log(data);
				  })
          //error on /api/instagram query
				  .error(function(data, status, headers, config) {
            //query instagram for user stuff
            result.get('https://api.instagram.com/v1/users/' + userId + '/media/recent/?client_id=0818d423f4be4da084f5e4b446457044&count=2')
            .done(function(data) {
              //data from instagram returned as
              //go through sentiment api
              console.log(data);
              $http.post('/api/instagram', {msg:'hello word!'}).
              success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
              })
              .error(function(data, status, headers, config) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
              })
            });
				  	console.log('not found');
				    // log error
				  });
          //end of error

			}).fail(function(err) {
			  //fail of Oauth
			});
  };
});

