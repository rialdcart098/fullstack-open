import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationAlert } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async event => {
    event.preventDefault()
    const content = event.target[0].value
    event.target[0].value = ''
    const newNote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newNote))
    dispatch(notificationAlert(`uploaded post: '${content}'`))
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}
export default AnecdoteForm