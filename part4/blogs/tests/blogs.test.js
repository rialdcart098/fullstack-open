const mongoose = require('mongoose')
const { assert } = require('node:assert')
const { test, beforeEach, after, describe } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const api = supertest(app)

describe('With the current blog data', () => {
    beforeEach( async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlog)
    })
    test('blogs are returned as JSON', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('all notes are returned', async () => {
        const res = await api.get('/api/blogs')
        assert.strictEqual(res.body.length, helper.initialBlog.length)
    })
    test('A specific blog can be returned', async () => {
        const res = await api.get('/api/blogs/')
        const author = res.map(post => post.author)
        assert.strictEqual(author.includes('Thierry Henry'))
    })
    describe('When looking for a single blog', () => {
        test('Succeeds with a valid ID', async () => {
            const start = await helper.blogsInDb
            const specific = start[0]
            const res = await api
                .get(`/api/blogs/${specific.id}`)
        })
    })
})
