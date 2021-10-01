const express = require('express');
const server = express();
const { logger } = require('./projects/projects-middleware')
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
const actionRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')
server.use(express.json())

server.use('/api/projects', logger, projectsRouter)
server.use('/api/actions', logger, actionRouter)

server.get('/', logger, (req, res) => {
    res.send(`<h2>sprint challenge</h2>`)
})

module.exports = server;
