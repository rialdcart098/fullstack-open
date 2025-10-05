const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const initialBlog = [
  {
    author: 'David Beckham',
    title: 'The art of Football',
    url: 'https://amazon.com/',
  },
  {
    author: 'Farhan Hossain',
    title: 'Algebra II Homework',
    url: 'https://classroom.google.com/'
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    author: 'Thierry Henry',
    title: 'The French Usain Bolt',
    url: 'https://netflix.com/',
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
const initialUsers = async () => [
  {
    username: 'lewishamilton',
    name: 'Lewis',
    passwordHash: await bcrypt.hash('password123', 10)
  }
]
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
module.exports = { initialBlog, nonExistingId, blogsInDb, usersInDb, initialUsers }
