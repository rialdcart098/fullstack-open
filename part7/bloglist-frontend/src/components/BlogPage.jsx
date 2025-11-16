import {useDispatch, useSelector} from 'react-redux'
import {useParams, useNavigate} from 'react-router-dom'
import {like, deleteBlog} from "../reducers/blogReducer.js";
import { setNotification } from '../reducers/notificationReducer.js';
import CommentForm from './CommentForm.jsx';


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
    dispatch(like(blog.id))
    dispatch(setNotification({ message: `You liked ${blog.title}`, good: true }, 5))
  }
  return (
    <div className="grid w-full h-full grid-cols-2 grid-rows-[0.1fr_0.25fr_auto] overflow-hidden">
      <h2 className="flex items-center justify-center font-bold text-2xl col-span-2 text-blue-300 p-3 bg-blue-950 text-center">
        {blog.title} by {blog.author}
      </h2>
      <div className='row-start-2 row-end-3'>
        <p
        className="m-2 text-2xl text-blue-400 font-momo-trust-display">
          added by {blog.user.name}
        </p>
        <a href={blog.url}
           className="m-2 text-blue font-bold text-xl p-2 underline text-indigo-600 hover:text-indigo-300 transition-all ease-in-out">
          Read the blog here
        </a>
      </div>
      <div className="text-2xl text-blue-400 font-medium font-momo-trust-display row-start-3 row-end-4 col-span-1">
        Likes:
        <span className="likes-value mx-2 text-3xl">
          {blog.likes}
        </span>
        {user && (
            <button
              onClick={handleLike}
              className='m-3 hover:bg-emerald-200 cursor-pointer p-2 bg-blue-200 text-white rounded-2xl font-momo-trust-display hover:drop-shadow-[0_0_6px_rgba(164,244,207,1)] transition-all ease-in-out'
            >
              <img src='../../public/hand-thumbs-up-fill.svg' alt='like' />
            </button>
        )}
        {blog.user.id === user?.id && (
          <button
            onClick={handleRemove}
            className='bg-red-600 hover:shadow-[0_0_10px_rgba(220,38,38,0.7)] transition-all ease-in-out'
          >
            Delete
          </button>
        )}
      </div>
      <div className="flex flex-col bg-gray-700 col-start-2 col-end-3 row-start-2 row-end-4 p-3 min-h-0">
        <h3 className='font-bold text-2xl mb-2'>Forum</h3>
        {user && <CommentForm />}
        <ul className='flex-1 overflow-y-auto min-h-0 space-y-1 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700'>
          {[...blog.comments].map(c => (
            <li key={c} className='odd:bg-gray-700 even:bg-gray-600 px-2 py-1 rounded'>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default BlogPage