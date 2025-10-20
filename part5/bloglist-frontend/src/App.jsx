import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
      console.log(user)
    }
  }, [])
  const logOut = () => {
    window.localStorage.removeItem('user')
    setUser(null)
    setNotification({ message: 'Logged out successfully', good: true })
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} setNotification={setNotification} />
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logOut}>Log Out</button>
          <Togglable
            visible={visible}
            toggleVisibility={() => setVisible(!visible)}
            buttonLabel="Add Blog"
          >
            <h2>Add a blog</h2>
            <BlogForm setBlogs={setBlogs} blogs={blogs} setNotification={setNotification} toggleVisibility={() => setVisible(!visible)} />
          </Togglable>
        </div>
      )}
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
      {!user && (
        <Togglable
          visible={visible}
          toggleVisibility={() => setVisible(!visible)}
          buttonLabel="Log In"
        >
          <h2>Log In</h2>
          <Login setUser={setUser} setNotification={setNotification} />
        </Togglable>
      )}
    </div>
  )
}

export default App