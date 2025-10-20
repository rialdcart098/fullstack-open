import { useState } from 'react'
import TextInput from './TextInput'
import blogService from '../services/blogs'

const BlogForm = ({ setBlogs, blogs, setNotification, toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(newBlog))
      setNotification({message: 'Added blog', good: true})
      toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch {
      setNotification({message: 'Input all details', good: false })
    }
  }
  return (
    <form onSubmit={handleBlog}>
      <div>
        <TextInput
          name="title"
          type="text"
          value={title}
          setValue={setTitle}
        />
        <TextInput
          name="author"
          type="text"
          value={author}
          setValue={setAuthor}
        />
        <TextInput
          name="url"
          type="text"
          value={url}
          setValue={setUrl}
        />
        <button type="submit">Create</button>
      </div>
    </form>
  )

}
export default BlogForm