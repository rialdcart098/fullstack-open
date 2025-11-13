import {useDispatch, useSelector} from 'react-redux'
import {useParams, useNavigate} from 'react-router-dom'
import {like, deleteBlog} from "../reducers/blogReducer.js";
import { setNotification } from '../reducers/notificationReducer.js';


const BlogPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)
  const blog = useSelector((state) => state.blogs.find(
    blog => blog.id === params.id
  ))
  if (!blog) return null;
  
  const handleRemove = () => {
    if (window.confirm(`Delete ${blog.title}? Can't be reversed.`)){
      dispatch(deleteBlog(blog.id))
      dispatch(setNotification({ message: 'Successfully deleted blog', good: true }, 5))
      navigate('/')
    }
  }
  const handleLike = () => {
    if (user){
      dispatch(like(blog.id))
    } else {
      dispatch(setNotification({ message: 'You must be logged in to like blogs', good: false }, 5))
    }
  }
  return (
    <div>
      <h2 className="font-bold text-3xl">
        {blog.title} by {blog.author}
      </h2>
      <br />
      <a href={blog.url}>{blog.url}</a>
      <p>
        Likes: <span className="likes-value">{blog.likes}</span>
        <button onClick={handleLike}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      {blog.user.id === user?.id && (
        <button onClick={handleRemove}>Delete</button>
      )}
    </div>
  );
}
export default BlogPage