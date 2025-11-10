const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// Delete all blogs and users before every test to keep tests isolated and clean
router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})
module.exports = router