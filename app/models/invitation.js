var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

var InvitationSchema = new Schema({
  for: String,
  from: String,
  link: String
});

mongoose.model('Invitation', InvitationSchema);
