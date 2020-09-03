const express = require('express');
const { get, getById } = require('./postDb')
const router = express.Router();
// done
router.get('/', (req, res) => {
  // do your magic!
  get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: 'server get all posts' })
    })
});
//done
router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  getById(req.params.id)
    .then(post => {
      console.log(`Line 21 --${post}`)
      
      post ? res.status(200).json(post) : res.status(404).json({error: 'Post Id not found'})
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({error: 'server could not get post by its id'})
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  getById(req.params.id)
    .then(post => {
      console.log(post)
      req.post = post
      next()
    })
    .catch(error => {
      res.status(500).json({ error: 'server cannot use your post data' })
    })


}

module.exports = router;

// try {
//   // if (req.body.text && req.body.user_id) {
//   //   next()
//   // } else {
//   //   res.status(400).json({error: 'Please send require data'})
//   // }
//   req.body.text && req.body.user_id ? next() : res.status(400).json({error: 'Please send require data'})
// } catch (error) {
//   res.status(500).json({error: 'server cannot use your post data'})
// }