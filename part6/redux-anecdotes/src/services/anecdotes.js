const baseUrl = 'http://localhost:3000/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) throw new Error('Failed to fetch anecdotes')
  return response.json()
}

const createNew = async content => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 })
  })
  if (!response.ok) throw new Error('Failed to create anecdote')
  return response.json()
}

const vote = async anecdote => {
  const id = anecdote.id
  const newVotes = anecdote.votes + 1
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ votes: newVotes })
  })
  if (!response.ok) throw new Error('Failed to update anecdote')
  return response.json()
}

export default {
  getAll,
  createNew,
  vote
}