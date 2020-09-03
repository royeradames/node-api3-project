module.exports = function (req, res, next) {
    // do your magic!
  
    try {
      console.log(req.body.text)
      console.log(req.body.user_id)
      if (req.body.text && req.body.user_id) {
        console.log(`hitting next() inside validatePost`)
        next()
      } else {
        res.status(400).json({ error: 'You need text and user_id' })
      }
    } catch (error) {
      res.status(500).json({ error: 'server cannot validate your post' })
  
    }
  }