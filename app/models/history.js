var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var historySchema = new Schema({
  name: String,
  gameID: String,
  userID: String,
  datePlayed: String,
  winner: String
});

var History = mongoose.model('History', historySchema);
