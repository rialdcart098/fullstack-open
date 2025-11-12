const { test, expect, beforeEach, describe, afterEach } = require('@playwright/test')
const { loginWith, addBlog } = require('./helper')

describe('Blogs app', function() {
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
    const author = 'Lionel Messi'
    const title = 'The Best Footballer'
    const url = 'https://example.com/'
    beforeEach(async ({ page }) => {
      await loginWith(username, password, page)
      await addBlog(page, title, author, url)
    })
    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByText(`${title} by ${author}`)).toBeVisible()
    })
    test('a user can like a blog', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('1')).toBeVisible()
    })
    test('only the user who created a blog can delete it', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'delete' })).toBeVisible()
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'delete' }).click()
      await expect(page.getByText(`${title} by ${author}`)).not.toBeVisible()
    })
    test("other's cant delete a blog", async ({ page, request }) => {
      await page.getByRole('button', { name: 'Log out' }).click()
      const nonUser = 'jahshawnCarnegie'
      const nonName = 'jahshawn'
      const nonPass = 'janiaisthegoat'
      await request.post('/api/users', {
        data: { username: nonUser, name: nonName, password: nonPass }
      })
      
      await loginWith(nonUser, nonPass, page)
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
    })
    afterEach(async ({ page }) => {
      await page.getByRole('button', { name: 'Log out' }).click()
    })
  })
})