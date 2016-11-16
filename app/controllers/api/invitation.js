var mongoose = require('mongoose'),
  Invitation = mongoose.model('Invitation');

exports.invite = function (req, res) {
  console.log(req.body);
  var invitations = req.body.invitedIDs.map(function (eachId) {
    return {
      from: req.user.name,
      to: eachId,
      link: req.body.link,
      status: 0
    };
  });
  Invitation.collection.insert(invitations, function (err) {
    if (err) {
      return res.send(500, {message: err.errors});
    }
    return res.send(200, {message: 'Invitation sent'});
  });
};

exports.getInvitation = function (req, res) {
  if(!req.user) {
    return res.send(401, {message: 'Please login'});
  }
  Invitation.find({to: req.user._id.toString(), status: 0},
  function (err, invitations) {
    if (err) {
      return res.send(500, {message: err.errors});
    }
    return res.send(200, invitations);
  });
};

exports.readInvitation = function (req, res) {
  Invitation.update({to: req.user._id.toString()}, {$set: {status: 1}},
  function (err) {
    if (err) {
      return res.send(500, {message: 'Internal server error'});
    }
    return res.send(200, {message: 'Notifications read'});
  });
};
