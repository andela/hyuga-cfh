/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  jwt = require('jsonwebtoken');

// get jwt secret
var secret = process.env.JWT_SECRET || 'super duper secret';

exports.login = function (req, res) {
  "use strict";

  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) {
      return res.send(500, { error: err.error });
    }

    if (!user) {
      return res.send(401, { message: 'User not found' });
    }

    if (!user.authenticate(req.body.password)) {
      return res.send(401, { message: 'Invalid password' });
    }

    var token = jwt.sign({ userId: user._id }, secret);
    return res.send({ token: token });
  });
};
