import { useState, useEffect } from 'react'
import './App.css'
import Notification from './Notification'
import axios from 'axios'

function App() {
    const [blogs, setBlogs] = useState([])
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState('')
    const [error, setError] = useState(false)

    const handleChange = (setter) => (event) => {
        setter(event.target.value)
    }

    useEffect(() => {
        axios
            .get('/api/blogs')
            .then((response) => {
                setBlogs(response.data)
            })
    }, [])

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            likes: 0,
        }
        axios
            .post('/api/blogs', blogObject)
            .then((response) => {
                setBlogs(blogs.concat(response.data))
                setError(false)
                setNotification('Added blog!')
                setNewTitle('')
                setNewAuthor('')
                setNewUrl('')
            })

    }

    return (
        <div>
            <Notification setMessage={setNotification} message={notification} error={error} />
            <h1>Blogs</h1>

            {blogs
                .filter(
                    (blog) =>
                        blog && blog.title.toLowerCase().includes(filter.toLowerCase())
                )
                .map((blog) => (
                    <div key={blog.id}>
                        {blog.title} by {blog.author}{' '}
                        <a href={blog.url}>check it here</a>
                    </div>
                ))}

            <form onSubmit={addBlog}>
                <input
                    placeholder="Title"
                    value={newTitle}
                    onChange={handleChange(setNewTitle)}
                />
                <input
                    placeholder="Author"
                    value={newAuthor}
                    onChange={handleChange(setNewAuthor)}
                />
                <input
                    placeholder="Url"
                    value={newUrl}
                    onChange={handleChange(setNewUrl)}
                />
                <button type="submit">Add Blog</button>
            </form>

            <input
                placeholder="Search by title"
                value={filter}
                onChange={handleChange(setFilter)}
            />
        </div>
    )
}

export default App