// add middlewares here related to projects
const Projects = require('./projects-model')

function logger(req, res, next) {
    console.log(`${req.method} request to ${req.originalUrl}`)
    next()
}


module.exports = {
    logger,
}
  