import { useState } from "react";

import TextInput from "./TextInput.jsx";
import Togglable from "./Togglable.jsx";
import {setNotification} from "../reducers/notificationReducer.js";
import { useDispatch } from "react-redux";
import {createBlog} from "../reducers/blogReducer.js";

const BlogForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(false);

  const handleBlog = async (event) => {
    event.preventDefault();
    if (!title || !author || !url) {
      dispatch(setNotification({ message: "Please input all details", good: false }, 2.5));
      return;
    }
    dispatch(createBlog({ title, author, url }));
    dispatch(setNotification({ message: "Added blog", good: true }, 5));
    setVisible(false);
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <Togglable
      buttonLabel="Add Blog"
      toggleVisibility={() => setVisible(!visible)}
      visible={visible}
    >
      <form onSubmit={handleBlog}>
        <div>
          <TextInput
            name="title"
            type="text"
            value={title}
            setValue={setTitle}
          />
          <TextInput
            name="author"
            type="text"
            value={author}
            setValue={setAuthor}
          />
          <TextInput name="url" type="text" value={url} setValue={setUrl} />
          <button type="submit">Create</button>
        </div>
      </form>
    </Togglable>
  );
};
export default BlogForm;
