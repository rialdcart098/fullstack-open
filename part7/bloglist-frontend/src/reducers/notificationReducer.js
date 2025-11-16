import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    notificationAlert(state, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    },
  },
});
const { notificationAlert, clearNotification } = notificationSlice.actions;

export const setNotification = (message, duration) => {
  return async (dispatch) => {
    dispatch(notificationAlert(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
  };
};
export { clearNotification };
export default notificationSlice.reducer;
