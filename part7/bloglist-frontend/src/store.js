import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer.js";
import blogReducer from "./reducers/blogReducer.js";
import authReducer from "./reducers/authReducer.js";
import usersReducer from "./reducers/usersReducer.js";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    auth: authReducer,
    users: usersReducer,
  },
});
export default store;
