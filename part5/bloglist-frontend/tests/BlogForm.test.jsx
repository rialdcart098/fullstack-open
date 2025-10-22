import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'
test("BlogForm renders only the blog title and author by default", () => {
  const blogTest = {
    author: 'Lionel Messi',
    title: 'The Best Footballer',
    url: 'https://messi.com/en/estadisticas-barcelona/',
    likes: 1000
  }
  const user = {
    name: 'Test User',
    username: 'testuser',
    id: '1234567890'
  }
  const { container } = render(<Blog key='1' user={user} blog={blogTest} />)
  const element = screen.getByText('The Best Footballer by Lionel Messi')
  expect(element).toBeDefined()
  const extraDiv = container.querySelector('.togglableHidden')
  expect(extraDiv).toBeDefined()
})
test('BlogForm shows url and likes when the view button is clicked', async () => {

})