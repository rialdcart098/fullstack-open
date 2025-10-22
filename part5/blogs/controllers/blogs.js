const blogsRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const notes = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(notes)
})
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) return response.status(401).json({ error: 'token missing or invalid' })
  if (!body.title || !body.url) return response.status(400).json({ error: 'title or url missing' })
  const user = await User.findById(decodedToken.id)
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
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log(decodedToken)
  if (!decodedToken.id) return response.status(401).json({ error: 'token missing or invalid' })
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== decodedToken.id) return response.status(401).json({ error: 'only the creator can delete a blog' })
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})
blogsRouter.put('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) return response.status(401).json({ error: 'token missing or invalid' })
  const user = await User.findById(decodedToken.id)
  if (!user) return response.status(400).json({ error: 'User not found' })
  
  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(404).end()
  blog.likes++
  const updatedBlog = await blog.save()
  response.json(updatedBlog)
})
module.exports = blogsRouter