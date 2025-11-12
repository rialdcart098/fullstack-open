import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {like} from "../reducers/blogReducer.js";


const BlogPage = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs.find(
    blog => blog.id === params.id
  ))
  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <br />
      <a href={blog.url}>{blog.url}</a>
      <p>
        Likes: <span className="likes-value">{blog.likes}</span>
        <button onClick={dispatch(like(blog.id))}>like</button>
      </p>
    </div>
  );
}