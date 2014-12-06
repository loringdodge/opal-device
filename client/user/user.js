angular.module('omnigrahm.user', [])
.controller('userController', function($scope, $http) {
  //noice
  $scope.getUserFeed = function(userId) {
  		console.log('asdf');
  		OAuth.initialize('mjBY4FTkZ4yHocgHANa2ix7-m5w');
  		var provider = 'instagram';
  		userId = 217257560;

  		OAuth.popup(provider)
  		.done(function(result) {
  			console.log(result);
  		    result.get('https://api.instagram.com/v1/users/' + userId + '/media/recent/?client_id=0818d423f4be4da084f5e4b446457044&count=1').done(function(data) {
  				//save to database user's feed
  				// console.log(JSON.stringify(data));
  				//post to api/instagram

  				$http.get('/api/instagram').
  				  success(function(data, status, headers, config) {
  				  	console.log('gets objects back');
  				  	console.log(data);
  				    // $scope.posts = data;
  				  }).
  				  error(function(data, status, headers, config) {
  				  	console.log('error');
  				    // log error
  				  });

  			}).fail(function(err) {
  			  // with err
  			});
  		})
  		.fail(function (err) {
  		    //handle error with err
  		});
  	};
});

