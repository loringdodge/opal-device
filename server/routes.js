/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {
  // Insert routes below
  app.use('/api/instagram', require('./api/instagram'));
  
  // All other routes should redirect to the index.html
  app.route('/')
    .get(function(req, res) {
      res.sendFile('../client/index.html');
    });
};
