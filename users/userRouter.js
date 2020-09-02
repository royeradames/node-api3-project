const express = require('express');
const {get,getById, getUserPosts, remove} = require('./userDb');
const { response } = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  
});

// done
router.get('/', (req, res) => {
  // do your magic!
    try {
      get()
    .then(allUsers => {
      res.status(200).json(allUsers)
    })
    } catch (error) {
      res.status(500).json({error: 'Server could not get all users'})
    }
});

//done
router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  try {
    res.status(200).json(req.user)
  } catch (error) {
    res.status(500).json({error: 'server cannot find user by id'})
  }
});

// done
router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  try {
    console.log(req.user.id)
    getUserPosts(req.user.id)
      .then(posts => {
        console.log(posts)
        res.status(200).json(posts)
      })
  } catch (error) {
    res.status(500).json({error: 'server cannot get the user posts'})
  }
});

//done
router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  try {
    
    remove(req.user.id)
    .then(resp => {
      res.status(200).json({
        message: 'user delete',
        user: req.user
      })
    })

/*

{
  "id": 1,
  "name": "Frodo Baggins"
}
{
        "id": 2,
        "name": "Samwise Gamgee"
    }
*/
  } catch (error) {
    res.status(500).json({error: 'server cannot delete the user posts'})
    
  }
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!

});

//custom middleware

function validateUserId (req, res, next) {
    getById(req.params.id)
        .then(user => {
          console.log(user)
            if (user) {
              req.user = user
            } else {
              res.status(400).json({ error: 'User not found' })
            }
            next()
        })
}


function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
