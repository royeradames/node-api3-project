module.exports = (req, res, next) => {
    if (req.headers.authorization === "asdjf923rio2y3rasdfasd9fu9asdfasduf9asdf") {
        next()
    }
    else {
        res.status(400).end()
    }
}