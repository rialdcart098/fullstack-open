import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Blog from "./components/Blog.jsx";
import Login from "./components/Login.jsx";
import BlogForm from "./components/BlogForm.jsx";
import Notification from "./components/Notification.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer.js";
import { initializeBlogs } from "./reducers/blogReducer.js";
import { logOut, setUser } from "./reducers/userReducer.js";

import blogService from "./services/blogs.js";

const App = () => {
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);
  const handleLogOut = () => {
    dispatch(logOut())
    dispatch(setNotification({ message: "Logged out successfully", good: true }, 5));
  };
  return (
    <Router>
      <div>
        <h2>Blogs</h2>
        <Notification />
        {user && (
          <div>
            <p>{user.name} logged in</p>
            <button onClick={handleLogOut}>Log Out</button>
            <BlogForm />
          </div>
        )}
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        {!user && <Login />}
      </div>
    </Router>
  );
};

export default App;
