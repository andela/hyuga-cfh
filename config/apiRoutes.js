var users = require('../app/controllers/api/users');
var invitation = require('../app/controllers/api/invitation');


module.exports = function (app) {
  'use strict';

  // Auth routes
  app.post('/api/auth/signup', users.signup);
  app.post('/api/auth/login', users.login);

  // Users routes
  app.get('/api/search/users', users.search);

  // User routes
  app.post('/api/friend', users.friendship);
  app.post('/api/invite', invitation.invite);
};
