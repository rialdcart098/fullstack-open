const mongoose = require('mongoose')
const assert = require('node:assert')
const { test, beforeEach, after, describe } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

describe('With the current blog data', () => {
  beforeEach( async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlog)
    await User.deleteMany({})
    const users = await helper.initialUsers()
    await User.insertMany(users)
  })
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs')
    assert.strictEqual(res.body.length, helper.initialBlog.length)
  })
  test('A specific blog can be returned', async () => {
    const res = await api.get('/api/blogs/')
    const author = res.body.map(post => post.author)
    assert.strictEqual(author.includes('David Beckham'), true)
  })
  test('The unique identifier property of the blog posts is named "id"', async () => {
    const res = await api.get('/api/blogs')
    const id = res.body.map(post => post.id)
    assert.strictEqual(id.length, helper.initialBlog.length)
  })
  describe('When looking for a single blog', () => {
    test('Succeeds with a valid ID', async () => {
      const start = await helper.blogsInDb()
      const specific = start[0]
      const res = await api
        .get(`/api/blogs/${specific.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      assert.deepStrictEqual(res.body, specific)
    })
  })
  describe('When adding data', async () => {
    test('A valid blog can be added', async () => {
      const tokenResponse = await api
        .post('/api/login')
        .send({
          username: 'lewishamilton',
          password: 'password123'
        })
      const token = tokenResponse.body.token
      const newBlog = {
        author: 'Thierry Henry',
        title: 'The French Usain Bolt',
        url: 'https://netflix.com/',
        likes: 12,
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const endBlogs = await helper.blogsInDb()
      assert.strictEqual(endBlogs.length, helper.initialBlog.length + 1)
      const authors = endBlogs.map(blog => blog.author)
      assert.strictEqual(authors.includes('Thierry Henry'), true)
    })
    test('If the likes property is missing, it will default to 0', async () => {
      const newBlog = {
        author: 'Cristiano Ronaldo',
        title: 'The GOAT',
        url: 'https://google.com/',
      }
      const tokenResponse = await api
        .post('/api/login')
        .send({
          username: 'lewishamilton',
          password: 'password123'
        })
      const token = tokenResponse.body.token
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const endBlogs = await helper.blogsInDb()
      const added = endBlogs.find(blog => blog.author === 'Cristiano Ronaldo')
      assert.strictEqual(added.likes, 0)
    })
  })
  test('If the title and url properties are missing, respond with status code 400 Bad Request', async () => {
    const newBlog = {
      author: 'Neymar Jr',
      likes: 15
    }
    const tokenResponse = await api
      .post('/api/login')
      .send({
        username: 'lewishamilton',
        password: 'password123'
      })
    const token = tokenResponse.body.token
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
    const endBlogs = await helper.blogsInDb()
    assert.strictEqual(endBlogs.length, helper.initialBlog.length)
  })
  test('Invalid token returns 401 Unauthorized', async () => {
    const newBlog = {
      author: 'michaelschumacher',
      title: 'F1 Legend',
      url: 'https://f1.com/',
      likes: 20
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer bear')
      .send(newBlog)
      .expect(401)
    const endBlogs = await helper.blogsInDb()
    assert.strictEqual(endBlogs.length, helper.initialBlog.length)
  })
})
after(async () => {
  await mongoose.connection.close()
})