const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, addBlog } = require('./helper')

describe('Blog app', function() {
  const username = 'rialdcart098'
  const name = 'cart'
  const password = 'goldmansachs'
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: { username, name, password }
    })
    await page.goto('/')
  })
  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible()
  })
  describe('Login', async () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(username, password, page)
      await expect(page.getByText(`${name} logged in`)).toBeVisible()

      const loggedDiv = page.locator('.notification-good')
      await expect(loggedDiv).toHaveText(`Welcome back ${name}`)
    })
    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(username, 'jpmorgan', page)
      await expect(page.getByText(`${name} logged in`)).not.toBeVisible()

      const errorNotification = page.locator('.notification-bad')
      await expect(errorNotification).toHaveText('Username or password is incorrect')
    })
  })
  describe('When logged in', async () => {
    author
    beforeEach(async ({ page }) => {
      await loginWith(username, password, page)
    })
    test('a new blog can be created', async ({ page }) => {
      await addBlog(page, )
    })
  })
})