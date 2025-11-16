import TextInput from "./TextInput.jsx";
import { setNotification } from "../reducers/notificationReducer.js";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer.js";
import { useField } from "../hooks.js";
import { useNavigate } from "react-router-dom";

const BlogForm = () => {
  const dispatch = useDispatch();
  const { clear: clearTitle, ...title } = useField("text", "title");
  const { clear: clearAuthor, ...author } = useField("text", "author");
  const { clear: clearUrl, ...url } = useField("text", "url");
  const navigate = useNavigate();

  const handleBlog = async (event) => {
    event.preventDefault();
    if (!title.value || !author.value || !url.value) {
      dispatch(
        setNotification(
          { message: "Please input all details", good: false },
          2.5,
        ),
      );
      return;
    }
    dispatch(
      createBlog({ title: title.value, author: author.value, url: url.value }),
    );
    dispatch(setNotification({ message: "Added blog", good: true }, 5));
    clearTitle();
    clearAuthor();
    clearUrl();
    navigate("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center gap-4 p-20 h-100 w-full max-w-md bg-gray-500 rounded-md shadow-lg shadow-black">
        <h2 className="text-blue-950 font-black text-3xl font-momo-trust-display">
          Post
        </h2>
        <form onSubmit={handleBlog}>
          <div>
            <TextInput
              {...title}
              className="mb-2 mt-2 p-2 shadow-inner w-full"
            />
            <TextInput
              {...author}
              className="mb-2 mt-2 p-2 shadow-inner w-full"
            />
            <TextInput {...url} className="mb-4 mt-2 p-2 shadow-inner w-full" />
            <button type="submit" className="w-full">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default BlogForm;
