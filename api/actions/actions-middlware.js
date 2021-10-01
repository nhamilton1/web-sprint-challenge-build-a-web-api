// add middlewares here related to actions
const Actions = require('./actions-model')
// const yup = require('yup')

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

module.exports = {
    validateActionId,
}