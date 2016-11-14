var users = require('../app/controllers/api/users');

module.exports = function (app) {
  'use strict';

  // User routes
  app.post('/api/auth/signup', users.signup);
  app.post('/api/auth/login', users.login);
  app.get('/api/auth/current_user', users.currentUser);
};
