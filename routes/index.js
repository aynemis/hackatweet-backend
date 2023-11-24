var express = require('express');
var router = express.Router();
const Tweet = require ('../models/tweets')
const Hashtag = require ('../models/hashtags')
const Like = require ('../models/likes')



// GET all tweets
router.get('/tweets', (req,res) => {
  Tweet.find().populate('user')
  .then(data =>{
    res.json({result : true, tweets: data})
  })
})


// POST a tweet
router.post('/tweets', (req,res) =>{
  let tag;
  Hashtag.findOne({name: req.body.hashtagName})
  .then(data => {
    if(data === null){
      const newTag = new Hashtag({
        name: req.body.hashtagName.toString(),
      })
      newTag.save().then(() => {
        const newTweet = new Tweet({
          user: req.body.userObjectId,
          message: req.body.message,
          date: new Date(),
          hashtags: [newTag],
        });
        newTweet.save().then(() => {
          res.json({result : true})
      })
    })}
    else{
      tag =data.id
      const newTweet = new Tweet({
        user: req.body.userObjectId,
        message: req.body.message,
        date: new Date(),
        hashtags: [tag], 
    });
    newTweet.save().then(() => {res.json({result : true})})
  }
})
})

// DELETE a tweet 
router.delete('/tweets', (req,res) => {
  Tweet.deleteOne({_id:req.body.tweetObjectId})
.then(() => {
  res.json({result : true, message : "tweet supprimé"})
})
})

// POST hashtag
router.post('/tweets/hashtag', (req,res) => {
  const newHashtag = new Hashtag({
    name: req.body.hashtag,
  })
  newHashtag.save().then(() => {
    res.json({result:true})
  })
});

// GET tweets with hashtag as params
router.get('/tweets/:hashtag', (req, res) => {
  Tweet.find().populate('hashtags')
  .then(data => {
    console.log(data)
    let results = [];
    data.forEach((element) => { 
      let tagExists = element.hashtags.some((x) => x.name === req.params.hashtag)
      if (tagExists) {
      results.push(element)
      console.log(`element ${element}`)
      
    }
  })
    if(results.length !== 0){
      res.json({ result: true, tweets : results });
    } else {
      res.json({ result: false, error: 'No hashtag found' });
    }
  })
})

// GET hashtags
router.get('/hashtags', (req,res) => {
  Hashtag.find()
  .then(data =>{
    res.json({result : true, hashtags: data.map((e) => e.name)})
  })
})
 
//POST like 
router.post('/tweets/like', (req,res) => {
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
