// angular.module('opal',[]);
$(document).ready(function() {
	OAuth.initialize('mjBY4FTkZ4yHocgHANa2ix7-m5w');
	
	var provider = 'instagram';
	OAuth.popup(provider)
	.done(function(result) {
		//gets user feed
		http://maps.googleapis.com/maps/api/geocode/json?address=san%20francisco&sensor=false
	     result.get('http://maps.googleapis.com/maps/api/geocode/json?address=san%20francisco&sensor=false').done(function(data) {
	     	console.log(data.results[0].geometry.location.lat);
	     	console.log(data.results[0].geometry.location.lng);
	    // result.get('https://api.instagram.com/v1/users/217257560/media/recent/?client_id=0818d423f4be4da084f5e4b446457044&count=1').done(function(data) {
			console.log(JSON.stringify(data));
		}).fail(function(err) {
		  // with err
		})
	    .fail(function (err) {
	        //handle error with err
	    })
	})
	.fail(function (err) {
	    //handle error with err
	})
	

});