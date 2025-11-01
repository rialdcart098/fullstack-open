import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={vote}>vote</button>
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