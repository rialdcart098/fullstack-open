import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs.js";
import loginService from "../services/login.js";

const authSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
  },
});
const { setUser, clearUser } = authSlice.actions;

export const loginUser = (username, password) => {
  return async (dispatch) => {
    console.log(username, password);
    const user = await loginService.login({ username, password });
    window.localStorage.setItem("user", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(setUser(user));
    return user;
  };
};
export const logOut = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("user");
    blogService.setToken(null);
    dispatch(clearUser());
  };
};

export { setUser };

export default authSlice.reducer;
