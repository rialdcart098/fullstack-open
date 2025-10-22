import Togglable from './Togglable'
import blogService from '../services/blogs'
import { useState } from 'react'
const Blog = (props) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(props.blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleLikes = async () => {
    await blogService.update(props.blog.id)
    console.log(props)
    setLikes(likes => likes + 1)
  }
  const removeBlog = async () => {
    if (window.confirm(`Delete ${props.blog.title}? Can't be reversed`)){
      await blogService.remove(props.blog.id)
    }
  }
  return (
    <div style={blogStyle}>
      {props.blog.title} by {props.blog.author}
      <Togglable
        buttonLabel="view"
        toggleVisibility={() => setVisible(!visible)}
        visible={visible}
      >
        <div>
          <a href={props.blog.url}>{props.blog.url}</a>
          <p>
            Likes: {likes}
            <button onClick={handleLikes}>like</button>
          </p>
          <p>{props.blog?.user?.name}</p>
          {props.blog?.user?.id === props.user?.id && (
            <button onClick={removeBlog}>delete</button>
          )}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog