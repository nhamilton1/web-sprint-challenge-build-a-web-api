// Write your "actions" router here!
const express = require('express')
const { validateActionId } = require('./actions-middlware')
const Actions = require('./actions-model')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const getActions = await Actions.get(req.actions)
        res.status(200).json(getActions)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.actions)
})


module.exports = router
