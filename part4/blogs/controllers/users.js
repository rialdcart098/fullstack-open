const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)
})
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!password || password.length < 3) return response.status(401).json({ error: 'Password is required & must be at least 3 characters long' })
  if (!username || username.length < 3) return response.status(401).json({ error: 'Username is required & must be at least 3 characters long' })
  const existingUser = await User.find({ username })
  if (existingUser.length > 0) return response.status(401).json({ error: 'Username already taken' })
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    passwordHash,
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter