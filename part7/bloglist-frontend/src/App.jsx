import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Blogs from "./components/Blogs.jsx";
import Login from "./components/Login.jsx";
import Users from "./components/Users.jsx";
import Navbar from "./components/Navbar.jsx";
import User from "./components/User.jsx";
import BlogForm from "./components/BlogForm.jsx";
import BlogPage from "./components/BlogPage.jsx";
import Notification from "./components/Notification.jsx";
import { useDispatch } from "react-redux";
import { setUser } from "./reducers/authReducer.js";
import blogService from "./services/blogs.js";
import { initializeUsers } from "./reducers/usersReducer.js";
import { initializeBlogs } from "./reducers/blogReducer.js";

const App = () => {
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
  return (
    <Router>
      <div className="grid grid-cols-1 grid-rows-[0.25fr_2.5fr] gap-4 w-screen h-screen bg-gray-900 font-merriweather overflow-y-hidden overflow-x-hidden">
        <Navbar className="h-full" />
        <div className="flex flex-col overflow-hidden min-h-0">
          <h1 className="m-2 text-6xl text-gray-200 font-black font-momo-trust-display select-none">
            THE UNFILTERED BLOG APP
          </h1>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/" element={<Blogs />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<BlogPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/post" element={<BlogForm />} />
          </Routes>
          <Notification />
        </div>
      </div>
    </Router>
  );
};

export default App;
