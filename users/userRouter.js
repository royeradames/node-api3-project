const express = require('express');
const { get, getById, getUserPosts, remove, update, insert } = require('./userDb');
const postDB = require('../posts/postDb');
const { response } = require('express');

const router = express.Router();
//done
router.post('/', validateUser, (req, res) => {
  // do your magic!
  try {
    console.log(req.body)
    insert(req.body)
      .then(newUser => {
        // console.log(`inside post / response --> ${newUser}`)
        if(newUser) {
          res.status(200).json(newUser)
        } else {
          res.status(400).json({error: 'User was not created'})
        }
      })
      .catch(err => {
        // console.log(`error on catch inside post / ${err}`)
        res.status(400).json({error: 'Did not receive the require user data'})
      })
  } catch (error) {
    res.status(500).json({ error: 'server cannot create new user' })
  }
});
//done
router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
  // do your magic!
  try {
    postDB.insert(req.body)
      .then(newPost => {
        // console.log(newPost)
        if(newPost) res.status(200).json(newPost)
        
      })
      .catch(err => {
        // console.log(err)
        res.status(400).json({error: 'Did not receive require data'})
      })
  } catch (error) {
    res.status(500).json({ error: 'server cannot create new post' })
  }
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
    res.status(500).json({ error: 'Server could not get all users' })
  }
});

//done
router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  try {
    res.status(200).json(req.user)
  } catch (error) {
    res.status(500).json({ error: 'server cannot find user by id' })
  }
});

// done
router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  try {
    // console.log(req.user.id)
    getUserPosts(req.user.id)
      .then(posts => {
        // console.log(posts)
        res.status(200).json(posts)
      })
  } catch (error) {
    res.status(500).json({ error: 'server cannot get the user posts' })
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
    res.status(500).json({ error: 'server cannot delete the user posts' })

  }
});

router.put('/:id', validateUser, validateUserId, (req, res) => {
  // do your magic!
  try {
    // console.log(req.user.id)
    // console.log(req.body.name)

    update(req.user.id, req.body)
      .then(updatedRecordsCount => {
        // console.log(updatedRecordsCount)
        if (updatedRecordsCount) {
          // console.log(updatedRecordsCount)
          res.status(200).json({ message: `Succesfully update user of id of ${req.user.id}`, id: req.user.id })
        } else {
          res.status(400).json({ error: 'user did not update' })
        }
      })
  } catch (error) {
    res.status(500).json({ error: 'server cannot delete the user posts' })
  }
});

//custom middleware

function validateUserId(req, res, next) {

  try {
    // console.log(req.params.id)
    getById(req.params.id)
      .then(user => {
        // console.log(`user on validateUserId -->${user}`)
        if (user) {
          req.user = user
          // console.log(`user on validateUserId if statement-->${user}`)
          next()
        } else {
          res.status(400).json({ error: 'User not found' })
        }
      })
  } catch (error) {
    res.status(500).json({ error: 'server cannot validate your user id' })

  }
}


function validateUser(req, res, next) {
  // do your magic!
  try {
    const name = req.body.name
    // console.log(name)
    if (name) {
      req.body.name = name
      // console.log('inside if statment of validateUser, the next() is right after it')
      next()
    } else {
      res.status(400).json({ error: 'name is require' })
    }
  } catch (error) {
    res.status(500).json({ error: 'server cannot validate your user' })

  }
}

function validatePost(req, res, next) {
  // do your magic!

  try {
    // console.log(req.body.text)
    // console.log(req.body.user_id)
    if (req.body.text && req.body.user_id) {
      // console.log(`hitting next() inside validatePost`)
      next()
    } else {
      res.status(400).json({ error: 'You need text and user_id' })
    }
  } catch (error) {
    res.status(500).json({ error: 'server cannot validate your post' })

  }
}

module.exports = router;
