// Write your "projects" router here!
const express = require('express')
const { validateProjectId } = require('./projects-middleware')
const Projects = require('./projects-model')
const router = express.Router()


router.get('/', async (req, res, next) => {
    try {
        const getProjects = await Projects.get(req.projects)
        res.status(200).json(getProjects)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.projects)
})


module.exports = router
