const loginWith = async (username, password, page) => {
  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'Log in' }).click()
}

export { loginWith }