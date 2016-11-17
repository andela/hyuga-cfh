var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

var InvitationSchema = new Schema({
  for: String,
  from: String,
  link: String,
  status: Number
});

mongoose.model('Invitation', InvitationSchema);
