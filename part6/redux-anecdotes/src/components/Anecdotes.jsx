import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notificationAlert } from "../reducers/notificationReducer.js"

const Anecdote = ({ anecdote, vote }) => {
  const dispatch = useDispatch()
  const handleVote = () => {
    vote()
    dispatch(notificationAlert(`you voted '${anecdote.content}'`))
  }
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}
const Anecdotes = () => {
  const anecdotes = useSelector(({ searchFilter, anecdotes }) => {
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(searchFilter.toLowerCase()))
  })
  const dispatch = useDispatch()

  return (
    <>
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          vote={() => dispatch(vote(anecdote.id))}
        />
        ))}
    </>
  )
}
export default Anecdotes