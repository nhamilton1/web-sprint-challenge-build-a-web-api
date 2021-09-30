// add middlewares here related to projects
const Projects = require('./projects-model')

function logger(req, res, next) {
    console.log(`${req.method} request to ${req.originalUrl}`)
    next()
}

async function validateProjectId(req, res, next) {
    try {
      const projectIdCheck = await Projects.get(req.params.id)
      if (projectIdCheck) {
        req.projects = projectIdCheck
        next()
      } else {
        res.status(404).json({
          status: 404,
        })
      }
    } catch (err) {
      next(err)
    }
  }


module.exports = {
    logger,
    validateProjectId,

}
  