var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var historySchema = new Schema({
  name: String,
  gameID: String,
  userID: String,
  datePlayed: String,
  players: String,
  rounds: String,
  winner: String,
  timestamp: String
});

var History = mongoose.model('History', historySchema);
