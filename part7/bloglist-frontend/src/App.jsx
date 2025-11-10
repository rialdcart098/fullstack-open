import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Blog from "./components/Blog.jsx";
import Login from "./components/Login.jsx";
import BlogForm from "./components/BlogForm.jsx";
import Notification from "./components/Notification.jsx";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer.js";
import {}

import blogService from "./services/blogs.js";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
      console.log(user);
    }
  }, []);
  const logOut = () => {
    window.localStorage.removeItem("user");
    blogService.setToken(null);
    setUser(null);
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
            <button onClick={logOut}>Log Out</button>
            <BlogForm
              setBlogs={setBlogs}
              blogs={blogs}
            />
          </div>
        )}
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        {!user && <Login setUser={setUser} />}
      </div>
    </Router>
  );
};

export default App;
