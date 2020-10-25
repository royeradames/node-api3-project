// code away!
// libraries
const express = require("express")
const morgan = require('morgan')
const logger = require('./middleware/logger')
// routers
const PostRouter= require('./posts/postRouter')
const userRouter = require('./users/userRouter')

const server = express()
const port = process.env.PORT || 4000

// build in middleware
server.use(express.json())
// custome middleware
server.use(logger)
server.use('/posts',PostRouter)
server.use('/users',userRouter)

server.use("/greet/:name", (req, res) => {
    const greeting = process.env.GREETING || "Hello";
    res.status(200).send(`<h1>${greeting} ${req.params.name}</h1>`);
});

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
