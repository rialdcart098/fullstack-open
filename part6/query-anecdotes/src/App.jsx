import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, vote } from './requests'

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

const App = () => {

  const queryClient = useQueryClient()

  const voteMutation = useMutation({
    mutationFn: vote,
    
  })

  const handleVote = (anecdote) => {
    console.log('vote')
  }
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  if (result.isLoading) return <div>loading data...</div>

  const anecdotes = result.data

  console.log(anecdotes)

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
