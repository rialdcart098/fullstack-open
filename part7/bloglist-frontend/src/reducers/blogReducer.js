import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs.js';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action){
      state.push(action.payload);
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload);
    },
    addVote(state, action) {
      const id = action.payload;
      const blogToVote = state.find(blog => blog.id === id);
      const votedBlog = {
        ...blogToVote,
        votes: blogToVote.votes + 1
      };
      return state.map(blog => blog.id !== id ? blog : votedBlog);
    }
  }
});
const { setBlogs, appendBlog, removeBlog, addVote } = blogSlice.actions;

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};
export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};
export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove(id);
    dispatch(removeBlog(id));
  };
};
export const vote = id => {
  return async dispatch => {
    await blogService.vote(id);
    dispatch(addVote(id));
  };
};