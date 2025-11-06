import { useQueryClient, useMutation } from '@tanstack/react-query'
import { addAnecdote } from '../requests'
import NotificationContext from '../NotificationContext'
import { notify } from '../NotificationContext'
import { useContext } from 'react'

const AnecdoteForm = () => {
  
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)

  const addAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    addAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch(notify(`Added anecdote: '${content}'`))
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

