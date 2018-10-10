const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var favoriteCoinSchema = new Schema({
  userId: {
    type: String
  },
  coinId: {
    type: String
  }
}, {
  timestamps: true
});

var FavoriteCoin = mongoose.model('FavoriteCoinSchema', favoriteCoinSchema);
module.exports = FavoriteCoin;