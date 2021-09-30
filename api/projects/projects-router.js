// Write your "projects" router here!
const express = require('express')
const { validateProjectId, validateProject, validateProjectPut } = require('./projects-middleware')
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

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
})

router.put('/:id', validateProjectId, validateProjectPut, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(next)
})

module.exports = router
