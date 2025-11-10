import Togglable from "./Togglable.jsx";
import blogService from "../services/blogs.js";
import { useState } from "react";
const Blog = (props) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(props.blog.likes);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const handleLikes = async () => {
    const updated = await blogService.update(props.blog.id);
    setLikes(updated.likes);
  };
  const removeBlog = async () => {
    if (window.confirm(`Delete ${props.blog.title}? Can't be reversed`)) {
      await blogService.remove(props.blog.id);
      window.location.reload();
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
            <button onClick={handleLikes}>like</button>
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

export default Blog;
