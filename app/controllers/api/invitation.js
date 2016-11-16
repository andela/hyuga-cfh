var mongoose = require('mongoose'),
  Invitation = mongoose.model('Invitation');

exports.invite = function (req, res) {
  console.log(req.body);
  var invitations = req.body.invitedIDs.map(function (eachId) {
    return {
      from: req.user.name,
      to: eachId,
      link: req.body.link
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
  Invitation.find({to: req.user._id.toString()}, function (err, invitations) {
    if (err) {
      return res.send(500, {message: err.errors});
    }
    return res.send(200, invitations);
  });
};
