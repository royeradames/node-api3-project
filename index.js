// code away!
// libraries
const express = require("express")
const morgan = require('morgan')

// routers
const PostRouter= require('./posts/postRouter')
const userRouter = require('./users/userRouter')

const server = express()
const port = 4000

// build in middleware
server.use(express.json())
// custome middleware
server.use('/posts',PostRouter)
server.use('/users',userRouter)


server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
