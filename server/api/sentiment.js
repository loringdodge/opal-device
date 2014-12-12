/*jshint node:true */
var analyzeSentiment = require('sentiment');

module.exports = function (message) {
  return analyzeSentiment(message).score;
};