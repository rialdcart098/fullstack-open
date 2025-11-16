import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs.js";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog,
      );
    },
  },
});
const { setBlogs, appendBlog, removeBlog, updateBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};
export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};
export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeBlog(id));
  };
};
export const like = (id) => {
  return async (dispatch, getState) => {
    const blog = getState().blogs.find((blog) => blog.id === id);
    const payload = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    await blogService.update(payload);
    const updatedBlog = {
      ...payload,
      user: blog.user,
    };
    dispatch(updateBlog(updatedBlog));
  };
};
export const addComment = (id, comment) => {
  return async (dispatch, getState) => {
    const blog = getState().blogs.find((blog) => blog.id === id);
    const payload = {
      ...blog,
      comments: [...blog.comments, comment],
      user: blog.user.id,
    };
    await blogService.update(payload);
    const updatedBlog = {
      ...payload,
      user: blog.user,
    };
    dispatch(updateBlog(updatedBlog));
  };
};
export default blogSlice.reducer;
