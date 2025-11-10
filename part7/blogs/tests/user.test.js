const mongoose = require('mongoose')
const assert = require('node:assert')
const { test, beforeEach, after, describe } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')
const api = supertest(app)

describe('When there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const users = await helper.initialUsers()
    await User.insertMany(users)
  })
  test('Users are returned as JSON', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('Creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'johndoe',
      name: 'John Doe',
      password: 'securepassword',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    const usernames = usersAtEnd.map(u => u.username)
    assert.strictEqual(usernames.includes(newUser.username), true)
  })
  describe('When inserting invalid details', () => {
    test('Creation fails with error 400 if username is too short', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: 'jd',
        name: 'John Doe',
        password: 'securepassword',
      }
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(401)
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      assert.strictEqual(result.body.error.includes('Username is required & must be at least 3 characters long'), true)
    })
    test('Creation fails with error 400 if password is too short', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: 'johndoe',
        name: 'John Doe',
        password: 'pw',
      }
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(401)
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      assert.strictEqual(result.body.error.includes('Password is required & must be at least 3 characters long'), true)
    })
    test('Creation fails with error 400 if username is not unique', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: 'lewishamilton',
        name: 'Lewis',
        password: 'password12389'
      }
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(401)
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      assert.strictEqual(result.body.error.includes('Username already taken'), true)
    })
  })
})
after(async () => {
  await mongoose.connection.close()
})