import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action){
      console.log(action)
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
const { vote, setAnecdotes, createAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}
export const voteAnecdote = anecdote => {
  return async dispatch => {
    await anecdoteService.vote(anecdote)
    dispatch(vote(anecdote.id))
  }
}

export default anecdoteSlice.reducer
