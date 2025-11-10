const express = require('express')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const path = require('path')

const app = express()
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((err) => {
    logger.error('Failed to connect to MongoDB:', err.message)
  })
app.use(express.json())
app.use('/', express.static(path.join('..', 'bloglist-frontend', 'dist')))
app.use('/api/blogs', middleware.tokenExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test'){
  const testsRouter = require('./controllers/tests')
  app.use('/api/testing', testsRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app