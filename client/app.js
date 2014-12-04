// angular.module('opal',[]);
$(document).ready(function() {
	OAuth.initialize('mjBY4FTkZ4yHocgHANa2ix7-m5w');
	
	var provider = 'instagram';
	// https://api.instagram.com/v1/users/[USER ID]/media/recent/?client_id=[CLIENT ID]
	// https://api.instagram.com/v1/users/3/media/recent/?access_token=ACCESS-TOKEN
	OAuth.popup(provider)
	.done(function(result) {
	    result.get('https://api.instagram.com/v1/users/217257560/media/recent/?client_id=0818d423f4be4da084f5e4b446457044&count=1').done(function(data) {
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