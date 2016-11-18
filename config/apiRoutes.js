var users = require('../app/controllers/api/users');
var invitation = require('../app/controllers/api/invitation');


module.exports = function (app) {
  'use strict';

  // Auth routes
  app.post('/api/auth/signup', users.signup);
  app.post('/api/auth/login', users.login);

  app.get('/api/auth/current_user', users.currentUser);
  app.post('/api/games/save_history', users.saveGameHistory);
  app.get('/api/games/get_history', users.getGameHistory);
  app.get('/api/games/delete_history', users.deleteGameHistory);
  app.get('/api/search/users', users.search);

  // User routes
  app.post('/api/friend', users.friendship);
  app.post('/api/invite', invitation.invite);
  app.get('/api/invitation', invitation.getInvitation);
  app.put('/api/invitation', invitation.readInvitation);
};
