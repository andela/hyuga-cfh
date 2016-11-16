var mongoose = require('mongoose'),
  Invitation = mongoose.model('Invitation');

exports.invite = function (req, res) {
  var invitations = req.body.invitedIDs.map(function (eachId) {
    return {
      from: req.user.name,
      to: eachId,
      link: 'none'
    };
  });
  Invitation.collection.insert(invitations, function (err) {
    if (err) {
      return res.send(500, {message: err.errors});
    }
    return res.send(200, {message: 'Invitation sent'});
  });
};
