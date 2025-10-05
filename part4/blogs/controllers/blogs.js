const blogsRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const notes = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(notes)
})
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)
  if (!user) return response.status(400).json({ error: 'User not found' })
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user._id
  })
  const addedBlog = await blog.save()
  await addedBlog.populate('user', { username: 1, name: 1 })
  user.blogs = user.blogs.concat(addedBlog._id)
  await user.save()
  response.status(201).json(addedBlog)
})
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) return response.json(blog)
  response.status(404).end()
})
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})
blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const updatedBlog = await Blog.findById(request.params.id)
  if (!updatedBlog) return response.status(404).end()
  updatedBlog.title = title
  updatedBlog.author = author
  updatedBlog.url = url
  updatedBlog.likes = likes + 1
  const savedBlog = await updatedBlog.save()
  response.json(savedBlog)
})
module.exports = blogsRouter