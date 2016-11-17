var users = require('../app/controllers/api/users');

module.exports = function (app) {
  'use strict';

  // User routes
  app.post('/api/auth/signup', users.signup);
  app.post('/api/auth/login', users.login);
  app.get('/api/auth/current_user', users.currentUser);
  app.post('/api/games/save_history', users.saveGameHistory);
  app.get('/api/games/get_history', users.getGameHistory);
  app.post('/api/games/delete_history', users.deleteGameHistory);
};
