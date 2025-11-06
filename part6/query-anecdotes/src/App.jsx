import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, vote } from './requests'
import NotificationContext from '../NotificationContext'
import { useContext } from 'react'

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

const App = () => {

  const queryClient = useQueryClient()
  const { setNotification } = useContext(NotificationContext)

  const voteMutation = useMutation({
    mutationFn: vote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    voteMutation.mutate(newAnecdote)
    setNotification(`anecdote '${newAnecdote.content}' voted`)
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
