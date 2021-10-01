// Write your "actions" router here!
const express = require('express')
const { validateActionId, validateAction } = require('./actions-middlware')
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

router.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.action)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(next)
})

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.action)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
})

router.delete('/:id', validateActionId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json(req.actions)
        })
        .catch(next)
})

module.exports = router
