var express = require('express');
var router = express.Router();
const Tweet = require ('../models/tweets')
const Hashtag = require ('../models/hashtags')
const Like = require ('../models/likes')



// GET all tweets
router.get('/', (req,res) => {
  Tweet.find().then(data =>{
    res.json({result : true, tweets: data})
  })
})


// POST a tweet
router.post('/', (req,res) =>{
  const newTweet = new Tweet({
    user: req.body.userObjectId,
    message: req.body.message,
    date: new Date(),
    hashtags: req.body.hashtagObjectId,
  });
  newTweet.save().then(() => {
    res.json({result : true})
  })

})

// DELETE a tweet 
router.delete('/', (req,res) => {
  Tweet.deleteOne({_id:req.body.tweetObjectId})
.then(() => {
  res.json({result : true, message : "tweet supprimé"})
})
})

// POST hashtag
router.post('/hashtag', (req,res) => {
  const newHashtag = new Hashtag({
    name: req.body.hashtag,
  })
  newHashtag.save().then(() => {
    res.json({result:true})
  })
});

// GET tweets with hashtag as params
router.get('/:hashtag', (req, res) => {
  Tweet.find().populate('hashtags')
  .then(data => {
    console.log(data)
    let results = [];
    data.forEach((element) => { 
      let tagExists = element.hashtags.some((x) => x.name === req.params.hashtag)
      if (tagExists) {
      results.push(element)
    }
  })
    if(results !== []){
      res.json({ result: true, tweets : results });
    } else {
      res.json({ result: false, error: 'No hashtag found' });
    }
  })
})


//POST like 
router.post('/like', (req,res) => {
  const newLike = new Like({
    user: req.body.userObjectId,
    tweets: req.body.tweetObjectId
  })
  newLike.save().then(() => {
    res.json({result:true})
  })
})

// DELETE a like 
// router.delete('/like', (req,res) => {
//   Like.find().populate('user','tweets')
//   .then(data => {

//   })
//   Like.deleteOne({_id:req.body.tweetObjectId})
// .then(() => {
//   res.json({result : true, message : "tweet supprimé"})
// })
// })

module.exports = router;
