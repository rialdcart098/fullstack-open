import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [good, setGood] = useState(true)
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
    setGood(true)
    setNotification('Logged out')
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} setNotification={setNotification} good={good} />
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logOut}>Log Out</button>
          <BlogForm setBlogs={setBlogs} blogs={blogs} setNotification={setNotification} setGood={setGood} />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
      {!user && <Login setUser={setUser} setNotification={setNotification} setGood={setGood} />}
    </div>
  )
}

export default App