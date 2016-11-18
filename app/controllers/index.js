/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var async = require('async');
var _ = require('underscore');


// Redirect users to /#!/app (forcing Angular to reload the page)
exports.play = function (req, res) {
  if (Object.keys(req.query)[0] === 'custom') {
    res.redirect('/#!/app?custom');
  } else {
    res.redirect('/#!/app');
  }
};

exports.render = function (req, res) {
  if (req.user) {
    var user = req.user;

    user.getFriends(function (err, friends) {
      // user.allFriends = friends;
      res.render('index', {
        user: user ? JSON.stringify(user) : null,
        friends: friends ? JSON.stringify(friends) : null
      });
    });
  } else {
    res.render('index', { user: null, friends: null });
  }
};
