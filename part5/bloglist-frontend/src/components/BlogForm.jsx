import { useState } from 'react'
import blogService from '../services/blogs'

import TextInput from './TextInput'
import Togglable from './Togglable'

const BlogForm = ({ setBlogs, blogs, setNotification, toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const handleBlog = async (event) => {
    event.preventDefault()
    if (!title || !author || !url) {
      setNotification({ message: 'All fields are required', good: false })
      return
    }
    const newBlog = await blogService.create({ title, author, url })
    setBlogs(blogs.concat(newBlog))
    setNotification({message: 'Added blog', good: true})
    toggleVisibility()
    setVisible(true)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <Togglable
      buttonLabel="Add Blog"
      toggleVisibility={() => setVisible(!visible)}
      visible={visible}
    >
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
    </Togglable>
  )

}
export default BlogForm