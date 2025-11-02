import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action){
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id === id ? changedAnecdote : anecdote
      )
    },
    createAnecdote(state, action){
      const content = action.payload
      state.push(content)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})
export const {
  setAnecdotes,
  vote,
  createAnecdote
} = anecdoteSlice.actions
export default anecdoteSlice.reducer
