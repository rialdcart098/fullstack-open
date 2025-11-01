import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer.js'
import notificationReducer from './reducers/notificationReducer.js'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    searchFilter: filterReducer,
    notification: notificationReducer,
  }
})
export default store