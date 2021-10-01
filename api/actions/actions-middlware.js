// add middlewares here related to actions
const Actions = require('./actions-model')
const yup = require('yup')

async function validateActionId(req, res, next) {
  try {
    const actionsIdCheck = await Actions.get(req.params.id)
    if (actionsIdCheck) {
      req.actions = actionsIdCheck
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

const actionSchema = yup.object().shape({
    notes: yup
      .string()
      .typeError('text must be a string')
      .required('notes is required'),
    description: yup
      .string()
      .typeError('text must be a string')
      .max(128)
      .required('descript is required'),
    project_id: yup
        .number()
        .typeError('must be a number')
        .required('id is required')
})

async function validateAction (req, res, next) {
    try {
      const validatedAction = await actionSchema.validate(
        req.body,
        { strict: false, stripUnknown: true }
      )
      req.action = validatedAction
      next()
    } catch (err) {
      res.status(400).json({
        message: "missing required field" 
      })
    }
  }

module.exports = {
    validateActionId,
    validateAction,
}