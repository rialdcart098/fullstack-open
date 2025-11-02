import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer.js"

const Anecdote = ({ anecdote, vote }) => {
  const dispatch = useDispatch()
  const handleVote = () => {
    vote()
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
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
          vote={() => dispatch(voteAnecdote(anecdote))}
        />
        ))}
    </>
  )
}
export default Anecdotes