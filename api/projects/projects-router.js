// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const getProjects = await Projects.get(req.query)
        res.status(200).json(getProjects)
    } catch (err) {
        next(err)
    }
})


module.exports = router
