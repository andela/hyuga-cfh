/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  GameHistory = mongoose.model('History'),
  jwt = require('jsonwebtoken'),
  avatars = require('../avatars').all();

// get jwt secret
var secret = process.env.JWT_SECRET || 'super duper secret';

exports.login = function (req, res) {
  'use strict';

  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) {
      return res.send(500, {
        error: err.error
      });
    }

    if (!user) {
      return res.send(401, {
        message: 'User not found'
      });
    }

    if (!user.authenticate(req.body.password)) {
      return res.send(400, {
        message: 'Invalid password'
      });
    }

    var token = jwt.sign({
      userId: user._id
    }, secret);
    return res.send({
      token: token
    });
  });
};

exports.signup = function (req, res) {
  'use strict';

  if (!(req.body.name && req.body.password && req.body.email)) {
    return res.send(400, {
      message: 'Incomplete parameters. User\'s name, email and password are required.'
    });
  }

  User.findOne({
    email: req.body.email
  }, function (err, existingUser) {
    if (existingUser) {
      return res.send(409, {
        message: 'User already exist.'
      });
    }

    var user = new User(req.body);
    // Switch the user's avatar index to an actual avatar url
    user.avatar = avatars[user.avatar];
    user.provider = 'local';

    user.save(function (err) {
      if (err) {
        return res.send(500, {
          message: err.errors
        });
      }

      req.logIn(user, function (err) {
        if (err) {
          return res.send(500, {
            message: err.errors
          });
        }

        var token = jwt.sign({
          userId: user._id
        }, secret);
        return res.send({
          token: token
        });
      });
    });
  });
};

exports.currentUser = function (req, res) {
  if (req.user) {
    return res.send(req.user);
  }
  res.status(404).send('Not Found!');
};

exports.saveGameHistory = function (req, res) {
  var gameHistory = new GameHistory(req.body);
  var date = new Date();

  // Check if history data has already been created.
  GameHistory.find({
    timestamp: date.getTime()
  }, function (err) {
    if (!err) {
      // Do nothing if history is already created
    }
    gameHistory.save(function (err) {
      if (err) {
        return res.send(501, {
          message: 'Could not save game history'
        });
      }

      return res.send(201, {
        message: 'Game history created successfully'
      });
    });
  });
};

exports.getGameHistory = function (req, res) {
  'use strict';

  if (!req.user) {
    return res.send(401, {
      message: 'User not found!'
    });
  }

  // Find all games stored for this user
  GameHistory.find({
    userID: req.user._id
  }, function (err, historyDetail) {
    if (err) {
      return res.send(404, {message: 'Cannot find Game history'});
    }

    return res.send(historyDetail);
  });
};

exports.deleteGameHistory = function (req, res) {
  'use strict';

  // check if user is logged in
  if (!req.user) {
    return res.send(401, {
      message: 'User not found!'
    });
  }

  GameHistory.find({
    userID: req.user._id
  }, function (err) {
    if (err) {
      return res.send(404, {message: 'Cannot find Game history'});
    }

    GameHistory.remove({
      userID: req.user._id
    }, function (error) {
      if (!error) {
        return res.send(200, {message: 'Game history removed'});
      }
    });
  });
};

exports.friendship = function (req, res) {
  saveFriend(req.user._id, req.body.friendid,
  function (reply) {
    if (reply.status === 200) {
      res.send(reply.status, {message: 'Friend added'});
    } else {
      res.send(reply.status, {message: reply.message});
    }
  });
};

exports.search = function (req, res) {
  User.findById(req.query._id, function (err, user) {
    if (err) {
      return res.send(500, { message: err.errors });
    }
    User.find({_id: {$in: user.friends }}, function (err, friends) {
      if (err) {
        return res.send(500, { message: err.errors });
      }

      return res.send(200, friends);
    });
  });
};

function saveFriend(userId, friendId, callback) {
  User.findById(userId, function (err, userDetails) {
    if (err) {
      return callback({status: 500, message: 'Internal server error'});
    }
    if (!userDetails) {
      return callback({status: 401, message: 'User does not exist'});
    }
    if (userDetails.friends.indexOf(friendId) >= 0) {
      return callback({status: 401, message: 'Already friends'});
    }
    userDetails.friends.push(friendId);
    userDetails.save(function (err, updates) {
      if (err) {
        return callback({status: 500, message: 'Internal server error'});
      }
      return callback({status: 200});
    });
  });
}
