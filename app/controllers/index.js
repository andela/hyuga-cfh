/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  async = require('async'),
  _ = require('underscore');

/**
 * Redirect users to /#!/app (forcing Angular to reload the page)
 */
exports.play = function (req, res) {
  if (Object.keys(req.query)[0] === 'custom') {
    res.redirect('/#!/app?custom');
  } else {
    res.redirect('/#!/app');
  }
};

exports.render = function (req, res) {
  var user, friends;
  if (req.user) {
    user = req.user;

    user.getFriends(function (err, users) {
      friends = users;
    });
  }

  res.render('index', {
    user: user ? JSON.stringify(user) : null,
    friends: friends ? JSON.stringify(friends) : null
  });
};
