import Togglable from "./Togglable.jsx";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteBlog, like} from "../reducers/blogReducer.js";
const Blog = (props) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(props.blog.likes);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const handleLike = async () => {
    dispatch(like(props.blog.id));
    setLikes(likes + 1);
  }
  const removeBlog = async () => {
    if (window.confirm(`Delete ${props.blog.title}? Can't be reversed`)) {
      dispatch(deleteBlog(props.blog.id));
    }
  };
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
            Likes: <span className="likes-value">{likes}</span>
            <button onClick={handleLike}>like</button>
          </p>
          <p>{props.blog?.user?.name}</p>
          {props.blog?.user?.id === props.user?.id && (
            <button onClick={removeBlog}>delete</button>
          )}
        </div>
      </Togglable>
    </div>
  );
};
const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.auth);
  return (
    <>
      {[...blogs]
        .map(blog => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </>
  )
}
export default Blogs;
