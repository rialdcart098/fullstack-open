const baseUrl = 'http://localhost:3000'

export const getAnecdotes = async () => {
    const response = await fetch(baseUrl)
    if (!response.ok) throw new Error('Failed to fetch anecdotes')
    return response.json()
}

export const addAnecdote = async anecdote => {
    if (anecdote.length < 5) throw new Error('Anecdote must be at least 5 characters')
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote)
    }
    const response = await fetch(baseUrl, options)
    if (!response.ok) throw new Error('Failed to add anecdote')
    return response.json()
}
export const vote = async updatedAnecdote => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAnecdote)
    }
    const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, options)
    if (!response.ok) throw new Error('Failed to register vote')
    return response.json()
}