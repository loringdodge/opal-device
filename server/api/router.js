var unirest = require('unirest');
module.exports.getSentiment =  function(string){
	unirest.get("https://twinword-sentiment-analysis.p.mashape.com/analyze/?text=" + string)
	.header("X-Mashape-Key", "bZKtaWEZMmmshwTi4qO4XJhxvNfCp13uY3yjsnYweDF3s3S2Bw")
	.end(function (result) {
	  console.log(result.body);
	});
};
