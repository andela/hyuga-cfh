/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var avatars = require('../avatars').all();

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

exports.search = function (req, res) {
  var name = new RegExp(req.query.name, 'i');

  User.find({ name: name }, function (err, users) {
    if (err) {
      return res.send(500, { message: err.errors });
    }

    res.send(users);
  });
};
