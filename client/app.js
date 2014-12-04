// angular.module('opal',[]);
$(document).ready(function() {
	OAuth.initialize('mjBY4FTkZ4yHocgHANa2ix7-m5w');
	
	var provider = 'twitter';

	OAuth.popup(provider)
	.done(function(result) {
	    result.get('https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=169686021&count=200').done(function(data) {
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