/**
 * Express configuration
 */
'use strict';
var express = require('express');
var config = require('./environment');

module.exports = function(app) {
  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  if ('production' === env) {
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
  }
};