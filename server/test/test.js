var should = require('should');
var expect = require('chai').expect;
var request = require('request');

describe('Server Processes', function () {

  describe('Instagram', function () {
  	it('should get all instagram Top 30', function (done) {
  		request.get('http://localhost:3000/instagram/',
  			function(err, res, body){
  				var json = JSON.parse(body);
          expect(response.statusCode).to.equal(200);
          expect(json).to.be.a.Array;
          expect(json).to.have.length(20);
  			}
  		);
    });

    it('should get data for a specific city', function (done) {
    	var data = {
	        "lon": -94.591584099999977,
	        "name": "Devers,TX,USA",
	        "lat": 30.0274371,
	        "id": "ChIJf3IkFlwyP4YREwKBdv391Bs"
	    }
    	request.get('http://localhost:3000/instagram/' + data.id,
  			function(err, res, body){
  				var json = JSON.parse(body);
          expect(response.statusCode).to.equal(200);

  			}
  		);
    });
  });

  describe('Sentiment', function () {
  	it('should return a JSON object', function (done) {

    });

    it('should return the original message', function (done) {

    });

    it('should return with a sentiment score attached', function (done) {

    });
  });

  describe('Mongoose', function () {
    it('should write to the database', function (done) {

    });

    it('should fetch data for a single city', function (done) {

    });

    it('should fetch all data from Top 30 cities', function (done) {

    });

  });

});