const mongoose = require('mongoose')
const assert = require('node:assert')
const { test, beforeEach, after, describe } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

describe('Login tests', () => {
  beforeEach( async () => {
    await User.deleteMany({})
    const users = await helper.initialUsers()
    await User.insertMany(users)

    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlog)
  })
  test('Login succeeds with correct credentials', async () => {
    const credentials = {
      username: 'lewishamilton',
      password: 'password123'
    }
    const result = await api
      .post('/api/login')
      .send(credentials)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
    assert.ok(result.body.token)
    assert.strictEqual(result.body.username, credentials.username)
  })
})
after( async () => {
  await mongoose.connection.close()
})