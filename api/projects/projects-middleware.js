// add middlewares here related to projects
const Projects = require('./projects-model')
const yup = require('yup')

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

const projectSchema = yup.object().shape({
  name: yup
    .string()
    .typeError('text must be a string')
    .required('name is required'),
  description: yup
    .string()
    .typeError('text must be a string')
    .required('descript is required'),
})


async function validateProject (req, res, next) {
  try {
    const validatedProject= await projectSchema.validate(
      req.body,
      { strict: false, stripUnknown: true }
    )
    req.description = validatedProject
    next()
  } catch (err) {
    res.status(400).json({
      message: "missing required field" 
    })
  }
}

module.exports = {
  logger,
  validateProjectId,
  validateProject,

}
