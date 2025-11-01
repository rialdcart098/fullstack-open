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
export const { clearNotification, notificationAlert } = notificationSlice.actions
export default notificationSlice.reducer