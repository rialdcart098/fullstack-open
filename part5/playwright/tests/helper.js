const loginWith = async (username, password, page) => {
  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'Log in' }).click()
}
const addBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'Add Blog' }).click()
  await page.getByLabel('title').fill(title)
  await page.getByLabel('author').fill(author)
  await page.getByLabel('url').fill(url)
  await page.getByRole('button', { name: 'Create' }).click()
}
export { loginWith, addBlog }