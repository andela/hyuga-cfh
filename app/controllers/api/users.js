/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  jwt = require('jsonwebtoken'),
  avatars = require('../avatars').all();

// get jwt secret
var secret = process.env.JWT_SECRET || 'super duper secret';

exports.login = function (req, res) {
  'use strict';

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      return res.send(500, { error: err.error });
    }

    if (!user) {
      return res.send(401, { message: 'User not found' });
    }

    if (!user.authenticate(req.body.password)) {
      return res.send(400, { message: 'Invalid password' });
    }

    var token = jwt.sign({ userId: user._id }, secret);
    return res.send({ token: token });
  });
};

exports.signup = function (req, res) {
  'use strict';

  if (!(req.body.name && req.body.password && req.body.email)) {
    return res.send(400, { message: 'Incomplete parameters. User\'s name, email and password are required.' });
  }

  User.findOne({ email: req.body.email }, function (err, existingUser) {
    if (existingUser) {
      return res.send(409, { message: 'User already exist.' });
    }

    var user = new User(req.body);
    // Switch the user's avatar index to an actual avatar url
    user.avatar = avatars[user.avatar];
    user.provider = 'local';

    user.save(function (err) {
      if (err) {
        return res.send(500, { message: err.errors });
      }

      req.logIn(user, function (err) {
        if (err) {
          return res.send(500, { message: err.errors });
        }

        var token = jwt.sign({ userId: user._id }, secret);
        return res.send({ token: token });
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

exports.friendship = function (req, res) {
  // req.user._id = req.body.userid;
  saveFriend(req.user._id, req.body.friendid,
  function (reply) {
    if (reply.status === 200) {
      res.send(reply.status, {message: 'Friendship done'});
    } else {
      res.send(reply.status, {message: reply.message});
    }
  });
};

exports.search = function (req, res) {
  User.findById(req.query._id, function (err, details) {
    if(err) {
      return res.send(500, { message: err.errors });
    }
    var allFriends = [];
    details.friends.forEach(function (eachFriendID) {
      User.findById(eachFriendID, function (err, friendDetails) {
        console.log(friendDetails);
        allFriends.push({
          'id': eachFriendID,
          'name': friendDetails.name
        });
      });
    });
    console.log(allFriends);
    // return res.send(200, allFriends);
  });
  var name = new RegExp(req.query.name, 'i');

  User.find({ name: name }, function (err, users) {
    if (err) {
      return res.send(500, { message: err.errors });
    }

    res.send(users);
  });
};

function saveFriend(user1, user2, callback) {
  User.findById(user1, function (err, userDetails) {
    if (err) {
      return callback({status: 500, message: 'Internal server error'});
    }
    if (!userDetails) {
      return callback({status: 401, message: 'User does not exist'});
    }
    if (userDetails.friends.indexOf(user2) >= 0) {
      return callback({status: 401, message: 'Already friends'});
    }
    userDetails.friends.push(user2);
    userDetails.save(function (err, updates) {
      if (err) {
        return callback({status: 500, message: 'Internal server error'});
      }
      return callback({status: 200});
    });
  });
}
