const express = require('express');
const { get, getById, remove, update } = require('./postDb')
const validatePost = require('../middleware/validatePost')
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
      res.status(200).json(post)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: 'server could not get post by its id' })
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
});

router.put('/:id', validatePost, validatePostId, (req, res) => {
  // do your magic!
  update(req.params.id, req.body)
    .then(updatePost => {
      console.log(updatePost)
      getById(req.params.id)
        .then(updatePost => {
          res.status(200).json(updatePost)
        })
        .catch(error => {
          console.log(error)
          res.status(500).json({ error: 'server could not get updated post' })

        })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: 'server could not change the post' })

    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  getById(req.params.id)
    .then(post => {
      console.log(` line 55`)
      console.log(post)

      req.post = post
      post ? next() : res.status(404).json({ error: 'Post Id not found' })

    })
    .catch(error => {
      res.status(500).json({ error: 'server cannot use your post data' })
    })


}

module.exports = router;
