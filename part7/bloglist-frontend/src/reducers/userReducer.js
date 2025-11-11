import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs.js';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    }
  }
})
const { setUser, clearUser } = userSlice.actions;

export const loginUser = user => {
  return async dispatch => {
    window.localStorage.setItem('user', JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(setUser(user));
  }
}
export const logOut = () => {
  return async dispatch => {
    window.localStorage.removeItem('user');
    blogService.setToken(null);
    dispatch(clearUser());
  }
}

export { setUser };

export default userSlice.reducer;