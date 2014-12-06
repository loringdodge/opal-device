angular.module('omnigrahm',[
	'omnigrahm.user',
	'omnigrahm.location',
	'ui.router'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider){
	$stateProvider
	.state('user', {
		templateUrl: 'user/user.html',
		controller: 'userController',
		url: '/'
	})
	.state('location', {
		templateUrl: 'location/location.html',
		controller: 'locationController',
		url: '/location'
	});
})

// var getObjectsByLocation = function(cityName) {
// 	OAuth.initialize('mjBY4FTkZ4yHocgHANa2ix7-m5w');

// 	var provider = 'instagram';
// 	OAuth.popup(provider, {cache: true})
// 	.done(function(result) {
// 		//get lat long from cityName
// 	    result.get('http://maps.googleapis.com/maps/api/geocode/json?address=san%20francisco&sensor=false')
// 	    .done(function(data) {
// 			var lat = data.results[0].geometry.location.lat;
// 			var lng = data.results[0].geometry.location.lng;
// 			//get media from city
// 		    result.get('https://api.instagram.com/v1/media/search?lat=' + lat + '&lng=' + lng + '&client_id=0818d423f4be4da084f5e4b446457044').done(function(data) {
// 		    	//save to database
// 		    	console.log(data);
// 		    }).fail(function(err) {
// 		    	//error
// 		    });
// 		});
// 	});
// };


// var getUserFeed = function(userId) {
// 	OAuth.initialize('mjBY4FTkZ4yHocgHANa2ix7-m5w');
// 	var provider = 'instagram';
// 	userId = 217257560;

// 	OAuth.popup(provider)
// 	.done(function(result) {
// 	    result.get('https://api.instagram.com/v1/users/' + userId + '/media/type=image/recent/?client_id=0818d423f4be4da084f5e4b446457044&count=1').done(function(data) {
// 			//save to database user's feed
// 			console.log(JSON.stringify(data));
// 		}).fail(function(err) {
// 		  // with err
// 		});
// 	})
// 	.fail(function (err) {
// 	    //handle error with err
// 	});
// };
