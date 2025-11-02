import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificationAlert(state, action){
      return action.payload
    },
    clearNotification(){
      return ''
    }
  }
})
const { notificationAlert, clearNotification } = notificationSlice.actions

const asMilliseconds = seconds => seconds * 1000

export const setNotification = (message, duration) => {
  return async dispatch => {
    dispatch(notificationAlert(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, asMilliseconds(duration))
  }
}

export default notificationSlice.reducer