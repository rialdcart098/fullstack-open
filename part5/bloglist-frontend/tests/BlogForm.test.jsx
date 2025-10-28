import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'
import BlogForm from '../src/components/BlogForm'
import blogsService from '../src/services/blogs'

describe("Blog functionality works", () => {
  const userData = {
    username: 'rialdcart098',
    name: 'cart',
    id: '68ff699ef339460549c27236'
  }
  const testBlog = {
    author: 'Lionel Messi',
    title: 'The Best Footballer',
    url: 'https://example.com/',
    likes: 1000
  }
  test("BlogForm renders only the blog title and author by default", () => {
    const { container } = render(<Blog blog={testBlog} user={userData} />)
    const element = screen.getByText('The Best Footballer by Lionel Messi')
    expect(element).toBeDefined()
    const extraDiv = container.querySelector('.togglableHidden')
    screen.debug()
    expect(extraDiv).toBeDefined()
  })
  test('BlogForm shows url and likes when the view button is clicked', async () => {
    const { container } = render(<Blog blog={testBlog} user={userData} />)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = container.querySelector('.togglableVisible')
    expect(element).toBeDefined()
  })
  test("When the like button is clicked twice, the event handler is called twice", async () => {
    render(<Blog blog={testBlog} user={userData} />)
    const user = userEvent.setup()
    let amtLikes = testBlog.likes
    blogsService.update = vi.fn().mockImplementation(async () => {
      amtLikes += 1
      return { likes: amtLikes }
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
  test('Blog creation works', async () => {
    const blogs = []
    const setBlogs = vi.fn()
    const returnedBlog = {
      title: 'giddy giddy goo',
      author: 'michael jordan',
      url: 'https://gitub.com/'
    }
    blogsService.create = vi.fn().mockResolvedValue(returnedBlog)
    render(<BlogForm blogs={blogs} setBlogs={setBlogs} />)

  const user = userEvent.setup()
  const addButton = screen.getByRole('button', { name: 'Add Blog' })
  await user.click(addButton)

  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')

  await user.type(titleInput, 'giddy giddy goo')
  await user.type(authorInput, 'michael jordan')
  await user.type(urlInput, 'https://gitub.com/')

  const createButton = screen.getByRole('button', { name: 'Create' })
    await user.click(createButton)

    expect(blogsService.create).toHaveBeenCalledWith({
      title: 'giddy giddy goo',
      author: 'michael jordan',
      url: 'https://gitub.com/'
    })
    expect(setBlogs).toHaveBeenCalledWith([returnedBlog])
  })
})