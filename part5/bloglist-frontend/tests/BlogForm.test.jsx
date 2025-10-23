import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'
import BlogForm from '../src/components/BlogForm'
import blogsService from '../src/services/blogs'
describe("Blog functionality works", () => {
  test("Blog component renders only the blog title and author by default", () => {
    const user = {
      name: 'Lewis',
      username: 'lewishamilton',
      id: '68f58ee93cd743921f22c371'
    }
    const testBlog = {
      author: 'Lionel Messi',
      title: 'The Best Footballer',
      url: 'https://example.com/',
      likes: 1000
    }
    const { container } = render(<Blog blog={testBlog} user={user} />)
    const element = screen.getByText('The Best Footballer by Lionel Messi')
    expect(element).toBeDefined()
    const extraDiv = container.querySelector('.togglableHidden')
    screen.debug()
    expect(extraDiv).toBeDefined()
  })
  test('BlogForm shows url and likes when the view button is clicked', async () => {
    const userData = {
      name: 'Lewis',
      username: 'lewishamilton',
      id: '68f58ee93cd743921f22c371'
    }
    const testBlog = {
      author: 'Lionel Messi',
      title: 'The Best Footballer',
      url: 'https://example.com/',
      likes: 1000
    }
    const { container } = render(<Blog blog={testBlog} user={userData} />)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = container.querySelector('.togglableVisible')
    expect(element).toBeDefined()
  })
  test("When the like button is clicked twice, the event handler is called twice", async () => {
    const userData = {
      name: 'Lewis',
      username: 'lewishamilton',
      id: '68f58ee93cd743921f22c371'
    }
    const testBlog = {
      author: 'Lionel Messi',
      title: 'The Best Footballer',
      url: 'https://example.com/',
      likes: 1000
    }
    render(<Blog blog={testBlog} user={userData} />)
    const user = userEvent.setup()
    let amtLikes = testBlog.likes
    blogsService.update = vi.fn().mockImplementation(async () => {
      amtLikes += 1
      return { likes: amtLikes}
    })
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    for (let i = 0; i < 2; i++){
      await user.click(likeButton)
    }
    expect(blogsService.update).toHaveBeenCalledTimes(2)
    expect(screen.getByText(String(amtLikes))).toBeDefined()
  })
})
describe('BlogForm functionality works', () => {
  test('BlogForm component calls event handler appropriately and correctly renders content', async () => {

    const mockCreated = { title: 'The Worst Footballer', author: 'Cristiano Ronaldo', url: 'https://cristiano.com/' }
    blogsService.create = vi.fn().mockResolvedValue(mockCreated)
    const setNotification = vi.fn()
    const setBlogs = vi.fn()
    const toggleVisibility = vi.fn()
    const blogs = []
    const user = userEvent.setup()
    render(<BlogForm setBlogs={setBlogs} blogs={blogs} setNotification={setNotification} toggleVisibility={toggleVisibility} />)
    const titleInput = screen.getByLabelText('title')
    expect(titleInput).toBeDefined()
    const authorInput = screen.getByLabelText('author')
    const urlInput = screen.getByLabelText('url')
    const submitButton = screen.getByText('Create')

    await user.type(titleInput, 'The Worst Footballer')
    await user.type(authorInput, 'Cristiano Ronaldo')
    await user.type(urlInput, 'https://cristiano.com/')
    await user.click(submitButton)

    expect(blogsService.create).toHaveBeenCalledWith({
      title: 'The Worst Footballer',
      author: 'Cristiano Ronaldo',
      url: 'https://cristiano.com/'
    })
  expect(setBlogs).toHaveBeenCalledWith([mockCreated])
  expect(setNotification).toHaveBeenCalledWith({ message: 'Added blog', good: true })
  expect(toggleVisibility).toHaveBeenCalled()
  })
})