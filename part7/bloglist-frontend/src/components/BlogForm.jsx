import { useState } from "react";

import TextInput from "./TextInput.jsx";
import Togglable from "./Togglable.jsx";
import {setNotification} from "../reducers/notificationReducer.js";
import { useDispatch } from "react-redux";
import {createBlog} from "../reducers/blogReducer.js";
import { useField } from "../hooks.js";

const BlogForm = () => {
  const dispatch = useDispatch();
  const { clear: clearTitle, ...title } = useField("text", "title");
  const { clear: clearAuthor, ...author } = useField("text", "author");
  const { clear: clearUrl, ...url } = useField("text", "url");

  const [visible, setVisible] = useState(false);

  const handleBlog = async (event) => {
    event.preventDefault();
    if (!title.value || !author.value || !url.value) {
      dispatch(setNotification({ message: "Please input all details", good: false }, 2.5));
      return;
    }
    dispatch(createBlog({ title: title.value, author: author.value, url: url.value }));
    dispatch(setNotification({ message: "Added blog", good: true }, 5));
    setVisible(false);
    clearTitle();
    clearAuthor();
    clearUrl();
  };
  return (
    <Togglable
      buttonLabel="Add Blogs"
      toggleVisibility={() => setVisible(!visible)}
      visible={visible}
    >
      <form onSubmit={handleBlog}>
        <div>
          <TextInput {...title} />
          <TextInput {...author} />
          <TextInput {...url} />
          <button type="submit">Create</button>
        </div>
      </form>
    </Togglable>
  );
};
export default BlogForm;
