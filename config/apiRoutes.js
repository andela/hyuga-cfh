var users = require('../app/controllers/api/users');

module.exports = function (app) {
  'use strict';

  // Auth routes
  app.post('/api/auth/signup', users.signup);
  app.post('/api/auth/login', users.login);

  // Users routes
  app.get('/api/search/users', users.search);
};
