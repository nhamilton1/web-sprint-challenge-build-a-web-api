const express = require('express');
const server = express();
const { logger } = require('./projects/projects-middleware')
// Configure your server here
server.use(express.json())
// Build your actions router in /api/actions/actions-router.js
// const actionRouter = require('./actions/actions-router')
// Build your projects router in /api/projects/projects-router.js
const projectsRouter = require('./projects/projects-router')
// Do NOT `server.listen()` inside this file!

server.use('/api/projects', logger, projectsRouter)

server.get('/', logger, (req, res) => {
    res.send(`<h2>sprint challenge</h2>`)
})

module.exports = server;
