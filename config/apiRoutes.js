var users = require('../app/controllers/api/users');

module.exports = function (app) {
  'use strict';

  // User routes
  app.post('/api/auth/signup', users.signup);
  app.post('/api/auth/login', users.login);
  app.post('/api/friend', users.friendship);
  app.get('/api/search/users', users.search);
};
