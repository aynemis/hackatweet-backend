const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  user: {type:mongoose.Schema.Types.ObjectId, ref:'users'},
  message: String,
  date: Date,
  hashtags: [{type:mongoose.Schema.Types.ObjectId, ref:'hashtags'}],
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;