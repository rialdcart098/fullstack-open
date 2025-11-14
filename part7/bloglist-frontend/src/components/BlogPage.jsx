import {useDispatch, useSelector} from 'react-redux'
import {useParams, useNavigate} from 'react-router-dom'
import {like, deleteBlog} from "../reducers/blogReducer.js";
import { setNotification } from '../reducers/notificationReducer.js';
import CommentForm from './CommentForm.jsx';
import {useState} from "react";


const BlogPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)
  const blog = useSelector((state) => state.blogs.find(
    blog => blog.id === params.id
  ))
  const [likes, setLikes] = useState(blog?.likes);
  if (!blog) return null;
  const handleRemove = () => {
    if (window.confirm(`Delete ${blog.title}? Can't be reversed.`)){
      dispatch(deleteBlog(blog.id))
      dispatch(setNotification({ message: 'Successfully deleted blog', good: true }, 5))
      navigate('/')
    }
  }
  const handleLike = () => {
    dispatch(like(blog.id))
    setLikes(likes + 1)
    dispatch(setNotification({ message: `You liked ${blog.title}`, good: true }, 5))
  }
  return (
    <div>
      <h2 className="font-bold text-3xl">
        {blog.title} by {blog.author}
      </h2>
      <br />
      <a href={blog.url}>
        {blog.url}
      </a>
      <p>
        Likes:
        <span className="likes-value mx-2">
          {likes}
        </span>
        {user && (
            <button
              onClick={handleLike}
              className='hover:bg-emerald-200 cursor-pointer p-2 bg-blue-200 text-white rounded-2xl font-momo-trust-display hover:drop-shadow-[0_0_6px_rgba(164,244,207,1)] transition-all ease-in-out'
            >
              <img src='../../public/hand-thumbs-up-fill.svg' />
            </button>
        )}
      </p>
      <div>
        <h3 className='font-bold text-2xl'>Comments</h3>
        {user && <CommentForm />}
        <ul className='list-disc list-inside'>
          {[...blog.comments].map(c => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
      <p>added by {blog.user.name}</p>
      {blog.user.id === user?.id && (
        <button
          onClick={handleRemove}
          className='text-white text-4xl '
        >
          Delete
        </button>
      )}
    </div>
  );
}
export default BlogPage