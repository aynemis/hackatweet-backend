const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
  user: {type:mongoose.Schema.Types.ObjectId, ref:'users'},
  tweets: [{type:mongoose.Schema.Types.ObjectId, ref:'tweets'}],
});

const Like = mongoose.model('likes', likeSchema);

module.exports = Like;