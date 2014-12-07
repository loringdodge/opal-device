/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {
  // Insert routes here, guys!
  app.use('/api/instagram', require('./api/instagram'));
  app.use('/api/user', require('./api/user')); 

};
