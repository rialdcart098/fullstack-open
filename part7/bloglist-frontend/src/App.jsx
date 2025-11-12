import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Blogs from "./components/Blogs.jsx";
import Login from "./components/Login.jsx";
import Users from "./components/Users.jsx";
import User from "./components/User.jsx";
import BlogForm from "./components/BlogForm.jsx";
import BlogPage from "./components/BlogPage.jsx"
import Notification from "./components/Notification.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer.js";
import { logOut, setUser } from "./reducers/authReducer.js";
import blogService from "./services/blogs.js";
import {initializeUsers} from "./reducers/usersReducer.js";
import {initializeBlogs} from "./reducers/blogReducer.js";

const App = () => {
  const user = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
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
        <h1>Blogs</h1>
        <Notification />
        {user && (
          <div>
            <p>{user.name} logged in</p>
            <button onClick={handleLogOut}>Log Out</button>
            <BlogForm />
          </div>
        )}
        {!user && <Login />}
      </div>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Blogs />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogPage />} />
      </Routes>
    </Router>
  );
};

export default App;
