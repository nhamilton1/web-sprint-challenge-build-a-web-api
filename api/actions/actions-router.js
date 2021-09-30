// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const getProjects = await Actions.get(req.query)
        res.status(200).json(getProjects)
    } catch (err) {
        next(err)
    }
})

module.exports = router
